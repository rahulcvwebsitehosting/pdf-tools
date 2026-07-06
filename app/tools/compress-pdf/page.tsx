import type { Metadata } from "next";
import CompressPdfTool from "@/components/tools/compress-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Compress PDF";
const toolUrl = "/tools/compress-pdf";

const displayDescription = "Free reduce the file size of PDF documents while maintaining visual resolution.";

export const metadata: Metadata = {
  title: "Free Compress PDF Online",
  description: displayDescription,
  keywords: ["free compress pdf","compress pdf online","free compress pdf online","compress pdf tool","client-side compress pdf","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Compress PDF Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/compress-pdf",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Compress PDF Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Compress PDF Online Utility?",
    answer: "A Free Compress PDF Online utility compiles PDF content streams, downsizes image resources, and reorganizes structural components to minimize file bytes without losing visible quality.",
  },
  {
    question: "Is it safe to use this Free Compress PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function CompressPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Compress PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Compress PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <CompressPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Compress PDF Online utility compiles PDF content streams, downsizes image resources, and reorganizes structural components to minimize file bytes without losing visible quality."
            howToUse={[
              "Drop your PDF file into the local compression window.",
              "Select your target compression strength (low, medium, or high quality).",
              "Click 'Compress PDF' to process in-browser and save the optimized file."
            ]}
            whyClientSide="Standard online PDF shrinkers transfer your large slides to external systems. Local processing handles PDF buffer chunks directly in your browser tab."
          />
        </article>
      </main>
    </>
  );
}
