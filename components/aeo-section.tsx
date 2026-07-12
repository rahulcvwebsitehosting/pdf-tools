import Link from "next/link";
import { tools } from "@/lib/tools";
import { getRelatedLinks } from "@/lib/tools-engine/seo/linking";
import { AlertCircle, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";

interface AeoSectionProps {
  toolName: string;
  whatIs: string;
  howToUse: string[];
  whyClientSide: string;
}

export function AeoSection({
  toolName,
  whatIs,
  howToUse,
  whyClientSide,
}: AeoSectionProps) {
  // Infer active tool details dynamically
  const matchedTool = tools.find(t => 
    t.name.toLowerCase() === toolName.toLowerCase() ||
    toolName.toLowerCase().includes(t.name.toLowerCase()) ||
    t.name.toLowerCase().includes(toolName.toLowerCase())
  );

  const currentSlug = matchedTool?.slug || "";
  const currentCategory = matchedTool?.category || "pdf";
  const currentKeywords = matchedTool?.keywords || [];

  // Generate 12 related links
  const relatedLinks = getRelatedLinks(currentSlug, currentCategory, currentKeywords, 12);

  // Auto-generate AI summary highlights
  const keyTakeaways = [
    "100% private: Processing runs entirely in browser memory buffers.",
    "Zero upload latency: Instant local generation without network queue delay.",
    "Safe and secure: No files, metrics, or personal inputs are logged on any server."
  ];

  const commonMistakes = [
    "Uploading highly confidential documents to server-based formatting sites.",
    "Forgetting to check the file size outputs (ensure you keep local backups).",
    "Assuming online tools are inherently private without checking their code structures."
  ];

  return (
    <section className="mt-16 pt-12 border-t border-border space-y-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* AEO Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Answer */}
          <div className="md:col-span-2 border border-border bg-accent/5 p-5 space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground flex items-center gap-1.5 border-b border-border pb-2">
              <Sparkles size={13} className="text-yellow-600" />
              <span>Quick AI Answer</span>
            </h4>
            <p className="font-mono text-xs leading-relaxed text-foreground select-all">
              {whatIs.slice(0, 160)}... Runs locally in your browser sandbox using secure script computations. Whiteboard security parameters apply.
            </p>
          </div>

          {/* Metadata info */}
          <div className="border border-border bg-secondary p-5 space-y-2 font-mono text-[10px]">
            <div>
              <span className="font-bold block text-muted-foreground uppercase">Privacy Status</span>
              <span className="font-bold text-green-700 flex items-center gap-1 mt-0.5">
                <CheckCircle size={10} />
                <span>100% PRIVATE</span>
              </span>
            </div>
            <div>
              <span className="font-bold block text-muted-foreground uppercase">Last Updated</span>
              <span className="font-bold text-foreground">June 30, 2026</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <article className="space-y-4">
          <h3 className="text-2xl font-editorial font-bold uppercase tracking-tight text-foreground">
            What is a Free {toolName} Online Utility?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {whatIs}
          </p>
        </article>

        {/* How it works */}
        <article className="space-y-4">
          <h3 className="text-2xl font-editorial font-bold uppercase tracking-tight text-foreground">
            Step-by-Step Instructions to use {toolName}
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm leading-relaxed">
            {howToUse.map((step, i) => (
              <li key={i} className="pl-1">{step}</li>
            ))}
          </ol>
        </article>

        {/* Why secure */}
        <article className="space-y-4">
          <h3 className="text-2xl font-editorial font-bold uppercase tracking-tight text-foreground">
            Why Local Browser Processing is Secure
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {whyClientSide}
          </p>
        </article>

        {/* Key Takeaways & Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
              <CheckCircle size={13} className="text-green-700" />
              <span>Key Takeaways</span>
            </h4>
            <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
              {keyTakeaways.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-foreground flex items-center gap-1.5">
              <AlertCircle size={13} className="text-red-700" />
              <span>Common Mistakes</span>
            </h4>
            <ul className="space-y-1.5 font-mono text-[10px] text-muted-foreground list-disc list-inside">
              {commonMistakes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="border border-red-500 bg-red-500/5 p-4 flex gap-3 items-start">
          <ShieldAlert size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-mono text-[10px] uppercase font-bold text-red-700">Privacy Policy Notice</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All processing happens locally in your browser. Files and data are never uploaded or stored.
            </p>
          </div>
        </div>

        {/* Related Tools Panel (8-12 links) */}
        <div className="space-y-6 pt-12 border-t border-border">
          <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-foreground">
            Related Privacy-First Tools & Resources
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedLinks.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="editorial-card p-3 border border-border bg-background hover:bg-accent/25 hover:text-primary transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                    {item.type}
                  </span>
                  <span className="font-bold text-xs block truncate leading-tight">
                    {item.title}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-muted-foreground text-right mt-4 block">
                  Open Tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
