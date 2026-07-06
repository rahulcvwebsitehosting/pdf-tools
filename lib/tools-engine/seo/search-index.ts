import { tools } from "@/lib/tools";
import { categoriesConfig } from "@/modules/categories/category.config";
import { hubsConfig } from "@/modules/content/best";
import { guidesConfig } from "@/modules/content/guides";

export interface SearchIndexItem {
  title: string;
  subtitle: string;
  slug: string;
  href: string;
  category: string;
  type: "tool" | "category" | "hub" | "guide";
  keywords: string[];
  description: string;
}

export function getSearchIndex(): SearchIndexItem[] {
  const index: SearchIndexItem[] = [];

  // 1. Tools
  tools.forEach(t => {
    if (t.isReady) {
      index.push({
        title: t.name,
        subtitle: `Free ${t.category} Tool`,
        slug: t.slug,
        href: t.href || `/tools/${t.slug}`,
        category: t.category,
        type: "tool",
        keywords: t.keywords || [],
        description: t.description
      });
    }
  });

  // 2. Categories
  categoriesConfig.forEach(c => {
    index.push({
      title: `${c.title} Category`,
      subtitle: "Tool Suite Landing Page",
      slug: c.slug,
      href: `/${c.slug}`,
      category: c.categoryKey,
      type: "category",
      keywords: c.keywords || [],
      description: c.description
    });
  });

  // 3. Hubs
  hubsConfig.forEach(h => {
    index.push({
      title: h.title,
      subtitle: "SEO Topical Authority Hub",
      slug: h.slug,
      href: `/${h.slug}`,
      category: "hub",
      type: "hub",
      keywords: h.keywords || [],
      description: h.introduction
    });
  });

  // 4. Guides
  guidesConfig.forEach(g => {
    index.push({
      title: g.title,
      subtitle: `${g.meta.readingTimeMinutes} min Guide`,
      slug: g.slug,
      href: `/guides/${g.slug}`,
      category: "guide",
      type: "guide",
      keywords: g.keywords || [],
      description: g.description
    });
  });

  return index;
}
