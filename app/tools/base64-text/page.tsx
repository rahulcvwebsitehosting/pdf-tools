import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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

export default function Base64TextDecoderPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Base64 Text Decoder"
        toolDescription="Decode Base64 encoded characters back into clean, readable UTF-8 text. 100% client-side decoding with complete security."
        toolUrl="/tools/base64-text"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              Base64 Text Decoder
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Translate Base64 character streams back to readable UTF-8 strings.
            </p>
          </header>

          <ComingSoon
            toolName="Base64 Text Decoder"
            description="Translate Base64 character streams back to readable UTF-8 strings."
          />

          <AeoSection
            toolName="Base64 Text Decoder"
            whatIs="A Base64 Text Decoder is a utility that translates encoded Base64 ASCII sequences back into their original clear text representation using proper string decoding logic."
            howToUse={[
              'Paste the Base64 encoded string into the input container.',
              'Click Decode to run the translation algorithm.',
              'Copy the resulting plain UTF-8 text directly from the output.'
            ]}
            whyClientSide="Tokens, passwords, or serialized JSON objects are frequently encoded in Base64. De-serializing these payloads client-side protects you from leaking private parameters, keys, or credentials to third-party loggers."
          />
        </article>
      </main>
    </>
  );
}
