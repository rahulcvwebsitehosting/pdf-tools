import type { Metadata } from "next";
import FreeAiAiSqlFormatterExplanationTool from "@/components/tools/ai-sql-formatter-explanation";
import { SchemaMarkup } from "@/components/schema-markup";
import { RelatedTools } from "@/components/related-tools";

const toolName = "Free AI SQL Formatter with Explanation";
const toolUrl = "/tools/ai-sql-formatter-explanation";
const displayDescription = "Use this Free AI sql formatter with explanation tool completely offline in your local browser.";

export const metadata: Metadata = {
  title: "Free AI SQL Formatter with Explanation - 100% Local | ToolsAtZero",
  description: displayDescription,
  keywords: ["free ai sql formatter with explanation","ai sql formatter with explanation online","free ai sql formatter with explanation online","ai sql formatter with explanation tool","client-side ai sql formatter with explanation","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free AI SQL Formatter with Explanation - 100% Local | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/ai-sql-formatter-explanation",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI SQL Formatter with Explanation - 100% Local | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "How to use Free AI SQL Formatter with Explanation completely offline?",
    answer: "Since this tool runs 100% client-side in browser memory, you can simply load the page, disconnect from the internet, and perform all operations with zero server communication.",
  },
  {
    question: "Why client-side processing keeps your sensitive files secure?",
    answer: "No data, documents, or files are ever sent to an external server. The execution runs purely on your device's browser memory via Web Workers, keeping your sensitive datasets completely safe.",
  }
];

export default function Page() {
  return (
    <>
      <SchemaMarkup
        toolName="Free AI SQL Formatter with Explanation"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Free AI SQL Formatter with Explanation
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FreeAiAiSqlFormatterExplanationTool />
        </div>
      </div>
    </main>
    </>
  );
}
