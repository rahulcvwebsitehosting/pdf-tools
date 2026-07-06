import type { Metadata } from "next";
import RemovePdfPagesTool from "@/components/tools/remove-pdf-pages";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Remove PDF Pages";
const toolUrl = "/tools/remove-pdf-pages";

const displayDescription = "Free delete unnecessary pages from a PDF document locally.";

export const metadata: Metadata = {
  title: "Free Remove PDF Pages Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free remove pdf pages","remove pdf pages online","free remove pdf pages online","remove pdf pages tool","client-side remove pdf pages","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Remove PDF Pages Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/remove-pdf-pages",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Remove PDF Pages Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Remove PDF Pages
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <RemovePdfPagesTool />
        </div>
      </div>
    </main>
    </>
  );
}
