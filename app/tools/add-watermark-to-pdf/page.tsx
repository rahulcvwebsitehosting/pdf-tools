import type { Metadata } from "next";
import AddWatermarkTool from "@/components/tools/add-watermark";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Add Watermark";
const toolUrl = "/tools/add-watermark-to-pdf";

const displayDescription = "Free add text stamp watermarks over your PDF sheets for copyright protection.";

export const metadata: Metadata = {
  title: "Free Add Watermark Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free add watermark","add watermark online","free add watermark online","add watermark tool","client-side add watermark","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Add Watermark Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/add-watermark-to-pdf",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Add Watermark Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Add Watermark Online Utility?",
    answer: "A Free Add Watermark Online utility overlays copyright notices, logos, or stamp markers over existing PDF page layers to secure distribution permissions.",
  },
  {
    question: "Is it safe to use this Free Add Watermark Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function AddWatermarkToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Add Watermark Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Add Watermark
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <AddWatermarkTool />
        </div>
      </div>
    </main>
    </>
  );
}
