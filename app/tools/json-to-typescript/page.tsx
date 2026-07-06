import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'JSON to TypeScript Transpiler — Convert JSON to TypeScript Interfaces',
  description: 'Convert JSON objects into clean, nested TypeScript interfaces instantly. Free, fast, and 100% client-side type generation.',
};

export default function JsonToTypescriptPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Convert JSON objects into clean, nested TypeScript interfaces instantly. Free, fast, and 100% client-side type generation.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="JSON to TypeScript Transpiler — Convert JSON to TypeScript Interfaces" description="Convert JSON objects into clean, nested TypeScript interfaces instantly. Free, fast, and 100% client-side type generation." />
        </div>
      </div>
    </main>
  );
}
