/* ═══════════════════════════════════════════════════════════════════════════
 * Universal Content Schema — ToolsAtZero AEO/LLMO Knowledge Hub
 * ═══════════════════════════════════════════════════════════════════════════
 * All content types inherit from BaseContent.
 * Content modules export structured data only — UI-agnostic.
 * Relationships use stable IDs (e.g. "guide.compress-pdf"), never slugs.
 * ═══════════════════════════════════════════════════════════════════════════ */

// ─── Primitives ───────────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

// ─── Content Type Discriminator ───────────────────────────────────────────

export type ContentType =
  | "guide"
  | "comparison"
  | "category"
  | "bestof"
  | "industry"
  | "glossary"
  | "workflow"
  | "entity";

// ─── Content Status ───────────────────────────────────────────────────────

export type ContentStatus =
  | "draft"
  | "review"
  | "published"
  | "deprecated"
  | "archived";

// ─── Difficulty Level ─────────────────────────────────────────────────────

export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "professional";

// ─── Traffic Expectation ──────────────────────────────────────────────────

export type TrafficLevel = "low" | "medium" | "high" | "very-high";

// ─── Seasonality ──────────────────────────────────────────────────────────

export type Seasonality = "none" | "yearly" | "quarterly" | "monthly";

// ─── Generation Source ────────────────────────────────────────────────────

export type GenerationSource = "manual" | "generated" | "hybrid";

// ─── Generation Metadata ─────────────────────────────────────────────────

export interface GenerationMeta {
  source: GenerationSource;
  model?: string;
  generatedAt?: string;
  humanReviewed: boolean;
}

// ─── Content Scores ───────────────────────────────────────────────────────

export interface ContentScores {
  completeness: number;   // 0–100
  readability: number;    // 0–100
  seo: number;            // 0–100
  aeo: number;            // 0–100
  freshness: number;      // 0–100
}

// ─── Analytics Metadata ───────────────────────────────────────────────────

export interface AnalyticsMeta {
  priority: number;       // 1–10
  evergreen: boolean;
  seasonality: Seasonality;
  expectedTraffic: TrafficLevel;
}

// ─── Localization ─────────────────────────────────────────────────────────

export interface LocalizationMeta {
  locale: string;                              // "en"
  translations: Record<string, string | null>; // { es: null, fr: null }
}

// ─── Author Reference ─────────────────────────────────────────────────────

export interface AuthorRef {
  authorId: string;       // "pdf-tools-editorial"
  reviewerId: string;     // "technical-review"
}

// ─── Content Relationships (Knowledge Graph) ──────────────────────────────

export interface ContentRelationships {
  parents: string[];            // stable IDs
  children: string[];
  siblings: string[];
  alternatives: string[];
  prerequisites: string[];
  nextLearning: string[];
  relatedGuides: string[];
  relatedComparisons: string[];
  relatedCategories: string[];
  ecosystemPages: string[];
}

// ─── Recommendations ──────────────────────────────────────────────────────

export interface Recommendations {
  beginner: string[];
  next: string[];
  advanced: string[];
  popular: string[];
  editorChoice: string[];
}

// ─── AI Snippet Blocks ────────────────────────────────────────────────────

export interface AIBlocks {
  aiSummary: string;
  keyTakeaways: string[];
  quickFacts: string[];
  commonMisconceptions: string[];
  didYouKnow: string[];
  expertTips: string[];
}

// ─── Content Metadata ─────────────────────────────────────────────────────

export interface ContentMeta {
  topicId: string;              // canonical: "pdf.compress"
  version: string;              // "1.0"
  difficulty: DifficultyLevel;
  readingTimeMinutes: number;
  targetAudience: string[];
  searchIntents: string[];      // informational, comparison, troubleshooting…
  aliases: string[];            // search aliases: ["shrink pdf", "reduce pdf size"]
}

// ═══════════════════════════════════════════════════════════════════════════
// BaseContent — Every content type inherits this
// ═══════════════════════════════════════════════════════════════════════════

export interface BaseContent {
  id: string;                   // stable ID: "guide.compress-pdf"
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  entityIds: string[];          // references to Entity Registry
  status: ContentStatus;
  meta: ContentMeta;
  generation: GenerationMeta;
  scores: ContentScores;
  analytics: AnalyticsMeta;
  localization: LocalizationMeta;
  author: AuthorRef;
  relationships: ContentRelationships;
  recommendations: Recommendations;
  aiBlocks: AIBlocks;
}

// ═══════════════════════════════════════════════════════════════════════════
// Entity Reference
// ═══════════════════════════════════════════════════════════════════════════

export interface EntityRef {
  id: string;                   // "jpeg"
  slug: string;
  name: string;
  aliases: string[];
  description: string;
  category: string;             // "image-format", "compression", "standard"
  relatedEntities: string[];    // other entity IDs
  relatedTools: string[];       // tool slugs
}

// ═══════════════════════════════════════════════════════════════════════════
// GuideContent
// ═══════════════════════════════════════════════════════════════════════════

