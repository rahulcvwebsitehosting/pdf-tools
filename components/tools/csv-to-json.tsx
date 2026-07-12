"use client";

import { useState, useEffect, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";
import { FileSpreadsheet, Loader2, Copy, Download, RefreshCw, AlertTriangle, Check } from "lucide-react";

export default function CsvToJsonTool() {
  const [csvInput, setCsvInput] = useState<string>(
    `id,name,role,department,active\n1,Alice Smith,Senior Architect,Engineering,true\n2,Bob Jones,Growth Marketer,Marketing,false\n3,Charlie Brown,Systems Engineer,Operations,true`
  );
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [minify, setMinify] = useState<boolean>(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load user settings from localStorage
  useEffect(() => {
    const savedDelimiter = localStorage.getItem("csv_delimiter");
    const savedHasHeader = localStorage.getItem("csv_has_header");
    const savedMinify = localStorage.getItem("csv_minify");

    if (savedDelimiter) setDelimiter(savedDelimiter);
    if (savedHasHeader) setHasHeader(savedHasHeader === "true");
    if (savedMinify) setMinify(savedMinify === "true");
  }, []);

  // Run parser on load/input change
  useEffect(() => {
    handleConvert();
  }, [csvInput, delimiter, hasHeader, minify]);

  const saveSetting = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      setError("Please upload a valid CSV file (.csv).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        setCsvInput(text);
      }
    };
    reader.onerror = () => {
      setError("Failed to read CSV file.");
    };
    reader.readAsText(file);
  };

  const handleConvert = () => {
    if (!csvInput.trim()) {
      setJsonOutput("");
      setError(null);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const parsed = parseCSV(csvInput, delimiter, hasHeader);
      
      const formatted = minify 
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);

      setJsonOutput(formatted);
    } catch (err: any) {
      console.error(err);
      setError("Failed to parse CSV. Please verify delimiter settings and quotes formatting.");
      setJsonOutput("");
    } finally {
      setIsProcessing(false);
    }
  };

  // Custom CSV parser handling escaped quotes and newlines inside fields
  const parseCSV = (text: string, delim: string, useHeaders: boolean) => {
    const lines: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let value = "";

    const cleanText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    for (let i = 0; i < cleanText.length; i++) {
      const char = cleanText[i];
      const nextChar = cleanText[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          value += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delim && !inQuotes) {
        row.push(value);
        value = "";
      } else if (char === "\n" && !inQuotes) {
        row.push(value);
        lines.push(row);
        row = [];
        value = "";
      } else {
        value += char;
      }
    }

    // Handle last row if no trailing newline
    if (value || row.length > 0) {
      row.push(value);
      lines.push(row);
    }

    const cleanLines = lines.filter((r) => r.length > 0 && (r.length > 1 || r[0] !== ""));

    if (cleanLines.length === 0) return [];

    if (useHeaders) {
      const headers = cleanLines[0].map((h) => h.trim());
      const dataRows = cleanLines.slice(1);
      
      return dataRows.map((dataRow) => {
        const item: Record<string, any> = {};
        headers.forEach((header, index) => {
          const val = dataRow[index] !== undefined ? dataRow[index] : "";
          // Auto-convert numbers/booleans for richer JSON conversion
          if (val.toLowerCase() === "true") {
            item[header || `col_${index}`] = true;
          } else if (val.toLowerCase() === "false") {
            item[header || `col_${index}`] = false;
          } else if (val === "null") {
            item[header || `col_${index}`] = null;
          } else if (!isNaN(Number(val)) && val.trim() !== "") {
            item[header || `col_${index}`] = Number(val);
          } else {
            item[header || `col_${index}`] = val;
          }
        });
        return item;
      });
    }

    return cleanLines;
  };

  const handleCopy = async () => {
    if (!jsonOutput) return;
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const resetAll = () => {
    setCsvInput("");
    setJsonOutput("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8">
      {/* Sandbox Trust Badge */}
      <TrustBadge />

      {/* Main Workspace */}
      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          CSV to JSON Workspace
        </h2>

        {/* Warning display (Neon Yellow) */}
        {error && (
          <div className="p-4 border border-border bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wide flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold mb-1">Sandbox System Warning:</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* File drop area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (e.dataTransfer.files?.[0]) {
              processFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed border-border py-8 px-4 text-center cursor-pointer transition-colors ${
            isDragOver ? "bg-accent/15" : "bg-background"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={handleFileSelect}
          />
          <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-foreground" />
          <p className="font-mono text-xs font-semibold uppercase tracking-wider">
            {isDragOver ? "Drop CSV File Here" : "Drag & Drop a CSV File or Click to Upload"}
          </p>
        </div>

        {/* Settings grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-border p-4 bg-background">
          {/* Delimiter */}
          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase font-bold text-muted-foreground">
              Delimiter
            </label>
            <select
              value={delimiter}
              onChange={(e) => {
                setDelimiter(e.target.value);
                saveSetting("csv_delimiter", e.target.value);
              }}
              className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none rounded-lg"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="&#9;">Tab (\t)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          {/* Has Header */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="has-header"
              checked={hasHeader}
              onChange={(e) => {
                setHasHeader(e.target.checked);
                saveSetting("csv_has_header", String(e.target.checked));
              }}
              className="w-4 h-4 border border-border rounded-lg cursor-pointer accent-primary"
            />
            <label htmlFor="has-header" className="font-mono text-xs uppercase font-bold text-foreground cursor-pointer select-none">
              First row is Header
            </label>
          </div>

          {/* Output Format */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="minify-json"
              checked={minify}
              onChange={(e) => {
                setMinify(e.target.checked);
                saveSetting("csv_minify", String(e.target.checked));
              }}
              className="w-4 h-4 border border-border rounded-lg cursor-pointer accent-primary"
            />
            <label htmlFor="minify-json" className="font-mono text-xs uppercase font-bold text-foreground cursor-pointer select-none">
              Minify JSON Output
            </label>
          </div>
        </div>

        {/* Input/Output panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">
          {/* Input text block */}
          <div className="p-4 bg-background border-r border-r-black flex flex-col space-y-2">
            <label className="font-mono text-xs font-bold uppercase tracking-wide block">
              INPUT CSV DATA
            </label>
            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              className="editorial-textarea h-96 resize-none focus:outline-none"
              placeholder="Paste comma-separated rows here..."
            />
          </div>

          {/* Output text block */}
          <div className="p-4 bg-background flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs font-bold uppercase tracking-wide">
                OUTPUT JSON
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!jsonOutput}
                  className="p-1 border border-border hover:bg-accent disabled:opacity-35 transition-colors"
                  title="Copy to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!jsonOutput}
                  className="p-1 border border-border hover:bg-accent disabled:opacity-35 transition-colors"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={jsonOutput}
              className="editorial-textarea h-96 resize-none font-mono bg-secondary/15"
              placeholder="JSON format result will appear here..."
            />
          </div>
        </div>

        {/* Reset Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={resetAll}
            className="btn-secondary flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear inputs
          </button>
        </div>
      </div>
    </div>
  );
}
