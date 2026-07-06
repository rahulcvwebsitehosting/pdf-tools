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

export const csvVsExcel: ComparisonContent = {
  id: "comparison.csv-vs-excel",
  type: "comparison",
  slug: "csv-vs-excel",
  title: "CSV vs Excel (XLSX): Which Spreadsheet Format Should You Use?",
  description:
    "A comprehensive comparison of CSV and Excel (XLSX) formats covering data fidelity, formulas, interoperability, file size, and best use cases for data exchange, analysis, and automation.",
  seoTitle: "CSV vs Excel (XLSX) — Complete Format Comparison | ToolsAtZero",
  metaDescription:
    "CSV vs Excel explained: formulas, data types, compatibility, file size, and automation support. Learn when to use CSV or XLSX for data exchange, reporting, and analysis.",
  keywords: [
    "csv vs excel",
    "csv vs xlsx",
    "xlsx vs csv",
    "csv or excel",
    "csv vs excel difference",
    "when to use csv",
    "csv vs xlsx file size",
    "csv vs excel for data",
    "csv excel comparison",
    "csv vs spreadsheet",
  ],
  entityIds: ["csv", "xlsx", "tsv"],
  status: "published",

  meta: defaultMeta({
    topicId: "data.csv-vs-excel",
    difficulty: "beginner",
    readingTimeMinutes: 7,
    targetAudience: ["data analysts", "developers", "business users", "data engineers"],
    searchIntents: ["comparison", "informational", "decision-making"],
    aliases: ["csv vs xlsx", "excel vs csv", "spreadsheet vs csv"],
  }),

  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 8, expectedTraffic: "high" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  relationships: defaultRelationships({
    parents: ["category.data-formats"],
    siblings: ["comparison.json-vs-xml"],
    relatedGuides: ["guide.csv-to-json"],
    relatedComparisons: ["comparison.json-vs-xml"],
    relatedCategories: ["category.developer-tools"],
  }),

  recommendations: defaultRecommendations({
    beginner: ["guide.csv-to-json"],
    next: ["comparison.json-vs-xml"],
    popular: ["comparison.png-vs-jpg", "comparison.pdf-vs-docx"],
  }),

  formatA: "CSV",
  formatB: "Excel (XLSX)",

  similarities: [
    "Both store tabular data organized in rows and columns.",
    "Both can be opened and edited in Microsoft Excel, Google Sheets, and LibreOffice Calc.",
    "Both are widely used for data import/export in business, science, and engineering workflows.",
    "Both support UTF-8 encoding for international character sets.",
    "Both can be generated and parsed programmatically in virtually every programming language.",
    "Both are commonly used as interchange formats between databases, APIs, and analytics tools.",
    "Both can represent datasets with thousands to millions of rows.",
  ],

  differences: [
    "Structure: CSV is plain text with comma-delimited values; XLSX is a ZIP archive of XML files following the Office Open XML standard.",
    "Formulas: CSV stores only raw values — no formulas, functions, or calculated cells. XLSX supports 500+ built-in functions and cross-sheet references.",
    "Data types: CSV treats all values as text strings; XLSX preserves typed data (numbers, dates, booleans, currencies) with full formatting.",
    "Multiple sheets: CSV represents a single flat table; XLSX supports unlimited named worksheets in a single file.",
    "Formatting: CSV has zero formatting capability; XLSX supports fonts, colors, borders, conditional formatting, cell merges, and styles.",
    "Charts and visuals: CSV cannot contain charts; XLSX embeds charts, sparklines, images, and pivot tables.",
    "Macros: CSV has no macro support; XLSX (as .xlsm) supports VBA macros for automation.",
    "File size: CSV files are typically 2–5× smaller than equivalent XLSX files for the same raw data because CSV has zero overhead.",
    "Human readability: CSV files can be read in any text editor; XLSX requires specialized software to read (it's a binary ZIP archive).",
    "Data validation: CSV has no built-in validation; XLSX supports dropdown lists, input constraints, and custom validation rules.",
    "Leading zeros: CSV parsers often strip leading zeros from values like zip codes (\"01234\" → 1234); XLSX preserves them when cells are formatted as text.",
    "Maximum rows: CSV has no inherent row limit; XLSX is limited to 1,048,576 rows per sheet.",
  ],

  prosA: [
    "Universal compatibility — every programming language, database, and tool can read and write CSV natively.",
    "Tiny file sizes with zero overhead — pure data, no formatting bloat.",
    "Human-readable and editable in any text editor (Notepad, Vim, VS Code).",
    "Ideal for data pipelines, ETL processes, and automated data exchange between systems.",
    "No vendor lock-in — CSV is an open, simple format that will never become obsolete.",
    "Git-friendly — CSV diffs are meaningful, making version control of data practical.",
  ],

  prosB: [
    "Rich formatting with fonts, colors, borders, and conditional formatting for presentation-ready reports.",
    "500+ built-in functions and formula support for calculations, lookups, and data analysis.",
    "Multiple worksheets in a single file for organized, multi-tab workbooks.",
    "Charts, pivot tables, and data visualization embedded directly in the file.",
    "Data validation with dropdowns and input constraints reduces entry errors.",
    "VBA macro support (as .xlsm) for workflow automation.",
  ],

  consA: [
    "No formula support — all computed values must be pre-calculated before saving.",
    "No formatting — CSV files look identical regardless of how important different data points are.",
    "Ambiguous parsing: no universal standard for delimiter, quoting, or encoding — edge cases (commas in values, newlines in fields) cause parsing failures.",
    "Leading zeros, dates, and scientific notation are frequently mangled by spreadsheet apps auto-interpreting CSV text as numbers.",
    "Single table per file — representing hierarchical or multi-sheet data requires multiple CSV files.",
  ],

  consB: [
    "Proprietary format controlled by Microsoft — though standardized as ISO 29500, full compatibility requires MS Office or compatible suites.",
    "Large file sizes due to XML overhead, embedded styles, and metadata — a 10 MB CSV dataset may become 25–40 MB as XLSX.",
    "Cannot be meaningfully diffed in version control — XLSX is a binary ZIP archive.",
    "Slow to parse programmatically compared to CSV — requires XML parsing of multiple internal files.",
    "Row limit of 1,048,576 per sheet can be a hard constraint for large datasets.",
  ],

  performance:
    "CSV dramatically outperforms XLSX in data pipeline scenarios. Parsing a 1 million-row CSV file takes ~2 seconds in Python (pandas); the equivalent XLSX file takes ~30–60 seconds due to XML decompression and parsing overhead. CSV files are also 2–5× smaller on disk, reducing I/O and transfer times. However, XLSX's built-in calculation engine eliminates the need for external processing when formulas suffice, saving overall workflow time for interactive analysis.",

  compatibility:
    "CSV is the universal data interchange format — supported by every database (PostgreSQL, MySQL, SQLite), every programming language (Python, R, Java, JavaScript), every analytics tool (Tableau, Power BI, Looker), and every spreadsheet application. XLSX is primarily associated with Microsoft Excel but is also supported by Google Sheets, LibreOffice Calc, and most modern analytics tools. For cross-system data exchange, CSV wins on universality. For end-user reports delivered to business stakeholders, XLSX is expected and preferred.",

  seoImpact:
    "Neither CSV nor XLSX files are directly indexed by search engines for web content. However, offering downloadable data in both formats improves user experience signals and can earn backlinks from data-focused communities.",

  bestUseCases:
    "Use CSV for: database imports/exports, API data exchange, ETL pipelines, log files, data science workflows (pandas, R), version-controlled datasets, and any scenario requiring maximum interoperability. Use XLSX for: financial reports, business dashboards, client-facing deliverables, data entry forms with validation, any document requiring formulas or charts, and collaborative editing in Microsoft 365 or Google Sheets. For large-scale data processing (100M+ rows), consider Parquet or Apache Arrow instead of either format.",

  recommendation:
    "CSV and XLSX serve fundamentally different roles. CSV is a data transport format — simple, universal, and efficient for moving data between systems. XLSX is a data presentation and analysis format — rich, interactive, and designed for human consumption. Use CSV when machines are the primary consumer; use XLSX when humans need to read, analyze, or present the data. For modern data engineering, pair CSV/Parquet for pipelines with XLSX for final reports.",

  faqs: [
    { question: "Can Excel open CSV files?", answer: "Yes. Excel opens CSV files natively, but may auto-format values (converting zip codes to numbers, dates to different formats). Use 'Import Data' wizard or specify column types to prevent mangling." },
    { question: "Why does Excel mess up my CSV dates?", answer: "Excel auto-interprets text that looks like dates (e.g., '1/2/3' becomes January 2, 2003). Import via Data > From Text/CSV and set column types to 'Text' to prevent this." },
    { question: "Is CSV faster than Excel for large datasets?", answer: "Yes, dramatically. A 1M-row CSV parses in ~2 seconds in Python; the same data as XLSX takes 30–60 seconds due to XML decompression overhead." },
    { question: "Can I convert CSV to Excel without losing data?", answer: "Yes. All CSV data transfers to XLSX without loss. You gain the ability to add formatting, formulas, and multiple sheets. The file size will increase." },
    { question: "Does CSV support multiple sheets?", answer: "No. CSV represents a single flat table. For multi-table data, use multiple CSV files or switch to XLSX." },
    { question: "What delimiter does CSV use?", answer: "Comma is the default, but there is no universal standard. TSV uses tabs, and many European systems use semicolons because commas serve as decimal separators in those locales." },
    { question: "Can CSV store formulas?", answer: "No. CSV stores only raw text values. Any Excel formulas are evaluated and their results are stored as static values when saving to CSV." },
    { question: "Why are my CSV leading zeros disappearing?", answer: "Spreadsheet applications interpret '01234' as the number 1234. Format the column as 'Text' before importing, or prefix values with an apostrophe in the CSV source." },
    { question: "Which format is better for data science?", answer: "CSV is the standard for data science workflows (pandas, R, scikit-learn). For high-performance needs, Parquet is increasingly preferred. XLSX is rarely used in production data pipelines." },
    { question: "Can I version control Excel files?", answer: "Technically yes, but XLSX diffs are meaningless (it's a binary ZIP). CSV files produce readable diffs in Git. For version-controlled data, CSV is strongly preferred." },
    { question: "What is the maximum file size for CSV?", answer: "CSV has no inherent file size or row limit. However, Excel can only open CSV files with up to 1,048,576 rows. For larger CSVs, use Python, R, or database tools." },
    { question: "Is XLSX the same as XLS?", answer: "No. XLS is the legacy binary format (Excel 97–2003). XLSX is the modern Office Open XML format introduced in Excel 2007. XLSX files are smaller, more resilient, and an ISO standard." },
    { question: "Can Google Sheets export CSV?", answer: "Yes. File > Download > Comma Separated Values (.csv). Google Sheets can also import CSV files directly via File > Import." },
    { question: "Should I use CSV or JSON for API data?", answer: "JSON is standard for web APIs due to nested structure support. CSV is preferred for flat tabular data exports, bulk data downloads, and data warehouse imports." },
    { question: "How do I handle commas inside CSV values?", answer: "Enclose the field in double quotes: \"New York, NY\". If the value also contains quotes, escape them by doubling: \"She said \"\"hello\"\"\"." },
    { question: "Can CSV store images or charts?", answer: "No. CSV is pure text. Any embedded content (images, charts, formatting) is lost when saving as CSV." },
    { question: "What encoding should I use for CSV?", answer: "UTF-8 with BOM (Byte Order Mark) for maximum compatibility. The BOM helps Excel correctly detect UTF-8 encoding instead of defaulting to ANSI." },
    { question: "Is there a CSV standard?", answer: "RFC 4180 defines a common format, but it is informational, not a strict standard. Real-world CSV files vary widely in delimiter, quoting, and encoding." },
  ],

  glossary: [
    { term: "CSV (Comma-Separated Values)", definition: "A plain-text file format where each line represents a data row and values within each row are separated by commas (or other delimiters)." },
    { term: "XLSX", definition: "The modern Excel file format based on Office Open XML (OOXML). It is a ZIP archive containing XML files for worksheets, styles, shared strings, and metadata." },
    { term: "Delimiter", definition: "The character used to separate individual values in a CSV row. Common delimiters include comma, tab (TSV), semicolon, and pipe." },
    { term: "RFC 4180", definition: "An informational RFC that describes a common CSV format: comma delimiter, CRLF line endings, optional double-quote enclosure for fields containing special characters." },
    { term: "ETL (Extract, Transform, Load)", definition: "A data pipeline pattern that extracts data from sources, transforms it, and loads it into a target system. CSV is the most common interchange format in ETL workflows." },
    { term: "BOM (Byte Order Mark)", definition: "A special Unicode character (U+FEFF) placed at the beginning of a text file to signal its encoding. UTF-8 BOM helps Excel correctly detect CSV encoding." },
    { term: "VBA (Visual Basic for Applications)", definition: "Microsoft's macro programming language embedded in Excel. VBA enables automation of repetitive tasks, custom functions, and complex workflows within XLSX/XLSM files." },
    { term: "Pivot Table", definition: "An Excel feature that summarizes large datasets by grouping, filtering, and aggregating values across categories. Available only in XLSX, not CSV." },
    { term: "Office Open XML (OOXML)", definition: "The ISO/IEC 29500 standard that defines the XML-based file formats used by Microsoft Office, including .xlsx, .docx, and .pptx." },
    { term: "Data Validation", definition: "Excel's feature for restricting cell input to specific values, ranges, or formats. Used for dropdown lists, numeric constraints, and custom validation formulas." },
    { term: "Parquet", definition: "A columnar storage format optimized for big data processing. Parquet offers superior compression and query performance compared to both CSV and XLSX for analytical workloads." },
    { term: "TSV (Tab-Separated Values)", definition: "A CSV variant that uses tab characters as delimiters instead of commas. TSV avoids ambiguity when data values contain commas." },
  ],

  aiBlocks: defaultAIBlocks({
    aiSummary:
      "CSV is a plain-text data transport format optimized for machine processing and universal interoperability. Excel (XLSX) is a rich spreadsheet format with formulas, formatting, charts, and multiple sheets designed for human analysis and presentation. Choose CSV for data pipelines and system integration; choose XLSX for reports and interactive analysis.",
    keyTakeaways: [
      "CSV is 2–5× smaller and 10–30× faster to parse than equivalent XLSX files.",
      "XLSX preserves formulas, formatting, data types, and multiple sheets; CSV stores only raw text values.",
      "CSV is the universal interchange format — every tool, language, and database supports it.",
      "Excel auto-formatting frequently mangles CSV dates, leading zeros, and scientific notation.",
      "For modern large-scale data work, consider Parquet as a successor to both formats.",
    ],
    quickFacts: [
      "RFC 4180 defines a common CSV format, but it is not a strict standard.",
      "XLSX's 1,048,576 row limit dates from Excel 2007; CSV has no inherent limit.",
      "A typical 100,000-row dataset: ~5 MB as CSV vs ~15 MB as XLSX.",
      "Excel supports 500+ built-in functions; CSV supports zero.",
      "The first CSV-like format appeared in the 1970s on IBM mainframes.",
    ],
    commonMisconceptions: [
      "\"CSV is just a simpler version of Excel\" — They serve fundamentally different purposes: transport vs. analysis.",
      "\"XLSX is always better because it has more features\" — Feature richness adds overhead and complexity inappropriate for data pipelines.",
      "\"CSV files are always comma-separated\" — Many use tabs, semicolons, or pipes depending on locale and convention.",
    ],
    didYouKnow: [
      "Excel's auto-formatting of gene names (like SEPT1 → September 1) has caused real errors in published genomics research papers.",
      "The oldest surviving CSV-like file format dates back to FORTRAN punch card conventions in the 1960s.",
    ],
    expertTips: [
      "Always specify encoding (UTF-8 BOM) and quoting rules when exchanging CSV files between systems to prevent data corruption.",
      "For Python workflows, use pandas read_csv() with dtype=str to prevent unwanted type inference, then cast columns explicitly.",
      "When delivering data to business users, export CSV for their tools but also provide XLSX with formatting for immediate presentation.",
    ],
  }),
};
