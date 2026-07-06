import type { Metadata } from "next";
import EpochConverterTool from "@/components/tools/epoch-converter";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Epoch Converter";
const toolUrl = "/tools/epoch-converter";

const displayDescription = "Free convert Unix timestamps to local and UTC date formatting.";

export const metadata: Metadata = {
  title: "Free Epoch Converter Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free epoch converter","epoch converter online","free epoch converter online","epoch converter tool","client-side epoch converter","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Epoch Converter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/epoch-converter",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Epoch Converter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Epoch Converter Online Utility?",
    answer: "A Free Epoch Converter Online utility converts raw Unix timestamps to local and UTC date formats locally.",
  },
  {
    question: "Is it safe to use this Free Epoch Converter Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function EpochConverterToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Epoch Converter Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Epoch Converter
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <EpochConverterTool />
        </div>
      </div>
    </main>
    </>
  );
}
