import type { Metadata } from "next";
import ImageResizerTool from "@/components/tools/image-resizer";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Image Resizer";
const toolUrl = "/tools/image-resizer";

const displayDescription = "Free adjust image heights and widths using local canvas scaling parameters.";

export const metadata: Metadata = {
  title: "Free Image Resizer Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free image resizer","image resizer online","free image resizer online","image resizer tool","client-side image resizer","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Image Resizer Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/image-resizer",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Resizer Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Image Resizer Online Utility?",
    answer: "A Free Image Resizer Online utility changes image height and width coordinates locally.",
  },
  {
    question: "Is it safe to use this Free Image Resizer Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ImageResizerToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Image Resizer Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Image Resizer
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <ImageResizerTool />
        </div>
      </div>
    </main>
    </>
  );
}
