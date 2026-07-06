import type { Metadata } from "next";
import Link from "next/link";
import { Shield, EyeOff, ServerOff, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the PDF Tools website. All processing is 100% client-side. No data is uploaded or stored.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider hover:underline mb-8"
        >
          ← Back to Tools
        </Link>

        <div className="space-y-4 mb-10">
          <span className="neon-badge px-3 py-1 text-xs">
            PRIVACY
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight border-b-2 border-black pb-6">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase">
            Last Updated: July 2026
          </p>
        </div>

        <div className="bg-accent border-2 border-black p-6 sm:p-8 text-black mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-mono text-sm sm:text-base font-black uppercase tracking-wider leading-relaxed">
            All tools run 100% locally inside your browser. Your files never leave your device.
          </p>
        </div>

        <div className="space-y-10 font-sans text-sm sm:text-base leading-relaxed">

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <ServerOff className="w-6 h-6" /> Local Processing
            </h2>
            <p>
              Every tool on this website processes data entirely inside your browser's memory (RAM). No files, text, or uploaded content is ever transmitted to any server.
            </p>
            <p>
              All processed data is automatically cleared when you close the browser tab.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <EyeOff className="w-6 h-6" /> Information We Collect
            </h2>
            <p>
              We do not collect, store, or process any personal information. No account registration is required. No emails, names, or identifiers are harvested.
            </p>
            <p>
              We do not access or log the contents of your uploaded documents, images, or text inputs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Shield className="w-6 h-6" /> Third-Party Services
            </h2>
            <p>
              This website does not use analytics trackers, advertising cookies, or third-party data processors. The site is hosted on Vercel, which may collect standard server logs (IP address, browser type) for operational purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <RefreshCw className="w-6 h-6" /> Changes to This Policy
            </h2>
            <p>
              We may update this policy as needed. Changes will be posted on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight border-b border-black pb-2 flex items-center gap-2">
              <Mail className="w-6 h-6" /> Contact
            </h2>
            <p>
              For questions about this policy, reach out at: <a href="mailto:rahulcvfiitjee@gmail.com" className="underline font-mono">rahulcvfiitjee@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
