/*
 * Shared worker manager for client-side AI inference.
 * Provides singleton workers, task queue, model caching,
 * abort controls, and memory cleanup.
 */

type WorkerType = 'text' | 'vision' | 'audio';

type WorkerStatus = 'idle' | 'loading' | 'ready' | 'busy' | 'error';

interface QueuedTask {
  workerType: WorkerType;
  message: any;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  abortSignal?: AbortSignal;
}

type StatusListener = (event: {
  workerType: WorkerType;
  status: WorkerStatus;
  progress?: number;
  file?: string;
  error?: string;
  loadingMessage?: string;
}) => void;

type ResultListener = (event: {
  workerType: WorkerType;
  type: string;
  data: any;
}) => void;

const WORKER_PATHS: Record<WorkerType, string> = {
  text: '/workers/text-worker.js',
  vision: '/workers/vision-worker.js',
  audio: '/workers/audio-worker.js',
};

class AiEngine {
  private workers: Map<WorkerType, Worker> = new Map();
  private workerStatus: Map<WorkerType, WorkerStatus> = new Map();
  private loadedModels: Map<string, boolean> = new Map();
  private taskQueue: QueuedTask[] = [];
  private isProcessing = false;
  private statusListeners: Set<StatusListener> = new Set();
  private resultListeners: Set<ResultListener> = new Set();
  private activeAbortController: AbortController | null = null;

  private getOrCreateWorker(type: WorkerType): Worker {
    let worker = this.workers.get(type);
    if (worker) return worker;

    worker = new Worker(WORKER_PATHS[type], { type: 'module' });
    this.setupWorkerListeners(type, worker);
    this.workers.set(type, worker);
    this.workerStatus.set(type, 'idle');
    return worker;
  }

  private setupWorkerListeners(type: WorkerType, worker: Worker): void {
    worker.onmessage = (e: MessageEvent) => {
      const data = e.data;

      if (data.type === 'status') {
        const statusMap: Record<string, WorkerStatus> = {
          'init': 'loading',
          'loading': 'loading',
          'progress': 'loading',
          'ready': 'ready',
          'error': 'error',
          'transcribing': 'busy',
        };
        const mappedStatus = statusMap[data.status] || 'loading';
        this.workerStatus.set(type, mappedStatus);

        if (data.status === 'ready') {
          const modelKey = `${type}:${data.model || 'default'}`;
          this.loadedModels.set(modelKey, true);
        }

        this.notifyStatusListeners({
          workerType: type,
          status: mappedStatus,
          progress: data.progress,
          file: data.file,
          error: data.error,
          loadingMessage: mappedStatus === 'error' ? 'Initialization failed.' : undefined,
        });
      } else if (data.type === 'progress') {
        this.notifyStatusListeners({
          workerType: type,
          status: 'loading',
          progress: data.progress,
          file: data.file,
        });
      } else {
        this.notifyResultListeners({
          workerType: type,
          type: data.type,
          data,
        });
      }
    };

    worker.onerror = (err) => {
      this.workerStatus.set(type, 'error');
      this.notifyStatusListeners({
        workerType: type,
        status: 'error',
        error: err.message || 'Worker runtime error',
      });
    };
  }

  onStatus(listener: StatusListener): () => void {
    this.statusListeners.add(listener);
    return () => { this.statusListeners.delete(listener); };
  }

  onResult(listener: ResultListener): () => void {
    this.resultListeners.add(listener);
    return () => { this.resultListeners.delete(listener); };
  }

  private notifyStatusListeners(event: Parameters<StatusListener>[0]): void {
    this.statusListeners.forEach((fn) => fn(event));
  }

  private notifyResultListeners(event: Parameters<ResultListener>[0]): void {
    this.resultListeners.forEach((fn) => fn(event));
  }

  postMessage(workerType: WorkerType, message: any, abortSignal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (abortSignal?.aborted) {
        reject(new DOMException('Task aborted', 'AbortError'));
        return;
      }

      this.taskQueue.push({ workerType, message, resolve, reject, abortSignal });
      this.processQueue();
    });
  }

  postMessageSync(workerType: WorkerType, message: any): void {
    const worker = this.getOrCreateWorker(workerType);
    worker.postMessage(message);
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    if (this.taskQueue.length === 0) return;

    this.isProcessing = true;

    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift()!;

      if (task.abortSignal?.aborted) {
        task.reject(new DOMException('Task aborted', 'AbortError'));
        continue;
      }

      try {
        const worker = this.getOrCreateWorker(task.workerType);
        this.activeAbortController = new AbortController();

        const onAbort = () => {
          task.reject(new DOMException('Task aborted', 'AbortError'));
        };
        task.abortSignal?.addEventListener('abort', onAbort, { once: true });

        worker.postMessage(task.message);
        task.resolve(undefined);

        task.abortSignal?.removeEventListener('abort', onAbort);
      } catch (err) {
        task.reject(err);
      }
    }

    this.activeAbortController = null;
    this.isProcessing = false;
  }

  preload(workerType: WorkerType, loadMessage: any): void {
    const worker = this.getOrCreateWorker(workerType);
    const modelKey = `${workerType}:${loadMessage.model || 'default'}`;
    
    if (this.loadedModels.get(modelKey)) {
      this.notifyStatusListeners({ workerType, status: 'ready' });
      return;
    }

    worker.postMessage(loadMessage);
  }

  abort(workerType: WorkerType): void {
    const worker = this.workers.get(workerType);
    if (worker) {
      worker.terminate();
      this.workers.delete(workerType);
      this.workerStatus.set(workerType, 'idle');
      
      for (const key of this.loadedModels.keys()) {
        if (key.startsWith(`${workerType}:`)) {
          this.loadedModels.delete(key);
        }
      }
    }

    this.taskQueue = this.taskQueue.filter((t) => {
      if (t.workerType === workerType) {
        t.reject(new DOMException('Task aborted', 'AbortError'));
        return false;
      }
      return true;
    });
  }

  disposeWorker(workerType: WorkerType): void {
    const worker = this.workers.get(workerType);
    if (worker) {
      worker.terminate();
      this.workers.delete(workerType);
      this.workerStatus.set(workerType, 'idle');
    }

    for (const key of this.loadedModels.keys()) {
      if (key.startsWith(`${workerType}:`)) {
        this.loadedModels.delete(key);
      }
    }
  }

  disposeAll(): void {
    for (const [type, worker] of this.workers) {
      worker.terminate();
    }
    this.workers.clear();
    this.workerStatus.clear();
    this.loadedModels.clear();
    this.taskQueue = [];
    this.isProcessing = false;
  }

  getStatus(workerType: WorkerType): WorkerStatus {
    return this.workerStatus.get(workerType) || 'idle';
  }

  isModelLoaded(workerType: WorkerType, model?: string): boolean {
    const key = `${workerType}:${model || 'default'}`;
    return this.loadedModels.get(key) === true;
  }

  getWorker(workerType: WorkerType): Worker {
    return this.getOrCreateWorker(workerType);
  }
}

let engineInstance: AiEngine | null = null;

export function getAiEngine(): AiEngine {
  if (!engineInstance) {
    engineInstance = new AiEngine();
  }
  return engineInstance;
}

export type { WorkerType, WorkerStatus, StatusListener, ResultListener };
