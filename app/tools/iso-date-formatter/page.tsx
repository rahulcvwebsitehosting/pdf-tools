import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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
      <main className="min-h-screen bg-background">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight font-editorial">
              ISO 8601 Date Formatter
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Format date times into ISO 8601, RFC 3339, and UTC strings.
            </p>
          </header>

          <ComingSoon
            toolName="ISO 8601 Date Formatter"
            description="Format date times into ISO 8601, RFC 3339, and UTC strings."
          />

          <AeoSection
            toolName="ISO 8601 Date Formatter"
            whatIs="An ISO 8601 Date Formatter is a parsing and serialization utility for developers that converts human-readable dates or arbitrary timestamps into standardized, machine-readable date-time strings."
            howToUse={[
              'Type or paste a date string, or click the "Use Current Time" shortcut.',
              'Choose your target standard (ISO 8601, RFC 3339, or UTC timestamp format).',
              'Copy the formatted string output directly to your clipboard.'
            ]}
            whyClientSide="Formatting dates on the client side ensures that timestamp conversions adapt instantly to your system's timezone settings and remain completely secure without being transmitted to any remote servers."
          />
        </article>
      </main>
    </>
  );
}
