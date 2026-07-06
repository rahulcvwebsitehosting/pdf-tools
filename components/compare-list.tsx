"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Scale, FileText, ArrowRight } from "lucide-react";
import { comparisonsConfig } from "@/modules/content/comparisons";

export default function CompareList() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredComparisons = comparisonsConfig.filter((c) => {
    const q = search.toLowerCase().trim();
    const matchesSearch = q
      ? c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.formatA.toLowerCase().includes(q) ||
        c.formatB.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
      : true;

    // Filter by category key from topicId (e.g., 'image.webp-vs-png' or 'data.csv-vs-excel')
    const matchesCategory =
      categoryFilter === "all"
        ? true
        : c.meta.topicId.startsWith(categoryFilter);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Tabs Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center border-b border-black/10 pb-6">
        {/* Search */}
        <div className="flex border border-black bg-background w-full sm:w-80">
          <span className="p-2.5 border-r border-black flex items-center bg-secondary">
            <Search size={14} className="text-muted-foreground" />
          </span>
          <input
            type="text"
            placeholder="Search comparisons (e.g. webp, excel)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 bg-transparent font-mono text-xs outline-none border-none focus:ring-0"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 font-mono text-[10px]">
          {[
            { id: "all", label: "ALL" },
            { id: "image", label: "IMAGES" },
            { id: "data", label: "DATA" },
            { id: "document", label: "DOCUMENTS" },
            { id: "markup", label: "MARKUP" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 border border-black uppercase font-bold transition-all cursor-pointer ${
                categoryFilter === tab.id
                  ? "bg-accent text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-background hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparisons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredComparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="editorial-card p-6 border border-black bg-background hover:bg-accent/15 hover:text-black transition-all flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] duration-150"
          >
            <div className="space-y-3">
              {/* Category Indicator */}
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground border-b border-black/5 pb-2">
                <span className="bg-secondary px-2 py-0.5 border border-black/10 font-bold">
                  {c.meta.topicId.split(".")[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Scale size={10} />
                  <span>{c.differences.length} differences</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-editorial text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug">
                  {c.formatA} <span className="text-muted-foreground">vs</span> {c.formatB}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {c.description}
                </p>
              </div>
            </div>

            {/* Read Button */}
            <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-6 font-mono text-[9px] uppercase font-bold text-muted-foreground">
              <span className="bg-secondary px-2 py-0.5 border border-black/10">
                {c.meta.readingTimeMinutes} min read
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <span>View Comparison</span>
                <ArrowRight size={10} />
              </span>
            </div>
          </Link>
        ))}

        {filteredComparisons.length === 0 && (
          <div className="col-span-full border border-black bg-secondary p-12 text-center text-muted-foreground font-mono text-xs">
            <FileText size={20} className="mx-auto mb-3 text-muted-foreground" />
            <span>No comparisons found matching your query.</span>
          </div>
        )}
      </div>
    </div>
  );
}
