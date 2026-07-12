import { notFound } from "next/navigation";
import { calculatorRegistry, calculatorList } from "@/modules/calculators/calculator.config";
import { generateToolMetadata } from "@/lib/tools-engine/seo";
import { pdfToolConfig } from "@/lib/pdf-tools";
import { tools } from "@/lib/tools";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SEOSection from "@/components/calculator/SEOSection";
import { AeoSection } from "@/components/aeo-section";
import PdfGenericTool from "@/components/tools/pdf-generic";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return calculatorList.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const calc = calculatorRegistry[slug];
  if (calc) return generateToolMetadata(calc);
  if (pdfToolConfig[slug]) {
    const t = tools.find((x) => x.slug === slug);
    if (t) {
      return {
        title: t.targetSeoString,
        description: t.description,
        keywords: t.keywords,
      };
    }
  }
  return {};
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = calculatorRegistry[slug];

  if (calc) {
    const relatedLinksElement = (
      <div className="editorial-panel p-6 space-y-4">
        <h4 className="font-mono text-xs uppercase font-bold text-foreground border-b border-border pb-2">
          Related Calculators
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {calc.relatedTools.map((relSlug) => {
            const relTool = calculatorRegistry[relSlug];
            if (!relTool) return null;
            return (
              <Link
                key={relSlug}
                href={`/tools/${relSlug}`}
                className="editorial-card p-3 font-mono text-[10px] uppercase font-bold text-center block"
              >
                {relTool.shortTitle} →
              </Link>
            );
          })}
        </div>
      </div>
    );

    return (
      <>
        <SEOSection config={calc} />
        <main className="min-h-screen bg-background text-foreground py-12">
          <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#calculators" className="hover:text-primary transition-colors">Calculators</Link>
              <span>/</span>
              <span className="text-foreground">{calc.shortTitle}</span>
            </nav>
            <header className="space-y-3">
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
                Free {calc.title} Online
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
                {calc.description}
              </p>
            </header>
            <CalculatorShell slug={calc.slug} relatedLinks={relatedLinksElement} />
            <AeoSection
              toolName={calc.title}
              whatIs={calc.aeo.aiSummary}
              howToUse={calc.inputs.map((i) => `Configure your target ${i.label} (defaults: ${i.defaultValue}).`)}
              whyClientSide="Calculating parameters takes place strictly inside your local browser tab. No numbers are logged."
            />
          </article>
        </main>
      </>
    );
  }

  // ── Generic PDF tools (pdfcraft) ──
  if (pdfToolConfig[slug]) {
    const t = tools.find((x) => x.slug === slug);
    const name = t?.name ?? slug;
    return (
      <main className="min-h-screen bg-background text-foreground py-12">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </nav>
          <header className="space-y-3">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
              Free {name} Online
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
              {t?.description ?? "Process your PDF entirely client-side. Nothing is uploaded — 100% private."}
            </p>
          </header>
          <PdfGenericTool slug={slug} />
        </article>
      </main>
    );
  }

  notFound();
}
