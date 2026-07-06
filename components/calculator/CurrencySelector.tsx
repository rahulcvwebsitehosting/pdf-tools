"use client";

import { useState, useEffect } from "react";
import { currenciesList, CurrencyInfo } from "@/lib/tools-engine/financial/currency";
import { savePreferences, loadPreferences } from "@/lib/tools-engine/storage";
import { Globe, Search, Star } from "lucide-react";

interface CurrencySelectorProps {
  selectedCode: string;
  onChange: (code: string) => void;
}

export default function CurrencySelector({ selectedCode, onChange }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const cachedFavs = loadPreferences("favorite_currencies", ["USD", "INR", "EUR", "GBP"]);
    setFavorites(cachedFavs);
  }, []);

  const toggleFavorite = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.includes(code)
      ? favorites.filter(c => c !== code)
      : [...favorites, code];
    setFavorites(updated);
    savePreferences("favorite_currencies", updated);
  };

  const filtered = currenciesList.filter(c => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  });

  // Sort by favorites first, then by alphabetical code
  const sortedCurrencies = [...filtered].sort((a, b) => {
    const aFav = favorites.includes(a.code) ? 1 : 0;
    const bFav = favorites.includes(b.code) ? 1 : 0;
    if (aFav !== bFav) return bFav - aFav;
    return a.code.localeCompare(b.code);
  });

  const activeCurrency = currenciesList.find(c => c.code === selectedCode) || currenciesList[0];

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 border border-black bg-background font-mono text-xs focus:outline-none cursor-pointer hover:bg-accent/10 transition-colors"
        title="Select regional currency"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm shrink-0">{activeCurrency.flag}</span>
          <span className="font-bold">{activeCurrency.code}</span>
          <span className="text-muted-foreground">({activeCurrency.symbol})</span>
        </div>
        <Globe size={14} className="text-muted-foreground" />
      </button>

      {open && (
        <>
          {/* Click away backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />

          <div className="absolute left-0 right-0 mt-1 z-40 bg-background border border-black max-h-64 overflow-y-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-fade-in-scale">
            {/* Search Input */}
            <div className="sticky top-0 bg-background border-b border-black px-3 py-2 flex items-center gap-2 z-10">
              <Search size={14} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search currency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent font-mono text-xs outline-none focus:ring-0 border-none p-0"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* List */}
            <div className="divide-y divide-black/10" role="listbox">
              {sortedCurrencies.map((c) => {
                const isSelected = c.code === selectedCode;
                const isFav = favorites.includes(c.code);
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    role="option"
                    aria-selected={isSelected}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left font-mono text-xs hover:bg-accent transition-colors ${
                      isSelected ? "bg-accent/40 font-bold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm shrink-0">{c.flag}</span>
                      <span className="font-bold shrink-0">{c.code}</span>
                      <span className="text-[10px] text-muted-foreground truncate">
                        {c.name} ({c.country})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold shrink-0 text-muted-foreground">{c.symbol}</span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => toggleFavorite(c.code, e)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { toggleFavorite(c.code, e as any); } }}
                        className="text-muted-foreground hover:text-yellow-500 transition-colors cursor-pointer"
                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star
                          size={12}
                          className={isFav ? "fill-yellow-500 text-yellow-500" : ""}
                        />
                      </span>
                    </div>
                  </button>
                );
              })}

              {sortedCurrencies.length === 0 && (
                <div className="px-3 py-4 text-center text-muted-foreground text-xs font-mono">
                  No currencies match search parameters.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
