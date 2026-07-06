import type { Metadata } from "next";
import FreeAiAiPasswordStrengthAnalyzerTool from "@/components/tools/ai-password-strength-analyzer";
import { SchemaMarkup } from "@/components/schema-markup";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI Password Strength Analyzer";
const toolUrl = "/tools/ai-password-strength-analyzer";
const displayDescription = "Use this Free AI password strength analyzer tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI Password Strength Analyzer - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai password strength analyzer","ai password strength analyzer online","free ai password strength analyzer online","ai password strength analyzer tool","client-side ai password strength analyzer","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI Password Strength Analyzer - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-password-strength-analyzer",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Password Strength Analyzer - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI Password Strength Analyzer completely offline?",
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
        toolName="Free AI Password Strength Analyzer"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Free AI Password Strength Analyzer
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FreeAiAiPasswordStrengthAnalyzerTool />
        </div>
      </div>
    </main>
    </>
  );
}
