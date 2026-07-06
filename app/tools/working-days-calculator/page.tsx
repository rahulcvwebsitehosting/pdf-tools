import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
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
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Compute the exact number of working days between two dates. Exclude standard weekends and input custom holidays. 100% client-side.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Working Days Calculator" description="Compute the exact number of working days between two dates. Exclude standard weekends and input custom holidays. 100% client-side." />
        </div>
      </div>
    </main>
    </>
  );
}
