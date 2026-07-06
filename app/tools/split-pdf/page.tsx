import type { Metadata } from "next";
import SplitPdfTool from "@/components/tools/split-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Split PDF";
const toolUrl = "/tools/split-pdf";

const displayDescription = "Free divide PDF documents into separate pages or custom range files.";

export const metadata: Metadata = {
  title: "Free Split PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free split pdf","split pdf online","free split pdf online","split pdf tool","client-side split pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Split PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/split-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Split PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Split PDF Online Utility?",
    answer: "A Free Split PDF Online utility extracts pages or ranges from an existing PDF file and bundles them into new independent document blocks.",
  },
  {
    question: "Is it safe to use this Free Split PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function SplitPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Split PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Split PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <SplitPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Split PDF Online utility extracts pages or ranges from an existing PDF file and bundles them into new independent document blocks."
            howToUse={[
              "Add your PDF document to the page splitter area.",
              "Input specific page ranges or extract all sheets as separate individual files.",
              "Click 'Split PDF' to run the extraction locally and save the split output."
            ]}
            whyClientSide="Extracting specific pages from financial sheets or contracts should remain private. A client-side splitter processes pages entirely inside browser memory."
          />
        </article>
      </main>
    </>
  );
}
