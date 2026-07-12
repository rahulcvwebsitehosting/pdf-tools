"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function TimeCalculatorTool() {
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(0);
  const [operation, setOperation] = useState("add");
  const [output, setOutput] = useState("");

  const handleCalculate = () => {
    if (!startDate) return;
    const date = new Date(startDate);
    const offset = days * (operation === "add" ? 1 : -1);
    date.setDate(date.getDate() + offset);
    setOutput(date.toString());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Days offset</label>
            <input type="number" value={days} onChange={(e) => setDays(parseInt(e.target.value, 10))} className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Operation</label>
            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none">
              <option value="add">Add</option>
              <option value="subtract">Subtract</option>
            </select>
          </div>
        </div>
        <button onClick={handleCalculate} className="btn-primary">Calculate Result</button>

        {output && (
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">New Date Result</h4>
            <p className="font-mono text-sm">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}