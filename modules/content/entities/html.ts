import type { EntityRef } from "../schema";

export const html: EntityRef = {
  id: "html",
  slug: "html",
  name: "HTML",
  aliases: ["HyperText Markup Language", "HTML5"],
  description:
    "The standard markup language for structuring content on the web. HTML defines the semantic structure of web pages using elements like headings, paragraphs, links, and media embeds.",
  category: "web-technology",
  relatedEntities: ["css", "markdown", "xml"],
  relatedTools: ["html-minifier", "html-entities", "markdown-to-html"],
};
