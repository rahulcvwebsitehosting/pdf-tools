import { pipeline, env } from '@huggingface/transformers';
import Tesseract from 'tesseract.js';

// Configure local WASM assets for ONNX Runtime
// @ts-ignore
env.backends.onnx.wasm.wasmPaths = '/wasm/';
env.allowLocalModels = false;

let captioner: any = null;
let tesseractWorker: any = null;

async function getTesseractWorker() {
  if (tesseractWorker) return tesseractWorker;

  tesseractWorker = await Tesseract.createWorker('eng', 1, {
    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/worker.min.js',
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.0/tesseract-core.wasm',
    logger: (m: any) => {
      if (m.status === 'recognizing text') {
        self.postMessage({ type: 'progress', progress: m.progress, status: 'OCR processing...' });
      }
    },
  });
  return tesseractWorker;
}

self.onmessage = async function (e: MessageEvent) {
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
        progress_callback: (data: any) => {
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
    } catch (err: any) {
      const wasmPathSetting = env.backends?.onnx?.wasm?.wasmPaths;
      console.error(
        `[Worker Init Failure] Failed to load local image-captioning pipeline for model "${model}".\n` +
        `This error often occurs when ONNX Runtime WASM binaries are missing.\n` +
        `Expected WASM files (e.g., ort-wasm-simd.wasm) must be served from the Next.js /public folder.\n` +
        `Configured wasmPaths setting: ${JSON.stringify(wasmPathSetting)}\n` +
        `Resolved browser fetch URL prefix: ${self?.location?.origin || ''}${wasmPathSetting}\n` +
        `Error details:`, err
      );
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
    } catch (err: any) {
      console.error(`[Worker Init Failure] Failed to load Tesseract OCR engine. Error:`, err);
      self.postMessage({ type: 'status', status: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'caption') {
    if (!captioner) {
      self.postMessage({ type: 'status', status: 'error', error: 'Caption model not loaded' });
      return;
    }
    try {
      const result = await captioner(image);
      self.postMessage({ type: 'result', output: result[0]?.generated_text });
    } catch (err: any) {
      self.postMessage({ type: 'error', error: err.message });
    }
  }

  if (type === 'ocr') {
    if (!tesseractWorker) {
      self.postMessage({ type: 'status', status: 'error', error: 'OCR engine not loaded' });
      return;
    }
    try {
      const worker = await getTesseractWorker();
      const { data: { text } } = await worker.recognize(image);
      self.postMessage({ type: 'result', output: text });
    } catch (err: any) {
      self.postMessage({ type: 'error', error: err.message });
    }
  }
};
export {};

