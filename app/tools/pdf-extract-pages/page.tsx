import type { Metadata } from "next";
import PdfExtractPagesTool from "@/components/tools/pdf-extract-pages";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Extract Specific Pages";
const toolUrl = "/tools/pdf-extract-pages";

const displayDescription = "Free isolate and save specific pages from your PDF file.";

export const metadata: Metadata = {
  title: "Free Extract Specific Pages Online",
  description: displayDescription,
  keywords: ["free extract specific pages","extract specific pages online","free extract specific pages online","extract specific pages tool","client-side extract specific pages","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Extract Specific Pages Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/pdf-extract-pages",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Extract Specific Pages Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Extract Specific Pages Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <PdfExtractPagesTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Extract Specific Pages Online utility splits select page indexes and saves them into a new document."
            howToUse={[
              "Load your PDF file into the extractor workspace.",
              "Choose the exact page numbers you want to extract.",
              "Click 'Extract Pages' to compile the selected sheets and download."
            ]}
            whyClientSide="Isolating pages of an audit or proposal locally keeps details secure and avoids exposing content to remote systems."
          />
        </article>
      </main>
    </>
  );
}
