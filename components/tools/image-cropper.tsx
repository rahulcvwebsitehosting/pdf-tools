"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ImageCropperTool() {
  const [image, setImage] = useState<string | null>(null);
  const [cropped, setCropped] = useState<string | null>(null);
  const [cropX, setCropX] = useState(50);
  const [cropY, setCropY] = useState(50);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = cropW;
        canvas.height = cropH;
        ctx?.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
        setCropped(canvas.toDataURL("image/png"));
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>

        {image && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">X offset</label>
              <input type="number" value={cropX} onChange={(e) => setCropX(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Y offset</label>
              <input type="number" value={cropY} onChange={(e) => setCropY(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Width (px)</label>
              <input type="number" value={cropW} onChange={(e) => setCropW(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Height (px)</label>
              <input type="number" value={cropH} onChange={(e) => setCropH(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
          </div>
        )}
        {image && (
          <button onClick={handleCrop} className="btn-primary">Crop Image</button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Original Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {cropped && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Cropped Output</h4>
              <img src={cropped} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={cropped} download="cropped.png" className="btn-primary block text-center mt-2">Download Crop</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}