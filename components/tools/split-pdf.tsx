"use client";

import { useState, useCallback, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Scissors, Loader2, CheckCircle, FileText, Settings, AlertTriangle } from "lucide-react";

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [rangeInput, setRangeInput] = useState("1-3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await processSelectedFile(selectedFile);
    }
  };

  const processSelectedFile = async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      setFile(null);
      setPageCount(0);
      return;
    }

    setError(null);
    setSuccess(false);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          if (!arrayBuffer) {
            throw new Error("Unable to read file content buffer.");
          }
          
          const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
          const count = pdfDoc.getPageCount();
          
          setFile(selectedFile);
          setPageCount(count);
          setRangeInput(`1-${Math.min(3, count)}`);
        } catch (err: any) {
          console.error("PDF Parsing Error:", err);
          setError("Failed to parse PDF document. The file might be corrupted, password-protected, or invalid.");
          setFile(null);
          setPageCount(0);
        }
      };

      reader.onerror = () => {
        setError("Error occurred while reading the file stream.");
      };

      reader.readAsArrayBuffer(selectedFile);
    } catch (err: any) {
      console.error("File Reader Error:", err);
      setError("An unexpected error occurred during file upload.");
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      await processSelectedFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleSplit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || pageCount === 0) {
      setError("Please upload a valid PDF document first.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const indices: number[] = [];
      const parts = rangeInput.split(",");

      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.toLowerCase() === "all") {
          for (let i = 0; i < pageCount; i++) {
            indices.push(i);
          }
          break;
        }

        if (trimmed.includes("-")) {
          const [startStr, endStr] = trimmed.split("-");
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);

          if (!isNaN(start) && !isNaN(end)) {
            const min = Math.min(start, end);
            const max = Math.max(start, end);
            for (let i = min; i <= max; i++) {
              if (i >= 1 && i <= pageCount) {
                indices.push(i - 1);
              }
            }
          }
        } else {
          const pageNum = parseInt(trimmed, 10);
          if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount) {
            indices.push(pageNum - 1);
          }
        }
      }

      const uniqueIndices = Array.from(new Set(indices)).sort((a, b) => a - b);

      if (uniqueIndices.length === 0) {
        setError("Invalid page range specified. Please enter numbers within 1 and the total page count.");
        setIsProcessing(false);
        return;
      }

      // Read PDF file via FileReader as ArrayBuffer
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          if (!arrayBuffer) {
            throw new Error("Unable to retrieve file buffer for splitting.");
          }

          // Load original document
          const srcDoc = await PDFDocument.load(arrayBuffer);
          
          // Create new document for extracted pages
          const splitPdf = await PDFDocument.create();
          const copiedPages = await splitPdf.copyPages(srcDoc, uniqueIndices);
          copiedPages.forEach((page) => splitPdf.addPage(page));

          splitPdf.setProducer("ToolsAtZero Client-Side Sandbox (Split)");
          splitPdf.setCreator("ToolsAtZero Split PDF Engine");
          
          const pdfBytes = await splitPdf.save();

          // Generate secure Blob download
          const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `[split]_${file.name}`;
          document.body.appendChild(link);
          link.click();
          
          // Clean up to prevent leaks
          document.body.removeChild(link);
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 1000);

          setSuccess(true);
        } catch (err: any) {
          console.error("Extraction Processing Error:", err);
          setError("Failed to split PDF. The file content structure could not be parsed.");
        } finally {
          setIsProcessing(false);
        }
      };

      reader.onerror = () => {
        setError("Failed to parse document content streams.");
        setIsProcessing(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (err: any) {
      console.error("Unexpected Split Error:", err);
      setError("An unexpected error occurred while compiling your document.");
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setFile(null);
    setPageCount(0);
    setSuccess(false);
    setError(null);
    setRangeInput("1-3");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8">
      {/* Trust Badge Banner */}
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Split PDF Workspace
        </h2>

        {/* High-visibility Neon Yellow Warning for invalid inputs/corrupted uploads */}
        {error && (
          <div className="p-4 border border-black bg-accent text-black font-mono text-xs uppercase tracking-wide flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-black" />
            <div>
              <p className="font-bold mb-1">Sandbox System Warning:</p>
              <p className="leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {!success ? (
          <form onSubmit={handleSplit} className="space-y-6">
            {/* File selection zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed border-black flex flex-col items-center justify-center py-10 px-4 transition-colors cursor-pointer ${
                isDragOver ? "bg-accent/10" : "bg-background"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Scissors className="w-10 h-10 mb-3 text-foreground" />
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
                {file ? file.name : "Select or drag & drop a PDF"}
              </p>
              {file && (
                <p className="font-mono text-xs text-muted-foreground mt-1 uppercase">
                  {pageCount} Pages • {formatSize(file.size)}
                </p>
              )}
              {!file && (
                <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
                  Extract page indexes in-memory. Zero server interaction.
                </p>
              )}
            </div>

            {/* Split Settings */}
            {file && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-black pb-2">
                  <Settings className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wide">
                    Configure Page Extraction
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-foreground block">
                      Define Ranges
                    </label>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase">
                      Total: {pageCount} Pages
                    </span>
                  </div>
                  <input
                    type="text"
                    value={rangeInput}
                    onChange={(e) => setRangeInput(e.target.value)}
                    placeholder="e.g. 1-3, 5, 7-9 or 'all'"
                    className="w-full p-3 bg-background border border-black focus:outline-none rounded-none text-sm font-mono"
                    required
                  />
                  <p className="text-[10px] text-muted-foreground font-mono uppercase leading-relaxed">
                    Use commas to separate single pages or hyphenated ranges. Enter <span className="font-bold underline">all</span> to select all pages.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isProcessing || !file}
                className="btn-primary w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Extracting pages...
                  </>
                ) : (
                  "Split PDF"
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="space-y-6 text-center py-8">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-black bg-accent p-1.5 border border-black" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-wide">
                PDF Pages Extracted
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                The pages specified in range <strong>{rangeInput}</strong> have been extracted and downloaded.
              </p>
            </div>

            <div className="p-4 max-w-xl mx-auto border border-black bg-accent text-xs font-mono uppercase tracking-wide text-left flex items-start gap-3">
              <FileText className="w-5 h-5 shrink-0 text-black" />
              <div>
                <p className="font-bold mb-1">Local Splitting Complete:</p>
                <p className="text-[11px] leading-relaxed">
                  Pages copy completed in-memory. The generated PDF file contains only the selected pages.
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button onClick={resetTool} className="btn-secondary">
                Split/Extract Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
