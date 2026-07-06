import { tools, Tool } from "@/lib/tools";
import { categoriesConfig, CategoryConfig } from "@/modules/categories/category.config";
import { hubsConfig, HubConfig } from "@/modules/content/best";
import { guidesConfig, GuideConfig } from "@/modules/content/guides";

export interface LinkItem {
  title: string;
  slug: string;
  href: string;
  description: string;
  type: "tool" | "category" | "hub" | "guide";
}

/**
 * Dynamic internal linking recommender.
 * Scores all pages against a current page and returns the top N contextual items.
 */
export function getRelatedLinks(
  currentSlug: string,
  currentCategory: string,
  currentKeywords: string[] = [],
  limit = 12
): LinkItem[] {
  const allItems: LinkItem[] = [];

  // 1. Gather all tools
  tools.forEach(t => {
    if (t.isReady && t.slug !== currentSlug) {
      allItems.push({
        title: t.name,
        slug: t.slug,
        href: `/tools/${t.slug}`,
        description: t.description,
        type: "tool"
      });
    }
  });

  // 2. Gather all categories
  categoriesConfig.forEach(c => {
    if (c.slug !== currentSlug) {
      allItems.push({
        title: c.title,
        slug: c.slug,
        href: `/${c.slug}`,
        description: c.description,
        type: "category"
      });
    }
  });

  // 3. Gather all hubs
  hubsConfig.forEach(h => {
    if (h.slug !== currentSlug) {
      allItems.push({
        title: h.title,
        slug: h.slug,
        href: `/${h.slug}`,
        description: h.introduction,
        type: "hub"
      });
    }
  });

  // 4. Gather all guides
  guidesConfig.forEach(g => {
    if (g.slug !== currentSlug) {
      allItems.push({
        title: g.title,
        slug: g.slug,
        href: `/guides/${g.slug}`,
        description: g.description,
        type: "guide"
      });
    }
  });

  // 5. Score items
  const scored = allItems.map(item => {
    let score = 0;

    // A. Match category key (High Priority)
    if (item.type === "tool") {
      const toolObj = tools.find(t => t.slug === item.slug);
      if (toolObj && toolObj.category === currentCategory) {
        score += 5;
      }
    } else if (item.type === "category") {
      const catObj = categoriesConfig.find(c => c.slug === item.slug);
      if (catObj && catObj.categoryKey === currentCategory) {
        score += 8;
      }
    }

    // B. Match keywords overlap
    let itemKeywords: string[] = [];
    if (item.type === "tool") {
      itemKeywords = tools.find(t => t.slug === item.slug)?.keywords || [];
    } else if (item.type === "category") {
      itemKeywords = categoriesConfig.find(c => c.slug === item.slug)?.keywords || [];
    } else if (item.type === "hub") {
      itemKeywords = hubsConfig.find(h => h.slug === item.slug)?.keywords || [];
    } else if (item.type === "guide") {
      itemKeywords = guidesConfig.find(g => g.slug === item.slug)?.keywords || [];
    }

    const matches = itemKeywords.filter(kw => 
      currentKeywords.some(ckw => ckw.toLowerCase() === kw.toLowerCase())
    );
    score += matches.length * 2;

    // C. Boost same type slightly if matched category
    if (item.type === "tool" && score > 0) score += 1;

    // D. Boost some popular items as fallbacks
    const popularSlugs = ["emi-calculator", "compress-pdf", "image-compressor", "json-formatter", "merge-pdf", "best-pdf-tools", "how-to-merge-pdf"];
    if (popularSlugs.includes(item.slug)) {
      score += 1;
    }

    return { item, score };
  });

  // Sort by score descending, then alphabetically
  const sorted = scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.title.localeCompare(b.item.title);
    })
    .map(x => x.item);

  return sorted.slice(0, limit);
}
