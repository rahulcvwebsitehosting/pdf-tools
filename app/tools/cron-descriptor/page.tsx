import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'Cron Expression Descriptor — Convert Cron to Human Readable English',
  description: 'Parse cron schedule expressions into plain English sentences. Verify your crontab schedule settings instantly. 100% local and client-side.',
};

export default function CronDescriptorPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Parse cron schedule expressions into plain English sentences. Verify your crontab schedule settings instantly. 100% local and client-side.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Cron Expression Descriptor — Convert Cron to Human Readable English" description="Parse cron schedule expressions into plain English sentences. Verify your crontab schedule settings instantly. 100% local and client-side." />
        </div>
      </div>
    </main>
  );
}
