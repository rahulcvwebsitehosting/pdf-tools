import type { Metadata } from "next";
import EpochConverterTool from "@/components/tools/epoch-converter";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Epoch Converter Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <EpochConverterTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Epoch Converter Online utility converts raw Unix timestamps to local and UTC date formats locally."
            howToUse={[
              "Input a Unix epoch timestamp (seconds or milliseconds).",
              "Toggle locale offsets to see dates in multiple target formats.",
              "Convert Date structures back to raw Unix timestamps."
            ]}
            whyClientSide="Converting dates and database timestamps locally keeps records secure."
          />
        </article>
      </main>
    </>
  );
}
