import type { Metadata } from "next";
import PngToJpgTool from "@/components/tools/png-to-jpg";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free PNG to JPG Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <PngToJpgTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free PNG to JPG Online utility converts PNG files to JPEG format locally."
            howToUse={[
              "Upload your PNG graphic file to the converter.",
              "Adjust background fill options (white fallback for transparent areas).",
              "Download the converted JPG image instantly."
            ]}
            whyClientSide="Converting images in browser memory keeps files secure and offline."
          />
        </article>
      </main>
    </>
  );
}
