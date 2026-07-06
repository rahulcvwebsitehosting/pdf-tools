import { useEffect, useRef, useState, useCallback } from 'react';
import { getAiEngine } from '@/lib/ai-engine';
import type { WorkerType } from '@/lib/ai-engine';


export function useTextAi(modelName = 'onnx-community/Qwen2.5-0.5B-Instruct') {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'generating' | 'error'>('idle');
  const [progress, setProgress] = useState<{ [file: string]: number }>({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [output, setOutput] = useState('');
  const [stream, setStream] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Initializing local AI weights...');
  const abortRef = useRef<AbortController | null>(null);
  const cleanupRef = useRef<(() => void)[]>([]);

  const initWorker = useCallback(() => {
    const engine = getAiEngine();
    const worker = engine.getWorker('text');

    // Subscribe to status events for text worker
    const unsubStatus = engine.onStatus((event) => {
      if (event.workerType !== 'text') return;

      if (event.status === 'loading') {
        setIsReady(false);
        setStatus('loading');
      } else if (event.status === 'ready') {
        setIsReady(true);
        setStatus('ready');
        setLoadingMessage('');
        setError(null);
      } else if (event.status === 'error') {
        setIsReady(false);
        setStatus('error');
        setError(event.error || 'Failed to initialize worker');
        setLoadingMessage('Initialization failed.');
      }
    });

    // Subscribe to result events for text worker
    const unsubResult = engine.onResult((event) => {
      if (event.workerType !== 'text') return;

      if (event.type === 'progress') {
        setProgress((prev) => {
          const next = { ...prev, [event.data.file]: event.data.progress };
          const vals = Object.values(next) as number[];
          const avg = vals.reduce((a: number, b: number) => a + b, 0) / vals.length;
          setOverallProgress(avg);
          setLoadingMessage(`Downloading model weights: ${Math.round(avg * 100)}%`);
          return next;
        });
      } else if (event.type === 'stream') {
        setStream((prev) => prev + event.data.text);
      } else if (event.type === 'result') {
        const finalOutput = event.data.output;
        let textResult = '';
        if (Array.isArray(finalOutput) && finalOutput[0]?.generated_text) {
          textResult = finalOutput[0].generated_text;
        } else if (typeof finalOutput === 'string') {
          textResult = finalOutput;
        } else if (finalOutput?.generated_text) {
          textResult = finalOutput.generated_text;
        }

        // Strip chat template tags if they leak
        const assistantMarker = "<|im_start|>assistant\n";
        const markerIndex = textResult.lastIndexOf(assistantMarker);
        if (markerIndex !== -1) {
          textResult = textResult.substring(markerIndex + assistantMarker.length).replace(/<\|im_end\|>$/, '');
        }

        setOutput(textResult);
        setStatus('ready');
      } else if (event.type === 'error') {
        setError(event.data.error || 'Worker error occurred');
        setStatus('error');
      }
    });

    cleanupRef.current.push(unsubStatus, unsubResult);

    // Preload model via engine singleton
    engine.preload('text', { type: 'load', model: modelName });

    return worker;
  }, [modelName]);

  const generate = useCallback((messages: any[], params?: any) => {
    if (!isReady) {
      console.warn("Cannot call generate(): Local AI model is not fully loaded and ready.");
      return;
    }
    const engine = getAiEngine();
    setStream('');
    setOutput('');
    setStatus('generating');

    abortRef.current = new AbortController();
    engine.postMessage('text', { type: 'generate', messages, params }, abortRef.current.signal).catch((err) => {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setStatus('error');
      }
    });
  }, [isReady]);

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    const engine = getAiEngine();
    engine.abort('text');
    setStatus('idle');
    setLoadingMessage('Initializing local AI weights...');
    setIsReady(false);
  }, []);

  // Cleanup subscriptions on unmount (worker stays alive for next tool)
  useEffect(() => {
    return () => {
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, []);

  return { status, progress, overallProgress, output, stream, error, isReady, loadingMessage, generate, initWorker, cancel };
}


export function useVisionAi(task: 'ocr' | 'caption' = 'caption', modelName = 'Xenova/vit-gpt2-image-captioning') {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'processing' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Initializing vision engine...');
  const abortRef = useRef<AbortController | null>(null);
  const cleanupRef = useRef<(() => void)[]>([]);

  const initWorker = useCallback(() => {
    const engine = getAiEngine();
    const worker = engine.getWorker('vision');

    const unsubStatus = engine.onStatus((event) => {
      if (event.workerType !== 'vision') return;

      if (event.status === 'loading') {
        setIsReady(false);
        setStatus('loading');
        setLoadingMessage(task === 'caption' ? 'Initializing vision model...' : 'Initializing OCR engine...');
      } else if (event.status === 'ready') {
        setIsReady(true);
        setStatus('ready');
        setLoadingMessage('');
        setError(null);
      } else if (event.status === 'error') {
        setIsReady(false);
        setStatus('error');
        setError(event.error || 'Failed to initialize worker');
        setLoadingMessage('Initialization failed.');
      }
    });

    const unsubResult = engine.onResult((event) => {
      if (event.workerType !== 'vision') return;

      if (event.type === 'progress') {
        setProgress(Math.round((event.data.progress || 0) * 100));
        setLoadingMessage(`Loading vision assets: ${Math.round((event.data.progress || 0) * 100)}%`);
      } else if (event.type === 'result') {
        setOutput(event.data.output);
        setStatus('ready');
      } else if (event.type === 'error') {
        setError(event.data.error || 'Worker error occurred');
        setStatus('error');
      }
    });

    cleanupRef.current.push(unsubStatus, unsubResult);

    // Preload appropriate model
    if (task === 'caption') {
      engine.preload('vision', { type: 'load-caption', model: modelName });
    } else {
      engine.preload('vision', { type: 'load-ocr' });
    }

    return worker;
  }, [task, modelName]);

  const runOcr = useCallback((imageSrc: string | ImageData) => {
    if (!isReady) {
      console.warn("Cannot call runOcr(): Vision/OCR engine is not fully loaded and ready.");
      return;
    }
    const engine = getAiEngine();
    setOutput('');
    setStatus('processing');
    setProgress(0);
    engine.postMessageSync('vision', { type: 'ocr', image: imageSrc });
  }, [isReady]);

  const generateCaption = useCallback((imageSrc: string | ImageData) => {
    if (!isReady) {
      console.warn("Cannot call generateCaption(): Vision engine is not fully loaded and ready.");
      return;
    }
    const engine = getAiEngine();
    setOutput('');
    setStatus('processing');
    setProgress(0);
    engine.postMessageSync('vision', { type: 'caption', image: imageSrc });
  }, [isReady]);

  const cancel = useCallback(() => {
    const engine = getAiEngine();
    engine.abort('vision');
    setStatus('idle');
    setIsReady(false);
    setLoadingMessage('Initializing vision engine...');
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, []);

  return { status, progress, output, error, isReady, loadingMessage, runOcr, generateCaption, initWorker, cancel };
}


export function useAudioAi(modelName = 'onnx-community/whisper-tiny.en') {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'transcribing' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Initializing audio weights...');
  const abortRef = useRef<AbortController | null>(null);
  const cleanupRef = useRef<(() => void)[]>([]);

  const initWorker = useCallback(() => {
    const engine = getAiEngine();
    const worker = engine.getWorker('audio');

    const unsubStatus = engine.onStatus((event) => {
      if (event.workerType !== 'audio') return;

      if (event.status === 'loading') {
        setIsReady(false);
        setStatus('loading');
        setLoadingMessage('Initializing audio model...');
      } else if (event.status === 'ready') {
        setIsReady(true);
        setStatus('ready');
        setLoadingMessage('');
        setError(null);
      } else if (event.status === 'error') {
        setIsReady(false);
        setStatus('error');
        setError(event.error || 'Failed to initialize worker');
        setLoadingMessage('Initialization failed.');
      }
    });

    const unsubResult = engine.onResult((event) => {
      if (event.workerType !== 'audio') return;

      if (event.type === 'progress') {
        setProgress(Math.round((event.data.progress || 0) * 100));
        setLoadingMessage(`Downloading audio model weights: ${Math.round((event.data.progress || 0) * 100)}%`);
      } else if (event.type === 'result') {
        setOutput(event.data.output);
        setStatus('ready');
      } else if (event.type === 'error') {
        setError(event.data.error || 'Worker error occurred');
        setStatus('error');
      }
    });

    cleanupRef.current.push(unsubStatus, unsubResult);

    engine.preload('audio', { type: 'load', model: modelName });

    return worker;
  }, [modelName]);

  const transcribe = useCallback((audioData: Float32Array, options?: any) => {
    if (!isReady) {
      console.warn("Cannot call transcribe(): Audio model is not fully loaded and ready.");
      return;
    }
    const engine = getAiEngine();
    setOutput('');
    setStatus('transcribing');
    setProgress(0);
    engine.postMessageSync('audio', { type: 'transcribe', audio: audioData, options });
  }, [isReady]);

  const cancel = useCallback(() => {
    const engine = getAiEngine();
    engine.abort('audio');
    setStatus('idle');
    setIsReady(false);
    setLoadingMessage('Initializing audio weights...');
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, []);

  return { status, progress, output, error, isReady, loadingMessage, transcribe, initWorker, cancel };
}
