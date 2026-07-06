"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function JsMinifierTool() {
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    let minified = js
      .replace(/\/\/[^\n]*\n/g, "") // remove double-slash comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove multi-line comments
      .replace(/\s+/g, " ") // collapse spaces
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input JavaScript Code</label>
          <textarea
            value={js}
            onChange={(e) => setJs(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="// run program
function sum(a, b) {
  return a + b;
}"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Minified Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Minified script output displays here..."
          />
        </div>
      </div>
      <button onClick={handleMinify} className="btn-primary">Minify JS</button>
    </div>
  );
}