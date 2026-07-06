import type { EntityRef } from "../schema";

export const xml: EntityRef = {
  id: "xml",
  slug: "xml",
  name: "XML",
  aliases: ["Extensible Markup Language"],
  description:
    "A markup language for encoding structured data in a human- and machine-readable format. XML underpins many enterprise standards including SOAP, RSS, and SVG.",
  category: "data-format",
  relatedEntities: ["json", "html", "yaml"],
  relatedTools: ["xml-to-json"],
};
