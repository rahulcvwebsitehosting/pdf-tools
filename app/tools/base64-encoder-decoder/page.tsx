import type { Metadata } from "next";
import { Base64Tool } from "@/components/tools/base64-tool";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Base64 Encoder/Decoder";
const toolUrl = "/tools/base64-encoder-decoder";

const displayDescription = "Free encode binary or text files into Base64 format and decode them back.";

export const metadata: Metadata = {
  title: "Free Base64 Encoder/Decoder Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free base64 encoder/decoder","base64 encoder/decoder online","free base64 encoder/decoder online","base64 encoder/decoder tool","client-side base64 encoder/decoder","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Base64 Encoder/Decoder Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/base64-encoder-decoder",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Base64 Encoder/Decoder Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Base64 Encoder/Decoder Online Utility?",
    answer: "A Free Base64 Encoder/Decoder Online utility converts raw text or files to Base64 formats and decodes them back to readable UTF-8 strings.",
  },
  {
    question: "Is it safe to use this Free Base64 Encoder/Decoder Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function Base64ToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Base64 Encoder/Decoder Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Base64 Encoder/Decoder Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <Base64Tool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Base64 Encoder/Decoder Online utility converts raw text or files to Base64 formats and decodes them back to readable UTF-8 strings."
            howToUse={[
              "Enter your raw string in the input field.",
              "Toggle between the Encode or Decode actions to transform the string.",
              "Instantly copy or download the transformed string from the output panel."
            ]}
            whyClientSide="Base64 strings can carry tokens or configs. Browser-side processing guarantees your data is processed safely in-memory."
          />
        </article>
      </main>
    </>
  );
}
