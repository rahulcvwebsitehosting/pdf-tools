/* ═══════════════════════════════════════════════════════════════════════════
 * Learning Paths — Ordered content chains by difficulty
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { LearningPath } from "./schema";

export const learningPaths: LearningPath[] = [
  {
    id: "pdf-fundamentals",
    title: "PDF Fundamentals",
    description:
      "Master essential PDF operations from merging to security. Start with basic file combination and progress through splitting, compression, metadata editing, and encryption.",
    difficulty: "beginner",
    estimatedMinutes: 45,
    steps: [
      "guide.merge-pdf",
      "guide.compress-pdf",
    ],
  },
  {
    id: "image-optimization",
    title: "Image Optimization for the Web",
    description:
      "Learn to compress, convert, and optimize images for fast page loads. Covers format selection, lossy vs lossless compression, and metadata management.",
    difficulty: "beginner",
    estimatedMinutes: 30,
    steps: [
      "guide.compress-images",
      "guide.convert-png-to-jpg",
    ],
  },
  {
    id: "financial-calculators",
    title: "Financial Calculator Mastery",
    description:
      "Understand EMI formulas, loan amortization, and interest calculations. Build confidence with financial planning tools.",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    steps: [
      "guide.calculate-emi",
    ],
  },
  {
    id: "developer-data-tools",
    title: "Developer Data Tools",
    description:
      "Format, validate, and transform structured data. Covers JSON, XML, CSV, and API development workflows.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      "guide.json-formatter",
    ],
  },
];

export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((lp) => lp.id === id);
}

export function getLearningPathsByDifficulty(
  difficulty: LearningPath["difficulty"]
): LearningPath[] {
  return learningPaths.filter((lp) => lp.difficulty === difficulty);
}
