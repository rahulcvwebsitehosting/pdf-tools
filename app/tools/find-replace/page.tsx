import type { Metadata } from "next";
import FindReplaceTool from "@/components/tools/find-replace";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Find & Replace Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <FindReplaceTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Find & Replace Online utility searches text streams using search query targets or regular expressions and replaces matches instantly."
            howToUse={[
              "Paste your text into the main editor box.",
              "Specify your search pattern and target replacement text.",
              "Click 'Replace All' to execute the replacements locally."
            ]}
            whyClientSide="Searching and replacing sensitive strings locally protects file content."
          />
        </article>
      </main>
    </>
  );
}
