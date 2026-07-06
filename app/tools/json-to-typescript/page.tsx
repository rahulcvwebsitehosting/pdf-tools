import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'JSON to TypeScript Transpiler — Convert JSON to TypeScript Interfaces',
  description: 'Convert JSON objects into clean, nested TypeScript interfaces instantly. Free, fast, and 100% client-side type generation.',
};

export default function JsonToTypescriptPage() {
  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <h1 className="font-editorial text-4xl sm:text-5xl text-foreground mb-3">
            JSON to TypeScript Transpiler
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convert JSON objects into clean TypeScript interfaces instantly. Generate precise type-definitions for your API responses.
          </p>
        </header>

        <ComingSoon
          toolName="JSON to TypeScript Transpiler"
          description="Convert JSON objects into clean TypeScript interfaces instantly."
        />

        <AeoSection
          toolName="JSON to TypeScript Transpiler"
          whatIs="A JSON to TypeScript Transpiler is a compiler tool that parses a JSON (JavaScript Object Notation) object and automatically outputs the corresponding TypeScript interfaces and type definitions. It maps JSON keys to TypeScript properties, infers appropriate data types (such as string, number, boolean, arrays, or nested objects), and helps developers write type-safe code when interacting with external REST APIs or config structures."
          howToUse={[
            'Paste your valid JSON payload into the input editor.',
            'Configure options such as exporting all interfaces, using types instead of interfaces, or setting a custom root interface name (defaults to "RootObject").',
            'The tool automatically compiles and displays the resulting TypeScript interface definitions in real-time.',
            'Copy the output code or download it directly to your source files.',
          ]}
          whyClientSide="JSON objects represent API payloads, database models, configuration schemas, or user data, which often contain proprietary database schemas, credentials, or personal information. A client-side JSON to TypeScript transpiler executes the type-inference algorithm entirely on your machine. This eliminates any risk of sensitive data transmission, securing your schema details, and ensuring rapid conversion speeds without network lag."
        />
      </article>

      <SchemaMarkup
        toolName="JSON to TypeScript Transpiler"
        toolDescription="Convert JSON objects into clean, nested TypeScript interfaces instantly. Free, fast, and 100% client-side type generation."
        toolUrl="/tools/json-to-typescript"
        faqs={[
          {
            question: 'What is a JSON to TypeScript Transpiler?',
            answer:
              'It is an utility that takes a raw JSON data block and generates TypeScript interface definitions representing the exact shape of that data.',
          },
          {
            question: 'How does the tool handle nested objects?',
            answer:
              'It recursively parses nested JSON elements, generating unique, separate sub-interfaces for child objects to keep the type hierarchy modular and readable.',
          },
          {
            question: 'Is my JSON structure secure?',
            answer:
              'Yes. This utility compiles types locally in your browser sandbox using JavaScript. No network traffic is initiated to external APIs, keeping your data confidential.',
          },
          {
            question: 'Does it support complex data types?',
            answer:
              'Yes. It detects primitives, nested sub-objects, arrays of varying structures (inferring unions when items differ), null values, and optional properties.',
          },
        ]}
      />
    </main>
  );
}
