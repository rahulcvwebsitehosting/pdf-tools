import type { EntityRef } from "../schema";

export const yaml: EntityRef = {
  id: "yaml",
  slug: "yaml",
  name: "YAML",
  aliases: ["YAML Ain't Markup Language", "YML"],
  description:
    "A human-readable data serialization format commonly used for configuration files and data exchange. YAML uses indentation-based nesting and supports complex data structures without the verbosity of XML.",
  category: "data-format",
  relatedEntities: ["json", "xml"],
  relatedTools: [],
};
