import type { Metadata } from "next";
import JsMinifierTool from "@/components/tools/javascript-minifier";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "JS Minifier";
const toolUrl = "/tools/javascript-minifier";

const displayDescription = "Free minify and compact JS script code structures locally.";

export const metadata: Metadata = {
  title: "Free JS Minifier Online",
  description: displayDescription,
  keywords: ["free js minifier","js minifier online","free js minifier online","js minifier tool","client-side js minifier","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free JS Minifier Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/javascript-minifier",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JS Minifier Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free JS Minifier Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <JsMinifierTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free JS Minifier Online utility compresses JavaScript code scripts locally."
            howToUse={[
              "Paste your raw JavaScript code block into the box.",
              "Click 'Minify JS' to strip comments and spaces.",
              "Copy the minified JavaScript code block output."
            ]}
            whyClientSide="Minifying JS code locally keeps proprietary algorithms offline."
          />
        </article>
      </main>
    </>
  );
}
