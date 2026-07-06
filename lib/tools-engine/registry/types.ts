export interface ToolInput {
  name: string;
  label: string;
  type: "number" | "select" | "text" | "date" | "boolean";
  defaultValue: any;
  placeholder?: string;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  helpText?: string;
}

export interface ToolOutput {
  name: string;
  label: string;
  type: "number" | "text" | "percentage" | "currency" | "duration" | "boolean";
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkedExample {
  expression: string;
  steps: string[];
  result: string;
}

export interface FormulaDetails {
  equation: string;
  explanation: string;
  workedExample: WorkedExample;
}

export interface AEOMetadata {
  quickAnswer: string;
  aiSummary: string;
  commonMistakes: string[];
  keyTakeaways: string[];
  searchIntent: string;
  entities: string[];
  semanticTopics: string[];
  synonyms: string[];
}

export interface GEOMetadata {
  regionalVariations?: string;
}

export interface ExampleCase {
  title: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
}

export interface ToolRegistryConfig {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  category: string;
  icon: string; // Lucide icon name
  version: number;
  status: "stable" | "beta" | "deprecated";
  featured: boolean;
  searchWeight: number;
  searchIntent: string;
  difficulty: "easy" | "medium" | "hard";
  priority: number;
  formula: FormulaDetails;
  inputs: ToolInput[];
  outputs: ToolOutput[];
  faq: FAQItem[];
  aeo: AEOMetadata;
  geo: GEOMetadata;
  examples: ExampleCase[];
  relatedTools: string[];
}
