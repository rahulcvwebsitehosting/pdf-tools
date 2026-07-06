import type { Metadata } from "next";
import FreeAiAiPdfSummarizerTool from "@/components/tools/ai-pdf-summarizer";
import { SchemaMarkup } from "@/components/schema-markup";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI PDF Summarizer";
const toolUrl = "/tools/ai-pdf-summarizer";
const displayDescription = "Use this Free AI pdf summarizer tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI PDF Summarizer - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai pdf summarizer","ai pdf summarizer online","free ai pdf summarizer online","ai pdf summarizer tool","client-side ai pdf summarizer","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI PDF Summarizer - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-pdf-summarizer",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI PDF Summarizer - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI PDF Summarizer completely offline?",
    answer: "Since this tool runs 100% client-side in browser memory, you can simply load the page, disconnect from the internet, and perform all operations with zero server communication.",
  },
  {
    question: "Why client-side processing keeps your sensitive files secure?",
    answer: "No data, documents, or files are ever sent to an external server. The execution runs purely on your device's browser memory via Web Workers, keeping your sensitive datasets completely safe.",
  }
];

export default function Page() {
  return (
    <>
      <SchemaMarkup
        toolName="Free AI PDF Summarizer"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Free AI PDF Summarizer
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FreeAiAiPdfSummarizerTool />
        </div>
      </div>
    </main>
    </>
  );
}
