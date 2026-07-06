import type { Metadata } from "next";
import ColorPickerTool from "@/components/tools/color-picker";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Color Picker";
const toolUrl = "/tools/color-picker";

const displayDescription = "Free extract color hex, rgb, and hsl codes from loaded image pixels.";

export const metadata: Metadata = {
  title: "Free Color Picker Online",
  description: displayDescription,
  keywords: ["free color picker","color picker online","free color picker online","color picker tool","client-side color picker","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Color Picker Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/color-picker",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Color Picker Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Color Picker Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <ColorPickerTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Color Picker Online utility extracts color hex, rgb, and hsl values from uploaded image coordinates."
            howToUse={[
              "Load an image or click in the eye-dropper area.",
              "Move your cursor over the image to inspect coordinates pixel details.",
              "Click to select a pixel and copy its hex code instantly."
            ]}
            whyClientSide="Extracting design colors locally avoids tracking and data capture."
          />
        </article>
      </main>
    </>
  );
}
