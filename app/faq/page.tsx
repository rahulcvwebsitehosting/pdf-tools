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
    question: "Why does my browser freeze for a second when I first open a PDF tool?",
    answer:
      "On the first run, the tool fetches and initializes the PyMuPDF WebAssembly engine (~10 MB). This is a one-time download that gets cached by your browser. The next time you open any PDF tool, it starts almost instantly. We show a \"Loading PDF engine…\" message during this step so you know what's happening.",
  },
  {
    question: "I ran a tool and it produced a file with no extension. What do I do?",
    answer:
      "Some tools return a blob whose type the browser doesn't auto-name (for example multi-page splits). The download button on the result already appends the correct extension for PDF outputs. If your OS still strips it, just rename the file and add .pdf, .png, .jpg, etc. to match the operation you performed.",
  },
  {
    question: "Why is the \"Coming Soon\" badge showing on a tool that looks finished?",
    answer:
      "Some PDF tools are registered in the catalogue but their specific operation isn't yet wired into our PyMuPDF engine dispatcher. The page still loads so you can see what the tool will do, but running it will return a \"not yet supported\" message. We're shipping new operations every release. Use the Explore More toggle on the homepage to see everything that's live.",
  },
  {
    question: "The watermark and page-number tools ask for a font — do I need to upload one?",
    answer:
      "No. We bundle a default font inside the PyMuPDF WebAssembly module, so you can type any text in plain ASCII or Unicode and it will be rendered onto the PDF without uploading anything. If you want a custom .ttf file, drop it into the upload field and it stays on your device.",
  },
  {
    question: "My password-protected PDF won't unlock. Why?",
    answer:
      "There are two kinds of PDF passwords: the user password (required to even open the file) and the owner password (only restricts editing/printing). Our Unlock tool handles the user password. If your PDF only has an owner password, open it normally and re-save — no password is needed.",
  },
  {
    question: "How do I merge 50+ files at once?",
    answer:
      "Open the Merge PDF tool, drop all your files into the upload area, reorder them by dragging, and hit Run. There's no hard cap on the number of files, but very large batches can take a while because every page has to be copied through WebAssembly. For best results, keep total input under ~200 MB.",
  },
  {
    question: "Will the OCR tool read handwriting?",
    answer:
      "The built-in OCR engine is optimized for printed text and clean scans. Cursive handwriting, stylized fonts, and low-resolution photos (below 200 DPI) often produce partial or garbled results. For documents with mixed content, run OCR on the scanned pages only and leave the digital ones untouched.",
  },
  {
    question: "The PDF I compressed is actually bigger. What went wrong?",
    answer:
      "If your PDF is already heavily optimized (images are at low DPI, fonts are subset, no embedded media), re-compressing it can make it larger because the engine adds metadata. Try the \"Low\" quality preset first, or skip compression for PDFs that are already under 1 MB.",
  },
  {
    question: "Can I add a real digital signature, not just a drawn signature image?",
    answer:
      "Our Sign PDF tool currently places a drawn or uploaded signature image onto the page. Cryptographic PKCS#7 digital signatures (the legally-binding kind) are on the roadmap. For now, the drawn signature is perfectly fine for internal documents, contracts-in-progress, and visual approval flows.",
  },
  {
    question: "Why does the rotate tool only let me rotate by 90°, 180°, or 270°?",
    answer:
      "PDF pages are designed around 90° increments — rotating by, say, 17° would break text reflow and accessibility tagging. If you need a custom angle, export the page to an image, rotate it in any image editor, then re-import it as a new page using our Image to PDF tool.",
  },
  {
    question: "I'm on a slow connection and the page takes forever to load. Can I preload the engine?",
    answer:
      "Yes. Open any PDF tool once on a fast connection — the engine is then cached. On slow networks, the first load may take 20–30 seconds for the ~10 MB WASM file. Subsequent loads of any PDF tool will skip this step entirely. There is no preload banner at the moment, but it's on the list.",
  },
  {
    question: "Why are some tools faster than others?",
    answer:
      "Single-page operations (rotate, extract, metadata edit) finish in milliseconds because they only need to read the page dictionary. Multi-page operations that touch every pixel (compress, OCR, image conversion) are CPU-bound and scale with the number of pages. A 5-page compress is near-instant; a 500-page OCR can take a few minutes.",
  },
  {
    question: "My downloaded PDF opens in Preview/Chrome but not in Acrobat — is it broken?",
    answer:
      "Almost always, no. The file is a valid PDF 1.7 document, but some very old Acrobat versions or strict enterprise PDF/A validators reject certain features our engine produces (for example, object streams with cross-references). Re-saving the output through any of our other tools usually fixes it.",
  },
  {
    question: "Where can I report a tool that crashed or gave a weird error?",
    answer:
      "Open an issue on our GitHub repository. Please include the tool slug (the part of the URL after /tools/), your browser name and version, the input file size, and a copy of the exact error message if one was shown. Screenshots help a lot. We triage reports weekly.",
  },
  {
    question: "Can I embed one of your tools on my own website?",
    answer:
      "The PDF tools are deeply coupled to our engine bundle, so a drop-in embed isn't available yet. You can, however, link directly to any tool (for example /tools/merge-pdf) and the experience will be the same as on this site. If you need a higher-volume integration, reach out via GitHub issues and we can discuss options.",
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
              Practical answers about the PDF tools on pdf-tools-cv.vercel.app
              — performance quirks, edge cases, and how the engine behaves. Can&apos;t
              find what you&apos;re looking for? Ask on{" "}
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
              Every PDF tool on this site runs 100% inside your browser. Your
              files stay on your device. No accounts, no cloud, no tracking of
              your documents.
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
              Have a Question We Missed?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Open an issue on GitHub to report a bug, request a new tool, or
              ask anything else. We read every report.
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
          </div>
        </div>
      </main>
    </>
  );
}
