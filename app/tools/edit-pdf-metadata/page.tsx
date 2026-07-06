import type { Metadata } from "next";
import EditPdfMetadataTool from "@/components/tools/edit-pdf-metadata";
import { SchemaMarkup } from "@/components/schema-markup";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Edit Metadata
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <EditPdfMetadataTool />
        </div>
      </div>
    </main>
    </>
  );
}
