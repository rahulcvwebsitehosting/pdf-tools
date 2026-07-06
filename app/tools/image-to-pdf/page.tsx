import type { Metadata } from "next";
import ImageToPdfTool from "@/components/tools/image-to-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Image to PDF";
const toolUrl = "/tools/image-to-pdf";

const displayDescription = "Free compile PNG, JPG, and webp images into a clean PDF document.";

export const metadata: Metadata = {
  title: "Free Image to PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free image to pdf","image to pdf online","free image to pdf online","image to pdf tool","client-side image to pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Image to PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/image-to-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to PDF Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Image to PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <ImageToPdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
