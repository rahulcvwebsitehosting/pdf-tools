/* ═══════════════════════════════════════════════════════════════════════════
 * Universal Content Registry — Single lookup for all content types
 * ═══════════════════════════════════════════════════════════════════════════
 * Every content module registers itself here.
 * Consumers query by ID, slug, type, entity, or free-text search.
 * ═══════════════════════════════════════════════════════════════════════════ */

import type {
  BaseContent,
  ContentType,
  GuideContent,
  ComparisonContent,
  BestOfContent,
  WorkflowContent,
  EntityRef,
} from "./schema";

// ─── Internal stores ──────────────────────────────────────────────────────

const contentById = new Map<string, BaseContent>();
const contentBySlug = new Map<string, BaseContent>();
const contentByType = new Map<ContentType, BaseContent[]>();
const entityById = new Map<string, EntityRef>();

// ─── Registration functions ───────────────────────────────────────────────

function registerContent(content: BaseContent): void {
  contentById.set(content.id, content);
  contentBySlug.set(content.slug, content);

  const list = contentByType.get(content.type) ?? [];
  list.push(content);
  contentByType.set(content.type, list);
}

export function registerGuide(guide: GuideContent): void {
  registerContent(guide);
}

export function registerComparison(comparison: ComparisonContent): void {
  registerContent(comparison);
}

export function registerBestOf(bestof: BestOfContent): void {
  registerContent(bestof);
}

export function registerWorkflow(workflow: WorkflowContent): void {
  registerContent(workflow);
}

export function registerEntity(entity: EntityRef): void {
  entityById.set(entity.id, entity);
}

// ─── Lookup functions ─────────────────────────────────────────────────────

export function getContentById(id: string): BaseContent | undefined {
  return contentById.get(id);
}

export function getContentBySlug(slug: string): BaseContent | undefined {
  return contentBySlug.get(slug);
}

export function getContentByType(type: ContentType): BaseContent[] {
  return contentByType.get(type) ?? [];
}

export function getAllContent(): BaseContent[] {
  return Array.from(contentById.values());
}

export function getEntityRefById(id: string): EntityRef | undefined {
  return entityById.get(id);
}

export function getAllEntityRefs(): EntityRef[] {
  return Array.from(entityById.values());
}

// ─── Search ───────────────────────────────────────────────────────────────

/**
 * Simple text search across title, slug, aliases, keywords, and description.
 * Case-insensitive. Returns all matching content ordered by relevance.
 */
export function searchContent(query: string): BaseContent[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored: Array<{ content: BaseContent; score: number }> = [];

  for (const content of contentById.values()) {
    let score = 0;

    // Title match (highest weight)
    if (content.title.toLowerCase().includes(q)) score += 10;

    // Slug match
    if (content.slug.includes(q)) score += 8;

    // Aliases match
    if (content.meta.aliases.some((a) => a.toLowerCase().includes(q)))
      score += 6;

    // Keywords match
    if (content.keywords.some((k) => k.toLowerCase().includes(q))) score += 4;

    // Description match
    if (content.description.toLowerCase().includes(q)) score += 2;

    if (score > 0) scored.push({ content, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.content);
}

// ─── Relationship traversal ───────────────────────────────────────────────

/**
 * Resolve all related content for a given stable ID.
 * Merges all relationship arrays and resolves each to BaseContent.
 */
export function getRelatedContent(id: string): BaseContent[] {
  const content = contentById.get(id);
  if (!content) return [];

  const relIds = new Set<string>();
  const rels = content.relationships;

  for (const arr of [
    rels.parents,
    rels.children,
    rels.siblings,
    rels.alternatives,
    rels.prerequisites,
    rels.nextLearning,
    rels.relatedGuides,
    rels.relatedComparisons,
    rels.relatedCategories,
    rels.ecosystemPages,
  ]) {
    for (const relId of arr) {
      if (relId !== id) relIds.add(relId);
    }
  }

  const results: BaseContent[] = [];
  for (const relId of relIds) {
    const c = contentById.get(relId);
    if (c) results.push(c);
  }
  return results;
}

/**
 * Find all content that references a given entity ID.
 */
export function getContentByEntity(entityId: string): BaseContent[] {
  const results: BaseContent[] = [];
  for (const content of contentById.values()) {
    if (content.entityIds.includes(entityId)) {
      results.push(content);
    }
  }
  return results;
}

// ─── Stats ────────────────────────────────────────────────────────────────

export function getRegistryStats(): {
  totalContent: number;
  totalEntities: number;
  byType: Record<string, number>;
} {
  const byType: Record<string, number> = {};
  for (const [type, list] of contentByType.entries()) {
    byType[type] = list.length;
  }
  return {
    totalContent: contentById.size,
    totalEntities: entityById.size,
    byType,
  };
}
