import type { Metadata } from "next";
import AddWatermarkTool from "@/components/tools/add-watermark";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Add Watermark";
const toolUrl = "/tools/add-watermark-to-pdf";

const displayDescription = "Free add text stamp watermarks over your PDF sheets for copyright protection.";

export const metadata: Metadata = {
  title: "Free Add Watermark Online",
  description: displayDescription,
  keywords: ["free add watermark","add watermark online","free add watermark online","add watermark tool","client-side add watermark","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Add Watermark Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/add-watermark-to-pdf",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Add Watermark Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Add Watermark Online Utility?",
    answer: "A Free Add Watermark Online utility overlays copyright notices, logos, or stamp markers over existing PDF page layers to secure distribution permissions.",
  },
  {
    question: "Is it safe to use this Free Add Watermark Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function AddWatermarkToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Add Watermark Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Add Watermark Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <AddWatermarkTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Add Watermark Online utility overlays copyright notices, logos, or stamp markers over existing PDF page layers to secure distribution permissions."
            howToUse={[
              "Upload your target PDF document to the watermark editor.",
              "Type in your custom watermark text, rotation angle, and opacity slider.",
              "Click 'Add Watermark' to stamp the layers locally and download your file."
            ]}
            whyClientSide="Watermarking draft agreements or invoices on cloud services exposes sensitive details. Local rendering protects your business content."
          />
        </article>
      </main>
    </>
  );
}
