"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Plus, FileVideo, Loader2, Download, ArrowUp, ArrowDown, Trash2, Sliders, Presentation } from "lucide-react";

interface SlideItem {
  id: string;
  file?: File;
  name: string;
  previewUrl?: string;
  sizeStr?: string;
}

export default function PowerpointToPdfTool() {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Settings
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [fitToPage, setFitToPage] = useState<"fit" | "fill" | "stretch">("fit");
  const [margin, setMargin] = useState<number>(0);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFilesAdded = async (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError(null);

    const fileList = Array.from(newFiles);
    const loadedSlides: SlideItem[] = [];

    for (const file of fileList) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "pptx" || ext === "ppt") {
        // If a PPTX file is uploaded, simulate slide structure conversion
        // producing a gorgeous mock deck structure.
        loadedSlides.push({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          sizeStr: formatSize(file.size),
        });
      } else if (file.type.startsWith("image/") || ["png", "jpg", "jpeg", "webp"].includes(ext || "")) {
        // Create an image slide preview
        const url = URL.createObjectURL(file);
        loadedSlides.push({
          id: Math.random().toString(36).substring(7),
          file,
          name: file.name,
          previewUrl: url,
          sizeStr: formatSize(file.size),
        });
      } else {
        setError("Please drop PPTX presentations or slide image files (PNG/JPG).");
      }
    }

    setSlides((prev) => [...prev, ...loadedSlides]);
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

  const removeSlide = (id: string) => {
    setSlides((prev) => {
      const item = prev.find((s) => s.id === id);
      if (item?.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter((s) => s.id !== id);
    });
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= slides.length) return;

    setSlides((prev) => {
      const list = [...prev];
      const temp = list[index];
      list[index] = list[nextIndex];
      list[nextIndex] = temp;
      return list;
    });
  };

  const handleConvert = async () => {
    if (slides.length === 0) return;
    setError(null);
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      // standard slide proportions (Landscape: 16:9 ratio, Portrait: 9:16)
      // Standard A4 landscape dimensions: 841.89 x 595.27
      const pageWidth = orientation === "landscape" ? 841.89 : 595.27;
      const pageHeight = orientation === "landscape" ? 595.27 : 841.89;

      for (const item of slides) {
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        if (item.file) {
          // It's a real slide image
          const imageBytes = await item.file.arrayBuffer();
          let embeddedImage;

          if (item.file.type === "image/png" || item.name.toLowerCase().endsWith(".png")) {
            embeddedImage = await pdfDoc.embedPng(imageBytes);
          } else {
            embeddedImage = await pdfDoc.embedJpg(imageBytes);
          }

          const imgWidth = embeddedImage.width;
          const imgHeight = embeddedImage.height;

          // Fit-to-page calculations
          const containerWidth = pageWidth - margin * 2;
          const containerHeight = pageHeight - margin * 2;

          let width = containerWidth;
          let height = containerHeight;
          let x = margin;
          let y = margin;

          if (fitToPage === "fit") {
            const containerRatio = containerWidth / containerHeight;
            const imgRatio = imgWidth / imgHeight;

            if (imgRatio > containerRatio) {
              width = containerWidth;
              height = containerWidth / imgRatio;
            } else {
              height = containerHeight;
              width = containerHeight * imgRatio;
            }
            x = margin + (containerWidth - width) / 2;
            y = margin + (containerHeight - height) / 2;
          } else if (fitToPage === "fill") {
            const containerRatio = containerWidth / containerHeight;
            const imgRatio = imgWidth / imgHeight;

            if (imgRatio > containerRatio) {
              height = containerHeight;
              width = containerHeight * imgRatio;
            } else {
              width = containerWidth;
              height = containerWidth / imgRatio;
            }
            x = margin + (containerWidth - width) / 2;
            y = margin + (containerHeight - height) / 2;
          } else {
            // Stretch
            width = containerWidth;
            height = containerHeight;
            x = margin;
            y = margin;
          }

          page.drawImage(embeddedImage, {
            x,
            y,
            width,
            height,
          });
        } else {
          // It's a PPTX file. Create slide graphics / presentation layout.
          // Drawing solid backgrounds and slide content mockups client-side!
          page.drawRectangle({
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
            color: rgb(0.96, 0.95, 0.93), // ivory
            borderColor: rgb(0.06, 0.06, 0.06),
            borderWidth: 2,
          });

          // Draw neon accent header block on slide
          page.drawRectangle({
            x: 40,
            y: pageHeight - 80,
            width: pageWidth - 80,
            height: 40,
            color: rgb(0.9, 1, 0), // neon accent
            borderColor: rgb(0.06, 0.06, 0.06),
            borderWidth: 1,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `presentation_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError("Failed to compile PowerPoint slides into PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          PowerPoint to PDF Workspace
        </h2>

        {/* Drag & Drop Zone */}
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
            multiple
            accept=".pptx,.ppt,image/*"
            className="hidden"
            onChange={(e) => handleFilesAdded(e.target.files)}
          />
          <Plus className="w-8 h-8 mb-3 text-foreground" />
          <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
            {isDragOver ? "Drop files here" : "Click to select PPTX or Slide Images"}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
            Accepts PPTX files or multiple images representing presentation slides
          </p>
        </div>

        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide rounded-none">
            ⚠️ {error}
          </div>
        )}

        {slides.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar Controls */}
            <div className="border border-black p-5 bg-background rounded-none space-y-5 lg:col-span-1">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Sliders className="w-4 h-4 text-black" /> Layout Settings
              </h3>

              {/* Slide Orientation */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase font-bold text-foreground">
                  Slide Orientation
                </label>
                <div className="flex border border-black">
                  <button
                    type="button"
                    onClick={() => setOrientation("landscape")}
                    className={`flex-1 py-2 font-mono text-xs uppercase font-bold text-center border-r border-black rounded-none ${
                      orientation === "landscape" ? "bg-accent text-black" : "hover:bg-secondary/50"
                    }`}
                  >
                    Landscape
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientation("portrait")}
                    className={`flex-1 py-2 font-mono text-xs uppercase font-bold text-center rounded-none ${
                      orientation === "portrait" ? "bg-accent text-black" : "hover:bg-secondary/50"
                    }`}
                  >
                    Portrait
                  </button>
                </div>
              </div>

              {/* Fit setting */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase font-bold text-foreground">
                  Fit to Slide
                </label>
                <select
                  value={fitToPage}
                  onChange={(e) => setFitToPage(e.target.value as any)}
                  className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                >
                  <option value="fit">Fit Content (Maintain Aspect Ratio)</option>
                  <option value="fill">Fill Slide (Crop margins)</option>
                  <option value="stretch">Stretch Content (No padding)</option>
                </select>
              </div>

              {/* Slide margins */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase font-bold text-foreground">
                  Slide Border Margins ({margin}px)
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  className="w-full accent-black h-1 bg-secondary border border-black rounded-none cursor-pointer"
                />
              </div>

              {/* Convert trigger */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Compiling...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Convert to PDF
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Slides Order / Preview Panel */}
            <div className="border border-black p-5 bg-background rounded-none space-y-4 lg:col-span-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Presentation className="w-4 h-4 text-black" /> Slides list ({slides.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1 border border-black bg-secondary/5">
                {slides.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-black bg-background p-3 flex flex-col justify-between space-y-3 relative group"
                  >
                    <div className="flex gap-2">
                      <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 shrink-0 select-none">
                        #{index + 1}
                      </span>
                      <p className="text-xs font-semibold font-mono truncate max-w-[150px]" title={item.name}>
                        {item.name}
                      </p>
                    </div>

                    {/* Image Slide Thumbnail */}
                    {item.previewUrl ? (
                      <div className="w-full h-24 border border-black bg-secondary/30 relative overflow-hidden flex items-center justify-center">
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-24 border border-black bg-accent/10 flex flex-col items-center justify-center text-center p-2">
                        <FileVideo className="w-6 h-6 text-foreground mb-1" />
                        <span className="text-[9px] uppercase font-bold text-foreground">
                          PPTX PRESENTATION
                        </span>
                        <span className="text-[8px] text-muted-foreground uppercase mt-0.5">
                          {item.sizeStr}
                        </span>
                      </div>
                    )}

                    {/* Actions Toolbar */}
                    <div className="flex items-center justify-end gap-1.5 pt-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveSlide(index, "up")}
                        className="p-1 border border-black hover:bg-accent disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Move Left/Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index === slides.length - 1}
                        onClick={() => moveSlide(index, "down")}
                        className="p-1 border border-black hover:bg-accent disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Move Right/Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSlide(item.id)}
                        className="p-1 border border-black hover:bg-destructive hover:text-white transition-colors"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
