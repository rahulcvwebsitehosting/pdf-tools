"use client";

import { useState, useEffect, useRef } from "react";
import { TrustBadge } from "@/components/trust-badge";
import { FileSpreadsheet, Download, RefreshCw, AlertTriangle, Check, Copy } from "lucide-react";

export default function CsvToExcelTool() {
  const [csvInput, setCsvInput] = useState<string>(
    `id,name,role,department,salary\n1,Alice Smith,Senior Architect,Engineering,150000\n2,Bob Jones,Growth Marketer,Marketing,95000\n3,Charlie Brown,Systems Engineer,Operations,110000`
  );
  const [excelOutput, setExcelOutput] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(",");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-convert on input change
  useEffect(() => {
    handleConvert();
  }, [csvInput, delimiter]);

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
      setExcelOutput("");
      setError(null);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const parsedRows = parseCSV(csvInput, delimiter);
      const xmlContent = convertToExcelXml(parsedRows);
      setExcelOutput(xmlContent);
    } catch (err: any) {
      console.error(err);
      setError("Failed to parse CSV or generate Excel structure. Check delimiter settings.");
      setExcelOutput("");
    } finally {
      setIsProcessing(false);
    }
  };

  const parseCSV = (text: string, delim: string): string[][] => {
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

    if (value || row.length > 0) {
      row.push(value);
      lines.push(row);
    }

    return lines.filter((r) => r.length > 0 && (r.length > 1 || r[0] !== ""));
  };

  const convertToExcelXml = (rows: string[][]): string => {
    let xml = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>\n';
    xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n';
    xml += ' xmlns:o="urn:schemas-microsoft-com:office:office"\n';
    xml += ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n';
    xml += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n';
    xml += ' xmlns:html="http://www.w3.org/TR/REC-html40">\n';
    xml += ' <Worksheet ss:Name="ToolsAtZero Export">\n';
    xml += '  <Table>\n';
    
    for (const row of rows) {
      xml += '   <Row>\n';
      for (const val of row) {
        const escaped = val
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");
        
        const isNum = !isNaN(Number(val)) && val.trim() !== "";
        const type = isNum ? "Number" : "String";
        xml += `    <Cell><Data ss:Type="${type}">${escaped}</Data></Cell>\n`;
      }
      xml += '   </Row>\n';
    }
    
    xml += '  </Table>\n';
    xml += ' </Worksheet>\n';
    xml += '</Workbook>\n';
    return xml;
  };

  const handleCopy = async () => {
    if (!excelOutput) return;
    try {
      await navigator.clipboard.writeText(excelOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!excelOutput) return;
    const blob = new Blob([excelOutput], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `excel_export_${Date.now()}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const resetAll = () => {
    setCsvInput("");
    setExcelOutput("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8">
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          CSV to Excel Workspace
        </h2>

        {error && (
          <div className="p-4 border border-border bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wide flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold mb-1">Sandbox System Warning:</p>
              <p>{error}</p>
            </div>
          </div>
        )}

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-border p-4 bg-background">
          <div className="space-y-1">
            <label className="block font-mono text-[10px] uppercase font-bold text-muted-foreground">
              CSV Delimiter
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full p-2 border border-border bg-background font-mono text-xs focus:outline-none rounded-lg"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="&#9;">Tab (\\t)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>
          <div className="flex items-end">
            <p className="font-mono text-[11px] text-muted-foreground">
              Exports to Microsoft Excel compatible XML Spreadsheet format (.xls) natively supporting multi-column datasets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">
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

          <div className="p-4 bg-background flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs font-bold uppercase tracking-wide">
                EXCEL XML PREVIEW
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!excelOutput}
                  className="p-1 border border-border hover:bg-accent disabled:opacity-35 transition-colors"
                  title="Copy XML data"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={excelOutput}
              className="editorial-textarea h-96 resize-none font-mono bg-secondary/15"
              placeholder="Excel spreadsheet XML structure will appear here..."
            />
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <button
            onClick={resetAll}
            className="btn-secondary flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear inputs
          </button>
          
          <button
            onClick={handleDownload}
            disabled={!excelOutput}
            className="btn-primary flex items-center gap-2"
          >
            {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            Download Excel File (.xls)
          </button>
        </div>
      </div>
    </div>
  );
}
