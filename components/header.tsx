"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { CommandPalette } from "@/components/command-palette";

export function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as "dark" | "light" | null;
    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1a1f2e]/95 backdrop-blur border-b border-white/10 light:bg-white/95 light:border-black/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <img src="/logo.svg" alt="PDF Tools" className="h-9 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/converter" className="text-sm text-foreground/90 hover:text-white light:hover:text-black transition-colors">
              Converter
            </Link>
            <Link href="/pdf-tools" className="text-sm text-foreground/90 hover:text-white light:hover:text-black transition-colors flex items-center gap-1.5">
              <span className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="w-1 h-1 bg-current rounded-sm" />
                ))}
              </span>
              All tools
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
