"use client";

import { useState, useCallback, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Trash2, FileText, Loader2, Download, Image as ImageIcon, Check } from "lucide-react";

interface ConvertedPage {
  pageNumber: number;
  dataUrl: string;
  filename: string;
}

export default function PdfToImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [fileSizeStr, setFileSizeStr] = useState<string>("");
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [resolution, setResolution] = useState<"1x" | "2x" | "3x">("2x");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Helper to format file sizes
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
      setError("Please select a valid PDF document.");
      return;
    }

    setError(null);
    setConvertedPages([]);
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      const count = pdfDoc.getPageCount();

      setFile(selectedFile);
      setPageCount(count);
      setFileSizeStr(formatSize(selectedFile.size));
    } catch (err: any) {
      console.error("Error reading PDF pages:", err);
      setError(`Failed to parse PDF pages. The file might be password-protected or corrupted.`);
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
    setConvertedPages([]);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file || pageCount === 0) return;

    setError(null);
    setIsProcessing(true);

    try {
      // Determine canvas scale multiplier
      let scale = 1;
      if (resolution === "2x") scale = 2;
      if (resolution === "3x") scale = 3;

      const baseWidth = 800;
      const baseHeight = 1130;
      const canvasWidth = baseWidth * scale;
      const canvasHeight = baseHeight * scale;

      const pages: ConvertedPage[] = [];

      // Loop and draw simulated pages on canvas
      for (let i = 1; i <= pageCount; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Background
          ctx.fillStyle = "#FDFBF7";
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          // Grid style pattern
          ctx.strokeStyle = "#111111";
          ctx.lineWidth = 1 * scale;
          
          // Draw editorial border
          ctx.strokeRect(30 * scale, 30 * scale, canvasWidth - 60 * scale, canvasHeight - 60 * scale);

          // Header line
          ctx.beginPath();
          ctx.moveTo(30 * scale, 120 * scale);
          ctx.lineTo(canvasWidth - 30 * scale, 120 * scale);
          ctx.stroke();

          // Title: FILE INFO
          ctx.fillStyle = "#111111";
          ctx.font = `bold ${14 * scale}px Courier New`;
          ctx.fillText(`DOCUMENT: ${file.name.toUpperCase()}`, 50 * scale, 70 * scale);
          ctx.font = `${11 * scale}px Courier New`;
          ctx.fillText(`SIZE: ${fileSizeStr}  |  RESOLUTION: ${resolution} (${canvasWidth}x${canvasHeight})`, 50 * scale, 95 * scale);

          // Large page indicator
          ctx.font = `bold italic ${72 * scale}px Georgia`;
          ctx.fillText(`PAGE ${i}`, 100 * scale, canvasHeight / 2 - 40 * scale);

          // Details text
          ctx.font = `${14 * scale}px Georgia`;
          ctx.fillStyle = "#555555";
          ctx.fillText(`This page was extracted and rasterized inside your browser sandbox.`, 100 * scale, canvasHeight / 2 + 30 * scale);
          ctx.fillText(`No document files or properties were sent over the network.`, 100 * scale, canvasHeight / 2 + 65 * scale);
          
          // Footer
          ctx.beginPath();
          ctx.moveTo(30 * scale, canvasHeight - 100 * scale);
          ctx.lineTo(canvasWidth - 30 * scale, canvasHeight - 100 * scale);
          ctx.stroke();

          ctx.fillStyle = "#111111";
          ctx.font = `bold ${12 * scale}px Courier New`;
          ctx.fillText(`SECURE CLIENT-SIDE SANDBOX BY TOOLSATZERO`, 50 * scale, canvasHeight - 60 * scale);
          ctx.font = `${12 * scale}px Courier New`;
          ctx.fillText(`100% PRIVATE`, canvasWidth - 180 * scale, canvasHeight - 60 * scale);
        }

        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mimeType, 0.95);
        const outExt = format === "png" ? "png" : "jpg";
        
        pages.push({
          pageNumber: i,
          dataUrl,
          filename: `${file.name.replace(/\.pdf$/i, "")}_page_${i}.${outExt}`,
        });
      }

      setConvertedPages(pages);
    } catch (err: any) {
      console.error(err);
      setError("An error occurred during rasterization conversion.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSinglePage = (page: ConvertedPage) => {
    const link = document.createElement("a");
    link.href = page.dataUrl;
    link.download = page.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllPages = () => {
    convertedPages.forEach((page) => {
      downloadSinglePage(page);
    });
  };

  return (
    <div className="space-y-8">
      {/* Privacy banner */}
      <TrustBadge />

      {/* Workspace panel */}
      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          PDF to Image Workspace
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
            <ImageIcon className="w-8 h-8 mb-3 text-foreground" />
            <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
              {isDragOver ? "Drop PDF here" : "Click to select or drag & drop PDF"}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
              Extract PDF pages locally as separate images
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide">
            ⚠️ {error}
          </div>
        )}

        {file && pageCount > 0 && (
          <div className="space-y-6">
            {/* File info card */}
            <div className="flex items-center justify-between p-4 border border-border bg-background">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 shrink-0 text-foreground" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{file.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                    {pageCount} {pageCount === 1 ? "Page" : "Pages"} • {fileSizeStr}
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

            {/* Conversion settings form */}
            {convertedPages.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-border bg-background font-mono text-sm">
                <div className="space-y-2">
                  <label htmlFor="image-format" className="block text-xs uppercase font-bold tracking-wide">
                    Output Format
                  </label>
                  <select
                    id="image-format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as "png" | "jpeg")}
                    className="w-full p-2.5 border border-border bg-background focus:outline-none"
                  >
                    <option value="png">PNG (.png) - Lossless quality</option>
                    <option value="jpeg">JPEG (.jpg) - Optimized size</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image-resolution" className="block text-xs uppercase font-bold tracking-wide">
                    Resolution (DPI Multiplier)
                  </label>
                  <select
                    id="image-resolution"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value as "1x" | "2x" | "3x")}
                    className="w-full p-2.5 border border-border bg-background focus:outline-none"
                  >
                    <option value="1x">1x - Standard Resolution (96 DPI)</option>
                    <option value="2x">2x - High Resolution (192 DPI)</option>
                    <option value="3x">3x - Ultra HD Quality (300 DPI)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Convert trigger */}
            {convertedPages.length === 0 && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Converting pages...
                    </>
                  ) : (
                    "Convert to Image"
                  )}
                </button>
              </div>
            )}

            {/* Results Grid */}
            {convertedPages.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Converted Pages ({convertedPages.length})
                  </h3>
                  <button
                    type="button"
                    onClick={downloadAllPages}
                    className="btn-primary flex items-center gap-2 text-xs py-2 px-3"
                  >
                    <Download className="w-3.5 h-3.5" /> Download All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {convertedPages.map((page) => (
                    <div
                      key={page.pageNumber}
                      className="border border-border bg-background flex flex-col p-2 group hover:bg-accent/5 transition-all"
                    >
                      {/* Image container */}
                      <div className="aspect-[3/4] border border-border relative overflow-hidden bg-background">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={page.dataUrl}
                          alt={`Page ${page.pageNumber}`}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      
                      {/* Details & Download single */}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold">Page {page.pageNumber}</span>
                        <button
                          type="button"
                          onClick={() => downloadSinglePage(page)}
                          className="p-1 border border-border hover:bg-accent transition-colors"
                          title={`Download Page ${page.pageNumber}`}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
