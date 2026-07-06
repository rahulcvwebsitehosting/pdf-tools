import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
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
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Convert blocks of binary code (zeros and ones) back into readable ASCII/UTF-8 text characters. 100% client-side parser.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Binary to Text Converter" description="Convert blocks of binary code (zeros and ones) back into readable ASCII/UTF-8 text characters. 100% client-side parser." />
        </div>
      </div>
    </main>
    </>
  );
}
