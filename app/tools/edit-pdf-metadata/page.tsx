import type { Metadata } from "next";
import EditPdfMetadataTool from "@/components/tools/edit-pdf-metadata";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Edit Metadata";
const toolUrl = "/tools/edit-pdf-metadata";

const displayDescription = "Free edit PDF properties like author, title, keywords, and creation dates.";

export const metadata: Metadata = {
  title: "Free Edit Metadata Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free edit metadata","edit metadata online","free edit metadata online","edit metadata tool","client-side edit metadata","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Edit Metadata Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/edit-pdf-metadata",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Edit Metadata Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Edit Metadata Online Utility?",
    answer: "A Free Edit Metadata Online utility is a metadata editor that edits properties of a PDF document like author, title, and keywords locally.",
  },
  {
    question: "Is it safe to use this Free Edit Metadata Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function EditPdfMetadataToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Edit Metadata Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Edit Metadata Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <EditPdfMetadataTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Edit Metadata Online utility is a metadata editor that edits properties of a PDF document like author, title, and keywords locally."
            howToUse={[
              "Upload your PDF document to the editor.",
              "Modify the title, author name, keywords, and creation metadata.",
              "Click 'Save Metadata' to apply modifications and download the PDF."
            ]}
            whyClientSide="Updating document tags locally keeps internal properties secure and private."
          />
        </article>
      </main>
    </>
  );
}
