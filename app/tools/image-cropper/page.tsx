import type { Metadata } from "next";
import ImageCropperTool from "@/components/tools/image-cropper";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Image Cropper";
const toolUrl = "/tools/image-cropper";

const displayDescription = "Free crop local photos and adjust boundary coordinate grids.";

export const metadata: Metadata = {
  title: "Free Image Cropper Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free image cropper","image cropper online","free image cropper online","image cropper tool","client-side image cropper","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Image Cropper Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/image-cropper",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Cropper Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Image Cropper Online Utility?",
    answer: "A Free Image Cropper Online utility crops image coordinates locally in your browser memory.",
  },
  {
    question: "Is it safe to use this Free Image Cropper Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ImageCropperToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Image Cropper Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Image Cropper Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <ImageCropperTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Image Cropper Online utility crops image coordinates locally in your browser memory."
            howToUse={[
              "Upload a photo to crop.",
              "Input cropping dimensions (x, y, width, height) or drag the boundary crop box.",
              "Click 'Crop Image' and download the cropped file."
            ]}
            whyClientSide="Cropping sensitive photos locally prevents remote storage uploads."
          />
        </article>
      </main>
    </>
  );
}
