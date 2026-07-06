import type { Metadata } from "next";
import UuidGeneratorTool from "@/components/tools/uuid-generator";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "UUID Generator";
const toolUrl = "/tools/uuid-generator";

const displayDescription = "Free bulk generate cryptographically secure UUID v4 tokens locally.";

export const metadata: Metadata = {
  title: "Free UUID Generator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free uuid generator","uuid generator online","free uuid generator online","uuid generator tool","client-side uuid generator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free UUID Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/uuid-generator",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UUID Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free UUID Generator Online Utility?",
    answer: "A Free UUID Generator Online utility generates unique random UUID v4 identifier tokens locally.",
  },
  {
    question: "Is it safe to use this Free UUID Generator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function UuidGeneratorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free UUID Generator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            UUID Generator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <UuidGeneratorTool />
        </div>
      </div>
    </main>
    </>
  );
}
