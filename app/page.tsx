import type { Metadata } from "next";
import ToolsExplorer from "@/components/tools-explorer";
import { FloatingCredit } from "@/components/floating-credit";

export const metadata: Metadata = {
  title: "PDF Tools - Free Online PDF Utilities",
  description: "Free online PDF tools, image tools, text tools, developer tools, and calculators. 100% client-side processing.",
};

export default function HomePage() {
  return (
    <main className="space-y-12">
      <section className="text-center pt-8 pb-2">
        <div className="mx-auto w-20 h-20 rounded-full bg-[#243044] light:bg-white border border-white/10 light:border-black/10 flex items-center justify-center mb-4 shadow-lg">
          <span className="text-4xl">📄</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-foreground">
          PDF Tools
        </h1>
        <p className="text-muted-foreground text-base mt-2 max-w-2xl mx-auto">
          Free and easy-to-use online PDF tools that make you more productive.
        </p>
      </section>

      <ToolsExplorer />

      <FloatingCredit />
    </main>
  );
}
