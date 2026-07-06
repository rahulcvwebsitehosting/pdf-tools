import type { EntityRef } from "../schema";

export const webp: EntityRef = {
  id: "webp",
  slug: "webp",
  name: "WebP",
  aliases: ["WebP Image Format"],
  description:
    "A modern image format developed by Google that supports both lossy and lossless compression, transparency, and animation. WebP typically delivers 25–35% smaller files than JPEG at equivalent visual quality.",
  category: "image-format",
  relatedEntities: ["jpeg", "png", "avif"],
  relatedTools: ["image-compressor"],
};
