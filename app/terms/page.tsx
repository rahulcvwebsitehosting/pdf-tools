import type { Metadata } from "next";
import Link from "next/link";
import { Scale, HeartHandshake, AlertTriangle, FileText, Layers, DollarSign, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ToolsAtZero",
  description:
    "Review the Terms of Service for ToolsAtZero. Learn about our service rules, local processing boundaries, open source usage, liability disclaimers, and service policies.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider hover:underline mb-8"
        >
          ← Return to Workbench
        </Link>

        {/* Page Header */}
        <div className="space-y-4 mb-10">
          <span className="neon-badge px-3 py-1 text-xs">
            TERMS & DISCLOSURES
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight border-b-2 border-black pb-6">
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase">
            Last Updated: June 30, 2026 | Document Reference: TA-TERMS-2026-V3
          </p>
        </div>

        {/* Highlight Block */}
        <div className="bg-accent border-2 border-black p-6 sm:p-8 text-black mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-mono text-sm sm:text-base font-black uppercase tracking-wider leading-relaxed">
            ⚖️ TRANSPARENT AGREEMENT: Client-side computing puts processing power under your direct control. Use our static utilities subject to our standard terms and liabilities.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 font-sans text-sm sm:text-base leading-relaxed">

          {/* Section: Acceptance of Terms */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <HeartHandshake className="w-6 h-6" /> Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the web applications hosted on ToolsAtZero (including all subdomains and related endpoints), you agree to be bound by these Terms of Service, all applicable laws, and our Privacy Policy. If you do not agree, you must immediately cease using the platform.
            </p>
          </section>

          {/* Section: Description of Services */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Layers className="w-6 h-6" /> Description of Services
            </h2>
            <p>
              ToolsAtZero provides an array of 102 developer, document, writing, productivity, and media utilities alongside an interactive Knowledge Hub containing format comparisons, learning paths, and step-by-step guides.
            </p>
            <p>
              Individual tools and guides may have separate parameters, execution runtimes, file type support, or performance thresholds depending on their underlying technology and specifications.
            </p>
          </section>

          {/* Section: Local Processing */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Scale className="w-6 h-6" /> Local Processing Boundaries
            </h2>
            <p>
              All 102 tools execute calculations, format transformations, image filters, and text processing locally within your web browser's sandboxed environment. Runtimes, memory capacity, and processing constraints depend entirely on your hardware configuration, CPU/GPU capabilities, and browser allocation limits.
            </p>
          </section>

          {/* Section: Cloud Services */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Layers className="w-6 h-6" /> Cloud-Based Services
            </h2>
            <p>
              Every tool currently available on ToolsAtZero operates 100% locally. While the platform operates strictly client-side today, if any future advanced features require cloud execution, they will clearly identify these cloud requirements before you select or submit any data.
            </p>
          </section>

          {/* Section: Acceptable Use */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Acceptable Use
            </h2>
            <p>
              You agree not to use ToolsAtZero to process, convert, or generate content that violates local, state, national, or international laws.
            </p>
            <p>
              We reserve the right to deploy automated usage limits, fair-use caps, IP filters, or traffic blocks to protect site stability and prevent automated scraping, bot attacks, or abuse.
            </p>
          </section>

          {/* Section: Intellectual Property */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <FileText className="w-6 h-6" /> Intellectual Property
            </h2>
            <p>
              Unless explicitly published by us under a specific license, all branding, logos, graphics, layout designs, content descriptions, and proprietary codebase architectures remain the exclusive intellectual property of ToolsAtZero.
            </p>
          </section>

          {/* Section: Open Source Components & Libraries */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Layers className="w-6 h-6" /> Open Source & Third-Party Libraries
            </h2>
            <p>
              Individual components of our tools may utilize third-party open-source software, models, or node dependencies (such as ONNX Runtime Web, Tesseract.js, or transformers.js libraries).
            </p>
            <p>
              These dependencies remain subject to their respective open-source licenses, copyrights, and terms. You are responsible for complying with any applicable third-party terms.
            </p>
          </section>

          {/* Section: Future Features & Pricing */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <DollarSign className="w-6 h-6" /> Future Features & Pricing
            </h2>
            <p>
              Most tools on ToolsAtZero are currently provided free of charge. We reserve the right to implement optional user accounts, premium feature packages, subscriptions, paid API integrations, usage caps, or server-side memberships in the future.
            </p>
          </section>

          {/* Section: Disclaimer of Warranties */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Disclaimer of Warranties
            </h2>
            <p className="font-mono text-xs uppercase bg-secondary border border-black p-4 leading-relaxed">
              ⚠️ WARRANTY LIMIT: THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p>
              We make no representations or warranties regarding the accuracy, completeness, or reliability of outputs, AI-generated content, file conversions, code analysis, text translations, or document extractions. You assume full responsibility for verifying all results.
            </p>
          </section>

          {/* Section: Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Scale className="w-6 h-6" /> Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, ToolsAtZero, its owners, developers, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including data loss, file corruption, computer errors, server downtime, system failures, or commercial losses resulting from your use of the website or tools.
            </p>
          </section>

          {/* Section: Availability & Service Changes */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <RefreshCw className="w-6 h-6" /> Availability & Service Changes
            </h2>
            <p>
              We reserve the right to add, modify, suspend, remove, or discontinue any tool, layout, or utility at our sole discretion without prior notice. Runtimes, asset servers, or CDN resources may experience interruptions or permanent changes.
            </p>
          </section>

          {/* Section: Suspension or Termination */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Suspension or Termination
            </h2>
            <p>
              We reserve the right to suspend or block access to our utilities for any user who violates these Terms, engages in automated scraping, or abuses platform resources.
            </p>
          </section>

          {/* Section: Governing Law */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Scale className="w-6 h-6" /> Governing Law
            </h2>
            <p>
              These Terms of Service and any dispute arising from your use of ToolsAtZero shall be governed by and construed in accordance with applicable laws, without regard to conflicts of law principles.
            </p>
          </section>

          {/* Section: Changes to the Terms */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <RefreshCw className="w-6 h-6" /> Changes to the Terms
            </h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          {/* Section: Contact Information */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Mail className="w-6 h-6" /> Contact Information
            </h2>
            <p>
              For legal inquiries, terms clarifications, or billing queries, please contact us at: <a href="mailto:support@toolsatzero.com" className="underline font-mono">support@toolsatzero.com</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
