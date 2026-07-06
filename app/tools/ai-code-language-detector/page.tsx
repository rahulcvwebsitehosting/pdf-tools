import type { Metadata } from "next";
import FreeAiAiCodeLanguageDetectorTool from "@/components/tools/ai-code-language-detector";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Code Language Detector";
const toolUrl = "/tools/ai-code-language-detector";
const displayDescription = "Use this Free AI code language detector tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Code Language Detector - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai code language detector","ai code language detector online","free ai code language detector online","ai code language detector tool","client-side ai code language detector","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI Code Language Detector - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-code-language-detector",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Code Language Detector - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Code Language Detector completely offline?",
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
        toolName="Free AI Code Language Detector"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free AI Code Language Detector
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <FreeAiAiCodeLanguageDetectorTool />

          <AeoSection
            toolName={toolName}
            whatIs="A client-side utility that operates completely locally on your machine."
            howToUse={[
              "Upload or enter your input data into the workspace area.",
              "Trigger the local processing option and wait for the execution to finish.",
              "Download or copy your secure results instantly."
            ]}
            whyClientSide="Your files and strings never leave your device. Computing locally bypasses external web endpoints entirely."
          />

          <RelatedTools currentSlug="ai-code-language-detector" category="developer" />
        </article>
      </main>
    </>
  );
}
