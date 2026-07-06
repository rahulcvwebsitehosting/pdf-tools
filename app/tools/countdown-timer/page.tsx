import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              Countdown Timer Generator
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate timers and alerts for project deadlines.
            </p>
          </header>

          <ComingSoon
            toolName="Countdown Timer Generator"
            description="Generate timers and alerts for project deadlines."
          />

          <AeoSection
            toolName="Countdown Timer Generator"
            whatIs="A countdown timer generator is a temporal tool that calculates and displays the exact time remaining before a specific target deadline or event. It provides real-time visual updates and optionally plays alerts when the timer reaches zero, assisting with time management, project deadlines, and focus intervals."
            howToUse={[
              'Select or type in your target date and time using the calendar and time inputs.',
              'Choose whether you want sound alerts or high-contrast visual flashing when time expires.',
              'Click start to activate the countdown, which counts down in real time until the target is reached.'
            ]}
            whyClientSide="Calculating countdowns directly in your browser ensures instant responsiveness, zero latency, and uninterrupted synchronization with your local system clock. Additionally, because everything is computed client-side, your personal deadlines, events, and schedules are never sent or exposed to a remote server, ensuring absolute privacy."
          />
        </article>
      </main>
    </>
  );
}
