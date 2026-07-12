"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";

export function Footer() {
  const pathname = usePathname();
  const currentTool = tools.find(t => pathname === t.href || pathname.endsWith(t.slug));

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {pathname === "/" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 pb-12 border-b border-border">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">PDF Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools/protect-pdf" className="hover:text-foreground hover:underline transition-colors">Protect PDF</Link></li>
                <li><Link href="/tools/unlock-pdf" className="hover:text-foreground hover:underline transition-colors">Unlock PDF</Link></li>
                <li><Link href="/tools/compress-pdf" className="hover:text-foreground hover:underline transition-colors">Compress PDF</Link></li>
                <li><Link href="/tools/merge-pdf" className="hover:text-foreground hover:underline transition-colors">Merge PDF</Link></li>
                <li><Link href="/tools/split-pdf" className="hover:text-foreground hover:underline transition-colors">Split PDF</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Developer Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools/json-formatter" className="hover:text-foreground hover:underline transition-colors">JSON Formatter</Link></li>
                <li><Link href="/tools/base64-encoder-decoder" className="hover:text-foreground hover:underline transition-colors">Base64 Encoder</Link></li>
                <li><Link href="/tools/jwt-decoder" className="hover:text-foreground hover:underline transition-colors">JWT Decoder</Link></li>
                <li><Link href="/tools/sql-formatter" className="hover:text-foreground hover:underline transition-colors">SQL Formatter</Link></li>
                <li><Link href="/tools/uuid-generator" className="hover:text-foreground hover:underline transition-colors">UUID Generator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Text Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools/case-converter" className="hover:text-foreground hover:underline transition-colors">Case Converter</Link></li>
                <li><Link href="/tools/csv-to-json" className="hover:text-foreground hover:underline transition-colors">CSV to JSON</Link></li>
                <li><Link href="/tools/csv-to-excel" className="hover:text-foreground hover:underline transition-colors">CSV to Excel</Link></li>
                <li><Link href="/tools/word-counter" className="hover:text-foreground hover:underline transition-colors">Word Counter</Link></li>
                <li><Link href="/tools/find-replace" className="hover:text-foreground hover:underline transition-colors">Find & Replace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Image Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools/image-compressor" className="hover:text-foreground hover:underline transition-colors">Compressor</Link></li>
                <li><Link href="/tools/image-resizer" className="hover:text-foreground hover:underline transition-colors">Resizer</Link></li>
                <li><Link href="/tools/png-to-jpg" className="hover:text-foreground hover:underline transition-colors">PNG to JPG</Link></li>
                <li><Link href="/tools/jpg-to-png" className="hover:text-foreground hover:underline transition-colors">JPG to PNG</Link></li>
                <li><Link href="/tools/image-cropper" className="hover:text-foreground hover:underline transition-colors">Image Cropper</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Web Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools/url-encoder-decoder" className="hover:text-foreground hover:underline transition-colors">URL Encoder</Link></li>
                <li><Link href="/tools/html-minifier" className="hover:text-foreground hover:underline transition-colors">HTML Minify</Link></li>
                <li><Link href="/tools/css-minifier" className="hover:text-foreground hover:underline transition-colors">CSS Minify</Link></li>
                <li><Link href="/tools/javascript-minifier" className="hover:text-foreground hover:underline transition-colors">JS Minify</Link></li>
                <li><Link href="/tools/meta-tag-generator" className="hover:text-foreground hover:underline transition-colors">Meta Tags</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Time Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools/epoch-converter" className="hover:text-foreground hover:underline transition-colors">Epoch Converter</Link></li>
                <li><Link href="/tools/time-zone-converter" className="hover:text-foreground hover:underline transition-colors">Timezones</Link></li>
                <li><Link href="/tools/date-difference" className="hover:text-foreground hover:underline transition-colors">Date Difference</Link></li>
                <li><Link href="/tools/time-calculator" className="hover:text-foreground hover:underline transition-colors">Time Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Calculators</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools/gst-calculator" className="hover:text-foreground hover:underline transition-colors">GST Calculator</Link></li>
                <li><Link href="/tools/emi-calculator" className="hover:text-foreground hover:underline transition-colors">EMI Calculator</Link></li>
                <li><Link href="/tools/sip-calculator" className="hover:text-foreground hover:underline transition-colors">SIP Calculator</Link></li>
                <li><Link href="/tools/scientific-calculator" className="hover:text-foreground hover:underline transition-colors">Scientific Calculator</Link></li>
                <li><Link href="/tools/bmi-calculator" className="hover:text-foreground hover:underline transition-colors">BMI Calculator</Link></li>
              </ul>
            </div>
          </div>
        ) : currentTool ? (
          <div className="pb-12 border-b border-border space-y-6">
            <div>
              <h3 className="font-editorial text-2xl font-bold">
                More {currentTool.category.toUpperCase()} Tools
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Explore related tools in this category.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {tools
                .filter(t => t.category === currentTool.category && t.slug !== currentTool.slug)
                .slice(0, 6)
                .map(sibling => (
                  <Link
                    key={sibling.slug}
                    href={sibling.href}
                    className="editorial-card p-3 flex flex-col justify-between text-sm font-semibold hover:border-primary transition-all hover:-translate-y-0.5"
                  >
                    <span className="truncate">{sibling.name}</span>
                    <span className="text-[11px] text-muted-foreground mt-2 block">Launch →</span>
                  </Link>
                ))}
            </div>
          </div>
        ) : null}

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-lg font-extrabold text-foreground">
              ToolsAtZero
            </span>
            <p className="text-xs text-muted-foreground">
              Built by <a href="https://rahulshyam-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Rahul S</a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              All Tools
            </Link>
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
