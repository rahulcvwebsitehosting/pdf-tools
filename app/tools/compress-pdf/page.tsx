import type { Metadata } from "next";
import CompressPdfTool from "@/components/tools/compress-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Compress PDF";
const toolUrl = "/tools/compress-pdf";

const displayDescription = "Free reduce the file size of PDF documents while maintaining visual resolution.";

export const metadata: Metadata = {
  title: "Free Compress PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free compress pdf","compress pdf online","free compress pdf online","compress pdf tool","client-side compress pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Compress PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/compress-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Compress PDF Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Compress PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <CompressPdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
