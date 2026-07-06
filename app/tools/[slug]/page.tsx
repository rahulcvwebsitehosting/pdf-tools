import { notFound } from "next/navigation";
import { calculatorRegistry, calculatorList } from "@/modules/calculators/calculator.config";
import { generateToolMetadata } from "@/lib/tools-engine/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SEOSection from "@/components/calculator/SEOSection";
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

  const relatedLinksElement = (
    <div className="space-y-3">
      <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground">Related</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {tool.relatedTools.map((relSlug) => {
          const relTool = calculatorRegistry[relSlug];
          if (!relTool) return null;
          return (
            <Link
              key={relSlug}
              href={`/tools/${relSlug}`}
              className="editorial-card p-3 font-mono text-[10px] uppercase font-bold flex items-center justify-between hover:bg-accent transition-all"
            >
              <span className="truncate">{relTool.shortTitle}</span>
              <span className="ml-1">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <SEOSection config={tool} />

      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5 mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#calculators" className="hover:text-foreground transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-foreground">{tool.shortTitle}</span>
          </nav>

          <header className="text-center mb-8">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
              {tool.title}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {tool.description}
            </p>
          </header>

          <CalculatorShell slug={tool.slug} relatedLinks={relatedLinksElement} />
        </div>
      </main>
    </>
  );
}
