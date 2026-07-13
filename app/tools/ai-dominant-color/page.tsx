import type { Metadata } from "next";
import FreeAiAiDominantColorTool from "@/components/tools/ai-dominant-color";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Dominant Color Extractor";
const toolUrl = "/tools/ai-dominant-color";
const displayDescription = "Use this Free AI dominant color extractor tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Dominant Color Extractor - 100% Local | PDF Tools",
  description: displayDescription,
  keywords: ["free ai dominant color extractor","ai dominant color extractor online","free ai dominant color extractor online","ai dominant color extractor tool","client-side ai dominant color extractor","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free AI Dominant Color Extractor - 100% Local | PDF Tools",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/ai-dominant-color",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Dominant Color Extractor - 100% Local | PDF Tools",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Dominant Color Extractor completely offline?",
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
        toolName="Free AI Dominant Color Extractor"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free AI Dominant Color Extractor
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <FreeAiAiDominantColorTool />

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

          <RelatedTools currentSlug="ai-dominant-color" category="image" />
        </article>
      </main>
    </>
  );
}
