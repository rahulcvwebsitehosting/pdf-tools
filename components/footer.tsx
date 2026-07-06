"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";

export function Footer() {
  const pathname = usePathname();
  const currentTool = tools.find(t => pathname === t.href || pathname.endsWith(t.slug));

  return (
    <footer className="editorial-border-t bg-background mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {pathname === "/" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 pb-12 border-b border-black">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase mb-4 border-b border-black pb-1">PDF Tools</h4>
              <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <li><Link href="/tools/protect-pdf" className="hover:underline hover:text-foreground">Protect PDF</Link></li>
                <li><Link href="/tools/unlock-pdf" className="hover:underline hover:text-foreground">Unlock PDF</Link></li>
                <li><Link href="/tools/compress-pdf" className="hover:underline hover:text-foreground">Compress PDF</Link></li>
                <li><Link href="/tools/merge-pdf" className="hover:underline hover:text-foreground">Merge PDF</Link></li>
                <li><Link href="/tools/split-pdf" className="hover:underline hover:text-foreground">Split PDF</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase mb-4 border-b border-black pb-1">Developer Tools</h4>
              <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <li><Link href="/tools/json-formatter" className="hover:underline hover:text-foreground">JSON Formatter</Link></li>
                <li><Link href="/tools/base64-encoder-decoder" className="hover:underline hover:text-foreground">Base64 Encoder</Link></li>
                <li><Link href="/tools/jwt-decoder" className="hover:underline hover:text-foreground">JWT Decoder</Link></li>
                <li><Link href="/tools/sql-formatter" className="hover:underline hover:text-foreground">SQL Formatter</Link></li>
                <li><Link href="/tools/uuid-generator" className="hover:underline hover:text-foreground">UUID Generator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase mb-4 border-b border-black pb-1">Text Tools</h4>
              <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <li><Link href="/tools/case-converter" className="hover:underline hover:text-foreground">Case Converter</Link></li>
                <li><Link href="/tools/csv-to-json" className="hover:underline hover:text-foreground">CSV to JSON</Link></li>
                <li><Link href="/tools/csv-to-excel" className="hover:underline hover:text-foreground">CSV to Excel</Link></li>
                <li><Link href="/tools/word-counter" className="hover:underline hover:text-foreground">Word Counter</Link></li>
                <li><Link href="/tools/find-replace" className="hover:underline hover:text-foreground">Find & Replace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase mb-4 border-b border-black pb-1">Image Tools</h4>
              <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <li><Link href="/tools/image-compressor" className="hover:underline hover:text-foreground">Compressor</Link></li>
                <li><Link href="/tools/image-resizer" className="hover:underline hover:text-foreground">Resizer</Link></li>
                <li><Link href="/tools/png-to-jpg" className="hover:underline hover:text-foreground">PNG to JPG</Link></li>
                <li><Link href="/tools/jpg-to-png" className="hover:underline hover:text-foreground">JPG to PNG</Link></li>
                <li><Link href="/tools/image-cropper" className="hover:underline hover:text-foreground">Image Cropper</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase mb-4 border-b border-black pb-1">Web Tools</h4>
              <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <li><Link href="/tools/url-encoder-decoder" className="hover:underline hover:text-foreground">URL Encoder</Link></li>
                <li><Link href="/tools/html-minifier" className="hover:underline hover:text-foreground">HTML Minify</Link></li>
                <li><Link href="/tools/css-minifier" className="hover:underline hover:text-foreground">CSS Minify</Link></li>
                <li><Link href="/tools/javascript-minifier" className="hover:underline hover:text-foreground">JS Minify</Link></li>
                <li><Link href="/tools/meta-tag-generator" className="hover:underline hover:text-foreground">Meta Tags</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase mb-4 border-b border-black pb-1">Time Tools</h4>
              <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <li><Link href="/tools/epoch-converter" className="hover:underline hover:text-foreground">Epoch Converter</Link></li>
                <li><Link href="/tools/time-zone-converter" className="hover:underline hover:text-foreground">Timezones</Link></li>
                <li><Link href="/tools/date-difference" className="hover:underline hover:text-foreground">Date Difference</Link></li>
                <li><Link href="/tools/time-calculator" className="hover:underline hover:text-foreground">Time Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase mb-4 border-b border-black pb-1">Calculators</h4>
              <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <li><Link href="/tools/gst-calculator" className="hover:underline hover:text-foreground">GST Calculator</Link></li>
                <li><Link href="/tools/emi-calculator" className="hover:underline hover:text-foreground">EMI Calculator</Link></li>
                <li><Link href="/tools/sip-calculator" className="hover:underline hover:text-foreground">SIP Calculator</Link></li>
                <li><Link href="/tools/scientific-calculator" className="hover:underline hover:text-foreground">Scientific Calculator</Link></li>
                <li><Link href="/tools/bmi-calculator" className="hover:underline hover:text-foreground">BMI Calculator</Link></li>
              </ul>
            </div>
          </div>
        ) : currentTool ? (
          <div className="pb-12 border-b border-black space-y-6">
            <div>
              <h3 className="font-editorial text-2xl font-bold uppercase">
                More {currentTool.category.toUpperCase()} Tools
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-1">
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
                    className="editorial-card p-3 flex flex-col justify-between font-mono text-[11px] uppercase font-bold hover:bg-accent transition-all hover:-translate-y-0.5"
                  >
                    <span className="truncate">{sibling.name}</span>
                    <span className="text-[9px] text-muted-foreground mt-2 block">Launch →</span>
                  </Link>
                ))}
            </div>
          </div>
        ) : null}

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-lg font-editorial text-foreground font-black">
              Tools
            </span>
            <p className="text-[10px] font-mono text-muted-foreground">
              Built by <a href="https://rahulshyam-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Rahul S</a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-muted-foreground">
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
