"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/* Metadata is exported from layout.tsx (server component) */



interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is ToolsAtZero?",
    answer:
      "ToolsAtZero is a free, 100% client-side tools platform that runs entirely inside your browser. We offer 102 production-ready browser-based tools across categories like PDF, Developer, Office/Text, Image, Web, and Time. The platform features an extensive Knowledge Hub, topic clusters, and side-by-side format comparisons (e.g., PNG vs JPG, CSV vs Excel) to help users make informed technical decisions. Zero cost, zero server uploads, and zero accounts required.",
  },
  {
    question: "How does local/client-side processing work?",
    answer:
      "When you use a tool on ToolsAtZero, all processing happens inside your browser's sandboxed JavaScript environment. Your files are loaded into temporary memory (RAM), processed using WebAssembly, Web Workers, or standard JavaScript APIs, and the output is generated locally. Nothing is transmitted to any server. When you close the tab, all data is purged from memory automatically.",
  },
  {
    question: "Is ToolsAtZero completely free?",
    answer:
      "Yes. Every tool on ToolsAtZero is 100% free with no usage limits, no hidden paywalls, and no premium tiers. We believe essential developer and productivity tools should be accessible to everyone. The platform is sustained through minimal, non-intrusive advertising and community support.",
  },
  {
    question: "Do you store or upload my files to any server?",
    answer:
      "No. Your files never leave your device. ToolsAtZero processes everything locally inside your browser's sandboxed memory. We have no backend file storage, no upload endpoints, and no database of user files. Once you close the browser tab, all traces of your data are gone.",
  },
  {
    question: "Is my data safe from browser extensions?",
    answer:
      "While ToolsAtZero itself never transmits your data, third-party browser extensions with broad permissions (like 'Read and change all your data on all websites') can potentially access content on any active tab — including data you're processing. For maximum security when working with sensitive files, we recommend using a clean browser profile, an incognito/private window (which disables most extensions by default), or temporarily disabling untrusted extensions.",
  },
  {
    question: "Can I use ToolsAtZero offline?",
    answer:
      "Partially. Once a tool page is fully loaded in your browser, many tools will continue to function even if your internet connection drops, because the processing logic is already running in your browser. However, you need an initial internet connection to load the page and its assets. We're exploring Progressive Web App (PWA) support for full offline capability in the future.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "ToolsAtZero works best on modern, Chromium-based browsers — Google Chrome, Microsoft Edge, Brave, and Arc. Firefox and Safari are also supported for the vast majority of tools. We recommend keeping your browser updated to the latest version for optimal performance and full API compatibility (especially for WebAssembly and Web Workers).",
  },
  {
    question: "What file types and formats are supported?",
    answer:
      "Our tools support a wide range of formats depending on the category. PDF tools handle .pdf files. Image tools support PNG, JPEG, WebP, SVG, GIF, BMP, TIFF, and ICO. Developer tools handle JSON, XML, YAML, CSV, TOML, Base64, JWT, and various code formats. Office/Text tools work with plain text, Markdown, and common document formats. Check each tool's interface for specific format details.",
  },
  {
    question: "How do the AI-powered tools work locally?",
    answer:
      "Our AI-powered tools use lightweight machine learning models that run directly in your browser via WebAssembly (WASM) and Web Workers. These models are downloaded once and cached by your browser. Inference (prediction/processing) happens entirely on your device's CPU/GPU — no data is sent to any cloud AI service. This means slower performance compared to cloud AI, but absolute privacy.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There's no hard limit imposed by ToolsAtZero, but practical limits depend on your device's available RAM and browser memory allocation. Most browsers handle files up to ~500 MB comfortably for simple operations. Complex processing (like AI inference or multi-page PDF manipulation) works best with files under 100 MB. If you encounter slowness or crashes, try a smaller file or close other browser tabs to free memory.",
  },
  {
    question: "Does ToolsAtZero use cookies or tracking?",
    answer:
      "We use minimal, essential cookies and localStorage for UI preferences like dark/light mode and search history in the command palette. We use Google Analytics to collect anonymous usage metrics (page views, device type, geographic region) for improving the platform. We do not use cookies to track your file contents, processing activity, or personal identity. You can block all cookies through your browser settings.",
  },
  {
    question: "Does ToolsAtZero work on mobile devices?",
    answer:
      "Yes. ToolsAtZero is fully responsive and works on smartphones and tablets. All tools function on mobile browsers including Chrome for Android and Safari for iOS. However, some tools involving large file processing or complex operations may perform better on desktop due to mobile devices having less available RAM and processing power.",
  },
  {
    question: "Why is HTTPS important for ToolsAtZero?",
    answer:
      "ToolsAtZero is served exclusively over HTTPS (TLS encryption). This is critical because it ensures the tool code delivered to your browser hasn't been tampered with during transit (man-in-the-middle protection). It also enables modern browser APIs like Web Workers, WebAssembly, and the Clipboard API that many of our tools depend on. Never use developer tools on plain HTTP sites — the code itself could be compromised.",
  },
  {
    question: "How do I report a bug or suggest a new tool?",
    answer:
      "We'd love to hear from you! You can report bugs, request new tools, or provide general feedback by emailing us at support@toolsatzero.com. Please include your browser name/version, the tool you were using, and a description of what happened. Screenshots or screen recordings are extremely helpful for reproducing issues.",
  },
  {
    question: "What are the limitations of browser-based processing?",
    answer:
      "Browser-based tools trade cloud-scale power for absolute privacy. Key limitations include: (1) File size is bounded by your device's available RAM. (2) CPU-intensive tasks like video transcoding or large-model AI inference are slower than server-side equivalents. (3) Some file format support depends on browser API availability. (4) No persistent storage — outputs must be downloaded before closing the tab. (5) Multi-gigabyte operations are generally not feasible. For most everyday tasks, these trade-offs are negligible.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. ToolsAtZero requires zero registration, zero sign-ups, and zero personal information. Just open a tool and start using it. There are no accounts, no login walls, and no email harvesting. Every tool is immediately accessible.",
  },
  {
    question: "Can I use ToolsAtZero for commercial / work purposes?",
    answer:
      "Absolutely. ToolsAtZero is free for personal, educational, and commercial use. There are no licensing restrictions on the output generated by our tools. Whether you're formatting JSON for a client project, converting images for a presentation, or merging PDFs for a report — you're covered.",
  },
];



