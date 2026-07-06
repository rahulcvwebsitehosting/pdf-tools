import type { Metadata } from "next";
import DateDifferenceTool from "@/components/tools/date-difference";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Date Difference Calculator";
const toolUrl = "/tools/date-difference";

const displayDescription = "Free compute the number of years, months, and days between target dates.";

export const metadata: Metadata = {
  title: "Free Date Difference Calculator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free date difference calculator","date difference calculator online","free date difference calculator online","date difference calculator tool","client-side date difference calculator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Date Difference Calculator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/date-difference",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Date Difference Calculator Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Date Difference Calculator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <DateDifferenceTool />
        </div>
      </div>
    </main>
    </>
  );
}
