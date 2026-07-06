import type { Metadata } from "next";
import CropPdfTool from "@/components/tools/crop-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Crop PDF";
const toolUrl = "/tools/crop-pdf";

const displayDescription = "Free crop margins and adjust boundary coordinate boxes on PDF pages.";

export const metadata: Metadata = {
  title: "Free Crop PDF Online",
  description: displayDescription,
  keywords: ["free crop pdf","crop pdf online","free crop pdf online","crop pdf tool","client-side crop pdf","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Crop PDF Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/crop-pdf",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Crop PDF Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Crop PDF Online Utility?",
    answer: "A Free Crop PDF Online utility is a layout editor that modifies the visible margins of a PDF document by resetting its internal crop-box coordinates locally.",
  },
  {
    question: "Is it safe to use this Free Crop PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function CropPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Crop PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Crop PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <CropPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Crop PDF Online utility is a layout editor that modifies the visible margins of a PDF document by resetting its internal crop-box coordinates locally."
            howToUse={[
              "Load your PDF file into the local canvas workbench.",
              "Adjust the border crop dimensions by shifting the layout box boundaries.",
              "Click 'Crop PDF' to save your changes and download the cropped file."
            ]}
            whyClientSide="Cropping scanned passports or checks on remote web tools risks leakage. Browser canvas framing keeps your visual layers strictly local."
          />
        </article>
      </main>
    </>
  );
}
