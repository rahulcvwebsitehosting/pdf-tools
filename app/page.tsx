import type { Metadata } from "next";
import { FloatingCredit } from "@/components/floating-credit";
import ToolsExplorer from "@/components/tools-explorer";
import { HomeHeroSearch } from "@/components/home-hero-search";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PDF Tools - Free Online PDF Utilities",
  description: "Free online PDF tools, image tools, text tools, developer tools, and calculators. 100% client-side processing.",
};

const POPULAR = [
  { slug: "merge-pdf", label: "Merge PDF" },
  { slug: "compress-pdf", label: "Compress PDF" },
  { slug: "split-pdf", label: "Split PDF" },
  { slug: "image-to-pdf", label: "Image to PDF" },
  { slug: "pdf-to-jpg", label: "PDF to JPG" },
  { slug: "unlock-pdf", label: "Unlock PDF" },
  { slug: "word-counter", label: "Word Counter" },
  { slug: "json-formatter", label: "JSON Formatter" },
];

export default function HomePage() {
  return (
    <main className="space-y-16">
      {/* Hero */}
      <section className="relative">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EFF6FF] via-[#F6F7F9] to-[#FFFFFF] border border-border px-6 py-14 sm:py-20 text-center">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#7C3AED]/10 blur-3xl" />
          <div className="relative mx-auto max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              100% client-side — your files never leave your device
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Free Online Tools for
              <span className="text-[#2563EB]"> PDF, Images &amp; Text</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              A clean collection of 200+ browser-based utilities. Fast, private, and
              beautifully simple — no installs, no uploads.
            </p>
            <div className="pt-2">
              <HomeHeroSearch />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {POPULAR.map((p) => (
                <Link
                  key={p.slug}
                  href={`/tools/${p.slug}`}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary hover:shadow-soft transition-all"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="space-y-16">
        <ToolsExplorer />
      </section>

      <FloatingCredit />
    </main>
  );
}
