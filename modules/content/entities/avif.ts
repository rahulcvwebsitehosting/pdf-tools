import type { EntityRef } from "../schema";

export const avif: EntityRef = {
  id: "avif",
  slug: "avif",
  name: "AVIF",
  aliases: ["AV1 Image File Format", "AVIF"],
  description:
    "A next-generation image format based on the AV1 video codec, offering superior compression efficiency over JPEG and WebP. AVIF supports HDR, wide color gamut, and both lossy and lossless modes.",
  category: "image-format",
  relatedEntities: ["jpeg", "webp", "png"],
  relatedTools: ["image-compressor"],
};
