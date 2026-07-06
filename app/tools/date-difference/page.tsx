import type { Metadata } from "next";
import DateDifferenceTool from "@/components/tools/date-difference";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Date Difference Calculator";
const toolUrl = "/tools/date-difference";

const displayDescription = "Free compute the number of years, months, and days between target dates.";

export const metadata: Metadata = {
  title: "Free Date Difference Calculator Online",
  description: displayDescription,
  keywords: ["free date difference calculator","date difference calculator online","free date difference calculator online","date difference calculator tool","client-side date difference calculator","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Date Difference Calculator Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/date-difference",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Date Difference Calculator Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Date Difference Calculator Online Utility?",
    answer: "A Free Date Difference Calculator Online utility computes calendar offsets and spans between dates locally.",
  },
  {
    question: "Is it safe to use this Free Date Difference Calculator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function DateDifferenceToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Date Difference Calculator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Date Difference Calculator Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <DateDifferenceTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Date Difference Calculator Online utility computes calendar offsets and spans between dates locally."
            howToUse={[
              "Enter target start date coordinates.",
              "Enter target end date coordinates.",
              "Review years, months, and days differences instantly."
            ]}
            whyClientSide="Calculating date intervals locally guarantees total data privacy."
          />
        </article>
      </main>
    </>
  );
}
