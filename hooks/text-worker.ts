import { pipeline, env, TextStreamer } from '@huggingface/transformers';

// Configure local WASM assets
// @ts-ignore
env.backends.onnx.wasm.wasmPaths = '/wasm/';
env.allowLocalModels = false;

let generator: any = null;
let currentModelName = '';

self.onmessage = async function (e: MessageEvent) {
  const { type, model, messages, params } = e.data;

  if (type === 'load') {
    try {
      const targetModel = model || 'onnx-community/Qwen2.5-0.5B-Instruct';
      if (generator && currentModelName === targetModel) {
        self.postMessage({ type: 'status', status: 'ready' });
        return;
      }

      self.postMessage({ type: 'status', status: 'init' });

      generator = await pipeline('text-generation', targetModel, {
        dtype: 'q4', // Force quantized q4 model
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
        `[Worker Init Failure] Failed to load local text pipeline for model "${model}".\n` +
        `This error often occurs when ONNX Runtime WASM binaries are missing.\n` +
        `Expected WASM files (e.g., ort-wasm-simd.wasm) must be served from the Next.js /public folder.\n` +
        `Configured wasmPaths setting: ${JSON.stringify(wasmPathSetting)}\n` +
        `Resolved browser fetch URL prefix: ${self?.location?.origin || ''}${wasmPathSetting}\n` +
        `Error details:`, err
      );
      self.postMessage({ type: 'status', status: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'generate') {
    if (!generator) {
      self.postMessage({ type: 'status', status: 'error', error: 'Model not loaded' });
      return;
    }

    try {
      // Format messages using Qwen chat template style
      const prompt = generator.tokenizer.apply_chat_template(messages, {
        tokenize: false,
        add_generation_prompt: true,
      });

      const streamer = new TextStreamer(generator.tokenizer, {
        callback_function: (text: string) => {
          self.postMessage({ type: 'stream', text });
        }
      });

      const output = await generator(prompt, {
        max_new_tokens: params?.max_new_tokens || 512,
        temperature: 0.0,
        do_sample: false,
        return_full_text: false,
        streamer,
      });

      self.postMessage({ type: 'result', output });
    } catch (err: any) {
      self.postMessage({ type: 'error', error: err.message });
    }
  }
};

