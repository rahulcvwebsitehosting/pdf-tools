import type { Metadata } from "next";
import ExcelToPdfTool from "@/components/tools/excel-to-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Excel to PDF";
const toolUrl = "/tools/excel-to-pdf";

const displayDescription = "Free format and export spreadsheet files (.xlsx/.csv) to PDF document layouts.";

export const metadata: Metadata = {
  title: "Free Excel to PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free excel to pdf","excel to pdf online","free excel to pdf online","excel to pdf tool","client-side excel to pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Excel to PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/excel-to-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Excel to PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Excel to PDF Online Utility?",
    answer: "A Free Excel to PDF Online utility formats tabular spreadsheet data into printable PDF formats locally in browser memory.",
  },
  {
    question: "Is it safe to use this Free Excel to PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ExcelToPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Excel to PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Excel to PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <ExcelToPdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
