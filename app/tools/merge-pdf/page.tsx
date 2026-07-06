import type { Metadata } from "next";
import MergePdfTool from "@/components/tools/merge-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Merge PDF";
const toolUrl = "/tools/merge-pdf";

const displayDescription = "Free combine multiple PDF documents into a single organized file.";

export const metadata: Metadata = {
  title: "Free Merge PDF Online",
  description: displayDescription,
  keywords: ["free merge pdf","merge pdf online","free merge pdf online","merge pdf tool","client-side merge pdf","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Merge PDF Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/merge-pdf",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Merge PDF Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Merge PDF Online Utility?",
    answer: "A Free Merge PDF Online utility compiles multiple PDF streams and stitches their internal pages together into a single unified document stream.",
  },
  {
    question: "Is it safe to use this Free Merge PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function MergePdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Merge PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Merge PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <MergePdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Merge PDF Online utility compiles multiple PDF streams and stitches their internal pages together into a single unified document stream."
            howToUse={[
              "Choose two or more PDF files from your local storage.",
              "Reorder the file queues to match your intended page layout sequence.",
              "Click 'Merge PDF' to trigger a browser-driven merge and download the merged file."
            ]}
            whyClientSide="Merging company ledgers or audit logs on remote hosts exposes raw data. Merging on your local CPU ensures complete file privacy."
          />
        </article>
      </main>
    </>
  );
}
