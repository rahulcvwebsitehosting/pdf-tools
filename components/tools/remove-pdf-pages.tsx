"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Trash2, FileText, Loader2, RefreshCw, Square, CheckSquare, Upload } from "lucide-react";

interface PageItem {
  pageIndex: number; // 0-indexed
  pageNumber: number; // 1-indexed
  isMarkedForDeletion: boolean;
}

export default function RemovePdfPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [fileSizeStr, setFileSizeStr] = useState<string>("");
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

      const pageItems: PageItem[] = [];
      for (let i = 0; i < count; i++) {
        pageItems.push({
          pageIndex: i,
          pageNumber: i + 1,
          isMarkedForDeletion: false,
        });
      }

      setFile(selectedFile);
      setPages(pageItems);
      setFileSizeStr(formatSize(selectedFile.size));
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
    setPages([]);
    setFileSizeStr("");
    setError(null);
    setSuccess(null);
  };

  const togglePageMark = (index: number) => {
    setPages((prev) =>
      prev.map((p) =>
        p.pageIndex === index ? { ...p, isMarkedForDeletion: !p.isMarkedForDeletion } : p
      )
    );
    setSuccess(null);
  };

  const markAllForDeletion = () => {
    setPages((prev) => prev.map((p) => ({ ...p, isMarkedForDeletion: true })));
  };

  const resetAllMarks = () => {
    setPages((prev) => prev.map((p) => ({ ...p, isMarkedForDeletion: false })));
  };

  const handleRemovePages = async () => {
    if (!file || pages.length === 0) return;

    const deletionList = pages.filter((p) => p.isMarkedForDeletion);
    if (deletionList.length === 0) {
      setError("Please select at least one page to delete.");
      return;
    }

    if (deletionList.length === pages.length) {
      setError("You cannot delete all pages from a PDF. At least one page must remain.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Sort deletion indices in descending order to avoid shift offsets
      const indicesToRemove = deletionList
        .map((p) => p.pageIndex)
        .sort((a, b) => b - a);

      for (const index of indicesToRemove) {
        pdfDoc.removePage(index);
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, "_revised.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(`Successfully deleted ${deletionList.length} pages. File downloaded.`);
      
      // Update local pages list
      const remainingPages = pages.filter((p) => !p.isMarkedForDeletion);
      const updatedPages = remainingPages.map((p, idx) => ({
        pageIndex: idx,
        pageNumber: idx + 1,
        isMarkedForDeletion: false,
      }));
      setPages(updatedPages);

    } catch (err: any) {
      console.error(err);
      setError("Failed to delete PDF pages. The file structure might be unsupported.");
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
          Remove PDF Pages Workspace
        </h2>

        {/* Drag & drop zone if no file selected */}
        {!file && (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed flex flex-col items-center justify-center py-12 px-4 transition-colors cursor-pointer ${
              isDragOver ? "border-accent bg-accent/5" : "border-border bg-background"
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
            <Upload className="w-8 h-8 mb-3 text-foreground" />
            <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
              {isDragOver ? "Drop PDF here" : "Click to select or drag & drop PDF"}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
              Remove specific pages locally and save the result
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
          <div className="p-4 border border-border bg-accent text-foreground font-mono text-xs uppercase tracking-wide">
            🎉 {success}
          </div>
        )}

        {file && pages.length > 0 && (
          <div className="space-y-6">
            {/* File info card */}
            <div className="flex items-center justify-between p-4 border border-border bg-background">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 shrink-0 text-foreground" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{file.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                    {pages.length} Pages • {fileSizeStr}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                disabled={isProcessing}
                className="p-1.5 border border-border hover:bg-destructive hover:text-white transition-colors"
                title="Change File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Selection utilities */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase">
              <button
                type="button"
                onClick={resetAllMarks}
                className="flex items-center gap-1.5 px-3 py-2 border border-border bg-background hover:bg-muted"
              >
                <Square className="w-3.5 h-3.5" /> Keep All
              </button>
              <button
                type="button"
                onClick={markAllForDeletion}
                className="flex items-center gap-1.5 px-3 py-2 border border-border bg-background hover:bg-muted"
              >
                <CheckSquare className="w-3.5 h-3.5 text-destructive" /> Mark All for Deletion
              </button>
              <span className="text-muted-foreground ml-auto">
                Selected: {pages.filter((p) => p.isMarkedForDeletion).length} / {pages.length} pages
              </span>
            </div>

            {/* Visual grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {pages.map((p) => {
                const isDel = p.isMarkedForDeletion;
                return (
                  <div
                    key={p.pageIndex}
                    onClick={() => togglePageMark(p.pageIndex)}
                    className={`border cursor-pointer select-none transition-all duration-150 p-2 flex flex-col items-center justify-between aspect-[3/4] relative ${
                      isDel
                        ? "border-destructive bg-destructive/5 text-destructive"
                        : "border-border bg-background text-foreground hover:border-border hover:bg-accent/5"
                    }`}
                  >
                    {/* Visual paper layout */}
                    <div className="w-full flex-1 flex flex-col items-center justify-center border border-dotted border-current p-2 relative overflow-hidden bg-background">
                      {isDel && (
                        <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 text-[10px] font-mono font-bold tracking-widest text-destructive rotate-[-25deg] uppercase">
                          ❌ DELETE
                        </div>
                      )}
                      
                      <span className="font-mono text-sm font-bold">PAGE</span>
                      <span className="font-editorial text-4xl font-extrabold mt-1">{p.pageNumber}</span>
                    </div>

                    {/* Checkbox badge bottom */}
                    <div className="mt-2 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {isDel ? "🗑️ TO DELETE" : "✅ KEEP PAGE"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleRemovePages}
                disabled={isProcessing || pages.filter((p) => p.isMarkedForDeletion).length === 0}
                className="btn-primary w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Removing selected pages...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Remove Selected Pages
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
