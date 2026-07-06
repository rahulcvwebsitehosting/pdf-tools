import type { Metadata } from "next";
import Base64ToImageTool from "@/components/tools/base64-to-image";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Base64 to Image";
const toolUrl = "/tools/base64-to-image";

const displayDescription = "Free render Base64 strings into visual images and download them.";

export const metadata: Metadata = {
  title: "Free Base64 to Image Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free base64 to image","base64 to image online","free base64 to image online","base64 to image tool","client-side base64 to image","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Base64 to Image Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/base64-to-image",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Base64 to Image Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Base64 to Image Online Utility?",
    answer: "A Free Base64 to Image Online utility decodes Base64 data strings into visual images locally.",
  },
  {
    question: "Is it safe to use this Free Base64 to Image Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function Base64ToImageToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Base64 to Image Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Base64 to Image Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <Base64ToImageTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Base64 to Image Online utility decodes Base64 data strings into visual images locally."
            howToUse={[
              "Paste your Base64 image data string into the input panel.",
              "Inspect the rendered graphic preview box.",
              "Download the graphic as a standard raster file."
            ]}
            whyClientSide="Decoding DataURI paths locally prevents key leaks and private assets exposure."
          />
        </article>
      </main>
    </>
  );
}
