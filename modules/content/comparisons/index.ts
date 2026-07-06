/* ═══════════════════════════════════════════════════════════════════════════
 * Comparisons Barrel — Re-exports all comparison modules
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { ComparisonContent } from "../schema";
export type { ComparisonContent } from "../schema";

import { pngVsJpg } from "./png-vs-jpg";
import { csvVsExcel } from "./csv-vs-excel";
import { jsonVsXml } from "./json-vs-xml";
import { pdfVsDocx } from "./pdf-vs-docx";
import { webpVsPng } from "./webp-vs-png";
import { markdownVsHtml } from "./markdown-vs-html";

export const comparisonsConfig: ComparisonContent[] = [
  pngVsJpg,
  csvVsExcel,
  jsonVsXml,
  pdfVsDocx,
  webpVsPng,
  markdownVsHtml,
];

export function getComparisonBySlug(slug: string): ComparisonContent | undefined {
  return comparisonsConfig.find((c) => c.slug === slug);
}

export function getAllComparisons(): ComparisonContent[] {
  return comparisonsConfig;
}

export function getComparisonById(id: string): ComparisonContent | undefined {
  return comparisonsConfig.find((c) => c.id === id);
}
