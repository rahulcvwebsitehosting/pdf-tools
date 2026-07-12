"use client";

import { CommandPalette } from "@/components/command-palette";
import { useState } from "react";
import { Search } from "lucide-react";

export function HomeHeroSearch() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full max-w-xl mx-auto flex items-center gap-3 px-5 py-3.5 rounded-full border border-border bg-card shadow-soft text-muted-foreground hover:border-primary hover:shadow-lift transition-all"
      >
        <Search className="w-5 h-5" />
        <span className="text-sm">Search 200+ tools...</span>
        <kbd className="ml-auto inline-flex items-center gap-0.5 px-2 py-0.5 bg-secondary text-[10px] font-mono text-muted-foreground rounded">
          Ctrl K
        </kbd>
      </button>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
