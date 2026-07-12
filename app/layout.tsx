import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "PDF Tools - Free Online PDF Utilities",
    template: "%s | PDF Tools",
  },
  description:
    "Free online PDF tools, image tools, text tools, developer tools, and calculators. 100% client-side processing.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "free online tools",
    "pdf tools",
    "image tools",
    "text tools",
    "developer tools",
    "client-side tools",
    "browser based tools",
    "no upload tools",
    "JSON formatter",
    "Base64 encoder",
    "PDF compressor",
    "PDF merger",
    "word counter",
    "CSV to JSON",
  ],
  metadataBase: new URL("https://pdf-tools-cv.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased" suppressHydrationWarning>
        <Header />
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
