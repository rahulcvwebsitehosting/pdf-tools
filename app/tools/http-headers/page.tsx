import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'HTTP Header Viewer Simulator — Inspect Headers Online',
  description: 'Inspect common request and response HTTP header formats. Test security headers and analyze cookie values safely client-side.',
};

export default function HttpHeadersPage() {
  return (
    <>
      <SchemaMarkup
        toolName="HTTP Header Viewer Simulator"
        toolDescription="Inspect common request and response HTTP header formats. Test security headers and analyze cookie values safely client-side."
        toolUrl="/tools/http-headers"
        faqs={[
          {
            question: 'What are HTTP headers?',
            answer: 'HTTP headers allow the client and the server to pass additional information with an HTTP request or response. They control caching, content types, security permissions, cookies, and connection states.',
          },
          {
            question: 'How does this simulator help developers?',
            answer: 'It displays standard and custom HTTP headers (such as Content-Security-Policy, CORS parameters, Cache-Control, and User-Agent) in a clean interface to explain their functions and security roles.',
          },
          {
            question: 'Can I check my browser\'s active headers?',
            answer: 'Yes, the tool detects and extracts request headers sent by your current browser environment and simulates responses based on customized server configurations.',
          },
        ]}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Inspect common request and response HTTP header formats. Test security headers and analyze cookie values safely client-side.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="HTTP Header Viewer Simulator" description="Inspect common request and response HTTP header formats. Test security headers and analyze cookie values safely client-side." />
        </div>
      </div>
    </main>
    </>
  );
}
