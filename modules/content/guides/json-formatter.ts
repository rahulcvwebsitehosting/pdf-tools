import type { GuideContent } from "../schema";
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

export const jsonFormatterGuide: GuideContent = {
  // ─── Identity ───────────────────────────────────────────────────────
  id: "guide.json-formatter",
  type: "guide",
  slug: "json-formatter-explained",
  title: "JSON Formatter Explained",
  description:
    "Learn what JSON formatting is, why syntax styling is essential, and how to format JSON blocks securely.",
  seoTitle:
    "JSON Formatter Explained | Syntax & Structure Guide | ToolsAtZero",
  metaDescription:
    "Understand JSON payloads and schemas. Learn how formatting cleans structural indentation and validates syntax client-side.",
  keywords: [
    "json formatter explained",
    "format json online",
    "json syntax validate",
    "minify json guide",
    "local data formatter",
    "json beautifier",
    "json pretty print",
    "json validator",
  ],
  entityIds: [
    "entity.json",
    "entity.api",
    "entity.syntax-validation",
    "entity.client-side",
  ],
  status: "published",

  // ─── Meta ───────────────────────────────────────────────────────────
  meta: defaultMeta({
    topicId: "developer.json",
    difficulty: "intermediate",
    readingTimeMinutes: 4,
    targetAudience: [
      "web developers",
      "API consumers",
      "QA engineers",
      "data analysts",
    ],
    searchIntents: ["informational", "how-to", "troubleshooting"],
    aliases: [
      "json beautifier",
      "json pretty printer",
      "json validator",
      "format json",
    ],
  }),
  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 6, expectedTraffic: "medium" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  // ─── Relationships ──────────────────────────────────────────────────
  relationships: defaultRelationships({
    parents: ["category.developer-tools"],
    siblings: ["guide.convert-png-to-jpg"],
    relatedGuides: ["guide.what-is-bmi", "guide.convert-png-to-jpg"],
    relatedComparisons: ["comparison.json-vs-xml", "comparison.json-vs-yaml"],
    relatedCategories: ["category.developer-tools"],
  }),
  recommendations: defaultRecommendations({
    beginner: ["guide.what-is-bmi", "guide.convert-png-to-jpg"],
    next: ["guide.calculate-emi"],
    advanced: ["guide.merge-pdf"],
  }),

  // ─── AI Blocks ──────────────────────────────────────────────────────
  aiBlocks: defaultAIBlocks({
    aiSummary:
      "JSON (JavaScript Object Notation) is a lightweight text format for structured data exchange. A JSON formatter parses raw or minified JSON strings, validates syntax, and outputs human-readable indented text. Client-side formatters use the browser's native JSON.parse() and JSON.stringify() methods, ensuring sensitive API data never leaves the user's device.",
    keyTakeaways: [
      "JSON requires double quotes for keys and string values — single quotes are invalid",
      "JSON.parse() validates syntax; JSON.stringify(obj, null, 2) pretty-prints with 2-space indentation",
      "Trailing commas after the last element in arrays or objects are illegal in JSON",
      "Client-side formatters keep API tokens and payloads private — no server round-trip",
      "Minification removes whitespace for smaller payloads; formatting adds whitespace for readability",
    ],
    quickFacts: [
      "JSON was specified by Douglas Crockford and standardized as ECMA-404 and RFC 8259",
      "JSON supports six data types: string, number, object, array, boolean, and null",
      "JSON does not support comments — use JSONC or JSON5 extensions if comments are needed",
      "JSON.stringify() in JavaScript can pretty-print with a custom space parameter",
      "The average API response contains 2-10 KB of JSON data",
    ],
    expertTips: [
      "Use JSON.parse() inside a try-catch block to provide user-friendly syntax error messages with line numbers",
      "For large JSON files (>10 MB), use a streaming parser to avoid memory exhaustion",
      "Pipe JSON through jq on the command line for powerful filtering and transformation",
    ],
  }),

  // ─── Quick Answer ──────────────────────────────────────────────────
  quickAnswer:
    "A JSON formatter takes raw or minified JSON text and outputs it with proper indentation for readability. Paste your JSON into a client-side formatter, choose your indent size (2 or 4 spaces), and the tool validates syntax and pretty-prints the result. All processing happens in-browser using JSON.parse() and JSON.stringify().",

  // ─── Introduction ──────────────────────────────────────────────────
  introduction:
    "JSON is the standard format for API exchanges. However, raw JSON string dumps are hard to read. Learn how local formatters beautify structures while validating syntax rules, and why you should never paste sensitive API data into server-based formatters.",

  // ─── Why It Matters ────────────────────────────────────────────────
  whyItMatters:
    "Developers constantly debug API responses, configuration files, and data exports in JSON format. Poorly formatted or minified JSON is nearly impossible to read. A formatter reveals the data structure instantly, catches syntax errors before they cause runtime failures, and does so without exposing potentially sensitive data to third-party servers.",

  // ─── Table of Contents ─────────────────────────────────────────────
  toc: [
    "What is JSON?",
    "The Importance of Indentation and Formatting",
    "Validating Syntax Errors Locally",
    "Security Risks of Online Formatters",
    "Frequently Asked Questions",
  ],

  // ─── Steps ─────────────────────────────────────────────────────────
  steps: [
    "Open the Free JSON Formatter tool.",
    "Paste your raw, minified, or unformatted JSON text into the editor window.",
    "Choose your preferred indentation spacing (e.g. 2 spaces or 4 spaces).",
    "Review the parsed outputs and copy the cleaned, valid JSON block.",
  ],

  // ─── How It Works ──────────────────────────────────────────────────
  howItWorks:
    "The formatter passes your input through JSON.parse(), which validates the syntax against the JSON specification (RFC 8259). If parsing succeeds, the resulting JavaScript object is passed to JSON.stringify(obj, null, indent) where the indent parameter controls spacing. The output is a properly indented, human-readable string. If parsing fails, the error message indicates the character position and type of syntax violation.",

  // ─── Examples ──────────────────────────────────────────────────────
  examples: [
    "Formatting a minified API response to find a specific nested field for debugging",
    "Validating a package.json file before committing to ensure no trailing commas or missing brackets",
    "Pretty-printing a MongoDB document export for review in a code review pull request",
    "Minifying a large JSON configuration to reduce payload size before sending to an API endpoint",
    "Converting single-line log entries containing JSON into readable multi-line format for log analysis",
  ],

  // ─── Best Practices ───────────────────────────────────────────────
  bestPractices: [
    "Avoid pasting credentials, secret keys, or database rows on sites that perform server-side logging.",
    "Validate that all keys and string properties are enclosed in double quotes; single quotes are invalid in JSON.",
    "Check the parser's line warnings to trace trailing commas or missing brackets.",
    "Use 2-space indentation for compact display, 4-space for maximum readability.",
    "Validate JSON before deploying configuration changes — a single syntax error can crash an application.",
  ],

  // ─── Common Mistakes ──────────────────────────────────────────────
  commonMistakes: [
    "Transmitting proprietary API response objects over the network to generic formatter sites.",
    "Using single quotes or omitting double quotes around keys in JSON files.",
    "Forgetting to escape backslashes within string values.",
    "Including trailing commas after the last array element or object property.",
    "Adding comments to JSON files — standard JSON does not support comments.",
  ],

  // ─── Pro Tips ──────────────────────────────────────────────────────
  proTips: [
    "Use browser DevTools' Console: paste JSON.stringify(obj, null, 2) to format any object instantly without a separate tool.",
    "Install a JSON syntax-highlighting extension in your IDE for real-time validation as you type.",
    "For recurring API debugging, save a local HTML file with a textarea and JSON.parse/stringify — your own zero-dependency formatter.",
  ],

  // ─── Troubleshooting ──────────────────────────────────────────────
  troubleshooting: [
    {
      question: "Error: Unexpected token at position X.",
      answer:
        "A syntax error exists at character position X. Common causes: trailing comma, missing quote, or unescaped special character. Check the characters around position X in your input.",
    },
    {
      question: "The formatter outputs 'undefined' or nothing.",
      answer:
        "Your input may not be valid JSON. Ensure it starts with { or [ and that all strings use double quotes.",
    },
    {
      question: "Numbers with leading zeros cause errors.",
      answer:
        "JSON does not allow leading zeros in numbers (e.g., 007 is invalid). Remove leading zeros or quote the value as a string.",
    },
    {
      question: "The output loses my comments.",
      answer:
        "Standard JSON does not support comments. If you need comments, use JSONC (.jsonc) or JSON5 format with a compatible parser.",
    },
    {
      question: "Large JSON files make the browser unresponsive.",
      answer:
        "Files over 10 MB can block the main thread during JSON.parse(). Use a streaming parser or process in a Web Worker to keep the UI responsive.",
    },
  ],

  // ─── Benefits ──────────────────────────────────────────────────────
  benefits: [
    "Instant readability — transforms compressed one-line JSON into structured, indented output",
    "Syntax validation — catches errors (missing brackets, trailing commas) before they reach production",
    "Privacy — client-side formatting keeps API tokens and sensitive payloads on your device",
    "Zero installation — works in any browser without plugins or software",
  ],

  // ─── Limitations ──────────────────────────────────────────────────
  limitations: [
    "Standard JSON.parse() cannot handle comments, trailing commas, or single-quoted strings — use JSON5 for relaxed syntax",
    "Very large files (>50 MB) may exceed browser memory or freeze the tab during parsing",
    "JSON formatters do not validate semantic correctness (e.g., whether field values match a schema) — only syntax",
  ],

  // ─── Security Notes ───────────────────────────────────────────────
  securityNotes: [
    "Client-side formatters use JSON.parse() in the browser — no data is sent to any server",
    "Never paste API keys, JWT tokens, or database credentials into server-based formatters that may log inputs",
    "Verify the tool's network tab shows zero outgoing requests during formatting to confirm client-side processing",
  ],

  // ─── Performance Tips ─────────────────────────────────────────────
  performanceTips: [
    "For JSON files over 5 MB, use a Web Worker to run JSON.parse() off the main thread",
    "Minification (removing whitespace) can reduce JSON payload size by 20-40% for network transfer",
    "Use streaming parsers (e.g., JSONStream, oboe.js) for files too large to fit in memory as a single string",
  ],

  // ─── Use Cases ─────────────────────────────────────────────────────
  useCases: [
    "API debugging: Formatting API responses to locate specific fields in nested data structures",
    "Configuration validation: Checking package.json, tsconfig.json, or .eslintrc for syntax errors before deployment",
    "Data inspection: Pretty-printing database exports or log entries for analysis",
    "Code review: Formatting JSON fixtures or mock data for readable diffs in pull requests",
    "Documentation: Converting minified examples to formatted snippets for developer documentation",
  ],

  // ─── FAQs ──────────────────────────────────────────────────────────
  faqs: [
    // Existing
    {
      question: "Why does my JSON parsing throw errors?",
      answer:
        "Common culprits are missing closing brackets, trailing commas, or using single quotes instead of double quotes.",
    },
    {
      question: "Can a formatter minify JSON?",
      answer:
        "Yes, minification strips out all non-essential formatting spaces, condensing code bytes for API requests.",
    },
    // What
    {
      question: "What is JSON?",
      answer:
        "JavaScript Object Notation — a lightweight text-based data format using key-value pairs and ordered lists. Specified in RFC 8259.",
    },
    {
      question: "What data types does JSON support?",
      answer:
        "Six types: string (double-quoted), number, boolean (true/false), null, object ({}), and array ([]).",
    },
    {
      question: "What is the difference between JSON and JSONC?",
      answer:
        "JSONC (JSON with Comments) extends standard JSON to allow // and /* */ comments. VS Code's settings files use JSONC.",
    },
    {
      question: "What is JSON5?",
      answer:
        "A superset of JSON that allows comments, trailing commas, single-quoted strings, and unquoted keys — closer to JavaScript object literal syntax.",
    },
    // Who
    {
      question: "Who created JSON?",
      answer:
        "Douglas Crockford popularized and specified JSON. It became an ECMA standard (ECMA-404) in 2013 and an IETF standard (RFC 8259) in 2017.",
    },
    {
      question: "Who uses JSON?",
      answer:
        "Virtually every web developer. JSON is the dominant data interchange format for REST APIs, configuration files, and NoSQL databases like MongoDB and CouchDB.",
    },
    // When
    {
      question: "When should I use JSON vs XML?",
      answer:
        "JSON for web APIs and lightweight data exchange. XML for document-centric use cases, complex schemas with namespaces, or when XSLT transformations are needed.",
    },
    {
      question: "When should I minify JSON?",
      answer:
        "When transmitting over the network (API requests/responses) to reduce payload size. Keep formatted versions for human reading and debugging.",
    },
    // Where
    {
      question: "Where is JSON used besides APIs?",
      answer:
        "Configuration files (package.json, tsconfig.json), NoSQL databases (MongoDB), log formats, browser localStorage, and inter-service messaging.",
    },
    // Why
    {
      question: "Why can't JSON have comments?",
      answer:
        "Douglas Crockford intentionally excluded comments to prevent them from being used as parsing directives, keeping JSON a pure data format.",
    },
    {
      question: "Why is JSON preferred over XML for APIs?",
      answer:
        "JSON is more compact, easier to parse in JavaScript (native JSON.parse()), and maps directly to programming language data structures. XML requires heavier parsing and more verbose syntax.",
    },
    {
      question: "Why do trailing commas cause errors?",
      answer:
        "The JSON specification (RFC 8259) explicitly forbids trailing commas. A comma after the last element is a syntax violation that JSON.parse() rejects.",
    },
    // How
    {
      question: "How do I validate JSON programmatically?",
      answer:
        "Wrap JSON.parse(input) in a try-catch block. If it throws a SyntaxError, the input is invalid. The error message includes the character position of the problem.",
    },
    {
      question: "How do I format JSON in the command line?",
      answer:
        "Use 'python -m json.tool file.json' or pipe through 'jq .' for formatting. Both are available on most systems without installation.",
    },
    {
      question: "How do I convert JSON to other formats?",
      answer:
        "Parse with JSON.parse(), then serialize to the target format: CSV, YAML, XML, etc. Libraries like json2csv, js-yaml, and xmlbuilder handle specific conversions.",
    },
    // Can
    {
      question: "Can JSON contain functions?",
      answer:
        "No. JSON is a data-only format. Functions, undefined, and symbols are not valid JSON values. Use JavaScript object literals if you need functions.",
    },
    {
      question: "Can JSON represent dates?",
      answer:
        "Not natively. Dates are typically stored as ISO 8601 strings (e.g., \"2025-01-15T10:30:00Z\") and parsed by the consuming application.",
    },
    {
      question: "Can I nest JSON objects infinitely?",
      answer:
        "Technically yes, but deeply nested structures are hard to read and process. Most JSON parsers have a recursion depth limit (typically 100-1000 levels).",
    },
    // Should
    {
      question: "Should I use 2 or 4 spaces for indentation?",
      answer:
        "2 spaces is the convention for web development (Node.js, React). 4 spaces is common in enterprise Java and .NET codebases. Choose one and be consistent.",
    },
    {
      question: "Should I use JSON or YAML for configuration?",
      answer:
        "YAML is more human-readable and supports comments. JSON is more universally parsed and has stricter syntax. Use YAML for config files humans edit, JSON for machine-generated config.",
    },
    // Is
    {
      question: "Is JSON the same as a JavaScript object?",
      answer:
        "No. JSON is a string format with stricter rules: double quotes required, no functions, no undefined, no comments. A JavaScript object is an in-memory data structure.",
    },
    {
      question: "Is JSON case-sensitive?",
      answer:
        "Yes. Keys are case-sensitive: {\"Name\": \"A\"} and {\"name\": \"A\"} are different. Values true, false, and null must be lowercase.",
    },
    // Does
    {
      question: "Does JSON preserve key order?",
      answer:
        "The JSON specification does not guarantee key order. In practice, most parsers preserve insertion order, but you should not rely on it for logic.",
    },
    {
      question: "Does formatting change the data?",
      answer:
        "No. Formatting only adds or removes whitespace. The parsed data structure is identical whether the JSON is minified or pretty-printed.",
    },
    {
      question: "Does JSON support binary data?",
      answer:
        "Not directly. Binary data must be Base64-encoded into a string value. For binary-heavy payloads, consider MessagePack or Protocol Buffers instead.",
    },
    {
      question: "Does the formatter work offline?",
      answer:
        "Yes. Once the page is loaded, JSON formatting uses JSON.parse() and JSON.stringify() — both are built into the browser with no network dependency.",
    },
  ],

  // ─── Related Questions ─────────────────────────────────────────────
  relatedQuestions: [
    {
      question: "What is the difference between JSON and YAML?",
      answer:
        "YAML is a superset of JSON that supports comments, multi-line strings, and indentation-based nesting. JSON is stricter but more universally supported by parsers.",
    },
    {
      question: "How do I validate JSON against a schema?",
      answer:
        "Use JSON Schema (jsonschema.org) with a validator like ajv. Define expected types, required fields, and constraints in a schema document, then validate your data against it.",
    },
    {
      question: "What is jq and how do I use it?",
      answer:
        "jq is a command-line JSON processor. Use 'cat file.json | jq .' to format, 'jq .field' to extract values, and 'jq '.[] | select(.key==\"value\")' to filter arrays.",
    },
    {
      question: "How do I handle large JSON files efficiently?",
      answer:
        "Use streaming parsers (JSONStream, oboe.js) that process data incrementally instead of loading the entire file into memory.",
    },
    {
      question: "What is NDJSON (Newline Delimited JSON)?",
      answer:
        "A format where each line is a separate JSON object. Used for log streaming and data pipelines where line-by-line processing is more efficient than parsing a single large array.",
    },
    {
      question: "How do I diff two JSON files?",
      answer:
        "Format both files with the same indentation, then use a text diff tool. For semantic diffing (ignoring key order), use json-diff or jsondiffpatch libraries.",
    },
    {
      question: "What is JSON Schema?",
      answer:
        "A vocabulary for annotating and validating JSON documents. It defines expected types, required fields, patterns, and constraints — like a type system for JSON data.",
    },
    {
      question: "Can I use JSON for database storage?",
      answer:
        "Yes. NoSQL databases like MongoDB store documents in JSON-like formats (BSON). PostgreSQL also has native JSON and JSONB column types for semi-structured data.",
    },
    {
      question: "What is GraphQL and how does it relate to JSON?",
      answer:
        "GraphQL is a query language for APIs. Responses are typically returned in JSON format, but GraphQL allows clients to specify exactly which fields they need.",
    },
    {
      question: "How do I escape special characters in JSON?",
      answer:
        "Use backslash escapes: \\\" for quotes, \\\\ for backslash, \\n for newline, \\t for tab, and \\uXXXX for Unicode characters.",
    },
  ],

  // ─── Glossary ──────────────────────────────────────────────────────
  glossary: [
    {
      term: "JSON (JavaScript Object Notation)",
      definition:
        "A lightweight, text-based data interchange format derived from JavaScript object syntax. Standardized as ECMA-404 and RFC 8259.",
    },
    {
      term: "Minification",
      definition:
        "The process of removing all non-essential whitespace, newlines, and formatting from JSON to reduce payload size for network transfer.",
    },
    {
      term: "Pretty-printing",
      definition:
        "Adding indentation and line breaks to JSON for human readability. Accomplished via JSON.stringify(obj, null, spaces).",
    },
    {
      term: "RFC 8259",
      definition:
        "The IETF specification defining the JSON data interchange format, including syntax rules, encoding requirements, and data types.",
    },
    {
      term: "JSON Schema",
      definition:
        "A vocabulary for describing and validating the structure of JSON data, defining expected types, required fields, and value constraints.",
    },
    {
      term: "Syntax validation",
      definition:
        "The process of checking whether a JSON string conforms to the JSON grammar rules — balanced brackets, double-quoted keys, no trailing commas.",
    },
    {
      term: "Serialization",
      definition:
        "Converting an in-memory data structure (object, array) into a string format (JSON) for storage or transmission.",
    },
    {
      term: "Deserialization (Parsing)",
      definition:
        "Converting a JSON string back into an in-memory data structure using JSON.parse() or equivalent.",
    },
    {
      term: "JSONC",
      definition:
        "JSON with Comments — an extension of JSON that allows single-line (//) and multi-line (/* */) comments. Used by VS Code for settings files.",
    },
    {
      term: "jq",
      definition:
        "A lightweight command-line JSON processor for formatting, filtering, and transforming JSON data using a concise query syntax.",
    },
  ],

  // ─── Conclusion ────────────────────────────────────────────────────
  conclusion:
    "A JSON formatter is an essential developer tool that transforms unreadable minified data into structured, indented output while validating syntax. Using a client-side formatter ensures API tokens and sensitive payloads never leave your device. Master JSON.parse() and JSON.stringify() and you'll rarely need a separate tool.",

  // ─── Convenience fields ────────────────────────────────────────────
  relatedTools: ["json-formatter", "sql-formatter", "jwt-decoder"],
  relatedGuides: ["what-is-bmi", "how-to-convert-png-to-jpg"],
};
