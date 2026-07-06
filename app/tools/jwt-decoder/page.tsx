import type { Metadata } from "next";
import JwtDecoderTool from "@/components/tools/jwt-decoder";
import { SchemaMarkup } from "@/components/schema-markup";
const toolName = "JWT Decoder";
const toolUrl = "/tools/jwt-decoder";

const displayDescription = "Free inspect JSON Web Tokens (JWT) payload, headers, and signatures locally.";

export const metadata: Metadata = {
  title: "Free JWT Decoder Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free jwt decoder","jwt decoder online","free jwt decoder online","jwt decoder tool","client-side jwt decoder","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free JWT Decoder Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/jwt-decoder",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JWT Decoder Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free JWT Decoder Online Utility?",
    answer: "A Free JWT Decoder Online utility parses JWT tokens locally, presenting the header, payload JSON, and claim variables without sending tokens to any server.",
  },
  {
    question: "Is it safe to use this Free JWT Decoder Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function JwtDecoderToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free JWT Decoder Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            JWT Decoder
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <JwtDecoderTool />
        </div>
      </div>
    </main>
    </>
  );
}
