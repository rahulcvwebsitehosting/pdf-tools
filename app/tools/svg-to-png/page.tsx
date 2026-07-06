import type { Metadata } from "next";
import SvgToPngTool from "@/components/tools/svg-to-png";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "SVG to PNG";
const toolUrl = "/tools/svg-to-png";

const displayDescription = "Free rasterize vector SVG files into standard transparent PNG formats.";

export const metadata: Metadata = {
  title: "Free SVG to PNG Online",
  description: displayDescription,
  keywords: ["free svg to png","svg to png online","free svg to png online","svg to png tool","client-side svg to png","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free SVG to PNG Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/svg-to-png",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SVG to PNG Online",
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free SVG to PNG Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <SvgToPngTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free SVG to PNG Online utility converts SVG vectors into standard PNG format locally."
            howToUse={[
              "Paste SVG markup or select an SVG file.",
              "Render vector files to browser canvas elements.",
              "Download the rasterized PNG graphic file instantly."
            ]}
            whyClientSide="Rasterizing vector graphics locally keeps source layouts confidential."
          />
        </article>
      </main>
    </>
  );
}
