import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
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
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Check if any year is a leap year using the standard astronomical calendar rules. 100% client-side logic with modulo steps.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Leap Year Checker" description="Check if any year is a leap year using the standard astronomical calendar rules. 100% client-side logic with modulo steps." />
        </div>
      </div>
    </main>
    </>
  );
}
