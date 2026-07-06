import type { Metadata } from "next";
import HtmlEntitiesTool from "@/components/tools/html-entities";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free HTML Entity Encoder Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <HtmlEntitiesTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free HTML Entity Encoder Online utility converts special characters into safe HTML entity escape strings."
            howToUse={[
              "Type or paste your text markup in the input area.",
              "Toggle between Encode or Decode options to escape characters.",
              "Copy the entity-escaped output text instantly."
            ]}
            whyClientSide="Converting code markup locally ensures no scripts or keys leave your device."
          />
        </article>
      </main>
    </>
  );
}
