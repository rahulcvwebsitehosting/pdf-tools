"use client";

import Link from "next/link";
import { Sun } from "lucide-react";
import { useState } from "react";
import { CommandPalette } from "@/components/command-palette";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1a1f2e]/95 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <Link href="/" className="text-[#3b82f6] text-xl font-bold tracking-tight hover:text-[#60a5fa] transition-colors">
            PDF24 Tools
          </Link>

          <Link href="/pdf-tools" className="text-sm text-foreground/90 hover:text-white transition-colors flex items-center gap-1.5">
            <span className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-1 h-1 bg-current rounded-sm" />
              ))}
            </span>
            All tools
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="#"
              className="p-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
              title="Download"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
            </Link>
            <button
              className="p-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
              title="Theme"
            >
              <Sun size={20} />
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
