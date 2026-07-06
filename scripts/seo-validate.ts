import { tools } from "../lib/tools";
import { categoriesConfig } from "../modules/categories/category.config";
import { hubsConfig } from "../modules/content/best";
import { guidesConfig } from "../modules/content/guides";

console.log("=========================================");
console.log("🛠️ RUNNING TOOLSATZERO BUILD QUALITY GATES");
console.log("=========================================");

const errors: string[] = [];
const warnings: string[] = [];

// Helper to push errors
function reportError(msg: string) {
  errors.push(msg);
}

// 1. Gather all slugs and check duplicates
const allSlugs = new Map<string, string>(); // slug -> type
const allCanonical = new Set<string>();
const allTitles = new Set<string>();
const allDescriptions = new Set<string>();

// Validate Tools
tools.forEach(t => {
  if (!t.isReady) return;
  
  // A. Check duplicate slugs
  if (allSlugs.has(t.slug)) {
    reportError(`Duplicate slug found: "${t.slug}" in Tool and ${allSlugs.get(t.slug)}`);
  }
  allSlugs.set(t.slug, "Tool");

  // B. Check category assignment
  if (!t.category) {
    reportError(`Tool "${t.slug}" is missing category assignment.`);
  }

  // C. Check keywords
  if (!t.keywords || t.keywords.length === 0) {
    reportError(`Tool "${t.slug}" has empty keywords list.`);
  }
});

// Validate Categories
categoriesConfig.forEach(c => {
  if (allSlugs.has(c.slug)) {
    reportError(`Duplicate slug found: "${c.slug}" in Category and ${allSlugs.get(c.slug)}`);
  }
  allSlugs.set(c.slug, "Category");

  if (!c.title || !c.seo.title || !c.seo.metaDescription) {
    reportError(`Category "${c.slug}" is missing required SEO titles/descriptions.`);
  }

  if (allTitles.has(c.seo.title)) {
    reportError(`Duplicate SEO Title detected: "${c.seo.title}" in Category config.`);
  }
  allTitles.add(c.seo.title);

  if (allDescriptions.has(c.seo.metaDescription)) {
    reportError(`Duplicate Meta Description detected: "${c.seo.metaDescription}" in Category config.`);
  }
  allDescriptions.add(c.seo.metaDescription);
});

// Validate Hubs
hubsConfig.forEach(h => {
  if (allSlugs.has(h.slug)) {
    reportError(`Duplicate slug found: "${h.slug}" in Hub and ${allSlugs.get(h.slug)}`);
  }
  allSlugs.set(h.slug, "Hub");

  if (!h.title || !h.seoTitle || !h.metaDescription) {
    reportError(`Hub "${h.slug}" is missing required SEO titles/descriptions.`);
  }

  if (allTitles.has(h.seoTitle)) {
    reportError(`Duplicate SEO Title detected: "${h.seoTitle}" in Hub config.`);
  }
  allTitles.add(h.seoTitle);

  if (allDescriptions.has(h.metaDescription)) {
    reportError(`Duplicate Meta Description detected: "${h.metaDescription}" in Hub config.`);
  }
  allDescriptions.add(h.metaDescription);

  if (!h.tools || h.tools.length === 0) {
    reportError(`Hub "${h.slug}" has no tools comparison list.`);
  }
});

// Validate Guides
guidesConfig.forEach(g => {
  if (allSlugs.has(g.slug)) {
    reportError(`Duplicate slug found: "${g.slug}" in Guide and ${allSlugs.get(g.slug)}`);
  }
  allSlugs.set(g.slug, "Guide");

  if (!g.title || !g.seoTitle || !g.metaDescription) {
    reportError(`Guide "${g.slug}" is missing required SEO titles/descriptions.`);
  }

  if (allTitles.has(g.seoTitle)) {
    reportError(`Duplicate SEO Title detected: "${g.seoTitle}" in Guide config.`);
  }
  allTitles.add(g.seoTitle);

  if (allDescriptions.has(g.metaDescription)) {
    reportError(`Duplicate Meta Description detected: "${g.metaDescription}" in Guide config.`);
  }
  allDescriptions.add(g.metaDescription);

  if (!g.steps || g.steps.length === 0) {
    reportError(`Guide "${g.slug}" has no step instructions list.`);
  }

  // Check related tools links
  g.relatedTools.forEach(toolSlug => {
    if (!tools.some(t => t.slug === toolSlug && t.isReady)) {
      reportError(`Guide "${g.slug}" contains broken related tool reference: "${toolSlug}"`);
    }
  });

  // Check related guides links
  g.relatedGuides.forEach(guideSlug => {
    if (!guidesConfig.some(guide => guide.slug === guideSlug)) {
      reportError(`Guide "${g.slug}" contains broken related guide reference: "${guideSlug}"`);
    }
  });
});

console.log(`Scan completed. ${allSlugs.size} total slugs scanned.`);

if (errors.length > 0) {
  console.error("\n❌ GATES FAILED: Critical SEO or Validation Errors detected:");
  errors.forEach(err => console.error(`  - ${err}`));
  console.log("=========================================");
  process.exit(1);
} else {
  console.log("\n✅ GATES PASSED: Zero critical SEO errors found.");
  console.log("=========================================");
  process.exit(0);
}
