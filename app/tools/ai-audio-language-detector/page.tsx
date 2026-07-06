import type { Metadata } from "next";
import FreeAiAiAudioLanguageDetectorTool from "@/components/tools/ai-audio-language-detector";
import { SchemaMarkup } from "@/components/schema-markup";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Audio Language Detector";
const toolUrl = "/tools/ai-audio-language-detector";
const displayDescription = "Use this Free AI audio language detector tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Audio Language Detector - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai audio language detector","ai audio language detector online","free ai audio language detector online","ai audio language detector tool","client-side ai audio language detector","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI Audio Language Detector - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-audio-language-detector",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Audio Language Detector - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Audio Language Detector completely offline?",
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
        toolName="Free AI Audio Language Detector"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Free AI Audio Language Detector
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FreeAiAiAudioLanguageDetectorTool />
        </div>
      </div>
    </main>
    </>
  );
}
