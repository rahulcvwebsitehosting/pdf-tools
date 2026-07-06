import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
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
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Track elapsed and split times with microsecond accuracy using modern browser APIs. 100% client-side, offline-capable stopwatch.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Stopwatch & Lap Recorder" description="Track elapsed and split times with microsecond accuracy using modern browser APIs. 100% client-side, offline-capable stopwatch." />
        </div>
      </div>
    </main>
    </>
  );
}
