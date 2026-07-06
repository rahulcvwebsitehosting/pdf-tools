/* ═══════════════════════════════════════════════════════════════════════════
 * Author Profiles — Reusable author/reviewer identities
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { AuthorProfile } from "./schema";

export const authorProfiles: Record<string, AuthorProfile> = {
  "toolsatzero-editorial": {
    id: "toolsatzero-editorial",
    name: "ToolsAtZero Editorial",
    url: "https://toolsatzero.com",
    type: "Organization",
    bio: "The ToolsAtZero editorial team creates comprehensive guides, tutorials, and reference material for browser-based productivity tools.",
  },
  "technical-review": {
    id: "technical-review",
    name: "ToolsAtZero Technical Review",
    url: "https://toolsatzero.com",
    type: "Organization",
    bio: "The technical review board verifies accuracy, completeness, and best-practice adherence across all published content.",
  },
};

export function getAuthorProfile(id: string): AuthorProfile | undefined {
  return authorProfiles[id];
}
