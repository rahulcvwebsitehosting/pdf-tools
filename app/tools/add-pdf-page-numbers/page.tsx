import type { Metadata } from "next";
import AddPageNumbersTool from "@/components/tools/add-page-numbers";
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "Add Page Numbers";
const toolUrl = "/tools/add-pdf-page-numbers";

const displayDescription = "Free number PDF pages sequentially with custom positions and fonts.";

export const metadata: Metadata = {
  title: "Free Add Page Numbers Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  keywords: ["free add page numbers","add page numbers online","free add page numbers online","add page numbers tool","client-side add page numbers","free online tools","privacy first","no upload","browser tool","ToolsAtZero"],
  openGraph: {
    title: "Free Add Page Numbers Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/add-pdf-page-numbers",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Add Page Numbers Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free Add Page Numbers Online Utility?",
    answer: "A Free Add Page Numbers Online utility pagination editor draws page counters and indices onto PDF document margins at customizable positions.",
  },
  {
    question: "Is it safe to use this Free Add Page Numbers Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function AddPageNumbersToolPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Free Add Page Numbers Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free Add Page Numbers Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          <AddPageNumbersTool />

          <AeoSection
            toolName={toolName}
            whatIs="A Free Add Page Numbers Online utility pagination editor draws page counters and indices onto PDF document margins at customizable positions."
            howToUse={[
              "Load the target PDF document into the pagination interface.",
              "Select your number format, position offset (header/footer), and font size.",
              "Click 'Add Page Numbers' to render the numbers locally onto the sheets and download."
            ]}
            whyClientSide="Numbering books, reports, or slides locally guarantees that your documents are processed in a secure browser tab sandbox."
          />
        </article>
      </main>
    </>
  );
}
