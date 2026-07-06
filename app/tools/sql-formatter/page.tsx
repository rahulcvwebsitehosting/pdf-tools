import type { Metadata } from "next";
import SqlFormatterTool from "@/components/tools/sql-formatter";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "SQL Formatter";
const toolUrl = "/tools/sql-formatter";

const displayDescription = "Free beautify and indent SQL queries with custom indentation levels.";

export const metadata: Metadata = {
  title: "Free SQL Formatter Online",
  description: displayDescription,
  keywords: ["free sql formatter","sql formatter online","free sql formatter online","sql formatter tool","client-side sql formatter","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free SQL Formatter Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/sql-formatter",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SQL Formatter Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free SQL Formatter Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <SqlFormatterTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free SQL Formatter Online utility parses raw SQL statements and applies clean indentation and keyword capitalization."
            howToUse={[
              "Paste your raw SQL query string into the input area.",
              "Click 'Format SQL' to apply indentation and capitalize SQL keywords.",
              "Copy the formatted and beautified SQL query structure."
            ]}
            whyClientSide="Formatting SQL queries containing sensitive table details locally avoids cloud storage leaks."
          />
        </article>
      </main>
    </>
  );
}
