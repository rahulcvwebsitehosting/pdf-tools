import type { EntityRef } from "../schema";

export const jpeg: EntityRef = {
  id: "jpeg",
  slug: "jpeg",
  name: "JPEG",
  aliases: ["JPG", "Joint Photographic Experts Group"],
  description:
    "A lossy compressed image format optimized for photographs and complex images with smooth color gradients. JPEG achieves small file sizes by discarding visual information the human eye is less likely to notice.",
  category: "image-format",
  relatedEntities: ["png", "webp", "avif", "exif"],
  relatedTools: ["image-compressor", "jpg-to-png", "png-to-jpg"],
};
