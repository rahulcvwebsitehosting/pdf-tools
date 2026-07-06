import type { Metadata } from "next";
import LoremIpsumTool from "@/components/tools/lorem-ipsum";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Lorem Ipsum Generator";
const toolUrl = "/tools/lorem-ipsum";

const displayDescription = "Free generate mockup paragraphs, headings, and placeholder text loops.";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free lorem ipsum generator","lorem ipsum generator online","free lorem ipsum generator online","lorem ipsum generator tool","client-side lorem ipsum generator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Lorem Ipsum Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/lorem-ipsum",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Lorem Ipsum Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Lorem Ipsum Generator Online Utility?",
    answer: "A Free Lorem Ipsum Generator Online utility generates dummy placeholder text for layouts and graphics client-side.",
  },
  {
    question: "Is it safe to use this Free Lorem Ipsum Generator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function LoremIpsumToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Lorem Ipsum Generator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Lorem Ipsum Generator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <LoremIpsumTool />
        </div>
      </div>
    </main>
    </>
  );
}
