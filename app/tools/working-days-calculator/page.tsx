import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'Working Days Calculator — Count Business Days Online',
  description: 'Compute the exact number of working days between two dates. Exclude standard weekends and input custom holidays. 100% client-side.',
};

const faqs = [
  {
    question: 'What is considered a working day?',
    answer: 'By default, working days are Monday through Friday. However, this tool allows you to customize which days represent the weekend according to regional or project-specific schedules.',
  },
  {
    question: 'How do custom holiday exclusions work?',
    answer: 'You can manually enter custom holiday dates, and the calculator will automatically skip them during the day count calculation.',
  },
  {
    question: 'Is my holiday list or date range stored?',
    answer: 'No. Everything is computed locally inside your browser session, meaning your internal business schedules and calendar data remain entirely private.',
  },
];

export default function WorkingDaysCalculatorPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Working Days Calculator"
        toolDescription="Compute the exact number of working days between two dates. Exclude standard weekends and input custom holidays. 100% client-side."
        toolUrl="/tools/working-days-calculator"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              Working Days Calculator
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Count weekend and custom holiday exclusions between dates.
            </p>
          </header>

          <ComingSoon
            toolName="Working Days Calculator"
            description="Count weekend and custom holiday exclusions between dates."
          />

          <AeoSection
            toolName="Working Days Calculator"
            whatIs="A Working Days Calculator (or business day calculator) is a productivity utility that computes the number of active workdays between two target dates, excluding weekends and specific holidays."
            howToUse={[
              'Select the start and end dates from the calendar picker.',
              'Check or uncheck which days of the week are considered weekends.',
              'Add optional holiday exclusions to the list, and review the final count of working days.'
            ]}
            whyClientSide="Calculating workdays locally allows you to analyze internal business schedules, payroll, or project sprints instantly without exposing company calendars or timeline strategies to any third-party servers."
          />
        </article>
      </main>
    </>
  );
}
