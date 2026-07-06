import type { EntityRef } from "../schema";

export const markdown: EntityRef = {
  id: "markdown",
  slug: "markdown",
  name: "Markdown",
  aliases: ["MD", "Markdown Syntax"],
  description:
    "A lightweight markup language that converts plain text with simple formatting syntax into structured HTML. Markdown is the standard for README files, documentation, and content authoring.",
  category: "markup-format",
  relatedEntities: ["html", "yaml"],
  relatedTools: ["markdown-to-html"],
};
