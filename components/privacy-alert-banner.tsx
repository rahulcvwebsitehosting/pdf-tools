"use client";
import React, { useState } from "react";

export function PrivacyAlertBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full p-4 border border-blue-200 bg-blue-50/50 text-blue-900 rounded-md flex items-start gap-3 text-xs font-mono shadow-sm">
      <div className="flex-1 leading-relaxed">
        <span className="font-bold">🛡️ Maximum Privacy Recommended:</span> For highly sensitive workloads, we strongly recommend using this tool inside a Private/Incognito Window with all browser extensions temporarily disabled.
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none px-1"
        aria-label="Dismiss privacy alert"
      >
        ✕
      </button>
    </div>
  );
}
