"use client";

import { useState, useCallback, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Crop, Loader2, CheckCircle, Sliders } from "lucide-react";

export default function CropPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [topMargin, setTopMargin] = useState("10");
  const [bottomMargin, setBottomMargin] = useState("10");
  const [leftMargin, setLeftMargin] = useState("10");
  const [rightMargin, setRightMargin] = useState("10");
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
        setError("Only PDF files are supported.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
        setError("Only PDF files are supported.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
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

  const handleCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    const t = parseFloat(topMargin) || 0;
    const b = parseFloat(bottomMargin) || 0;
    const l = parseFloat(leftMargin) || 0;
    const r = parseFloat(rightMargin) || 0;

    if (t < 0 || b < 0 || l < 0 || r < 0) {
      setError("Margins must be positive numbers.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Load file into ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      
      const pages = pdfDoc.getPages();
      const mmToPoints = 72 / 25.4; // 1 mm = ~2.83 points

      const topPts = t * mmToPoints;
      const bottomPts = b * mmToPoints;
      const leftPts = l * mmToPoints;
      const rightPts = r * mmToPoints;

      for (const page of pages) {
        // Get media box bounds
        const mediaBox = page.getMediaBox();
        const width = mediaBox.width;
        const height = mediaBox.height;

        const newX = mediaBox.x + leftPts;
        const newY = mediaBox.y + bottomPts;
        const newWidth = width - leftPts - rightPts;
        const newHeight = height - bottomPts - topPts;

        // Ensure we don't crop to a negative size or size smaller than 20pt
        if (newWidth > 20 && newHeight > 20) {
          page.setCropBox(newX, newY, newWidth, newHeight);
          page.setMediaBox(newX, newY, newWidth, newHeight);
        }
      }

      pdfDoc.setProducer("ToolsAtZero Client-Side Sandbox (Cropped)");
      pdfDoc.setCreator("ToolsAtZero Crop PDF Engine");
      const pdfBytes = await pdfDoc.save();

      // Trigger standard local file download
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `[cropped]_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError("Failed to crop the PDF file. Make sure the file is not password-protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setFile(null);
    setSuccess(false);
    setError(null);
    setTopMargin("10");
    setBottomMargin("10");
    setLeftMargin("10");
    setRightMargin("10");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8">
      {/* Trust Badge Banner */}
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Crop PDF Workspace
        </h2>

        {!success ? (
          <form onSubmit={handleCrop} className="space-y-6">
            {/* File selection zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed flex flex-col items-center justify-center py-10 px-4 transition-colors cursor-pointer ${
                isDragOver ? "border-accent bg-accent/5" : "border-border bg-background"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Crop className="w-10 h-10 mb-3 text-foreground" />
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
                {file ? file.name : "Select or drag & drop a PDF"}
              </p>
              {file && (
                <p className="font-mono text-xs text-muted-foreground mt-1 uppercase">
                  {formatSize(file.size)}
                </p>
              )}
              {!file && (
                <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
                  Visual margin modifications occur 100% in-browser.
                </p>
              )}
            </div>

            {/* Margin Inputs */}
            {file && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <Sliders className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wide">
                    Set Crop Margins (in millimeters)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wide text-muted-foreground block">
                      Top Margin (mm)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={topMargin}
                      onChange={(e) => setTopMargin(e.target.value)}
                      className="w-full p-2.5 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-lg text-sm font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wide text-muted-foreground block">
                      Bottom Margin (mm)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={bottomMargin}
                      onChange={(e) => setBottomMargin(e.target.value)}
                      className="w-full p-2.5 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-lg text-sm font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wide text-muted-foreground block">
                      Left Margin (mm)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={leftMargin}
                      onChange={(e) => setLeftMargin(e.target.value)}
                      className="w-full p-2.5 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-lg text-sm font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wide text-muted-foreground block">
                      Right Margin (mm)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={rightMargin}
                      onChange={(e) => setRightMargin(e.target.value)}
                      className="w-full p-2.5 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-lg text-sm font-mono"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error messaging */}
            {error && (
              <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide">
                ⚠️ {error}
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
                    <Loader2 className="w-4 h-4 animate-spin" /> Adjusting viewports...
                  </>
                ) : (
                  "Crop PDF"
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="space-y-6 text-center py-8">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-accent-foreground bg-accent p-1.5 border border-border" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-wide">
                PDF Cropped Successfully
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Your file has been cropped locally. Page coordinates and CropBox settings have been rewritten in-memory.
              </p>
            </div>

            <div className="p-4 max-w-xl mx-auto border border-border bg-accent text-xs font-mono uppercase tracking-wide text-left">
              <p className="font-bold mb-1">Cropping Bounds Applied:</p>
              <div className="grid grid-cols-4 gap-2 text-[10px] mt-2">
                <div>Top: {topMargin} mm</div>
                <div>Bottom: {bottomMargin} mm</div>
                <div>Left: {leftMargin} mm</div>
                <div>Right: {rightMargin} mm</div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button onClick={resetTool} className="btn-secondary">
                Crop Another PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
