import type { Metadata } from "next";
import UnlockPdfTool from "@/components/tools/unlock-pdf";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Unlock PDF";
const toolUrl = "/tools/unlock-pdf";

const displayDescription = "Free remove passwords and restriction blocks from PDF documents instantly.";

export const metadata: Metadata = {
  title: "Free Unlock PDF Online",
  description: displayDescription,
  keywords: ["free unlock pdf","unlock pdf online","free unlock pdf online","unlock pdf tool","client-side unlock pdf","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Unlock PDF Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/unlock-pdf",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Unlock PDF Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Unlock PDF Online Utility?",
    answer: "A Free Unlock PDF Online utility is a document decryption tool that strips restriction passwords from PDF sheets, letting you read, edit, or copy text content freely.",
  },
  {
    question: "Is it safe to use this Free Unlock PDF Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function UnlockPdfToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Unlock PDF Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Unlock PDF Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <UnlockPdfTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Unlock PDF Online utility is a document decryption tool that strips restriction passwords from PDF sheets, letting you read, edit, or copy text content freely."
            howToUse={[
              "Select or drag your password-protected PDF document into the workbench.",
              "Input the decryption password if prompted to decrypt the internal stream.",
              "Download the fully unlocked, restriction-free version of your PDF file."
            ]}
            whyClientSide="Decrypting high-risk contracts or financial records on third-party servers is insecure. Running the decryption locally protects your keys and private records."
          />
        </article>
      </main>
    </>
  );
}
