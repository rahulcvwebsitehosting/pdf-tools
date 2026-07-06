"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { useState, useEffect } from "react";
import { useAudioAi } from "@/hooks/useAi";

export default function FreeAiAiSpeechToTextTool() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<Float32Array | null>(null);
  const { status, progress, output, error, isReady, loadingMessage, transcribe, initWorker } = useAudioAi();

  useEffect(() => {
    initWorker();
  }, [initWorker]);

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const decodedData = await audioCtx.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedData.getChannelData(0));
    }
  };

  const handleTranscribe = () => {
    if (!audioBuffer || !isReady) return;
    transcribe(audioBuffer);
  };

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
  
      <div className="space-y-4">
        <div className="border-2 border-dashed border-black p-6 text-center bg-background">
          <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" id="audio-upload" />
          <label htmlFor="audio-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4">
            {audioUrl ? 'Change Audio File' : 'Drop or Select Audio Track'}
          </label>
        </div>

        {audioUrl && (
          <div className="flex justify-center p-2">
            <audio src={audioUrl} controls className="w-full max-w-md" />
          </div>
        )}

        {audioBuffer && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button onClick={handleTranscribe} disabled={!isReady || status === 'transcribing'} className="btn-primary">
              {status === 'transcribing' ? 'Transcribing...' : 'Run transcription'}
            </button>

            {!isReady && (
              <div className="text-xs font-mono text-muted-foreground animate-pulse">
                ⚙️ {loadingMessage}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 border border-red-500 bg-red-50 text-red-700 text-xs font-mono">
            {error}
          </div>
        )}

        {output && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase border-b border-black/10 pb-1">Transcript</h4>
            <p className="font-mono text-xs leading-relaxed">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}
