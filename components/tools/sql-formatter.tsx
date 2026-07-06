"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function SqlFormatterTool() {
  const [sql, setSql] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = () => {
    if (!sql.trim()) return;
    // Basic regex sql beautification and word upper-casing
    let formatted = sql.replace(/\s+/g, " ");
    const keywords = [
      "SELECT", "FROM", "WHERE", "AND", "OR", "LEFT JOIN", "INNER JOIN",
      "RIGHT JOIN", "JOIN", "ON", "ORDER BY", "GROUP BY", "LIMIT",
      "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"
    ];

    keywords.forEach((kw) => {
      const rx = new RegExp(`\\b${kw}\\b`, "gi");
      formatted = formatted.replace(rx, `\n${kw}`);
    });

    formatted = formatted
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n  ");

    // remove starting extra spaces
    setOutput(formatted.trim());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input SQL</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="SELECT id, name FROM users WHERE active = 1 AND age > 20 ORDER BY name DESC;"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Formatted SQL Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Formatted output will display here..."
          />
        </div>
      </div>
      <button onClick={handleFormat} className="btn-primary">Format SQL</button>
    </div>
  );
}