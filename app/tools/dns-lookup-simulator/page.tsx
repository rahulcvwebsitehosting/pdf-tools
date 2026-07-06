import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
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

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Simulate DNS propagation loops and record resolution paths. Trace recursive queries across Root, TLD, and Authoritative nameservers.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="DNS Lookup Simulator" description="Simulate DNS propagation loops and record resolution paths. Trace recursive queries across Root, TLD, and Authoritative nameservers." />
        </div>
      </div>
    </main>
    </>
  );
}
