"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { tools } from "@/lib/tools";
import type { Tool } from "@/lib/tools";

const CATEGORIES: { slug: string; title: string }[] = [
  { slug: "pdf", title: "PDF Tools" },
  { slug: "developer", title: "Developer Tools" },
  { slug: "office", title: "Office & Text Tools" },
  { slug: "image", title: "Image Tools" },
  { slug: "web", title: "Web Tools" },
  { slug: "time", title: "Time Tools" },
  { slug: "calculator", title: "Calculators" },
];

export default function ToolsExplorer() {
  const [exploreAll, setExploreAll] = useState(false);

  const activeTools = tools.filter((t) => t.isReady);
  const hasComingSoon = tools.some((t) => !t.isReady);

  return (
    <div className="space-y-16">
      {CATEGORIES.map((cat, catIdx) => {
        const ready = activeTools.filter((t) => t.category === cat.slug);
        const coming = tools.filter((t) => t.category === cat.slug && !t.isReady);
        const list = exploreAll ? [...ready, ...coming] : ready;
        if (!list.length) return null;

        return (
          <div
            key={cat.slug}
            id={cat.slug}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-black pb-4">
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                {cat.title}
              </h2>
              <span className="neon-badge px-3 py-1 text-xs">{list.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-l border-black bg-background">
              {list.map((tool, idx) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="editorial-card flex flex-col justify-between p-6 group border-r border-b border-black"
                  >
                    <div className="space-y-4">
                      <div className="card-icon shrink-0 text-foreground">
                        <IconComponent size={24} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <span className="card-title font-bold text-base block group-hover:underline">
                          {tool.name}
                        </span>
                        <p className="card-description text-xs text-muted-foreground leading-relaxed">
                          {tool.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between font-mono text-[10px] uppercase font-bold tracking-wider pt-2 border-t border-dashed border-black/10">
                      <span className="flex items-center gap-2">
                        {tool.isReady ? "Launch" : "Coming Soon"}
                      </span>
                      <ArrowRight
                        size={14}
                        className="card-arrow text-muted-foreground transition-transform duration-200"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {hasComingSoon && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setExploreAll((v) => !v)}
            className="editorial-btn-primary px-6 py-3 font-mono text-xs uppercase font-bold flex items-center gap-2"
          >
            {exploreAll ? <Minus size={14} /> : <Plus size={14} />}
            {exploreAll ? "Show Less" : "Explore More Tools"}
          </button>
        </div>
      )}
    </div>
  );
}
