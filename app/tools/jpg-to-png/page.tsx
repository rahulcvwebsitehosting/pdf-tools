import type { Metadata } from "next";
import JpgToPngTool from "@/components/tools/jpg-to-png";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "JPG to PNG";
const toolUrl = "/tools/jpg-to-png";

const displayDescription = "Free convert JPEG files to PNG transparent image structures.";

export const metadata: Metadata = {
  title: "Free JPG to PNG Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free jpg to png","jpg to png online","free jpg to png online","jpg to png tool","client-side jpg to png","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free JPG to PNG Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/jpg-to-png",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JPG to PNG Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free JPG to PNG Online Utility?",
    answer: "A Free JPG to PNG Online utility converts JPEG images to PNG format client-side.",
  },
  {
    question: "Is it safe to use this Free JPG to PNG Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function JpgToPngToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free JPG to PNG Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free JPG to PNG Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <JpgToPngTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free JPG to PNG Online utility converts JPEG images to PNG format client-side."
            howToUse={[
              "Select your JPG photo file.",
              "The canvas tool wraps the flat JPEG stream into a PNG structure.",
              "Download the transparent PNG graphic file instantly."
            ]}
            whyClientSide="Converting image formats locally ensures no media is saved by external entities."
          />
        </article>
      </main>
    </>
  );
}
