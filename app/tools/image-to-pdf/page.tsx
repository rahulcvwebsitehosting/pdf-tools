import type { Metadata } from "next";
import ImageToPdfTool from "@/components/tools/image-to-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Image to PDF";
const toolUrl = "/tools/image-to-pdf";

const displayDescription = "Free compile PNG, JPG, and webp images into a clean PDF document.";

export const metadata: Metadata = {
  title: "Free Image to PDF Online",
  description: displayDescription,
  keywords: ["free image to pdf","image to pdf online","free image to pdf online","image to pdf tool","client-side image to pdf","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Image to PDF Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/image-to-pdf",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to PDF Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Image to PDF Online Utility?",
    answer: "A Free Image to PDF Online utility packages raster graphics and embeds them as clean, printable pages inside a single PDF file.",
  },
  {
    question: "Is it safe to use this Free Image to PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ImageToPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Image to PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Image to PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <ImageToPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Image to PDF Online utility packages raster graphics and embeds them as clean, printable pages inside a single PDF file."
            howToUse={[
              "Upload one or more images (PNG, JPG, WebP) to the compiler.",
              "Set margin size, page size (A4/Letter), and layout orientation.",
              "Click 'Compile PDF' to assemble the pages locally and download the document."
            ]}
            whyClientSide="Converting personal photos or scans locally ensures that no image files are ever uploaded to cloud services."
          />
        </article>
      </main>
    </>
  );
}
