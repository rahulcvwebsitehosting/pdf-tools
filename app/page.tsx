import { Shield, Zap, WifiOff } from "lucide-react";
import type { Metadata } from "next";
import { FloatingCredit } from "@/components/floating-credit";
import ToolsExplorer from "@/components/tools-explorer";

export const metadata: Metadata = {
  title: "PDF Tools - Free Online PDF Utilities",
  description: "Free online PDF tools, image tools, text tools, developer tools, and calculators. 100% client-side processing.",
};

export default function HomePage() {
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
        <div className="max-w-6xl mx-auto">
          <ToolsExplorer />
        </div>
      </section>

      <FloatingCredit />
    </main>
  );
}
