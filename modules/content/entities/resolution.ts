import type { EntityRef } from "../schema";

export const resolution: EntityRef = {
  id: "resolution",
  slug: "resolution",
  name: "Resolution",
  aliases: ["Image Resolution", "Pixel Dimensions"],
  description:
    "The total number of pixels in an image, typically expressed as width × height. Resolution directly affects image detail, file size, and suitability for print versus screen display.",
  category: "measurement",
  relatedEntities: ["dpi", "exif"],
  relatedTools: ["image-resizer", "image-cropper"],
};