export interface GuideContent extends BaseContent {
  type: "guide";
  quickAnswer: string;          // 40–80 words
  introduction: string;
  whyItMatters: string;
  toc: string[];
  steps: string[];
  howItWorks: string;
  examples: string[];
  bestPractices: string[];
  commonMistakes: string[];
  proTips: string[];
  troubleshooting: FAQ[];
  benefits: string[];
  limitations: string[];
  securityNotes: string[];
  performanceTips: string[];
  useCases: string[];
  faqs: FAQ[];                  // 30–100 items
  relatedQuestions: FAQ[];      // "People Also Ask"
  glossary: GlossaryEntry[];
  conclusion: string;
  // Convenience fields (also in relationships, but kept for backward compat)
  relatedTools: string[];
  relatedGuides: string[];
}

// ═══════════════════════════════════════════════════════════════════════════
// ComparisonContent
// ═══════════════════════════════════════════════════════════════════════════

export interface ComparisonContent extends BaseContent {
  type: "comparison";
  formatA: string;
  formatB: string;
  similarities: string[];
  differences: string[];
  prosA: string[];
  prosB: string[];
  consA: string[];
  consB: string[];
  performance: string;
  compatibility: string;
  seoImpact: string;
  bestUseCases: string;
  recommendation: string;
  faqs: FAQ[];
  glossary: GlossaryEntry[];
}

// ═══════════════════════════════════════════════════════════════════════════
// BestOfContent (migrated from hubs.config.ts)
// ═══════════════════════════════════════════════════════════════════════════

export interface BestOfToolItem {
  name: string;
  slug: string;
  features: string;
  privacy: string;
}

export interface BestOfContent extends BaseContent {
  type: "bestof";
  introduction: string;
  comparisonTitle: string;
  tools: BestOfToolItem[];
  keyTakeaways: string[];
  faqs: FAQ[];
}

// ═══════════════════════════════════════════════════════════════════════════
// WorkflowContent
// ═══════════════════════════════════════════════════════════════════════════

export interface WorkflowStep {
  title: string;
  description: string;
  toolSlug?: string;            // optional linked tool
}

export interface WorkflowContent extends BaseContent {
  type: "workflow";
  introduction: string;
  steps: WorkflowStep[];
  tips: string[];
  faqs: FAQ[];
}

// ═══════════════════════════════════════════════════════════════════════════
// Learning Path
// ═══════════════════════════════════════════════════════════════════════════

export interface LearningPath {
  id: string;                   // "pdf-basics"
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  steps: string[];              // ordered stable content IDs
}

// ═══════════════════════════════════════════════════════════════════════════
// Author Profile
// ═══════════════════════════════════════════════════════════════════════════

export interface AuthorProfile {
  id: string;
  name: string;
  url: string;
  type: "Person" | "Organization";
  bio?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// Utility: Default factories (reduce boilerplate in per-file modules)
// ═══════════════════════════════════════════════════════════════════════════

export function defaultGenerationMeta(): GenerationMeta {
  return { source: "manual", humanReviewed: true };
}

export function defaultScores(): ContentScores {
  return { completeness: 0, readability: 0, seo: 0, aeo: 0, freshness: 0 };
}

export function defaultAnalytics(
  overrides?: Partial<AnalyticsMeta>
): AnalyticsMeta {
  return {
    priority: 5,
    evergreen: true,
    seasonality: "none",
    expectedTraffic: "medium",
    ...overrides,
  };
}

export function defaultLocalization(): LocalizationMeta {
  return {
    locale: "en",
    translations: { es: null, fr: null, de: null, hi: null },
  };
}

export function defaultAuthor(): AuthorRef {
  return {
    authorId: "pdf-tools-editorial",
    reviewerId: "technical-review",
  };
}

export function defaultRelationships(
  overrides?: Partial<ContentRelationships>
): ContentRelationships {
  return {
    parents: [],
    children: [],
    siblings: [],
    alternatives: [],
    prerequisites: [],
    nextLearning: [],
    relatedGuides: [],
    relatedComparisons: [],
    relatedCategories: [],
    ecosystemPages: [],
    ...overrides,
  };
}

export function defaultRecommendations(
  overrides?: Partial<Recommendations>
): Recommendations {
  return {
    beginner: [],
    next: [],
    advanced: [],
    popular: [],
    editorChoice: [],
    ...overrides,
  };
}

export function defaultAIBlocks(
  overrides?: Partial<AIBlocks>
): AIBlocks {
  return {
    aiSummary: "",
    keyTakeaways: [],
    quickFacts: [],
    commonMisconceptions: [],
    didYouKnow: [],
    expertTips: [],
    ...overrides,
  };
}

export function defaultMeta(
  overrides: Partial<ContentMeta> & { topicId: string }
): ContentMeta {
  return {
    version: "1.0",
    difficulty: "beginner",
    readingTimeMinutes: 5,
    targetAudience: [],
    searchIntents: [],
    aliases: [],
    ...overrides,
  };
}
