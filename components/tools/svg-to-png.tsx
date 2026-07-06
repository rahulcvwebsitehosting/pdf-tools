"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function SvgToPngTool() {
  const [svgText, setSvgText] = useState("");
  const [png, setPng] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConvert = () => {
    if (!svgText) return;
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width || 500;
        canvas.height = img.height || 500;
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
        setPng(canvas.toDataURL("image/png"));
        URL.revokeObjectURL(url);
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Paste SVG XML Code</label>
          <textarea
            value={svgText}
            onChange={(e) => setSvgText(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red' /></svg>"
          />
        </div>
        <button onClick={handleConvert} className="btn-primary">Rasterize to PNG</button>

        {png && (
          <div className="editorial-panel p-4 space-y-2 text-center">
            <h4 className="font-mono text-xs font-bold uppercase text-left mb-2">PNG Preview</h4>
            <img src={png} className="max-h-64 object-contain max-w-full mx-auto" />
            <a href={png} download="vector.png" className="btn-primary inline-block mt-4">Download PNG</a>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}