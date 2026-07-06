"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function PngToJpgTool() {
  const [image, setImage] = useState<string | null>(null);
  const [jpg, setJpg] = useState<string | null>(null);
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

  const handleConvert = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
        setJpg(canvas.toDataURL("image/jpeg"));
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload PNG Image</label>
          <input type="file" accept="image/png" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>
        {image && (
          <button onClick={handleConvert} className="btn-primary">Convert to JPG</button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">PNG Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {jpg && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">JPG Output</h4>
              <img src={jpg} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={jpg} download="converted.jpg" className="btn-primary block text-center mt-2">Download JPG</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}