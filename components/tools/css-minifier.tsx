"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function CssMinifierTool() {
  const [css, setCss] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    let minified = css
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
      .replace(/\s+/g, " ") // collapse whitespaces
      .replace(/\s*([{}|:;])\s*/g, "$1") // remove spaces around brackets and punctuation
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input CSS</label>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="/* styling comments */
body {
  background-color: white;
  margin: 0px;
}"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Minified Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Minified stylesheet displays here..."
          />
        </div>
      </div>
      <button onClick={handleMinify} className="btn-primary">Minify CSS</button>
    </div>
  );
}