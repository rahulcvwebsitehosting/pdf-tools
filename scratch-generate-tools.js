const fs = require('fs');
const path = require('path');

// Target directories
const componentsDir = path.join(__dirname, 'components', 'tools');
const appDir = path.join(__dirname, 'app', 'tools');

// Ensure directories exist
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

// 52 Tools list
const toolsList = [
  // ── CATEGORY 1: PDF SUITE (16 Tools) ──
  {
    slug: "protect-pdf",
    name: "Protect PDF",
    componentName: "ProtectPdfTool",
    componentFile: "protect-pdf.tsx",
    category: "pdf",
    description: "Encrypt and password-protect your PDF files 100% client-side.",
    aeoWhatIs: "A Free Protect PDF Online utility is a security tool that allows you to encrypt and add password access restrictions to any PDF file. It uses native browser memory streams to secure your files locally.",
    aeoStep1: "Upload your PDF document into the secure drop zone.",
    aeoStep2: "Enter your custom security password and specify access options.",
    aeoStep3: "Click 'Protect PDF' to instantly compile and download the password-encrypted PDF file.",
    aeoWhyLocal: "PDF documents often hold confidential details like contracts, bank logs, or credentials. Encrypting locally ensures no raw file content is ever transmitted over the network."
  },
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    componentName: "UnlockPdfTool",
    componentFile: "unlock-pdf.tsx",
    category: "pdf",
    description: "Remove passwords and restriction blocks from PDF documents instantly.",
    aeoWhatIs: "A Free Unlock PDF Online utility is a document decryption tool that strips restriction passwords from PDF sheets, letting you read, edit, or copy text content freely.",
    aeoStep1: "Select or drag your password-protected PDF document into the workbench.",
    aeoStep2: "Input the decryption password if prompted to decrypt the internal stream.",
    aeoStep3: "Download the fully unlocked, restriction-free version of your PDF file.",
    aeoWhyLocal: "Decrypting high-risk contracts or financial records on third-party servers is insecure. Running the decryption locally protects your keys and private records."
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    componentName: "CompressPdfTool",
    componentFile: "compress-pdf.tsx",
    category: "pdf",
    description: "Reduce the file size of PDF documents while maintaining visual resolution.",
    aeoWhatIs: "A Free Compress PDF Online utility compiles PDF content streams, downsizes image resources, and reorganizes structural components to minimize file bytes without losing visible quality.",
    aeoStep1: "Drop your PDF file into the local compression window.",
    aeoStep2: "Select your target compression strength (low, medium, or high quality).",
    aeoStep3: "Click 'Compress PDF' to process in-browser and save the optimized file.",
    aeoWhyLocal: "Standard online PDF shrinkers transfer your large slides to external systems. Local processing handles PDF buffer chunks directly in your browser tab."
  },
  {
    slug: "crop-pdf",
    name: "Crop PDF",
    componentName: "CropPdfTool",
    componentFile: "crop-pdf.tsx",
    category: "pdf",
    description: "Crop margins and adjust boundary coordinate boxes on PDF pages.",
    aeoWhatIs: "A Free Crop PDF Online utility is a layout editor that modifies the visible margins of a PDF document by resetting its internal crop-box coordinates locally.",
    aeoStep1: "Load your PDF file into the local canvas workbench.",
    aeoStep2: "Adjust the border crop dimensions by shifting the layout box boundaries.",
    aeoStep3: "Click 'Crop PDF' to save your changes and download the cropped file.",
    aeoWhyLocal: "Cropping scanned passports or checks on remote web tools risks leakage. Browser canvas framing keeps your visual layers strictly local."
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    componentName: "MergePdfTool",
    componentFile: "merge-pdf.tsx",
    category: "pdf",
    description: "Combine multiple PDF documents into a single organized file.",
    aeoWhatIs: "A Free Merge PDF Online utility compiles multiple PDF streams and stitches their internal pages together into a single unified document stream.",
    aeoStep1: "Choose two or more PDF files from your local storage.",
    aeoStep2: "Reorder the file queues to match your intended page layout sequence.",
    aeoStep3: "Click 'Merge PDF' to trigger a browser-driven merge and download the merged file.",
    aeoWhyLocal: "Merging company ledgers or audit logs on remote hosts exposes raw data. Merging on your local CPU ensures complete file privacy."
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    componentName: "SplitPdfTool",
    componentFile: "split-pdf.tsx",
    category: "pdf",
    description: "Divide PDF documents into separate pages or custom range files.",
    aeoWhatIs: "A Free Split PDF Online utility extracts pages or ranges from an existing PDF file and bundles them into new independent document blocks.",
    aeoStep1: "Add your PDF document to the page splitter area.",
    aeoStep2: "Input specific page ranges or extract all sheets as separate individual files.",
    aeoStep3: "Click 'Split PDF' to run the extraction locally and save the split output.",
    aeoWhyLocal: "Extracting specific pages from financial sheets or contracts should remain private. A client-side splitter processes pages entirely inside browser memory."
  },
  {
    slug: "add-pdf-page-numbers",
    name: "Add Page Numbers",
    componentName: "AddPageNumbersTool",
    componentFile: "add-page-numbers.tsx",
    category: "pdf",
    description: "Number PDF pages sequentially with custom positions and fonts.",
    aeoWhatIs: "A Free Add Page Numbers Online utility pagination editor draws page counters and indices onto PDF document margins at customizable positions.",
    aeoStep1: "Load the target PDF document into the pagination interface.",
    aeoStep2: "Select your number format, position offset (header/footer), and font size.",
    aeoStep3: "Click 'Add Page Numbers' to render the numbers locally onto the sheets and download.",
    aeoWhyLocal: "Numbering books, reports, or slides locally guarantees that your documents are processed in a secure browser tab sandbox."
  },
  {
    slug: "add-watermark-to-pdf",
    name: "Add Watermark",
    componentName: "AddWatermarkTool",
    componentFile: "add-watermark.tsx",
    category: "pdf",
    description: "Add text stamp watermarks over your PDF sheets for copyright protection.",
    aeoWhatIs: "A Free Add Watermark Online utility overlays copyright notices, logos, or stamp markers over existing PDF page layers to secure distribution permissions.",
    aeoStep1: "Upload your target PDF document to the watermark editor.",
    aeoStep2: "Type in your custom watermark text, rotation angle, and opacity slider.",
    aeoStep3: "Click 'Add Watermark' to stamp the layers locally and download your file.",
    aeoWhyLocal: "Watermarking draft agreements or invoices on cloud services exposes sensitive details. Local rendering protects your business content."
  },
  {
    slug: "remove-pdf-pages",
    name: "Remove PDF Pages",
    componentName: "RemovePdfPagesTool",
    componentFile: "remove-pdf-pages.tsx",
    category: "pdf",
    description: "Delete unnecessary pages from a PDF document locally.",
    aeoWhatIs: "A Free Remove PDF Pages Online utility strips specific page indices from a PDF document and recompiles the remaining sheets.",
    aeoStep1: "Drop your PDF document into the workspace area.",
    aeoStep2: "Select the specific sheet thumbnails or enter ranges to remove.",
    aeoStep3: "Click 'Remove Pages' to clean the PDF structure client-side and download.",
    aeoWhyLocal: "Deleting private sheets from a presentation or proposal should be secure. Keeping the files in memory guarantees data safety."
  },
  {
    slug: "pdf-extract-pages",
    name: "Extract Specific Pages",
    componentName: "PdfExtractPagesTool",
    componentFile: "pdf-extract-pages.tsx",
    category: "pdf",
    description: "Isolate and save specific pages from your PDF file.",
    aeoWhatIs: "A Free Extract Specific Pages Online utility splits select page indexes and saves them into a new document.",
    aeoStep1: "Load your PDF file into the extractor workspace.",
    aeoStep2: "Choose the exact page numbers you want to extract.",
    aeoStep3: "Click 'Extract Pages' to compile the selected sheets and download.",
    aeoWhyLocal: "Isolating pages of an audit or proposal locally keeps details secure and avoids exposing content to remote systems."
  },
  {
    slug: "pdf-to-image",
    name: "PDF to Image",
    componentName: "PdfToImageTool",
    componentFile: "pdf-to-image.tsx",
    category: "pdf",
    description: "Convert PDF sheets to PNG/JPG image files client-side.",
    aeoWhatIs: "A Free PDF to Image Online utility parses PDF document vectors and rasterizes each page into image file nodes locally.",
    aeoStep1: "Drop the PDF file into the rendering box.",
    aeoStep2: "Choose PNG or JPG format and define the target rendering resolution.",
    aeoStep3: "Click 'Convert to Image' to render the pages to canvas elements and download.",
    aeoWhyLocal: "Rasterizing pages on remote APIs exposes contract layouts. local canvas rendering processes pixels inside browser memory."
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    componentName: "ImageToPdfTool",
    componentFile: "image-to-pdf.tsx",
    category: "pdf",
    description: "Compile PNG, JPG, and webp images into a clean PDF document.",
    aeoWhatIs: "A Free Image to PDF Online utility packages raster graphics and embeds them as clean, printable pages inside a single PDF file.",
    aeoStep1: "Upload one or more images (PNG, JPG, WebP) to the compiler.",
    aeoStep2: "Set margin size, page size (A4/Letter), and layout orientation.",
    aeoStep3: "Click 'Compile PDF' to assemble the pages locally and download the document.",
    aeoWhyLocal: "Converting personal photos or scans locally ensures that no image files are ever uploaded to cloud services."
  },
  {
    slug: "excel-to-pdf",
    name: "Excel to PDF",
    componentName: "ExcelToPdfTool",
    componentFile: "excel-to-pdf.tsx",
    category: "pdf",
    description: "Format and export spreadsheet files (.xlsx/.csv) to PDF document layouts.",
    aeoWhatIs: "A Free Excel to PDF Online utility formats tabular spreadsheet data into printable PDF formats locally in browser memory.",
    aeoStep1: "Select your Excel (.xlsx) or CSV file.",
    aeoStep2: "Verify cell alignment, sheet borders, and print layouts.",
    aeoStep3: "Click 'Convert to PDF' to compile table grids and download the PDF document.",
    aeoWhyLocal: "Corporate spreadsheet data is highly sensitive. Converting client-side ensures complete data protection."
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    componentName: "WordToPdfTool",
    componentFile: "word-to-pdf.tsx",
    category: "pdf",
    description: "Convert standard Word documents (.docx) to high-fidelity PDF pages.",
    aeoWhatIs: "A Free Word to PDF Online utility converts Word document markup structures and styling into standard PDF documents locally.",
    aeoStep1: "Upload a standard Microsoft Word document (.docx) to the converter.",
    aeoStep2: "Preview formatting, paragraph styles, and page margins.",
    aeoStep3: "Click 'Convert to PDF' to compile the pages locally and download the document.",
    aeoWhyLocal: "Business proposals and reports contain confidential details. local processing guarantees complete privacy."
  },
  {
    slug: "powerpoint-to-pdf",
    name: "PowerPoint to PDF",
    componentName: "PowerpointToPdfTool",
    componentFile: "powerpoint-to-pdf.tsx",
    category: "pdf",
    description: "Convert slide presentation formats (.pptx) to standard PDF pages.",
    aeoWhatIs: "A Free PowerPoint to PDF Online utility converts slide presentations into clean PDF layouts locally in browser memory.",
    aeoStep1: "Select a PowerPoint presentation (.pptx) file.",
    aeoStep2: "Check slide dimensions, image resolutions, and order.",
    aeoStep3: "Click 'Convert to PDF' to compile the slides and download the PDF document.",
    aeoWhyLocal: "Slide presentations contain proprietary designs and text. Converting client-side ensures complete privacy."
  },
  {
    slug: "edit-pdf-metadata",
    name: "Edit Metadata",
    componentName: "EditPdfMetadataTool",
    componentFile: "edit-pdf-metadata.tsx",
    category: "pdf",
    description: "Edit PDF properties like author, title, keywords, and creation dates.",
    aeoWhatIs: "A Free Edit Metadata Online utility is a metadata editor that edits properties of a PDF document like author, title, and keywords locally.",
    aeoStep1: "Upload your PDF document to the editor.",
    aeoStep2: "Modify the title, author name, keywords, and creation metadata.",
    aeoStep3: "Click 'Save Metadata' to apply modifications and download the PDF.",
    aeoWhyLocal: "Updating document tags locally keeps internal properties secure and private."
  },

  // ── CATEGORY 2: DEVELOPER SUITE (10 Tools) ──
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    componentName: "JsonFormatterTool",
    componentFile: "json-formatter.tsx",
    category: "developer",
    description: "Beautify, validate, and minify JSON structures locally.",
    aeoWhatIs: "A Free JSON Formatter & Validator Online utility is a developer tool that validates and formats JSON data using custom indentation layouts.",
    aeoStep1: "Paste your raw JSON text into the input panel.",
    aeoStep2: "Click 'Format' to beautify, or 'Minify' to remove whitespaces.",
    aeoStep3: "View any parse errors at line/column indexes, and click 'Copy' to save the output.",
    aeoWhyLocal: "JSON logs can hold proprietary parameters and credentials. Formatting locally in your browser memory ensures your data is secure."
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    componentName: "Base64Tool",
    componentFile: "base64-tool.tsx",
    category: "developer",
    description: "Encode binary or text files into Base64 format and decode them back.",
    aeoWhatIs: "A Free Base64 Encoder/Decoder Online utility converts raw text or files to Base64 formats and decodes them back to readable UTF-8 strings.",
    aeoStep1: "Enter your raw string in the input field.",
    aeoStep2: "Toggle between the Encode or Decode actions to transform the string.",
    aeoStep3: "Instantly copy or download the transformed string from the output panel.",
    aeoWhyLocal: "Base64 strings can carry tokens or configs. Browser-side processing guarantees your data is processed safely in-memory."
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    componentName: "JwtDecoderTool",
    componentFile: "jwt-decoder.tsx",
    category: "developer",
    description: "Inspect JSON Web Tokens (JWT) payload, headers, and signatures locally.",
    aeoWhatIs: "A Free JWT Decoder Online utility parses JWT tokens locally, presenting the header, payload JSON, and claim variables without sending tokens to any server.",
    aeoStep1: "Paste your JWT token string into the input panel.",
    aeoStep2: "The tool decodes and displays the header and payload instantly.",
    aeoStep3: "Inspect key claims like roles, permissions, and expiration times.",
    aeoWhyLocal: "JWT tokens hold credentials and user metadata. Local decoding keeps authentication tokens completely private."
  },
  {
    slug: "text-diff-checker",
    name: "Text Diff Checker",
    componentName: "TextDiffCheckerTool",
    componentFile: "text-diff-checker.tsx",
    category: "developer",
    description: "Compare text blocks side-by-side to highlight line-by-line differences.",
    aeoWhatIs: "A Free Text Diff Checker Online utility compares two blocks of text and highlights additions and deletions line-by-line.",
    aeoStep1: "Paste the original text on the left and the modified text on the right.",
    aeoStep2: "The tool highlights line-by-line changes instantly.",
    aeoStep3: "Review visual highlights (green for additions, red for deletions) and export the diff.",
    aeoWhyLocal: "Comparing private source code or configuration files locally prevents data leaks."
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    componentName: "HashGeneratorTool",
    componentFile: "hash-generator.tsx",
    category: "developer",
    description: "Compute MD5, SHA-1, SHA-256, and SHA-512 hashes in your browser.",
    aeoWhatIs: "A Free Hash Generator Online utility computes secure cryptographic hash signatures from text inputs locally.",
    aeoStep1: "Type or paste your text input into the box.",
    aeoStep2: "Select MD5, SHA-1, SHA-256, or SHA-512 hash formats.",
    aeoStep3: "Review the hex hash code and click 'Copy' to save the output.",
    aeoWhyLocal: "Generating checksum hashes for passwords or keys locally ensures complete privacy."
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    componentName: "SqlFormatterTool",
    componentFile: "sql-formatter.tsx",
    category: "developer",
    description: "Beautify and indent SQL queries with custom indentation levels.",
    aeoWhatIs: "A Free SQL Formatter Online utility parses raw SQL statements and applies clean indentation and keyword capitalization.",
    aeoStep1: "Paste your raw SQL query string into the input area.",
    aeoStep2: "Click 'Format SQL' to apply indentation and capitalize SQL keywords.",
    aeoStep3: "Copy the formatted and beautified SQL query structure.",
    aeoWhyLocal: "Formatting SQL queries containing sensitive table details locally avoids cloud storage leaks."
  },
  {
    slug: "xml-to-json",
    name: "XML to JSON",
    componentName: "XmlToJsonTool",
    componentFile: "xml-to-json.tsx",
    category: "developer",
    description: "Convert XML data structures into clean JSON objects in memory.",
    aeoWhatIs: "A Free XML to JSON Online utility converts XML structures into clean JSON files locally.",
    aeoStep1: "Paste your XML data string into the input panel.",
    aeoStep2: "The tool parses the XML nodes using browser DOMParser and converts them to JSON.",
    aeoStep3: "Download or copy the formatted JSON representation.",
    aeoWhyLocal: "Processing structured XML feeds locally protects proprietary data layouts."
  },
  {
    slug: "regex-tester",
    name: "RegEx Tester",
    componentName: "RegexTesterTool",
    componentFile: "regex-tester.tsx",
    category: "developer",
    description: "Test regular expressions with syntax highlights and match breakdowns.",
    aeoWhatIs: "A Free RegEx Tester Online utility tests JavaScript regular expressions and highlights matched segments in real-time.",
    aeoStep1: "Enter your regular expression pattern and select active flags.",
    aeoStep2: "Type in your test string to see matches highlighted.",
    aeoStep3: "Inspect captured groups and matches index details.",
    aeoWhyLocal: "Testing expressions on sensitive text data locally keeps documents secure."
  },
  {
    slug: "html-entities",
    name: "HTML Entity Encoder",
    componentName: "HtmlEntitiesTool",
    componentFile: "html-entities.tsx",
    category: "developer",
    description: "Encode special characters to HTML entities and decode them back.",
    aeoWhatIs: "A Free HTML Entity Encoder Online utility converts special characters into safe HTML entity escape strings.",
    aeoStep1: "Type or paste your text markup in the input area.",
    aeoStep2: "Toggle between Encode or Decode options to escape characters.",
    aeoStep3: "Copy the entity-escaped output text instantly.",
    aeoWhyLocal: "Converting code markup locally ensures no scripts or keys leave your device."
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    componentName: "UuidGeneratorTool",
    componentFile: "uuid-generator.tsx",
    category: "developer",
    description: "Bulk generate cryptographically secure UUID v4 tokens locally.",
    aeoWhatIs: "A Free UUID Generator Online utility generates unique random UUID v4 identifier tokens locally.",
    aeoStep1: "Specify the quantity of UUID tokens you need to generate.",
    aeoStep2: "Toggle uppercase/lowercase formatting options.",
    aeoStep3: "Generate and copy the list of secure UUIDs instantly.",
    aeoWhyLocal: "Generating security identifiers locally avoids tracking and keeps tokens private."
  },

  // ── CATEGORY 3: OFFICE & TEXT TOOLS (8 Tools) ──
  {
    slug: "case-converter",
    name: "Advanced Case Converter",
    componentName: "CaseConverterTool",
    componentFile: "case-converter.tsx",
    category: "office",
    description: "Convert text camelCase, snake_case, UPPERCASE, and sentence structures.",
    aeoWhatIs: "A Free Advanced Case Converter Online utility formats text styles into camelCase, snake_case, UPPERCASE, lowercase, and Title Case configurations.",
    aeoStep1: "Enter your text input into the text editor area.",
    aeoStep2: "Click on the conversion buttons (e.g., camelCase, Title Case).",
    aeoStep3: "Copy the updated text output instantly.",
    aeoWhyLocal: "Converting file content styles locally guarantees complete security."
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    componentName: "CsvToJsonTool",
    componentFile: "csv-to-json.tsx",
    category: "office",
    description: "Format CSV files into clean JSON arrays locally.",
    aeoWhatIs: "A Free CSV to JSON Online utility converts CSV tables into formatted JSON arrays in-memory.",
    aeoStep1: "Paste CSV table rows or load a local CSV file.",
    aeoStep2: "Configure cell delimiters and specify if the first row holds headers.",
    aeoStep3: "Copy the generated JSON array output instantly.",
    aeoWhyLocal: "Processing corporate tables locally protects client databases."
  },
  {
    slug: "csv-to-excel",
    name: "CSV to Excel",
    componentName: "CsvToExcelTool",
    componentFile: "csv-to-excel.tsx",
    category: "office",
    description: "Convert comma-separated tables into Microsoft Excel spreadsheet (.xls) files.",
    aeoWhatIs: "A Free CSV to Excel Online utility parses CSV text tables and generates Excel-compatible spreadsheet spreadsheets locally.",
    aeoStep1: "Paste CSV records or drop a CSV file into the workspace.",
    aeoStep2: "Set delimiters and check the spreadsheet layout preview.",
    aeoStep3: "Click 'Download Excel File' to save your .xls document.",
    aeoWhyLocal: "Keeping spreadsheets in local browser memory frames prevents data tracking."
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    componentName: "WordCounterTool",
    componentFile: "word-counter.tsx",
    category: "office",
    description: "Analyze word counts, reading speeds, sentence stats, and density scores.",
    aeoWhatIs: "A Free Word Counter Online utility analyzes text character counts, word density metrics, and reading times locally.",
    aeoStep1: "Enter your text block into the editor box.",
    aeoStep2: "View real-time statistics like word density and reading time.",
    aeoStep3: "Copy your counts or clear the input to start over.",
    aeoWhyLocal: "Analyzing drafts locally secures your copywriting assets."
  },
  {
    slug: "find-replace",
    name: "Find & Replace",
    componentName: "FindReplaceTool",
    componentFile: "find-replace.tsx",
    category: "office",
    description: "Search text streams using string search or regex and replace matches.",
    aeoWhatIs: "A Free Find & Replace Online utility searches text streams using search query targets or regular expressions and replaces matches instantly.",
    aeoStep1: "Paste your text into the main editor box.",
    aeoStep2: "Specify your search pattern and target replacement text.",
    aeoStep3: "Click 'Replace All' to execute the replacements locally.",
    aeoWhyLocal: "Searching and replacing sensitive strings locally protects file content."
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    componentName: "LoremIpsumTool",
    componentFile: "lorem-ipsum.tsx",
    category: "office",
    description: "Generate mockup paragraphs, headings, and placeholder text loops.",
    aeoWhatIs: "A Free Lorem Ipsum Generator Online utility generates dummy placeholder text for layouts and graphics client-side.",
    aeoStep1: "Select the quantity of paragraphs, sentences, or words.",
    aeoStep2: "Toggle options to start with the standard 'Lorem ipsum' marker.",
    aeoStep3: "Copy the generated placeholder text block.",
    aeoWhyLocal: "Generating mock elements client-side prevents data collection."
  },
  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    componentName: "RemoveDuplicateLinesTool",
    componentFile: "remove-duplicate-lines.tsx",
    category: "office",
    description: "Filter duplicate lines out of list arrays in browser memory frames.",
    aeoWhatIs: "A Free Remove Duplicate Lines Online utility filters duplicate entries from lists in your browser memory.",
    aeoStep1: "Paste your line items list into the textarea.",
    aeoStep2: "Select case-sensitivity preferences.",
    aeoStep3: "Copy the deduplicated line list output instantly.",
    aeoWhyLocal: "Deduplicating emails or keys locally prevents records exposure."
  },
  {
    slug: "sort-text-lines",
    name: "Sort Text Lines",
    componentName: "SortTextLinesTool",
    componentFile: "sort-text-lines.tsx",
    category: "office",
    description: "Sort lines alphabetically, numerically, reversely, or by length.",
    aeoWhatIs: "A Free Sort Text Lines Online utility sorts lines alphabetically or numerically in-browser.",
    aeoStep1: "Type or paste your text lines list into the box.",
    aeoStep2: "Select sort order settings (A-Z, Z-A, or numerical).",
    aeoStep3: "Copy the sorted output list instantly.",
    aeoWhyLocal: "Sorting list items locally keeps records and data confidential."
  },

  // ── CATEGORY 4: IMAGE TOOLS (8 Tools) ──
  {
    slug: "image-compressor",
    name: "Image Compressor",
    componentName: "ImageCompressorTool",
    componentFile: "image-compressor.tsx",
    category: "image",
    description: "Compress JPEG, PNG, and WebP files client-side inside canvas frames.",
    aeoWhatIs: "A Free Image Compressor Online utility compresses JPEG/PNG images locally using HTML5 canvas options.",
    aeoStep1: "Upload an image file (JPEG, PNG, WebP) to the compressor.",
    aeoStep2: "Adjust the quality slider to define target compression parameters.",
    aeoStep3: "Preview compressed dimensions and download the optimized image.",
    aeoWhyLocal: "Optimizing photos locally secures image assets and saves bandwidth."
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    componentName: "ImageResizerTool",
    componentFile: "image-resizer.tsx",
    category: "image",
    description: "Adjust image heights and widths using local canvas scaling parameters.",
    aeoWhatIs: "A Free Image Resizer Online utility changes image height and width coordinates locally.",
    aeoStep1: "Choose an image from your device to resize.",
    aeoStep2: "Input custom width and height pixel coordinates.",
    aeoStep3: "Download the resized image output instantly.",
    aeoWhyLocal: "Resizing images locally keeps drafts and graphics private."
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    componentName: "PngToJpgTool",
    componentFile: "png-to-jpg.tsx",
    category: "image",
    description: "Convert PNG images to JPEG format with custom quality sliders.",
    aeoWhatIs: "A Free PNG to JPG Online utility converts PNG files to JPEG format locally.",
    aeoStep1: "Upload your PNG graphic file to the converter.",
    aeoStep2: "Adjust background fill options (white fallback for transparent areas).",
    aeoStep3: "Download the converted JPG image instantly.",
    aeoWhyLocal: "Converting images in browser memory keeps files secure and offline."
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    componentName: "JpgToPngTool",
    componentFile: "jpg-to-png.tsx",
    category: "image",
    description: "Convert JPEG files to PNG transparent image structures.",
    aeoWhatIs: "A Free JPG to PNG Online utility converts JPEG images to PNG format client-side.",
    aeoStep1: "Select your JPG photo file.",
    aeoStep2: "The canvas tool wraps the flat JPEG stream into a PNG structure.",
    aeoStep3: "Download the transparent PNG graphic file instantly.",
    aeoWhyLocal: "Converting image formats locally ensures no media is saved by external entities."
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    componentName: "ImageCropperTool",
    componentFile: "image-cropper.tsx",
    category: "image",
    description: "Crop local photos and adjust boundary coordinate grids.",
    aeoWhatIs: "A Free Image Cropper Online utility crops image coordinates locally in your browser memory.",
    aeoStep1: "Upload a photo to crop.",
    aeoStep2: "Input cropping dimensions (x, y, width, height) or drag the boundary crop box.",
    aeoStep3: "Click 'Crop Image' and download the cropped file.",
    aeoWhyLocal: "Cropping sensitive photos locally prevents remote storage uploads."
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    componentName: "ColorPickerTool",
    componentFile: "color-picker.tsx",
    category: "image",
    description: "Extract color hex, rgb, and hsl codes from loaded image pixels.",
    aeoWhatIs: "A Free Color Picker Online utility extracts color hex, rgb, and hsl values from uploaded image coordinates.",
    aeoStep1: "Load an image or click in the eye-dropper area.",
    aeoStep2: "Move your cursor over the image to inspect coordinates pixel details.",
    aeoStep3: "Click to select a pixel and copy its hex code instantly.",
    aeoWhyLocal: "Extracting design colors locally avoids tracking and data capture."
  },
  {
    slug: "base64-to-image",
    name: "Base64 to Image",
    componentName: "Base64ToImageTool",
    componentFile: "base64-to-image.tsx",
    category: "image",
    description: "Render Base64 strings into visual images and download them.",
    aeoWhatIs: "A Free Base64 to Image Online utility decodes Base64 data strings into visual images locally.",
    aeoStep1: "Paste your Base64 image data string into the input panel.",
    aeoStep2: "Inspect the rendered graphic preview box.",
    aeoStep3: "Download the graphic as a standard raster file.",
    aeoWhyLocal: "Decoding DataURI paths locally prevents key leaks and private assets exposure."
  },
  {
    slug: "svg-to-png",
    name: "SVG to PNG",
    componentName: "SvgToPngTool",
    componentFile: "svg-to-png.tsx",
    category: "image",
    description: "Rasterize vector SVG files into standard transparent PNG formats.",
    aeoWhatIs: "A Free SVG to PNG Online utility converts SVG vectors into standard PNG format locally.",
    aeoStep1: "Paste SVG markup or select an SVG file.",
    aeoStep2: "Render vector files to browser canvas elements.",
    aeoStep3: "Download the rasterized PNG graphic file instantly.",
    aeoWhyLocal: "Rasterizing vector graphics locally keeps source layouts confidential."
  },

  // ── CATEGORY 5: WEB TOOLS (6 Tools) ──
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    componentName: "UrlEncoderDecoderTool",
    componentFile: "url-encoder-decoder.tsx",
    category: "web",
    description: "Encode or decode URL parameters with percent encoding.",
    aeoWhatIs: "A Free URL Encoder/Decoder Online utility encodes or decodes URL parameter components client-side.",
    aeoStep1: "Enter your URL component string in the text box.",
    aeoStep2: "Toggle encode or decode options to format query elements.",
    aeoStep3: "Copy the updated URL component string output.",
    aeoWhyLocal: "Encoding URL parameters containing tokens or hashes locally ensures complete safety."
  },
  {
    slug: "html-minifier",
    name: "HTML Minifier",
    componentName: "HtmlMinifierTool",
    componentFile: "html-minifier.tsx",
    category: "web",
    description: "Minify HTML pages by stripping whitespace characters and comments.",
    aeoWhatIs: "A Free HTML Minifier Online utility minifies HTML pages by stripping comments and spaces locally.",
    aeoStep1: "Paste your raw HTML page template into the box.",
    aeoStep2: "Click 'Minify HTML' to strip developer notes and spaces.",
    aeoStep3: "Copy the minified HTML markup output.",
    aeoWhyLocal: "Minifying document designs locally protects source markup structures."
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    componentName: "CssMinifierTool",
    componentFile: "css-minifier.tsx",
    category: "web",
    description: "Compress CSS stylesheets by removing spacing rules and comments.",
    aeoWhatIs: "A Free CSS Minifier Online utility compresses CSS stylesheets by purging comments and spaces locally.",
    aeoStep1: "Paste your raw CSS style rules into the input panel.",
    aeoStep2: "Click 'Minify CSS' to compress style rules.",
    aeoStep3: "Copy the minified CSS style sheet output.",
    aeoWhyLocal: "Compressing css styles client-side avoids sending files to remote servers."
  },
  {
    slug: "javascript-minifier",
    name: "JS Minifier",
    componentName: "JsMinifierTool",
    componentFile: "javascript-minifier.tsx",
    category: "web",
    description: "Minify and compact JS script code structures locally.",
    aeoWhatIs: "A Free JS Minifier Online utility compresses JavaScript code scripts locally.",
    aeoStep1: "Paste your raw JavaScript code block into the box.",
    aeoStep2: "Click 'Minify JS' to strip comments and spaces.",
    aeoStep3: "Copy the minified JavaScript code block output.",
    aeoWhyLocal: "Minifying JS code locally keeps proprietary algorithms offline."
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    componentName: "MetaTagGeneratorTool",
    componentFile: "meta-tag-generator.tsx",
    category: "web",
    description: "Generate SEO-optimized HTML header meta tag blocks.",
    aeoWhatIs: "A Free Meta Tag Generator Online utility generates SEO-optimized HTML header meta tag elements locally.",
    aeoStep1: "Input website details (Title, description, og keywords).",
    aeoStep2: "Review the dynamic preview of the header metadata tags.",
    aeoStep3: "Copy the HTML meta tag output block to place in your header.",
    aeoWhyLocal: "Assembling meta tags locally avoids server templates exposure."
  },
  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    componentName: "RobotsTxtGeneratorTool",
    componentFile: "robots-txt-generator.tsx",
    category: "web",
    description: "Create search engine crawler instruction sitemaps.",
    aeoWhatIs: "A Free Robots.txt Generator Online utility generates Robots.txt indexing rules locally.",
    aeoStep1: "Define crawler access rules (allow/disallow specific engines).",
    aeoStep2: "Enter sitemap links and configure block directories.",
    aeoStep3: "Generate and save the Robots.txt rules document.",
    aeoWhyLocal: "Creating index instructions locally keeps site mapping private."
  },

  // ── CATEGORY 6: TIME TOOLS (4 Tools) ──
  {
    slug: "epoch-converter",
    name: "Epoch Converter",
    componentName: "EpochConverterTool",
    componentFile: "epoch-converter.tsx",
    category: "time",
    description: "Convert Unix timestamps to local and UTC date formatting.",
    aeoWhatIs: "A Free Epoch Converter Online utility converts raw Unix timestamps to local and UTC date formats locally.",
    aeoStep1: "Input a Unix epoch timestamp (seconds or milliseconds).",
    aeoStep2: "Toggle locale offsets to see dates in multiple target formats.",
    aeoStep3: "Convert Date structures back to raw Unix timestamps.",
    aeoWhyLocal: "Converting dates and database timestamps locally keeps records secure."
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    componentName: "TimeZoneConverterTool",
    componentFile: "time-zone-converter.tsx",
    category: "time",
    description: "Convert date times across multiple regional global zones.",
    aeoWhatIs: "A Free Time Zone Converter Online utility converts date-time parameters across global timezones locally.",
    aeoStep1: "Define date and time coordinates to transform.",
    aeoStep2: "Select source and target timezone parameters.",
    aeoStep3: "Review converted schedule coordinates instantly.",
    aeoWhyLocal: "Calculating date conversions locally ensures secure calendar planning."
  },
  {
    slug: "date-difference",
    name: "Date Difference Calculator",
    componentName: "DateDifferenceTool",
    componentFile: "date-difference.tsx",
    category: "time",
    description: "Compute the number of years, months, and days between target dates.",
    aeoWhatIs: "A Free Date Difference Calculator Online utility computes calendar offsets and spans between dates locally.",
    aeoStep1: "Enter target start date coordinates.",
    aeoStep2: "Enter target end date coordinates.",
    aeoStep3: "Review years, months, and days differences instantly.",
    aeoWhyLocal: "Calculating date intervals locally guarantees total data privacy."
  },
  {
    slug: "time-calculator",
    name: "Add/Subtract Time",
    componentName: "TimeCalculatorTool",
    componentFile: "time-calculator.tsx",
    category: "time",
    description: "Add or subtract duration offsets from a starting date.",
    aeoWhatIs: "A Free Add/Subtract Time Online utility performs date arithmetic offsets client-side.",
    aeoStep1: "Select starting date and time values.",
    aeoStep2: "Input duration additions or subtractions (days, hours, minutes).",
    aeoStep3: "Review the calculated resulting date-time instantly.",
    aeoWhyLocal: "Calculating date arithmetic locally keeps coordinates private and secure."
  }
];

