"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Plus, Minus } from "lucide-react";
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

export default function ToolsExplorer() {
  const [exploreAll, setExploreAll] = useState(false);

  const activeTools = tools.filter((t) => t.isReady);
  const hasComingSoon = tools.some((t) => !t.isReady);

  return (
    <section id="tools" className="space-y-12">
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
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="editorial-card group relative p-5 flex flex-col items-center text-center min-h-[140px] justify-center"
                  >
                    <Star
                      size={14}
                      className="absolute top-2.5 right-2.5 text-muted-foreground/50 group-hover:text-[#ff8a3d] transition-colors"
                    />
                    <div className="card-icon mb-3 text-foreground/90 group-hover:text-white transition-colors">
                      <IconComponent size={42} strokeWidth={1.3} />
                    </div>
                    <span className="card-title text-sm font-medium text-foreground/90 group-hover:text-white transition-colors">
                      {tool.name}
                    </span>
                  </Link>
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
