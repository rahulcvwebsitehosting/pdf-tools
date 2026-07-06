import type { Metadata } from "next";
import WordToPdfTool from "@/components/tools/word-to-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Word to PDF";
const toolUrl = "/tools/word-to-pdf";

const displayDescription = "Free convert standard Word documents (.docx) to high-fidelity PDF pages.";

export const metadata: Metadata = {
  title: "Free Word to PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free word to pdf","word to pdf online","free word to pdf online","word to pdf tool","client-side word to pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Word to PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/word-to-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Word to PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Word to PDF Online Utility?",
    answer: "A Free Word to PDF Online utility converts Word document markup structures and styling into standard PDF documents locally.",
  },
  {
    question: "Is it safe to use this Free Word to PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function WordToPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Word to PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Word to PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <WordToPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Word to PDF Online utility converts Word document markup structures and styling into standard PDF documents locally."
            howToUse={[
              "Upload a standard Microsoft Word document (.docx) to the converter.",
              "Preview formatting, paragraph styles, and page margins.",
              "Click 'Convert to PDF' to compile the pages locally and download the document."
            ]}
            whyClientSide="Business proposals and reports contain confidential details. local processing guarantees complete privacy."
          />
        </article>
      </main>
    </>
  );
}
