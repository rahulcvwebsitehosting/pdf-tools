import type { Metadata } from "next";
import FreeAiAiPencilSketchTool from "@/components/tools/ai-pencil-sketch";
import { SchemaMarkup } from "@/components/schema-markup";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Pencil Sketch Converter";
const toolUrl = "/tools/ai-pencil-sketch";
const displayDescription = "Use this Free AI pencil sketch converter tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Pencil Sketch Converter - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai pencil sketch converter","ai pencil sketch converter online","free ai pencil sketch converter online","ai pencil sketch converter tool","client-side ai pencil sketch converter","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI Pencil Sketch Converter - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-pencil-sketch",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Pencil Sketch Converter - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Pencil Sketch Converter completely offline?",
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
        toolName="Free AI Pencil Sketch Converter"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Free AI Pencil Sketch Converter
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FreeAiAiPencilSketchTool />
        </div>
      </div>
    </main>
    </>
  );
}
