// Local LLM inference worker (Qwen2.5, ONNX)
import { pipeline, env, TextStreamer } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.2';

env.backends.onnx.wasm.wasmPaths = '/wasm/';
env.allowLocalModels = false;

let generator = null;
let currentModelName = '';

self.onmessage = async function (e) {
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
        dtype: 'q4',
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
      console.error('Failed to load text model:', err);
      self.postMessage({ type: 'status', status: 'error', error: err.message || String(err) });
    }
  }

  if (type === 'generate') {
    if (!generator) {
      self.postMessage({ type: 'status', status: 'error', error: 'Model not loaded. Please wait for initialization.' });
      return;
    }

    try {
      const prompt = generator.tokenizer.apply_chat_template(messages, {
        tokenize: false,
        add_generation_prompt: true,
      });

      const streamer = new TextStreamer(generator.tokenizer, {
        callback_function: (text) => {
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
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message || String(err) });
    }
  }
};
