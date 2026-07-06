"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function TextDiffCheckerTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<{ type: string; val: string }[]>([]);

  const handleCompare = () => {
    const origLines = original.split("\n");
    const modLines = modified.split("\n");
    const result: { type: string; val: string }[] = [];

    let i = 0, j = 0;
    while (i < origLines.length || j < modLines.length) {
      if (i < origLines.length && j < modLines.length) {
        if (origLines[i] === modLines[j]) {
          result.push({ type: "same", val: origLines[i] });
          i++;
          j++;
        } else {
          // simple check for single line addition/deletion
          if (origLines[i + 1] === modLines[j]) {
            result.push({ type: "del", val: origLines[i] });
            i++;
          } else if (origLines[i] === modLines[j + 1]) {
            result.push({ type: "add", val: modLines[j] });
            j++;
          } else {
            result.push({ type: "del", val: origLines[i] });
            result.push({ type: "add", val: modLines[j] });
            i++;
            j++;
          }
        }
      } else if (i < origLines.length) {
        result.push({ type: "del", val: origLines[i] });
        i++;
      } else if (j < modLines.length) {
        result.push({ type: "add", val: modLines[j] });
        j++;
      }
    }
    setDiff(result);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Original Text</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="Paste original text here..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Modified Text</label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>
      <button onClick={handleCompare} className="btn-primary">Compare Text</button>

      {diff.length > 0 && (
        <div className="editorial-panel p-4 space-y-2">
          <h3 className="font-mono text-xs font-bold uppercase border-b border-black pb-2">Diff Highlights</h3>
          <div className="font-mono text-xs overflow-auto max-h-96 space-y-1 p-2 bg-secondary/10">
            {diff.map((line, idx) => (
              <div
                key={idx}
                className={`p-1 ${
                  line.type === "add" ? "bg-green-100 text-green-800" :
                  line.type === "del" ? "bg-red-100 text-red-800" : ""
                }`}
              >
                <span>{line.type === "add" ? "+ " : line.type === "del" ? "- " : "  "}</span>
                {line.val}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}