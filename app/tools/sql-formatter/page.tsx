import type { Metadata } from "next";
import SqlFormatterTool from "@/components/tools/sql-formatter";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "SQL Formatter";
const toolUrl = "/tools/sql-formatter";

const displayDescription = "Free beautify and indent SQL queries with custom indentation levels.";

export const metadata: Metadata = {
  title: "Free SQL Formatter Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free sql formatter","sql formatter online","free sql formatter online","sql formatter tool","client-side sql formatter","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free SQL Formatter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/sql-formatter",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SQL Formatter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free SQL Formatter Online Utility?",
    answer: "A Free SQL Formatter Online utility parses raw SQL statements and applies clean indentation and keyword capitalization.",
  },
  {
    question: "Is it safe to use this Free SQL Formatter Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function SqlFormatterToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free SQL Formatter Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            SQL Formatter
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <SqlFormatterTool />
        </div>
      </div>
    </main>
    </>
  );
}
