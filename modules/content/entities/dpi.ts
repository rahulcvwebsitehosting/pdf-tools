import type { EntityRef } from "../schema";

export const dpi: EntityRef = {
  id: "dpi",
  slug: "dpi",
  name: "DPI",
  aliases: ["Dots Per Inch"],
  description:
    "A measurement of spatial resolution expressing how many individual dots fit within one linear inch. DPI determines print quality — higher values yield sharper printed output.",
  category: "measurement",
  relatedEntities: ["resolution", "exif"],
  relatedTools: ["image-resizer"],
};
