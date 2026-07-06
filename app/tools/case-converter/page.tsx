import type { Metadata } from "next";
import CaseConverterTool from "@/components/tools/case-converter";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Advanced Case Converter";
const toolUrl = "/tools/case-converter";

const displayDescription = "Free convert text camelCase, snake_case, UPPERCASE, and sentence structures.";

export const metadata: Metadata = {
  title: "Free Advanced Case Converter Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free advanced case converter","advanced case converter online","free advanced case converter online","advanced case converter tool","client-side advanced case converter","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Advanced Case Converter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/case-converter",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Advanced Case Converter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Advanced Case Converter Online Utility?",
    answer: "A Free Advanced Case Converter Online utility formats text styles into camelCase, snake_case, UPPERCASE, lowercase, and Title Case configurations.",
  },
  {
    question: "Is it safe to use this Free Advanced Case Converter Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function CaseConverterToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Advanced Case Converter Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Advanced Case Converter
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <CaseConverterTool />
        </div>
      </div>
    </main>
    </>
  );
}
