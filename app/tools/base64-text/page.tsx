import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'Base64 Text Decoder — Convert Base64 Streams Online',
  description: 'Decode Base64 encoded characters back into clean, readable UTF-8 text. 100% client-side decoding with complete security.',
};

const faqs = [
  {
    question: 'What is Base64 text encoding?',
    answer: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation.',
  },
  {
    question: 'How does the Base64 Text Decoder handle non-English characters?',
    answer: 'The decoder utilizes UTF-8 decoding routines, ensuring special characters, symbols, and non-Latin alphabets (like emojis or foreign scripts) are reconstructed correctly without corruption.',
  },
  {
    question: 'Are my encoded strings sent over the network?',
    answer: 'No. The decoding is done in your browser using local APIs. Encoded passwords, API tokens, or other sensitive details are never exposed to external servers.',
  },
];

const toolName = "Base64 Text Decoder";
const toolUrl = "/tools/base64-text";
const displayDescription = "Decode Base64 encoded characters back into clean, readable UTF-8 text. 100% client-side decoding with complete security.";

export default function Base64TextDecoderPage() {
  return (
    <>
      <SchemaMarkup
        toolName={toolName}
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {toolName}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {displayDescription}
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName={toolName} description={displayDescription} />
        </div>
      </div>
    </main>
    </>
  );
}
