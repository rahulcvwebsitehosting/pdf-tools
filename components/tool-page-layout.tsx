import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  tool: ReactNode;
  related?: { href: string; label: string }[];
  categoryHref?: string;
  categoryLabel?: string;
}

export function ToolPageLayout({
  title,
  description,
  tool,
  related,
  categoryHref = "/",
  categoryLabel = "All Tools",
}: ToolPageLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Breadcrumb */}
        <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5 mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={categoryHref} className="hover:text-foreground transition-colors">
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </header>

        {/* Tool */}
        <div className="animate-card-in">{tool}</div>

        {/* Related tools (compact) */}
        {related && related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-black">
            <h3 className="font-mono text-xs uppercase font-bold text-muted-foreground mb-4">
              Related Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="editorial-card p-3 font-mono text-[10px] uppercase font-bold flex items-center justify-between hover:bg-accent transition-all"
                >
                  <span className="truncate">{item.label}</span>
                  <ArrowRight size={12} className="shrink-0 ml-1" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
