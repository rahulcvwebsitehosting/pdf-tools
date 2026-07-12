"use client";
import React, { useState } from "react";

export function PrivacyBadge() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative w-full">
      <div 
        className="neon-badge w-full text-center px-4 py-3.5 text-xs sm:text-sm font-bold border border-border uppercase tracking-wider bg-accent/10 cursor-help flex flex-col sm:flex-row items-center justify-center gap-1 select-none"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <span>🔒 100% Secure & Local: Processing happens entirely within your browser's sandboxed environment. Your data never touches our servers.</span>
        <span className="text-yellow-600 text-[10px] sm:text-xs underline font-mono cursor-pointer sm:ml-2">
          (Privacy Warning)
        </span>
      </div>
      
      {showTooltip && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-11/12 max-w-md p-3 bg-yellow-50 border border-yellow-500 text-yellow-800 text-xs font-mono rounded shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          ⚠️ Privacy Note: To guarantee absolute data isolation, ensure you are not running untrusted browser extensions that can monitor on-screen text activity.
        </div>
      )}
    </div>
  );
}
