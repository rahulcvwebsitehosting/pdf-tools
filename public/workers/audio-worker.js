// Audio worker for local speech-to-text (Whisper, ONNX)
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.2';

env.backends.onnx.wasm.wasmPaths = '/wasm/';
env.allowLocalModels = false;

let transcriber = null;
let currentModelName = '';

self.onmessage = async function (e) {
  const { type, audio, model, options } = e.data;

  if (type === 'load') {
    try {
      const targetModel = model || 'onnx-community/whisper-tiny.en';

      if (transcriber && currentModelName === targetModel) {
        self.postMessage({ type: 'status', status: 'ready' });
        return;
      }

      self.postMessage({ type: 'status', status: 'init' });

      transcriber = await pipeline('automatic-speech-recognition', targetModel, {
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

      currentModelName = targetModel;
      self.postMessage({ type: 'status', status: 'ready', model: targetModel });
    } catch (err) {
      console.error('Failed to load audio model:', err);
      self.postMessage({ type: 'status', status: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'transcribe') {
    if (!transcriber) {
      self.postMessage({ type: 'status', status: 'error', error: 'Audio model not loaded. Please wait for initialization.' });
      return;
    }

    try {
      self.postMessage({ type: 'status', status: 'transcribing' });

      const result = await transcriber(audio, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: options?.language || null,
        task: options?.task || 'transcribe',
      });

      self.postMessage({ type: 'result', output: result.text, chunks: result.chunks });
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message || String(err) });
    }
  }
};
