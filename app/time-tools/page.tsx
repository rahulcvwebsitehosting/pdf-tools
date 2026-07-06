import type { Metadata } from "next";
import { getCategoryBySlug } from "@/modules/categories/category.config";
import CategoryLanding from "@/components/category/CategoryLanding";
import { notFound } from "next/navigation";

const categorySlug = "time-tools";

export function generateMetadata(): Metadata {
  const config = getCategoryBySlug(categorySlug);
  if (!config) return {};
  
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: {
      canonical: `https://toolsatzero.com/${categorySlug}`,
    },
    openGraph: {
      title: config.seo.title,
      description: config.seo.metaDescription,
      url: `https://toolsatzero.com/${categorySlug}`,
      siteName: "ToolsAtZero",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.metaDescription,
    },
  };
}

export default function TimeToolsPage() {
  const config = getCategoryBySlug(categorySlug);
  if (!config) notFound();

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://toolsatzero.com/${categorySlug}/#webpage`,
        "url": `https://toolsatzero.com/${categorySlug}`,
        "name": config.seo.title,
        "description": config.seo.metaDescription,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://toolsatzero.com/${categorySlug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://toolsatzero.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": config.title,
            "item": `https://toolsatzero.com/${categorySlug}`
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
