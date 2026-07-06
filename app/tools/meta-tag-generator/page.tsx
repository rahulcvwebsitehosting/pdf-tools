import type { Metadata } from "next";
import MetaTagGeneratorTool from "@/components/tools/meta-tag-generator";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Meta Tag Generator";
const toolUrl = "/tools/meta-tag-generator";

const displayDescription = "Free generate SEO-optimized HTML header meta tag blocks.";

export const metadata: Metadata = {
  title: "Free Meta Tag Generator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free meta tag generator","meta tag generator online","free meta tag generator online","meta tag generator tool","client-side meta tag generator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Meta Tag Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/meta-tag-generator",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Meta Tag Generator Online Utility?",
    answer: "A Free Meta Tag Generator Online utility generates SEO-optimized HTML header meta tag elements locally.",
  },
  {
    question: "Is it safe to use this Free Meta Tag Generator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function MetaTagGeneratorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Meta Tag Generator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Meta Tag Generator Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <MetaTagGeneratorTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Meta Tag Generator Online utility generates SEO-optimized HTML header meta tag elements locally."
            howToUse={[
              "Input website details (Title, description, og keywords).",
              "Review the dynamic preview of the header metadata tags.",
              "Copy the HTML meta tag output block to place in your header."
            ]}
            whyClientSide="Assembling meta tags locally avoids server templates exposure."
          />
        </article>
      </main>
    </>
  );
}
