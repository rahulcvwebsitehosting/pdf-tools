import type { Metadata } from "next";
import SortTextLinesTool from "@/components/tools/sort-text-lines";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Sort Text Lines";
const toolUrl = "/tools/sort-text-lines";

const displayDescription = "Free sort lines alphabetically, numerically, reversely, or by length.";

export const metadata: Metadata = {
  title: "Free Sort Text Lines Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free sort text lines","sort text lines online","free sort text lines online","sort text lines tool","client-side sort text lines","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Sort Text Lines Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/sort-text-lines",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Sort Text Lines Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Sort Text Lines Online Utility?",
    answer: "A Free Sort Text Lines Online utility sorts lines alphabetically or numerically in-browser.",
  },
  {
    question: "Is it safe to use this Free Sort Text Lines Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function SortTextLinesToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Sort Text Lines Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Sort Text Lines
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <SortTextLinesTool />
        </div>
      </div>
    </main>
    </>
  );
}
