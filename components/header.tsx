"use client";

import Link from "next/link";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CommandPalette } from "@/components/command-palette";

export function Header() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as "dark" | "light" | null;
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.classList.remove("light");
    } else {
      setTheme("light");
      document.documentElement.classList.add("light");
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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <Link href="/" className="hover:opacity-90 transition-opacity text-foreground">
            <svg viewBox="0 0 220 56" className="h-9 w-auto" role="img" aria-label="PDF Tools">
              <defs>
                <linearGradient id="logo-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2d3a4f"/>
                  <stop offset="1" stop-color="#1a1f2e"/>
                </linearGradient>
                <linearGradient id="logo-spark" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop stop-color="#ffb066"/>
                  <stop offset="1" stop-color="#ff6d00"/>
                </linearGradient>
              </defs>
              <g transform="translate(4,4)">
                <rect width="48" height="48" rx="12" fill="url(#logo-bg)"/>
                <path d="M13 11h16l8 8v21a1.5 1.5 0 0 1-1.5 1.5H13a1.5 1.5 0 0 1-1.5-1.5v-27.5A1.5 1.5 0 0 1 13 11z" fill="#ffffff"/>
                <path d="M29 11v8h8L29 11z" fill="#cbd5e1"/>
                <text x="23" y="32" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="900" fill="#1a1f2e" letter-spacing="-0.3">PDF</text>
                <path d="M31 22l-5 8h4l-2 7 7-10h-4l2-5z" fill="url(#logo-spark)" stroke="#1a1f2e" stroke-width="0.7" stroke-linejoin="round"/>
              </g>
              <g transform="translate(64,0)">
                <text x="0" y="28" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="800" letter-spacing="-0.5" fill="currentColor">PDF</text>
                <text x="40" y="28" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" letter-spacing="-0.3" fill="#8a94a6">Tools</text>
                <text x="0" y="46" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="500" letter-spacing="2" fill="#ff8a3d">TOOLSATZERO</text>
              </g>
            </svg>
          </Link>

          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              Tools
              <ChevronDown size={14} className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-xl py-1.5">
                <Link
                  href="/converter"
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                >
                  File Converter
                </Link>
                <Link
                  href="/pdf-tools"
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                >
                  All tools
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 text-primary hover:opacity-80 transition-opacity"
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
