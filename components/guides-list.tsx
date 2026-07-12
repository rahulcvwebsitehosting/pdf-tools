"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Clock, Award, FileText, ArrowRight } from "lucide-react";
import { guidesConfig } from "@/modules/content/guides";

export default function GuidesList() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filteredGuides = guidesConfig.filter((g) => {
    const q = search.toLowerCase().trim();
    const matchesSearch = q
      ? g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.keywords.some((k) => k.toLowerCase().includes(q))
      : true;

    const matchesDifficulty =
      difficultyFilter === "all" ? true : g.meta.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center border-b border-border pb-6">
        {/* Search */}
        <div className="flex border border-border bg-background w-full sm:w-80">
          <span className="p-2.5 border-r border-border flex items-center bg-secondary">
            <Search size={14} className="text-muted-foreground" />
          </span>
          <input
            type="text"
            placeholder="Search guides or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 bg-transparent font-mono text-xs outline-none border-none focus:ring-0"
          />
        </div>

        {/* Difficulty Filters */}
        <div className="flex flex-wrap gap-1 font-mono text-[10px]">
          {["all", "beginner", "intermediate", "advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficultyFilter(level)}
              className={`px-3 py-1.5 border border-border uppercase font-bold transition-all cursor-pointer ${
                difficultyFilter === level
                  ? "bg-accent text-accent-foreground shadow-soft"
                  : "bg-background hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="editorial-card p-6 border border-border bg-background hover:bg-accent/15 hover:text-primary transition-all flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] duration-150"
          >
            <div className="space-y-3">
              {/* Category & Stats */}
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground border-b border-border/5 pb-2">
                <span className="bg-secondary px-2 py-0.5 border border-border font-bold">
                  {guide.meta.topicId.split(".")[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  <span>{guide.meta.readingTimeMinutes} min</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-editorial text-lg sm:text-xl font-bold uppercase tracking-tight leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {guide.description}
                </p>
              </div>
            </div>

            {/* Read Button */}
            <div className="flex items-center justify-between border-t border-border/5 pt-4 mt-6 font-mono text-[9px] uppercase font-bold text-muted-foreground">
              <span className="flex items-center gap-1">
                <Award size={10} />
                <span className="capitalize">{guide.meta.difficulty}</span>
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <span>Read Guide</span>
                <ArrowRight size={10} />
              </span>
            </div>
          </Link>
        ))}

        {filteredGuides.length === 0 && (
          <div className="col-span-full border border-border bg-secondary p-12 text-center text-muted-foreground font-mono text-xs">
            <FileText size={20} className="mx-auto mb-3 text-muted-foreground" />
            <span>No guides found matching your selection. Try typing another query.</span>
          </div>
        )}
      </div>
    </div>
  );
}
