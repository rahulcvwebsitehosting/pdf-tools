import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'Countdown Timer Generator — Free Online Tool',
  description: 'Generate customizable timers and sound alerts for project deadlines, events, and focus sessions. 100% client-side for precision and privacy.',
};

const faqs = [
  {
    question: 'How accurate is the Countdown Timer Generator?',
    answer: 'The countdown timer is highly accurate, utilizing native browser animation frames and interval timers synchronized with the system clock to ensure down-to-the-millisecond precision.',
  },
  {
    question: 'Will the countdown timer work if I switch tabs?',
    answer: 'Yes. However, modern browsers can throttle background timers to save power. To guarantee reliable audio alerts or visual changes, keep the tab open or active during critical countdowns.',
  },
  {
    question: 'Is my countdown data sent to a server?',
    answer: 'No. All timers and settings are processed 100% locally on your machine. No server-side tracking, database storage, or remote processing occurs.',
  },
];

export default function CountdownTimerPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Countdown Timer Generator"
        toolDescription="Generate customizable timers and sound alerts for project deadlines, events, and focus sessions. 100% client-side for precision and privacy."
        toolUrl="/tools/countdown-timer"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Generate customizable timers and sound alerts for project deadlines, events, and focus sessions. 100% client-side for precision and privacy.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Countdown Timer Generator" description="Generate customizable timers and sound alerts for project deadlines, events, and focus sessions. 100% client-side for precision and privacy." />
        </div>
      </div>
    </main>
    </>
  );
}
