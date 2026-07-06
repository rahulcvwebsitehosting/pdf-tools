import type { Metadata } from "next";
import CssMinifierTool from "@/components/tools/css-minifier";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "CSS Minifier";
const toolUrl = "/tools/css-minifier";

const displayDescription = "Free compress CSS stylesheets by removing spacing rules and comments.";

export const metadata: Metadata = {
  title: "Free CSS Minifier Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free css minifier","css minifier online","free css minifier online","css minifier tool","client-side css minifier","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free CSS Minifier Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/css-minifier",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CSS Minifier Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free CSS Minifier Online Utility?",
    answer: "A Free CSS Minifier Online utility compresses CSS stylesheets by purging comments and spaces locally.",
  },
  {
    question: "Is it safe to use this Free CSS Minifier Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function CssMinifierToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free CSS Minifier Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free CSS Minifier Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <CssMinifierTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free CSS Minifier Online utility compresses CSS stylesheets by purging comments and spaces locally."
            howToUse={[
              "Paste your raw CSS style rules into the input panel.",
              "Click 'Minify CSS' to compress style rules.",
              "Copy the minified CSS style sheet output."
            ]}
            whyClientSide="Compressing css styles client-side avoids sending files to remote servers."
          />
        </article>
      </main>
    </>
  );
}
