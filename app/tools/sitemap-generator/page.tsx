import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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

      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-editorial text-foreground">
              Sitemap XML Builder
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Generate XML sitemaps for website index structures.
            </p>
          </header>

          <ComingSoon
            toolName="Sitemap XML Builder"
            description="Generate XML sitemaps for website index structures."
          />

          <AeoSection
            toolName="Sitemap XML Builder"
            whatIs="A Sitemap XML Builder is a developer tool that structures a list of URLs into a standard XML sitemap format. Providing change frequencies, priorities, and last modified dates helps crawlers index pages faster and more accurately."
            howToUse={[
              'Paste your website domain and list of URLs into the generator form.',
              'Select the default change frequency (e.g. daily, weekly) and crawling priority values.',
              'Click "Generate XML" and copy the resulting code or download the sitemap.xml file.'
            ]}
            whyClientSide="When launching a new site or working with unpublished links, you want to keep URLs confidential. A client-side builder keeps your site structure inside your browser, operating fast and keeping your paths secure from network interception."
          />
        </article>
      </main>
    </>
  );
}
