'use client';

import { useState, useCallback } from 'react';
import { TrustBadge } from '@/components/trust-badge';

const SAMPLE_JSON = `{
  "name": "PDF Tools",
  "version": "1.0.0",
  "description": "Free online developer tools",
  "features": [
    "JSON Formatter",
    "Base64 Encoder",
    "Case Converter"
  ],
  "config": {
    "clientSide": true,
    "serverUploads": false,
    "maxFileSize": null,
    "supportedBrowsers": ["Chrome", "Firefox", "Safari", "Edge"]
  },
  "stats": {
    "tools": 12,
    "users": 50000,
    "uptime": 99.9
  },
  "isOpenSource": false,
  "license": "MIT"
}`;

function highlightJson(json: string): string {
  return json.replace(
    /("(?:\\.|[^"\\])*")\s*:/g,
    '<span class="json-key">$1</span>:'
  ).replace(
    /:\s*("(?:\\.|[^"\\])*")/g,
    (match, value) => `: <span class="json-string">${value}</span>`
  ).replace(
    /:\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    ': <span class="json-number">$1</span>'
  ).replace(
    /:\s*(true|false)/g,
    ': <span class="json-boolean">$1</span>'
  ).replace(
    /:\s*(null)/g,
    ': <span class="json-null">$1</span>'
  ).replace(
    /([\[\]{}])/g,
    '<span class="json-bracket">$1</span>'
  ).replace(
    /(?<=[\[,])\s*("(?:\\.|[^"\\])*")(?=\s*[,\]])/g,
    (match, str) => match.replace(str, `<span class="json-string">${str}</span>`)
  );
}

function getErrorPosition(error: string): { line?: number; position?: number } {
  const posMatch = error.match(/position\s+(\d+)/i);
  const lineMatch = error.match(/line\s+(\d+)/i);
  const colMatch = error.match(/column\s+(\d+)/i);

  return {
    line: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
    position: posMatch ? parseInt(posMatch[1], 10) : colMatch ? parseInt(colMatch[1], 10) : undefined,
  };
}

export function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [highlightedOutput, setHighlightedOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const clearState = useCallback(() => {
    setOutput('');
    setHighlightedOutput('');
    setError('');
    setCopied(false);
  }, []);

  const handleFormat = useCallback(() => {
    clearState();
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setHighlightedOutput(highlightJson(formatted));
      setActiveAction('format');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      const { line, position } = getErrorPosition(msg);
      let detail = msg;
      if (line) detail += ` (Line ${line})`;
      else if (position) detail += ` (Position ${position})`;
      setError(detail);
    }
  }, [input, clearState]);

  const handleMinify = useCallback(() => {
    clearState();
    if (!input.trim()) {
      setError('Please enter some JSON to minify.');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setHighlightedOutput(highlightJson(minified));
      setActiveAction('minify');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      const { line, position } = getErrorPosition(msg);
      let detail = msg;
      if (line) detail += ` (Line ${line})`;
      else if (position) detail += ` (Position ${position})`;
      setError(detail);
    }
  }, [input, clearState]);

  const handleValidate = useCallback(() => {
    clearState();
    if (!input.trim()) {
      setError('Please enter some JSON to validate.');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setHighlightedOutput(highlightJson(formatted));
      setActiveAction('validate');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      const { line, position } = getErrorPosition(msg);
      let detail = `Validation Error: ${msg}`;
      if (line) detail += ` (Line ${line})`;
      else if (position) detail += ` (Position ${position})`;
      setError(detail);
    }
  }, [input, clearState]);

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
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
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
    clearState();
    setActiveAction(null);
  }, [clearState]);

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
    clearState();
  }, [clearState]);

  return (
    <section className="space-y-6">
      {/* Trust Badge */}
      <TrustBadge />

      {/* Buttons Row */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleFormat}
          className="btn-primary"
        >
          Format
        </button>
        <button
          onClick={handleMinify}
          className="btn-secondary"
        >
          Minify
        </button>
        <button
          onClick={handleValidate}
          className="btn-secondary"
        >
          Validate
        </button>
        <button
          onClick={handleCopy}
          disabled={!output}
          className="btn-secondary"
        >
          {copied ? '✓ Copied!' : 'Copy Output'}
        </button>
        <button
          onClick={handleClear}
          className="btn-secondary"
        >
          Clear
        </button>
        <button
          onClick={handleLoadSample}
          className="btn-secondary ml-auto"
        >
          Load Sample
        </button>
      </div>

      {/* Side-by-side Panels */}
      <div className="editorial-border grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Input Panel */}
        <div className="lg:editorial-border-r">
          <label
            htmlFor="json-input"
            className="font-mono-nav block px-4 py-3 editorial-border-b text-muted-foreground"
          >
            Input JSON
          </label>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) clearState();
            }}
            placeholder='Paste your JSON here, e.g. {"key": "value"}'
            spellCheck={false}
            className="editorial-textarea min-h-[360px] border-0 focus:ring-0"
          />
        </div>

        {/* Output Panel */}
        <div>
          <div className="flex items-center justify-between px-4 py-3 editorial-border-b">
            <label className="font-mono-nav text-muted-foreground">
              Output
            </label>
            {activeAction && !error && output && (
              <span className="neon-badge px-2.5 py-1 text-xs">
                {activeAction === 'format' && 'Formatted'}
                {activeAction === 'minify' && 'Minified'}
                {activeAction === 'validate' && '✓ Valid JSON'}
              </span>
            )}
          </div>

          {error ? (
            <div className="min-h-[360px] p-4 bg-background border-destructive flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-destructive shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <div className="space-y-1">
                <p className="text-destructive font-semibold text-sm">Invalid JSON</p>
                <p className="text-destructive text-sm font-mono">{error}</p>
              </div>
            </div>
          ) : highlightedOutput ? (
            <pre
              className="editorial-panel min-h-[360px] max-h-[600px] overflow-auto p-4 border-0 text-sm font-mono leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedOutput }}
            />
          ) : (
            <div className="min-h-[360px] p-4 bg-background flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                Formatted output will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
