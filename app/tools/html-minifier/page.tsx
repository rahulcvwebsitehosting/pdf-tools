import type { Metadata } from "next";
import HtmlMinifierTool from "@/components/tools/html-minifier";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free HTML Minifier Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <HtmlMinifierTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free HTML Minifier Online utility minifies HTML pages by stripping comments and spaces locally."
            howToUse={[
              "Paste your raw HTML page template into the box.",
              "Click 'Minify HTML' to strip developer notes and spaces.",
              "Copy the minified HTML markup output."
            ]}
            whyClientSide="Minifying document designs locally protects source markup structures."
          />
        </article>
      </main>
    </>
  );
}
