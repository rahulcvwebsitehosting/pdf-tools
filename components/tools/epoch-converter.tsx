"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function EpochConverterTool() {
  const [epoch, setEpoch] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [utcStr, setUtcStr] = useState("");

  const handleConvert = () => {
    const rawVal = parseInt(epoch.trim(), 10);
    if (isNaN(rawVal)) return;
    const date = new Date(rawVal * (epoch.trim().length <= 10 ? 1000 : 1));
    setDateStr(date.toString());
    setUtcStr(date.toUTCString());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Unix Epoch Timestamp (sec or ms)</label>
            <input type="text" value={epoch} onChange={(e) => setEpoch(e.target.value)} className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none" placeholder="1718300000" />
          </div>
          <button onClick={handleConvert} className="btn-primary h-fit">Convert Epoch</button>
        </div>

        {dateStr && (
          <div className="space-y-2">
            <div className="editorial-panel p-4">
              <h4 className="font-mono text-xs font-bold uppercase mb-1">Local Date</h4>
              <p className="font-mono text-sm">{dateStr}</p>
            </div>
            <div className="editorial-panel p-4">
              <h4 className="font-mono text-xs font-bold uppercase mb-1">UTC Date</h4>
              <p className="font-mono text-sm">{utcStr}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}