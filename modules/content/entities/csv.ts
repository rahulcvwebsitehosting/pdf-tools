import type { EntityRef } from "../schema";

export const csv: EntityRef = {
  id: "csv",
  slug: "csv",
  name: "CSV",
  aliases: ["Comma-Separated Values"],
  description:
    "A plain-text tabular data format where each line represents a row and values are separated by commas. CSV is universally supported by spreadsheets, databases, and data-processing tools.",
  category: "data-format",
  relatedEntities: ["json", "xml"],
  relatedTools: ["csv-to-json", "csv-to-excel"],
};
