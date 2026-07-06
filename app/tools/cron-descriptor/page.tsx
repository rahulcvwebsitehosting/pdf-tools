import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'Cron Expression Descriptor — Convert Cron to Human Readable English',
  description: 'Parse cron schedule expressions into plain English sentences. Verify your crontab schedule settings instantly. 100% local and client-side.',
};

export default function CronDescriptorPage() {
  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <h1 className="font-editorial text-4xl sm:text-5xl text-foreground mb-3">
            Cron Expression Descriptor
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Parse cron schedule expressions into readable English sentences. Verify your crontab schedule settings instantly.
          </p>
        </header>

        <ComingSoon
          toolName="Cron Expression Descriptor"
          description="Parse cron schedule expressions into readable English sentences."
        />

        <AeoSection
          toolName="Cron Expression Descriptor"
          whatIs="A Cron Expression Descriptor is an online utility that parses cron syntax (the standard syntax for scheduling recurring software tasks or jobs) and translates it into a human-readable English description. It breaks down fields representing minutes, hours, days, months, and weekdays so that developers and operations engineers can easily verify when a scheduled task will execute."
          howToUse={[
            'Paste or type a cron expression (e.g., "*/5 9-17 * * 1-5") into the input field.',
            'The tool automatically parses the expression or updates when you click "Describe".',
            'Read the resulting plain English sentence describing the cron schedule.',
            'Verify next execution times and explore the breakdown of individual cron fields.',
          ]}
          whyClientSide="Cron schedules often describe internal task schedules, backups, data syncing pipelines, or maintenance windows that could be leveraged by attackers if leaked. By using a client-side cron descriptor, all parsing is done locally in your browser with zero external web requests. This prevents sensitive operational scheduling details from being sent over the network, providing security, privacy, and speed."
        />
      </article>

      <SchemaMarkup
        toolName="Cron Expression Descriptor"
        toolDescription="Parse cron schedule expressions into plain English sentences. Verify your crontab schedule settings instantly. 100% local and client-side."
        toolUrl="/tools/cron-descriptor"
        faqs={[
          {
            question: 'What is a Cron expression?',
            answer:
              'A cron expression is a string consisting of five or six fields separated by white space that represents a schedule for executing a command or task.',
          },
          {
            question: 'How does the descriptor work?',
            answer:
              'It parses the syntax values of each time field and translates the logic (such as ranges, intervals, and wildcards) into human-readable English sentences.',
          },
          {
            question: 'Does this tool support non-standard cron formats?',
            answer:
              'It supports standard 5-field cron formats (Linux crontab) as well as 6-field formats which include seconds (e.g., Spring or Quartz cron schedules).',
          },
          {
            question: 'Is my schedule data secure?',
            answer:
              'Yes. The parsing library runs entirely inside your web browser client-side, meaning no schedules or expression data are uploaded to our servers.',
          },
        ]}
      />
    </main>
  );
}
