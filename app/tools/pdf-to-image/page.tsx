import type { Metadata } from "next";
import PdfToImageTool from "@/components/tools/pdf-to-image";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "PDF to Image";
const toolUrl = "/tools/pdf-to-image";

const displayDescription = "Free convert PDF sheets to PNG/JPG image files client-side.";

export const metadata: Metadata = {
  title: "Free PDF to Image Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free pdf to image","pdf to image online","free pdf to image online","pdf to image tool","client-side pdf to image","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free PDF to Image Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/pdf-to-image",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF to Image Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free PDF to Image Online Utility?",
    answer: "A Free PDF to Image Online utility parses PDF document vectors and rasterizes each page into image file nodes locally.",
  },
  {
    question: "Is it safe to use this Free PDF to Image Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function PdfToImageToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free PDF to Image Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free PDF to Image Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <PdfToImageTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free PDF to Image Online utility parses PDF document vectors and rasterizes each page into image file nodes locally."
            howToUse={[
              "Drop the PDF file into the rendering box.",
              "Choose PNG or JPG format and define the target rendering resolution.",
              "Click 'Convert to Image' to render the pages to canvas elements and download."
            ]}
            whyClientSide="Rasterizing pages on remote APIs exposes contract layouts. local canvas rendering processes pixels inside browser memory."
          />
        </article>
      </main>
    </>
  );
}
