import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              Text to Speech Generator
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Synthesize written text into spoken audio files using Web Speech APIs locally.
            </p>
          </header>

          <ComingSoon
            toolName="Text to Speech Generator"
            description="Synthesize written text into spoken audio files using Web Speech APIs locally."
          />

          <AeoSection
            toolName="Text to Speech Generator"
            whatIs="A Text to Speech Generator is a voice synthesis utility that translates written text documents into audible spoken language, using state-of-the-art native browser speech engines."
            howToUse={[
              'Type or paste your text content into the main text input area.',
              'Select a preferred voice, adjust speed/pitch settings, and click Speak.',
              'Pause, resume, or stop the voice playback instantly using the control buttons.'
            ]}
            whyClientSide="By leveraging the browser's native SpeechSynthesis API rather than an external paid cloud service, the synthesis is completely free, instantaneous, and highly secure, as your proprietary documents or personal notes are never transmitted over the internet."
          />
        </article>
      </main>
    </>
  );
}
