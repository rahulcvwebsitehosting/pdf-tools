import Link from "next/link";
import { tools } from "@/lib/tools";
import { ArrowRight, Lock, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "ToolsAtZero | 100+ Free Developer & Office Tools | 100% Client-Side",
  description:
    "The ultimate free web toolkit. JSON formatters, Base64 encoders, and PDF tools. No sign-ups, no server uploads, zero friction. All processing runs in your browser memory.",
};

export default function HomePage() {
  const pdfTools = tools.filter((t) => t.category === "pdf");
  const developerTools = tools.filter((t) => t.category === "developer");
  const officeTools = tools.filter((t) => t.category === "office");
  const imageTools = tools.filter((t) => t.category === "image");
  const webTools = tools.filter((t) => t.category === "web");
  const timeTools = tools.filter((t) => t.category === "time");

  const categories = [
    { slug: "pdf", title: "Free PDF Suite", count: pdfTools.length, list: pdfTools },
    { slug: "developer", title: "Free Developer Tools", count: developerTools.length, list: developerTools },
    { slug: "office", title: "Free Office & Text Tools", count: officeTools.length, list: officeTools },
    { slug: "image", title: "Free Image Tools", count: imageTools.length, list: imageTools },
    { slug: "web", title: "Free Web Tools", count: webTools.length, list: webTools },
    { slug: "time", title: "Free Time Tools", count: timeTools.length, list: timeTools },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <section className="px-6 pt-24 pb-12 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6">
            <div className="w-16 h-16 bg-accent border-2 border-border flex items-center justify-center shadow-soft hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-soft transition-all duration-200">
              <Logo className="w-10 h-10 text-black transition-transform duration-700 hover:rotate-90" />
            </div>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight uppercase font-black">
            The Ultimate Free Client-Side Workbench.
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
            A comprehensive, client-side registry of utility tools for developer, office, and design tasks. No sign-ups, no tracking. Every computation runs strictly in your browser memory.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link href="#tools" className="btn-primary">
              Launch Workbench
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HIGH-VISIBILITY NEON TRUST BANNER
          ════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="max-w-6xl mx-auto bg-accent border border-border p-5 sm:p-6 text-black">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">🔒</span>
              <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-center md:text-left leading-relaxed">
                100% LOCAL PROCESSING: Your files and data never leave your browser.
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase font-black border border-border px-2 py-1 bg-background">
              Local Sandbox Active
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          VALUE PROPOSITIONS
          ════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-24 mb-24">
        <div className="max-w-6xl mx-auto border border-border bg-background">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Local Computing */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
              <div>
                <div className="mb-4 text-accent bg-black p-2 w-fit">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl mb-3 uppercase font-bold">Local Computing</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  All formatting, compression, and encoding actions occur directly inside browser memory. Zero network overhead, absolute speed.
                </p>
              </div>
            </div>

            {/* Complete Privacy */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
              <div>
                <div className="mb-4 text-accent bg-black p-2 w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl mb-3 uppercase font-bold">Complete Privacy</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  We collect no records, documents, or keys. Safe for enterprise reports, private keys, API configurations, and sensitive records.
                </p>
              </div>
            </div>

            {/* Zero Cost */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="mb-4 text-accent bg-black p-2 w-fit">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl mb-3 uppercase font-bold">Zero Cost</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Every tool on this workbench is open-source and free. No subscription popups, no tier gates, zero developer friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TOOL SUITE REGISTRY GRID
          ════════════════════════════════════════ */}
      <section id="tools" className="px-6 md:px-12 lg:px-24 space-y-24">
        <div className="max-w-6xl mx-auto space-y-20">
          {categories.map((cat) => (
            <div key={cat.slug} className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                  {cat.title}
                </h2>
                <span className="neon-badge px-3 py-1 text-xs">
                  {cat.count} TOOLS
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-l border-border bg-background">
                {cat.list.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      className="editorial-card flex flex-col justify-between p-6 group border-r border-b border-border"
                    >
                      <div className="space-y-4">
                        <div className="card-icon shrink-0 text-foreground">
                          <IconComponent size={24} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                          <span className="card-title font-bold text-base block group-hover:underline">
                            Free {tool.name}
                          </span>
                          <p className="card-description text-xs text-muted-foreground leading-relaxed">
                            {tool.tagline}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex items-center justify-between font-mono text-[10px] uppercase font-bold tracking-wider pt-2 border-t border-dashed border-border">
                        <span>Launch Tool</span>
                        <ArrowRight
                          size={14}
                          className="card-arrow text-muted-foreground transition-transform duration-200"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
