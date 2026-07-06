// Vision worker for OCR (Tesseract.js) and image captioning (Transformers.js)
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.2';

env.backends.onnx.wasm.wasmPaths = '/wasm/';
env.allowLocalModels = false;

importScripts('https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/tesseract.min.js');

let captioner = null;
let tesseractWorker = null;

async function getTesseractWorker() {
  if (tesseractWorker) return tesseractWorker;

  tesseractWorker = await Tesseract.createWorker('eng', 1, {
    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/worker.min.js',
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.0/tesseract-core.wasm',
    logger: (m) => {
      if (m.status === 'recognizing text') {
        self.postMessage({ type: 'progress', progress: m.progress, status: 'OCR processing...' });
      }
    },
  });
  return tesseractWorker;
}

self.onmessage = async function (e) {
  const { type, image, model } = e.data;

  if (type === 'load-caption') {
    try {
      const targetModel = model || 'Xenova/vit-gpt2-image-captioning';
      if (captioner) {
        self.postMessage({ type: 'status', status: 'ready' });
        return;
      }

      self.postMessage({ type: 'status', status: 'init' });

      captioner = await pipeline('image-to-text', targetModel, {
        progress_callback: (data) => {
          if (data.status === 'progress') {
            self.postMessage({
              type: 'progress',
              file: data.file,
              progress: data.progress,
              loaded: data.loaded,
              total: data.total
            });
            self.postMessage({ type: 'status', status: 'progress', progress: data.progress });
          }
        }
      });

      self.postMessage({ type: 'status', status: 'ready' });
    } catch (err) {
      console.error('Failed to load caption model:', err);
      self.postMessage({ type: 'status', status: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'load-ocr') {
    try {
      if (tesseractWorker) {
        self.postMessage({ type: 'status', status: 'ready' });
        return;
      }

      self.postMessage({ type: 'status', status: 'init' });
      await getTesseractWorker();
      self.postMessage({ type: 'status', status: 'ready' });
    } catch (err) {
      console.error('Failed to load OCR engine:', err);
      self.postMessage({ type: 'status', status: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'caption') {
    if (!captioner) {
      self.postMessage({ type: 'status', status: 'error', error: 'Caption model not loaded. Please wait for initialization.' });
      return;
    }
    try {
      const result = await captioner(image);
      self.postMessage({ type: 'result', output: result[0]?.generated_text });
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'ocr') {
    if (!tesseractWorker) {
      self.postMessage({ type: 'status', status: 'error', error: 'OCR engine not loaded. Please wait for initialization.' });
      return;
    }
    try {
      const worker = await getTesseractWorker();
      const { data: { text } } = await worker.recognize(image);
      self.postMessage({ type: 'result', output: text });
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message || String(err) });
    }
  }
};
