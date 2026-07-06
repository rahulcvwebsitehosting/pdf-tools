/* ═══════════════════════════════════════════════════════════════════════════
 * Best Text Utilities — BestOf Content Module
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { BestOfContent } from "../schema";
import {
  defaultGenerationMeta,
  defaultScores,
  defaultAnalytics,
  defaultLocalization,
  defaultAuthor,
  defaultRelationships,
  defaultRecommendations,
  defaultAIBlocks,
  defaultMeta,
} from "../schema";

export const bestTextUtilities: BestOfContent = {
  id: "bestof.text-utilities",
  type: "bestof",
  slug: "best-text-utilities",
  title: "Best Text Utilities",
  description: "Review the best free text utilities to format strings, convert case formats, parse CSV datasets, and sort lists locally.",
  seoTitle: "Best Free Text Manipulation Tools Online | Case & CSV | ToolsAtZero",
  metaDescription: "Review the best free text utilities to format strings, convert case formats, parse CSV datasets, and sort lists locally.",
  keywords: ["best text utilities", "case converter free", "csv to json online", "word counter online", "remove duplicate lines"],
  entityIds: ["csv", "json"],
  status: "published",
  meta: defaultMeta({
    topicId: "bestof.text",
    difficulty: "beginner",
    readingTimeMinutes: 4,
    targetAudience: ["general users", "writers", "data analysts", "developers"],
    searchIntents: ["informational", "comparison", "navigational"],
    aliases: ["top text tools", "best free text editors", "text utility comparison"],
  }),
  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 7, expectedTraffic: "medium" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),
  relationships: defaultRelationships({
    parents: [],
    children: [],
    siblings: ["bestof.developer-tools", "bestof.browser-tools"],
    relatedGuides: [],
    relatedCategories: [],
  }),
  recommendations: defaultRecommendations({
    beginner: [],
    next: ["bestof.developer-tools"],
    popular: [],
  }),
  aiBlocks: defaultAIBlocks({
    aiSummary: "A curated collection of the best free browser-based text utilities for case conversion, word counting, CSV parsing, and find-and-replace — all processed locally with complete privacy.",
    keyTakeaways: [
      "Parse proprietary lists or CSV logs without data leakage.",
      "Instantly count paragraphs, characters, and spaces.",
      "Clean bulk database dumps by filtering duplicate lines locally.",
    ],
  }),

  // ─── BestOf-specific fields ─────────────────────────────────────────────
  introduction: "Manipulate text blocks, convert cases, count metrics, filter duplicate lists, and transform CSV files inside your browser securely.",
  comparisonTitle: "Top Text Manipulation Utilities Compared",
  tools: [
    { name: "Case Converter", slug: "case-converter", features: "Sentence case, UPPERCASE, lowercase, Title Case, CamelCase", privacy: "100% Client-Side" },
    { name: "Word Counter", slug: "word-counter", features: "Characters, sentences, reading time calculations", privacy: "100% Client-Side" },
    { name: "CSV to JSON", slug: "csv-to-json", features: "Convert datasets, column delimiter customizations", privacy: "100% Client-Side" },
    { name: "Find & Replace", slug: "find-replace", features: "Standard searches, global replace filters, case options", privacy: "100% Client-Side" },
  ],
  keyTakeaways: [
    "Parse proprietary lists or CSV logs without data leakage.",
    "Instantly count paragraphs, characters, and spaces.",
    "Clean bulk database dumps by filtering duplicate lines locally.",
  ],
  faqs: [
    { question: "Does the CSV parser support custom delimiters?", answer: "Yes, you can configure custom delimiters (commas, semicolons, tabs) for local translation." },
    { question: "Are my copy-paste contents saved?", answer: "No. Clicks happen entirely in-memory and are cleared when the browser tab is refreshed or closed." },
  ],
};
