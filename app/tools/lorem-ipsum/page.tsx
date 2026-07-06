import type { Metadata } from "next";
import LoremIpsumTool from "@/components/tools/lorem-ipsum";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Lorem Ipsum Generator";
const toolUrl = "/tools/lorem-ipsum";

const displayDescription = "Free generate mockup paragraphs, headings, and placeholder text loops.";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator Online",
  description: displayDescription,
  keywords: ["free lorem ipsum generator","lorem ipsum generator online","free lorem ipsum generator online","lorem ipsum generator tool","client-side lorem ipsum generator","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Lorem Ipsum Generator Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/lorem-ipsum",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Lorem Ipsum Generator Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Lorem Ipsum Generator Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <LoremIpsumTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Lorem Ipsum Generator Online utility generates dummy placeholder text for layouts and graphics client-side."
            howToUse={[
              "Select the quantity of paragraphs, sentences, or words.",
              "Toggle options to start with the standard 'Lorem ipsum' marker.",
              "Copy the generated placeholder text block."
            ]}
            whyClientSide="Generating mock elements client-side prevents data collection."
          />
        </article>
      </main>
    </>
  );
}
