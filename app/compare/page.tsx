import type { Metadata } from "next";
import Link from "next/link";
import CompareList from "@/components/compare-list";

export const metadata: Metadata = {
  title: "Format & Utility Comparisons | ToolsAtZero",
  description:
    "Compare common file formats and data standards side-by-side. Comprehensive analysis of WebP vs PNG, CSV vs Excel, JSON vs XML, and PDF vs DOCX to optimize your workflows.",
  keywords: [
    "format comparisons",
    "webp vs png",
    "csv vs excel",
    "json vs xml",
    "pdf vs docx",
    "file format differences",
  ],
  alternates: {
    canonical: "https://toolsatzero.com/compare",
  },
};

export default function CompareIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb */}
        <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Compare</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4">
          <span className="neon-badge px-3 py-1 text-xs">DIAGNOSTIC MATRIX</span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight border-b-2 border-black pb-6">
            Format Comparisons
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            Side-by-side technical breakdowns of web file formats, data schemas, and document specifications. Compare key differences in performance, compatibility, and best use cases.
          </p>
        </div>

        {/* Dynamic Interactive List (Client Component) */}
        <CompareList />
      </div>
    </main>
  );
}
