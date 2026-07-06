import type { Metadata } from "next";
import UrlEncoderDecoderTool from "@/components/tools/url-encoder-decoder";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "URL Encoder/Decoder";
const toolUrl = "/tools/url-encoder-decoder";

const displayDescription = "Free encode or decode URL parameters with percent encoding.";

export const metadata: Metadata = {
  title: "Free URL Encoder/Decoder Online",
  description: displayDescription,
  keywords: ["free url encoder/decoder","url encoder/decoder online","free url encoder/decoder online","url encoder/decoder tool","client-side url encoder/decoder","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free URL Encoder/Decoder Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/url-encoder-decoder",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free URL Encoder/Decoder Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free URL Encoder/Decoder Online Utility?",
    answer: "A Free URL Encoder/Decoder Online utility encodes or decodes URL parameter components client-side.",
  },
  {
    question: "Is it safe to use this Free URL Encoder/Decoder Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function UrlEncoderDecoderToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free URL Encoder/Decoder Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free URL Encoder/Decoder Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <UrlEncoderDecoderTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free URL Encoder/Decoder Online utility encodes or decodes URL parameter components client-side."
            howToUse={[
              "Enter your URL component string in the text box.",
              "Toggle encode or decode options to format query elements.",
              "Copy the updated URL component string output."
            ]}
            whyClientSide="Encoding URL parameters containing tokens or hashes locally ensures complete safety."
          />
        </article>
      </main>
    </>
  );
}
