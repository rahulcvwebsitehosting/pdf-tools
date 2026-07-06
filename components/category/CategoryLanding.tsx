"use client";

import { useState } from "react";
import Link from "next/link";
import { getCategoryBySlug, CategoryConfig } from "@/modules/categories/category.config";
import { tools } from "@/lib/tools";
import { guidesConfig } from "@/modules/content/guides";
import { comparisonsConfig } from "@/modules/content/comparisons";
import {
  Search, Sparkles, AlertCircle, Calendar, HelpCircle, BookOpen,
  AlertTriangle, Workflow, ShieldAlert, Award, FileText, Globe, List, ArrowRight
} from "lucide-react";

interface CategoryLandingProps {
  slug: string;
}

export default function CategoryLanding({ slug }: CategoryLandingProps) {
  const config = getCategoryBySlug(slug);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  if (!config) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono text-xs">
        Category config not found for slug: {slug}
      </div>
    );
  }

  // Get tools belonging to this category
  const categoryTools = tools.filter(
    (t) => t.category === config.categoryKey && t.isReady
  );

  // Filter tools by search query and letter index
  const filteredTools = categoryTools.filter((t) => {
    const q = search.toLowerCase().trim();
    const matchesQuery = q
      ? t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q))
      : true;

    const matchesLetter = activeLetter
      ? t.name.toUpperCase().startsWith(activeLetter)
      : true;

    return matchesQuery && matchesLetter;
  });

  // Extract alphabetical list
  const alphabet = Array.from(
    new Set(categoryTools.map((t) => t.name.toUpperCase().charAt(0)))
  ).sort();

  // Dynamic lists
  const recentlyAdded = [...categoryTools].reverse().slice(0, 3);

  // Related categories mapping
  const relatedCategoriesList = [
    { name: "PDF Tools", href: "/pdf-tools", slug: "pdf-tools" },
    { name: "Developer Tools", href: "/developer-tools", slug: "developer-tools" },
    { name: "Office & Text Tools", href: "/text-tools", slug: "text-tools" },
    { name: "Image Tools", href: "/image-tools", slug: "image-tools" },
    { name: "Web Tools", href: "/web-tools", slug: "web-tools" },
    { name: "Time Tools", href: "/time-tools", slug: "time-tools" },
    { name: "Calculators", href: "/calculators", slug: "calculators" },
  ].filter((c) => c.slug !== config.slug);

  // Dynamic statistics
  const stats = [
    { label: "Active Utilities", value: `${categoryTools.length} Tools` },
    { label: "Execution Latency", value: "0ms (Client-Side)" },
    { label: "Security Parameter", value: "No Uploads" },
    { label: "Monthly Users", value: "100% Secure" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">{config.title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 border-b border-black pb-8">
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none">
            {config.title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
            {config.description}
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="border border-black bg-secondary p-4 font-mono">
              <span className="text-[9px] uppercase font-bold text-muted-foreground block">
                {stat.label}
              </span>
              <span className="text-sm font-black text-foreground block mt-1">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Featured / Popular Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-black bg-accent/5 p-5 space-y-3 md:col-span-2">
            <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
              <Sparkles size={13} className="text-yellow-600" />
              <span>Category AI Summary & Takeaways</span>
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {config.aiSummary}
            </p>
            <ul className="list-disc list-inside space-y-1 font-mono text-[10px] text-muted-foreground">
              {config.keyTakeaways.map((k, idx) => (
                <li key={idx}>{k}</li>
              ))}
            </ul>
          </div>

          <div className="border border-black p-5 space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
              <Calendar size={13} className="text-blue-600" />
              <span>Recently Added</span>
            </h4>
            <div className="divide-y divide-black/10 font-mono text-[10px]">
              {recentlyAdded.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="block py-2 hover:underline text-muted-foreground hover:text-foreground"
                >
                  Free {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Alphabetical Filter */}
        <div className="space-y-4 pt-6 border-t border-black">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight">
              Browse All {config.title}
            </h3>

            {/* Search Input */}
            <div className="flex border border-black bg-background w-full sm:w-64">
              <span className="p-2 border-r border-black flex items-center">
                <Search size={14} className="text-muted-foreground" />
              </span>
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 bg-transparent font-mono text-xs outline-none focus:ring-0 border-none"
              />
            </div>
          </div>

          {/* Alphabet Index filter */}
          {alphabet.length > 0 && (
            <div className="flex flex-wrap gap-1 font-mono text-[10px] border-b border-black/10 pb-4">
              <button
                onClick={() => setActiveLetter(null)}
                className={`px-2 py-1 border border-black ${
                  activeLetter === null ? "bg-accent text-black font-bold" : "bg-background hover:bg-accent/10"
                }`}
              >
                ALL
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`px-2 py-1 border border-black ${
                    activeLetter === letter ? "bg-accent text-black font-bold" : "bg-background hover:bg-accent/10"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="editorial-card p-5 border border-black bg-background hover:bg-accent/15 hover:text-black transition-all flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] duration-100"
            >
              <div className="space-y-2">
                <h4 className="font-bold text-sm block tracking-tight">
                  Free {t.name} Online
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              </div>
              <span className="font-mono text-[9px] text-muted-foreground text-right mt-6 block">
                Open Tool →
              </span>
            </Link>
          ))}

          {filteredTools.length === 0 && (
            <div className="col-span-full border border-black bg-secondary p-8 text-center text-muted-foreground font-mono text-xs">
              <AlertCircle size={16} className="mx-auto mb-2 text-muted-foreground" />
              <span>No tools found matching selections.</span>
            </div>
          )}
        </div>

        {/* 1. Overview & Beginner Guide */}
        {(config.overview || config.beginnerGuide) && (
          <section className="pt-12 border-t border-black space-y-6">
            <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight">
              Knowledge Center & Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.overview && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-black/15 pb-2">
                    <BookOpen size={13} />
                    <span>Topic Overview</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {config.overview}
                  </p>
                </div>
              )}
              {config.beginnerGuide && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-black/15 pb-2">
                    <FileText size={13} />
                    <span>Beginner's Guide</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {config.beginnerGuide}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 2. Recommended Workflow & Common Problems */}
        {(config.recommendedWorkflow || config.commonProblems) && (
          <section className="pt-12 border-t border-black space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.recommendedWorkflow && config.recommendedWorkflow.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-black/15 pb-2">
                    <Workflow size={13} />
                    <span>Recommended Workflow</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 font-mono text-[10px] text-muted-foreground">
                    {config.recommendedWorkflow.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ol>
                </div>
              )}
              {config.commonProblems && config.commonProblems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-black/15 pb-2">
                    <AlertTriangle size={13} className="text-orange-600" />
                    <span>Common Problems & Gotchas</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-2 font-mono text-[10px] text-muted-foreground">
                    {config.commonProblems.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3. Use Cases & Industry Applications */}
        {(config.useCases || config.industryApplications) && (
          <section className="pt-12 border-t border-black space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.useCases && config.useCases.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-black/15 pb-2">
                    <Award size={13} />
                    <span>Practical Use Cases</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-2 font-mono text-[10px] text-muted-foreground">
                    {config.useCases.map((uc, idx) => (
                      <li key={idx} className="leading-relaxed">{uc}</li>
                    ))}
                  </ul>
                </div>
              )}
              {config.industryApplications && config.industryApplications.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-black/15 pb-2">
                    <Globe size={13} />
                    <span>Industry Applications</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-2 font-mono text-[10px] text-muted-foreground">
                    {config.industryApplications.map((app, idx) => (
                      <li key={idx} className="leading-relaxed">{app}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. Glossary */}
        {config.glossary && config.glossary.length > 0 && (
          <section className="pt-12 border-t border-black space-y-4">
            <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight">
              Glossary of Terms
            </h3>
            <div className="border border-black divide-y divide-black/10">
              {config.glossary.map((entry, idx) => (
                <div key={idx} className="p-3 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase text-foreground">{entry.term}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{entry.definition}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Related Guides & Comparisons */}
        <section className="pt-12 border-t border-black space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related Guides */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
                <FileText size={12} />
                <span>Related Guides</span>
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                {guidesConfig
                  .filter((g) => config.relatedGuides.includes(g.slug))
                  .map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="block p-3 border border-black bg-background hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span>{guide.title}</span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </Link>
                  ))}
              </div>
            </div>

            {/* Related Comparisons */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
                <List size={12} />
                <span>Format Comparisons</span>
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                {comparisonsConfig
                  .filter((comp) => comp.entityIds.some((eid) => config.entityIds?.includes(eid)))
                  .map((comp) => (
                    <Link
                      key={comp.slug}
                      href={`/compare/${comp.slug}`}
                      className="block p-3 border border-black bg-background hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span>{comp.formatA} vs {comp.formatB}</span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {config.faq && config.faq.length > 0 && (
          <section className="pt-12 border-t border-black space-y-6">
            <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.faq.map((item, idx) => (
                <div key={idx} className="space-y-2 font-mono">
                  <h4 className="text-xs font-bold text-foreground">
                    Q: {item.question}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Categories */}
        <footer className="pt-12 border-t border-black space-y-4">
          <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
            Explore Other Tool Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {relatedCategoriesList.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="font-mono text-[10px] px-3 py-1.5 border border-black bg-background hover:bg-accent transition-colors"
              >
                {cat.name} →
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
