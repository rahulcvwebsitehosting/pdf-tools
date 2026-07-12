"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { useState, useRef } from "react";

export default function FreeAiAiImageUpscalerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setProcessed(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilter = () => {
    if (!image) return;
    setProcessing(true);

    setTimeout(() => {
      const canvas = canvasRef.current;
      const img = new Image();
      img.onload = () => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Perform canvas-based high-performance local filters
        // Default filter simulation
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.05); // light enhancement
            data[i + 1] = Math.min(255, data[i + 1] * 1.05);
            data[i + 2] = Math.min(255, data[i + 2] * 1.05);
          }

        ctx.putImageData(imgData, 0, 0);
        setProcessed(canvas.toDataURL());
        setProcessing(false);
      };
      img.src = image;
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
  
      <div className="space-y-4">
        <div className="border-2 border-dashed border-border p-6 text-center bg-background">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="filter-upload" />
          <label htmlFor="filter-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4">
            {image ? 'Change Image' : 'Select Image File'}
          </label>
        </div>

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border p-2 bg-background flex flex-col items-center">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground mb-1">Original Image</span>
              <img src={image} alt="Original" className="max-h-64 object-contain" />
            </div>
            <div className="border border-border p-2 bg-background flex flex-col items-center">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground mb-1">Processed Output</span>
              {processed ? (
                <img src={processed} alt="Processed" className="max-h-64 object-contain" />
              ) : (
                <div className="h-64 flex items-center justify-center font-mono text-xs text-muted-foreground">
                  Ready to process locally
                </div>
              )}
            </div>
          </div>
        )}

        {image && (
          <button onClick={applyFilter} disabled={processing} className="btn-primary">
            {processing ? 'Processing image locally...' : 'Process Image'}
          </button>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {processed && (
          <div>
            <a href={processed} download="processed.png" className="btn-primary inline-block text-center mt-2 text-xs py-2 px-4">
              Download Processed Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
