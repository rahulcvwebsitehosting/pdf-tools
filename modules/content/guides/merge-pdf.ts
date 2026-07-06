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

export const mergePdfGuide: GuideContent = {
  // ─── Identity ───────────────────────────────────────────────────────
  id: "guide.merge-pdf",
  type: "guide",
  slug: "how-to-merge-pdf",
  title: "How to Merge PDF Files",
  description:
    "Learn how to combine multiple PDF files into a single document securely inside your browser without uploading files to external servers.",
  seoTitle: "How to Merge PDF Files Online | Secure PDF Guide | ToolsAtZero",
  metaDescription:
    "Step-by-step guide explaining how to merge multiple PDF files locally in-browser. Learn best practices for combining document segments securely.",
  keywords: [
    "how to merge pdf",
    "combine pdf files",
    "merge pdf guide",
    "secure pdf merge",
    "local pdf combine",
    "join pdf pages",
    "pdf combiner free",
    "merge pdf without uploading",
    "browser pdf merge",
    "client-side pdf merge",
  ],
  entityIds: [
    "entity.pdf",
    "entity.browser-processing",
    "entity.client-side",
    "entity.pdf-js",
  ],
  status: "published",

  // ─── Meta ───────────────────────────────────────────────────────────
  meta: defaultMeta({
    topicId: "pdf.merge",
    difficulty: "beginner",
    readingTimeMinutes: 8,
    targetAudience: [
      "office workers",
      "students",
      "freelancers",
      "legal professionals",
      "HR departments",
    ],
    searchIntents: ["informational", "how-to", "troubleshooting"],
    aliases: [
      "combine pdf",
      "join pdf files",
      "pdf joiner",
      "put pdfs together",
    ],
  }),
  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 8, expectedTraffic: "high" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  // ─── Relationships ──────────────────────────────────────────────────
  relationships: defaultRelationships({
    parents: ["category.pdf-tools"],
    children: [],
    siblings: ["guide.compress-images", "guide.convert-png-to-jpg"],
    relatedGuides: ["guide.compress-images", "guide.calculate-emi"],
    relatedComparisons: ["comparison.pdf-merge-vs-append"],
    relatedCategories: ["category.pdf-tools", "category.document-tools"],
  }),
  recommendations: defaultRecommendations({
    beginner: ["guide.convert-png-to-jpg", "guide.what-is-bmi"],
    next: ["guide.compress-images", "guide.json-formatter"],
    advanced: ["guide.calculate-emi"],
  }),

  // ─── AI Blocks ──────────────────────────────────────────────────────
  aiBlocks: defaultAIBlocks({
    aiSummary:
      "Merging PDFs combines multiple PDF documents into a single file. Client-side tools process files entirely in browser memory using libraries like pdf-lib, meaning no data leaves the user's device. The process reads each PDF's internal page tree, copies page objects into a new document, and writes the result as a single downloadable file.",
    keyTakeaways: [
      "Client-side PDF merging keeps documents private — no server uploads required",
      "Decrypt password-protected PDFs before merging to avoid corrupted output",
      "Page order in the merge queue determines final document sequence",
      "Browser memory is the only limit — typical devices handle 50-100 MB of combined PDFs comfortably",
      "Pre-compress images in source PDFs to keep the merged file manageable",
    ],
    quickFacts: [
      "PDF stands for Portable Document Format, created by Adobe in 1993",
      "PDF/A is the ISO-standardized archival variant of PDF",
      "A merged PDF preserves bookmarks and hyperlinks from source documents",
      "Client-side merge uses ArrayBuffer objects — no network requests are made",
      "The PDF specification allows up to 8,388,607 indirect objects per file",
    ],
    commonMisconceptions: [
      "Merging PDFs always reduces quality — false, PDF merge is a lossless page-copy operation",
      "You need Adobe Acrobat to combine PDFs — browser-based tools handle it without any software install",
      "Merged PDFs are always larger than the sum of inputs — shared fonts and resources can actually be deduplicated",
    ],
    didYouKnow: [
      "The PDF format was released as an open ISO standard (ISO 32000) in 2008",
      "pdf-lib, the library used by many browser tools, can create PDFs from scratch without a server",
    ],
    expertTips: [
      "Use pdf-lib's copyPages method for structure-preserving merges that retain annotations",
      "For documents over 200 MB, split the merge into batches to avoid exceeding browser memory limits",
      "Run a page-count validation after merge to confirm no pages were dropped",
    ],
  }),

  // ─── Quick Answer ──────────────────────────────────────────────────
  quickAnswer:
    "To merge PDF files, open a client-side PDF merger in your browser, drag and drop the files you want to combine, arrange them in the desired order, and click merge. The tool processes everything in local memory — no files are uploaded to any server. Download the combined PDF directly to your device.",

  // ─── Introduction ──────────────────────────────────────────────────
  introduction:
    "Merging PDF files is a common administrative task, but uploading sensitive documents to public servers creates substantial risks. This guide explains how to merge PDF files privately using local browser memory buffers, covers the underlying technology, and walks through best practices for reliable results.",

  // ─── Why It Matters ────────────────────────────────────────────────
  whyItMatters:
    "Organizations handle contracts, invoices, reports, and legal briefs as separate PDFs that need consolidation for filing, emailing, or archival. Using server-based tools exposes confidential content to third parties. Client-side merging eliminates that data-leak surface entirely while providing the same result.",

  // ─── Table of Contents ─────────────────────────────────────────────
  toc: [
    "Understanding Client-Side PDF Merging",
    "Step-by-Step Instructions to Combine PDFs",
    "How PDF Merging Works Under the Hood",
    "Best Practices for PDF Merges",
    "Common Mistakes to Avoid",
    "Troubleshooting Common Issues",
    "Security and Privacy Notes",
    "Performance Optimization",
    "Real-World Use Cases",
    "Frequently Asked Questions",
  ],

  // ─── Steps ─────────────────────────────────────────────────────────
  steps: [
    "Open the Free Merge PDF Online tool on ToolsAtZero.",
    "Select and drag multiple PDF files into the local upload box.",
    "Re-order the PDF segments in the visual preview list if needed.",
    "Click the 'Merge PDF' button to compile the files in-memory.",
    "Download the combined PDF document instantly to your local drive.",
  ],

  // ─── How It Works ──────────────────────────────────────────────────
  howItWorks:
    "When you select PDF files, the browser reads each file into an ArrayBuffer using the File API. A JavaScript PDF library (such as pdf-lib) parses each buffer into a PDFDocument object, iterates through the page tree, and copies each page into a new target document. The library resolves cross-references, deduplicates shared font resources where possible, and serializes the final document as a Uint8Array. This byte array is converted to a Blob URL for download. The entire pipeline runs in the browser's main thread or a Web Worker — no network requests are made.",

  // ─── Examples ──────────────────────────────────────────────────────
  examples: [
    "Combining a cover letter, resume, and reference sheet into a single job application PDF",
    "Merging monthly invoice PDFs into a quarterly financial report for accounting",
    "Joining scanned passport pages and visa documents into one travel-application file",
    "Consolidating multiple research paper sections (abstract, body, appendix) into a single submission",
    "Assembling a multi-chapter e-book from individually authored PDF chapters",
  ],

  // ─── Best Practices ───────────────────────────────────────────────
  bestPractices: [
    "Ensure all source PDFs are decrypted before attempting to merge them.",
    "Keep track of page counts in individual files to verify the final consolidated sheet count.",
    "Optimize images within source documents first to prevent a bloated combined file size.",
    "Name source files sequentially (01_intro.pdf, 02_chapter.pdf) so drag-and-drop order is intuitive.",
    "Verify the merged output by spot-checking the first and last page of each source section.",
  ],

  // ─── Common Mistakes ──────────────────────────────────────────────
  commonMistakes: [
    "Merging password-protected files without unlocking them first.",
    "Overloading browser tab memory with hundreds of high-resolution images in a single merge run.",
    "Uploading files to random websites instead of using client-side in-memory tools.",
    "Ignoring page orientation mismatches — mixing portrait and landscape source PDFs without review.",
    "Assuming the merge tool will OCR scanned images — it copies pages as-is, it does not add text layers.",
  ],

  // ─── Pro Tips ──────────────────────────────────────────────────────
  proTips: [
    "Use a Web Worker-based merger if your browser tab freezes on large files — it offloads parsing to a background thread.",
    "If the merged PDF is too large for email (>25 MB), run it through a PDF compressor after merging.",
    "Bookmark-aware merge libraries preserve the table of contents from each source PDF — check if yours supports it.",
    "For repetitive merge tasks (e.g., monthly reports), automate with a local Node.js script using pdf-lib.",
    "Test the merged file in multiple viewers (Chrome, Firefox, Adobe Reader) to ensure cross-viewer compatibility.",
  ],

  // ─── Troubleshooting ──────────────────────────────────────────────
  troubleshooting: [
    {
      question: "The merge button does nothing after clicking.",
      answer:
        "Check the browser console for JavaScript errors. This usually happens when a source PDF is corrupted or uses an unsupported encryption scheme. Try re-exporting the problematic file from its source application.",
    },
    {
      question: "The merged PDF has blank pages.",
      answer:
        "Blank pages typically result from PDFs that embed content as XObject forms with unusual references. Open the source PDF in Adobe Reader to verify it renders correctly before merging.",
    },
    {
      question: "The output file is much larger than expected.",
      answer:
        "Each source PDF may embed its own copy of common fonts (e.g., Arial, Times New Roman). After merging, run the output through a PDF optimizer that deduplicates embedded font subsets.",
    },
    {
      question: "Page order is wrong in the merged file.",
      answer:
        "The merge tool combines files in the order they appear in the queue. Re-arrange the file list before clicking merge. Most tools support drag-and-drop reordering.",
    },
    {
      question: "Browser tab crashes during merge.",
      answer:
        "Your combined file size likely exceeds available tab memory. Split the merge into two batches: merge files 1-5 first, then merge that result with files 6-10.",
    },
    {
      question: "Hyperlinks in the original PDFs stopped working.",
      answer:
        "Some merge libraries strip link annotations during the page-copy process. Use a library that explicitly copies annotations (pdf-lib's copyPages does this by default).",
    },
    {
      question: "Form fields in the merged PDF are not fillable.",
      answer:
        "Interactive form fields (AcroForm) require special handling during merge. Ensure your merge tool supports AcroForm field copying, or flatten the forms before merging.",
    },
    {
      question: "The merged file won't open on mobile devices.",
      answer:
        "Some mobile PDF viewers struggle with very large files. Compress the merged PDF or split it into smaller sections for mobile distribution.",
    },
  ],

  // ─── Benefits ──────────────────────────────────────────────────────
  benefits: [
    "Complete privacy — no document data leaves your device at any point during the merge process",
    "Zero cost — no subscriptions, watermarks, or daily file-count limits",
    "Works offline — once the page is loaded, network connectivity is not required",
    "Fast processing — in-browser merging avoids upload/download latency entirely",
    "No software installation — runs directly in any modern browser on any operating system",
    "Preserves original quality — pages are copied at their original resolution without re-encoding",
  ],

  // ─── Limitations ──────────────────────────────────────────────────
  limitations: [
    "Browser memory limits total file size — devices with less than 4 GB RAM may struggle with files exceeding 200 MB combined",
    "Encrypted PDFs must be manually decrypted before merging — the tool cannot crack passwords",
    "Some advanced PDF features (3D objects, multimedia embeds) may not transfer during the page-copy process",
    "No OCR capability — scanned image-only PDFs remain image-only after merging",
    "Bookmark hierarchy from multiple source files may not merge into a unified table of contents depending on the library used",
  ],

  // ─── Security Notes ───────────────────────────────────────────────
  securityNotes: [
    "All file processing occurs in browser memory (ArrayBuffer objects) — zero bytes are transmitted over the network",
    "Closing the browser tab immediately releases all in-memory file data; there is no persistent cache of your documents",
    "The tool does not inject tracking pixels, watermarks, or metadata into your merged output",
    "If your PDFs contain sensitive data (contracts, medical records), verify the tool's source code or use it offline for maximum assurance",
  ],

  // ─── Performance Tips ─────────────────────────────────────────────
  performanceTips: [
    "Close other memory-heavy browser tabs before merging large files to free up RAM",
    "Pre-compress images in source PDFs using an image optimizer — this reduces parse time and memory footprint",
    "Use Chrome or Edge (Chromium-based) for best memory management with large ArrayBuffer allocations",
    "If merging more than 20 files, consider batching into groups of 10 to avoid garbage-collection stalls",
    "Enable hardware acceleration in browser settings to speed up rendering of the preview thumbnails",
  ],

  // ─── Use Cases ─────────────────────────────────────────────────────
  useCases: [
    "Legal: Combining case exhibits, affidavits, and briefs into a single court filing bundle",
    "Education: Merging lecture notes, assignment sheets, and syllabi into a course pack",
    "Real estate: Assembling purchase agreements, inspection reports, and disclosure documents for closing",
    "Healthcare: Consolidating lab results, imaging reports, and referral letters into a single patient file",
    "Finance: Joining monthly bank statements into an annual record for tax preparation",
    "Publishing: Compiling individually designed PDF chapters into a complete book manuscript",
  ],

  // ─── FAQs ──────────────────────────────────────────────────────────
  faqs: [
    // Existing
    {
      question: "Can I merge different file types like Word and PDF directly?",
      answer:
        "No, convert your Word files to PDF first, then combine the PDFs locally using the PDF merger.",
    },
    {
      question: "Is there a limit on how many files I can merge?",
      answer:
        "The only limit is your device's RAM capacity, as processing runs entirely in-memory.",
    },
    // What
    {
      question: "What is client-side PDF merging?",
      answer:
        "Client-side merging means the browser itself combines your PDFs using JavaScript — no files are sent to a remote server.",
    },
    {
      question: "What happens to bookmarks when PDFs are merged?",
      answer:
        "Bookmark-aware libraries preserve them. Basic merge tools may strip bookmarks. Check your tool's documentation.",
    },
    {
      question: "What PDF versions are supported?",
      answer:
        "Most client-side libraries support PDF 1.0 through 2.0. Very old or non-standard files may need re-exporting first.",
    },
    // Who
    {
      question: "Who benefits most from client-side PDF merging?",
      answer:
        "Legal professionals, HR teams, and anyone handling confidential documents who cannot risk uploading to third-party servers.",
    },
    {
      question: "Who maintains the PDF specification?",
      answer:
        "The PDF specification (ISO 32000) is maintained by the International Organization for Standardization (ISO).",
    },
    // When
    {
      question: "When should I merge PDFs versus zip them?",
      answer:
        "Merge when recipients need a single readable document. Zip when you need to preserve individual files for separate handling.",
    },
    {
      question: "When does merging fail?",
      answer:
        "Common failure triggers: encrypted source files, corrupted PDF structures, and browser memory exhaustion on very large batches.",
    },
    // Where
    {
      question: "Where are my files stored during the merge?",
      answer:
        "Exclusively in your browser's RAM. No temporary files are written to disk, and no network requests are made.",
    },
    {
      question: "Where does the merged file download to?",
      answer:
        "To your browser's default downloads folder, or wherever your browser's download dialog directs it.",
    },
    // Why
    {
      question: "Why is client-side merging more secure?",
      answer:
        "Because your files never leave your device. Server-based tools require uploading, which exposes documents to the hosting provider and any intermediary networks.",
    },
    {
      question: "Why is my merged PDF larger than the sum of individual files?",
      answer:
        "Each PDF may embed duplicate copies of common fonts. A post-merge optimization pass can deduplicate these embedded resources.",
    },
    {
      question: "Why do some pages appear rotated after merging?",
      answer:
        "Source PDFs may have rotation metadata that the merge tool applies differently. Use a PDF viewer's rotate function or fix rotation before merging.",
    },
    // How
    {
      question: "How does PDF merging work technically?",
      answer:
        "The library reads each PDF's cross-reference table, copies page objects (content streams, fonts, images) into a new document, and serializes the combined structure.",
    },
    {
      question: "How long does merging take?",
      answer:
        "Typically under 5 seconds for files totaling less than 50 MB. Larger batches may take 10-30 seconds depending on device performance.",
    },
    {
      question: "How do I merge PDFs on a phone?",
      answer:
        "Open the tool in your mobile browser (Chrome or Safari), upload files from your device storage, and merge as you would on desktop.",
    },
    {
      question: "How can I reorder pages across multiple PDFs?",
      answer:
        "Merge all files first, then use a PDF page-reorder tool to rearrange individual pages in the combined document.",
    },
    // Can
    {
      question: "Can I merge scanned PDFs?",
      answer:
        "Yes, scanned PDFs are valid PDF files containing image layers. The merger copies pages as-is without needing OCR.",
    },
    {
      question: "Can I undo a merge?",
      answer:
        "No, but since the originals are untouched (the tool only reads them), you can always re-merge in a different order.",
    },
    {
      question: "Can I merge PDF/A files?",
      answer:
        "You can merge them, but the output may not conform to PDF/A standards. Use a PDF/A validator afterward if archival compliance is required.",
    },
    {
      question: "Can I merge password-protected PDFs?",
      answer:
        "Only after removing the password. Decrypt each file first using a PDF unlock tool, then merge the unprotected versions.",
    },
    // Should
    {
      question: "Should I compress PDFs before or after merging?",
      answer:
        "Compress source images before merging for best results. A post-merge compression pass can further reduce the output size.",
    },
    {
      question: "Should I use a desktop app or browser tool?",
      answer:
        "For occasional merges, a browser tool is sufficient and requires no installation. For high-volume batch merges, a desktop app or script offers more control.",
    },
    // Is
    {
      question: "Is the merge process lossless?",
      answer:
        "Yes. PDF merging copies page objects without re-encoding. Text, vectors, and images retain their original quality.",
    },
    {
      question: "Is there a maximum file size for browser-based merging?",
      answer:
        "Practically, combined sizes over 200-500 MB may exhaust browser tab memory. The exact limit depends on your device's available RAM.",
    },
    {
      question: "Is the merged PDF editable?",
      answer:
        "It is as editable as the source files. If the originals contained selectable text, the merged file will too. Image-only scans remain non-editable.",
    },
    // Does
    {
      question: "Does merging PDFs reduce quality?",
      answer:
        "No. The merge operation copies page structures byte-for-byte. No re-compression or downsampling occurs.",
    },
    {
      question: "Does the tool work offline?",
      answer:
        "Yes, once the page and its JavaScript assets are loaded, merging works without an internet connection.",
    },
    {
      question: "Does merging preserve hyperlinks?",
      answer:
        "Libraries that copy annotation objects (like pdf-lib) preserve hyperlinks. Basic concatenation tools may strip them.",
    },
    {
      question: "Does the merged PDF retain digital signatures?",
      answer:
        "Digital signatures become invalid after merging because the document's byte stream changes. Re-sign the merged file if a valid signature is required.",
    },
    {
      question: "Does merging work with fillable PDF forms?",
      answer:
        "Basic merging copies static page content. AcroForm fields require explicit field-copying support in the library. Flatten forms before merging if fillability is not needed.",
    },
    {
      question: "Does the tool add watermarks to merged files?",
      answer:
        "No. ToolsAtZero's merge tool produces clean output with no watermarks, branding, or injected metadata.",
    },
    {
      question:
        "Does the tool support merging PDFs with different page sizes?",
      answer:
        "Yes. Each page retains its original dimensions. The merged document can contain a mix of A4, Letter, and custom-sized pages.",
    },
  ],

  // ─── Related Questions ─────────────────────────────────────────────
  relatedQuestions: [
    {
      question: "How do I split a PDF into separate pages?",
      answer:
        "Use a PDF splitter tool that extracts individual pages or page ranges into separate files.",
    },
    {
      question: "Can I merge PDFs on Mac without Preview?",
      answer:
        "Yes, browser-based tools work on any OS including macOS, without needing Preview or any installed software.",
    },
    {
      question: "How do I add page numbers to a merged PDF?",
      answer:
        "After merging, use a PDF editor or stamping tool to overlay sequential page numbers on each page.",
    },
    {
      question: "What is the difference between merging and appending PDFs?",
      answer:
        "Functionally identical — both combine pages sequentially. 'Append' typically means adding pages to an existing document, while 'merge' creates a new file from multiple sources.",
    },
    {
      question: "How do I merge PDFs in a specific page order?",
      answer:
        "Arrange the files in the merge queue in your desired order. For per-page control, merge first then reorder using a page-management tool.",
    },
    {
      question: "Is it safe to merge bank statements online?",
      answer:
        "Only with client-side tools that process files locally. Never upload financial documents to server-based merge services.",
    },
    {
      question: "Can I merge PDFs and images together?",
      answer:
        "Not directly. Convert images to PDF pages first, then merge the resulting PDF with your other PDF files.",
    },
    {
      question: "What is the best free PDF merger?",
      answer:
        "Browser-based client-side tools like ToolsAtZero offer unlimited merges with no cost, no watermarks, and full privacy.",
    },
    {
      question: "How do I merge PDFs using command line?",
      answer:
        "Tools like pdftk, qpdf, or a Node.js script using pdf-lib can merge PDFs from the command line for batch automation.",
    },
    {
      question: "Can I merge PDFs from Google Drive directly?",
      answer:
        "You need to download the files to your device first. Browser-based merge tools read from local file storage, not cloud APIs.",
    },
    {
      question: "How do I reduce the file size of a merged PDF?",
      answer:
        "Run the merged file through a PDF compressor that resamples images and removes duplicate font subsets.",
    },
    {
      question: "Why does my merged PDF look different in different viewers?",
      answer:
        "PDF viewers render fonts and transparency differently. Test in Chrome's built-in viewer, Adobe Reader, and your target viewer to ensure consistency.",
    },
  ],

  // ─── Glossary ──────────────────────────────────────────────────────
  glossary: [
    {
      term: "PDF (Portable Document Format)",
      definition:
        "An open ISO-standard file format for representing documents independently of software, hardware, or operating systems.",
    },
    {
      term: "ArrayBuffer",
      definition:
        "A JavaScript object representing a fixed-length block of raw binary data in memory, used to hold file contents without encoding.",
    },
    {
      term: "Cross-reference table",
      definition:
        "An internal PDF structure that maps object numbers to their byte offsets in the file, enabling random access to pages and resources.",
    },
    {
      term: "pdf-lib",
      definition:
        "An open-source JavaScript library for creating and modifying PDF documents in the browser or Node.js without server dependencies.",
    },
    {
      term: "AcroForm",
      definition:
        "The original PDF interactive form technology that embeds fillable text fields, checkboxes, and dropdowns within a PDF document.",
    },
    {
      term: "Blob URL",
      definition:
        "A temporary URL (blob:...) created by the browser to reference in-memory binary data, used to trigger downloads without a server.",
    },
    {
      term: "PDF/A",
      definition:
        "An ISO-standardized subset of PDF designed for long-term digital archival, restricting features that hinder preservation.",
    },
    {
      term: "Page tree",
      definition:
        "The hierarchical structure within a PDF that organizes pages into a tree of page nodes, allowing efficient page access.",
    },
    {
      term: "Web Worker",
      definition:
        "A browser API that runs JavaScript in a background thread, preventing heavy computations from blocking the user interface.",
    },
    {
      term: "Content stream",
      definition:
        "The sequence of PDF operators and operands that describe the visual content (text, graphics, images) on a single page.",
    },
    {
      term: "Font subset",
      definition:
        "A reduced version of a font file containing only the glyphs actually used in the document, minimizing embedded font size.",
    },
    {
      term: "Digital signature",
      definition:
        "A cryptographic hash embedded in a PDF that verifies document integrity and the signer's identity. Invalidated by any byte-level changes.",
    },
  ],

  // ─── Conclusion ────────────────────────────────────────────────────
  conclusion:
    "Merging PDFs client-side is a secure, fast, and free alternative to server-based tools. By processing files entirely in browser memory, you eliminate the risk of exposing confidential documents to third parties. Follow the steps and best practices in this guide to reliably combine any number of PDF files.",

  // ─── Convenience fields ────────────────────────────────────────────
  relatedTools: ["merge-pdf", "split-pdf", "protect-pdf"],
  relatedGuides: ["how-to-compress-images", "how-to-calculate-emi"],
};
