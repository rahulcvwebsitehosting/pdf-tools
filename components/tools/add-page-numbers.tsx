"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Plus, FileText, Loader2, Settings, Download } from "lucide-react";

export default function AddPageNumbersTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [fileSizeStr, setFileSizeStr] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Customization Options
  const [placement, setPlacement] = useState<"top_left" | "top_right" | "bottom_left" | "bottom_right">("bottom_right");
  const [style, setStyle] = useState<"page_x" | "page_x_of_y">("page_x_of_y");
  const [fontSize, setFontSize] = useState<number>(10);
  const [margin, setMargin] = useState<number>(30);
  const [startNumber, setStartNumber] = useState<number>(1);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setError(null);
    setFile(null);
    setPageCount(null);

    const selectedFile = selectedFiles[0];
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      setPageCount(pdfDoc.getPageCount());
      setFile(selectedFile);
      setFileSizeStr(formatSize(selectedFile.size));
    } catch (err: any) {
      console.error(err);
      setError("Could not parse this PDF. The file may be corrupt or encrypted.");
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
      handleFileChange(e.dataTransfer.files);
    }
  }, []);

  const handleAddPageNumbers = async () => {
    if (!file) {
      setError("Please load a PDF document first.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        const currentPageNumber = startNumber + i;

        let text = "";
        if (style === "page_x") {
          text = `${currentPageNumber}`;
        } else {
          text = `Page ${currentPageNumber} of ${startNumber + pages.length - 1}`;
        }

        const textWidth = font.widthOfTextAtSize(text, fontSize);

        let x = margin;
        let y = margin;

        if (placement === "top_left") {
          x = margin;
          y = height - margin;
        } else if (placement === "top_right") {
          x = width - margin - textWidth;
          y = height - margin;
        } else if (placement === "bottom_left") {
          x = margin;
          y = margin;
        } else if (placement === "bottom_right") {
          x = width - margin - textWidth;
          y = margin;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.06, 0.06, 0.06), // Near obsidian black
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `numbered_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError("Failed to add page numbers. The document might be write-protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Add Page Numbers Workspace
        </h2>

        {/* Drag & Drop Zone */}
        {!file && (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed flex flex-col items-center justify-center py-10 px-4 transition-colors cursor-pointer rounded-none ${
              isDragOver ? "border-accent bg-accent/5" : "border-black bg-background"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files)}
            />
            {isProcessing ? (
              <Loader2 className="w-8 h-8 mb-3 text-foreground animate-spin" />
            ) : (
              <Plus className="w-8 h-8 mb-3 text-foreground" />
            )}
            <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
              {isProcessing ? "Loading PDF..." : isDragOver ? "Drop PDF here" : "Click to select or drag & drop PDF"}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
              Single document processing • Completely local
            </p>
          </div>
        )}

        {/* Error alert */}
        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide rounded-none">
            ⚠️ {error}
          </div>
        )}

        {/* Customization controls & Document details */}
        {file && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-black bg-secondary/20 rounded-none gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 shrink-0 text-foreground" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{file.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                    {pageCount} Pages • {fileSizeStr}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPageCount(null);
                }}
                className="btn-secondary text-xs py-1 px-3"
              >
                Change File
              </button>
            </div>

            {/* Customization Options */}
            <div className="border border-black p-6 bg-background rounded-none space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Settings className="w-4 h-4 text-black" /> Style & Position Controls
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Placement select */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase font-bold text-foreground">
                    Number Placement
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value as any)}
                    className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                  >
                    <option value="top_left">Top Left</option>
                    <option value="top_right">Top Right</option>
                    <option value="bottom_left">Bottom Left</option>
                    <option value="bottom_right">Bottom Right (Recommended)</option>
                  </select>
                </div>

                {/* Style select */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase font-bold text-foreground">
                    Number Format
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value as any)}
                    className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                  >
                    <option value="page_x">Simple Number (e.g. "1")</option>
                    <option value="page_x_of_y">X of Y (e.g. "Page 1 of 5")</option>
                  </select>
                </div>

                {/* Font Size & Margin */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-foreground">
                      Font Size (pt)
                    </label>
                    <input
                      type="number"
                      min="6"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Math.max(6, Math.min(24, parseInt(e.target.value) || 10)))}
                      className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-foreground">
                      Margin (px)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={margin}
                      onChange={(e) => setMargin(Math.max(10, Math.min(100, parseInt(e.target.value) || 30)))}
                      className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                    />
                  </div>
                </div>

                {/* Start Number */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase font-bold text-foreground">
                    Start Numbering From
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={startNumber}
                    onChange={(e) => setStartNumber(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                  />
                </div>
              </div>
            </div>

            {/* Render trigger button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddPageNumbers}
                disabled={isProcessing}
                className="btn-primary w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Numbering pages...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Add Page Numbers
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
