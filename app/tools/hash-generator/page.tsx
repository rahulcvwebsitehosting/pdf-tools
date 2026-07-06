import type { Metadata } from "next";
import HashGeneratorTool from "@/components/tools/hash-generator";
import { SchemaMarkup } from "@/components/schema-markup";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Hash Generator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <HashGeneratorTool />
        </div>
      </div>
    </main>
    </>
  );
}
