"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keys, setKeys] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    let meta = `<!-- SEO Meta Tags -->\n<title>${title}</title>\n`;
    if (desc) meta += `<meta name="description" content="${desc}">\n`;
    if (keys) meta += `<meta name="keywords" content="${keys}">\n`;
    meta += `<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website">\n<meta property="og:title" content="${title}">\n`;
    if (desc) meta += `<meta property="og:description" content="${desc}">\n`;
    setOutput(meta);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Website Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Meta Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="editorial-textarea h-24 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Keywords</label>
            <input type="text" value={keys} onChange={(e) => setKeys(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <button onClick={handleGenerate} className="btn-primary">Generate Tags</button>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Generated HTML Meta Tags</label>
          <textarea readOnly value={output} className="editorial-textarea h-64 focus:outline-none bg-secondary/10" placeholder="Meta tags will display here..." />
        </div>
      </div>
    </div>
  );
}