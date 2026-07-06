import type { Metadata } from "next";
import HtmlMinifierTool from "@/components/tools/html-minifier";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "HTML Minifier";
const toolUrl = "/tools/html-minifier";

const displayDescription = "Free minify HTML pages by stripping whitespace characters and comments.";

export const metadata: Metadata = {
  title: "Free HTML Minifier Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free html minifier","html minifier online","free html minifier online","html minifier tool","client-side html minifier","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free HTML Minifier Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/html-minifier",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free HTML Minifier Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free HTML Minifier Online Utility?",
    answer: "A Free HTML Minifier Online utility minifies HTML pages by stripping comments and spaces locally.",
  },
  {
    question: "Is it safe to use this Free HTML Minifier Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function HtmlMinifierToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free HTML Minifier Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            HTML Minifier
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <HtmlMinifierTool />
        </div>
      </div>
    </main>
    </>
  );
}
