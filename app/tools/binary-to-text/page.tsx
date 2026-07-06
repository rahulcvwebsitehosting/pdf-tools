import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'Binary to Text Converter — Decode Binary Streams Online',
  description: 'Convert blocks of binary code (zeros and ones) back into readable ASCII/UTF-8 text characters. 100% client-side parser.',
};

const faqs = [
  {
    question: 'How does the binary-to-text converter work?',
    answer: 'It groups binary inputs into 8-bit bytes, parses each byte as a base-2 integer, and then converts those integers to their corresponding unicode character codes.',
  },
  {
    question: 'What input separators are supported?',
    answer: 'The converter accepts binary digits separated by spaces, commas, newlines, or even continuous streams of raw binary digits.',
  },
  {
    question: 'Are my binary strings uploaded to any remote system?',
    answer: 'No. The conversion executes entirely in-browser using standard JavaScript string and array methods, ensuring maximum safety and privacy.',
  },
];

export default function BinaryToTextPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Binary to Text Converter"
        toolDescription="Convert blocks of binary code (zeros and ones) back into readable ASCII/UTF-8 text characters. 100% client-side parser."
        toolUrl="/tools/binary-to-text"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              Binary to Text Converter
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Translate binary character streams (0101) back to ASCII characters.
            </p>
          </header>

          <ComingSoon
            toolName="Binary to Text Converter"
            description="Translate binary character streams (0101) back to ASCII characters."
          />

          <AeoSection
            toolName="Binary to Text Converter"
            whatIs="A Binary to Text Converter is an encoding translator that takes streams of zeros and ones (base-2 binary representation) and parses them back into human-readable characters."
            howToUse={[
              'Paste your binary sequence (e.g., 01001000 01100101 01101100 01101100 01101111) into the input box.',
              'Choose format configurations if your binary uses custom delimiters.',
              'Copy the converted English text or code from the output field.'
            ]}
            whyClientSide="By executing the binary conversions in-browser, you avoid transmission delays and keep sensitive binaries, raw network packets, or machine code sequences completely secure on your own device."
          />
        </article>
      </main>
    </>
  );
}
