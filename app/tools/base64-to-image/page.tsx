import type { Metadata } from "next";
import Base64ToImageTool from "@/components/tools/base64-to-image";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Base64 to Image";
const toolUrl = "/tools/base64-to-image";

const displayDescription = "Free render Base64 strings into visual images and download them.";

export const metadata: Metadata = {
  title: "Free Base64 to Image Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free base64 to image","base64 to image online","free base64 to image online","base64 to image tool","client-side base64 to image","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Base64 to Image Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/base64-to-image",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Base64 to Image Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Base64 to Image Online Utility?",
    answer: "A Free Base64 to Image Online utility decodes Base64 data strings into visual images locally.",
  },
  {
    question: "Is it safe to use this Free Base64 to Image Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function Base64ToImageToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Base64 to Image Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Base64 to Image
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <Base64ToImageTool />
        </div>
      </div>
    </main>
    </>
  );
}
