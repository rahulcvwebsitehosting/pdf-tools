import type { Metadata } from "next";
import FreeAiAiSentenceSimplifierTool from "@/components/tools/ai-sentence-simplifier";
import { SchemaMarkup } from "@/components/schema-markup";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Sentence Simplifier";
const toolUrl = "/tools/ai-sentence-simplifier";
const displayDescription = "Use this Free AI sentence simplifier tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Sentence Simplifier - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai sentence simplifier","ai sentence simplifier online","free ai sentence simplifier online","ai sentence simplifier tool","client-side ai sentence simplifier","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI Sentence Simplifier - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-sentence-simplifier",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Sentence Simplifier - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Sentence Simplifier completely offline?",
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
        toolName="Free AI Sentence Simplifier"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Free AI Sentence Simplifier
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FreeAiAiSentenceSimplifierTool />
        </div>
      </div>
    </main>
    </>
  );
}
