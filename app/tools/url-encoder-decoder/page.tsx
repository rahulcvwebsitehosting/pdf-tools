import type { Metadata } from "next";
import UrlEncoderDecoderTool from "@/components/tools/url-encoder-decoder";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "URL Encoder/Decoder";
const toolUrl = "/tools/url-encoder-decoder";

const displayDescription = "Free encode or decode URL parameters with percent encoding.";

export const metadata: Metadata = {
  title: "Free URL Encoder/Decoder Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free url encoder/decoder","url encoder/decoder online","free url encoder/decoder online","url encoder/decoder tool","client-side url encoder/decoder","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free URL Encoder/Decoder Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/url-encoder-decoder",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free URL Encoder/Decoder Online | 100% Private | ToolsAtZero",
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            URL Encoder/Decoder
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <UrlEncoderDecoderTool />
        </div>
      </div>
    </main>
    </>
  );
}
