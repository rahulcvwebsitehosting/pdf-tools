import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'World Clock Dashboard — Live Global City Clocks',
  description: 'Monitor live local times and timezone offsets across global cities on a customizable dashboard. 100% client-side precision.',
};

const faqs = [
  {
    question: 'How does the World Clock Dashboard determine time zones?',
    answer: 'It utilizes the Intl.DateTimeFormat API built directly into your modern browser, which relies on the operating system\'s database of international time zones.',
  },
  {
    question: 'Can I add custom cities or custom offsets?',
    answer: 'Yes, you can search and add any major timezone or city to your live dashboard to compare hours side-by-side.',
  },
  {
    question: 'Is my dashboard layout saved across visits?',
    answer: 'Yes, your configured city list is saved locally in your browser storage (localStorage). It is never sent to a server.',
  },
];

export default function WorldClockDashboardPage() {
  return (
    <>
      <SchemaMarkup
        toolName="World Clock Dashboard"
        toolDescription="Monitor live local times and timezone offsets across global cities on a customizable dashboard. 100% client-side precision."
        toolUrl="/tools/world-clock-dashboard"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Monitor live local times and timezone offsets across global cities on a customizable dashboard. 100% client-side precision.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="World Clock Dashboard" description="Monitor live local times and timezone offsets across global cities on a customizable dashboard. 100% client-side precision." />
        </div>
      </div>
    </main>
    </>
  );
}
