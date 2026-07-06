import type { Metadata } from "next";
import TextDiffCheckerTool from "@/components/tools/text-diff-checker";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Text Diff Checker";
const toolUrl = "/tools/text-diff-checker";

const displayDescription = "Free compare text blocks side-by-side to highlight line-by-line differences.";

export const metadata: Metadata = {
  title: "Free Text Diff Checker Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free text diff checker","text diff checker online","free text diff checker online","text diff checker tool","client-side text diff checker","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Text Diff Checker Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/text-diff-checker",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text Diff Checker Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Text Diff Checker Online Utility?",
    answer: "A Free Text Diff Checker Online utility compares two blocks of text and highlights additions and deletions line-by-line.",
  },
  {
    question: "Is it safe to use this Free Text Diff Checker Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function TextDiffCheckerToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Text Diff Checker Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Text Diff Checker
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <TextDiffCheckerTool />
        </div>
      </div>
    </main>
    </>
  );
}
