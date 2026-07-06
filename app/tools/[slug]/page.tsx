import { notFound } from "next/navigation";
import { calculatorRegistry, calculatorList } from "@/modules/calculators/calculator.config";
import { generateToolMetadata } from "@/lib/tools-engine/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SEOSection from "@/components/calculator/SEOSection";
import { AeoSection } from "@/components/aeo-section";
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
  const tool = calculatorRegistry[slug];
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = calculatorRegistry[slug];

  if (!tool) {
    notFound();
  }

  // Generate related tools links dynamically
  const relatedLinksElement = (
    <div className="editorial-panel p-6 space-y-4">
      <h4 className="font-mono text-xs uppercase font-bold text-foreground border-b border-black/10 pb-2">
        Related Calculators
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {tool.relatedTools.map((relSlug) => {
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
      {/* Schema Injection */}
      <SEOSection config={tool} />

      <main className="min-h-screen bg-background text-foreground py-12">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-black transition-colors">
              Calculators
            </Link>
            <span>/</span>
            <span className="text-foreground">{tool.shortTitle}</span>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
              Free {tool.title} Online
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
              {tool.description}
            </p>
          </header>

          {/* Calculator Platform Shell */}
          <CalculatorShell slug={tool.slug} relatedLinks={relatedLinksElement} />

          <AeoSection
            toolName={tool.title}
            whatIs={tool.aeo.aiSummary}
            howToUse={tool.inputs.map(i => `Configure your target ${i.label} (defaults: ${i.defaultValue}).`)}
            whyClientSide="Calculating parameters takes place strictly inside your local browser tab. No numbers are logged."
          />
        </article>
      </main>
    </>
  );
}
