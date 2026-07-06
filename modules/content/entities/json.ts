import type { EntityRef } from "../schema";

export const json: EntityRef = {
  id: "json",
  slug: "json",
  name: "JSON",
  aliases: ["JavaScript Object Notation"],
  description:
    "A lightweight, text-based data interchange format that is easy for humans to read and machines to parse. JSON is the dominant serialization format for web APIs and configuration files.",
  category: "data-format",
  relatedEntities: ["xml", "csv", "yaml"],
  relatedTools: ["json-formatter", "csv-to-json", "xml-to-json"],
};
