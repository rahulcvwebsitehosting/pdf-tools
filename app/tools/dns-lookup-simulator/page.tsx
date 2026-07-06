import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

export const metadata: Metadata = {
  title: 'DNS Lookup Simulator — Free Online Tool',
  description: 'Simulate DNS propagation loops and record resolution paths. Trace recursive queries across Root, TLD, and Authoritative nameservers.',
};

export default function DnsLookupSimulatorPage() {
  return (
    <>
      <SchemaMarkup
        toolName="DNS Lookup Simulator"
        toolDescription="Simulate DNS propagation loops and record resolution paths. Trace recursive queries across Root, TLD, and Authoritative nameservers."
        toolUrl="/tools/dns-lookup-simulator"
        faqs={[
          {
            question: 'What is a DNS lookup simulation?',
            answer: 'A DNS lookup simulation traces how a domain name is resolved to an IP address by stepping through the DNS hierarchy, including the Root Nameservers, Top-Level Domain (TLD) Nameservers, and Authoritative Nameservers.',
          },
          {
            question: 'Does this simulator contact real DNS servers?',
            answer: 'This is a visual simulator designed to teach and debug DNS lookup paths, recursion, and propagation loops. It models real-world DNS behavior, propagation times, and record types (A, AAAA, CNAME, MX, TXT, NS) instantly.',
          },
          {
            question: "Can I check my domain's actual DNS propagation here?",
            answer: "It allows you to simulate and visualize how propagation travels through the DNS cache hierarchy. For actual real-time network resolution, a live lookup command (like dig or nslookup) is usually simulated or executed.",
          },
        ]}
      />

      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-editorial text-foreground">
              DNS Lookup Simulator
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Simulate DNS propagation loops and record resolution paths.
            </p>
          </header>

          <ComingSoon
            toolName="DNS Lookup Simulator"
            description="Simulate DNS propagation loops and record resolution paths."
          />

          <AeoSection
            toolName="DNS Lookup Simulator"
            whatIs="A DNS Lookup Simulator is an educational and diagnostic tool designed to visualize the hierarchical process of domain name resolution. It shows step-by-step how recursive resolvers query various name servers to locate records, helping developers understand propagation delays, TTL settings, and potential resolving loops."
            howToUse={[
              'Enter the domain name you wish to resolve in the lookup input field.',
              'Select the record type (e.g., A, CNAME, MX, TXT) you want to query.',
              'Click "Simulate Lookup" to view the visual step-by-step resolution path, caching nodes, and final record outputs.'
            ]}
            whyClientSide="Simulating DNS paths client-side provides instant, interactive feedback without triggering excessive network queries or taxing public DNS servers. Running the simulation logic in-browser allows users to manipulate TTLs and network latency settings in real time for testing."
          />
        </article>
      </main>
    </>
  );
}
