import type { EntityRef } from "../schema";

export const css: EntityRef = {
  id: "css",
  slug: "css",
  name: "CSS",
  aliases: ["Cascading Style Sheets", "CSS3"],
  description:
    "A stylesheet language that controls the visual presentation of HTML documents, including layout, colors, typography, and animations. CSS separates content from design on the web.",
  category: "web-technology",
  relatedEntities: ["html"],
  relatedTools: ["css-minifier"],
};
