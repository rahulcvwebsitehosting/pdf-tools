import type { Metadata } from "next";
import ColorPickerTool from "@/components/tools/color-picker";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "Color Picker";
const toolUrl = "/tools/color-picker";

const displayDescription = "Free extract color hex, rgb, and hsl codes from loaded image pixels.";

export const metadata: Metadata = {
  title: "Free Color Picker Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free color picker","color picker online","free color picker online","color picker tool","client-side color picker","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Color Picker Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/color-picker",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Color Picker Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Color Picker Online Utility?",
    answer: "A Free Color Picker Online utility extracts color hex, rgb, and hsl values from uploaded image coordinates.",
  },
  {
    question: "Is it safe to use this Free Color Picker Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ColorPickerToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Color Picker Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Color Picker
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <ColorPickerTool />
        </div>
      </div>
    </main>
    </>
  );
}
