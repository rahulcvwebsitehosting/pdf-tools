"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { CommandPalette } from "@/components/command-palette";
import { useState } from "react";

export function Header() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center text-sm font-extrabold text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
              P
            </span>
            <span className="font-editorial text-xl font-extrabold tracking-tight text-foreground">
              PDF Tools
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8 justify-center">
            <button
              onClick={() => setCommandOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-full border border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground transition-all text-sm shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Search tools...</span>
              </div>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-secondary text-[10px] font-mono text-muted-foreground rounded">
                Ctrl K
              </kbd>
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <a href="#pdf" className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              PDF
            </a>
            <a href="#developer" className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              Dev
            </a>
            <a href="#office" className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              Text
            </a>
            <a href="#calculators" className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              Calc
            </a>
            <Link href="/" className="ml-2 editorial-btn-primary px-4 py-2 text-sm">
              All Tools
            </Link>
          </nav>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setCommandOpen(true)}
              className="p-2.5 rounded-full border border-border bg-card hover:border-primary transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="p-2.5 rounded-full border border-border bg-card hover:border-primary transition-colors"
              title="Menu"
            >
              {drawerOpen ? <X className="w-4 h-4 text-foreground" /> : <Menu className="w-4 h-4 text-foreground" />}
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed top-16 right-0 bottom-0 z-40 w-64 bg-card border-l border-border p-6 flex flex-col justify-between lg:hidden animate-fade-in-scale shadow-2xl">
            <div className="space-y-2">
              <h3 className="font-mono text-[10px] uppercase font-bold text-muted-foreground border-b border-border pb-2 mb-2">
                Navigation
              </h3>
              {[
                ["PDF Tools", "#pdf"],
                ["Developer Tools", "#developer"],
                ["Office Tools", "#office"],
                ["Image Tools", "#image"],
                ["Web Tools", "#web"],
                ["Time Tools", "#time"],
                ["Calculators", "#calculators"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <Link href="/" onClick={() => setDrawerOpen(false)} className="editorial-btn-primary justify-center">
              All Tools
            </Link>
          </div>
        </>
      )}

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
