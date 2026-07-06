"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Loader2, Download, AlignLeft, Settings, FileText } from "lucide-react";

export default function WordToPdfTool() {
  const [text, setText] = useState<string>(
    `# Project Report: Neo-Brutalist Architecture

## Introduction
This report outlines the technical and aesthetic choices for the upcoming Next.js platform. By combining client-side sandbox utilities with strict neo-brutalist designs, we can offer users optimal privacy and speed.

## Key Goals
- **Local Sandbox Execution**: All file mutations (merging, watermark overlaying, page numbering) occur strictly in browser memory.
- **Obsidian Black Accents**: High contrast design system with solid 1px borders, warm cream background, and neon highlights.
- **Zero Account Registration**: 100% free online conversion without email inputs or paywalls.

## Technical Framework
We use pdf-lib for processing documents on the client side. This eliminates server hops, reducing document leaks to zero. All assets are secure and compliant with corporate privacy guidelines.`
  );
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Styling Options
  const [fontSize, setFontSize] = useState<number>(12);
  const [margin, setMargin] = useState<number>(40); // 20: Small, 40: Medium, 60: Large

  const handleGeneratePdf = async () => {
    if (!text.trim()) {
      setError("Please write or paste some text first.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pageWidth = 595.27; // A4 standard width
      const pageHeight = 841.89; // A4 standard height
      const printableWidth = pageWidth - margin * 2;

      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let currentY = pageHeight - margin;

      // Text wrapping function
      const wrapLine = (txt: string, maxWidth: number, size: number, selectedFont: any): string[] => {
        const words = txt.split(/\s+/);
        const wrappedLines: string[] = [];
        let currentLine = "";

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = selectedFont.widthOfTextAtSize(testLine, size);
          if (testWidth > maxWidth) {
            if (currentLine) {
              wrappedLines.push(currentLine);
            }
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          wrappedLines.push(currentLine);
        }
        return wrappedLines;
      };

      // Split text into lines/paragraphs
      const paragraphs = text.split("\n");

      for (let p of paragraphs) {
        p = p.trim();
        if (!p) {
          // Empty line, add a paragraph break
          currentY -= fontSize * 1.2;
          continue;
        }

        let isH1 = false;
        let isH2 = false;
        let isBullet = false;
        let content = p;

        if (p.startsWith("# ")) {
          isH1 = true;
          content = p.substring(2);
        } else if (p.startsWith("## ")) {
          isH2 = true;
          content = p.substring(3);
        } else if (p.startsWith("- ") || p.startsWith("* ")) {
          isBullet = true;
          content = p.substring(2);
        }

        // Font sizes & styles based on markdown structure
        let currentFontSize = fontSize;
        let currentFont = font;
        let lineSpacing = fontSize * 1.4;

        if (isH1) {
          currentFontSize = fontSize * 1.8;
          currentFont = boldFont;
          lineSpacing = currentFontSize * 1.4;
          currentY -= fontSize * 0.8; // extra top margin
        } else if (isH2) {
          currentFontSize = fontSize * 1.4;
          currentFont = boldFont;
          lineSpacing = currentFontSize * 1.4;
          currentY -= fontSize * 0.6; // extra top margin
        } else if (isBullet) {
          currentFontSize = fontSize;
          currentFont = font;
        }

        const indent = isBullet ? 15 : 0;
        const availableWidth = printableWidth - indent;

        // Wrap the block content
        const wrappedLines = wrapLine(content, availableWidth, currentFontSize, currentFont);

        for (let idx = 0; idx < wrappedLines.length; idx++) {
          const line = wrappedLines[idx];

          // Check page overflow
          if (currentY - lineSpacing < margin) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - margin;
          }

          if (isBullet && idx === 0) {
            // Draw bullet marker
            currentPage.drawText("•", {
              x: margin,
              y: currentY - currentFontSize,
              size: currentFontSize,
              font: boldFont,
              color: rgb(0.1, 0.1, 0.1),
            });
          }

          currentPage.drawText(line, {
            x: margin + indent,
            y: currentY - currentFontSize,
            size: currentFontSize,
            font: currentFont,
            color: rgb(0.06, 0.06, 0.06),
          });

          currentY -= lineSpacing;
        }

        // Add paragraph spacing at end of block
        currentY -= fontSize * 0.4;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `document_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError("Failed to convert document to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Word & Text to PDF Converter Workspace
        </h2>

        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide rounded-none">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main text editor */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <label className="font-mono text-xs uppercase font-bold text-muted-foreground flex items-center gap-1.5">
              <AlignLeft className="w-4 h-4 text-black" /> Document Editor (Markdown Supported)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="editorial-textarea flex-1 min-h-[350px] outline-none"
              placeholder="Start writing or paste your document text here..."
            />
            <p className="font-mono text-[10px] text-muted-foreground uppercase">
              Supports basic heading tags (# H1, ## H2) and bullet points (- list).
            </p>
          </div>

          {/* Configuration sidebar */}
          <div className="lg:col-span-1 border border-black p-5 bg-background rounded-none space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 border-b border-black pb-2">
                <Settings className="w-4 h-4 text-black" /> Layout & Typography
              </h3>

              {/* Font Size Selector */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase font-bold text-foreground">
                  Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                >
                  <option value={10}>10px (Compact)</option>
                  <option value={12}>12px (Standard)</option>
                  <option value={14}>14px (Readable)</option>
                  <option value={16}>16px (Large)</option>
                </select>
              </div>

              {/* Margin Selector */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase font-bold text-foreground">
                  Page Margins
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                >
                  <option value={20}>Small (20px)</option>
                  <option value={40}>Medium (40px)</option>
                  <option value={60}>Large (60px)</option>
                </select>
              </div>

              {/* Page layout hint */}
              <div className="p-4 border border-black bg-secondary/20 font-mono text-[10px] space-y-1 rounded-none">
                <span className="font-bold block uppercase">Output Specs</span>
                <span className="block">• Standard A4 Page Format</span>
                <span className="block">• Automatic word wrapping</span>
                <span className="block">• Smart page break generation</span>
              </div>
            </div>

            {/* Generate Trigger */}
            <div className="pt-4 border-t border-black">
              <button
                type="button"
                onClick={handleGeneratePdf}
                disabled={isProcessing}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" /> Generate PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
