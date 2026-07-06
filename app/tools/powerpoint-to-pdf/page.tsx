import type { Metadata } from "next";
import PowerpointToPdfTool from "@/components/tools/powerpoint-to-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "PowerPoint to PDF";
const toolUrl = "/tools/powerpoint-to-pdf";

const displayDescription = "Free convert slide presentation formats (.pptx) to standard PDF pages.";

export const metadata: Metadata = {
  title: "Free PowerPoint to PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free powerpoint to pdf","powerpoint to pdf online","free powerpoint to pdf online","powerpoint to pdf tool","client-side powerpoint to pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free PowerPoint to PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/powerpoint-to-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PowerPoint to PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free PowerPoint to PDF Online Utility?",
    answer: "A Free PowerPoint to PDF Online utility converts slide presentations into clean PDF layouts locally in browser memory.",
  },
  {
    question: "Is it safe to use this Free PowerPoint to PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function PowerpointToPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free PowerPoint to PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free PowerPoint to PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <PowerpointToPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free PowerPoint to PDF Online utility converts slide presentations into clean PDF layouts locally in browser memory."
            howToUse={[
              "Select a PowerPoint presentation (.pptx) file.",
              "Check slide dimensions, image resolutions, and order.",
              "Click 'Convert to PDF' to compile the slides and download the PDF document."
            ]}
            whyClientSide="Slide presentations contain proprietary designs and text. Converting client-side ensures complete privacy."
          />
        </article>
      </main>
    </>
  );
}
