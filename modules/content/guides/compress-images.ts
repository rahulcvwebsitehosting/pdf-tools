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

export const compressImagesGuide: GuideContent = {
  // ─── Identity ───────────────────────────────────────────────────────
  id: "guide.compress-images",
  type: "guide",
  slug: "how-to-compress-images",
  title: "How to Compress Images",
  description:
    "Learn how to reduce image file size without losing quality. Complete guide to client-side PNG and JPEG compression.",
  seoTitle:
    "How to Compress Images Online | Lossless Compression Guide | ToolsAtZero",
  metaDescription:
    "Step-by-step guide explaining how to compress PNG and JPEG images locally in-browser. Learn EXIF metadata stripping and resolution optimizations.",
  keywords: [
    "how to compress images",
    "reduce image size online",
    "png compression guide",
    "local image shrink",
    "strip exif metadata",
    "optimize images for web",
    "jpeg compression quality",
    "browser image compressor",
  ],
  entityIds: [
    "entity.jpeg",
    "entity.png",
    "entity.exif",
    "entity.lossy-compression",
    "entity.lossless-compression",
  ],
  status: "published",

  // ─── Meta ───────────────────────────────────────────────────────────
  meta: defaultMeta({
    topicId: "image.compress",
    difficulty: "beginner",
    readingTimeMinutes: 6,
    targetAudience: [
      "web developers",
      "bloggers",
      "photographers",
      "social media managers",
    ],
    searchIntents: ["informational", "how-to"],
    aliases: [
      "shrink images",
      "reduce photo size",
      "optimize pictures",
      "image optimizer",
    ],
  }),
  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 7, expectedTraffic: "high" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  // ─── Relationships ──────────────────────────────────────────────────
  relationships: defaultRelationships({
    parents: ["category.image-tools"],
    siblings: ["guide.convert-png-to-jpg"],
    relatedGuides: ["guide.convert-png-to-jpg", "guide.merge-pdf"],
    relatedComparisons: [
      "comparison.png-vs-jpg",
      "comparison.lossy-vs-lossless",
    ],
    relatedCategories: ["category.image-tools"],
  }),
  recommendations: defaultRecommendations({
    beginner: ["guide.convert-png-to-jpg", "guide.what-is-bmi"],
    next: ["guide.merge-pdf"],
    advanced: ["guide.json-formatter"],
  }),

  // ─── AI Blocks ──────────────────────────────────────────────────────
  aiBlocks: defaultAIBlocks({
    aiSummary:
      "Image compression reduces file size by removing redundant or imperceptible pixel data. Lossy compression (JPEG) discards fine details humans cannot easily see. Lossless compression (PNG deflate) encodes pixel data more efficiently without removing any information. Client-side compressors process images in the browser using the Canvas API, keeping photos private.",
    keyTakeaways: [
      "Lossy JPEG compression at 80-85% quality is usually indistinguishable from the original to human eyes",
      "Stripping EXIF metadata removes GPS coordinates and camera details — critical for privacy",
      "Resize images to the display resolution before compressing to maximize savings",
      "PNG is lossless and best for graphics with sharp edges; JPEG is lossy and best for photographs",
      "Client-side compression avoids uploading personal photos to third-party servers",
    ],
    quickFacts: [
      "JPEG uses DCT (Discrete Cosine Transform) to compress frequency data in 8×8 pixel blocks",
      "PNG uses DEFLATE compression, the same algorithm behind gzip and ZIP",
      "EXIF data can add 10-60 KB to every photo taken by a smartphone",
      "WebP typically achieves 25-35% smaller files than JPEG at equivalent quality",
      "The HTML Canvas API's toBlob() method is the core engine behind browser-based image compression",
    ],
    expertTips: [
      "Use quality 82 for JPEG — it sits at the optimal point on the quality-vs-size curve for most photographs",
      "For batch compression, process images in a Web Worker to avoid UI freezing",
      "Always compare the compressed output side-by-side with the original at 100% zoom before publishing",
    ],
  }),

  // ─── Quick Answer ──────────────────────────────────────────────────
  quickAnswer:
    "To compress images, upload your JPEG or PNG files to a client-side compressor, set quality to 80-85% for JPEG, strip EXIF metadata for privacy, and download the smaller files. All processing happens in your browser — no photos are uploaded to any server. Typical savings: 50-80% file size reduction.",

  // ─── Introduction ──────────────────────────────────────────────────
  introduction:
    "Optimizing website speed requires compressed images. This tutorial explains how to downsize JPEG and PNG bytes directly in-browser while preserving visual quality, and covers the science behind different compression techniques.",

  // ─── Why It Matters ────────────────────────────────────────────────
  whyItMatters:
    "Images account for 50-70% of total web page weight on average. Uncompressed photos increase load times, hurt SEO rankings, and consume mobile users' data plans. Proper compression delivers identical visual results at a fraction of the bandwidth cost.",

  // ─── Table of Contents ─────────────────────────────────────────────
  toc: [
    "The Math Behind Image Compression",
    "Steps to Compress Photos Locally",
    "Best Practices for Web Images",
    "EXIF Data and Privacy",
    "Troubleshooting Common Issues",
    "Performance Optimization",
    "Frequently Asked Questions",
  ],

  // ─── Steps ─────────────────────────────────────────────────────────
  steps: [
    "Navigate to the Free Image Compressor page.",
    "Upload or drop your JPEG or PNG files into the compressor grid.",
    "Adjust the target quality slider (80-85% is recommended for web).",
    "Toggle EXIF metadata stripping to clean camera profile details.",
    "Review the dynamic file size savings and save the compressed images.",
  ],

  // ─── How It Works ──────────────────────────────────────────────────
  howItWorks:
    "The browser reads the image file into memory and decodes it onto an invisible HTML Canvas element at the original resolution. For JPEG output, the Canvas API's toBlob() method re-encodes the pixel data using the specified quality factor — lower quality means more aggressive DCT quantization and smaller files. For PNG, the lossless DEFLATE algorithm compresses the raw pixel data without discarding information. EXIF stripping works by reading only the image bitmap and discarding the metadata headers entirely during re-encoding.",

  // ─── Examples ──────────────────────────────────────────────────────
  examples: [
    "Compressing product photos from 4 MB to 400 KB for faster e-commerce page loads",
    "Stripping GPS coordinates from vacation photos before posting on social media",
    "Batch-compressing blog header images to meet a 200 KB per-image budget",
    "Reducing screenshot file sizes from 2 MB PNG to 300 KB JPEG for documentation",
    "Optimizing portfolio photographs for a photography website without visible quality loss",
  ],

  // ─── Best Practices ───────────────────────────────────────────────
  bestPractices: [
    "Strip EXIF geolocation headers to protect your privacy before posting images online.",
    "Use JPEG for photos and PNG for charts or transparent graphics.",
    "Resize pixel width to match target layout displays before compressing.",
    "Keep one uncompressed original as a master copy — never compress from an already-compressed file.",
    "Test compressed images on both retina and standard displays to ensure acceptable quality.",
  ],

  // ─── Common Mistakes ──────────────────────────────────────────────
  commonMistakes: [
    "Compressing files repeatedly, which causes progressive lossy pixel degradation.",
    "Uploading private camera rolls to remote servers.",
    "Using lossless compression on large photos when lossy JPEG is more suited.",
    "Setting JPEG quality below 60%, which introduces visible block artifacts.",
    "Ignoring image dimensions — compressing a 6000px-wide photo to 80% quality still results in a large file.",
  ],

  // ─── Pro Tips ──────────────────────────────────────────────────────
  proTips: [
    "Quality 82 for JPEG hits the sweet spot — diminishing returns above 85, visible artifacts below 70.",
    "Use the 'Save for Web' mental model: resize first, then compress, then strip metadata.",
    "For transparent images that must stay transparent, compress as PNG with optimized DEFLATE — do not convert to JPEG.",
    "Consider WebP output if your audience uses modern browsers — 25-35% smaller than equivalent JPEG.",
    "Automate batch compression with a build tool (e.g., imagemin in webpack) for production workflows.",
  ],

  // ─── Troubleshooting ──────────────────────────────────────────────
  troubleshooting: [
    {
      question: "The compressed image looks blurry.",
      answer:
        "Quality is set too low. Increase the quality slider to 80-85% for JPEG. If the image is a screenshot or diagram, use PNG instead.",
    },
    {
      question: "File size barely changed after compression.",
      answer:
        "The image was likely already compressed. Also check if the dimensions are very large — resize to the actual display width first, then compress.",
    },
    {
      question: "Colors look different after compression.",
      answer:
        "JPEG compression can shift colors slightly due to chroma subsampling. For color-critical work (product photos, art), use quality 90+ or lossless PNG.",
    },
    {
      question: "Transparent background turned white.",
      answer:
        "You output as JPEG, which does not support transparency. Use PNG output to preserve alpha channel transparency.",
    },
    {
      question: "EXIF stripping didn't remove all metadata.",
      answer:
        "Some metadata (XMP, IPTC) is stored in separate blocks from EXIF. Ensure the tool strips all metadata types, not just EXIF.",
    },
    {
      question: "Browser freezes when compressing many images.",
      answer:
        "Process images sequentially or in small batches. Tools using Web Workers offload decoding to background threads to prevent UI freezing.",
    },
    {
      question: "Compressed PNG is larger than the original.",
      answer:
        "This can happen if the original used a highly optimized encoder. The browser's built-in PNG encoder is not as aggressive — try a dedicated PNG optimizer like oxipng.",
    },
    {
      question: "The tool doesn't accept my image format.",
      answer:
        "Browser-based compressors typically support JPEG, PNG, and WebP. Convert BMP, TIFF, or HEIC files to a supported format first.",
    },
  ],

  // ─── Benefits ──────────────────────────────────────────────────────
  benefits: [
    "Faster page loads — compressed images directly reduce Time to Interactive (TTI) and Largest Contentful Paint (LCP)",
    "Privacy preserved — photos stay on your device, EXIF location data is stripped locally",
    "Bandwidth savings — 50-80% file size reduction means lower hosting costs and faster mobile experiences",
    "SEO improvement — Google's Core Web Vitals reward pages with optimized image weights",
    "No quality loss at recommended settings — 80-85% JPEG quality is perceptually identical to the original",
  ],

  // ─── Limitations ──────────────────────────────────────────────────
  limitations: [
    "JPEG compression is lossy — each re-compression cycle degrades quality further (generation loss)",
    "Browser PNG encoders are less aggressive than specialized tools like oxipng or zopflipng",
    "Very large images (10,000+ px) may exceed Canvas element size limits in some browsers",
    "HEIC and RAW formats require conversion before browser-based compression",
    "No AI-powered upscaling — compression reduces file size, it does not enhance resolution",
  ],

  // ─── Security Notes ───────────────────────────────────────────────
  securityNotes: [
    "All compression runs locally via the Canvas API — no image data is transmitted to servers",
    "EXIF stripping removes GPS coordinates, camera serial numbers, and timestamps that could identify your location and device",
    "Compressed output contains only pixel data — no hidden metadata is re-injected by the tool",
    "For maximum assurance with sensitive photos, disconnect from the internet before processing",
  ],

  // ─── Performance Tips ─────────────────────────────────────────────
  performanceTips: [
    "Resize images to the maximum display width before compressing — a 1200px-wide blog column does not need a 6000px-wide source image",
    "Process images one at a time in memory-constrained environments (phones, tablets with < 3 GB RAM)",
    "Use WebP output when possible — it compresses faster and produces smaller files than JPEG",
    "Enable OffscreenCanvas in Web Workers for true background processing without blocking the main thread",
    "For batch workflows, sort images by file size and process the largest first to catch memory issues early",
  ],

  // ─── Use Cases ─────────────────────────────────────────────────────
  useCases: [
    "E-commerce: Compressing product catalog images to reduce page load time and improve conversion rates",
    "Blogging: Optimizing featured images and inline photos to stay within hosting bandwidth limits",
    "Social media: Stripping EXIF location data from personal photos before uploading to public platforms",
    "Email marketing: Reducing inline image sizes to keep total email weight under 1 MB for deliverability",
    "Web development: Automating image optimization as part of a CI/CD build pipeline",
    "Photography: Creating web-resolution portfolio galleries from high-resolution masters",
  ],

  // ─── FAQs ──────────────────────────────────────────────────────────
  faqs: [
    // Existing
    {
      question: "Does stripping metadata reduce image resolution?",
      answer:
        "No. Metadata is only text data (camera type, location). Stripping it saves file bytes without changing image pixels.",
    },
    {
      question: "What is the best format for web graphics?",
      answer:
        "WebP or compressed JPEGs are standard. PNG is best for logos with transparency.",
    },
    // What
    {
      question: "What is lossy compression?",
      answer:
        "Lossy compression permanently removes data that humans cannot easily perceive. JPEG uses this approach — the decoded image is not bit-identical to the original.",
    },
    {
      question: "What is lossless compression?",
      answer:
        "Lossless compression encodes data more efficiently without removing any information. PNG DEFLATE is lossless — the decoded pixels are identical to the original.",
    },
    {
      question: "What is EXIF metadata?",
      answer:
        "EXIF (Exchangeable Image File Format) is a standard for storing camera settings, GPS coordinates, timestamps, and device information within image files.",
    },
    {
      question: "What quality setting should I use?",
      answer:
        "For JPEG, 80-85% offers the best balance. Below 70% introduces visible artifacts. Above 90% yields diminishing size savings.",
    },
    // Who
    {
      question: "Who needs image compression most?",
      answer:
        "Web developers, bloggers, e-commerce managers, and anyone publishing images online. Mobile-first sites benefit the most due to bandwidth constraints.",
    },
    // When
    {
      question: "When should I use PNG instead of JPEG?",
      answer:
        "Use PNG for images requiring transparency, sharp text overlays, screenshots, diagrams, or graphics with fewer than 256 colors.",
    },
    {
      question: "When does compression become visible?",
      answer:
        "JPEG artifacts become noticeable below quality 65-70% — blocky patterns appear, especially around sharp edges and text.",
    },
    // Where
    {
      question: "Where does compression happen in the browser?",
      answer:
        "The image is decoded onto an HTML Canvas, then re-encoded using canvas.toBlob() with the specified MIME type and quality parameter.",
    },
    // Why
    {
      question: "Why do images look fine on my screen but blurry on retina displays?",
      answer:
        "Retina screens have 2-3x pixel density. Serve images at 2x the CSS display width, then let the browser scale them down for sharp rendering.",
    },
    {
      question: "Why is my PNG file so much larger than the JPEG version?",
      answer:
        "PNG is lossless and stores every pixel exactly. JPEG discards imperceptible details. For photographs, JPEG is typically 5-10x smaller than PNG.",
    },
    // How
    {
      question: "How does JPEG compression work?",
      answer:
        "JPEG splits the image into 8×8 pixel blocks, applies Discrete Cosine Transform to convert spatial data to frequency data, then quantizes high-frequency components based on the quality setting.",
    },
    {
      question: "How much file size reduction can I expect?",
      answer:
        "Typical JPEG compression at 80% quality reduces file size by 60-80%. PNG optimization yields 10-30% savings depending on image complexity.",
    },
    {
      question: "How do I compress images in bulk?",
      answer:
        "Use a batch compressor that queues images and processes them sequentially or in parallel using Web Workers.",
    },
    // Can
    {
      question: "Can I compress an image without losing quality?",
      answer:
        "Yes, using lossless formats (PNG, lossless WebP). For JPEG, quality 90-95% is perceptually lossless but still reduces file size by 20-40%.",
    },
    {
      question: "Can compressed images be uncompressed back to original quality?",
      answer:
        "No. Lossy JPEG compression permanently discards data. Always keep an uncompressed master copy.",
    },
    {
      question: "Can I compress GIF files the same way?",
      answer:
        "GIFs use a different compression (LZW) and are palette-based. Use a dedicated GIF optimizer, or convert to WebP for animated content.",
    },
    // Should
    {
      question: "Should I compress images before uploading to social media?",
      answer:
        "Yes, primarily to strip EXIF location data. Social platforms re-compress uploads anyway, but stripping metadata protects your privacy.",
    },
    {
      question: "Should I use WebP instead of JPEG?",
      answer:
        "WebP offers 25-35% better compression at equivalent quality and supports transparency. Use it if your audience uses modern browsers (95%+ global support).",
    },
    // Is
    {
      question: "Is browser-based compression as good as Photoshop?",
      answer:
        "For standard web optimization, yes. Photoshop offers more granular control (chroma subsampling, progressive encoding), but browser tools handle 90% of use cases effectively.",
    },
    {
      question: "Is it safe to compress medical or legal images?",
      answer:
        "Use lossless compression only for images where accuracy is critical (medical scans, legal evidence). Lossy compression could remove diagnostically relevant details.",
    },
    // Does
    {
      question: "Does compression affect image dimensions?",
      answer:
        "No. Compression reduces file size by encoding pixel data more efficiently. Pixel dimensions remain unchanged unless you explicitly resize.",
    },
    {
      question: "Does the compressor work on mobile browsers?",
      answer:
        "Yes. The Canvas API works on all modern mobile browsers. Processing speed depends on device CPU and available memory.",
    },
    {
      question: "Does compressing a screenshot affect text readability?",
      answer:
        "JPEG compression can blur sharp text edges. For screenshots with text, use PNG or set JPEG quality to 90%+.",
    },
    // Additional
    {
      question: "What is chroma subsampling?",
      answer:
        "A technique where color information is stored at lower resolution than brightness. JPEG uses 4:2:0 subsampling by default, saving ~33% with minimal visible impact.",
    },
    {
      question: "What is progressive JPEG?",
      answer:
        "A JPEG encoding mode where the image loads in multiple passes from blurry to sharp, improving perceived performance on slow connections.",
    },
    {
      question: "How do I check if my images are already compressed?",
      answer:
        "Compare the file size to expected values: a 1920×1080 JPEG photo should be 200-500 KB at typical quality. If it's under that, it's likely already compressed.",
    },
    {
      question:
        "What is the maximum image size a browser can handle?",
      answer:
        "Most browsers limit Canvas to about 16,384 × 16,384 pixels (268 megapixels). Images exceeding this must be resized before processing.",
    },
    {
      question: "Can I set different quality levels for different images?",
      answer:
        "Yes. Process each image individually with its own quality slider setting, or use a batch tool that allows per-file quality overrides.",
    },
  ],

  // ─── Related Questions ─────────────────────────────────────────────
  relatedQuestions: [
    {
      question: "How do I convert PNG to JPG?",
      answer:
        "Use a browser-based converter that renders the PNG onto a Canvas and re-encodes it as JPEG, replacing transparency with a solid background color.",
    },
    {
      question: "What is the best image format for websites in 2025?",
      answer:
        "WebP for photographs and general images, SVG for icons and logos, PNG for images requiring transparency with sharp edges.",
    },
    {
      question: "How do I remove EXIF data from photos?",
      answer:
        "Use an image compressor or metadata stripper that re-encodes the image without the EXIF headers — or simply compress the image through the Canvas API.",
    },
    {
      question: "Does Google penalize uncompressed images?",
      answer:
        "Yes, indirectly. Uncompressed images slow page load times, worsening Core Web Vitals scores (LCP), which impacts search rankings.",
    },
    {
      question: "How do I compress images for email attachments?",
      answer:
        "Resize to 1200px wide and compress to JPEG quality 80%. This typically brings photos under 200 KB while maintaining readability.",
    },
    {
      question: "What is the difference between image compression and resizing?",
      answer:
        "Compression reduces file size by encoding pixels more efficiently (or discarding imperceptible data). Resizing changes the actual pixel dimensions of the image.",
    },
    {
      question: "Can I batch-optimize images for WordPress?",
      answer:
        "Yes, compress images before uploading, or use a WordPress plugin that optimizes on upload. Client-side tools let you process before the upload step.",
    },
    {
      question: "What is WebP and should I use it?",
      answer:
        "WebP is a modern image format by Google that supports both lossy and lossless compression with 25-35% better efficiency than JPEG/PNG. Use it for web delivery.",
    },
    {
      question: "How do I check image compression quality?",
      answer:
        "Compare side-by-side at 100% zoom. For automated checks, use SSIM (Structural Similarity Index) — values above 0.95 indicate perceptually identical results.",
    },
    {
      question: "Are there image formats better than WebP?",
      answer:
        "AVIF offers 20% better compression than WebP but has slower encoding and less browser support. JPEG XL is promising but not widely supported yet.",
    },
  ],

  // ─── Glossary ──────────────────────────────────────────────────────
  glossary: [
    {
      term: "JPEG (Joint Photographic Experts Group)",
      definition:
        "A lossy image compression standard optimized for continuous-tone photographs, using DCT-based frequency quantization.",
    },
    {
      term: "PNG (Portable Network Graphics)",
      definition:
        "A lossless raster image format supporting transparency (alpha channel) and DEFLATE compression.",
    },
    {
      term: "EXIF (Exchangeable Image File Format)",
      definition:
        "A metadata standard embedded in image files containing camera settings, GPS coordinates, timestamps, and device information.",
    },
    {
      term: "DCT (Discrete Cosine Transform)",
      definition:
        "A mathematical transformation used in JPEG compression to convert spatial pixel data into frequency coefficients for quantization.",
    },
    {
      term: "Quantization",
      definition:
        "The lossy step in JPEG compression where high-frequency DCT coefficients are rounded, reducing precision to decrease file size.",
    },
    {
      term: "Canvas API",
      definition:
        "A browser API for drawing and manipulating raster images in JavaScript. Used by compressors to decode, process, and re-encode images.",
    },
    {
      term: "WebP",
      definition:
        "A modern image format developed by Google supporting both lossy and lossless compression, with 25-35% better efficiency than JPEG.",
    },
    {
      term: "Chroma subsampling",
      definition:
        "A technique that encodes color information at lower resolution than luminance, exploiting human vision's lower sensitivity to color detail.",
    },
    {
      term: "LCP (Largest Contentful Paint)",
      definition:
        "A Core Web Vitals metric measuring how long it takes for the largest visible content element (often an image) to render on screen.",
    },
    {
      term: "Alpha channel",
      definition:
        "An additional data layer in image formats (PNG, WebP) that defines per-pixel transparency levels from fully opaque to fully transparent.",
    },
  ],

  // ─── Conclusion ────────────────────────────────────────────────────
  conclusion:
    "Image compression is essential for web performance, privacy, and bandwidth efficiency. By using a client-side compressor at 80-85% JPEG quality and stripping EXIF metadata, you achieve 50-80% file size reduction without visible quality loss and without exposing your photos to third-party servers.",

  // ─── Convenience fields ────────────────────────────────────────────
  relatedTools: ["image-compressor", "image-resizer", "image-cropper"],
  relatedGuides: ["how-to-convert-png-to-jpg", "how-to-merge-pdf"],
};
