"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { useState, useEffect } from "react";
import { useVisionAi } from "@/hooks/useAi";

export default function FreeAiAiImageCaptionTool() {
  const [image, setImage] = useState<string | null>(null);
  const { status, progress, output, error, isReady, loadingMessage, runOcr, generateCaption, initWorker } = useVisionAi('caption');

  useEffect(() => {
    initWorker();
  }, [initWorker]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = () => {
    if (!image || !isReady) return;
    generateCaption(image);
  };

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
  
      <div className="space-y-4">
        <div className="border-2 border-dashed border-black p-6 text-center bg-background">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
          <label htmlFor="image-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4">
            {image ? 'Change Image File' : 'Drag & Drop or Click to Select Document/Image'}
          </label>
        </div>

        {image && (
          <div className="flex justify-center max-h-64 overflow-hidden border border-black/10 p-2">
            <img src={image} alt="Source Preview" className="object-contain" />
          </div>
        )}

        {image && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button onClick={handleProcess} disabled={!isReady || status === 'processing'} className="btn-primary">
              {status === 'processing' ? 'Processing locally...' : 'Analyze with local AI'}
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
            <h4 className="font-mono text-xs font-bold uppercase border-b border-black/10 pb-1">Extracted Text Results</h4>
            <div className="font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
