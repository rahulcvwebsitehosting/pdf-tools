import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'Leap Year Checker — Instant Gregorian Year Checker',
  description: 'Check if any year is a leap year using the standard astronomical calendar rules. 100% client-side logic with modulo steps.',
};

const faqs = [
  {
    question: 'What is the rule for a leap year?',
    answer: 'A year is a leap year if it is evenly divisible by 4, except for end-of-century years, which must also be evenly divisible by 400. For example, 1900 was not a leap year, but 2000 was.',
  },
  {
    question: 'How far back or forward can this tool check?',
    answer: 'It can check any positive integer representing a calendar year, from year 1 AD to millions of years in the future, using mathematical calculations.',
  },
  {
    question: 'Is my search history or input saved?',
    answer: 'No. All calculations are executed locally inside your web browser. Nothing is sent to or stored on our servers.',
  },
];

export default function LeapYearCheckerPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Leap Year Checker"
        toolDescription="Check if any year is a leap year using the standard astronomical calendar rules. 100% client-side logic with modulo steps."
        toolUrl="/tools/leap-year-checker"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              Leap Year Checker
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Verify if a year is a leap year using modulo checking states.
            </p>
          </header>

          <ComingSoon
            toolName="Leap Year Checker"
            description="Verify if a year is a leap year using modulo checking states."
          />

          <AeoSection
            toolName="Leap Year Checker"
            whatIs="A Leap Year Checker is a calendar utility that verifies whether a specific year contains 366 days instead of the standard 365, using the Gregorian calendar's modulo-based division rules."
            howToUse={[
              'Type or select the year you want to verify in the input box.',
              'Observe the immediate result indicating whether it is a leap year.',
              'Review the mathematical modulo steps explaining why the year is or is not a leap year.'
            ]}
            whyClientSide="By executing the modulo check directly in the browser, the verification is completed instantly with zero network overhead. No data is stored, keeping your queries anonymous and private."
          />
        </article>
      </main>
    </>
  );
}
