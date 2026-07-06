import type { Metadata } from "next";
import TextDiffCheckerTool from "@/components/tools/text-diff-checker";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Text Diff Checker";
const toolUrl = "/tools/text-diff-checker";

const displayDescription = "Free compare text blocks side-by-side to highlight line-by-line differences.";

export const metadata: Metadata = {
  title: "Free Text Diff Checker Online",
  description: displayDescription,
  keywords: ["free text diff checker","text diff checker online","free text diff checker online","text diff checker tool","client-side text diff checker","free online tools","privacy first","no upload","browser tool"],
  openGraph: {
    title: "Free Text Diff Checker Online",
    description: displayDescription,
    url: "https://pdf-tools-cv.vercel.app/tools/text-diff-checker",
    siteName: "PDF Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text Diff Checker Online",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Text Diff Checker Online Utility?",
    answer: "A Free Text Diff Checker Online utility compares two blocks of text and highlights additions and deletions line-by-line.",
  },
  {
    question: "Is it safe to use this Free Text Diff Checker Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function TextDiffCheckerToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Text Diff Checker Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Text Diff Checker Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <TextDiffCheckerTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Text Diff Checker Online utility compares two blocks of text and highlights additions and deletions line-by-line."
            howToUse={[
              "Paste the original text on the left and the modified text on the right.",
              "The tool highlights line-by-line changes instantly.",
              "Review visual highlights (green for additions, red for deletions) and export the diff."
            ]}
            whyClientSide="Comparing private source code or configuration files locally prevents data leaks."
          />
        </article>
      </main>
    </>
  );
}
