import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'Sitemap XML Builder — Free Sitemap Generator',
  description: 'Generate XML sitemaps for website index structures. Instantly build clean, search-engine compliant XML maps client-side.',
};

export default function SitemapGeneratorPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Sitemap XML Builder"
        toolDescription="Generate XML sitemaps for website index structures. Instantly build clean, search-engine compliant XML maps client-side."
        toolUrl="/tools/sitemap-generator"
        faqs={[
          {
            question: 'What is an XML sitemap?',
            answer: 'An XML sitemap is a file where you list the web pages of your site to tell search engines about the organization of your site content. Web crawlers read this file to more intelligently crawl your site.',
          },
          {
            question: 'Why is a sitemap builder needed?',
            answer: 'Writing XML sitemaps by hand can be tedious and prone to syntax errors. This builder generates fully compliant XML schemas, tags, priorities, change frequencies, and modification dates.',
          },
          {
            question: 'Are my website URLs sent to any server?',
            answer: 'No. The XML construction and validation happen completely client-side in your browser, maintaining full security of your site links.',
          },
        ]}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Generate XML sitemaps for website index structures. Instantly build clean, search-engine compliant XML maps client-side.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Sitemap XML Builder" description="Generate XML sitemaps for website index structures. Instantly build clean, search-engine compliant XML maps client-side." />
        </div>
      </div>
    </main>
    </>
  );
}
