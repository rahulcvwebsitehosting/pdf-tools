import type { Metadata } from "next";
import Link from "next/link";
import { Shield, EyeOff, KeyRound, ServerOff, Cookie, Database, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ToolsAtZero",
  description:
    "Review the Privacy Policy for ToolsAtZero. Learn about our local browser-side processing, analytics usage, cookie policy, and data security standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider hover:underline mb-8"
        >
          ← Return to Workbench
        </Link>

        {/* Page Header */}
        <div className="space-y-4 mb-10">
          <span className="neon-badge px-3 py-1 text-xs">
            PRIVACY STANDARDS
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight border-b-2 border-black pb-6">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase">
            Last Updated: June 30, 2026 | Document Reference: TA-PRIV-2026-V3
          </p>
        </div>

        {/* Giant Yellow Banner */}
        <div className="bg-accent border-2 border-black p-6 sm:p-8 text-black mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-mono text-sm sm:text-base font-black uppercase tracking-wider leading-relaxed">
            🔒 PRIVACY-FIRST OPERATION: All 102 tools run 100% locally inside your browser's sandboxed environment. Your files and input do not touch our servers.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 font-sans text-sm sm:text-base leading-relaxed">
          
          {/* Section: Local Processing */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <ServerOff className="w-6 h-6" /> Local Processing
            </h2>
            <p>
              ToolsAtZero is designed for absolute client-side execution. All 102 production tools (including PDF utilities, image compressors, code formatters, and time zone calculators) process files and input data entirely inside your browser's sandboxed memory frame (RAM).
            </p>
            <p>
              Under this architecture, your input documents, keys, text payloads, and images never leave your local device. All processed data is purged automatically from transient RAM when you close the active browser tab.
            </p>
          </section>

          {/* Section: Cloud Processing */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Database className="w-6 h-6" /> Cloud Processing & APIs
            </h2>
            <p>
              Every active utility on ToolsAtZero operates 100% offline once the page assets are loaded. While the platform operates strictly client-side today, if any future advanced features require cloud computation or external API connections, those tools will feature prominent warnings prior to any file selection or submission.
            </p>
          </section>

          {/* Section: Information We Collect */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <EyeOff className="w-6 h-6" /> Information We Collect
            </h2>
            <p>
              We strive to collect the minimum necessary data to maintain and optimize the platform. We do not require account registration to access our basic local tools, meaning we do not harvest names, emails, or personal identifiers.
            </p>
            <p>
              For tools that execute locally in your browser, we do not access or collect the contents of your uploaded documents, media, or copy-pasted files.
            </p>
          </section>

          {/* Section: Analytics */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Shield className="w-6 h-6" /> Analytics
            </h2>
            <p>
              To understand traffic patterns and diagnose technical issues, we use Google Analytics (or equivalent web analytics platforms). These services may collect anonymous website usage details, including page views, referrer links, geographic region, and device configurations.
            </p>
            <p>
              These analytics datasets are used strictly to evaluate site performance and design layout improvements. They do not intercept or monitor the file inputs or text processing handled within locally running sandboxed tools.
            </p>
          </section>

          {/* Section: Cookies & Local Storage */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Cookie className="w-6 h-6" /> Cookies & Local Storage
            </h2>
            <p>
              We may utilize essential cookies or native browser <code>localStorage</code> to store user configurations, such as your UI dark/light mode preference or temporary search history inside the command palette.
            </p>
            <p>
              Third-party services (such as our analytics providers) may deploy cookies to identify unique user metrics across sessions. You can restrict or block cookies completely through your personal web browser's preference panel.
            </p>
          </section>

          {/* Section: Third-Party Services */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <KeyRound className="w-6 h-6" /> Third-Party Services
            </h2>
            <p>
              Our tools may utilize external packages, scripts, or content deliveries (such as CDN endpoints for icon files or code packages). When you access our pages, third-party CDNs or networks may receive standard request metadata like your IP address.
            </p>
            <p>
              We advise auditing the policies of external services you depend on while utilizing web applications.
            </p>
          </section>

          {/* Section: Future Advertising */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Shield className="w-6 h-6" /> Future Advertising Partners
            </h2>
            <p>
              ToolsAtZero does not currently serve ads. However, to fund ongoing development and hosting, we may integrate advertising programs (such as Google AdSense) in the future.
            </p>
            <p>
              If advertising partners are introduced, they may deploy their own tracking technologies, cookies, and personalized ad scripts. This Privacy Policy will be revised at that time to detail those advertising platforms.
            </p>
          </section>

          {/* Section: Data Retention */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Shield className="w-6 h-6" /> Data Retention
            </h2>
            <p>
              Since files processed through our local browser tools are loaded purely into transient RAM, we do not store, catalog, or retain your raw utility inputs or generated outputs on any servers.
            </p>
            <p>
              If you use a cloud-based or API-driven tool, data retention policies specific to that utility will be made clear at the point of interaction.
            </p>
          </section>

          {/* Section: Security */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Shield className="w-6 h-6" /> Security
            </h2>
            <p>
              Although client-side processing minimizes backend data exposures, we remind users that local security is dependent on their host machine and browser environment.
            </p>
            <p>
              Rogue or overly permissive browser extensions, scrapers, or local malware can compromise active tabs. We encourage the use of sandboxed environments (such as private tabs) when working with highly sensitive files.
            </p>
          </section>

          {/* Section: Children's Privacy */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <EyeOff className="w-6 h-6" /> Children's Privacy
            </h2>
            <p>
              Our tools are not directed to children under the age of 13. We do not intentionally or knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.
            </p>
          </section>

          {/* Section: User Rights */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <KeyRound className="w-6 h-6" /> User Rights & Compliance
            </h2>
            <p>
              We strive to comply with applicable privacy laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), where applicable.
            </p>
            <p>
              Because we do not store your private documents, files, or identity profiles, standard requests to access, modify, or delete your files are not actionable since we possess no such record databases.
            </p>
          </section>

          {/* Section: Changes to this Policy */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <RefreshCw className="w-6 h-6" /> Changes to this Policy
            </h2>
            <p>
              We reserve the right to revise this Privacy Policy to reflect platform upgrades, legal mandates, or new advertising services. Revisions will be posted here with an updated effective date.
            </p>
          </section>

          {/* Section: Contact Information */}
          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Mail className="w-6 h-6" /> Contact Information
            </h2>
            <p>
              For privacy inquiries, technical suggestions, or clarification regarding local processing behaviors, please contact us at: <a href="mailto:support@toolsatzero.com" className="underline font-mono">support@toolsatzero.com</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
