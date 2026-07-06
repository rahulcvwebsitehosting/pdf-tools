import type { Metadata } from "next";
import ImageResizerTool from "@/components/tools/image-resizer";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Image Resizer";
const toolUrl = "/tools/image-resizer";

const displayDescription = "Free adjust image heights and widths using local canvas scaling parameters.";

export const metadata: Metadata = {
  title: "Free Image Resizer Online",
  description: displayDescription,
  keywords: ["free image resizer","image resizer online","free image resizer online","image resizer tool","client-side image resizer","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Image Resizer Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/image-resizer",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Resizer Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Image Resizer Online Utility?",
    answer: "A Free Image Resizer Online utility changes image height and width coordinates locally.",
  },
  {
    question: "Is it safe to use this Free Image Resizer Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ImageResizerToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Image Resizer Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Image Resizer Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <ImageResizerTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Image Resizer Online utility changes image height and width coordinates locally."
            howToUse={[
              "Choose an image from your device to resize.",
              "Input custom width and height pixel coordinates.",
              "Download the resized image output instantly."
            ]}
            whyClientSide="Resizing images locally keeps drafts and graphics private."
          />
        </article>
      </main>
    </>
  );
}
