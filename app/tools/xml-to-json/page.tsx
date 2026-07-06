import type { Metadata } from "next";
import XmlToJsonTool from "@/components/tools/xml-to-json";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "XML to JSON";
const toolUrl = "/tools/xml-to-json";

const displayDescription = "Free convert XML data structures into clean JSON objects in memory.";

export const metadata: Metadata = {
  title: "Free XML to JSON Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free xml to json","xml to json online","free xml to json online","xml to json tool","client-side xml to json","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free XML to JSON Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/xml-to-json",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free XML to JSON Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free XML to JSON Online Utility?",
    answer: "A Free XML to JSON Online utility converts XML structures into clean JSON files locally.",
  },
  {
    question: "Is it safe to use this Free XML to JSON Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function XmlToJsonToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free XML to JSON Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            XML to JSON
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <XmlToJsonTool />
        </div>
      </div>
    </main>
    </>
  );
}
