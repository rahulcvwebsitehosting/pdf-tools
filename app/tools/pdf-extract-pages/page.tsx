import type { Metadata } from "next";
import PdfExtractPagesTool from "@/components/tools/pdf-extract-pages";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Extract Specific Pages";
const toolUrl = "/tools/pdf-extract-pages";

const displayDescription = "Free isolate and save specific pages from your PDF file.";

export const metadata: Metadata = {
  title: "Free Extract Specific Pages Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free extract specific pages","extract specific pages online","free extract specific pages online","extract specific pages tool","client-side extract specific pages","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Extract Specific Pages Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/pdf-extract-pages",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Extract Specific Pages Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Extract Specific Pages Online Utility?",
    answer: "A Free Extract Specific Pages Online utility splits select page indexes and saves them into a new document.",
  },
  {
    question: "Is it safe to use this Free Extract Specific Pages Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function PdfExtractPagesToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Extract Specific Pages Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Extract Specific Pages
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <PdfExtractPagesTool />
        </div>
      </div>
    </main>
    </>
  );
}
