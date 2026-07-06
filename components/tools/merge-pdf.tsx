"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { ArrowUp, ArrowDown, Trash2, Plus, FileSpreadsheet, Loader2 } from "lucide-react";

interface MergeFileItem {
  id: string;
  file: File;
  pageCount: number;
  sizeStr: string;
}

export default function MergePdfTool() {
  const [files, setFiles] = useState<MergeFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Helper to format file sizes
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Helper to load PDF and count pages
  const getPageCount = async (file: File): Promise<number> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      return pdfDoc.getPageCount();
    } catch (err) {
      console.error("Error reading PDF pages:", err);
      throw new Error(`Failed to read PDF pages from "${file.name}". The file might be corrupted or password-protected.`);
    }
  };

  const handleFilesAdded = async (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError(null);
    setIsProcessing(true);

    const pdfFiles = Array.from(newFiles).filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));

    if (pdfFiles.length === 0) {
      setError("Please drop or select valid PDF files.");
      setIsProcessing(false);
      return;
    }

    const loadedItems: MergeFileItem[] = [];

    for (const file of pdfFiles) {
      try {
        const pages = await getPageCount(file);
        loadedItems.push({
          id: Math.random().toString(36).substring(7),
          file,
          pageCount: pages,
          sizeStr: formatSize(file.size),
        });
      } catch (err: any) {
        setError(err.message || "An error occurred while loading files.");
      }
    }

    setFiles((prev) => [...prev, ...loadedItems]);
    setIsProcessing(false);
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
      handleFilesAdded(e.dataTransfer.files);
    }
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= files.length) return;

    setFiles((prev) => {
      const list = [...prev];
      const temp = list[index];
      list[index] = list[nextIndex];
      list[nextIndex] = temp;
      return list;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Create a new PDF Document
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const fileBuffer = await item.file.arrayBuffer();
        const srcDoc = await PDFDocument.load(fileBuffer);
        const pages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save PDF document
      const mergedBytes = await mergedPdf.save();

      // Trigger download
      const blob = new Blob([mergedBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `merged_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Merge error:", err);
      setError("Failed to merge PDF files. Ensure none of the files are password-restricted.");
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
          Merge PDF Workspace
        </h2>

        {/* Drag & drop zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`border-2 border-dashed flex flex-col items-center justify-center py-10 px-4 transition-colors cursor-pointer ${
            isDragOver ? "border-accent bg-accent/5" : "border-black bg-background"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => handleFilesAdded(e.target.files)}
          />
          <Plus className="w-8 h-8 mb-3 text-foreground" />
          <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
            {isDragOver ? "Drop PDFs here" : "Click to select or drag & drop PDFs"}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
            All files are merged locally in memory
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide">
            ⚠️ {error}
          </div>
        )}

        {/* Selected files table list */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Files to merge ({files.length})
            </h3>

            <div className="border border-black divide-y divide-black bg-background overflow-hidden">
              {files.map((item, index) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 bg-background">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileSpreadsheet className="w-5 h-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{item.file.name}</p>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                        {item.pageCount} Pages • {item.sizeStr}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Reorder/Delete) */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveFile(index, "up")}
                      className="p-1.5 border border-black hover:bg-accent disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === files.length - 1}
                      onClick={() => moveFile(index, "down")}
                      className="p-1.5 border border-black hover:bg-accent disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="p-1.5 border border-black hover:bg-destructive hover:text-white transition-colors"
                      title="Remove File"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Merge action trigger button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleMerge}
                disabled={isProcessing || files.length < 2}
                className="btn-primary w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Merging files...
                  </>
                ) : (
                  "Merge PDF documents"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
