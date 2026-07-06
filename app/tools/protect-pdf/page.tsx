import type { Metadata } from "next";
import ProtectPdfTool from "@/components/tools/protect-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Protect PDF";
const toolUrl = "/tools/protect-pdf";

const displayDescription = "Free encrypt and password-protect your PDF files 100% client-side.";

export const metadata: Metadata = {
  title: "Free Protect PDF Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free protect pdf","protect pdf online","free protect pdf online","protect pdf tool","client-side protect pdf","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Protect PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/protect-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Protect PDF Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Protect PDF Online Utility?",
    answer: "A Free Protect PDF Online utility is a security tool that allows you to encrypt and add password access restrictions to any PDF file. It uses native browser memory streams to secure your files locally.",
  },
  {
    question: "Is it safe to use this Free Protect PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ProtectPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Protect PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Protect PDF
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <ProtectPdfTool />
        </div>
      </div>
    </main>
    </>
  );
}
