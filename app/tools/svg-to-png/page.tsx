import type { Metadata } from "next";
import SvgToPngTool from "@/components/tools/svg-to-png";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "SVG to PNG";
const toolUrl = "/tools/svg-to-png";

const displayDescription = "Free rasterize vector SVG files into standard transparent PNG formats.";

export const metadata: Metadata = {
  title: "Free SVG to PNG Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free svg to png","svg to png online","free svg to png online","svg to png tool","client-side svg to png","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free SVG to PNG Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/svg-to-png",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SVG to PNG Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free SVG to PNG Online Utility?",
    answer: "A Free SVG to PNG Online utility converts SVG vectors into standard PNG format locally.",
  },
  {
    question: "Is it safe to use this Free SVG to PNG Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function SvgToPngToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free SVG to PNG Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            SVG to PNG
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <SvgToPngTool />
        </div>
      </div>
    </main>
    </>
  );
}
