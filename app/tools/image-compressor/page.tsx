import type { Metadata } from "next";
import ImageCompressorTool from "@/components/tools/image-compressor";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Image Compressor";
const toolUrl = "/tools/image-compressor";

const displayDescription = "Free compress JPEG, PNG, and WebP files client-side inside canvas frames.";

export const metadata: Metadata = {
  title: "Free Image Compressor Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free image compressor","image compressor online","free image compressor online","image compressor tool","client-side image compressor","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Image Compressor Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/image-compressor",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Image Compressor Online Utility?",
    answer: "A Free Image Compressor Online utility compresses JPEG/PNG images locally using HTML5 canvas options.",
  },
  {
    question: "Is it safe to use this Free Image Compressor Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ImageCompressorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Image Compressor Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Image Compressor Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <ImageCompressorTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Image Compressor Online utility compresses JPEG/PNG images locally using HTML5 canvas options."
            howToUse={[
              "Upload an image file (JPEG, PNG, WebP) to the compressor.",
              "Adjust the quality slider to define target compression parameters.",
              "Preview compressed dimensions and download the optimized image."
            ]}
            whyClientSide="Optimizing photos locally secures image assets and saves bandwidth."
          />
        </article>
      </main>
    </>
  );
}
