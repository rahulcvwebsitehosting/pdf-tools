"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Plus, FileText, Loader2, Settings, Download, Type, Image as ImageIcon } from "lucide-react";

export default function AddWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [fileSizeStr, setFileSizeStr] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Watermark Types & Parameters
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImageName, setWatermarkImageName] = useState<string>("");
  const [opacity, setOpacity] = useState<number>(0.3);
  const [rotation, setRotation] = useState<number>(45);
  const [fontSize, setFontSize] = useState<number>(60);
  const [imageScale, setImageScale] = useState<number>(50); // percentage

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const imgFile = files[0];
    const extension = imgFile.name.toLowerCase();
    if (!imgFile.type.startsWith("image/") && !extension.endsWith(".png") && !extension.endsWith(".jpg") && !extension.endsWith(".jpeg")) {
      setError("Please upload a valid PNG or JPG image for the watermark.");
      return;
    }
    setWatermarkImage(imgFile);
    setWatermarkImageName(imgFile.name);
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

  const handleAddWatermark = async () => {
    if (!file) {
      setError("Please load a PDF document first.");
      return;
    }
    if (watermarkType === "image" && !watermarkImage) {
      setError("Please upload a PNG or JPG watermark image first.");
      return;
    }
    if (watermarkType === "text" && !watermarkText.trim()) {
      setError("Please enter watermark text.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      let embeddedImage: any = null;
      if (watermarkType === "image" && watermarkImage) {
        const imageBuffer = await watermarkImage.arrayBuffer();
        if (watermarkImage.type === "image/png" || watermarkImage.name.toLowerCase().endsWith(".png")) {
          embeddedImage = await pdfDoc.embedPng(imageBuffer);
        } else {
          embeddedImage = await pdfDoc.embedJpg(imageBuffer);
        }
      }

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        if (watermarkType === "text") {
          const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
          const textHeight = fontSize * 0.8;

          // Draw text centered diagonally
          page.drawText(watermarkText, {
            x: width / 2 - (textWidth / 2) * Math.cos((rotation * Math.PI) / 180),
            y: height / 2 - (textHeight / 2) * Math.sin((rotation * Math.PI) / 180),
            size: fontSize,
            font,
            color: rgb(0.5, 0.5, 0.5), // Neutral medium gray
            opacity: opacity,
            rotate: degrees(rotation),
          });
        } else if (watermarkType === "image" && embeddedImage) {
          const originalDims = embeddedImage.scale(1);
          const maxDimension = Math.min(width, height) * 0.8;
          const scaleRatio = (maxDimension / Math.max(originalDims.width, originalDims.height)) * (imageScale / 100);
          const scaledDims = embeddedImage.scale(scaleRatio);

          page.drawImage(embeddedImage, {
            x: width / 2 - scaledDims.width / 2,
            y: height / 2 - scaledDims.height / 2,
            width: scaledDims.width,
            height: scaledDims.height,
            opacity: opacity,
            rotate: degrees(rotation),
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `watermarked_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError("Failed to add watermark. The document might be write-protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Add Watermark Workspace
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

        {/* Workspace controls & Document details */}
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
                <Settings className="w-4 h-4 text-black" /> Watermark Customization
              </h3>

              {/* Watermark Type Selector */}
              <div className="flex border-b border-black">
                <button
                  type="button"
                  onClick={() => setWatermarkType("text")}
                  className={`flex-1 py-2 font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 rounded-none transition-colors border-r border-black ${
                    watermarkType === "text" ? "bg-accent text-black" : "hover:bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  <Type className="w-4 h-4" /> Text Watermark
                </button>
                <button
                  type="button"
                  onClick={() => setWatermarkType("image")}
                  className={`flex-1 py-2 font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 rounded-none transition-colors ${
                    watermarkType === "image" ? "bg-accent text-black" : "hover:bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" /> Image Watermark
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {watermarkType === "text" ? (
                  /* Text Watermark Controls */
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase font-bold text-foreground">
                        Watermark Text
                      </label>
                      <input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="e.g. CONFIDENTIAL, DRAFT"
                        className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase font-bold text-foreground">
                        Font Size (pt)
                      </label>
                      <input
                        type="number"
                        min="12"
                        max="144"
                        value={fontSize}
                        onChange={(e) => setFontSize(Math.max(12, Math.min(144, parseInt(e.target.value) || 60)))}
                        className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                      />
                    </div>
                  </div>
                ) : (
                  /* Image Watermark Controls */
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase font-bold text-foreground">
                        Select PNG/JPG Image
                      </label>
                      <div className="relative border border-black p-2 bg-background flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground truncate max-w-[180px]">
                          {watermarkImageName || "No file selected"}
                        </span>
                        <button
                          type="button"
                          onClick={() => document.getElementById("watermark-image-input")?.click()}
                          className="btn-secondary text-[10px] py-1 px-2.5 uppercase shrink-0"
                        >
                          Choose Image
                        </button>
                        <input
                          id="watermark-image-input"
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase font-bold text-foreground">
                        Image Scale ({imageScale}%)
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={imageScale}
                        onChange={(e) => setImageScale(parseInt(e.target.value))}
                        className="w-full accent-black h-1 bg-secondary border border-black rounded-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Common Parameters */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-foreground">
                      Opacity (Alpha: {Math.round(opacity * 100)}%)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={opacity * 100}
                      onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
                      className="w-full accent-black h-1 bg-secondary border border-black rounded-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase font-bold text-foreground">
                      Rotation (Degrees: {rotation}°)
                    </label>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full accent-black h-1 bg-secondary border border-black rounded-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Render trigger button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddWatermark}
                disabled={isProcessing}
                className="btn-primary w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Applying Watermark...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Add Watermark
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
