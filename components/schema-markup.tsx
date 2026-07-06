interface SchemaMarkupProps {
  toolName: string;
  toolDescription: string;
  toolUrl: string;
  faqs: { question: string; answer: string }[];
}

export function SchemaMarkup({
  toolName,
  toolDescription,
  toolUrl,
  faqs,
}: SchemaMarkupProps) {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolName,
    description: toolDescription,
    url: `https://toolsatzero.com${toolUrl}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (Web Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    permissions: "none",
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
