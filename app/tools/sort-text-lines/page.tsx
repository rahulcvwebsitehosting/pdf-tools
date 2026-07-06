import type { Metadata } from "next";
import SortTextLinesTool from "@/components/tools/sort-text-lines";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Sort Text Lines";
const toolUrl = "/tools/sort-text-lines";

const displayDescription = "Free sort lines alphabetically, numerically, reversely, or by length.";

export const metadata: Metadata = {
  title: "Free Sort Text Lines Online",
  description: displayDescription,
  keywords: ["free sort text lines","sort text lines online","free sort text lines online","sort text lines tool","client-side sort text lines","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Sort Text Lines Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/sort-text-lines",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Sort Text Lines Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Sort Text Lines Online Utility?",
    answer: "A Free Sort Text Lines Online utility sorts lines alphabetically or numerically in-browser.",
  },
  {
    question: "Is it safe to use this Free Sort Text Lines Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function SortTextLinesToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Sort Text Lines Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Sort Text Lines Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <SortTextLinesTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Sort Text Lines Online utility sorts lines alphabetically or numerically in-browser."
            howToUse={[
              "Type or paste your text lines list into the box.",
              "Select sort order settings (A-Z, Z-A, or numerical).",
              "Copy the sorted output list instantly."
            ]}
            whyClientSide="Sorting list items locally keeps records and data confidential."
          />
        </article>
      </main>
    </>
  );
}
