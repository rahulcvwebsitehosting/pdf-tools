import type { Metadata } from "next";
import Link from "next/link";
import GuidesList from "@/components/guides-list";

export const metadata: Metadata = {
  title: "Topic Guides & Technical Documentation | PDF Tools",
  description:
    "Explore our collection of free, browser-based utility guides. Step-by-step documentation on PDF merging, image compression, formatting structured JSON, and calculating EMI loan metrics.",
  keywords: [
    "developer tutorials",
    "pdf guides",
    "image compression documentation",
    "calculator tutorials",
    "client-side privacy guides",
  ],
  alternates: {
    canonical: "https://pdf-tools-cv.vercel.app/guides",
  },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb */}
        <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Guides</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4">
          <span className="neon-badge px-3 py-1 text-xs">KNOWLEDGE HUB</span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight border-b-2 border-border pb-6">
            Guides & Documentation
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            Detailed guides, step-by-step instructions, and performance optimization tips for our browser-based utility suite. Learn how the tools work and understand formatting standards.
          </p>
        </div>

        {/* Dynamic Interactive List (Client Component) */}
        <GuidesList />
      </div>
    </main>
  );
}
