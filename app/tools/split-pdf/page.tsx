import type { Metadata } from "next";
import SplitPdfTool from "@/components/tools/split-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Split PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <SplitPdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
