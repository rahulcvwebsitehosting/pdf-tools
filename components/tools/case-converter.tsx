'use client';

import { useState, useCallback, useMemo } from 'react';
import { TrustBadge } from '@/components/trust-badge';

// ── Helper: split text into word tokens ──────────────────────────────────
// Handles camelCase boundaries, spaces, hyphens, underscores, and mixed separators.
function splitIntoWords(text: string): string[] {
  // 1. Insert a separator before uppercase letters that follow lowercase letters (camelCase boundary)
  //    e.g. "camelCase" → "camel Case"
  let normalized = text.replace(/([a-z])([A-Z])/g, '$1 $2');

  // 2. Insert a separator before uppercase letters followed by lowercase letters after a sequence of uppercase
  //    e.g. "XMLParser" → "XML Parser"
  normalized = normalized.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  // 3. Replace common separators (hyphens, underscores, dots) with spaces
  normalized = normalized.replace(/[-_.\s]+/g, ' ');

  // 4. Trim and split by spaces, filter empty strings
  return normalized.trim().split(/\s+/).filter(Boolean);
}

// ── Conversion functions ─────────────────────────────────────────────────

function toUpperCase(text: string): string {
  return text.toUpperCase();
}

function toLowerCase(text: string): string {
  return text.toLowerCase();
}

function toTitleCase(text: string): string {
  return text.replace(
    /\b\w/g,
    (char) => char.toUpperCase()
  );
}

function toSentenceCase(text: string): string {
  if (!text) return '';
  // Split by sentence boundaries (., !, ?)
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
}

function toCamelCase(text: string): string {
  const words = splitIntoWords(text);
  if (words.length === 0) return '';
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function toPascalCase(text: string): string {
  const words = splitIntoWords(text);
  if (words.length === 0) return '';
  return words
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function toSnakeCase(text: string): string {
  const words = splitIntoWords(text);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('_');
}

function toKebabCase(text: string): string {
  const words = splitIntoWords(text);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('-');
}

// ── Types ────────────────────────────────────────────────────────────────

type CaseType =
  | 'UPPERCASE'
  | 'lowercase'
  | 'Title Case'
  | 'Sentence case'
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case';

const CASE_OPTIONS: { label: CaseType; fn: (t: string) => string }[] = [
  { label: 'UPPERCASE', fn: toUpperCase },
  { label: 'lowercase', fn: toLowerCase },
  { label: 'Title Case', fn: toTitleCase },
  { label: 'Sentence case', fn: toSentenceCase },
  { label: 'camelCase', fn: toCamelCase },
  { label: 'PascalCase', fn: toPascalCase },
  { label: 'snake_case', fn: toSnakeCase },
  { label: 'kebab-case', fn: toKebabCase },
];

// ── Component ────────────────────────────────────────────────────────────

export default function CaseConverterTool() {
  const [input, setInput] = useState('');
  const [activeCase, setActiveCase] = useState<CaseType>('UPPERCASE');
  const [copied, setCopied] = useState(false);

  // Derive output in real-time
  const output = useMemo(() => {
    if (!input) return '';
    const option = CASE_OPTIONS.find((o) => o.label === activeCase);
    return option ? option.fn(input) : input;
  }, [input, activeCase]);

  // Stats
  const charCount = input.length;
  const wordCount = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    setCopied(false);
  }, []);

  return (
    <section className="space-y-6">
      {/* Trust Badge */}
      <TrustBadge />

      {/* Input textarea */}
      <div className="space-y-2">
        <label
          htmlFor="case-input"
          className="font-mono-nav block text-xs text-foreground"
        >
          Input Text
        </label>
        <textarea
          id="case-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="editorial-textarea w-full min-h-[160px]"
        />

        {/* Character & word count */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            {charCount} {charCount === 1 ? 'character' : 'characters'}
          </span>
          <span>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        </div>
      </div>

      {/* Conversion buttons */}
      <div className="space-y-2">
        <label className="font-mono-nav block text-xs text-foreground">
          Convert To
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CASE_OPTIONS.map((option) => {
            const isActive = activeCase === option.label;
            return (
              <button
                key={option.label}
                onClick={() => setActiveCase(option.label)}
                className={`px-4 py-2.5 font-medium text-sm transition-colors border border-border ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-background text-foreground hover:bg-muted'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Output textarea */}
      <div className="space-y-2">
        <label
          htmlFor="case-output"
          className="font-mono-nav block text-xs text-foreground"
        >
          Output
        </label>
        <textarea
          id="case-output"
          value={output}
          readOnly
          placeholder="Converted text will appear here..."
          className="editorial-textarea w-full min-h-[160px] cursor-default"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          disabled={!output}
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy Output
            </>
          )}
        </button>

        <button
          onClick={handleClear}
          disabled={!input}
          className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          Clear
        </button>
      </div>
    </section>
  );
}
