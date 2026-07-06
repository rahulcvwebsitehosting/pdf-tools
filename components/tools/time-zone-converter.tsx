"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function TimeZoneConverterTool() {
  const [dateVal, setDateVal] = useState("");
  const [targetZone, setTargetZone] = useState("UTC");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!dateVal) return;
    try {
      const d = new Date(dateVal);
      const str = d.toLocaleString("en-US", { timeZone: targetZone });
      setOutput(str);
    } catch {
      setOutput("Error: Invalid timezone selection or Date value");
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Select Local Time</label>
            <input type="datetime-local" value={dateVal} onChange={(e) => setDateVal(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Target Timezone</label>
            <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none">
              <option value="UTC">UTC</option>
              <option value="America/New_York">EST (America/New_York)</option>
              <option value="Europe/London">GMT (Europe/London)</option>
              <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
            </select>
          </div>
        </div>
        <button onClick={handleConvert} className="btn-primary">Convert Timezone</button>

        {output && (
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">Converted date-time</h4>
            <p className="font-mono text-sm">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}