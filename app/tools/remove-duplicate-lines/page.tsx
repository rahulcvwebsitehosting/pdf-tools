import type { Metadata } from "next";
import RemoveDuplicateLinesTool from "@/components/tools/remove-duplicate-lines";
import { SchemaMarkup } from "@/components/schema-markup";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Remove Duplicate Lines
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <RemoveDuplicateLinesTool />
        </div>
      </div>
    </main>
    </>
  );
}
