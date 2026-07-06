import type { Metadata } from "next";
import WordToPdfTool from "@/components/tools/word-to-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Word to PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <WordToPdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
