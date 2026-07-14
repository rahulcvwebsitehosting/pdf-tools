"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Plus, Minus, ArrowRightLeft } from "lucide-react";
import { tools } from "@/lib/tools";

const CATEGORIES: { slug: string; title: string }[] = [
  { slug: "pdf", title: "PDF Tools" },
  { slug: "developer", title: "Developer Tools" },
  { slug: "office", title: "Office & Text Tools" },
  { slug: "image", title: "Image Tools" },
  { slug: "web", title: "Web Tools" },
  { slug: "time", title: "Time Tools" },
  { slug: "calculator", title: "Calculators" },
];

const FAV_KEY = "taz_pref_favorite_tools";

export default function ToolsExplorer() {
  const [exploreAll, setExploreAll] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAV_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const activeTools = tools.filter((t) => t.isReady);
  const hasComingSoon = tools.some((t) => !t.isReady);

  const favoriteTools = activeTools.filter((t) => favorites.includes(t.slug));

  return (
    <section id="tools" className="space-y-12">
      {/* Favorites section */}
      {favoriteTools.length > 0 && (
        <div className="space-y-5 scroll-mt-20">
          <h2 className="font-editorial text-xl sm:text-2xl font-bold text-foreground text-center flex items-center justify-center gap-2">
            <Star size={20} className="text-primary fill-primary" />
            Favorites
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {favoriteTools.map((tool) => {
              const IconComponent = tool.icon;
              const isFav = favorites.includes(tool.slug);
              return (
                <div
                  key={tool.slug}
                  className="editorial-card group relative p-5 flex flex-col items-center text-center min-h-[140px] justify-center"
                >
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(tool.slug); }}
                    className="absolute top-2.5 right-2.5 z-10"
                    aria-label="Toggle favorite"
                  >
                    <Star
                      size={14}
                      className={`transition-colors ${isFav ? "text-primary fill-primary" : "text-muted-foreground/50 group-hover:text-[#ff8a3d]"}`}
                    />
                  </button>
                  <Link href={tool.href} className="flex flex-col items-center text-center w-full">
                    <div className="card-icon mb-3 text-foreground/90 group-hover:text-white transition-colors">
                      <IconComponent size={42} strokeWidth={1.3} />
                    </div>
                    <span className="card-title text-sm font-medium text-foreground/90 group-hover:text-white transition-colors">
                      {tool.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Converter card — prominent, before categories */}
      <div className="space-y-5 scroll-mt-20">
        <h2 className="font-editorial text-xl sm:text-2xl font-bold text-foreground text-center">
          File Converter
        </h2>
        <div className="flex justify-center">
          <Link
            href="/converter"
            className="editorial-card group relative p-8 flex flex-col items-center text-center max-w-md w-full"
          >
            <div className="card-icon mb-4 text-primary group-hover:text-[#ff8a3d] transition-colors">
              <ArrowRightLeft size={56} strokeWidth={1.3} />
            </div>
            <span className="card-title text-lg font-bold text-foreground/90 group-hover:text-white transition-colors">
              Universal File Converter
            </span>
            <span className="text-sm text-muted-foreground mt-2">
              Convert images, audio, video, documents, archives & more — 82 formats, 100% in your browser
            </span>
          </Link>
        </div>
      </div>

      {CATEGORIES.map((cat) => {
        const ready = activeTools.filter((t) => t.category === cat.slug);
        const coming = tools.filter((t) => t.category === cat.slug && !t.isReady);
        const list = exploreAll ? [...ready, ...coming] : ready;
        if (!list.length) return null;

        return (
          <div key={cat.slug} id={cat.slug} className="space-y-5 scroll-mt-20">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-foreground text-center">
              {cat.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {list.map((tool) => {
                const IconComponent = tool.icon;
                const isFav = favorites.includes(tool.slug);
                return (
                  <div
                    key={tool.slug}
                    className="editorial-card group relative p-5 flex flex-col items-center text-center min-h-[140px] justify-center"
                  >
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFavorite(tool.slug); }}
                      className="absolute top-2.5 right-2.5 z-10"
                      aria-label="Toggle favorite"
                    >
                      <Star
                        size={14}
                        className={`transition-colors ${isFav ? "text-primary fill-primary" : "text-muted-foreground/50 group-hover:text-[#ff8a3d]"}`}
                      />
                    </button>
                    <Link href={tool.href} className="flex flex-col items-center text-center w-full">
                      <div className="card-icon mb-3 text-foreground/90 group-hover:text-white transition-colors">
                        <IconComponent size={42} strokeWidth={1.3} />
                      </div>
                      <span className="card-title text-sm font-medium text-foreground/90 group-hover:text-white transition-colors">
                        {tool.name}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>

            {cat.slug === "pdf" && hasComingSoon && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setExploreAll((v) => !v)}
                  className="editorial-btn-primary"
                >
                  {exploreAll ? <Minus size={16} /> : <Plus size={16} />}
                  {exploreAll ? "Show Less" : "Explore More Tools"}
                </button>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-center pt-4">
        <Link href="/pdf-tools" className="editorial-btn-primary">
          <span className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1 h-1 bg-white rounded-sm" />
            ))}
          </span>
          All tools
        </Link>
      </div>
    </section>
  );
}
