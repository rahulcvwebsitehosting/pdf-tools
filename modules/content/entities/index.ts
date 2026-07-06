/* ═══════════════════════════════════════════════════════════════════════════
 * Entity Registry — barrel export + lookup helpers
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { EntityRef } from "../schema";

// ─── Imports ──────────────────────────────────────────────────────────────

import { jpeg } from "./jpeg";
import { png } from "./png";
import { webp } from "./webp";
import { avif } from "./avif";
import { svg } from "./svg";
import { pdf } from "./pdf";
import { json } from "./json";
import { xml } from "./xml";
import { csv } from "./csv";
import { yaml } from "./yaml";
import { html } from "./html";
import { markdown } from "./markdown";
import { css } from "./css";
import { compressionLossy } from "./compression-lossy";
import { compressionLossless } from "./compression-lossless";
import { exif } from "./exif";
import { dpi } from "./dpi";
import { resolution } from "./resolution";
import { emi } from "./emi";
import { bmi } from "./bmi";

// ─── Re-exports ───────────────────────────────────────────────────────────

export {
  jpeg,
  png,
  webp,
  avif,
  svg,
  pdf,
  json,
  xml,
  csv,
  yaml,
  html,
  markdown,
  css,
  compressionLossy,
  compressionLossless,
  exif,
  dpi,
  resolution,
  emi,
  bmi,
};

// ─── Master list ──────────────────────────────────────────────────────────

export const allEntities: EntityRef[] = [
  jpeg,
  png,
  webp,
  avif,
  svg,
  pdf,
  json,
  xml,
  csv,
  yaml,
  html,
  markdown,
  css,
  compressionLossy,
  compressionLossless,
  exif,
  dpi,
  resolution,
  emi,
  bmi,
];

// ─── Lookup maps (built once, O(1) access) ───────────────────────────────

const byId = new Map<string, EntityRef>(
  allEntities.map((e) => [e.id, e])
);

const byCategory = new Map<string, EntityRef[]>();
for (const entity of allEntities) {
  const list = byCategory.get(entity.category) ?? [];
  list.push(entity);
  byCategory.set(entity.category, list);
}

// ─── Public helpers ───────────────────────────────────────────────────────

/** Find a single entity by its stable ID. */
export function getEntityById(id: string): EntityRef | undefined {
  return byId.get(id);
}

/** Return all entities that belong to a given category. */
export function getEntitiesByCategory(cat: string): EntityRef[] {
  return byCategory.get(cat) ?? [];
}
