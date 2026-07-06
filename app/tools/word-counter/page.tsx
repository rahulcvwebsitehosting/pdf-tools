import type { Metadata } from "next";
import WordCounterTool from "@/components/tools/word-counter";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Word Counter";
const toolUrl = "/tools/word-counter";

const displayDescription = "Free analyze word counts, reading speeds, sentence stats, and density scores.";

export const metadata: Metadata = {
  title: "Free Word Counter Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free word counter","word counter online","free word counter online","word counter tool","client-side word counter","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Word Counter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/word-counter",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Word Counter Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Word Counter Online Utility?",
    answer: "A Free Word Counter Online utility analyzes text character counts, word density metrics, and reading times locally.",
  },
  {
    question: "Is it safe to use this Free Word Counter Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function WordCounterToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Word Counter Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Word Counter
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <WordCounterTool />
        </div>
      </div>
    </main>
    </>
  );
}
