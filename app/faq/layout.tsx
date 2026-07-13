import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Frequently Asked Questions | PDF Tools",
  description:
    "Get answers to common questions about PDF Tools — 131 free, 100% client-side PDF utilities and dozens of developer, image, text, web, time, and calculator tools. Learn about privacy, file safety, PyMuPDF processing, offline usage, and more.",
  keywords: [
    "PDF Tools FAQ",
    "free PDF tools",
    "client-side PDF tools",
    "browser-based PDF tools",
    "PyMuPDF",
    "privacy tools",
    "PDF merge",
    "PDF split",
    "PDF compress",
    "no upload PDF",
    "offline PDF tools",
  ],
  openGraph: {
    type: "website",
    title: "FAQ – Frequently Asked Questions | PDF Tools",
    description:
      "Get answers to common questions about PDF Tools — 131 free, 100% client-side browser-based PDF utilities.",
    url: "https://pdf-tools-cv.vercel.app/faq",
    siteName: "PDF Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – Frequently Asked Questions | PDF Tools",
    description:
      "Get answers to common questions about PDF Tools — 131 free, 100% client-side browser-based PDF utilities.",
  },
  alternates: {
    canonical: "https://pdf-tools-cv.vercel.app/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
