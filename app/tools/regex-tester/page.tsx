import type { Metadata } from "next";
import RegexTesterTool from "@/components/tools/regex-tester";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "RegEx Tester";
const toolUrl = "/tools/regex-tester";

const displayDescription = "Free test regular expressions with syntax highlights and match breakdowns.";

export const metadata: Metadata = {
  title: "Free RegEx Tester Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free regex tester","regex tester online","free regex tester online","regex tester tool","client-side regex tester","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free RegEx Tester Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/regex-tester",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free RegEx Tester Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free RegEx Tester Online Utility?",
    answer: "A Free RegEx Tester Online utility tests JavaScript regular expressions and highlights matched segments in real-time.",
  },
  {
    question: "Is it safe to use this Free RegEx Tester Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function RegexTesterToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free RegEx Tester Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            RegEx Tester
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <RegexTesterTool />
        </div>
      </div>
    </main>
    </>
  );
}
