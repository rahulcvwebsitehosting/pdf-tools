import type { Metadata } from "next";
import UuidGeneratorTool from "@/components/tools/uuid-generator";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "UUID Generator";
const toolUrl = "/tools/uuid-generator";

const displayDescription = "Free bulk generate cryptographically secure UUID v4 tokens locally.";

export const metadata: Metadata = {
  title: "Free UUID Generator Online",
  description: displayDescription,
  keywords: ["free uuid generator","uuid generator online","free uuid generator online","uuid generator tool","client-side uuid generator","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free UUID Generator Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/uuid-generator",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UUID Generator Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free UUID Generator Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <UuidGeneratorTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free UUID Generator Online utility generates unique random UUID v4 identifier tokens locally."
            howToUse={[
              "Specify the quantity of UUID tokens you need to generate.",
              "Toggle uppercase/lowercase formatting options.",
              "Generate and copy the list of secure UUIDs instantly."
            ]}
            whyClientSide="Generating security identifiers locally avoids tracking and keeps tokens private."
          />
        </article>
      </main>
    </>
  );
}
