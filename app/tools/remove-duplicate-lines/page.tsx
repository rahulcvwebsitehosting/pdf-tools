import type { Metadata } from "next";
import RemoveDuplicateLinesTool from "@/components/tools/remove-duplicate-lines";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Remove Duplicate Lines";
const toolUrl = "/tools/remove-duplicate-lines";

const displayDescription = "Free filter duplicate lines out of list arrays in browser memory frames.";

export const metadata: Metadata = {
  title: "Free Remove Duplicate Lines Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free remove duplicate lines","remove duplicate lines online","free remove duplicate lines online","remove duplicate lines tool","client-side remove duplicate lines","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Remove Duplicate Lines Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/remove-duplicate-lines",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Remove Duplicate Lines Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Remove Duplicate Lines Online Utility?",
    answer: "A Free Remove Duplicate Lines Online utility filters duplicate entries from lists in your browser memory.",
  },
  {
    question: "Is it safe to use this Free Remove Duplicate Lines Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function RemoveDuplicateLinesToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Remove Duplicate Lines Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Remove Duplicate Lines Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <RemoveDuplicateLinesTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Remove Duplicate Lines Online utility filters duplicate entries from lists in your browser memory."
            howToUse={[
              "Paste your line items list into the textarea.",
              "Select case-sensitivity preferences.",
              "Copy the deduplicated line list output instantly."
            ]}
            whyClientSide="Deduplicating emails or keys locally prevents records exposure."
          />
        </article>
      </main>
    </>
  );
}
