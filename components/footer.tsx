"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-white/10 bg-[#1a1f2e] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 ToolsAtZero. All processing happens in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
