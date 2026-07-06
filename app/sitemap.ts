import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdf-tools-cv.vercel.app";

  const toolUrls = tools
    .filter((tool) => tool.isReady)
    .map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ];

  return [...staticUrls, ...toolUrls];
}
