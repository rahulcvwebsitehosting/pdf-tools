import type { Metadata } from "next";
import ExcelToPdfTool from "@/components/tools/excel-to-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Excel to PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <ExcelToPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Excel to PDF Online utility formats tabular spreadsheet data into printable PDF formats locally in browser memory."
            howToUse={[
              "Select your Excel (.xlsx) or CSV file.",
              "Verify cell alignment, sheet borders, and print layouts.",
              "Click 'Convert to PDF' to compile table grids and download the PDF document."
            ]}
            whyClientSide="Corporate spreadsheet data is highly sensitive. Converting client-side ensures complete data protection."
          />
        </article>
      </main>
    </>
  );
}
