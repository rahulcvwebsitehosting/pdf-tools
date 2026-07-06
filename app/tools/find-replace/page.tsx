import type { Metadata } from "next";
import FindReplaceTool from "@/components/tools/find-replace";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Find & Replace";
const toolUrl = "/tools/find-replace";

const displayDescription = "Free search text streams using string search or regex and replace matches.";

export const metadata: Metadata = {
  title: "Free Find & Replace Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free find & replace","find & replace online","free find & replace online","find & replace tool","client-side find & replace","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Find & Replace Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/find-replace",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Find & Replace Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Find & Replace Online Utility?",
    answer: "A Free Find & Replace Online utility searches text streams using search query targets or regular expressions and replaces matches instantly.",
  },
  {
    question: "Is it safe to use this Free Find & Replace Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function FindReplaceToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Find & Replace Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Find & Replace
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <FindReplaceTool />
        </div>
      </div>
    </main>
    </>
  );
}
