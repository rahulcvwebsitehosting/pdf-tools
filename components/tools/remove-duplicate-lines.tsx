"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function RemoveDuplicateLinesTool() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleRemove = () => {
    const lines = text.split("\n");
    const unique = Array.from(new Set(lines));
    setOutput(unique.join("\n"));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input text list</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="line A\nline B\nline A..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Deduplicated Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Unique lines display here..."
          />
        </div>
      </div>
      <button onClick={handleRemove} className="btn-primary">Deduplicate Lines</button>
    </div>
  );
}