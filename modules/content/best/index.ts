/* ═══════════════════════════════════════════════════════════════════════════
 * Best-Of Content Barrel Index
 * ═══════════════════════════════════════════════════════════════════════════
 * Re-exports all BestOf modules as a unified registry with lookup helpers.
 * Backward-compatible aliases preserve the old hubs.config.ts API surface.
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { BestOfContent, BestOfToolItem } from "../schema";

// ─── Module imports ───────────────────────────────────────────────────────
import { bestPdfTools } from "./best-pdf-tools";
import { bestCalculators } from "./best-calculators";
import { bestDeveloperTools } from "./best-developer-tools";
import { bestImageEditing } from "./best-image-editing";
import { bestImageConversion } from "./best-image-conversion";
import { bestTextUtilities } from "./best-text-utilities";
import { bestBrowserTools } from "./best-browser-tools";
import { bestProductivityTools } from "./best-productivity-tools";

// ─── Unified registry ────────────────────────────────────────────────────

export const bestOfConfig: BestOfContent[] = [
  bestPdfTools,
  bestCalculators,
  bestDeveloperTools,
  bestImageEditing,
  bestImageConversion,
  bestTextUtilities,
  bestBrowserTools,
  bestProductivityTools,
];

// ─── Lookup helpers ───────────────────────────────────────────────────────

export function getBestOfBySlug(slug: string): BestOfContent | undefined {
  return bestOfConfig.find((b) => b.slug === slug);
}

export function getAllBestOf(): BestOfContent[] {
  return bestOfConfig;
}

// ─── Re-export schema types ───────────────────────────────────────────────

export type { BestOfContent, BestOfToolItem };

// ─── Backward-compatible aliases (hubs.config.ts migration) ───────────────

/** @deprecated Use `bestOfConfig` */
export const hubsConfig = bestOfConfig;

/** @deprecated Use `getBestOfBySlug` */
export const getHubBySlug = getBestOfBySlug;

/** @deprecated Use `BestOfContent` */
export type HubConfig = BestOfContent;

/** @deprecated Use `BestOfToolItem` */
export type HubToolItem = BestOfToolItem;

// ─── Named re-exports for direct access ───────────────────────────────────

export {
  bestPdfTools,
  bestCalculators,
  bestDeveloperTools,
  bestImageEditing,
  bestImageConversion,
  bestTextUtilities,
  bestBrowserTools,
  bestProductivityTools,
};
