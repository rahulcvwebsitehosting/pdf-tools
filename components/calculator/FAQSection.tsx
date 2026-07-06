"use client";

import { useState } from "react";
import { FAQItem } from "@/lib/tools-engine/registry/types";

interface FAQSectionProps {
  faq: FAQItem[];
}

export default function FAQSection({ faq }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq || faq.length === 0) return null;

  return (
    <section className="space-y-6">
      <h3 className="font-editorial text-2xl font-bold uppercase border-b border-black pb-2">
        Frequently Asked Questions
      </h3>
      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="editorial-panel overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-mono text-xs sm:text-sm font-bold uppercase hover:bg-accent transition-colors"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="text-lg font-black shrink-0 ml-4">
                  {isOpen ? "\u2212" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="p-4 border-t border-black bg-background text-sm leading-relaxed text-muted-foreground animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
