import type { Metadata } from "next";
import ImageCompressorTool from "@/components/tools/image-compressor";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Image Compressor";
const toolUrl = "/tools/image-compressor";

const displayDescription = "Free compress JPEG, PNG, and WebP files client-side inside canvas frames.";

export const metadata: Metadata = {
  title: "Free Image Compressor Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free image compressor","image compressor online","free image compressor online","image compressor tool","client-side image compressor","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Image Compressor Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/image-compressor",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Image Compressor Online Utility?",
    answer: "A Free Image Compressor Online utility compresses JPEG/PNG images locally using HTML5 canvas options.",
  },
  {
    question: "Is it safe to use this Free Image Compressor Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ImageCompressorToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Image Compressor Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Image Compressor
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <ImageCompressorTool />
        </div>
      </div>
    </main>
    </>
  );
}
