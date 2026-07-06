import type { Metadata } from "next";
import { JsonFormatterTool } from "@/components/tools/json-formatter";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "JSON Formatter & Validator";
const toolUrl = "/tools/json-formatter";

const displayDescription = "Free beautify, validate, and minify JSON structures locally.";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator Online",
  description: displayDescription,
  keywords: ["free json formatter & validator","json formatter & validator online","free json formatter & validator online","json formatter & validator tool","client-side json formatter & validator","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free JSON Formatter & Validator Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/json-formatter",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Formatter & Validator Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free JSON Formatter & Validator Online Utility?",
    answer: "A Free JSON Formatter & Validator Online utility is a developer tool that validates and formats JSON data using custom indentation layouts.",
  },
  {
    question: "Is it safe to use this Free JSON Formatter & Validator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function JsonFormatterToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free JSON Formatter & Validator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free JSON Formatter & Validator Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <JsonFormatterTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free JSON Formatter & Validator Online utility is a developer tool that validates and formats JSON data using custom indentation layouts."
            howToUse={[
              "Paste your raw JSON text into the input panel.",
              "Click 'Format' to beautify, or 'Minify' to remove whitespaces.",
              "View any parse errors at line/column indexes, and click 'Copy' to save the output."
            ]}
            whyClientSide="JSON logs can hold proprietary parameters and credentials. Formatting locally in your browser memory ensures your data is secure."
          />
        </article>
      </main>
    </>
  );
}
