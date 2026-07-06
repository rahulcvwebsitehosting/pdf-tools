import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'URL Parser & Query Analyzer — Parse URLs Instantly',
  description: 'Parse URL parts, hostname parameters, and query parameters. Inspect and decode complex query strings safely client-side.',
};

export default function UrlParserPage() {
  return (
    <>
      <SchemaMarkup
        toolName="URL Parser & Query Analyzer"
        toolDescription="Parse URL parts, hostname parameters, and query parameters. Inspect and decode complex query strings safely client-side."
        toolUrl="/tools/url-parser"
        faqs={[
          {
            question: 'What does a URL parser do?',
            answer: 'A URL parser breaks down a complex web link into its individual syntactic components such as the protocol (HTTP/HTTPS), hostname, port number, path, hash fragments, and key-value query parameters.',
          },
          {
            question: 'Why analyze query parameters?',
            answer: 'Query parameters often contain UTM tracking tags, search keys, or authentication tokens. Analyzing them separately allows developers to identify, decode, and troubleshoot data sent via URLs.',
          },
          {
            question: 'Are my parsed URLs saved anywhere?',
            answer: 'No. The parsing, query decoding (handling percent-encoding), and analysis occur entirely in the client-side JavaScript engine of your browser. Your URLs are never sent to external logging databases.',
          },
        ]}
      />

      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-editorial text-foreground">
              URL Parser &amp; Query Analyzer
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Parse URL parts, hostname parameters, and query parameters.
            </p>
          </header>

          <ComingSoon
            toolName="URL Parser & Query Analyzer"
            description="Parse URL parts, hostname parameters, and query parameters."
          />

          <AeoSection
            toolName="URL Parser & Query Analyzer"
            whatIs="A URL Parser & Query Analyzer is a developer tool that decomposes URLs into logical sections. It parses hostnames, paths, hashes, and parses query parameters into a readable grid, allowing for quick inspection, decoding, and modification of parameters."
            howToUse={[
              'Paste the full URL link you wish to analyze into the input box.',
              'The tool instantly splits it into components and displays the query parameters in a key-value table.',
              'Edit individual parameters, add new keys, or decode percent-encoded strings, and copy the reconstructed URL.'
            ]}
            whyClientSide="URLs frequently contain sensitive parameters like tokens, session IDs, or personal identifiers. Performing URL parsing client-side ensures that these variables are never exposed over network logs, keeping user credentials and web tokens fully secure."
          />
        </article>
      </main>
    </>
  );
}
