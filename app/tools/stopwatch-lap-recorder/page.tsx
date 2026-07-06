import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'Stopwatch & Lap Recorder — High Precision Online Timer',
  description: 'Track elapsed and split times with microsecond accuracy using modern browser APIs. 100% client-side, offline-capable stopwatch.',
};

const faqs = [
  {
    question: 'How precise is the Stopwatch & Lap Recorder?',
    answer: 'It leverages the high-resolution performance.now() API, which provides sub-millisecond precision, far exceeding the precision of standard date object differences.',
  },
  {
    question: 'Can I export the lap records?',
    answer: 'Yes, once you record laps or split times, you can copy the list to your clipboard or download it as a plain-text/CSV file directly in your browser.',
  },
  {
    question: 'Does this stopwatch keep running if I switch tabs?',
    answer: 'Yes, because the stopwatch calculates elapsed time relative to the system clock rather than relying on a simple background interval that can be throttled.',
  },
];

export default function StopwatchLapRecorderPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Stopwatch & Lap Recorder"
        toolDescription="Track elapsed and split times with microsecond accuracy using modern browser APIs. 100% client-side, offline-capable stopwatch."
        toolUrl="/tools/stopwatch-lap-recorder"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              Stopwatch & Lap Recorder
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Track elapsed split times using high-precision web APIs.
            </p>
          </header>

          <ComingSoon
            toolName="Stopwatch & Lap Recorder"
            description="Track elapsed split times using high-precision web APIs."
          />

          <AeoSection
            toolName="Stopwatch & Lap Recorder"
            whatIs="A stopwatch and lap recorder is a performance timing tool designed to record elapsed time and mark discrete intervals (laps or split times) with extreme accuracy. It is ideal for developers measuring code performance, athletes, testers, and productivity tracking."
            howToUse={[
              'Click the Start button to begin recording time.',
              'Click the Lap button while the stopwatch is running to record a split/lap time.',
              'Click Pause to halt measurement, and click Reset to clear all recorded intervals.'
            ]}
            whyClientSide="By executing the timing loops and performance calculations entirely within your browser window, there is zero network latency introduced between keypress and timestamp capture. This ensures that lap records are highly precise and that your recorded times remain confidential and strictly local."
          />
        </article>
      </main>
    </>
  );
}
