import type { Metadata } from "next";
import RemovePdfPagesTool from "@/components/tools/remove-pdf-pages";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Remove PDF Pages";
const toolUrl = "/tools/remove-pdf-pages";

const displayDescription = "Free delete unnecessary pages from a PDF document locally.";

export const metadata: Metadata = {
  title: "Free Remove PDF Pages Online",
  description: displayDescription,
  keywords: ["free remove pdf pages","remove pdf pages online","free remove pdf pages online","remove pdf pages tool","client-side remove pdf pages","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Remove PDF Pages Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/remove-pdf-pages",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Remove PDF Pages Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Remove PDF Pages Online Utility?",
    answer: "A Free Remove PDF Pages Online utility strips specific page indices from a PDF document and recompiles the remaining sheets.",
  },
  {
    question: "Is it safe to use this Free Remove PDF Pages Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function RemovePdfPagesToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Remove PDF Pages Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Remove PDF Pages Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <RemovePdfPagesTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Remove PDF Pages Online utility strips specific page indices from a PDF document and recompiles the remaining sheets."
            howToUse={[
              "Drop your PDF document into the workspace area.",
              "Select the specific sheet thumbnails or enter ranges to remove.",
              "Click 'Remove Pages' to clean the PDF structure client-side and download."
            ]}
            whyClientSide="Deleting private sheets from a presentation or proposal should be secure. Keeping the files in memory guarantees data safety."
          />
        </article>
      </main>
    </>
  );
}
