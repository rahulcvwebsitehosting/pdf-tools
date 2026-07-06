"use client";

import { useState, useCallback, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Trash2, ArrowUp, ArrowDown, Plus, FileImage, Loader2, FileText } from "lucide-react";

interface ImageItem {
  id: string;
  file: File;
  name: string;
  sizeStr: string;
  previewUrl: string;
}

export default function ImageToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "fit">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleImagesAdded = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError(null);

    const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];
    const loadedImages: ImageItem[] = [];

    Array.from(newFiles).forEach((file) => {
      const isImg = file.type.startsWith("image/") || validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
      if (isImg) {
        loadedImages.push({
          id: Math.random().toString(36).substring(7),
          file,
          name: file.name,
          sizeStr: formatSize(file.size),
          previewUrl: URL.createObjectURL(file),
        });
      }
    });

    if (loadedImages.length === 0) {
      setError("Please drop or select valid image files (PNG, JPEG, WebP).");
      return;
    }

    setImages((prev) => [...prev, ...loadedImages]);
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
      handleImagesAdded(e.dataTransfer.files);
    }
  }, []);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= images.length) return;

    setImages((prev) => {
      const list = [...prev];
      const temp = list[index];
      list[index] = list[nextIndex];
      list[nextIndex] = temp;
      return list;
    });
  };

  // Main PDF Generation Logic
  const handleConvert = async () => {
    if (images.length === 0) return;

    setError(null);
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgItem of images) {
        // Load image into an HTMLImageElement to support all formats (like WebP) via Canvas conversion
        const img = new Image();
        img.src = imgItem.previewUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error(`Failed to load image: ${imgItem.name}`));
        });

        // Convert image to PNG array buffer using HTML Canvas
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not create canvas context");
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL("image/png");
        const res = await fetch(dataUrl);
        const arrayBuffer = await res.arrayBuffer();

        // Embed the PNG image
        const embeddedImage = await pdfDoc.embedPng(arrayBuffer);

        // Dimensions
        let pageWidth = 595.27; // A4 Portrait
        let pageHeight = 841.89;

        if (pageSize === "letter") {
          pageWidth = 612;
          pageHeight = 792;
        }

        if (pageSize !== "fit" && orientation === "landscape") {
          const temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }

        if (pageSize === "fit") {
          pageWidth = img.width;
          pageHeight = img.height;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        let drawWidth = pageWidth;
        let drawHeight = pageHeight;

        if (pageSize !== "fit") {
          const imgRatio = img.width / img.height;
          const pageRatio = pageWidth / pageHeight;
          
          if (imgRatio > pageRatio) {
            // Width bound
            drawWidth = pageWidth - 40; // 20pt margin
            drawHeight = drawWidth / imgRatio;
          } else {
            // Height bound
            drawHeight = pageHeight - 40; // 20pt margin
            drawWidth = drawHeight * imgRatio;
          }
        }

        const x = (pageWidth - drawWidth) / 2;
        const y = (pageHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `images_converted_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError("Failed to convert images to PDF. Ensure your images are not corrupted.");
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
          Image to PDF Workspace
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
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImagesAdded(e.target.files)}
          />
          <Plus className="w-8 h-8 mb-3 text-foreground" />
          <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
            {isDragOver ? "Drop images here" : "Click to select or drag & drop images"}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2 uppercase text-center">
            Supports PNG, JPEG, WebP, SVG, and GIF (Local conversion)
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide">
            ⚠️ {error}
          </div>
        )}

        {/* Settings and file list */}
        {images.length > 0 && (
          <div className="space-y-6">
            {/* Options layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-black bg-background font-mono text-sm">
              <div className="space-y-2">
                <label htmlFor="page-size" className="block text-xs uppercase font-bold tracking-wide">
                  Page Dimensions
                </label>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as "a4" | "letter" | "fit")}
                  className="w-full p-2.5 border border-black bg-background focus:outline-none"
                >
                  <option value="a4">A4 (Standard document size)</option>
                  <option value="letter">Letter (US format)</option>
                  <option value="fit">Fit Image (Matches each image shape)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="orientation" className="block text-xs uppercase font-bold tracking-wide">
                  Page Orientation
                </label>
                <select
                  id="orientation"
                  value={orientation}
                  disabled={pageSize === "fit"}
                  onChange={(e) => setOrientation(e.target.value as "portrait" | "landscape")}
                  className="w-full p-2.5 border border-black bg-background focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            {/* Selected Images List */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Selected Images ({images.length})
              </h3>

              <div className="border border-black divide-y divide-black bg-background overflow-hidden">
                {images.map((item, index) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 bg-background">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Thumbnail preview */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewUrl}
                        alt="Preview"
                        className="w-12 h-12 object-cover border border-black shrink-0 bg-background"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                          {item.sizeStr}
                        </p>
                      </div>
                    </div>

                    {/* Actions (Reorder/Delete) */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveImage(index, "up")}
                        className="p-1.5 border border-black hover:bg-accent disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === images.length - 1}
                        onClick={() => moveImage(index, "down")}
                        className="p-1.5 border border-black hover:bg-accent disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(item.id)}
                        className="p-1.5 border border-black hover:bg-destructive hover:text-white transition-colors"
                        title="Remove Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Conversion action trigger button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Converting photos...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" /> Convert Images to PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
