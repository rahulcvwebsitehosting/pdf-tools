import type { Metadata } from "next";
import CsvToExcelTool from "@/components/tools/csv-to-excel";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free CSV to Excel Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <CsvToExcelTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free CSV to Excel Online utility parses CSV text tables and generates Excel-compatible spreadsheet spreadsheets locally."
            howToUse={[
              "Paste CSV records or drop a CSV file into the workspace.",
              "Set delimiters and check the spreadsheet layout preview.",
              "Click 'Download Excel File' to save your .xls document."
            ]}
            whyClientSide="Keeping spreadsheets in local browser memory frames prevents data tracking."
          />
        </article>
      </main>
    </>
  );
}
