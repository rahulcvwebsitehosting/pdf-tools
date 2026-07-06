"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function SortTextLinesTool() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleSort = () => {
    const lines = text.split("\n");
    lines.sort((a, b) => a.localeCompare(b));
    setOutput(lines.join("\n"));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input text lines</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="orange\napple\nbanana"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Sorted Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Sorted lines display here..."
          />
        </div>
      </div>
      <button onClick={handleSort} className="btn-primary">Sort Alphabetically</button>
    </div>
  );
}