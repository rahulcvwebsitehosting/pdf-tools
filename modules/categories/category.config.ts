export interface CategoryHeroConfig {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface CategorySEOConfig {
  title: string;
  metaDescription: string;
  keywords: string[];
}

export interface CategoryStat {
  label: string;
  value: string;
}

export interface CategoryConfig {
  slug: string;
  categoryKey: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  hero: CategoryHeroConfig;
  statistics: CategoryStat[];
  featuredTools: string[];
  relatedCategories: string[];
  relatedGuides: string[];
  hubPages: string[];
  keywords: string[];
  seo: CategorySEOConfig;
  faq: Array<{ question: string; answer: string }>;
  aiSummary: string;
  searchIntent: string;
  keyTakeaways: string[];

  // Knowledge Hub fields
  overview?: string;
  beginnerGuide?: string;
  useCases?: string[];
  commonProblems?: string[];
  recommendedWorkflow?: string[];
  glossary?: Array<{ term: string; definition: string }>;
  industryApplications?: string[];
  entityIds?: string[];
}

export const categoriesConfig: CategoryConfig[] = [
  {
    slug: "pdf-tools",
    categoryKey: "pdf",
    title: "PDF Suite",
    subtitle: "Secure In-Browser PDF Editing and Conversions",
    icon: "FileText",
    description: "Perform PDF merges, splits, encryption, watermarks, metadata edits, and image conversions locally inside your browser.",
    hero: {
      title: "PDF Suite",
      subtitle: "100% private client-side document editor.",
      ctaText: "Get Started"
    },
    statistics: [
      { label: "Active Utilities", value: "16 Tools" },
      { label: "Execution Latency", value: "0ms (Local)" }
    ],
    featuredTools: ["merge-pdf", "split-pdf", "compress-pdf"],
    relatedCategories: ["developer-tools", "image-tools", "text-tools"],
    relatedGuides: ["how-to-merge-pdf", "how-to-compress-images"],
    hubPages: ["best-pdf-tools"],
    keywords: ["free pdf tools", "pdf merger", "pdf splitter"],
    seo: {
      title: "Free PDF Tools Online | 100% Private PDF Suite | ToolsAtZero",
      metaDescription: "Free online PDF suite for watermarking, merging, splitting, protecting, and unlocking PDF files. 100% client-side privacy with zero uploads.",
      keywords: ["free pdf tools", "pdf merger", "pdf splitter"]
    },
    faq: [
      { question: "Are my PDF documents uploaded to your servers?", answer: "No. All PDF operations happen in your browser using local JavaScript. Your files never leave your device." },
      { question: "Is there a file size limit for merging or splitting?", answer: "The limits depend entirely on your browser and system RAM since all processing happens in-memory." }
    ],
    aiSummary: "The PDF Suite provides client-side utilities to manipulate PDF files. It handles splits, merges, conversions, and protections locally via browser memory buffers.",
    searchIntent: "Edit, convert, and secure PDF files locally in-browser.",
    keyTakeaways: [
      "Zero server uploads ensure 100% document privacy.",
      "Supports large merges, splits, watermarks, and decryptions.",
      "Runs instantly in the browser without any software installation."
    ],
    overview: "Portable Document Format (PDF) is the universal file format for sharing document layouts across systems. ToolsAtZero's PDF Suite provides clean, secure, client-side PDF modification. By executing tasks directly in-browser using WebAssembly and memory buffers, your confidential document information never reaches external cloud servers, preventing common cloud-storage leaks.",
    beginnerGuide: "Select a tool such as Merge PDF or Split PDF. Drop your files into the drag box. The tool loads them into client-side RAM buffer streams. Set options like page ranges or passwords, then click execute. Save your processed file directly to your downloads directory.",
    useCases: [
      "Locking business contracts or bank statements with strong local passwords.",
      "Combining scattered invoice drafts and slides into a single combined project portfolio.",
      "Extracting page-specific documents from long technical handbooks."
    ],
    commonProblems: [
      "Encrypted source PDFs must be unlocked before you can combine them.",
      "Very large PDF structures can exceed tab memory limits on lightweight mobile devices.",
      "Scanned images may increase final PDF file sizes."
    ],
    recommendedWorkflow: [
      "Unlock protected files using the Unlock PDF tool.",
      "Merge multiple document streams together.",
      "Compress the combined PDF output to save storage.",
      "Apply passwords or watermarks to finalize the document."
    ],
    glossary: [
      { term: "PDF", definition: "Portable Document Format — a file layout preserving exact formatting on all screens." },
      { term: "Client-Side Processing", definition: "Script execution that runs locally in-browser, preventing file uploads." },
      { term: "Encryption", definition: "Applying a cryptographic password layer to secure PDF contents." }
    ],
    industryApplications: [
      "Legal: Merging case exhibits, documents, and signatures.",
      "Education: Splitting student handouts and worksheets.",
      "Real Estate: Combining lease agreements and property photos."
    ],
    entityIds: ["pdf", "compression-lossless"]
  },
  {
    slug: "developer-tools",
    categoryKey: "developer",
    title: "Developer Tools",
    subtitle: "Formatters, Decoders, and Generators for Software Engineers",
    icon: "Code",
    description: "Format SQL, format JSON, decode JWT tokens, generate UUIDs, encode base64 text, and test regular expressions in-browser securely.",
    hero: {
      title: "Developer Tools",
      subtitle: "Secure debugging and formatting console.",
      ctaText: "Start Formatting"
    },
    statistics: [
      { label: "Engineers Using", value: "100% Offline" },
      { label: "Format Latency", value: "Realtime" }
    ],
    featuredTools: ["json-formatter", "sql-formatter", "jwt-decoder"],
    relatedCategories: ["pdf-tools", "web-tools", "text-tools"],
    relatedGuides: ["json-formatter-explained", "how-to-compress-images"],
    hubPages: ["best-developer-tools"],
    keywords: ["json formatter", "jwt decoder", "sql formatter"],
    seo: {
      title: "Free Developer Tools | Formatters, Generators & Decoders | ToolsAtZero",
      metaDescription: "Format JSON, beautify SQL, decode JWT tokens, and generate UUIDs locally. Fast developer utilities with client-side execution.",
      keywords: ["json formatter", "jwt decoder", "sql formatter"]
    },
    faq: [
      { question: "Can I decode sensitive JWT tokens safely?", answer: "Yes. The JWT decoder splits the token signature locally. No tokens are sent over the network." },
      { question: "Is the SQL formatter compliant with standard dialets?", answer: "Yes, it formats standard SQL syntax locally inside your browser." }
    ],
    aiSummary: "A collection of software developer utilities for encoding, formatting, parsing, and testing data formats securely without server-side leaks.",
    searchIntent: "Format, decode, and generate code snippets privately in-browser.",
    keyTakeaways: [
      "No developer keys or credentials are sent over the network.",
      "Fast formatting and parsing of JSON, SQL, JWT, and Base64.",
      "UUID generators run locally using crypto API."
    ],
    overview: "Engineering diagnostics often involve handling sensitive secrets, database records, and authentication payloads. Pasting proprietary configs or JWT authorization headers into cloud formatters is a major compliance risk. ToolsAtZero Developer Tools resolve format strings, token decodings, and UUID parameters locally, preventing leaks.",
    beginnerGuide: "Choose a formatting utility, paste your JSON or SQL query into the edit canvas, customize spacing parameters, and immediately retrieve the formatted copy. JWT decoders present header, payload, and signature values in separate panels on input change.",
    useCases: [
      "Inspecting active JWT bearer tokens to view payload details during API debugging.",
      "Beautifying obfuscated JSON error configs or API responses.",
      "Generating multiple secure UUID v4 tokens for database seeds."
    ],
    commonProblems: [
      "Syntax errors in raw data payloads can prevent correct formatting outputs.",
      "Invalid JSON formatting (e.g. single quotes) will trigger validation alarms."
    ],
    recommendedWorkflow: [
      "Validate code block formatting using JSON validators.",
      "Strip developer keys before staging codes.",
      "Generate clean UUID parameters for test DB records."
    ],
    glossary: [
      { term: "JSON", definition: "JavaScript Object Notation — lightweight data-interchange layout." },
      { term: "JWT", definition: "JSON Web Token — open standard secure method to transmit information between systems." },
      { term: "UUID", definition: "Universally Unique Identifier — standard 128-bit value to distinct database rows." }
    ],
    industryApplications: [
      "Software Engineering: Debugging API outputs and database logs.",
      "Security Audits: Inspecting base64 headers and authorization credentials.",
      "System Administration: Generating mock configs."
    ],
    entityIds: ["json", "xml", "csv", "yaml"]
  },
  {
    slug: "text-tools",
    categoryKey: "office",
    title: "Office & Text Tools",
    subtitle: "Case Converters, Counters, and Text Manipulation Utilities",
    icon: "FileSignature",
    description: "Convert text cases, count words, search and replace text, clean duplicates, sort lines, format CSVs, and analyze text readability locally.",
    hero: {
      title: "Text Tools",
      subtitle: "Clean and manipulate text blocks securely.",
      ctaText: "Process Text"
    },
    statistics: [
      { label: "Character Limits", value: "Unlimited" },
      { label: "Processing Speed", value: "Instant" }
    ],
    featuredTools: ["case-converter", "word-counter", "csv-to-json"],
    relatedCategories: ["pdf-tools", "developer-tools", "time-tools"],
    relatedGuides: ["what-is-bmi", "json-formatter-explained"],
    hubPages: ["best-text-utilities"],
    keywords: ["case converter", "word counter", "csv to json"],
    seo: {
      title: "Free Text Tools & Office Utilities | Word Count & Converters | ToolsAtZero",
      metaDescription: "Manipulate text, convert case types, count words, filter duplicate lines, and convert CSV files. Clean text utilities running client-side.",
      keywords: ["case converter", "word counter", "csv to json"]
    },
    faq: [
      { question: "Does the word counter support multiple languages?", answer: "Yes, it parses Unicode boundaries to accurately count words across different character sets." },
      { question: "How large of a text file can I sort or clean?", answer: "It supports text blocks up to several megabytes easily without lagging browser threads." }
    ],
    aiSummary: "Text manipulation and conversion utilities that process strings, lists, CSV files, and markdown layouts in-browser.",
    searchIntent: "Count words, convert casing, clean lists, and transform text formats locally.",
    keyTakeaways: [
      "Safe for proprietary documents and copy-paste buffers.",
      "Convert case patterns, extract keywords, and clean duplicate lines instantly.",
      "Convert CSV data to Excel or JSON without spreadsheets."
    ],
    overview: "Text transformation tasks like line sorting, case changes, and duplicate line clearing are frequent daily workflows. However, processing business records, logs, or drafts on remote servers exposes text parameters. ToolsAtZero's Text Suite keeps your copy buffers local inside browser sandboxes.",
    beginnerGuide: "Paste your text block into the editor, select the transformation option (e.g. UPPERCASE, camelCase, or Sort Lines), and immediately copy the cleaned output from the terminal window.",
    useCases: [
      "Cleaning raw list blocks by sorting rows and filtering duplicate lines.",
      "Converting CSV log listings into readable JSON structures.",
      "Verifying character counts and reading times for document publications."
    ],
    commonProblems: [
      "Special emoji strings or tabs can shift delimiter alignments in CSV outputs.",
      "Extremely large log records can cause slow input parsing if browser memory is low."
    ],
    recommendedWorkflow: [
      "Paste text lists and clear duplicate rows.",
      "Format CSV logs to JSON formats.",
      "Translate camelCase key variables for code files."
    ],
    glossary: [
      { term: "CamelCase", definition: "A capitalization layout where words are combined without spaces, capitalizing each word start." },
      { term: "CSV", definition: "Comma-Separated Values — flat tabular file layout separated by delimiters." }
    ],
    industryApplications: [
      "Content Writing: Counting words and evaluating readability scores.",
      "Data Analytics: Cleansing lists and importing CSV logs.",
      "Virtual Assistants: Cleaning email strings and formatting case listings."
    ],
    entityIds: ["csv", "json", "html"]
  },
  {
    slug: "image-tools",
    categoryKey: "image",
    title: "Image Tools",
    subtitle: "Client-Side Image Compressors, Resizers, and Converters",
    icon: "Image",
    description: "Compress images, resize dimensions, crop bounds, strip metadata, and convert formats locally in your browser.",
    hero: {
      title: "Image Suite",
      subtitle: "Client-side image optimizer with no limits.",
      ctaText: "Compress Images"
    },
    statistics: [
      { label: "File Upload Limit", value: "No Uploads" },
      { label: "Format Support", value: "PNG/JPG/SVG" }
    ],
    featuredTools: ["image-compressor", "image-resizer", "png-to-jpg"],
    relatedCategories: ["pdf-tools", "web-tools", "developer-tools"],
    relatedGuides: ["how-to-compress-images", "how-to-convert-png-to-jpg"],
    hubPages: ["best-image-editing-tools", "best-image-conversion-tools"],
    keywords: ["image compressor", "image resizer", "png to jpg"],
    seo: {
      title: "Free Image Tools | Compressors, Resizers & Format Converters | ToolsAtZero",
      metaDescription: "Compress PNG/JPG files, resize pixel dimensions, strip image metadata, and convert image formats locally in-browser.",
      keywords: ["image compressor", "image resizer", "png to jpg"]
    },
    faq: [
      { question: "How does the local image compressor work?", answer: "It draws image blocks to an HTML5 canvas and re-exports them at customized JPEG quality targets." },
      { question: "Does metadata stripping affect image quality?", answer: "No. It strips only the EXIF headers; pixel details remain untouched." }
    ],
    aiSummary: "Visual processing tools built on canvas interfaces that resize, crop, strip EXIF metadata, and compress images directly in browser sandbox contexts.",
    searchIntent: "Resize, compress, crop, and convert image files in-browser.",
    keyTakeaways: [
      "Compress and resize images without uploading media files.",
      "Strip geolocation and camera metadata from photos before publishing.",
      "Convert image extensions instantly in-memory."
    ],
    overview: "Optimizing website speed requires compressed images. ToolsAtZero's Image Suite resizes dimensions, downsamples file bytes, crops coordinates, and converts formats locally. We leverage canvas APIs to render graphics in-memory, keeping camera configurations and family photos secure.",
    beginnerGuide: "Choose an image tool (e.g. Compressor). Drag JPEGs or PNGs into the canvas. Modify target quality, scale, or coordinates, then click compress. Save optimized media instantly.",
    useCases: [
      "Compressing screenshots before adding them to bug logs to save storage.",
      "Stripping EXIF camera metadata and location headers from private photos.",
      "Converting heavy SVG designs to light raster PNG files."
    ],
    commonProblems: [
      "Iterative lossy compressions can degrade pixel colors progressively.",
      "Extremely high-resolution photo dimensions can strain device RAM parameters."
    ],
    recommendedWorkflow: [
      "Strip geo EXIF metadata headers from images.",
      "Resize canvas pixel dimensions to target size.",
      "Compress files using JPEG quality presets.",
      "Convert PNG formats to WebP or JPEG."
    ],
    glossary: [
      { term: "EXIF", definition: "Exchangeable Image File Format — metadata fields containing camera profiles, location, and dates." },
      { term: "Lossless Compression", definition: "File byte reduction that retains 100% of the original pixel data." }
    ],
    industryApplications: [
      "Web Development: Preparing optimized images for layout loads.",
      "Social Media: Stripping location details before publishing photos.",
      "Design: Rasterizing vector assets."
    ],
    entityIds: ["jpeg", "png", "webp", "avif", "svg", "exif"]
  },
  {
    slug: "web-tools",
    categoryKey: "web",
    title: "Web Tools",
    subtitle: "Minifiers, Generators, and URL Utility Kits",
    icon: "Globe",
    description: "Encode/decode URLs, minify HTML, CSS, and JS files, generate meta tags, create sitemaps, and test regex parameters locally.",
    hero: {
      title: "Web Suite",
      subtitle: "Clean optimization script codes locally.",
      ctaText: "Minify Web Files"
    },
    statistics: [
      { label: "Compression Rate", value: "Up to 70%" },
      { label: "Security Level", value: "Sandbox" }
    ],
    featuredTools: ["url-encoder-decoder", "html-minifier", "meta-tag-generator"],
    relatedCategories: ["developer-tools", "image-tools", "text-tools"],
    relatedGuides: ["json-formatter-explained", "how-to-compress-images"],
    hubPages: ["best-browser-based-tools"],
    keywords: ["url encoder", "html minifier", "meta tag generator"],
    seo: {
      title: "Free Web Utilities | HTML Minifiers & Meta Generators | ToolsAtZero",
      metaDescription: "Minify HTML/CSS/JS files, generate custom meta tags, build robots.txt configs, and encode URLs securely in-browser.",
      keywords: ["url encoder", "html minifier", "meta tag generator"]
    },
    faq: [
      { question: "Are minified scripts safe to deploy?", answer: "Yes, they parse structural syntax trees and shorten variable symbols without changing program execution logic." },
      { question: "What is URL encoding used for?", answer: "It translates unsafe characters in web query strings into standard percent-encoded values." }
    ],
    aiSummary: "Front-end engineering resources that clean codes, escape URLs, build robot configurations, and map directories client-side.",
    searchIntent: "Minify code, encode URLs, and generate configuration files locally.",
    keyTakeaways: [
      "Compress code files instantly with local JavaScript engines.",
      "Generate custom meta tags and robots.txt files in a snap.",
      "Encode/decode query parameter characters safely."
    ],
    overview: "Creating websites requires clean configs, compressed files, and escaped URLs. ToolsAtZero's Web Tools minifies script blocks, compiles robots.txt configurations, and encodes parameters locally. Developers can test regex strings and construct sitemaps safely.",
    beginnerGuide: "Select a utility like URL Encoder. Input your target string or code, configure formatting options, and instantly copy the minified or encoded string directly from the browser window.",
    useCases: [
      "Minifying bulky CSS styling definitions before production deployments.",
      "Encoding query parameters containing complex characters to prevent breaking URLs.",
      "Generating standard meta tags for social shares."
    ],
    commonProblems: [
      "Incorrect regex expressions can block matching rules.",
      "Aggressive minifiers can sometimes break unclosed tags."
    ],
    recommendedWorkflow: [
      "Validate query strings using URL encoders.",
      "Minify final CSS stylesheets to speed up layouts.",
      "Generate sitemap listings to map content directories."
    ],
    glossary: [
      { term: "Minification", definition: "Stripping unnecessary spacing and line breaks from code without changing functionality." },
      { term: "Percent Encoding", definition: "Translating non-ASCII query characters to % values." }
    ],
    industryApplications: [
      "SEO: Designing meta tags and robots.txt files.",
      "Front-End Engineering: Bundling CSS/HTML code blocks.",
      "Analytics: Building UTM campaign parameters."
    ],
    entityIds: ["html", "css", "markdown"]
  },
  {
    slug: "time-tools",
    categoryKey: "time",
    title: "Time & Date Tools",
    subtitle: "Epoch Converters, Clock Dashboards, and Date Calculators",
    icon: "Clock",
    description: "Convert epoch timestamps, calculate days between dates, convert time zones, count working days, and manage world clock dashboards.",
    hero: {
      title: "Time Suite",
      subtitle: "Epoch, date, and clock timezone utilities.",
      ctaText: "Calculate Duration"
    },
    statistics: [
      { label: "Timezones Tracked", value: "All Zones" },
      { label: "Date Ranges", value: "Unlimited" }
    ],
    featuredTools: ["epoch-converter", "time-zone-converter", "date-difference"],
    relatedCategories: ["text-tools", "pdf-tools", "developer-tools"],
    relatedGuides: ["how-to-merge-pdf", "how-to-calculate-emi"],
    hubPages: ["best-free-productivity-tools"],
    keywords: ["epoch converter", "time zone converter", "date difference"],
    seo: {
      title: "Free Time & Date Tools | Epoch & Timezone Converters | ToolsAtZero",
      metaDescription: "Convert epoch seconds, count date differences, determine working days, and calculate duration arithmetic locally.",
      keywords: ["epoch converter", "time zone converter", "date difference"]
    },
    faq: [
      { question: "Does the working day calculator include public holidays?", answer: "It allows custom selections of standard weekends and default profiles for regional working grids." },
      { question: "What date formats does the epoch converter support?", answer: "It supports seconds, milliseconds, ISO 8601 strings, and localized date structures." }
    ],
    aiSummary: "Temporal helpers that calculate date ranges, convert calendar formats, track timezone offsets, and translate Unix epoch integer metrics.",
    searchIntent: "Convert timestamps, check timezone offsets, and calculate dates in-browser.",
    keyTakeaways: [
      "Calculate holiday offsets and working day grids dynamically.",
      "Translate Unix timestamps to local human-readable formats.",
      "Manage world timezone clocks simultaneously."
    ],
    overview: "Calculating timezone conversions, counting days between dates, and formatting unix timestamps is a daily necessity. Pasting database epoch dates or company milestones into trackers risks leakages. ToolsAtZero processes all temporal calculations locally.",
    beginnerGuide: "Choose an option like Time Zone Converter. Set date parameters, select target zones, and view the converted date instantly. The Unix epoch tool decodes timestamp numbers on input change.",
    useCases: [
      "Converting Unix epoch database numbers to human-readable times.",
      "Calculating the number of working days for invoice billing.",
      "Coordinating meeting times across global offices."
    ],
    commonProblems: [
      "Daylight saving time updates can shift converted times unexpectedly.",
      "Leap seconds can occasionally offset date duration calculations."
    ],
    recommendedWorkflow: [
      "Decode database Unix epoch integers to human formats.",
      "Calculate precise business day intervals.",
      "Map out meeting hours across global time zones."
    ],
    glossary: [
      { term: "Epoch Timestamp", definition: "The count of seconds since January 1, 1970 (UTC), widely used in databases." },
      { term: "Daylight Saving Time", definition: "Advancing clocks during warmer months to extend evening daylight." }
    ],
    industryApplications: [
      "Project Management: Tracking project timelines and business days.",
      "Backend Development: Formatting server database timestamps.",
      "Remote Work: Aligning timezone offsets."
    ],
    entityIds: []
  },
  {
    slug: "calculators",
    categoryKey: "calculator",
    title: "Calculators",
    subtitle: "Free Math, Finance, Health, and Unit Calculators",
    icon: "Calculator",
    description: "Solve complex loan EMIs, interest compounds, body mass indexes, unit transformations, age gaps, and scientific equations locally.",
    hero: {
      title: "Calculators Suite",
      subtitle: "50+ private in-browser calculators.",
      ctaText: "Configure Financials"
    },
    statistics: [
      { label: "Active Calculators", value: "50 Tools" },
      { label: "Data Transmission", value: "Zero Bytes" }
    ],
    featuredTools: ["emi-calculator", "sip-calculator", "bmi-calculator"],
    relatedCategories: ["pdf-tools", "time-tools", "developer-tools"],
    relatedGuides: ["how-to-calculate-emi", "what-is-bmi"],
    hubPages: ["best-calculators"],
    keywords: ["online calculators", "emi calculator", "sip calculator"],
    seo: {
      title: "Free Online Calculators | Finance, Health & Math Tools | ToolsAtZero",
      metaDescription: "Calculate EMIs, compound interests, BMI scores, age durations, and unit conversions. 50+ free client-side calculators.",
      keywords: ["online calculators", "emi calculator", "sip calculator"]
    },
    faq: [
      { question: "How private are my financial calculations?", answer: "Extremely. Since everything executes locally, your loan, salary, tax, and interest amounts never touch a network API." },
      { question: "Can I export calculation summaries?", answer: "Yes, you can copy the full structured summary or print the layout to PDF instantly." }
    ],
    aiSummary: "A unified system of 50 mathematical calculators solving financial equations, health parameters, unit metrics, and scientific formula matrices.",
    searchIntent: "Calculate finance schedules, health indexes, and mathematical values locally.",
    keyTakeaways: [
      "Zero server logging of financial figures, balances, or health metadata.",
      "Real-time chart projections and amortization breakdowns.",
      "Save calculation values locally across browser tabs."
    ],
    overview: "Calculating financial indicators like EMIs or health index values involves entering sensitive numbers (such as salaries, loans, or weights). Pasting this private metadata into external search boxes is a significant privacy risk. ToolsAtZero's Calculator Suite executes mathematical formula streams locally on your device, ensuring total privacy.",
    beginnerGuide: "Open your target calculator (e.g. Loan EMI). Input values like principal amount, annual interest rate, and term tenure. The tool calculates monthly amortization and shows dynamic updates instantly.",
    useCases: [
      "Calculating monthly bank loan schedules before applying.",
      "Estimating long-term compounding investments dynamically.",
      "Evaluating Body Mass Index health measurements privately."
    ],
    commonProblems: [
      "Using flat interest rates instead of reducing balance numbers will skew results.",
      "Entering height/weight with wrong unit settings will distort BMI scores."
    ],
    recommendedWorkflow: [
      "Input base loan amounts and set reducing balance parameters.",
      "Check amortization tables to understand total interest costs.",
      "Print final reports as private reference PDFs."
    ],
    glossary: [
      { term: "Amortization", definition: "The process of paying off a debt over time through regular payments." },
      { term: "Reducing Balance", definition: "An interest calculation method based on the remaining outstanding principal." }
    ],
    industryApplications: [
      "Personal Finance: Managing monthly mortgages and investments.",
      "Health & Fitness: Calculating BMI scores and weight targets.",
      "Engineering: Doing quick mathematical conversions."
    ],
    entityIds: ["emi", "bmi"]
  }
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categoriesConfig.find(c => c.slug === slug);
}

export function getCategoryByKey(key: string): CategoryConfig | undefined {
  return categoriesConfig.find(c => c.categoryKey === key);
}
