import type { ComparisonContent } from "../schema";
import {
  defaultGenerationMeta,
  defaultScores,
  defaultAnalytics,
  defaultLocalization,
  defaultAuthor,
  defaultRelationships,
  defaultRecommendations,
  defaultAIBlocks,
  defaultMeta,
} from "../schema";

export const jsonVsXml: ComparisonContent = {
  id: "comparison.json-vs-xml",
  type: "comparison",
  slug: "json-vs-xml",
  title: "JSON vs XML: Which Data Format Should You Use?",
  description:
    "A deep technical comparison of JSON and XML covering syntax, parsing performance, schema validation, readability, and best use cases for APIs, configuration, and data interchange.",
  seoTitle: "JSON vs XML — Complete Data Format Comparison | ToolsAtZero",
  metaDescription:
    "JSON vs XML compared: syntax verbosity, parsing speed, schema support, and real-world use cases. Learn which data format to choose for APIs, configs, and data exchange.",
  keywords: [
    "json vs xml",
    "xml vs json",
    "json or xml",
    "json vs xml performance",
    "json vs xml api",
    "json xml difference",
    "json vs xml comparison",
    "when to use json vs xml",
    "json vs xml for web",
    "json vs xml file size",
  ],
  entityIds: ["json", "xml"],
  status: "published",

  meta: defaultMeta({
    topicId: "data.json-vs-xml",
    difficulty: "intermediate",
    readingTimeMinutes: 8,
    targetAudience: ["web developers", "backend engineers", "API designers", "data architects"],
    searchIntents: ["comparison", "informational", "decision-making"],
    aliases: ["xml vs json", "json or xml for api"],
  }),

  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 8, expectedTraffic: "high" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  relationships: defaultRelationships({
    parents: ["category.data-formats"],
    siblings: ["comparison.csv-vs-excel"],
    relatedGuides: ["guide.json-formatter"],
    relatedComparisons: ["comparison.csv-vs-excel"],
    relatedCategories: ["category.developer-tools"],
  }),

  recommendations: defaultRecommendations({
    beginner: ["guide.json-formatter"],
    next: ["comparison.csv-vs-excel"],
    popular: ["comparison.png-vs-jpg", "comparison.markdown-vs-html"],
  }),

  formatA: "JSON",
  formatB: "XML",

  similarities: [
    "Both are text-based, human-readable data interchange formats.",
    "Both support hierarchical/nested data structures.",
    "Both are language-agnostic and supported by virtually every programming language.",
    "Both can be transmitted over HTTP and used in web APIs.",
    "Both support Unicode encoding for internationalized content.",
    "Both have schema validation mechanisms (JSON Schema, XML Schema/XSD).",
    "Both can be minified to reduce file size or pretty-printed for readability.",
    "Both are used for configuration files in various software ecosystems.",
  ],

  differences: [
    "Syntax: JSON uses key-value pairs with curly braces and brackets; XML uses opening/closing tags with attributes.",
    "Verbosity: XML is significantly more verbose — tag names are repeated in opening and closing tags, adding 30–50% more bytes than equivalent JSON.",
    "Data types: JSON natively supports strings, numbers, booleans, null, arrays, and objects; XML treats everything as text unless validated against a schema.",
    "Arrays: JSON has native array syntax []; XML requires repeating sibling elements with the same tag name to represent arrays.",
    "Comments: XML supports <!-- comments -->; JSON has no native comment syntax (JSONC/JSON5 are non-standard extensions).",
    "Attributes: XML elements can have attributes (<tag attr=\"val\">); JSON has no attribute concept — everything is a key-value pair.",
    "Namespaces: XML supports namespaces for mixing vocabularies from different schemas; JSON has no namespace mechanism.",
    "Parsing speed: JSON parsing is 5–10× faster than XML parsing in most benchmarks due to simpler grammar and smaller payload.",
    "Schema maturity: XML Schema (XSD), DTD, and RELAX NG are battle-tested over 20+ years; JSON Schema is newer and less feature-rich.",
    "Transformation: XML has XSLT for document transformation; JSON requires custom code or tools like jq.",
    "Document markup: XML excels at mixed content (text interspersed with markup); JSON cannot naturally represent mixed content.",
    "Binary data: XML can embed base64 data; JSON also uses base64 strings but lacks a standard binary type.",
  ],

  prosA: [
    "Dramatically less verbose — JSON documents are 30–50% smaller than equivalent XML, reducing bandwidth and storage costs.",
    "Native JavaScript integration — JSON.parse() and JSON.stringify() are built into every browser and Node.js runtime.",
    "Simpler syntax with fewer rules: no closing tags, no attributes, no DTDs to manage.",
    "Native data types (numbers, booleans, arrays) eliminate the need for external type definitions in simple use cases.",
    "De facto standard for REST APIs — over 90% of modern web APIs use JSON.",
    "Faster parsing: 5–10× faster than XML in typical benchmarks due to simpler grammar.",
  ],

  prosB: [
    "Mature schema ecosystem: XSD, DTD, RELAX NG provide rigorous validation for complex document types.",
    "XSLT enables powerful document transformation without custom code.",
    "Namespace support allows combining elements from multiple vocabularies in a single document.",
    "Mixed content model supports text interspersed with markup — essential for document-centric formats (XHTML, DocBook, SVG).",
    "Extensive tooling: XPath/XQuery for querying, XML Signature/Encryption for security, WSDL for service description.",
    "Industry standard in healthcare (HL7), finance (FIX/FpML), government (UBL), and enterprise SOA (SOAP).",
  ],

  consA: [
    "No native comment syntax — developers resort to non-standard extensions (JSONC, JSON5) or workaround patterns.",
    "No namespace mechanism — name collisions must be handled by convention (prefixing keys).",
    "JSON Schema is less mature and less expressive than XML Schema for complex validation rules.",
    "Cannot naturally represent mixed content (text with inline markup), limiting document-centric use cases.",
    "No built-in transformation language equivalent to XSLT.",
  ],

  consB: [
    "Extremely verbose — repeated opening/closing tags inflate file size by 30–50% compared to JSON.",
    "Slower parsing due to complex grammar, namespace resolution, and entity expansion.",
    "Steeper learning curve: DTDs, XSD, XSLT, XPath, namespaces each require significant study.",
    "Poor fit for modern web APIs — most new APIs have abandoned XML in favor of JSON.",
    "Attribute vs. element design decisions add unnecessary complexity to schema design.",
  ],

  performance:
    "JSON consistently outperforms XML in parsing speed and payload size. Benchmarks show JSON.parse() processing a 1 MB payload in ~5ms vs ~40ms for a comparable XML DOM parse in the same runtime. The smaller payload size (30–50% less bytes) also reduces network transfer time. However, for streaming processing of very large documents, XML's SAX/StAX parsers can process gigabyte-scale files with minimal memory, while JSON streaming parsers (jsonstream, ijson) are less mature. For the vast majority of web API use cases, JSON's performance advantage is decisive.",

  compatibility:
    "JSON is natively supported in every modern web browser via the JSON global object and is the default format for REST APIs, NoSQL databases (MongoDB, CouchDB), and configuration files (package.json, tsconfig.json). XML remains dominant in enterprise systems (SOAP web services), document formats (XHTML, SVG, DOCX internals), healthcare (HL7 FHIR supports both), and government standards. Both formats are supported by every major programming language, but JSON requires fewer lines of code to parse and generate in most languages.",

  seoImpact:
    "JSON-LD is Google's preferred format for structured data markup, directly impacting rich snippet eligibility. While XML sitemaps remain standard for search engine crawling, JSON-LD has become the dominant format for Schema.org structured data on web pages.",

  bestUseCases:
    "Use JSON for: REST APIs, web application data exchange, configuration files (package.json, tsconfig.json), NoSQL databases, mobile app backends, and any scenario where simplicity and performance matter. Use XML for: document-centric formats (XHTML, SVG, DOCX), enterprise SOAP services, healthcare HL7/FHIR, financial messaging (FIX/FpML), complex schema validation requirements, and any domain where XSLT transformation or namespace support is needed. For new greenfield projects, JSON is the default choice unless you have specific XML requirements.",

  recommendation:
    "For new web APIs, mobile backends, and modern application development, JSON is the clear default — it's simpler, faster, smaller, and universally supported. Use XML when your domain requires it: document markup, enterprise integration with existing SOAP services, or industries with XML-based standards (healthcare, finance, government). Don't convert working XML systems to JSON without a clear benefit — the migration cost rarely justifies the performance gain for established internal systems.",

  faqs: [
    { question: "Is JSON faster than XML?", answer: "Yes. JSON parsing is typically 5–10× faster than XML parsing in benchmarks due to simpler grammar and smaller payload size. JSON.parse() in V8 processes 1 MB in ~5ms vs ~40ms for XML DOM parsing." },
    { question: "Why did JSON replace XML for web APIs?", answer: "JSON's simpler syntax, native JavaScript support, smaller payloads, and faster parsing made it a natural fit for the AJAX revolution. REST APIs with JSON responses require less boilerplate than SOAP/XML equivalents." },
    { question: "Can JSON have comments?", answer: "Standard JSON (RFC 8259) does not support comments. JSONC (JSON with Comments) and JSON5 are non-standard extensions used by VS Code, TypeScript config, and other tools." },
    { question: "Is XML dead?", answer: "No. XML remains dominant in enterprise systems (SOAP), document formats (DOCX, SVG, XHTML), healthcare (HL7), and government standards. It's declining for web APIs but thriving in its established domains." },
    { question: "Which is more secure, JSON or XML?", answer: "Neither is inherently more secure. XML has specific vulnerabilities (XXE — XML External Entity attacks, billion laughs attack). JSON is simpler and has fewer attack vectors, but both require proper input validation." },
    { question: "Can I convert JSON to XML?", answer: "Yes, but the mapping isn't always straightforward. JSON arrays don't have a direct XML equivalent (you must choose element names), and XML attributes have no JSON counterpart. Many libraries handle common conversion patterns." },
    { question: "What is JSON-LD?", answer: "JSON for Linking Data — a JSON-based format for expressing structured data using Schema.org vocabulary. Google recommends JSON-LD for structured data markup over microdata or RDFa (which is XML-based)." },
    { question: "Does JSON support schemas?", answer: "Yes. JSON Schema (json-schema.org) provides validation, documentation, and code generation. While less mature than XML Schema, it covers most validation needs for API contracts and configuration files." },
    { question: "Why is XML so verbose?", answer: "XML was designed for document markup where self-describing tags improve human readability. Every element requires both opening and closing tags (<name>value</name>), repeating the tag name and adding structural overhead." },
    { question: "Which should I use for config files?", answer: "JSON is common (package.json, tsconfig.json), but YAML and TOML offer better readability for config. XML config files (e.g., Maven pom.xml, Android manifests) remain standard in specific ecosystems." },
    { question: "Can JSON represent HTML?", answer: "Not directly. JSON can store HTML as an escaped string, but it cannot represent mixed content (text with inline markup) naturally. XML-based formats like XHTML are designed for this." },
    { question: "What is SOAP vs REST?", answer: "SOAP uses XML for message formatting with strict contracts (WSDL). REST is an architectural style that typically uses JSON. REST/JSON has largely replaced SOAP/XML for new web APIs due to simplicity." },
    { question: "Is JSON better than XML for mobile apps?", answer: "Yes, for most cases. JSON's smaller payload reduces data usage on mobile networks, and JSON parsing is faster on mobile CPUs. Most mobile API frameworks default to JSON." },
    { question: "What is XPath?", answer: "XPath is a query language for selecting nodes from XML documents. It enables powerful traversal and filtering. JSON has no direct equivalent, though jq and JSONPath provide similar functionality." },
    { question: "Can XML store binary data?", answer: "XML can embed binary data as base64-encoded text. However, this increases size by ~33%. For binary data exchange, consider multipart HTTP messages or dedicated binary formats like Protocol Buffers." },
    { question: "Which databases use JSON vs XML?", answer: "MongoDB, CouchDB, and PostgreSQL (JSONB) use JSON natively. XML databases (MarkLogic, BaseX) exist but are niche. Most modern databases have JSON support; XML support is less common in newer systems." },
    { question: "Is YAML better than JSON?", answer: "YAML is a superset of JSON with better human readability (no braces/quotes, supports comments). YAML is preferred for configuration files; JSON is preferred for data exchange due to stricter parsing and faster processing." },
  ],

  glossary: [
    { term: "JSON (JavaScript Object Notation)", definition: "A lightweight text-based data format using key-value pairs, arrays, and nested objects. Defined by RFC 8259. Despite the name, JSON is language-independent." },
    { term: "XML (Extensible Markup Language)", definition: "A markup language for encoding documents and data in a format that is both human-readable and machine-readable. Defined by W3C. Supports namespaces, schemas, and transformation." },
    { term: "DOM (Document Object Model)", definition: "A tree-based in-memory representation of a document. Both JSON and XML can be parsed into DOM structures, enabling programmatic traversal and manipulation." },
    { term: "SAX (Simple API for XML)", definition: "An event-driven XML parsing approach that processes documents sequentially without loading the entire document into memory. Ideal for very large XML files." },
    { term: "XSD (XML Schema Definition)", definition: "A W3C standard for defining the structure, content, and data types of XML documents. More expressive than JSON Schema for complex validation rules." },
    { term: "JSON Schema", definition: "A vocabulary for annotating and validating JSON documents. Defines data types, required fields, patterns, and constraints. Used for API contract validation." },
    { term: "XSLT (XSL Transformations)", definition: "A language for transforming XML documents into other formats (HTML, text, different XML). Enables declarative document transformation without procedural code." },
    { term: "XPath", definition: "A query language for navigating and selecting elements within XML documents using path expressions. Integral to XSLT and XML processing pipelines." },
    { term: "XXE (XML External Entity)", definition: "A security vulnerability in XML parsers that allows attackers to read local files, perform SSRF, or cause denial of service by exploiting entity expansion." },
    { term: "REST (Representational State Transfer)", definition: "An architectural style for web APIs that uses HTTP methods and typically JSON payloads. REST has largely replaced SOAP for new web service development." },
    { term: "SOAP (Simple Object Access Protocol)", definition: "An XML-based messaging protocol for web services with strict contracts defined by WSDL. Common in enterprise systems but declining for new development." },
    { term: "JSON-LD (JSON for Linking Data)", definition: "A method of encoding linked data using JSON syntax. Used by search engines for structured data markup on web pages (Schema.org)." },
  ],

  aiBlocks: defaultAIBlocks({
    aiSummary:
      "JSON is a lightweight, fast, and simple data format that dominates modern web APIs, mobile backends, and NoSQL databases. XML is a verbose but powerful markup language that excels in document-centric applications, enterprise integration, and domains with mature schema requirements. For new projects, default to JSON unless your domain specifically requires XML capabilities.",
    keyTakeaways: [
      "JSON is 30–50% smaller and 5–10× faster to parse than equivalent XML.",
      "JSON is the de facto standard for REST APIs; XML remains standard for SOAP and enterprise integration.",
      "XML's strengths (namespaces, XSLT, XSD, mixed content) are essential in document-centric domains.",
      "JSON-LD is Google's preferred format for structured data — directly impacts SEO.",
      "Neither format is inherently 'better' — match the format to your domain requirements.",
    ],
    quickFacts: [
      "JSON was formalized by Douglas Crockford in 2001; XML was standardized by W3C in 1998.",
      "Over 90% of new public web APIs use JSON; less than 5% use XML exclusively.",
      "JSON.parse() processes 1 MB in ~5ms; equivalent XML DOM parsing takes ~40ms.",
      "The largest JSON document in common use is npm's registry index at ~1.5 GB.",
      "XHTML, SVG, MathML, DOCX, and PPTX are all XML-based formats.",
    ],
    commonMisconceptions: [
      "\"XML is obsolete\" — XML remains critical in healthcare, finance, government, and document formats.",
      "\"JSON supports comments\" — Standard JSON (RFC 8259) has no comment syntax; JSONC is non-standard.",
      "\"JSON is a subset of JavaScript\" — JSON has stricter rules (quoted keys, no trailing commas, no functions).",
    ],
    didYouKnow: [
      "Douglas Crockford did not invent JSON — he discovered it was already being used informally and formalized the specification.",
      "The XML 'billion laughs' attack can expand a few bytes of XML into gigabytes of memory, crashing the parser.",
    ],
    expertTips: [
      "Always disable external entity processing in XML parsers to prevent XXE vulnerabilities.",
      "For JSON APIs, use JSON Schema for contract validation and generate TypeScript types from schemas for end-to-end type safety.",
      "When migrating from XML to JSON, audit for namespace usage and mixed content — these have no direct JSON equivalents.",
    ],
  }),
};
