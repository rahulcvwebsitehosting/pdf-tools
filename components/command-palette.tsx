"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/lib/tools";
import { Search } from "lucide-react";
import { getSearchIndex, SearchIndexItem } from "@/lib/tools-engine/seo/search-index";
import * as LucideIcons from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  // Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleSelect = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [router, onOpenChange]
  );

  if (!open) return null;

  return (
    <CommandPaletteInner
      onClose={() => onOpenChange(false)}
      onSelect={handleSelect}
    />
  );
}

function CommandPaletteInner({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (href: string) => void;
}) {
  const [query, setQuery] = useState("");
  const searchIndex = getSearchIndex();

  const filtered = searchIndex.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true; // Show all by default
    const terms = q.split(/\s+/);
    return terms.every((term) => {
      return (
        item.title.toLowerCase().includes(term) ||
        item.subtitle.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.keywords.some((kw) => kw.toLowerCase().includes(term))
      );
    });
  });

  // Focus input on mount
  const inputRef = useCallback((node: HTMLInputElement | null) => {
    if (node) node.focus();
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4">
        <div
          className="w-full max-w-lg editorial-border bg-background animate-fade-in-scale overflow-hidden"
          role="dialog"
          aria-label="Search platform"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 editorial-border-b">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, guides, categories..."
              className="flex-1 py-3.5 bg-transparent text-foreground font-mono text-sm placeholder:text-muted-foreground outline-none"
            />
            <kbd className="shrink-0 px-1.5 py-0.5 bg-muted text-[11px] font-mono text-muted-foreground editorial-border">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-72 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground font-mono">
                No results found.
              </p>
            ) : (
              filtered.map((item, index) => {
                const matchedTool = item.type === "tool" ? tools.find(t => t.slug === item.slug) : null;
                const Icon = matchedTool?.icon || (
                  item.type === "category" ? LucideIcons.Layers :
                  item.type === "hub" ? LucideIcons.Sparkles :
                  item.type === "guide" ? LucideIcons.BookOpen : LucideIcons.FileText
                );

                return (
                  <button
                    key={`${item.type}-${item.slug}`}
                    onClick={() => onSelect(item.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer ${
                      index < filtered.length - 1 ? "editorial-border-b" : ""
                    }`}
                  >
                    <div className="w-8 h-8 editorial-border flex items-center justify-center shrink-0 bg-muted">
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {item.title}
                        </p>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 border border-border bg-secondary text-muted-foreground shrink-0 select-none">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
