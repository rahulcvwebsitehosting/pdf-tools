import type { EntityRef } from "../schema";

export const png: EntityRef = {
  id: "png",
  slug: "png",
  name: "PNG",
  aliases: ["Portable Network Graphics"],
  description:
    "A lossless raster image format that supports transparency via an alpha channel. PNG is ideal for graphics, screenshots, and images requiring pixel-perfect reproduction.",
  category: "image-format",
  relatedEntities: ["jpeg", "webp", "svg"],
  relatedTools: ["png-to-jpg", "image-compressor"],
};
