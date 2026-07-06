import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              World Clock Dashboard
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Display global city clocks and custom offset dashboard maps.
            </p>
          </header>

          <ComingSoon
            toolName="World Clock Dashboard"
            description="Display global city clocks and custom offset dashboard maps."
          />

          <AeoSection
            toolName="World Clock Dashboard"
            whatIs="A World Clock Dashboard is a timezone visualization interface that lets users track local times across multiple global cities concurrently. It assists remote workers and travelers in coordinating meetings and schedules."
            howToUse={[
              'Search for cities or timezones from the input menu.',
              'Add selected locations to your dashboard views.',
              'Compare relative time offsets, working hour overlaps, or current standard/daylight savings status.'
            ]}
            whyClientSide="By executing the live clock loops and local time conversions on the client side, the dashboard runs with minimal resources and does not require constant background server queries, keeping your list of monitored regions completely private."
          />
        </article>
      </main>
    </>
  );
}
