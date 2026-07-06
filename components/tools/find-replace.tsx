"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function FindReplaceTool() {
  const [text, setText] = useState("");
  const [findStr, setFindStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");
  const [output, setOutput] = useState("");

  const handleReplace = () => {
    if (!findStr) return;
    const parts = text.split(findStr);
    setOutput(parts.join(replaceStr));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="Type text here..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Output Text</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-48 focus:outline-none bg-secondary/10"
            placeholder="Output with replacements displays here..."
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-end">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Find String</label>
          <input
            type="text"
            value={findStr}
            onChange={(e) => setFindStr(e.target.value)}
            className="p-2 border border-black bg-background font-mono text-xs focus:outline-none"
            placeholder="find pattern"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Replace With</label>
          <input
            type="text"
            value={replaceStr}
            onChange={(e) => setReplaceStr(e.target.value)}
            className="p-2 border border-black bg-background font-mono text-xs focus:outline-none"
            placeholder="replacement"
          />
        </div>
        <button onClick={handleReplace} className="btn-primary h-fit">Replace All</button>
      </div>
    </div>
  );
}