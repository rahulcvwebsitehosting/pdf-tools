import type { Metadata } from "next";
import TimeZoneConverterTool from "@/components/tools/time-zone-converter";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Time Zone Converter";
const toolUrl = "/tools/time-zone-converter";

const displayDescription = "Free convert date times across multiple regional global zones.";

export const metadata: Metadata = {
  title: "Free Time Zone Converter Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free time zone converter","time zone converter online","free time zone converter online","time zone converter tool","client-side time zone converter","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Time Zone Converter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/time-zone-converter",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Time Zone Converter Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Time Zone Converter
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <TimeZoneConverterTool />
        </div>
      </div>
    </main>
    </>
  );
}
