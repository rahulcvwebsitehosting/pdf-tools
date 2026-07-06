import type { Metadata } from "next";
import CsvToJsonTool from "@/components/tools/csv-to-json";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "CSV to JSON";
const toolUrl = "/tools/csv-to-json";

const displayDescription = "Free format CSV files into clean JSON arrays locally.";

export const metadata: Metadata = {
  title: "Free CSV to JSON Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free csv to json","csv to json online","free csv to json online","csv to json tool","client-side csv to json","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free CSV to JSON Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/csv-to-json",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CSV to JSON Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free CSV to JSON Online Utility?",
    answer: "A Free CSV to JSON Online utility converts CSV tables into formatted JSON arrays in-memory.",
  },
  {
    question: "Is it safe to use this Free CSV to JSON Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function CsvToJsonToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free CSV to JSON Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free CSV to JSON Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <CsvToJsonTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free CSV to JSON Online utility converts CSV tables into formatted JSON arrays in-memory."
            howToUse={[
              "Paste CSV table rows or load a local CSV file.",
              "Configure cell delimiters and specify if the first row holds headers.",
              "Copy the generated JSON array output instantly."
            ]}
            whyClientSide="Processing corporate tables locally protects client databases."
          />
        </article>
      </main>
    </>
  );
}
