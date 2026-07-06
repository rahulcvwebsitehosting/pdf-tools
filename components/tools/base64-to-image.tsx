"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function Base64ToImageTool() {
  const [base64, setBase64] = useState("");
  const [image, setImage] = useState("");

  const handleConvert = () => {
    if (!base64.trim()) return;
    setImage(base64.trim().startsWith("data:image") ? base64.trim() : `data:image/png;base64,${base64.trim()}`);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Paste Base64 Image String</label>
          <textarea
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
            className="editorial-textarea h-36 focus:outline-none"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANS..."
          />
        </div>
        <button onClick={handleConvert} className="btn-primary">Render Image</button>

        {image && (
          <div className="editorial-panel p-4 space-y-2 text-center">
            <h4 className="font-mono text-xs font-bold uppercase text-left mb-2">Decoded Image Output</h4>
            <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            <a href={image} download="decoded_image.png" className="btn-primary inline-block mt-4">Download Image</a>
          </div>
        )}
      </div>
    </div>
  );
}