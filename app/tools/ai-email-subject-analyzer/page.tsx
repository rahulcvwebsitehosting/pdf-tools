import type { Metadata } from "next";
import FreeAiAiEmailSubjectAnalyzerTool from "@/components/tools/ai-email-subject-analyzer";
import { SchemaMarkup } from "@/components/schema-markup";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Email Subject Analyzer";
const toolUrl = "/tools/ai-email-subject-analyzer";
const displayDescription = "Use this Free AI email subject analyzer tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Email Subject Analyzer - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai email subject analyzer","ai email subject analyzer online","free ai email subject analyzer online","ai email subject analyzer tool","client-side ai email subject analyzer","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI Email Subject Analyzer - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-email-subject-analyzer",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Email Subject Analyzer - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Email Subject Analyzer completely offline?",
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
        toolName="Free AI Email Subject Analyzer"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Free AI Email Subject Analyzer
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FreeAiAiEmailSubjectAnalyzerTool />
        </div>
      </div>
    </main>
    </>
  );
}
