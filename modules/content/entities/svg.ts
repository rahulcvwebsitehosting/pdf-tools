import type { EntityRef } from "../schema";

export const svg: EntityRef = {
  id: "svg",
  slug: "svg",
  name: "SVG",
  aliases: ["Scalable Vector Graphics"],
  description:
    "An XML-based vector image format that scales to any resolution without quality loss. SVG is the standard for icons, logos, and illustrations on the web.",
  category: "image-format",
  relatedEntities: ["png", "webp"],
  relatedTools: ["svg-to-png"],
};
