import type { Metadata } from "next";
import { JsonFormatterTool } from "@/components/tools/json-formatter";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "JSON Formatter & Validator";
const toolUrl = "/tools/json-formatter";

const displayDescription = "Free beautify, validate, and minify JSON structures locally.";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free json formatter & validator","json formatter & validator online","free json formatter & validator online","json formatter & validator tool","client-side json formatter & validator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free JSON Formatter & Validator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/json-formatter",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Formatter & Validator Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            JSON Formatter & Validator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <JsonFormatterTool />
        </div>
      </div>
    </main>
    </>
  );
}
