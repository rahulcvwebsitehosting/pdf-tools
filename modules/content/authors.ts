/* ═══════════════════════════════════════════════════════════════════════════
 * Author Profiles — Reusable author/reviewer identities
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { AuthorProfile } from "./schema";

export const authorProfiles: Record<string, AuthorProfile> = {
  "pdf-tools-editorial": {
    id: "pdf-tools-editorial",
    name: "ToolsAtZero Editorial",
    url: "https://pdf-tools-cv.vercel.app",
    type: "Organization",
    bio: "The ToolsAtZero editorial team creates comprehensive guides, tutorials, and reference material for browser-based productivity tools.",
  },
  "technical-review": {
    id: "technical-review",
    name: "ToolsAtZero Technical Review",
    url: "https://pdf-tools-cv.vercel.app",
    type: "Organization",
    bio: "The technical review board verifies accuracy, completeness, and best-practice adherence across all published content.",
  },
};

export function getAuthorProfile(id: string): AuthorProfile | undefined {
  return authorProfiles[id];
}
