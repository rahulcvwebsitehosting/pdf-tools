"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function RobotsTxtGeneratorTool() {
  const [sitemap, setSitemap] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("none");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    let text = "User-agent: *\nAllow: /\n";
    if (crawlDelay !== "none") text += `Crawl-delay: ${crawlDelay}\n`;
    if (sitemap) text += `Sitemap: ${sitemap}\n`;
    setOutput(text);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Sitemap URL</label>
            <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" placeholder="https://example.com/sitemap.xml" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Crawl Delay</label>
            <select value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none">
              <option value="none">None</option>
              <option value="1">1 second</option>
              <option value="5">5 seconds</option>
              <option value="10">10 seconds</option>
            </select>
          </div>
          <button onClick={handleGenerate} className="btn-primary">Generate Robots.txt</button>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Robots.txt Output</label>
          <textarea readOnly value={output} className="editorial-textarea h-48 focus:outline-none bg-secondary/10" placeholder="crawler rules output will display here..." />
        </div>
      </div>
    </div>
  );
}