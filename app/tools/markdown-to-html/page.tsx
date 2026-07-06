import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'Markdown to HTML Previewer — Free Online Tool',
  description:
    'Convert Markdown to HTML with live preview. Supports GFM (Flavored Markdown), tables, code blocks, and syntax highlighting. 100% client-side — your data never leaves your browser.',
};

export default function MarkdownToHtmlPage() {
  return (
    <main>
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Markdown to HTML Previewer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Write Markdown and see it rendered as HTML in real time. Supports
            GFM (Flavored Markdown), tables, code blocks, and more.
          </p>
        </header>

        <ComingSoon
          toolName="Markdown to HTML Previewer"
          description="Write or paste Markdown in the editor and see a live HTML preview side-by-side. Copy the rendered HTML output or download it. Supports GFM, tables, task lists, and syntax-highlighted code blocks."
        />

        <AeoSection
          toolName="Markdown to HTML Previewer"
          whatIs="A Markdown to HTML previewer is a tool that converts Markdown-formatted text into rendered HTML in real time. Markdown is a lightweight markup language used widely in documentation, README files, blogs, and note-taking. This tool lets you write Markdown and instantly see how it will look when rendered, while also providing the raw HTML output for use in websites, emails, and CMS platforms."
          howToUse={[
            'Type or paste your Markdown content into the editor on the left side.',
            'View the live HTML preview on the right side, updating in real time as you type.',
            'Copy the rendered HTML source code or download it as an .html file for use in your projects.',
          ]}
          whyClientSide="Documentation and writing often contains unreleased product information, internal guides, or proprietary content. A client-side Markdown previewer processes your text entirely in the browser — nothing is uploaded to any server. You can safely preview confidential documents, internal wikis, and private notes without any risk of your content being stored or intercepted."
        />
      </article>

      <SchemaMarkup
        toolName="Markdown to HTML Previewer"
        toolDescription="Convert Markdown to HTML with live preview in your browser. Supports GFM (Flavored Markdown), tables, code blocks, and syntax highlighting. Free, client-side tool — your data never leaves your browser."
        toolUrl="/tools/markdown-to-html"
        faqs={[
          {
            question: 'What Markdown features are supported?',
            answer:
              'This tool supports standard Markdown as well as GFM (Flavored Markdown) extensions including tables, task lists, strikethrough text, fenced code blocks with syntax highlighting, footnotes, and automatic URL linking.',
          },
          {
            question: 'Can I copy the generated HTML?',
            answer:
              'Yes. The tool provides both a rendered preview and the raw HTML source code. You can copy the HTML output to use in websites, email templates, CMS platforms, or any other application that accepts HTML content.',
          },
          {
            question: 'Is my Markdown content safe with this tool?',
            answer:
              'Yes. This tool runs 100% in your browser. Your Markdown content is never sent to any server. All rendering and conversion happens locally on your device, ensuring complete privacy for your documents and drafts.',
          },
        ]}
      />
    </main>
  );
}
