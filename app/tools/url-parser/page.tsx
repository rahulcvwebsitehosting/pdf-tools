import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
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

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Parse URL parts, hostname parameters, and query parameters. Inspect and decode complex query strings safely client-side.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="URL Parser & Query Analyzer" description="Parse URL parts, hostname parameters, and query parameters. Inspect and decode complex query strings safely client-side." />
        </div>
      </div>
    </main>
    </>
  );
}
