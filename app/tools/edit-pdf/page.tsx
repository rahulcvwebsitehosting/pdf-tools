import type { Metadata } from "next";
import EditPdfTool from "@/components/tools/edit-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Edit PDF";
const toolUrl = "/tools/edit-pdf";

const displayDescription = "Free add text, shapes, highlights, and sticky notes to your PDF documents directly in the browser.";

export const metadata: Metadata = {
  title: "Free Edit PDF Online",
  description: displayDescription,
  keywords: ["free edit pdf","edit pdf online","free edit pdf online","pdf editor","pdf annotator","pdf text tool","browser pdf editor","client-side pdf edit"],
  openGraph: {
    title: "Free Edit PDF Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/edit-pdf",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Edit PDF Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Edit PDF Online tool?",
    answer: "A Free Edit PDF Online tool lets you add text annotations, draw shapes, highlight passages, and attach sticky notes to your PDF documents without installing any software.",
  },
  {
    question: "Is it safe to edit my PDF files online?",
    answer: "Yes. All editing is done locally in your browser using client-side processing. Your PDF file never leaves your device.",
  },
];

export default function EditPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Edit PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Edit PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <EditPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Edit PDF Online tool provides a browser-based annotation workspace where you can overlay text labels, colored shapes, transparent highlights, and sticky-note markers onto any PDF page without uploading files to a remote server."
            howToUse={[
              "Upload your PDF file using the drag-and-drop area or file picker.",
              "Use the toolbar to switch between Select, Text, Shape, Highlight, and Sticky Note tools.",
              "Click on the page to place annotations, then download your edited PDF with all changes embedded."
            ]}
            whyClientSide="Annotating confidential contracts, academic papers, or internal reports on third-party servers creates unnecessary data exposure. Client-side processing keeps every edit on your machine."
          />
        </article>
      </main>
    </>
  );
}
