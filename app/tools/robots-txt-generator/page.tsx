import type { Metadata } from "next";
import RobotsTxtGeneratorTool from "@/components/tools/robots-txt-generator";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Robots.txt Generator";
const toolUrl = "/tools/robots-txt-generator";

const displayDescription = "Free create search engine crawler instruction sitemaps.";

export const metadata: Metadata = {
  title: "Free Robots.txt Generator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free robots.txt generator","robots.txt generator online","free robots.txt generator online","robots.txt generator tool","client-side robots.txt generator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Robots.txt Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/robots-txt-generator",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Robots.txt Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Robots.txt Generator Online Utility?",
    answer: "A Free Robots.txt Generator Online utility generates Robots.txt indexing rules locally.",
  },
  {
    question: "Is it safe to use this Free Robots.txt Generator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function RobotsTxtGeneratorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Robots.txt Generator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Robots.txt Generator Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <RobotsTxtGeneratorTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Robots.txt Generator Online utility generates Robots.txt indexing rules locally."
            howToUse={[
              "Define crawler access rules (allow/disallow specific engines).",
              "Enter sitemap links and configure block directories.",
              "Generate and save the Robots.txt rules document."
            ]}
            whyClientSide="Creating index instructions locally keeps site mapping private."
          />
        </article>
      </main>
    </>
  );
}
