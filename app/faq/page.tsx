"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const GITHUB_ISSUES_URL = "https://github.com/rahulcvwebsitehosting/pdf-tools/issues";

function GitHubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.47.12-3.07 0 0 .98-.31 3.2 1.17a11.1 11.1 0 0 1 5.82 0c2.22-1.48 3.2-1.17 3.2-1.17.64 1.6.24 2.77.12 3.07.75.8 1.2 1.82 1.2 3.08 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is PDF Tools?",
    answer:
      "PDF Tools is a free, browser-based platform offering 131 PDF utilities plus dozens of developer, image, text, web, time, and calculator tools. Everything runs 100% inside your browser using WebAssembly (PyMuPDF, etc.) and standard JavaScript APIs. No accounts, no uploads, no hidden costs.",
  },
  {
    question: "How many PDF tools do you offer?",
    answer:
      "We currently offer 131 PDF tools covering merge, split, compress, convert (PDF to Word, JPG, PNG, Excel, PowerPoint, and vice versa), edit, sign, protect with password, unlock, rotate pages, remove pages, extract pages, rearrange, add watermarks, add page numbers, OCR, redact, compare, optimize for web, and many more.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. Your files never leave your device. All processing happens locally inside your browser using WebAssembly. When you close the tab, all data is purged from memory automatically. There are no backend uploads, no cloud storage, and no file logging.",
  },
  {
    question: "Is PDF Tools really free?",
    answer:
      "Yes. Every tool is 100% free with no usage limits, no premium tiers, and no sign-ups. The site is sustained through minimal, non-intrusive advertising.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can use every tool immediately without registering or providing any personal information.",
  },
  {
    question: "What technology powers the PDF tools?",
    answer:
      "Our PDF tools are powered by PyMuPDF compiled to WebAssembly and loaded directly in your browser via Pyodide. The full PDF processing engine runs locally on your device, giving you desktop-grade PDF manipulation with the privacy of client-side computing.",
  },
  {
    question: "What file size can I process?",
    answer:
      "There is no hard limit imposed by PDF Tools, but practical limits depend on your device's available RAM. Most browsers comfortably handle files up to a few hundred megabytes. For very large or complex operations, a desktop with more RAM will perform better.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Once a tool page is fully loaded, most tools continue to work without an internet connection because the processing engine is already running in your browser. However, an initial connection is required to load the page and its WebAssembly assets.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "PDF Tools works on all modern, up-to-date browsers including Chrome, Edge, Brave, Firefox, Safari, and Arc. WebAssembly support is required and is available in every browser released in the last several years.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. The site is fully responsive and works on smartphones and tablets. However, processing large PDFs on mobile may be slower due to limited RAM. For best results, use a desktop or laptop for large files.",
  },
  {
    question: "What other tool categories are available?",
    answer:
      "Beyond PDFs, we offer Developer tools (JSON formatter, Base64 encoder/decoder, JWT decoder, UUID generator, regex tester, etc.), Image tools (compressor, resizer, cropper, format converter), Office & Text tools (case converter, word counter, CSV/JSON converter, text diff), Web tools (URL encoder, HTML/CSS/JS minifier, meta tag generator), Time tools (epoch converter, timezone converter, date difference, stopwatch), and Calculators (GST, EMI, SIP, BMI, scientific).",
  },
  {
    question: "Is there a dark and light mode?",
    answer:
      "Yes. Use the sun/moon button in the top-right corner of the header to toggle between dark and light themes. Your preference is saved in your browser and persists across visits.",
  },
  {
    question: "Can I use the tools for commercial work?",
    answer:
      "Absolutely. The tools are free for personal, educational, and commercial use. There are no licensing restrictions on the output you generate.",
  },
  {
    question: "How do I report a bug or request a feature?",
    answer:
      "Open an issue on our GitHub repository and we will take a look. Bug reports, feature requests, and general questions are all welcome.",
  },
  {
    question: "Will my files be added to the \"Coming Soon\" tools?",
    answer:
      "We are continuously working to bring more tools online. The tools labeled \"Coming Soon\" are already registered in our catalogue and are being wired up to the processing engine. The Explore More toggle on the homepage reveals all of them.",
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
    <div className="editorial-card overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <span className="neon-badge shrink-0 mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-editorial text-base sm:text-lg font-bold leading-snug">
            {item.question}
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="border-t border-border pt-4">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="text-foreground pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Header */}
          <div className="space-y-4 pt-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Everything you need to know about PDF Tools. Can&apos;t find what
              you&apos;re looking for? Ask on{" "}
              <a
                href={GITHUB_ISSUES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff8a3d] hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          {/* Banner */}
          <div className="editorial-card p-5 sm:p-6 flex items-start gap-3">
            <span className="text-2xl shrink-0">🛡️</span>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              <strong className="text-[#ff8a3d]">Zero-upload architecture.</strong>{" "}
              All 131 PDF tools run 100% inside your browser. No files are
              uploaded. No accounts required. No data harvesting.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {openItems.size} / {FAQ_ITEMS.length} expanded
            </span>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="btn-secondary px-3 py-1.5 text-xs"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="btn-secondary px-3 py-1.5 text-xs"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
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
          <div className="editorial-card p-6 sm:p-8 text-center space-y-5">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
              Still Have Questions?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Open an issue on GitHub to report a bug, request a new tool, or
              ask anything else. We&apos;re happy to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={GITHUB_ISSUES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-btn-primary"
              >
                <GitHubIcon size={18} />
                Ask on GitHub
              </a>
              <Link href="/" className="btn-secondary">
                Browse All Tools
              </Link>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Or reach us at{" "}
              <a
                href="mailto:support@pdf-tools.app"
                className="text-[#ff8a3d] hover:underline"
              >
                support@pdf-tools.app
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
