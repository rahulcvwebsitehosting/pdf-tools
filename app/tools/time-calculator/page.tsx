import type { Metadata } from "next";
import TimeCalculatorTool from "@/components/tools/time-calculator";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Add/Subtract Time";
const toolUrl = "/tools/time-calculator";

const displayDescription = "Free add or subtract duration offsets from a starting date.";

export const metadata: Metadata = {
  title: "Free Add/Subtract Time Online",
  description: displayDescription,
  keywords: ["free add/subtract time","add/subtract time online","free add/subtract time online","add/subtract time tool","client-side add/subtract time","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Add/Subtract Time Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/time-calculator",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Add/Subtract Time Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Add/Subtract Time Online Utility?",
    answer: "A Free Add/Subtract Time Online utility performs date arithmetic offsets client-side.",
  },
  {
    question: "Is it safe to use this Free Add/Subtract Time Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function TimeCalculatorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Add/Subtract Time Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Add/Subtract Time Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <TimeCalculatorTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Add/Subtract Time Online utility performs date arithmetic offsets client-side."
            howToUse={[
              "Select starting date and time values.",
              "Input duration additions or subtractions (days, hours, minutes).",
              "Review the calculated resulting date-time instantly."
            ]}
            whyClientSide="Calculating date arithmetic locally keeps coordinates private and secure."
          />
        </article>
      </main>
    </>
  );
}
