import type { Metadata } from "next";
import CropPdfTool from "@/components/tools/crop-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Crop PDF";
const toolUrl = "/tools/crop-pdf";

const displayDescription = "Free crop margins and adjust boundary coordinate boxes on PDF pages.";

export const metadata: Metadata = {
  title: "Free Crop PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free crop pdf","crop pdf online","free crop pdf online","crop pdf tool","client-side crop pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Crop PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/crop-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Crop PDF Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Crop PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <CropPdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
