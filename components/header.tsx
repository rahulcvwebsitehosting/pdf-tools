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
      <header className="sticky top-0 z-50 bg-background editorial-border-b">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-6 h-6 bg-accent border border-black flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-300">
              T
            </span>
            <span className="font-editorial text-xl font-black tracking-tight text-foreground uppercase">
              Tools
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8 justify-center">
            <button
              onClick={() => setCommandOpen(true)}
              className="w-full flex items-center justify-between px-4 py-1.5 border border-black bg-background text-muted-foreground hover:bg-accent hover:text-black transition-all font-mono text-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-foreground" />
                <span>Search tools...</span>
              </div>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-secondary text-[9px] font-mono text-foreground border border-black">
                Ctrl K
              </kbd>
            </button>
          </div>

          <nav className="hidden lg:flex items-center h-full">
            <div className="flex items-center h-full border-r border-black">
              <a href="#pdf" className="px-4 text-xs font-mono uppercase font-bold text-foreground hover:bg-accent h-14 flex items-center transition-colors border-l border-black">
                PDF
              </a>
              <a href="#developer" className="px-4 text-xs font-mono uppercase font-bold text-foreground hover:bg-accent h-14 flex items-center transition-colors border-l border-black">
                Dev
              </a>
              <a href="#office" className="px-4 text-xs font-mono uppercase font-bold text-foreground hover:bg-accent h-14 flex items-center transition-colors border-l border-black">
                Text
              </a>
              <a href="#calculators" className="px-4 text-xs font-mono uppercase font-bold text-foreground hover:bg-accent h-14 flex items-center transition-colors border-l border-black">
                Calc
              </a>
            </div>
          </nav>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setCommandOpen(true)}
              className="p-2 border border-black hover:bg-accent transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4 text-foreground" />
            </button>

            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="p-2 border border-black hover:bg-accent transition-colors"
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
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed top-14 right-0 bottom-0 z-40 w-64 bg-background border-l border-black p-6 flex flex-col justify-between lg:hidden animate-fade-in-scale">
            <div className="space-y-6">
              <h3 className="font-mono text-[10px] uppercase font-bold text-muted-foreground border-b border-black pb-2">
                Navigation
              </h3>
              <ul className="space-y-4 font-mono text-sm font-bold uppercase">
                <li>
                  <a href="#pdf" onClick={() => setDrawerOpen(false)} className="block hover:bg-accent p-2 border border-transparent hover:border-black transition-all">
                    PDF Tools
                  </a>
                </li>
                <li>
                  <a href="#developer" onClick={() => setDrawerOpen(false)} className="block hover:bg-accent p-2 border border-transparent hover:border-black transition-all">
                    Developer Tools
                  </a>
                </li>
                <li>
                  <a href="#office" onClick={() => setDrawerOpen(false)} className="block hover:bg-accent p-2 border border-transparent hover:border-black transition-all">
                    Office Tools
                  </a>
                </li>
                <li>
                  <a href="#image" onClick={() => setDrawerOpen(false)} className="block hover:bg-accent p-2 border border-transparent hover:border-black transition-all">
                    Image Tools
                  </a>
                </li>
                <li>
                  <a href="#web" onClick={() => setDrawerOpen(false)} className="block hover:bg-accent p-2 border border-transparent hover:border-black transition-all">
                    Web Tools
                  </a>
                </li>
                <li>
                  <a href="#time" onClick={() => setDrawerOpen(false)} className="block hover:bg-accent p-2 border border-transparent hover:border-black transition-all">
                    Time Tools
                  </a>
                </li>
                <li>
                  <a href="#calculators" onClick={() => setDrawerOpen(false)} className="block hover:bg-accent p-2 border border-transparent hover:border-black transition-all">
                    Calculators
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
