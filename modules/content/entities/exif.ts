import type { EntityRef } from "../schema";

export const exif: EntityRef = {
  id: "exif",
  slug: "exif",
  name: "EXIF",
  aliases: ["Exchangeable Image File Format", "EXIF Data", "EXIF Metadata"],
  description:
    "A metadata standard embedded in image files that stores camera settings, GPS coordinates, timestamps, and other capture information. EXIF data is primarily associated with JPEG and TIFF files.",
  category: "standard",
  relatedEntities: ["jpeg", "dpi", "resolution"],
  relatedTools: ["image-metadata-stripper"],
};
