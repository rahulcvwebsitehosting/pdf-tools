"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function HtmlEntitiesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    const temp = document.createElement("div");
    temp.textContent = input;
    setOutput(temp.innerHTML);
  };

  const handleDecode = () => {
    const temp = document.createElement("div");
    temp.innerHTML = input;
    setOutput(temp.textContent || "");
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="Type code or characters to convert..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Output Text</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Entity conversion results display here..."
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleEncode} className="btn-primary">Encode Entities</button>
        <button onClick={handleDecode} className="btn-secondary">Decode Entities</button>
      </div>
    </div>
  );
}