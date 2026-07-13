"use client";

import Link from "next/link";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CommandPalette } from "@/components/command-palette";

export function Header() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const toolsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 text-sm text-foreground/90 hover:text-white light:hover:text-black transition-colors"
            >
              Tools
              <ChevronDown size={14} className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#1a1f2e] light:bg-white border border-white/10 light:border-black/10 rounded-lg shadow-xl py-1.5">
                <Link
                  href="/converter"
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground/90 hover:text-white light:hover:text-black hover:bg-white/5 light:hover:bg-black/5 transition-colors"
                >
                  Converter
                </Link>
                <Link
                  href="/pdf-tools"
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground/90 hover:text-white light:hover:text-black hover:bg-white/5 light:hover:bg-black/5 transition-colors"
                >
                  <span className="grid grid-cols-3 gap-0.5 inline-grid mr-2 align-middle">
                    {[...Array(9)].map((_, i) => (
                      <span key={i} className="w-1 h-1 bg-current rounded-sm" />
                    ))}
                  </span>
                  All tools
                </Link>
              </div>
            )}
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
