import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Frequently Asked Questions | ToolsAtZero",
  description:
    "Get answers to common questions about ToolsAtZero — free, 100% client-side browser tools for PDF, developer, office, image, web, and time utilities. Learn about privacy, file safety, offline usage, and more.",
  keywords: [
    "ToolsAtZero FAQ",
    "free online tools",
    "client-side tools",
    "browser-based tools",
    "privacy tools",
    "PDF tools",
    "developer tools",
    "image tools",
    "file safety",
    "offline tools",
    "no upload tools",
  ],
  openGraph: {
    type: "website",
    title: "FAQ – Frequently Asked Questions | ToolsAtZero",
    description:
      "Get answers to common questions about ToolsAtZero — free, 100% client-side browser tools.",
    url: "https://toolsatzero.com/faq",
    siteName: "ToolsAtZero",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – Frequently Asked Questions | ToolsAtZero",
    description:
      "Get answers to common questions about ToolsAtZero — free, 100% client-side browser tools.",
  },
  alternates: {
    canonical: "https://toolsatzero.com/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
