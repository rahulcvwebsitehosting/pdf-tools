import { pipeline, env } from '@huggingface/transformers';

// Configure local WASM assets
// @ts-ignore
env.backends.onnx.wasm.wasmPaths = '/wasm/';
env.allowLocalModels = false;

let transcriber: any = null;
let currentModelName = '';

self.onmessage = async function (e: MessageEvent) {
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

      currentModelName = targetModel;
      self.postMessage({ type: 'status', status: 'ready' });
    } catch (err: any) {
      const wasmPathSetting = env.backends?.onnx?.wasm?.wasmPaths;
      console.error(
        `[Worker Init Failure] Failed to load local audio transcriber pipeline for model "${model}".\n` +
        `This error often occurs when ONNX Runtime WASM binaries are missing.\n` +
        `Expected WASM files (e.g., ort-wasm-simd.wasm) must be served from the Next.js /public folder.\n` +
        `Configured wasmPaths setting: ${JSON.stringify(wasmPathSetting)}\n` +
        `Resolved browser fetch URL prefix: ${self?.location?.origin || ''}${wasmPathSetting}\n` +
        `Error details:`, err
      );
      self.postMessage({ type: 'status', status: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'transcribe') {
    if (!transcriber) {
      self.postMessage({ type: 'status', status: 'error', error: 'Audio model not loaded' });
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
    } catch (err: any) {
      self.postMessage({ type: 'error', error: err.message });
    }
  }
};
export {};

