import { ToolRegistryConfig } from "@/lib/tools-engine/registry/types";
import { generateToolSchemas } from "@/lib/tools-engine/schema";

interface SEOSectionProps {
  config: ToolRegistryConfig;
}

export default function SEOSection({ config }: SEOSectionProps) {
  const schemas = generateToolSchemas(config);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.webAppSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.websiteSchema),
        }}
      />
      {schemas.howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.howToSchema),
          }}
        />
      )}
    </>
  );
}
