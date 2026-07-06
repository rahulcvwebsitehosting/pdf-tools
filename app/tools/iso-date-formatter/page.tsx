import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'ISO 8601 Date Formatter — Standardize Timestamps Online',
  description: 'Convert local times, calendar dates, and custom timestamps into standardized ISO 8601, RFC 3339, and UTC strings. 100% client-side.',
};

const faqs = [
  {
    question: 'What is ISO 8601 format?',
    answer: 'ISO 8601 is an international standard covering the exchange of date- and time-related data. It uses the YYYY-MM-DDTHH:mm:ss.sssZ format where "T" separates the date and time, and "Z" represents UTC.',
  },
  {
    question: 'What is the difference between ISO 8601 and RFC 3339?',
    answer: 'RFC 3339 is a profile of ISO 8601. RFC 3339 restricts certain options from ISO 8601, making it a stricter, more deterministic representation standard for internet protocols.',
  },
  {
    question: 'Are my date inputs sent to external databases?',
    answer: 'No. The conversion is completed entirely inside your browser using JavaScript Date and temporal API routines, maintaining maximum confidentiality.',
  },
];

export default function IsoDateFormatterPage() {
  return (
    <>
      <SchemaMarkup
        toolName="ISO 8601 Date Formatter"
        toolDescription="Convert local times, calendar dates, and custom timestamps into standardized ISO 8601, RFC 3339, and UTC strings. 100% client-side."
        toolUrl="/tools/iso-date-formatter"
        faqs={faqs}
      />
      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Convert local times, calendar dates, and custom timestamps into standardized ISO 8601, RFC 3339, and UTC strings. 100% client-side.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="ISO 8601 Date Formatter" description="Convert local times, calendar dates, and custom timestamps into standardized ISO 8601, RFC 3339, and UTC strings. 100% client-side." />
        </div>
      </div>
    </main>
    </>
  );
}
