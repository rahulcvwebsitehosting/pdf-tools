import type { Metadata } from "next";
import TimeZoneConverterTool from "@/components/tools/time-zone-converter";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Time Zone Converter";
const toolUrl = "/tools/time-zone-converter";

const displayDescription = "Free convert date times across multiple regional global zones.";

export const metadata: Metadata = {
  title: "Free Time Zone Converter Online",
  description: displayDescription,
  keywords: ["free time zone converter","time zone converter online","free time zone converter online","time zone converter tool","client-side time zone converter","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Time Zone Converter Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/time-zone-converter",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Time Zone Converter Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Time Zone Converter Online Utility?",
    answer: "A Free Time Zone Converter Online utility converts date-time parameters across global timezones locally.",
  },
  {
    question: "Is it safe to use this Free Time Zone Converter Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function TimeZoneConverterToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Time Zone Converter Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Time Zone Converter Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <TimeZoneConverterTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Time Zone Converter Online utility converts date-time parameters across global timezones locally."
            howToUse={[
              "Define date and time coordinates to transform.",
              "Select source and target timezone parameters.",
              "Review converted schedule coordinates instantly."
            ]}
            whyClientSide="Calculating date conversions locally ensures secure calendar planning."
          />
        </article>
      </main>
    </>
  );
}