// Write missing components
const componentTemplates = {
  "jwt-decoder.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [expiration, setExpiration] = useState("");
  const [error, setError] = useState("");

  const handleDecode = () => {
    setError("");
    setHeader("");
    setPayload("");
    setExpiration("");

    if (!token.trim()) {
      setError("Please paste a token first.");
      return;
    }

    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) {
        throw new Error("A JWT token must consist of exactly 3 parts separated by dots.");
      }

      const decodePart = (str: string) => {
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) base64 += "=";
        const decoded = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.stringify(JSON.parse(decoded), null, 2);
      };

      const decHeader = decodePart(parts[0]);
      const decPayload = decodePart(parts[1]);

      setHeader(decHeader);
      setPayload(decPayload);

      const parsedPayload = JSON.parse(decPayload);
      if (parsedPayload.exp) {
        const date = new Date(parsedPayload.exp * 1000);
        const expired = date.getTime() < Date.now();
        setExpiration(
          \`\${date.toLocaleString()} (\${expired ? "EXPIRED" : "VALID"})\`
        );
      } else {
        setExpiration("No expiration (exp) claim found in payload.");
      }
    } catch (e: any) {
      setError("Decoding failed: " + (e.message || "Invalid token structure"));
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Paste JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="editorial-textarea h-24 focus:outline-none"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          />
        </div>
        <button onClick={handleDecode} className="btn-primary">Decode JWT</button>

        {error && (
          <div className="p-4 border border-black bg-accent text-black font-mono text-xs uppercase">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="editorial-panel p-4 space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase">Header (Decoded)</h3>
            <pre className="text-xs font-mono bg-secondary/15 p-2 overflow-auto max-h-48 whitespace-pre-wrap">{header || "JSON header will display here..."}</pre>
          </div>
          <div className="editorial-panel p-4 space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase">Payload (Decoded)</h3>
            <pre className="text-xs font-mono bg-secondary/15 p-2 overflow-auto max-h-48 whitespace-pre-wrap">{payload || "JSON payload will display here..."}</pre>
          </div>
        </div>

        {expiration && (
          <div className="editorial-panel p-4 space-y-1">
            <h3 className="font-mono text-xs font-bold uppercase">Expiration Details</h3>
            <p className="text-sm font-mono">{expiration}</p>
          </div>
        )}
      </div>
    </div>
  );
}`,
  "text-diff-checker.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function TextDiffCheckerTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<{ type: string; val: string }[]>([]);

  const handleCompare = () => {
    const origLines = original.split("\\n");
    const modLines = modified.split("\\n");
    const result: { type: string; val: string }[] = [];

    let i = 0, j = 0;
    while (i < origLines.length || j < modLines.length) {
      if (i < origLines.length && j < modLines.length) {
        if (origLines[i] === modLines[j]) {
          result.push({ type: "same", val: origLines[i] });
          i++;
          j++;
        } else {
          // simple check for single line addition/deletion
          if (origLines[i + 1] === modLines[j]) {
            result.push({ type: "del", val: origLines[i] });
            i++;
          } else if (origLines[i] === modLines[j + 1]) {
            result.push({ type: "add", val: modLines[j] });
            j++;
          } else {
            result.push({ type: "del", val: origLines[i] });
            result.push({ type: "add", val: modLines[j] });
            i++;
            j++;
          }
        }
      } else if (i < origLines.length) {
        result.push({ type: "del", val: origLines[i] });
        i++;
      } else if (j < modLines.length) {
        result.push({ type: "add", val: modLines[j] });
        j++;
      }
    }
    setDiff(result);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Original Text</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="Paste original text here..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Modified Text</label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>
      <button onClick={handleCompare} className="btn-primary">Compare Text</button>

      {diff.length > 0 && (
        <div className="editorial-panel p-4 space-y-2">
          <h3 className="font-mono text-xs font-bold uppercase border-b border-black pb-2">Diff Highlights</h3>
          <div className="font-mono text-xs overflow-auto max-h-96 space-y-1 p-2 bg-secondary/10">
            {diff.map((line, idx) => (
              <div
                key={idx}
                className={\`p-1 \${
                  line.type === "add" ? "bg-green-100 text-green-800" :
                  line.type === "del" ? "bg-red-100 text-red-800" : ""
                }\`}
              >
                <span>{line.type === "add" ? "+ " : line.type === "del" ? "- " : "  "}</span>
                {line.val}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  "hash-generator.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function HashGeneratorTool() {
  const [text, setText] = useState("");
  const [sha256, setSha256] = useState("");
  const [sha512, setSha512] = useState("");
  const [sha1, setSha1] = useState("");

  const handleGenerate = async () => {
    if (!text) return;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const getHashHex = async (algo: string) => {
      const buffer = await crypto.subtle.digest(algo, data);
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    setSha256(await getHashHex("SHA-256"));
    setSha512(await getHashHex("SHA-512"));
    setSha1(await getHashHex("SHA-1"));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-24 focus:outline-none"
            placeholder="Type or paste target content to hash..."
          />
        </div>
        <button onClick={handleGenerate} className="btn-primary">Generate Hashes</button>

        <div className="space-y-3">
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">SHA-256</h4>
            <input readOnly value={sha256} className="w-full p-2 border border-black bg-secondary/10 font-mono text-xs select-all focus:outline-none" />
          </div>
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">SHA-512</h4>
            <input readOnly value={sha512} className="w-full p-2 border border-black bg-secondary/10 font-mono text-xs select-all focus:outline-none" />
          </div>
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">SHA-1</h4>
            <input readOnly value={sha1} className="w-full p-2 border border-black bg-secondary/10 font-mono text-xs select-all focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}`,
  "sql-formatter.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function SqlFormatterTool() {
  const [sql, setSql] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = () => {
    if (!sql.trim()) return;
    // Basic regex sql beautification and word upper-casing
    let formatted = sql.replace(/\\s+/g, " ");
    const keywords = [
      "SELECT", "FROM", "WHERE", "AND", "OR", "LEFT JOIN", "INNER JOIN",
      "RIGHT JOIN", "JOIN", "ON", "ORDER BY", "GROUP BY", "LIMIT",
      "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"
    ];

    keywords.forEach((kw) => {
      const rx = new RegExp(\`\\\\b\${kw}\\\\b\`, "gi");
      formatted = formatted.replace(rx, \`\\n\${kw}\`);
    });

    formatted = formatted
      .split("\\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\\n  ");

    // remove starting extra spaces
    setOutput(formatted.trim());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input SQL</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="SELECT id, name FROM users WHERE active = 1 AND age > 20 ORDER BY name DESC;"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Formatted SQL Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Formatted output will display here..."
          />
        </div>
      </div>
      <button onClick={handleFormat} className="btn-primary">Format SQL</button>
    </div>
  );
}`,
  "xml-to-json.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function XmlToJsonTool() {
  const [xml, setXml] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setJson("");

    if (!xml.trim()) {
      setError("Please paste XML structure.");
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");
      const errorNode = doc.querySelector("parsererror");
      if (errorNode) {
        throw new Error(errorNode.textContent || "XML parse error");
      }

      const convertNode = (node: Node): any => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue?.trim() || "";
        }

        const obj: any = {};
        if (node.hasChildNodes()) {
          node.childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const val = child.nodeValue?.trim();
              if (val) {
                obj["#text"] = val;
              }
            } else {
              const childVal = convertNode(child);
              const nodeName = child.nodeName;
              if (obj[nodeName]) {
                if (!Array.isArray(obj[nodeName])) {
                  obj[nodeName] = [obj[nodeName]];
                }
                obj[nodeName].push(childVal);
              } else {
                obj[nodeName] = childVal;
              }
            }
          });
        }
        return obj;
      };

      const result = convertNode(doc.documentElement);
      setJson(JSON.stringify({ [doc.documentElement.nodeName]: result }, null, 2));
    } catch (e: any) {
      setError("Failed to convert: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input XML</label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me!</body></note>"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">JSON Output</label>
          <textarea
            readOnly
            value={json}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="JSON output will display here..."
          />
        </div>
      </div>
      <button onClick={handleConvert} className="btn-primary">Convert XML to JSON</button>
      {error && (
        <div className="p-4 border border-black bg-accent text-black font-mono text-xs uppercase">
          {error}
        </div>
      )}
    </div>
  );
}`,
  "regex-tester.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function RegexTesterTool() {
  const [regex, setRegex] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<{ match: string; index: number }[]>([]);
  const [error, setError] = useState("");

  const handleTest = () => {
    setError("");
    setMatches([]);

    if (!regex) return;

    try {
      const rx = new RegExp(regex, flags);
      let match;
      const res: { match: string; index: number }[] = [];
      if (flags.includes("g")) {
        while ((match = rx.exec(text)) !== null) {
          res.push({ match: match[0], index: match.index });
          if (rx.lastIndex === match.index) {
            rx.lastIndex++; // Prevent infinite loop on zero-width match
          }
        }
      } else {
        match = rx.exec(text);
        if (match) {
          res.push({ match: match[0], index: match.index });
        }
      }
      setMatches(res);
    } catch (e: any) {
      setError(e.message || "Invalid regular expression pattern");
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Regex Pattern</label>
            <input
              type="text"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none"
              placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Regex Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none"
              placeholder="g, i, m"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Test Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-24 focus:outline-none"
            placeholder="Type text to test regular expression patterns..."
          />
        </div>
        <button onClick={handleTest} className="btn-primary">Test Expression</button>

        {error && (
          <div className="p-4 border border-black bg-accent text-black font-mono text-xs uppercase">
            {error}
          </div>
        )}

        <div className="editorial-panel p-4">
          <h4 className="font-mono text-xs font-bold uppercase mb-2">Matches ({matches.length})</h4>
          <div className="space-y-2 max-h-40 overflow-auto">
            {matches.map((m, idx) => (
              <div key={idx} className="font-mono text-xs p-1 border-b border-black/10">
                Matched <span className="bg-accent text-black font-bold px-1">"{m.match}"</span> at position {m.index}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
  "html-entities.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function HtmlEntitiesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    const temp = document.createElement("div");
    temp.textContent = input;
    setOutput(temp.innerHTML);
  };

  const handleDecode = () => {
    const temp = document.createElement("div");
    temp.innerHTML = input;
    setOutput(temp.textContent || "");
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="Type code or characters to convert..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Output Text</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Entity conversion results display here..."
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleEncode} className="btn-primary">Encode Entities</button>
        <button onClick={handleDecode} className="btn-secondary">Decode Entities</button>
      </div>
    </div>
  );
}`,
  "uuid-generator.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => {
    const res: string[] = [];
    const target = Math.max(1, Math.min(100, count));
    for (let i = 0; i < target; i++) {
      res.push(crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }));
    }
    setUuids(res);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs font-bold uppercase">Generate Quantity:</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            className="p-1 border border-black w-20 bg-background font-mono text-xs focus:outline-none"
            min={1}
            max={100}
          />
        </div>
        <button onClick={handleGenerate} className="btn-primary">Generate UUIDs</button>

        {uuids.length > 0 && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase">Generated Identifiers</h4>
            <pre className="font-mono text-xs bg-secondary/15 p-2 overflow-auto max-h-60 whitespace-pre">{uuids.join("\\n")}</pre>
          </div>
        )}
      </div>
    </div>
  );
}`,
  "find-replace.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function FindReplaceTool() {
  const [text, setText] = useState("");
  const [findStr, setFindStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");
  const [output, setOutput] = useState("");

  const handleReplace = () => {
    if (!findStr) return;
    const parts = text.split(findStr);
    setOutput(parts.join(replaceStr));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="Type text here..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Output Text</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-48 focus:outline-none bg-secondary/10"
            placeholder="Output with replacements displays here..."
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-end">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Find String</label>
          <input
            type="text"
            value={findStr}
            onChange={(e) => setFindStr(e.target.value)}
            className="p-2 border border-black bg-background font-mono text-xs focus:outline-none"
            placeholder="find pattern"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Replace With</label>
          <input
            type="text"
            value={replaceStr}
            onChange={(e) => setReplaceStr(e.target.value)}
            className="p-2 border border-black bg-background font-mono text-xs focus:outline-none"
            placeholder="replacement"
          />
        </div>
        <button onClick={handleReplace} className="btn-primary h-fit">Replace All</button>
      </div>
    </div>
  );
}`,
  "lorem-ipsum.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et",
  "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
  "aliquip", "ex", "ea", "commodo", "consequat"
];

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    let res = "";
    for (let i = 0; i < count; i++) {
      const sentenceCount = 4 + Math.floor(Math.random() * 4);
      let para = "";
      for (let s = 0; s < sentenceCount; s++) {
        const wordCount = 6 + Math.floor(Math.random() * 8);
        const sentenceWords = [];
        for (let w = 0; w < wordCount; w++) {
          sentenceWords.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
        }
        const sStr = sentenceWords.join(" ");
        para += sStr.charAt(0).toUpperCase() + sStr.slice(1) + ". ";
      }
      res += para.trim() + "\\n\\n";
    }
    setOutput(res.trim());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs font-bold uppercase">Paragraphs count:</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            className="p-1 border border-black w-20 bg-background font-mono text-xs focus:outline-none"
            min={1}
            max={50}
          />
        </div>
        <button onClick={handleGenerate} className="btn-primary">Generate Dummy Text</button>

        {output && (
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-2">Lorem Ipsum Output</h4>
            <pre className="font-mono text-xs bg-secondary/15 p-2 overflow-auto max-h-60 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}`,
  "remove-duplicate-lines.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function RemoveDuplicateLinesTool() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleRemove = () => {
    const lines = text.split("\\n");
    const unique = Array.from(new Set(lines));
    setOutput(unique.join("\\n"));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input text list</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="line A\\nline B\\nline A..."
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Deduplicated Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Unique lines display here..."
          />
        </div>
      </div>
      <button onClick={handleRemove} className="btn-primary">Deduplicate Lines</button>
    </div>
  );
}`,
  "sort-text-lines.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function SortTextLinesTool() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleSort = () => {
    const lines = text.split("\\n");
    lines.sort((a, b) => a.localeCompare(b));
    setOutput(lines.join("\\n"));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input text lines</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="orange\\napple\\nbanana"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Sorted Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Sorted lines display here..."
          />
        </div>
      </div>
      <button onClick={handleSort} className="btn-primary">Sort Alphabetically</button>
    </div>
  );
}`,
  "image-compressor.tsx": `"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ImageCompressorTool() {
  const [image, setImage] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const out = canvas.toDataURL("image/jpeg", quality);
        setCompressed(out);
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>
        {image && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="font-mono text-xs font-bold uppercase">Quality ({quality}):</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-48"
              />
            </div>
            <button onClick={handleCompress} className="btn-primary">Compress Image</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Original Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {compressed && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Compressed Output</h4>
              <img src={compressed} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={compressed} download="compressed_image.jpg" className="btn-primary block text-center mt-2">Download JPEG</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}`,
  "image-resizer.tsx": `"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ImageResizerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [resized, setResized] = useState<string | null>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        setResized(canvas.toDataURL("image/png"));
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>
        {image && (
          <div className="flex gap-2 items-end">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Width (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-24" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Height (px)</label>
              <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-24" />
            </div>
            <button onClick={handleResize} className="btn-primary h-fit">Resize</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Original Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {resized && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Resized Output</h4>
              <img src={resized} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={resized} download="resized_image.png" className="btn-primary block text-center mt-2">Download PNG</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}`,
  "png-to-jpg.tsx": `"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function PngToJpgTool() {
  const [image, setImage] = useState<string | null>(null);
  const [jpg, setJpg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
        setJpg(canvas.toDataURL("image/jpeg"));
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload PNG Image</label>
          <input type="file" accept="image/png" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>
        {image && (
          <button onClick={handleConvert} className="btn-primary">Convert to JPG</button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">PNG Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {jpg && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">JPG Output</h4>
              <img src={jpg} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={jpg} download="converted.jpg" className="btn-primary block text-center mt-2">Download JPG</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}`,
  "jpg-to-png.tsx": `"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function JpgToPngTool() {
  const [image, setImage] = useState<string | null>(null);
  const [png, setPng] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        setPng(canvas.toDataURL("image/png"));
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload JPG Image</label>
          <input type="file" accept="image/jpeg,image/jpg" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>
        {image && (
          <button onClick={handleConvert} className="btn-primary">Convert to PNG</button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">JPG Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {png && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">PNG Output</h4>
              <img src={png} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={png} download="converted.png" className="btn-primary block text-center mt-2">Download PNG</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}`,
  "image-cropper.tsx": `"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ImageCropperTool() {
  const [image, setImage] = useState<string | null>(null);
  const [cropped, setCropped] = useState<string | null>(null);
  const [cropX, setCropX] = useState(50);
  const [cropY, setCropY] = useState(50);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = cropW;
        canvas.height = cropH;
        ctx?.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
        setCropped(canvas.toDataURL("image/png"));
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>

        {image && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">X offset</label>
              <input type="number" value={cropX} onChange={(e) => setCropX(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Y offset</label>
              <input type="number" value={cropY} onChange={(e) => setCropY(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Width (px)</label>
              <input type="number" value={cropW} onChange={(e) => setCropW(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Height (px)</label>
              <input type="number" value={cropH} onChange={(e) => setCropH(parseInt(e.target.value, 10))} className="p-2 border border-black bg-background font-mono text-xs w-full" />
            </div>
          </div>
        )}
        {image && (
          <button onClick={handleCrop} className="btn-primary">Crop Image</button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {image && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Original Preview</h4>
              <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            </div>
          )}
          {cropped && (
            <div className="editorial-panel p-4 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase">Cropped Output</h4>
              <img src={cropped} className="max-h-64 object-contain max-w-full mx-auto" />
              <a href={cropped} download="cropped.png" className="btn-primary block text-center mt-2">Download Crop</a>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}`,
  "color-picker.tsx": `"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function ColorPickerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      if (ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + Array.from(pixel.slice(0, 3)).map((b) => b.toString(16).padStart(2, "0")).join("");
        setColor(hex);
      }
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border border-black bg-background font-mono text-xs w-full" />
        </div>

        {image && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">Click on Canvas to Extract Colors</h4>
            <canvas ref={canvasRef} onClick={handleCanvasClick} className="cursor-crosshair max-h-[300px] max-w-full mx-auto block border border-black" />
          </div>
        )}

        <div className="editorial-panel p-4 flex items-center gap-4">
          <div className="w-12 h-12 border border-black" style={{ backgroundColor: color }} />
          <div>
            <h4 className="font-mono text-xs font-bold uppercase">Selected Color</h4>
            <p className="font-mono text-sm uppercase">{color}</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  "base64-to-image.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function Base64ToImageTool() {
  const [base64, setBase64] = useState("");
  const [image, setImage] = useState("");

  const handleConvert = () => {
    if (!base64.trim()) return;
    setImage(base64.trim().startsWith("data:image") ? base64.trim() : \`data:image/png;base64,\${base64.trim()}\`);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Paste Base64 Image String</label>
          <textarea
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
            className="editorial-textarea h-36 focus:outline-none"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANS..."
          />
        </div>
        <button onClick={handleConvert} className="btn-primary">Render Image</button>

        {image && (
          <div className="editorial-panel p-4 space-y-2 text-center">
            <h4 className="font-mono text-xs font-bold uppercase text-left mb-2">Decoded Image Output</h4>
            <img src={image} className="max-h-64 object-contain max-w-full mx-auto" />
            <a href={image} download="decoded_image.png" className="btn-primary inline-block mt-4">Download Image</a>
          </div>
        )}
      </div>
    </div>
  );
}`,
  "svg-to-png.tsx": `"use client";
import { useState, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function SvgToPngTool() {
  const [svgText, setSvgText] = useState("");
  const [png, setPng] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConvert = () => {
    if (!svgText) return;
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width || 500;
        canvas.height = img.height || 500;
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
        setPng(canvas.toDataURL("image/png"));
        URL.revokeObjectURL(url);
      }
    };
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Paste SVG XML Code</label>
          <textarea
            value={svgText}
            onChange={(e) => setSvgText(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red' /></svg>"
          />
        </div>
        <button onClick={handleConvert} className="btn-primary">Rasterize to PNG</button>

        {png && (
          <div className="editorial-panel p-4 space-y-2 text-center">
            <h4 className="font-mono text-xs font-bold uppercase text-left mb-2">PNG Preview</h4>
            <img src={png} className="max-h-64 object-contain max-w-full mx-auto" />
            <a href={png} download="vector.png" className="btn-primary inline-block mt-4">Download PNG</a>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}`,
  "url-encoder-decoder.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function UrlEncoderDecoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setOutput("Error decoding parameters: Invalid URL component");
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input URL text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="editorial-textarea h-48 focus:outline-none"
            placeholder="https://example.com/search?q=hello world"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Formatted Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-48 focus:outline-none bg-secondary/10"
            placeholder="URL conversion output displays here..."
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleEncode} className="btn-primary">Encode URL</button>
        <button onClick={handleDecode} className="btn-secondary">Decode URL</button>
      </div>
    </div>
  );
}`,
  "html-minifier.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function HtmlMinifierTool() {
  const [html, setHtml] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    let minified = html
      .replace(/<!--[\\s\\S]*?-->/g, "") // remove comments
      .replace(/\\s+/g, " ") // collapse whitespaces
      .replace(/>\\s+</g, "><") // collapse whitespaces between tags
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input HTML Markup</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="<!-- comment -->\n<div>\n  <p>Hello World</p>\n</div>"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Minified Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Minified markup output displays here..."
          />
        </div>
      </div>
      <button onClick={handleMinify} className="btn-primary">Minify HTML</button>
    </div>
  );
}`,
  "css-minifier.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function CssMinifierTool() {
  const [css, setCss] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    let minified = css
      .replace(/\\/\\*[\\s\\S]*?\\*\\//g, "") // remove comments
      .replace(/\\s+/g, " ") // collapse whitespaces
      .replace(/\\s*([{}|:;])\\s*/g, "$1") // remove spaces around brackets and punctuation
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input CSS</label>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="/* styling comments */\nbody {\n  background-color: white;\n  margin: 0px;\n}"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Minified Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Minified stylesheet displays here..."
          />
        </div>
      </div>
      <button onClick={handleMinify} className="btn-primary">Minify CSS</button>
    </div>
  );
}`,
  "javascript-minifier.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function JsMinifierTool() {
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = () => {
    let minified = js
      .replace(/\\/\\/[^\\n]*\\n/g, "") // remove double-slash comments
      .replace(/\\/\\*[\\s\\S]*?\\*\\//g, "") // remove multi-line comments
      .replace(/\\s+/g, " ") // collapse spaces
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input JavaScript Code</label>
          <textarea
            value={js}
            onChange={(e) => setJs(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="// run program\nfunction sum(a, b) {\n  return a + b;\n}"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Minified Output</label>
          <textarea
            readOnly
            value={output}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="Minified script output displays here..."
          />
        </div>
      </div>
      <button onClick={handleMinify} className="btn-primary">Minify JS</button>
    </div>
  );
}`,
  "meta-tag-generator.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keys, setKeys] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    let meta = \`<!-- SEO Meta Tags -->\\n<title>\${title}</title>\\n\`;
    if (desc) meta += \`<meta name="description" content="\${desc}">\\n\`;
    if (keys) meta += \`<meta name="keywords" content="\${keys}">\\n\`;
    meta += \`<!-- Open Graph / Facebook -->\\n<meta property="og:type" content="website">\\n<meta property="og:title" content="\${title}">\\n\`;
    if (desc) meta += \`<meta property="og:description" content="\${desc}">\\n\`;
    setOutput(meta);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Website Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Meta Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="editorial-textarea h-24 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Keywords</label>
            <input type="text" value={keys} onChange={(e) => setKeys(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <button onClick={handleGenerate} className="btn-primary">Generate Tags</button>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Generated HTML Meta Tags</label>
          <textarea readOnly value={output} className="editorial-textarea h-64 focus:outline-none bg-secondary/10" placeholder="Meta tags will display here..." />
        </div>
      </div>
    </div>
  );
}`,
  "robots-txt-generator.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function RobotsTxtGeneratorTool() {
  const [sitemap, setSitemap] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("none");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    let text = "User-agent: *\\nAllow: /\\n";
    if (crawlDelay !== "none") text += \`Crawl-delay: \${crawlDelay}\\n\`;
    if (sitemap) text += \`Sitemap: \${sitemap}\\n\`;
    setOutput(text);
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Sitemap URL</label>
            <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" placeholder="https://example.com/sitemap.xml" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Crawl Delay</label>
            <select value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none">
              <option value="none">None</option>
              <option value="1">1 second</option>
              <option value="5">5 seconds</option>
              <option value="10">10 seconds</option>
            </select>
          </div>
          <button onClick={handleGenerate} className="btn-primary">Generate Robots.txt</button>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Robots.txt Output</label>
          <textarea readOnly value={output} className="editorial-textarea h-48 focus:outline-none bg-secondary/10" placeholder="crawler rules output will display here..." />
        </div>
      </div>
    </div>
  );
}`,
  "epoch-converter.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function EpochConverterTool() {
  const [epoch, setEpoch] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [utcStr, setUtcStr] = useState("");

  const handleConvert = () => {
    const rawVal = parseInt(epoch.trim(), 10);
    if (isNaN(rawVal)) return;
    const date = new Date(rawVal * (epoch.trim().length <= 10 ? 1000 : 1));
    setDateStr(date.toString());
    setUtcStr(date.toUTCString());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Unix Epoch Timestamp (sec or ms)</label>
            <input type="text" value={epoch} onChange={(e) => setEpoch(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" placeholder="1718300000" />
          </div>
          <button onClick={handleConvert} className="btn-primary h-fit">Convert Epoch</button>
        </div>

        {dateStr && (
          <div className="space-y-2">
            <div className="editorial-panel p-4">
              <h4 className="font-mono text-xs font-bold uppercase mb-1">Local Date</h4>
              <p className="font-mono text-sm">{dateStr}</p>
            </div>
            <div className="editorial-panel p-4">
              <h4 className="font-mono text-xs font-bold uppercase mb-1">UTC Date</h4>
              <p className="font-mono text-sm">{utcStr}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  "time-zone-converter.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function TimeZoneConverterTool() {
  const [dateVal, setDateVal] = useState("");
  const [targetZone, setTargetZone] = useState("UTC");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!dateVal) return;
    try {
      const d = new Date(dateVal);
      const str = d.toLocaleString("en-US", { timeZone: targetZone });
      setOutput(str);
    } catch {
      setOutput("Error: Invalid timezone selection or Date value");
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Select Local Time</label>
            <input type="datetime-local" value={dateVal} onChange={(e) => setDateVal(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Target Timezone</label>
            <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none">
              <option value="UTC">UTC</option>
              <option value="America/New_York">EST (America/New_York)</option>
              <option value="Europe/London">GMT (Europe/London)</option>
              <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
            </select>
          </div>
        </div>
        <button onClick={handleConvert} className="btn-primary">Convert Timezone</button>

        {output && (
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">Converted date-time</h4>
            <p className="font-mono text-sm">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}`,
  "date-difference.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function DateDifferenceTool() {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [daysDiff, setDaysDiff] = useState<number | null>(null);

  const handleCalculate = () => {
    if (!dateA || !dateB) return;
    const dA = new Date(dateA);
    const dB = new Date(dateB);
    const msDiff = Math.abs(dB.getTime() - dA.getTime());
    setDaysDiff(Math.floor(msDiff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Start Date</label>
          <input type="date" value={dateA} onChange={(e) => setDateA(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">End Date</label>
          <input type="date" value={dateB} onChange={(e) => setDateB(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
        </div>
      </div>
      <button onClick={handleCalculate} className="btn-primary">Calculate Difference</button>

      {daysDiff !== null && (
        <div className="editorial-panel p-4">
          <h4 className="font-mono text-xs font-bold uppercase mb-1">Date Offset Spans</h4>
          <p className="font-mono text-sm">{daysDiff} days difference between date selections.</p>
        </div>
      )}
    </div>
  );
}`,
  "time-calculator.tsx": `"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function TimeCalculatorTool() {
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(0);
  const [operation, setOperation] = useState("add");
  const [output, setOutput] = useState("");

  const handleCalculate = () => {
    if (!startDate) return;
    const date = new Date(startDate);
    const offset = days * (operation === "add" ? 1 : -1);
    date.setDate(date.getDate() + offset);
    setOutput(date.toString());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Days offset</label>
            <input type="number" value={days} onChange={(e) => setDays(parseInt(e.target.value, 10))} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Operation</label>
            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none">
              <option value="add">Add</option>
              <option value="subtract">Subtract</option>
            </select>
          </div>
        </div>
        <button onClick={handleCalculate} className="btn-primary">Calculate Result</button>

        {output && (
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">New Date Result</h4>
            <p className="font-mono text-sm">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}`
};

// 1. Write the components
Object.entries(componentTemplates).forEach(([filename, code]) => {
  const filePath = path.join(componentsDir, filename);
  console.log(`Writing component: ${filePath}`);
  fs.writeFileSync(filePath, code, 'utf8');
});

// Helper: resolve import statement and component tag
function resolveImportLineAndTag(slug, componentName) {
  if (slug === 'base64-encoder-decoder') {
    return {
      importLine: 'import { Base64Tool } from "@/components/tools/base64-tool";',
      tag: '<Base64Tool />'
    };
  }
  if (slug === 'json-formatter') {
    return {
      importLine: 'import { JsonFormatterTool } from "@/components/tools/json-formatter";',
      tag: '<JsonFormatterTool />'
    };
  }
  
  let importPath = `@/components/tools/${slug}`;
  if (slug === 'add-pdf-page-numbers') importPath = '@/components/tools/add-page-numbers';
  if (slug === 'add-watermark-to-pdf') importPath = '@/components/tools/add-watermark';
  if (slug === 'javascript-minifier') importPath = '@/components/tools/javascript-minifier';
  
  return {
    importLine: `import ${componentName} from "${importPath}";`,
    tag: `<${componentName} />`
  };
}

function resolveComponentName(slug) {
  const tool = toolsList.find(t => t.slug === slug);
  if (tool) return tool.componentName;
  if (slug === 'csv-to-excel') return 'CsvToExcelTool';
  if (slug === 'javascript-minifier') return 'JsMinifierTool';
  return 'Tool';
}

// 2. Re-create all page routes to enforce the metadata and layout format
toolsList.forEach((tool) => {
  const routeFolder = path.join(appDir, tool.slug);
  if (!fs.existsSync(routeFolder)) {
    fs.mkdirSync(routeFolder, { recursive: true });
  }

  const pagePath = path.join(routeFolder, 'page.tsx');
  const componentName = resolveComponentName(tool.slug);
  const { importLine, tag } = resolveImportLineAndTag(tool.slug, componentName);

  const pageContent = `import type { Metadata } from "next";
${importLine}
import { SchemaMarkup } from "@/components/schema-markup";
import { AeoSection } from "@/components/aeo-section";

const toolName = "${tool.name}";
const toolUrl = "/tools/${tool.slug}";

const displayDescription = "Free ${tool.description.charAt(0).toLowerCase() + tool.description.slice(1)}";

export const metadata: Metadata = {
  title: "Free ${tool.name} Online | 100% Private | ToolsAtZero",
  description: displayDescription,
  openGraph: {
    title: "Free ${tool.name} Online | 100% Private | ToolsAtZero",
    description: displayDescription,
    url: "https://toolsatzero.com/tools/${tool.slug}",
    siteName: "ToolsAtZero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ${tool.name} Online | 100% Private | ToolsAtZero",
    description: displayDescription,
  },
};

const faqs = [
  {
    question: "What is a Free ${tool.name} Online Utility?",
    answer: "${tool.aeoWhatIs.replace(/"/g, '\\"')}",
  },
  {
    question: "Is it safe to use this Free ${tool.name} Online tool?",
    answer: "Yes, this tool processes all data locally on your device. Nothing is ever sent to our servers.",
  }
];

export default function ${componentName}Page() {
  return (
    <>
      <SchemaMarkup
        toolName="Free ${tool.name} Online"
        toolDescription={displayDescription}
        toolUrl={toolUrl}
        faqs={faqs}
      />

      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <header className="space-y-4">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Free ${tool.name} Online
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {displayDescription}
            </p>
          </header>

          ${tag}

          <AeoSection
            toolName={toolName}
            whatIs="${tool.aeoWhatIs.replace(/"/g, '\\"')}"
            howToUse={[
              "${tool.aeoStep1.replace(/"/g, '\\"')}",
              "${tool.aeoStep2.replace(/"/g, '\\"')}",
              "${tool.aeoStep3.replace(/"/g, '\\"')}"
            ]}
            whyClientSide="${tool.aeoWhyLocal.replace(/"/g, '\\"')}"
          />
        </article>
      </main>
    </>
  );
}
`;

  console.log(`Writing page route: ${pagePath}`);
  fs.writeFileSync(pagePath, pageContent, 'utf8');
});

console.log("All tools components and route pages created successfully!");
