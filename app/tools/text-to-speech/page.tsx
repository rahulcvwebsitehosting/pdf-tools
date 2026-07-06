import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'Text to Speech Generator — Free Client-Side Audio Synthesizer',
  description: 'Convert written text into spoken audio files using local browser speech synthesis APIs. No server upload, completely private.',
};

const faqs = [
  {
    question: 'How does the Text to Speech Generator work?',
    answer: 'It uses the browser\'s built-in SpeechSynthesis API (part of the Web Speech API) to convert text characters into natural-sounding speech patterns locally.',
  },
  {
    question: 'Can I choose different voices or languages?',
    answer: 'Yes. The tool dynamically queries your operating system and browser for available voice synthesis options, allowing you to select from different accents, languages, and genders.',
  },
  {
    question: 'Is my spoken text stored or uploaded?',
    answer: 'No. The speech generation runs entirely in your browser using local system resources, meaning your text document content remains 100% confidential and is never sent to a third-party API or server.',
  },
];

export default function TextToSpeechPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Text to Speech Generator"
        toolDescription="Convert written text into spoken audio files using local browser speech synthesis APIs. No server upload, completely private."
        toolUrl="/tools/text-to-speech"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Convert written text into spoken audio files using local browser speech synthesis APIs. No server upload, completely private.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Text to Speech Generator" description="Convert written text into spoken audio files using local browser speech synthesis APIs. No server upload, completely private." />
        </div>
      </div>
    </main>
    </>
  );
}