const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};



function FAQAccordionItem({
  item,
  index,
  isOpen,
  toggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-2 border-black bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <span className="neon-badge px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold shrink-0 mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-editorial text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight leading-snug">
            {item.question}
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
          <div className="border-t border-black/20 pt-4">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenItems(new Set(FAQ_ITEMS.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
              KNOWLEDGE BASE
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight border-b-2 border-black pb-6">
              Frequently Asked Questions
            </h1>
            <p className="font-mono text-xs text-muted-foreground uppercase">
              {FAQ_ITEMS.length} Questions Answered · 100% Transparent · Last
              Updated: June 2026
            </p>
          </div>

          {/* Giant Yellow Banner */}
          <div className="bg-accent border-2 border-black p-6 sm:p-8 text-black mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-mono text-sm sm:text-base font-black uppercase tracking-wider leading-relaxed">
              🛡️ ZERO-UPLOAD ARCHITECTURE: All 102 tools run 100% inside your
              browser. No files are uploaded. No accounts required. No data
              harvesting. Just tools that work.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {openItems.size} / {FAQ_ITEMS.length} expanded
            </span>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="font-mono text-xs uppercase font-bold tracking-wider border-2 border-black px-3 py-1.5 hover:bg-accent hover:text-black transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="font-mono text-xs uppercase font-bold tracking-wider border-2 border-black px-3 py-1.5 hover:bg-accent hover:text-black transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <FAQAccordionItem
                key={index}
                item={item}
                index={index}
                isOpen={openItems.has(index)}
                toggle={() => toggle(index)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 border-2 border-black p-6 sm:p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Still Have Questions?
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Reach out and
              we&apos;ll get back to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:support@toolsatzero.com"
                className="font-mono text-xs uppercase font-bold tracking-wider border-2 border-black bg-accent text-black px-6 py-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              >
                Email Support
              </a>
              <Link
                href="/"
                className="font-mono text-xs uppercase font-bold tracking-wider border-2 border-black px-6 py-3 hover:bg-accent hover:text-black transition-colors"
              >
                Browse All Tools
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
