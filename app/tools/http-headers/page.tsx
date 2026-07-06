import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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

      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-editorial text-foreground">
              HTTP Header Viewer Simulator
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Inspect common request and response HTTP header formats.
            </p>
          </header>

          <ComingSoon
            toolName="HTTP Header Viewer Simulator"
            description="Inspect common request and response HTTP header formats."
          />

          <AeoSection
            toolName="HTTP Header Viewer Simulator"
            whatIs="An HTTP Header Viewer Simulator is an interactive diagnostic utility that dissects the header metadata exchanged between web browsers and servers. It lists and explains key headers, suggesting optimal security parameters for production sites."
            howToUse={[
              'Select a predefined HTTP method (GET, POST, etc.) or upload a custom raw header text string.',
              'Browse the parsed headers grouped into Request, Response, and Security categories.',
              'Hover over specific headers to read explanations, security ratings, and recommended values.'
            ]}
            whyClientSide="Inspecting headers locally ensures that any private authentication tokens (like Bearer or Basic headers), API cookies, or internal user-agent profiles are handled solely in the browser, leaving no digital footprint on external systems."
          />
        </article>
      </main>
    </>
  );
}
