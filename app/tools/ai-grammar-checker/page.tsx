import type { Metadata } from "next";
import FreeAiAiGrammarCheckerTool from "@/components/tools/ai-grammar-checker";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Grammar Checker";
const toolUrl = "/tools/ai-grammar-checker";
const displayDescription = "Use this Free AI grammar checker tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Grammar Checker - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai grammar checker","ai grammar checker online","free ai grammar checker online","ai grammar checker tool","client-side ai grammar checker","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free AI Grammar Checker - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/ai-grammar-checker",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Grammar Checker - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Grammar Checker completely offline?",
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
        toolName="Free AI Grammar Checker"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free AI Grammar Checker
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <FreeAiAiGrammarCheckerTool />

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

          <RelatedTools currentSlug="ai-grammar-checker" category="office" />
        </article>
      </main>
    </>
  );
}
