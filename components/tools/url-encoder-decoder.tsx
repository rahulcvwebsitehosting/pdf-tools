"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function UrlEncoderDecoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setOutput("Error decoding parameters: Invalid URL component");
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input URL text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="https://example.com/search?q=hello world"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Formatted Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-48 focus:outline-none bg-secondary/10"
            placeholder="URL conversion output displays here..."
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleEncode} className="btn-primary">Encode URL</button>
        <button onClick={handleDecode} className="btn-secondary">Decode URL</button>
      </div>
    </div>
  );
}