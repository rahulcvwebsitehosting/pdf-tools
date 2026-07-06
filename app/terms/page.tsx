import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, AlertTriangle, Scale, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for the PDF Tools website. Free client-side tools with no warranties.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider hover:underline mb-8"
        >
          ← Back to Tools
        </Link>

        <div className="space-y-4 mb-10">
          <span className="neon-badge px-3 py-1 text-xs">
            TERMS
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight border-b-2 border-black pb-6">
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase">
            Last Updated: July 2026
          </p>
        </div>

        <div className="bg-accent border-2 border-black p-6 sm:p-8 text-black mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-mono text-sm sm:text-base font-black uppercase tracking-wider leading-relaxed">
            These tools are provided free of charge, as-is, with no warranties. Use at your own risk.
          </p>
        </div>

        <div className="space-y-10 font-sans text-sm sm:text-base leading-relaxed">

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <HeartHandshake className="w-6 h-6" /> Acceptance of Terms
            </h2>
            <p>
              By using this website, you agree to these terms. If you disagree, do not use the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Scale className="w-6 h-6" /> Service Description
            </h2>
            <p>
              This website provides free browser-based utility tools including PDF manipulation, image conversion, text processing, developer utilities, and calculators. All processing happens locally in your browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Disclaimer of Warranties
            </h2>
            <p className="font-mono text-xs uppercase bg-secondary border border-black p-4 leading-relaxed">
              THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TOOLS MAY HAVE BUGS OR LIMITATIONS.
            </p>
            <p>
              You assume full responsibility for verifying all outputs before using them in any critical context.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Scale className="w-6 h-6" /> Limitation of Liability
            </h2>
            <p>
              The operator of this website shall not be liable for any damages arising from your use of the tools.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Mail className="w-6 h-6" /> Contact
            </h2>
            <p>
              For questions: <a href="mailto:rahulcvfiitjee@gmail.com" className="underline font-mono">rahulcvfiitjee@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
