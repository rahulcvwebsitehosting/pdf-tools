"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function HtmlMinifierTool() {
  const [html, setHtml] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    let minified = html
      .replace(/<!--[\s\S]*?-->/g, "") // remove comments
      .replace(/\s+/g, " ") // collapse whitespaces
      .replace(/>\s+</g, "><") // collapse whitespaces between tags
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input HTML Markup</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="<!-- comment -->
<div>
  <p>Hello World</p>
</div>"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Minified Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Minified markup output displays here..."
          />
        </div>
      </div>
      <button onClick={handleMinify} className="btn-primary">Minify HTML</button>
    </div>
  );
}