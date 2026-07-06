"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function RegexTesterTool() {
  const [regex, setRegex] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<{ match: string; index: number }[]>([]);
  const [error, setError] = useState("");

  const handleTest = () => {
    setError("");
    setMatches([]);

    if (!regex) return;

    try {
      const rx = new RegExp(regex, flags);
      let match;
      const res: { match: string; index: number }[] = [];
      if (flags.includes("g")) {
        while ((match = rx.exec(text)) !== null) {
          res.push({ match: match[0], index: match.index });
          if (rx.lastIndex === match.index) {
            rx.lastIndex++; // Prevent infinite loop on zero-width match
          }
        }
      } else {
        match = rx.exec(text);
        if (match) {
          res.push({ match: match[0], index: match.index });
        }
      }
      setMatches(res);
    } catch (e: any) {
      setError(e.message || "Invalid regular expression pattern");
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Regex Pattern</label>
            <input
              type="text"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none"
              placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Regex Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none"
              placeholder="g, i, m"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Test Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-24 focus:outline-none"
            placeholder="Type text to test regular expression patterns..."
          />
        </div>
        <button onClick={handleTest} className="btn-primary">Test Expression</button>

        {error && (
          <div className="p-4 border border-black bg-accent text-black font-mono text-xs uppercase">
            {error}
          </div>
        )}

        <div className="editorial-panel p-4">
          <h4 className="font-mono text-xs font-bold uppercase mb-2">Matches ({matches.length})</h4>
          <div className="space-y-2 max-h-40 overflow-auto">
            {matches.map((m, idx) => (
              <div key={idx} className="font-mono text-xs p-1 border-b border-black/10">
                Matched <span className="bg-accent text-black font-bold px-1">"{m.match}"</span> at position {m.index}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}