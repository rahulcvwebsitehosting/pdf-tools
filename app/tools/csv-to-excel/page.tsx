import type { Metadata } from "next";
import CsvToExcelTool from "@/components/tools/csv-to-excel";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "CSV to Excel";
const toolUrl = "/tools/csv-to-excel";

const displayDescription = "Free convert comma-separated tables into Microsoft Excel spreadsheet (.xls) files.";

export const metadata: Metadata = {
  title: "Free CSV to Excel Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free csv to excel","csv to excel online","free csv to excel online","csv to excel tool","client-side csv to excel","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free CSV to Excel Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/csv-to-excel",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CSV to Excel Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free CSV to Excel Online Utility?",
    answer: "A Free CSV to Excel Online utility parses CSV text tables and generates Excel-compatible spreadsheet spreadsheets locally.",
  },
  {
    question: "Is it safe to use this Free CSV to Excel Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function CsvToExcelToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free CSV to Excel Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            CSV to Excel
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <CsvToExcelTool />
        </div>
      </div>
    </main>
    </>
  );
}
