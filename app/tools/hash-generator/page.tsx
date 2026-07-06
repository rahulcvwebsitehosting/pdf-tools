import type { Metadata } from "next";
import HashGeneratorTool from "@/components/tools/hash-generator";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Hash Generator";
const toolUrl = "/tools/hash-generator";

const displayDescription = "Free compute MD5, SHA-1, SHA-256, and SHA-512 hashes in your browser.";

export const metadata: Metadata = {
  title: "Free Hash Generator Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free hash generator","hash generator online","free hash generator online","hash generator tool","client-side hash generator","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Hash Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/hash-generator",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Hash Generator Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Hash Generator Online Utility?",
    answer: "A Free Hash Generator Online utility computes secure cryptographic hash signatures from text inputs locally.",
  },
  {
    question: "Is it safe to use this Free Hash Generator Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function HashGeneratorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Hash Generator Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Hash Generator Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <HashGeneratorTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Hash Generator Online utility computes secure cryptographic hash signatures from text inputs locally."
            howToUse={[
              "Type or paste your text input into the box.",
              "Select MD5, SHA-1, SHA-256, or SHA-512 hash formats.",
              "Review the hex hash code and click 'Copy' to save the output."
            ]}
            whyClientSide="Generating checksum hashes for passwords or keys locally ensures complete privacy."
          />
        </article>
      </main>
    </>
  );
}
