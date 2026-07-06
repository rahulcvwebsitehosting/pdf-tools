import type { Metadata } from "next";
import JwtDecoderTool from "@/components/tools/jwt-decoder";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free JWT Decoder Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <JwtDecoderTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free JWT Decoder Online utility parses JWT tokens locally, presenting the header, payload JSON, and claim variables without sending tokens to any server."
            howToUse={[
              "Paste your JWT token string into the input panel.",
              "The tool decodes and displays the header and payload instantly.",
              "Inspect key claims like roles, permissions, and expiration times."
            ]}
            whyClientSide="JWT tokens hold credentials and user metadata. Local decoding keeps authentication tokens completely private."
          />
        </article>
      </main>
    </>
  );
}
