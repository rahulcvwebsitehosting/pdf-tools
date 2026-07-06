import type { Metadata } from "next";
import XmlToJsonTool from "@/components/tools/xml-to-json";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "XML to JSON";
const toolUrl = "/tools/xml-to-json";

const displayDescription = "Free convert XML data structures into clean JSON objects in memory.";

export const metadata: Metadata = {
  title: "Free XML to JSON Online",
  description: displayDescription,
  keywords: ["free xml to json","xml to json online","free xml to json online","xml to json tool","client-side xml to json","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free XML to JSON Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/xml-to-json",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free XML to JSON Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free XML to JSON Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <XmlToJsonTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free XML to JSON Online utility converts XML structures into clean JSON files locally."
            howToUse={[
              "Paste your XML data string into the input panel.",
              "The tool parses the XML nodes using browser DOMParser and converts them to JSON.",
              "Download or copy the formatted JSON representation."
            ]}
            whyClientSide="Processing structured XML feeds locally protects proprietary data layouts."
          />
        </article>
      </main>
    </>
  );
}
