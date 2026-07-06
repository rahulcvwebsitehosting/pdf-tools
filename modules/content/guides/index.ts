/* ═══════════════════════════════════════════════════════════════════════════
 * Guides Barrel — Backward-compatible re-export of all guide modules
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { GuideContent, DifficultyLevel } from "../schema";
export type { GuideContent } from "../schema";
/** @deprecated Use GuideContent */
export type GuideConfig = GuideContent;

import { mergePdfGuide } from "./merge-pdf";
import { compressImagesGuide } from "./compress-images";
import { calculateEmiGuide } from "./calculate-emi";
import { whatIsBmiGuide } from "./what-is-bmi";
import { jsonFormatterGuide } from "./json-formatter";
import { convertPngToJpgGuide } from "./convert-png-to-jpg";

// ─── Master array (backward-compatible with old guidesConfig) ─────────────

export const guidesConfig: GuideContent[] = [
  mergePdfGuide,
  compressImagesGuide,
  calculateEmiGuide,
  whatIsBmiGuide,
  jsonFormatterGuide,
  convertPngToJpgGuide,
];

// ─── Lookup helpers ───────────────────────────────────────────────────────

export function getGuideBySlug(slug: string): GuideContent | undefined {
  return guidesConfig.find((g) => g.slug === slug);
}

export function getAllGuides(): GuideContent[] {
  return guidesConfig;
}

export function getGuidesByDifficulty(difficulty: DifficultyLevel): GuideContent[] {
  return guidesConfig.filter((g) => g.meta.difficulty === difficulty);
}

export function getGuideById(id: string): GuideContent | undefined {
  return guidesConfig.find((g) => g.id === id);
}
