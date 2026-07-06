import type { Metadata } from "next";
import RegexTesterTool from "@/components/tools/regex-tester";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free RegEx Tester Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <RegexTesterTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free RegEx Tester Online utility tests JavaScript regular expressions and highlights matched segments in real-time."
            howToUse={[
              "Enter your regular expression pattern and select active flags.",
              "Type in your test string to see matches highlighted.",
              "Inspect captured groups and matches index details."
            ]}
            whyClientSide="Testing expressions on sensitive text data locally keeps documents secure."
          />
        </article>
      </main>
    </>
  );
}
