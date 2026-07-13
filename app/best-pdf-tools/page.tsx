import type { Metadata } from "next";
import { getHubBySlug } from "@/modules/content/best";
import HubLanding from "@/components/hub-landing";
import { notFound } from "next/navigation";

const hubSlug = "best-pdf-tools";

export function generateMetadata(): Metadata {
  const config = getHubBySlug(hubSlug);
  if (!config) return {};
  
  return {
    title: config.seoTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: {
      canonical: `https://pdf-tools-cv.vercel.app/${hubSlug}`,
    },
    openGraph: {
      title: config.seoTitle,
      description: config.metaDescription,
      url: `https://pdf-tools-cv.vercel.app/${hubSlug}`,
      siteName: "PDF Tools",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seoTitle,
      description: config.metaDescription,
    },
  };
}

export default function BestPdfToolsPage() {
  const config = getHubBySlug(hubSlug);
  if (!config) notFound();

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pdf-tools-cv.vercel.app/${hubSlug}/#webpage`,
        "url": `https://pdf-tools-cv.vercel.app/${hubSlug}`,
        "name": config.seoTitle,
        "description": config.metaDescription,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://pdf-tools-cv.vercel.app/${hubSlug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pdf-tools-cv.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": config.title,
            "item": `https://pdf-tools-cv.vercel.app/${hubSlug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HubLanding config={config} />
    </>
  );
}
export const dynamic = "force-static";
