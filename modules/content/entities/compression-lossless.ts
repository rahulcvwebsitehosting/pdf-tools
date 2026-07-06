import type { EntityRef } from "../schema";

export const compressionLossless: EntityRef = {
  id: "compression-lossless",
  slug: "compression-lossless",
  name: "Lossless Compression",
  aliases: ["Lossless Compression"],
  description:
    "A class of data compression algorithms that reduce file size without any loss of original data. Lossless compression is used by PNG, ZIP, and FLAC and allows perfect reconstruction of the original content.",
  category: "compression",
  relatedEntities: ["compression-lossy", "png", "svg"],
  relatedTools: ["image-compressor", "compress-pdf"],
};
