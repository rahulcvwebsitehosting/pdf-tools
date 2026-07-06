"use client";

import { useState, useCallback, useMemo } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Trash2, FileText, Loader2, Scissors, HelpCircle } from "lucide-react";

export default function PdfExtractPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [fileSizeStr, setFileSizeStr] = useState<string>("");
  const [rangeInput, setRangeInput] = useState<string>("1-2");
  const [mode, setMode] = useState<"single" | "individual">("single");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileAdded = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    const selectedFile = selectedFiles[0];

    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      const count = pdfDoc.getPageCount();

      setFile(selectedFile);
      setPageCount(count);
      setFileSizeStr(formatSize(selectedFile.size));
      setRangeInput(`1-${Math.min(count, 3)}`);
    } catch (err: any) {
      console.error(err);
      setError("Failed to read PDF pages. The file might be corrupted or encrypted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFileAdded(e.dataTransfer.files);
    }
  }, []);

  const removeFile = () => {
    setFile(null);
    setPageCount(0);
    setFileSizeStr("");
    setRangeInput("1-2");
    setError(null);
    setSuccess(null);
  };

  // Real-time parsing helper to show visual badges
  const parsedPageIndices = useMemo((): number[] => {
    if (!rangeInput.trim() || pageCount === 0) return [];
    
    const pages = new Set<number>();
    const parts = rangeInput.split(",");
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      
      if (trimmed.includes("-")) {
        const [startStr, endStr] = trimmed.split("-");
        const start = parseInt(startStr.trim(), 10);
        const end = parseInt(endStr.trim(), 10);
        
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= pageCount) {
              pages.add(i - 1); // 0-indexed internally
            }
          }
        }
      } else {
        const val = parseInt(trimmed, 10);
        if (!isNaN(val) && val >= 1 && val <= pageCount) {
          pages.add(val - 1);
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  }, [rangeInput, pageCount]);

  const handleExtract = async () => {
    if (!file || parsedPageIndices.length === 0) {
      setError("Please specify a valid page range within the document page boundaries.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer);

      if (mode === "single") {
        // Create new combined PDF
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(srcDoc, parsedPageIndices);
        copiedPages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();

        // Download combined file
        const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name.replace(/\.pdf$/i, "_extracted.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Extract as individual PDFs
        for (const index of parsedPageIndices) {
          const singlePdf = await PDFDocument.create();
          const [copiedPage] = await singlePdf.copyPages(srcDoc, [index]);
          singlePdf.addPage(copiedPage);

          const pdfBytes = await singlePdf.save();

          // Download individual file
          const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = file.name.replace(/\.pdf$/i, `_page_${index + 1}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }

      setSuccess(`Successfully extracted ${parsedPageIndices.length} page(s) locally.`);
    } catch (err: any) {
      console.error(err);
      setError("Failed to extract pages. Make sure the PDF file structure is supported.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy banner */}
      <TrustBadge />

      {/* Workspace panel */}
      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Extract PDF Pages Workspace
        </h2>

        {/* Drag & drop zone if no file selected */}
        {!file && (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed flex flex-col items-center justify-center py-12 px-4 transition-colors cursor-pointer ${
              isDragOver ? "border-accent bg-accent/5" : "border-black bg-background"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => handleFileAdded(e.target.files)}
            />
            <Scissors className="w-8 h-8 mb-3 text-foreground" />
            <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
              {isDragOver ? "Drop PDF here" : "Click to select or drag & drop PDF"}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
              Extract specified page selections or ranges in sandbox
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide">
            ⚠️ {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="p-4 border border-black bg-accent text-foreground font-mono text-xs uppercase tracking-wide">
            🎉 {success}
          </div>
        )}

        {file && pageCount > 0 && (
          <div className="space-y-6 font-mono text-sm">
            {/* File info card */}
            <div className="flex items-center justify-between p-4 border border-black bg-background">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 shrink-0 text-foreground" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{file.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                    {pageCount} Pages • {fileSizeStr}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                disabled={isProcessing}
                className="p-1.5 border border-black hover:bg-destructive hover:text-white transition-colors"
                title="Change File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Inputs & options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-black bg-background">
              {/* Range Input */}
              <div className="space-y-2">
                <label htmlFor="page-range" className="block text-xs uppercase font-bold tracking-wide">
                  Specify Page Range
                </label>
                <input
                  id="page-range"
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="e.g. 1-3, 5"
                  className="w-full p-2.5 border border-black bg-background focus:outline-none"
                />
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Use commas and hyphens (e.g. &quot;1-3, 5&quot;)</span>
                </div>

                {/* Parsed Pages preview */}
                {parsedPageIndices.length > 0 && (
                  <div className="pt-2">
                    <span className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Pages to extract ({parsedPageIndices.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {parsedPageIndices.map((idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 border border-black bg-accent/20 text-[10px] font-bold"
                        >
                          Page {idx + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Extraction Mode */}
              <div className="space-y-2">
                <label htmlFor="extraction-mode" className="block text-xs uppercase font-bold tracking-wide">
                  Extraction Mode
                </label>
                <select
                  id="extraction-mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value as "single" | "individual")}
                  className="w-full p-2.5 border border-black bg-background focus:outline-none"
                >
                  <option value="single">Combine as a single PDF document</option>
                  <option value="individual">Save each page as an individual PDF</option>
                </select>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleExtract}
                disabled={isProcessing || parsedPageIndices.length === 0}
                className="btn-primary w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Extracting pages...
                  </>
                ) : (
                  <>
                    <Scissors className="w-4 h-4" /> Extract Pages
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
