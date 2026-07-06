import Link from "next/link";
import { tools } from "@/lib/tools";
import { ArrowRight, Shield, Zap, WifiOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Tools - Free Online PDF Utilities",
  description: "Free online PDF tools, image tools, text tools, developer tools, and calculators. 100% client-side processing.",
};

export default function HomePage() {
  const activeTools = tools.filter((t) => t.isReady);
  const pdfTools = activeTools.filter((t) => t.category === "pdf");
  const developerTools = activeTools.filter((t) => t.category === "developer");
  const officeTools = activeTools.filter((t) => t.category === "office");
  const imageTools = activeTools.filter((t) => t.category === "image");
  const webTools = activeTools.filter((t) => t.category === "web");
  const timeTools = activeTools.filter((t) => t.category === "time");
  const calculatorTools = activeTools.filter((t) => t.category === "calculator");

  const categories = [
    { slug: "pdf", title: "PDF Tools", count: pdfTools.length, list: pdfTools },
    { slug: "developer", title: "Developer Tools", count: developerTools.length, list: developerTools },
    { slug: "office", title: "Office & Text Tools", count: officeTools.length, list: officeTools },
    { slug: "image", title: "Image Tools", count: imageTools.length, list: imageTools },
    { slug: "web", title: "Web Tools", count: webTools.length, list: webTools },
    { slug: "time", title: "Time Tools", count: timeTools.length, list: timeTools },
    { slug: "calculators", title: "Calculators", count: calculatorTools.length, list: calculatorTools },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pb-12">
      {/* Intro */}
      <section className="px-4 md:px-8 lg:px-16 mb-10">
        <div className="max-w-6xl mx-auto">
          <div className="border border-black bg-accent/5 p-6 md:p-8">
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-4">
              Free Online PDF Tools
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl">
              100+ browser-based utilities for PDF, images, text, development, and calculations.
              Everything runs locally — your files never leave your device.
            </p>
            <div className="flex flex-wrap gap-6 mt-5 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield size={14} /> No uploads</span>
              <span className="flex items-center gap-1.5"><Zap size={14} /> Client-side</span>
              <span className="flex items-center gap-1.5"><WifiOff size={14} /> Works offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="px-4 md:px-8 lg:px-16 space-y-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map((cat, catIdx) => (
            <div key={cat.slug} id={cat.slug} className="space-y-6 animate-fade-in" style={{ animationDelay: `${catIdx * 100}ms` }}>
              <div className="flex items-center justify-between border-b border-black pb-4">
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                  {cat.title}
                </h2>
                <span className="neon-badge px-3 py-1 text-xs">
                  {cat.count}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-l border-black bg-background">
                {cat.list.map((tool, idx) => {
                  const IconComponent = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      className="editorial-card flex flex-col justify-between p-6 group border-r border-b border-black animate-card-in"
                      style={{ animationDelay: `${(catIdx * 10 + idx) * 50}ms` }}
                    >
                      <div className="space-y-4">
                        <div className="card-icon shrink-0 text-foreground">
                          <IconComponent size={24} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                          <span className="card-title font-bold text-base block group-hover:underline">
                            {tool.name}
                          </span>
                          <p className="card-description text-xs text-muted-foreground leading-relaxed">
                            {tool.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 flex items-center justify-between font-mono text-[10px] uppercase font-bold tracking-wider pt-2 border-t border-dashed border-black/10">
                        <span>Launch</span>
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
