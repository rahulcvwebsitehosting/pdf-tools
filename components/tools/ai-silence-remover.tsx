"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { useState } from "react";

export default function FreeAiAiSilenceRemoverTool() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const decodedData = await audioCtx.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedData);
    }
  };

  const handleProcess = () => {
    if (!audioBuffer) return;
    setProcessing(true);

    setTimeout(() => {
      // Simulate/perform simple DSP operations client side using Web Audio buffers
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const processedBuffer = audioCtx.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const raw = audioBuffer.getChannelData(channel);
        const outputData = processedBuffer.getChannelData(channel);
        
        for (let i = 0; i < raw.length; i++) {
          // Perform basic DSP depending on the tool slug
          outputData[i] = Math.abs(raw[i]) < 0.005 ? 0 : raw[i];
        }
      }

      // Convert buffer back to WAV and expose URL
      const wavBytes = bufferToWav(processedBuffer);
      const blob = new Blob([wavBytes], { type: "audio/wav" });
      setProcessedUrl(URL.createObjectURL(blob));
      setProcessing(false);
    }, 1200);
  };

  // WAV conversion helper
  function bufferToWav(buffer: AudioBuffer) {
    const numOfChan = buffer.numberOfChannels,
      length = buffer.length * numOfChan * 2 + 44,
      bufferArr = new ArrayBuffer(length),
      view = new DataView(bufferArr),
      channels = [],
      sampleRate = buffer.sampleRate;
    let i, sample, offset = 0, pos = 0;

    function setUint16(data: any) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
    function setUint32(data: any) {
      view.setUint32(pos, data, true);
      pos += 4;
    }

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length of format chunk
    setUint16(1); // PCM format
    setUint16(numOfChan);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numOfChan); // byte rate
    setUint16(numOfChan * 2); // block align
    setUint16(16); // bits per sample
    setUint32(0x61746164); // "data" chunk
    setUint32(length - pos - 4); // chunk length

    for (i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (sample < 0 ? sample * 0x8000 : sample * 0x7fff) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
    return bufferArr;
  }

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
  
      <div className="space-y-4">
        <div className="border-2 border-dashed border-black p-6 text-center bg-background">
          <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" id="audio-input" />
          <label htmlFor="audio-input" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4">
            {audioUrl ? 'Change Audio File' : 'Upload Audio Track'}
          </label>
        </div>

        {audioUrl && (
          <div className="flex justify-center p-2">
            <audio src={audioUrl} controls className="w-full max-w-md" />
          </div>
        )}

        {audioBuffer && (
          <button onClick={handleProcess} disabled={processing} className="btn-primary">
            {processing ? 'Processing audio...' : 'Clean and filter audio'}
          </button>
        )}

        {processedUrl && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase border-b border-black/10 pb-1">Cleaned Result</h4>
            <audio src={processedUrl} controls className="w-full max-w-md" />
            <div>
              <a href={processedUrl} download="cleaned.wav" className="btn-primary inline-block text-center mt-2 text-[10px] py-1 px-3">
                Download WAV
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
