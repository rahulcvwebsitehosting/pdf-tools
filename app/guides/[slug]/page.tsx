import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guidesConfig, getGuideBySlug } from "@/modules/content/guides";
import { tools } from "@/lib/tools";
import {
  ShieldAlert, CheckCircle, AlertCircle, FileText, HelpCircle,
  Calendar, Clock, Zap, Award, Lightbulb, AlertTriangle,
  BookOpen, Target, Globe, Wrench, ArrowRight, List,
} from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guidesConfig.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: {
      canonical: `https://toolsatzero.com/guides/${slug}`,
    },
    openGraph: {
      title: guide.seoTitle,
      description: guide.metaDescription,
      url: `https://toolsatzero.com/guides/${slug}`,
      siteName: "ToolsAtZero",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.seoTitle,
      description: guide.metaDescription,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  // JSON-LD schemas
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `https://toolsatzero.com/guides/${slug}/#article`,
        url: `https://toolsatzero.com/guides/${slug}`,
        headline: guide.title,
        description: guide.metaDescription,
        inLanguage: "en-US",
        author: { "@type": "Organization", name: "ToolsAtZero", url: "https://toolsatzero.com" },
        publisher: { "@type": "Organization", name: "ToolsAtZero", url: "https://toolsatzero.com" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://toolsatzero.com/guides/${slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://toolsatzero.com" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://toolsatzero.com" },
          { "@type": "ListItem", position: 3, name: guide.title, item: `https://toolsatzero.com/guides/${slug}` },
        ],
      },
      // HowTo schema for step guides
      ...(guide.steps.length > 0
        ? [{
            "@type": "HowTo",
            "@id": `https://toolsatzero.com/guides/${slug}/#howto`,
            name: guide.title,
            description: guide.description,
            step: guide.steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text: s,
            })),
          }]
        : []),
      // FAQPage schema
      ...(guide.faqs.length > 0
        ? [{
            "@type": "FAQPage",
            "@id": `https://toolsatzero.com/guides/${slug}/#faq`,
            mainEntity: guide.faqs.slice(0, 30).map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <main className="min-h-screen bg-background text-foreground py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumbs */}
          <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-muted-foreground">Guides</span>
            <span>/</span>
            <span className="text-foreground">{guide.title}</span>
          </nav>

          {/* Header */}
          <header className="space-y-4 border-b border-border pb-8">
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none">
              {guide.title}
            </h1>
            <div className="flex flex-wrap gap-4 font-mono text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span>{guide.meta.readingTimeMinutes} min read</span>
              </span>
              <span className="flex items-center gap-1">
                <Target size={12} />
                <span className="capitalize">{guide.meta.difficulty}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                <span>June 2026</span>
              </span>
            </div>
          </header>

          {/* 1. Quick Answer */}
          {guide.quickAnswer && (
            <div className="border-2 border-border bg-secondary p-5 space-y-2">
              <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
                <Zap size={13} />
                <span>Quick Answer</span>
              </h4>
              <p className="text-sm text-foreground leading-relaxed font-medium">
                {guide.quickAnswer}
              </p>
            </div>
          )}

          {/* 2. Introduction */}
          <section className="text-muted-foreground text-sm leading-relaxed">
            {guide.introduction}
          </section>

          {/* 3. Why It Matters */}
          {guide.whyItMatters && (
            <section className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
                Why It Matters
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{guide.whyItMatters}</p>
            </section>
          )}

          {/* 4. Table of Contents */}
          {guide.toc.length > 0 && (
            <div className="border border-border bg-secondary p-5 space-y-3">
              <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
                <FileText size={13} />
                <span>Table of Contents</span>
              </h4>
              <ul className="list-decimal list-inside space-y-1 font-mono text-[10px] text-muted-foreground">
                {guide.toc.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Step-by-Step Guide */}
          {guide.steps.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
                Step-by-Step Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm leading-relaxed">
                {guide.steps.map((step, idx) => (
                  <li key={idx} className="pl-1">{step}</li>
                ))}
              </ol>
            </section>
          )}

          {/* 6. How It Works */}
          {guide.howItWorks && (
            <section className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
                How It Works
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{guide.howItWorks}</p>
            </section>
          )}

          {/* 7. Examples */}
          {guide.examples.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
                Examples
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                {guide.examples.map((ex, idx) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 8. Best Practices & 9. Common Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            {guide.bestPractices.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-green-700" />
                  <span>Best Practices</span>
                </h4>
                <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
                  {guide.bestPractices.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {guide.commonMistakes.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
                  <AlertCircle size={13} className="text-red-700" />
                  <span>Common Mistakes</span>
                </h4>
                <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
                  {guide.commonMistakes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 10. Pro Tips */}
          {guide.proTips.length > 0 && (
            <section className="space-y-3 pt-6 border-t border-border">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                <Lightbulb size={20} className="text-yellow-600" />
                <span>Pro Tips</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                {guide.proTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Award size={14} className="text-yellow-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 11. Troubleshooting */}
          {guide.troubleshooting.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                <Wrench size={20} className="text-muted-foreground" />
                <span>Troubleshooting</span>
              </h3>
              <div className="space-y-3">
                {guide.troubleshooting.map((item, idx) => (
                  <div key={idx} className="border border-border p-3 space-y-1">
                    <h4 className="font-mono text-[11px] font-bold text-foreground">{item.question}</h4>
                    <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 12. Benefits & 13. Limitations */}
          {(guide.benefits.length > 0 || guide.limitations.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
              {guide.benefits.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-green-700" />
                    <span>Benefits</span>
                  </h4>
                  <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
                    {guide.benefits.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {guide.limitations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
                    <AlertTriangle size={13} className="text-orange-600" />
                    <span>Limitations</span>
                  </h4>
                  <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
                    {guide.limitations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 14. Security & Privacy Notes */}
          {guide.securityNotes.length > 0 && (
            <div className="border border-red-500 bg-red-500/5 p-4 space-y-3">
              <h5 className="font-mono text-[10px] uppercase font-bold text-red-700 flex items-center gap-1.5">
                <ShieldAlert size={14} />
                <span>Security & Privacy</span>
              </h5>
              <ul className="space-y-1 font-mono text-[10px] text-muted-foreground list-disc list-inside">
                {guide.securityNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 15. Performance Tips */}
          {guide.performanceTips.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
                Performance Tips
              </h3>
              <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
                {guide.performanceTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 16. Industry Use Cases */}
          {guide.useCases.length > 0 && (
            <section className="space-y-3 pt-6 border-t border-border">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                <Globe size={20} className="text-muted-foreground" />
                <span>Industry Use Cases</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                {guide.useCases.map((uc, idx) => (
                  <li key={idx}>{uc}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 17. Frequently Asked Questions */}
          {guide.faqs.length > 0 && (
            <section className="space-y-6 pt-12 border-t border-border">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                <HelpCircle size={22} className="text-muted-foreground" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guide.faqs.map((faq, idx) => (
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

          {/* 18. People Also Ask (Related Questions) */}
          {guide.relatedQuestions.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
                <List size={20} className="text-muted-foreground" />
                <span>People Also Ask</span>
              </h3>
              <div className="space-y-3">
                {guide.relatedQuestions.map((rq, idx) => (
                  <div key={idx} className="border border-border p-3 space-y-1">
                    <h4 className="font-mono text-[11px] font-bold text-foreground">{rq.question}</h4>
                    <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{rq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 19. Glossary */}
          {guide.glossary.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
                Glossary
              </h3>
              <div className="border border-border divide-y divide-border">
                {guide.glossary.map((entry, idx) => (
                  <div key={idx} className="p-3 grid grid-cols-[120px_1fr] gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase text-foreground">{entry.term}</span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{entry.definition}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 20. Related Tools & 21. Related Guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-border">
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                Related Utilities
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                {guide.relatedTools.map((toolSlug) => {
                  const tObj = tools.find(t => t.slug === toolSlug);
                  if (!tObj) return null;
                  return (
                    <Link
                      key={toolSlug}
                      href={`/tools/${toolSlug}`}
                      className="block p-3 border border-border bg-background hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span>Free {tObj.name} Online</span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                Related Guides
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                {guide.relatedGuides.map((guideSlug) => {
                  const gObj = guidesConfig.find(g => g.slug === guideSlug);
                  if (!gObj) return null;
                  return (
                    <Link
                      key={guideSlug}
                      href={`/guides/${guideSlug}`}
                      className="block p-3 border border-border bg-background hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span>{gObj.title}</span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 22. Conclusion */}
          {guide.conclusion && (
            <section className="space-y-3 pt-6 border-t border-border">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
                Conclusion
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{guide.conclusion}</p>
            </section>
          )}

          {/* AI Key Takeaways */}
          {guide.aiBlocks.keyTakeaways.length > 0 && (
            <div className="border border-border bg-secondary p-5 space-y-3">
              <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
                <Award size={13} />
                <span>Key Takeaways</span>
              </h4>
              <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
                {guide.aiBlocks.keyTakeaways.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </main>
    </>
  );
}

export const dynamic = "force-static";
