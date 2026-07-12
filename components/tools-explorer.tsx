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

const CAT_COLOR: Record<string, { bg: string; fg: string }> = {
  pdf: { bg: "#EFF6FF", fg: "#2563EB" },
  developer: { bg: "#F5F3FF", fg: "#7C3AED" },
  office: { bg: "#FFFBEB", fg: "#D97706" },
  image: { bg: "#FDF2F8", fg: "#DB2777" },
  web: { bg: "#ECFEFF", fg: "#0891B2" },
  time: { bg: "#ECFDF5", fg: "#059669" },
  calculator: { bg: "#FFF7ED", fg: "#EA580C" },
};

export default function ToolsExplorer() {
  const [exploreAll, setExploreAll] = useState(false);

  const activeTools = tools.filter((t) => t.isReady);
  const hasComingSoon = tools.some((t) => !t.isReady);

  return (
    <div className="space-y-16">
      {CATEGORIES.map((cat) => {
        const ready = activeTools.filter((t) => t.category === cat.slug);
        const coming = tools.filter((t) => t.category === cat.slug && !t.isReady);
        const list = exploreAll ? [...ready, ...coming] : ready;
        if (!list.length) return null;

        const color = CAT_COLOR[cat.slug] ?? { bg: "#F1F5F9", fg: "#0F172A" };

        return (
          <div key={cat.slug} id={cat.slug} className="space-y-6 scroll-mt-20">
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="tool-tile !w-11 !h-11"
                  style={{ background: color.bg, color: color.fg }}
                >
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color.fg }} />
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
                  {cat.title}
                </h2>
              </div>
              <span className="neon-badge">{list.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {list.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="editorial-card group p-5 flex flex-col gap-3"
                  >
                    <div
                      className="tool-tile"
                      style={{ background: color.bg, color: color.fg }}
                    >
                      <IconComponent size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <span className="card-title font-semibold text-[15px] block group-hover:text-primary">
                        {tool.name}
                      </span>
                      <p className="card-description text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {tool.tagline}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide pt-3 border-t border-border">
                      <span className={tool.isReady ? "text-primary" : "text-muted-foreground"}>
                        {tool.isReady ? "Launch" : "Coming Soon"}
                      </span>
                      <ArrowRight
                        size={16}
                        className="card-arrow text-muted-foreground transition-transform duration-200"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            {cat.slug === "pdf" && hasComingSoon && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setExploreAll((v) => !v)}
                  className="editorial-btn-primary px-6 py-3 text-sm"
                >
                  {exploreAll ? <Minus size={16} /> : <Plus size={16} />}
                  {exploreAll ? "Show Less" : "Explore More Tools"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
