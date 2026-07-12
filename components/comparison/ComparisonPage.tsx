"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Scale,
  HelpCircle,
  BookOpen,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import type { ComparisonContent } from "@/modules/content/schema";
import { comparisonsConfig } from "@/modules/content/comparisons";
import { tools } from "@/lib/tools";

interface ComparisonPageProps {
  comparison: ComparisonContent;
}

export default function ComparisonPage({ comparison }: ComparisonPageProps) {
  const c = comparison;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
      {/* Breadcrumbs */}
      <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-muted-foreground">Compare</span>
        <span>/</span>
        <span className="text-foreground">{c.formatA} vs {c.formatB}</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 border-b border-border pb-8">
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none">
          {c.formatA} <span className="text-muted-foreground">vs</span> {c.formatB}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          {c.description}
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Scale size={12} />
            <span>Comparison</span>
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            <span>{c.meta.readingTimeMinutes} min read</span>
          </span>
        </div>
      </header>

      {/* Quick Answer / AI Summary */}
      {c.aiBlocks.aiSummary && (
        <div className="border border-border bg-secondary p-5 space-y-3">
          <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
            <Zap size={13} />
            <span>Quick Answer</span>
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {c.aiBlocks.aiSummary}
          </p>
        </div>
      )}

      {/* Key Takeaways */}
      {c.aiBlocks.keyTakeaways.length > 0 && (
        <div className="border border-border p-5 space-y-3">
          <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
            <Award size={13} />
            <span>Key Takeaways</span>
          </h4>
          <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
            {c.aiBlocks.keyTakeaways.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Similarities */}
      <section className="space-y-4">
        <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
          Similarities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          {c.similarities.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle size={14} className="text-green-700 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Differences */}
      <section className="space-y-4">
        <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
          Key Differences
        </h3>
        <div className="border border-border divide-y divide-border">
          {c.differences.map((item, idx) => (
            <div key={idx} className="p-3 text-sm text-muted-foreground leading-relaxed font-mono text-[11px]">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Pros & Cons Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
        {/* Format A Pros */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
            <CheckCircle size={13} className="text-green-700" />
            <span>{c.formatA} Advantages</span>
          </h4>
          <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
            {c.prosA.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Format B Pros */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
            <CheckCircle size={13} className="text-green-700" />
            <span>{c.formatB} Advantages</span>
          </h4>
          <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
            {c.prosB.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Format A Cons */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
            <XCircle size={13} className="text-red-700" />
            <span>{c.formatA} Limitations</span>
          </h4>
          <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
            {c.consA.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Format B Cons */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
            <XCircle size={13} className="text-red-700" />
            <span>{c.formatB} Limitations</span>
          </h4>
          <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
            {c.consB.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Performance */}
      <section className="space-y-4 pt-6 border-t border-border">
        <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
          Performance
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{c.performance}</p>
      </section>

      {/* Compatibility */}
      <section className="space-y-4">
        <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
          Compatibility
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{c.compatibility}</p>
      </section>

      {/* Best Use Cases */}
      <section className="space-y-4">
        <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
          Best Use Cases
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{c.bestUseCases}</p>
      </section>

      {/* Recommendation / Verdict */}
      <div className="border-2 border-border bg-secondary p-6 space-y-3">
        <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
          <Award size={14} />
          <span>Verdict</span>
        </h4>
        <p className="text-sm text-foreground leading-relaxed font-medium">
          {c.recommendation}
        </p>
      </div>

      {/* Privacy Note */}
      <div className="border border-red-500 bg-red-500/5 p-4 flex gap-3 items-start">
        <Shield size={16} className="text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="font-mono text-[10px] uppercase font-bold text-red-700">Client-Side Guarantee</h5>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All ToolsAtZero utilities process files locally in your browser. No data is uploaded or stored on external servers.
          </p>
        </div>
      </div>

      {/* FAQs */}
      {c.faqs.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-border">
          <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle size={22} className="text-muted-foreground" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.faqs.map((faq, idx) => (
              <div key={idx} className="space-y-2 font-mono">
                <h4 className="text-xs font-bold text-foreground">
                  Q: {faq.question}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Glossary */}
      {c.glossary.length > 0 && (
        <section className="space-y-4 pt-12 border-t border-border">
          <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
            Glossary
          </h3>
          <div className="border border-border divide-y divide-border">
            {c.glossary.map((entry, idx) => (
              <div key={idx} className="p-3 grid grid-cols-[120px_1fr] gap-3">
                <span className="font-mono text-[10px] font-bold uppercase text-foreground">{entry.term}</span>
                <span className="text-xs text-muted-foreground leading-relaxed">{entry.definition}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-border">
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
            More Comparisons
          </h4>
          <div className="space-y-2 font-mono text-[11px]">
            {comparisonsConfig
              .filter((comp) => comp.slug !== c.slug)
              .slice(0, 5)
              .map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="block p-3 border border-border bg-background hover:bg-accent transition-colors flex items-center justify-between"
                >
                  <span>{comp.formatA} vs {comp.formatB}</span>
                  <ArrowRight size={12} className="text-muted-foreground" />
                </Link>
              ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
            Related Tools
          </h4>
          <div className="space-y-2 font-mono text-[11px]">
            {c.entityIds
              .flatMap((eid) => {
                const entity = tools.filter(
                  (t) => c.keywords.some((k) => t.name.toLowerCase().includes(k.split(" ")[0]))
                );
                return entity;
              })
              .filter((t, i, a) => a.findIndex((x) => x.slug === t.slug) === i)
              .slice(0, 5)
              .map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="block p-3 border border-border bg-background hover:bg-accent transition-colors"
                >
                  Free {tool.name} Online →
                </Link>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
}
