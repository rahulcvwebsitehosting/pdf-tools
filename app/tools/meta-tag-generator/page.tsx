import type { Metadata } from "next";
import MetaTagGeneratorTool from "@/components/tools/meta-tag-generator";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Meta Tag Generator";
const toolUrl = "/tools/meta-tag-generator";

const displayDescription = "Free generate SEO-optimized HTML header meta tag blocks.";

export const metadata: Metadata = {
  title: "Free Meta Tag Generator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free meta tag generator","meta tag generator online","free meta tag generator online","meta tag generator tool","client-side meta tag generator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Meta Tag Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/meta-tag-generator",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Meta Tag Generator Online Utility?",
    answer: "A Free Meta Tag Generator Online utility generates SEO-optimized HTML header meta tag elements locally.",
  },
  {
    question: "Is it safe to use this Free Meta Tag Generator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function MetaTagGeneratorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Meta Tag Generator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Meta Tag Generator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <MetaTagGeneratorTool />
        </div>
      </div>
    </main>
    </>
  );
}
