import type { Metadata } from "next";
import { getCategoryBySlug } from "@/modules/categories/category.config";
import CategoryLanding from "@/components/category/CategoryLanding";
import { notFound } from "next/navigation";

const categorySlug = "text-tools";

export function generateMetadata(): Metadata {
  const config = getCategoryBySlug(categorySlug);
  if (!config) return {};
  
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: {
      canonical: `https://pdf-tools-cv.vercel.app/${categorySlug}`,
    },
    openGraph: {
      title: config.seo.title,
      description: config.seo.metaDescription,
      url: `https://pdf-tools-cv.vercel.app/${categorySlug}`,
      siteName: "PDF Tools",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.metaDescription,
    },
  };
}

export default function TextToolsPage() {
  const config = getCategoryBySlug(categorySlug);
  if (!config) notFound();

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://pdf-tools-cv.vercel.app/${categorySlug}/#webpage`,
        "url": `https://pdf-tools-cv.vercel.app/${categorySlug}`,
        "name": config.seo.title,
        "description": config.seo.metaDescription,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://pdf-tools-cv.vercel.app/${categorySlug}/#breadcrumb`,
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
            "item": `https://pdf-tools-cv.vercel.app/${categorySlug}`
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
      <CategoryLanding slug={categorySlug} />
    </>
  );
}
export const dynamic = "force-static";
