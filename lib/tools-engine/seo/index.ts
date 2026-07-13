import type { Metadata } from "next";
import { ToolRegistryConfig } from "../registry/types";

export function generateToolMetadata(config: ToolRegistryConfig): Metadata {
  const baseUrl = "https://pdf-tools-cv.vercel.app";
  const url = `${baseUrl}/tools/${config.slug}`;
  const title = `Free ${config.title} Online | 100% Private | ToolsAtZero`;
  const description = config.description;

  return {
    title,
    description,
    keywords: [
      `free ${config.slug.replace(/-/g, " ")}`,
      `${config.slug.replace(/-/g, " ")} online`,
      `free ${config.slug.replace(/-/g, " ")} online`,
      ...config.keywords,
      "free online tools",
      "privacy first",
      "no upload",
      "browser tool",
      "ToolsAtZero",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ToolsAtZero",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
