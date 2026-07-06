import type { Metadata } from "next";
import HtmlEntitiesTool from "@/components/tools/html-entities";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "HTML Entity Encoder";
const toolUrl = "/tools/html-entities";

const displayDescription = "Free encode special characters to HTML entities and decode them back.";

export const metadata: Metadata = {
  title: "Free HTML Entity Encoder Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free html entity encoder","html entity encoder online","free html entity encoder online","html entity encoder tool","client-side html entity encoder","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free HTML Entity Encoder Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/html-entities",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free HTML Entity Encoder Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free HTML Entity Encoder Online Utility?",
    answer: "A Free HTML Entity Encoder Online utility converts special characters into safe HTML entity escape strings.",
  },
  {
    question: "Is it safe to use this Free HTML Entity Encoder Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function HtmlEntitiesToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free HTML Entity Encoder Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            HTML Entity Encoder
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <HtmlEntitiesTool />
        </div>
      </div>
    </main>
    </>
  );
}
