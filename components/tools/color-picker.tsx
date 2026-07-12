"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ColorPickerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      if (ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + Array.from(pixel.slice(0, 3)).map((b) => b.toString(16).padStart(2, "0")).join("");
        setColor(hex);
      }
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-border bg-background font-mono text-xs w-full" />
        </div>

        {image && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">Click on Canvas to Extract Colors</h4>
            <canvas ref={canvasRef} onClick={handleCanvasClick} className="cursor-crosshair max-h-[300px] max-w-full mx-auto block border border-border" />
          </div>
        )}

        <div className="editorial-panel p-4 flex items-center gap-4">
          <div className="w-12 h-12 border border-border" style={{ backgroundColor: color }} />
          <div>
            <h4 className="font-mono text-xs font-bold uppercase">Selected Color</h4>
            <p className="font-mono text-sm uppercase">{color}</p>
          </div>
        </div>
      </div>
    </div>
  );
}