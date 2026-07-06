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

export const pngVsJpg: ComparisonContent = {
  id: "comparison.png-vs-jpg",
  type: "comparison",
  slug: "png-vs-jpg",
  title: "PNG vs JPG: Which Image Format Should You Use?",
  description:
    "A detailed technical comparison of PNG and JPG (JPEG) image formats covering compression, quality, transparency, file size, and best use cases for web, print, and photography.",
  seoTitle: "PNG vs JPG (JPEG) — Complete Format Comparison Guide | ToolsAtZero",
  metaDescription:
    "PNG vs JPG explained: compression type, transparency support, file size, quality, and when to use each format. Data-driven comparison with real-world benchmarks.",
  keywords: [
    "png vs jpg",
    "png vs jpeg",
    "jpg vs png",
    "png or jpg",
    "jpeg vs png difference",
    "png vs jpg quality",
    "png vs jpg file size",
    "when to use png vs jpg",
    "png vs jpg for web",
    "png vs jpg transparency",
  ],
  entityIds: ["png", "jpeg", "webp", "avif"],
  status: "published",

  meta: defaultMeta({
    topicId: "image.png-vs-jpg",
    difficulty: "beginner",
    readingTimeMinutes: 8,
    targetAudience: ["web developers", "designers", "photographers", "content creators"],
    searchIntents: ["comparison", "informational", "decision-making"],
    aliases: ["png vs jpeg", "jpg vs png", "jpeg vs png"],
  }),

  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 9, expectedTraffic: "very-high" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  relationships: defaultRelationships({
    parents: ["category.image-formats"],
    siblings: [
      "comparison.webp-vs-png",
    ],
    relatedGuides: ["guide.compress-images", "guide.convert-images"],
    relatedComparisons: ["comparison.webp-vs-png"],
    relatedCategories: ["category.image-tools"],
  }),

  recommendations: defaultRecommendations({
    beginner: ["guide.compress-images"],
    next: ["comparison.webp-vs-png"],
    popular: ["comparison.csv-vs-excel", "comparison.pdf-vs-docx"],
  }),

  formatA: "PNG",
  formatB: "JPG (JPEG)",

  similarities: [
    "Both are raster (bitmap) image formats that store pixel data on a grid.",
    "Both are universally supported across all modern web browsers, operating systems, and image editors.",
    "Both can store images at various resolutions and color depths up to 24-bit true color (16.7 million colors).",
    "Both can be embedded in HTML, CSS, PDF documents, and office file formats.",
    "Both support progressive/interlaced rendering for faster perceived loading.",
    "Both are standardized by international bodies (W3C recommends both for web use).",
    "Both can be optimized further with metadata stripping and specialized compressors.",
  ],

  differences: [
    "Compression: PNG uses lossless DEFLATE compression; JPG uses lossy DCT (Discrete Cosine Transform) compression that discards visual data.",
    "Transparency: PNG supports full alpha-channel transparency (256 levels per pixel); JPG has no transparency support.",
    "File size for photos: JPG produces files 5–10× smaller than PNG for photographic content at perceptually similar quality.",
    "File size for graphics: PNG can be smaller than JPG for flat-color graphics, logos, and screenshots with large uniform regions.",
    "Color depth: PNG supports 8-bit palette, 24-bit truecolor, and 48-bit deep color; JPG is limited to 8-bit-per-channel (24-bit total).",
    "Artifacts: JPG introduces visible blocking artifacts at low quality settings; PNG never introduces compression artifacts.",
    "Editing: PNG survives multiple save cycles without degradation; each JPG re-save compounds quality loss (generation loss).",
    "Animation: Neither format natively supports animation (APNG exists but has limited support; use GIF or WebP instead).",
    "Metadata: Both support EXIF and XMP, but JPG files more commonly carry camera EXIF data from photography workflows.",
    "Bit-exact reproduction: PNG guarantees pixel-perfect round-trip fidelity; JPG does not.",
    "Compression speed: PNG encoding is generally faster for small images; JPG encoding is faster at high compression ratios on large photos.",
    "HDR: PNG supports 16-bit-per-channel for scientific/medical imaging; JPG is restricted to 8-bit-per-channel.",
  ],

  prosA: [
    "Lossless compression preserves every pixel exactly — ideal for graphics, text, screenshots, and technical diagrams.",
    "Full alpha-channel transparency enables smooth overlays, rounded corners, and complex compositing.",
    "No generation loss: re-editing and re-saving the same file causes zero quality degradation.",
    "Superior for flat-color content: logos, icons, and UI elements compress efficiently and remain crisp.",
    "Supports 48-bit deep color and 16-bit grayscale for scientific, medical, and HDR imaging workflows.",
    "Palette mode (PNG-8) produces tiny files for images with ≤256 colors.",
  ],

  prosB: [
    "Dramatically smaller file sizes for photographs — typically 5–10× smaller than equivalent PNG at visually acceptable quality.",
    "Adjustable quality slider lets you trade file size against visual fidelity precisely.",
    "Universal camera output format: virtually every digital camera and smartphone shoots JPEG natively.",
    "Faster page loads and lower bandwidth costs for photo-heavy websites.",
    "Mature ecosystem of editing tools, batch processors, and CDN optimizers.",
    "Progressive JPEG enables quick low-resolution preview during download.",
  ],

  consA: [
    "Extremely large files for photographic content — a 12 MP photo can be 15–30 MB as PNG vs 2–4 MB as JPG.",
    "Slower page loads when used for photos on the web due to larger payloads.",
    "No native lossy mode means you cannot trade quality for file size (without converting to another format).",
    "Overkill for simple photographs where lossy compression is visually indistinguishable.",
  ],

  consB: [
    "Lossy compression permanently discards image data — original quality cannot be recovered from a JPG file.",
    "No transparency support — any transparent area is flattened to a solid background color (typically white).",
    "Visible blocking artifacts and color banding at quality settings below ~70%.",
    "Generation loss: repeatedly opening, editing, and saving a JPG file compounds quality degradation.",
    "Poor choice for text, line art, and screenshots — sharp edges produce noticeable ringing artifacts.",
  ],

  performance:
    "For photographic content, JPG is the clear performance winner: a 4000×3000 photograph saved at quality 85 produces a ~1.5 MB JPG versus a ~12 MB PNG — an 8× difference that directly impacts page load speed, bandwidth costs, and Core Web Vitals scores. For non-photographic content like screenshots, diagrams, or logos, PNG often produces comparable or even smaller files because its DEFLATE algorithm exploits large uniform color regions more efficiently than DCT-based compression. When maximum performance matters, consider WebP or AVIF which outperform both formats.",

  compatibility:
    "Both PNG and JPG enjoy near-universal compatibility. Every modern browser (Chrome, Firefox, Safari, Edge), operating system (Windows, macOS, Linux, iOS, Android), email client, and image editor supports both formats natively. JPG has a slight edge in legacy systems and embedded devices due to its simpler decoding requirements. PNG's transparency support makes it the required choice when overlaying images on variable backgrounds in CSS or compositing workflows. For email newsletters, JPG remains safer because some older email renderers mishandle PNG transparency.",

  seoImpact:
    "Google's Largest Contentful Paint (LCP) metric directly penalizes oversized images. Using JPG instead of PNG for hero photos can improve LCP by 1–3 seconds on mobile connections. For icons and logos, properly optimized PNG files are small enough to have negligible SEO impact.",

  bestUseCases:
    "Use PNG for: logos, icons, UI elements, screenshots, technical diagrams, images requiring transparency, print-ready graphics with text, and any image that will be repeatedly edited. Use JPG for: photographs, hero images, product photos, social media images, email newsletter banners, and any photographic content where file size matters more than pixel-perfect accuracy. For web performance-critical scenarios, consider converting both to WebP or AVIF with PNG/JPG fallbacks.",

  recommendation:
    "The choice between PNG and JPG is not about which format is 'better' — it is about matching the format to the content type. Use JPG for photographs and photographic content where lossy compression is visually transparent. Use PNG for graphics, text-heavy images, screenshots, and anything requiring transparency. If you are building for the modern web and can serve next-gen formats, use WebP as your primary format with JPG/PNG fallbacks for maximum compatibility and performance.",

  faqs: [
    { question: "Is PNG better quality than JPG?", answer: "PNG preserves every pixel exactly (lossless), so it is technically higher fidelity. However, for photographs, the quality difference at JPG quality 85+ is virtually invisible to the human eye, while the file size difference is enormous." },
    { question: "Why is my PNG file so much larger than JPG?", answer: "PNG uses lossless compression that preserves all pixel data. Photographs contain complex color variations that lossless compression cannot reduce efficiently. JPG's lossy DCT compression discards imperceptible details, achieving 5–10× smaller files." },
    { question: "Can I convert PNG to JPG without losing quality?", answer: "Converting PNG to JPG always introduces some quality loss because JPG uses lossy compression. However, at quality settings of 90–95, the loss is negligible for most purposes. Note that any transparency will be lost." },
    { question: "Does converting JPG to PNG improve quality?", answer: "No. Converting JPG to PNG preserves the current state of the image but cannot restore data already discarded by JPG compression. The file will actually get larger with no quality improvement." },
    { question: "Which format is better for web images?", answer: "JPG for photographs, PNG for graphics with transparency or sharp edges. For maximum performance, use WebP or AVIF with fallbacks." },
    { question: "Does PNG support animation?", answer: "APNG (Animated PNG) exists and is supported in all modern browsers, but it is less widely used than GIF or WebP for animation. Standard PNG files are static single-frame images." },
    { question: "Can JPG have a transparent background?", answer: "No. JPG does not support transparency. Any transparent areas will be filled with a solid color (usually white) when saving as JPG. Use PNG or WebP for transparency." },
    { question: "Which format should I use for logos?", answer: "PNG. Logos typically have flat colors, sharp edges, and often require transparency — all strengths of PNG. JPG would introduce artifacts around sharp text and graphic edges." },
    { question: "Is JPEG the same as JPG?", answer: "Yes. JPG and JPEG are identical formats. The three-letter extension .jpg originated from Windows's historical three-character file extension limit. The format itself is officially called JPEG." },
    { question: "Which format has better compression?", answer: "It depends on the content. JPG achieves much smaller files for photographs (lossy). PNG achieves comparable or better compression for flat-color graphics (lossless). They use fundamentally different compression strategies." },
    { question: "Should I use PNG for social media?", answer: "Most social media platforms re-compress uploaded images to JPG regardless of the original format. Upload in PNG only if the platform preserves it (rare) or if the image has transparency that you need preserved." },
    { question: "What is generation loss in JPG?", answer: "Each time a JPG file is opened, edited, and re-saved, the lossy compression is applied again, compounding quality degradation. After 10+ re-saves at quality 80, visible artifacts accumulate. Always edit from the original source file." },
    { question: "Can PNG files contain EXIF metadata?", answer: "Yes, PNG supports EXIF metadata in tEXt/iTXt chunks, but many camera and editing tools only write EXIF to JPG files. PNG metadata support varies by software." },
    { question: "Which format is better for printing?", answer: "For professional printing, neither is ideal — use TIFF or PDF. Between the two, PNG is preferred for print because it preserves full quality. JPG compression artifacts may become visible in large-format prints." },
    { question: "Does Google prefer JPG or PNG?", answer: "Google indexes both equally. However, Google PageSpeed Insights recommends using appropriately compressed images. For photos, smaller JPG files improve page speed metrics; for graphics, optimized PNG is fine." },
    { question: "What is PNG-8 vs PNG-24?", answer: "PNG-8 uses a 256-color palette (like GIF) and produces very small files. PNG-24 uses 24-bit truecolor (16.7M colors). PNG-8 is ideal for simple graphics; PNG-24 for complex images requiring full color." },
    { question: "Can I reduce PNG file size without losing quality?", answer: "Yes. Tools like pngquant (lossy palette reduction), OptiPNG, and ZopfliPNG can significantly reduce PNG file size. Palette reduction to PNG-8 is lossy but often visually imperceptible for graphics." },
    { question: "Which format loads faster on mobile?", answer: "JPG loads faster for photographic content due to dramatically smaller file sizes. For simple icons and small graphics, optimized PNG files are small enough that the difference is negligible." },
    { question: "Should I use PNG or JPG for email?", answer: "JPG for photos in email. Some older email clients mishandle PNG transparency, and JPG's smaller file size helps avoid email size limits. Use PNG only for logos or graphics where transparency is critical." },
    { question: "What replaced PNG and JPG?", answer: "WebP (by Google) and AVIF (by Alliance for Open Media) are modern successors offering better compression for both lossy and lossless modes. Both support transparency. Browser support for WebP is now universal; AVIF support is growing rapidly." },
  ],

  glossary: [
    { term: "Lossless Compression", definition: "A compression method that reduces file size without discarding any data. The original image can be perfectly reconstructed from the compressed file. PNG uses lossless DEFLATE compression." },
    { term: "Lossy Compression", definition: "A compression method that permanently removes data deemed less important to reduce file size more aggressively. JPG uses lossy DCT-based compression." },
    { term: "DCT (Discrete Cosine Transform)", definition: "The mathematical transform at the core of JPEG compression. It converts spatial pixel data into frequency components, allowing the encoder to discard high-frequency details that are less visible to the human eye." },
    { term: "Alpha Channel", definition: "An additional data channel in an image that stores transparency information for each pixel, with values from fully transparent (0) to fully opaque (255). Supported by PNG but not JPG." },
    { term: "Generation Loss", definition: "Progressive quality degradation that occurs when a lossy-compressed file (like JPG) is decoded and re-encoded multiple times. Each cycle introduces additional compression artifacts." },
    { term: "DEFLATE", definition: "The lossless compression algorithm used by PNG, combining LZ77 dictionary matching with Huffman coding. Also used in ZIP files and gzip." },
    { term: "Color Depth", definition: "The number of bits used to represent each pixel's color. 24-bit color (8 bits per RGB channel) provides 16.7 million colors. PNG supports up to 48-bit; JPG supports up to 24-bit." },
    { term: "EXIF (Exchangeable Image File Format)", definition: "A metadata standard embedded in image files that stores camera settings, GPS coordinates, timestamps, and other shooting information. Common in JPG files from digital cameras." },
    { term: "Raster Image", definition: "An image composed of a fixed grid of pixels, each with a specific color value. Both PNG and JPG are raster formats, as opposed to vector formats like SVG." },
    { term: "Chroma Subsampling", definition: "A JPEG compression technique that stores color information at lower resolution than brightness information, exploiting the human eye's lower sensitivity to color detail. Common settings: 4:4:4, 4:2:2, 4:2:0." },
    { term: "Progressive JPEG", definition: "A JPEG encoding mode where the image loads in multiple passes, displaying a low-quality version first that refines progressively. Improves perceived loading speed." },
    { term: "Interlaced PNG", definition: "A PNG encoding mode (Adam7 interlacing) where the image loads in 7 passes, displaying a rough preview before full resolution. Increases file size slightly but improves perceived loading." },
  ],

  aiBlocks: defaultAIBlocks({
    aiSummary:
      "PNG and JPG serve different purposes: PNG is a lossless format ideal for graphics, transparency, and screenshots, while JPG is a lossy format optimized for photographs with dramatically smaller file sizes. Choose based on content type, not personal preference.",
    keyTakeaways: [
      "Use JPG for photographs — 5–10× smaller files with negligible visible quality loss at quality 85+.",
      "Use PNG for graphics, logos, screenshots, and any image needing transparency.",
      "JPG has no transparency support; PNG has full alpha-channel transparency.",
      "Never repeatedly edit and re-save JPG files — generation loss compounds.",
      "For modern web projects, consider WebP or AVIF as successors to both formats.",
    ],
    quickFacts: [
      "PNG was created in 1996 as a patent-free alternative to GIF.",
      "JPEG was standardized in 1992 and remains the world's most widely used image format.",
      "A typical 12 MP photo: ~2 MB as JPG (quality 85) vs ~15 MB as PNG.",
      "JPG and JPEG are the same format — the .jpg extension exists due to Windows' historical 3-character limit.",
      "Google's WebP format offers 25–35% better compression than JPG at equivalent quality.",
    ],
    commonMisconceptions: [
      "\"PNG is always better quality than JPG\" — For photographs at JPG quality 85+, the difference is imperceptible.",
      "\"Converting JPG to PNG improves quality\" — It only increases file size; lost data cannot be recovered.",
      "\"JPG supports transparency\" — It does not. Any transparency is flattened on save.",
    ],
    didYouKnow: [
      "The PNG format was developed partly because of patent issues with GIF's LZW compression algorithm.",
      "A single uncompressed 4K (3840×2160) image occupies ~24 MB of raw pixel data.",
    ],
    expertTips: [
      "Use JPG quality 82–85 for web photos — below 80, artifacts become visible; above 90, file size increases dramatically with minimal visual benefit.",
      "Enable progressive JPEG for hero images — users perceive the page as loading faster even though total bytes are similar.",
      "For PNG optimization, run images through pngquant (lossy palette) + zopflipng (lossless recompression) for maximum savings.",
    ],
  }),
};
