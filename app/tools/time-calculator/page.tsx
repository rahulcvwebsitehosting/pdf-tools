import type { Metadata } from "next";
import TimeCalculatorTool from "@/components/tools/time-calculator";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Add/Subtract Time";
const toolUrl = "/tools/time-calculator";

const displayDescription = "Free add or subtract duration offsets from a starting date.";

export const metadata: Metadata = {
  title: "Free Add/Subtract Time Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free add/subtract time","add/subtract time online","free add/subtract time online","add/subtract time tool","client-side add/subtract time","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Add/Subtract Time Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/time-calculator",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Add/Subtract Time Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Add/Subtract Time
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <TimeCalculatorTool />
        </div>
      </div>
    </main>
    </>
  );
}
