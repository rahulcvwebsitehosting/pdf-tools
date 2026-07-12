"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => {
    const res: string[] = [];
    const target = Math.max(1, Math.min(100, count));
    for (let i = 0; i < target; i++) {
      res.push(crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }));
    }
    setUuids(res);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs font-bold uppercase">Generate Quantity:</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            className="p-1 border border-border w-20 bg-background font-mono text-xs focus:outline-none"
            min={1}
            max={100}
          />
        </div>
        <button onClick={handleGenerate} className="btn-primary">Generate UUIDs</button>

        {uuids.length > 0 && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase">Generated Identifiers</h4>
            <pre className="font-mono text-xs bg-secondary/15 p-2 overflow-auto max-h-60 whitespace-pre">{uuids.join("\n")}</pre>
          </div>
        )}
      </div>
    </div>
  );
}