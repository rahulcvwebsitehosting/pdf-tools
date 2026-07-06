import type { EntityRef } from "../schema";

export const pdf: EntityRef = {
  id: "pdf",
  slug: "pdf",
  name: "PDF",
  aliases: ["Portable Document Format", "Adobe PDF"],
  description:
    "A fixed-layout document format that preserves fonts, images, and formatting across all devices and platforms. PDF is the de facto standard for sharing printable documents.",
  category: "document-format",
  relatedEntities: ["docx", "jpeg", "png"],
  relatedTools: [
    "merge-pdf",
    "split-pdf",
    "compress-pdf",
    "protect-pdf",
    "unlock-pdf",
  ],
};
