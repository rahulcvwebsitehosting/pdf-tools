import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'Markdown to HTML Previewer — Free Online Tool',
  description:
    'Convert Markdown to HTML with live preview. Supports GFM (Flavored Markdown), tables, code blocks, and syntax highlighting. 100% client-side — your data never leaves your browser.',
};

export default function MarkdownToHtmlPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Convert Markdown to HTML with live preview. Supports GFM (Flavored Markdown), tables, code blocks, and syntax highlighting. 100% client-side — your data never leaves your browser.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Markdown to HTML Previewer — Free Online Tool" description="Markdown to HTML Previewer — Free Online Tool" />
        </div>
      </div>
    </main>
  );
}
