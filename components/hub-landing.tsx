import Link from "next/link";
import { HubConfig } from "@/modules/content/best";
import { ShieldAlert, Sparkles, CheckCircle, HelpCircle } from "lucide-react";

interface HubLandingProps {
  config: HubConfig;
}

export default function HubLanding({ config }: HubLandingProps) {
  return (
    <main className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">{config.title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 border-b border-black pb-8">
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none">
            {config.title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl">
            {config.introduction}
          </p>
        </header>

        {/* Takeaways */}
        <div className="border border-black bg-accent/5 p-5 space-y-3">
          <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5 border-b border-black/15 pb-2">
            <Sparkles size={13} className="text-yellow-600" />
            <span>Key Takeaways</span>
          </h4>
          <ul className="list-disc list-inside space-y-2 font-mono text-[10px] text-muted-foreground">
            {config.keyTakeaways.map((item, idx) => (
              <li key={idx} className="pl-1">{item}</li>
            ))}
          </ul>
        </div>

        {/* Comparison Matrix Table */}
        <section className="space-y-4">
          <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
            {config.comparisonTitle}
          </h3>
          <div className="border border-black overflow-x-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-secondary border-b border-black">
                  <th className="p-3 font-bold border-r border-black">Tool Name</th>
                  <th className="p-3 font-bold border-r border-black">Key Features</th>
                  <th className="p-3 font-bold">Privacy Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {config.tools.map((t, idx) => (
                  <tr key={idx} className="hover:bg-accent/5">
                    <td className="p-3 border-r border-black font-bold whitespace-nowrap">
                      <Link href={`/tools/${t.slug}`} className="hover:underline text-foreground">
                        {t.name} →
                      </Link>
                    </td>
                    <td className="p-3 border-r border-black text-muted-foreground">{t.features}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-green-700/20 bg-green-700/5 text-green-700 font-bold text-[9px] uppercase">
                        <CheckCircle size={8} />
                        <span>{t.privacy}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Privacy Shield */}
        <div className="border border-red-500 bg-red-500/5 p-4 flex gap-3 items-start">
          <ShieldAlert size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-mono text-[10px] uppercase font-bold text-red-700">Client-Side Architecture Guarantee</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All processing happens locally in your browser. Files and data are never uploaded or stored.
            </p>
          </div>
        </div>

        {/* FAQs */}
        {config.faqs && config.faqs.length > 0 && (
          <section className="space-y-6 pt-12 border-t border-black">
            <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
              <HelpCircle size={22} className="text-muted-foreground" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2 font-mono">
                  <h4 className="text-xs font-bold text-foreground">
                    Q: {faq.question}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <footer className="pt-12 border-t border-black space-y-4">
          <h4 className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
            Quick Exploration links
          </h4>
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="font-mono text-[10px] px-3 py-1.5 border border-black bg-background hover:bg-accent transition-colors">
              ← Home Page
            </Link>
            <Link href="/calculators" className="font-mono text-[10px] px-3 py-1.5 border border-black bg-background hover:bg-accent transition-colors">
              Free Calculators
            </Link>
            <Link href="/pdf-tools" className="font-mono text-[10px] px-3 py-1.5 border border-black bg-background hover:bg-accent transition-colors">
              Free PDF Tools
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
