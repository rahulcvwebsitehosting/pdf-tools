import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisonsConfig, getComparisonBySlug } from "@/modules/content/comparisons";
import ComparisonPage from "@/components/comparison/ComparisonPage";

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisonsConfig.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  return {
    title: comparison.seoTitle,
    description: comparison.metaDescription,
    keywords: comparison.keywords,
    alternates: {
      canonical: `https://toolsatzero.com/compare/${slug}`,
    },
    openGraph: {
      title: comparison.seoTitle,
      description: comparison.metaDescription,
      url: `https://toolsatzero.com/compare/${slug}`,
      siteName: "ToolsAtZero",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.seoTitle,
      description: comparison.metaDescription,
    },
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://toolsatzero.com/compare/${slug}/#article`,
        url: `https://toolsatzero.com/compare/${slug}`,
        headline: comparison.title,
        description: comparison.metaDescription,
        inLanguage: "en-US",
        author: {
          "@type": "Organization",
          name: "ToolsAtZero",
          url: "https://toolsatzero.com",
        },
        publisher: {
          "@type": "Organization",
          name: "ToolsAtZero",
          url: "https://toolsatzero.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://toolsatzero.com/compare/${slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://toolsatzero.com" },
          { "@type": "ListItem", position: 2, name: "Compare", item: "https://toolsatzero.com" },
          { "@type": "ListItem", position: 3, name: comparison.title, item: `https://toolsatzero.com/compare/${slug}` },
        ],
      },
      ...(comparison.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `https://toolsatzero.com/compare/${slug}/#faq`,
              mainEntity: comparison.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <main className="min-h-screen bg-background text-foreground">
        <ComparisonPage comparison={comparison} />
      </main>
    </>
  );
}

export const dynamic = "force-static";
