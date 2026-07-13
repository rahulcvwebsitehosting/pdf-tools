import { ToolRegistryConfig } from "../registry/types";

export function generateToolSchemas(config: ToolRegistryConfig) {
  const baseUrl = "https://pdf-tools-cv.vercel.app";
  const url = `${baseUrl}/tools/${config.slug}`;
  const title = `Free ${config.title} Online | 100% Private | ToolsAtZero`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: config.description,
    url: url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All (Web Browser)",
    browserRequirements: "HTML5 compatible browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    permissions: "none",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.category.charAt(0).toUpperCase() + config.category.slice(1) + "s",
        item: `${baseUrl}/#${config.category}s`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.title,
        item: url,
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToolsAtZero",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToolsAtZero",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const steps = config.formula.workedExample.steps || [];
  const howToSchema = steps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to calculate using ${config.title}`,
    description: config.formula.explanation,
    step: steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text: step,
    })),
  } : null;

  return {
    webAppSchema,
    faqSchema,
    breadcrumbSchema,
    organizationSchema,
    websiteSchema,
    howToSchema,
  };
}
