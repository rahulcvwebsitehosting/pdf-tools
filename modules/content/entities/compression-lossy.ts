import type { EntityRef } from "../schema";

export const compressionLossy: EntityRef = {
  id: "compression-lossy",
  slug: "compression-lossy",
  name: "Lossy Compression",
  aliases: ["Lossy Compression"],
  description:
    "A class of data compression algorithms that reduce file size by permanently discarding less-important information. Lossy compression is used by JPEG, WebP, and most audio/video codecs to achieve dramatically smaller files at the cost of some fidelity.",
  category: "compression",
  relatedEntities: ["compression-lossless", "jpeg", "webp"],
  relatedTools: ["image-compressor"],
};
