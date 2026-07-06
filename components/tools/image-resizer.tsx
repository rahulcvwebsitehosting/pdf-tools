"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ImageResizerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [resized, setResized] = useState<string | null>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
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

  const handleResize = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        setResized(canvas.toDataURL("image/png"));
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
          <div className="flex gap-2 items-end">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Width (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-24" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Height (px)</label>
              <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-24" />
            </div>
            <button onClick={handleResize} className="btn-primary h-fit">Resize</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Original Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {resized && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Resized Output</h4>
              <img src={resized} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={resized} download="resized_image.png" className="btn-primary block text-center mt-2">Download PNG</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}