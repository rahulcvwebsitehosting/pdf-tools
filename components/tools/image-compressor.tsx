"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ImageCompressorTool() {
  const [image, setImage] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
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

  const handleCompress = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const out = canvas.toDataURL("image/jpeg", quality);
        setCompressed(out);
      }
    };
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="font-mono text-xs font-bold uppercase">Quality ({quality}):</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-48"
              />
            </div>
            <button onClick={handleCompress} className="btn-primary">Compress Image</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Original Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {compressed && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Compressed Output</h4>
              <img src={compressed} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={compressed} download="compressed_image.jpg" className="btn-primary block text-center mt-2">Download JPEG</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}