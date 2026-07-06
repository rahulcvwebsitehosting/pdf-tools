import type { Metadata } from "next";
import MergePdfTool from "@/components/tools/merge-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Merge PDF";
const toolUrl = "/tools/merge-pdf";

const displayDescription = "Free combine multiple PDF documents into a single organized file.";

export const metadata: Metadata = {
  title: "Free Merge PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free merge pdf","merge pdf online","free merge pdf online","merge pdf tool","client-side merge pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Merge PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/merge-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Merge PDF Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Merge PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <MergePdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
