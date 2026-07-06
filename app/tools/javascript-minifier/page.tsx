import type { Metadata } from "next";
import JsMinifierTool from "@/components/tools/javascript-minifier";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "JS Minifier";
const toolUrl = "/tools/javascript-minifier";

const displayDescription = "Free minify and compact JS script code structures locally.";

export const metadata: Metadata = {
  title: "Free JS Minifier Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free js minifier","js minifier online","free js minifier online","js minifier tool","client-side js minifier","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free JS Minifier Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/javascript-minifier",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JS Minifier Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free JS Minifier Online Utility?",
    answer: "A Free JS Minifier Online utility compresses JavaScript code scripts locally.",
  },
  {
    question: "Is it safe to use this Free JS Minifier Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function JsMinifierToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free JS Minifier Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            JS Minifier
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <JsMinifierTool />
        </div>
      </div>
    </main>
    </>
  );
}
