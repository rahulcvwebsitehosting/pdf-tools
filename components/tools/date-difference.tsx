"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function DateDifferenceTool() {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [daysDiff, setDaysDiff] = useState<number | null>(null);

  const handleCalculate = () => {
    if (!dateA || !dateB) return;
    const dA = new Date(dateA);
    const dB = new Date(dateB);
    const msDiff = Math.abs(dB.getTime() - dA.getTime());
    setDaysDiff(Math.floor(msDiff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Start Date</label>
          <input type="date" value={dateA} onChange={(e) => setDateA(e.target.value)} className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">End Date</label>
          <input type="date" value={dateB} onChange={(e) => setDateB(e.target.value)} className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none" />
        </div>
      </div>
      <button onClick={handleCalculate} className="btn-primary">Calculate Difference</button>

      {daysDiff !== null && (
        <div className="editorial-panel p-4">
          <h4 className="font-mono text-xs font-bold uppercase mb-1">Date Offset Spans</h4>
          <p className="font-mono text-sm">{daysDiff} days difference between date selections.</p>
        </div>
      )}
    </div>
  );
}