import type { Metadata } from "next";
import PngToJpgTool from "@/components/tools/png-to-jpg";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "PNG to JPG";
const toolUrl = "/tools/png-to-jpg";

const displayDescription = "Free convert PNG images to JPEG format with custom quality sliders.";

export const metadata: Metadata = {
  title: "Free PNG to JPG Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free png to jpg","png to jpg online","free png to jpg online","png to jpg tool","client-side png to jpg","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free PNG to JPG Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/png-to-jpg",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PNG to JPG Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free PNG to JPG Online Utility?",
    answer: "A Free PNG to JPG Online utility converts PNG files to JPEG format locally.",
  },
  {
    question: "Is it safe to use this Free PNG to JPG Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function PngToJpgToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free PNG to JPG Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            PNG to JPG
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <PngToJpgTool />
        </div>
      </div>
    </main>
    </>
  );
}
