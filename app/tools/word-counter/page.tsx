import type { Metadata } from "next";
import WordCounterTool from "@/components/tools/word-counter";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Word Counter Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <WordCounterTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Word Counter Online utility analyzes text character counts, word density metrics, and reading times locally."
            howToUse={[
              "Enter your text block into the editor box.",
              "View real-time statistics like word density and reading time.",
              "Copy your counts or clear the input to start over."
            ]}
            whyClientSide="Analyzing drafts locally secures your copywriting assets."
          />
        </article>
      </main>
    </>
  );
}
