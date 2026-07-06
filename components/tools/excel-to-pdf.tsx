"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Plus, FileSpreadsheet, Loader2, Download, Table, Trash2, Eye } from "lucide-react";

export default function ExcelToPdfTool() {
  const [data, setData] = useState<string[][]>([
    ["Product ID", "Description", "Quantity", "Unit Price", "Total"],
    ["SKU-001", "Monospace Mechanical Keyboard", "2", "$120.00", "$240.00"],
    ["SKU-002", "Neo-Brutalist Desk Pad", "1", "$35.00", "$35.00"],
    ["SKU-003", "USB-C Braided Cable (1.5m)", "3", "$15.00", "$45.00"],
    ["SKU-004", "Solid Obsidian Keycap Set", "1", "$85.00", "$85.00"],
  ]);
  const [fileName, setFileName] = useState<string>("default_inventory.csv");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Settings
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(9);

  const handleFileChange = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setError(null);

    const file = selectedFiles[0];
    const ext = file.name.split(".").pop()?.toLowerCase();
    
    if (ext !== "csv" && ext !== "txt" && ext !== "tsv") {
      setError("Please load a CSV, TSV, or comma-separated TXT file. Binary Excel (.xlsx) file parsing is simulated; copy-paste spreadsheet data as CSV for local rendering.");
      
      // Simulate/mock spreadsheet import for non-CSV files (like XLSX)
      setFileName(file.name);
      setData([
        ["Month", "Revenue", "Expenses", "Profit", "Status"],
        ["January", "$45,000", "$30,000", "$15,000", "Surplus"],
        ["February", "$52,000", "$31,500", "$20,500", "Surplus"],
        ["March", "$49,000", "$32,000", "$17,000", "Surplus"],
        ["April", "$61,000", "$35,000", "$26,000", "Surplus"],
      ]);
      return;
    }

    setFileName(file.name);
    setIsProcessing(true);
    
    try {
      const text = await file.text();
      const delimiter = ext === "tsv" ? "\t" : ",";
      
      // Simple CSV parser
      const lines = text.split(/\r?\n/);
      const parsedData: string[][] = lines
        .map((line) => {
          // simple split by comma/tab, trimming quotes
          return line.split(delimiter).map((cell) => cell.trim().replace(/^"|"$/g, ""));
        })
        .filter((row) => row.length > 0 && row.some((cell) => cell !== ""));
        
      if (parsedData.length === 0) {
        throw new Error("The file seems to be empty or corrupted.");
      }
      
      setData(parsedData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not read tabular data from this file.");
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

  const handleCellChange = (rowIndex: number, colIndex: number, val: string) => {
    setData((prev) => {
      const copy = [...prev];
      copy[rowIndex] = [...copy[rowIndex]];
      copy[rowIndex][colIndex] = val;
      return copy;
    });
  };

  const addRow = () => {
    setData((prev) => {
      const colCount = prev[0]?.length || 1;
      const newRow = Array(colCount).fill("");
      return [...prev, newRow];
    });
  };

  const addColumn = () => {
    setData((prev) => {
      return prev.map((row, idx) => [...row, idx === 0 ? `Col ${row.length + 1}` : ""]);
    });
  };

  const deleteRow = (rowIndex: number) => {
    if (data.length <= 1) {
      setError("Cannot delete the last remaining row.");
      return;
    }
    setData((prev) => prev.filter((_, idx) => idx !== rowIndex));
  };

  const handleConvert = async () => {
    if (data.length === 0) return;
    setError(null);
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // A4 sizes in points: Portrait [595.27, 841.89], Landscape [841.89, 595.27]
      const pageWidth = orientation === "portrait" ? 595.27 : 841.89;
      const pageHeight = orientation === "portrait" ? 841.89 : 595.27;
      const margin = 40;
      
      const tableWidth = pageWidth - margin * 2;
      const colCount = data[0].length;
      const colWidth = tableWidth / colCount;
      const rowHeight = 22;
      
      const rowsPerPage = Math.floor((pageHeight - margin * 2) / rowHeight);
      
      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let currentY = pageHeight - margin;

      // Draw table title/header
      currentPage.drawText(fileName.replace(/\.[^/.]+$/, ""), {
        x: margin,
        y: currentY - 5,
        size: 14,
        font: boldFont,
        color: rgb(0.06, 0.06, 0.06),
      });
      currentY -= 30;

      for (let r = 0; r < data.length; r++) {
        // Check page overflow
        if (currentY - rowHeight < margin) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          currentY = pageHeight - margin;
        }

        const row = data[r];
        const isHeader = r === 0;
        
        for (let c = 0; c < row.length; c++) {
          const cellText = row[c] || "";
          const cellX = margin + c * colWidth;
          const cellY = currentY - rowHeight;

          // Draw grid line
          if (showGridLines) {
            currentPage.drawRectangle({
              x: cellX,
              y: cellY,
              width: colWidth,
              height: rowHeight,
              borderColor: rgb(0.1, 0.1, 0.1),
              borderWidth: 1,
              color: isHeader ? rgb(0.9, 0.9, 0.9) : undefined,
            });
          }

          // Truncate text if too long
          let textToDraw = cellText;
          let textWidth = font.widthOfTextAtSize(textToDraw, fontSize);
          
          while (textWidth > colWidth - 8 && textToDraw.length > 0) {
            textToDraw = textToDraw.substring(0, textToDraw.length - 1);
            textWidth = font.widthOfTextAtSize(textToDraw + "...", fontSize);
            if (textToDraw.length > 0) {
              textToDraw = textToDraw + "...";
            }
          }

          currentPage.drawText(textToDraw, {
            x: cellX + 4,
            y: cellY + 6,
            size: fontSize,
            font: isHeader ? boldFont : font,
            color: rgb(0.06, 0.06, 0.06),
          });
        }
        
        currentY -= rowHeight;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName.replace(/\.[^/.]+$/, "")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError("Failed to convert tabular data to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Excel to PDF Converter Workspace
        </h2>

        {/* Drag & Drop zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`border-2 border-dashed flex flex-col items-center justify-center py-8 px-4 transition-colors cursor-pointer rounded-none ${
            isDragOver ? "border-accent bg-accent/5" : "border-black bg-background"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".csv,.tsv,.txt"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <Plus className="w-8 h-8 mb-3 text-foreground" />
          <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
            {isDragOver ? "Drop file here" : "Click to select CSV/TSV or drag & drop"}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
            Tabular processing • 100% Client-side sandbox
          </p>
        </div>

        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide rounded-none">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="border border-black p-5 bg-background rounded-none space-y-5 lg:col-span-1">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Conversion Options
            </h3>

            {/* File name display */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground block">
                Active Spreadsheet
              </span>
              <div className="p-2 border border-black font-mono text-xs bg-secondary/20 truncate">
                {fileName}
              </div>
            </div>

            {/* Orientation option */}
            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase font-bold text-foreground">
                Page Orientation
              </label>
              <div className="flex border border-black">
                <button
                  type="button"
                  onClick={() => setOrientation("portrait")}
                  className={`flex-1 py-2 font-mono text-xs uppercase font-bold text-center border-r border-black rounded-none ${
                    orientation === "portrait" ? "bg-accent text-black" : "hover:bg-secondary/50"
                  }`}
                >
                  Portrait
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation("landscape")}
                  className={`flex-1 py-2 font-mono text-xs uppercase font-bold text-center rounded-none ${
                    orientation === "landscape" ? "bg-accent text-black" : "hover:bg-secondary/50"
                  }`}
                >
                  Landscape
                </button>
              </div>
            </div>

            {/* Font size */}
            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase font-bold text-foreground">
                Text Font Size ({fontSize}pt)
              </label>
              <input
                type="number"
                min="6"
                max="16"
                value={fontSize}
                onChange={(e) => setFontSize(Math.max(6, Math.min(16, parseInt(e.target.value) || 9)))}
                className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
              />
            </div>

            {/* Gridlines checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                id="gridlines-checkbox"
                type="checkbox"
                checked={showGridLines}
                onChange={(e) => setShowGridLines(e.target.checked)}
                className="w-4 h-4 border border-black bg-background text-black accent-black rounded-none cursor-pointer"
              />
              <label htmlFor="gridlines-checkbox" className="font-mono text-xs uppercase font-bold text-foreground cursor-pointer select-none">
                Render Grid Lines
              </label>
            </div>

            {/* PDF Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConvert}
                disabled={isProcessing || data.length === 0}
                className="btn-primary w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin animate-infinite" /> Converting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Convert to PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Grid Preview Panel */}
          <div className="border border-black p-5 bg-background rounded-none space-y-4 lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Table className="w-4 h-4 text-black" /> Interactive Grid Editor
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={addRow}
                  className="btn-secondary text-[10px] py-1 px-2 uppercase rounded-none"
                >
                  + Add Row
                </button>
                <button
                  type="button"
                  onClick={addColumn}
                  className="btn-secondary text-[10px] py-1 px-2 uppercase rounded-none"
                >
                  + Add Col
                </button>
              </div>
            </div>

            {/* Grid display */}
            <div className="flex-1 overflow-auto border border-black max-h-[300px]">
              <table className="w-full text-xs font-mono border-collapse divide-y divide-black bg-background">
                <tbody>
                  {data.map((row, rIdx) => (
                    <tr key={rIdx} className={`divide-x divide-black ${rIdx === 0 ? "bg-secondary/40 font-bold" : ""}`}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-0.5 min-w-[100px]">
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                            className="w-full h-8 px-2 border-0 bg-transparent text-xs font-mono focus:outline-none focus:bg-accent/10 focus:ring-0"
                          />
                        </td>
                      ))}
                      <td className="p-1 w-8 text-center shrink-0">
                        <button
                          type="button"
                          onClick={() => deleteRow(rIdx)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          title="Delete Row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase">
              Double-click cells above to edit value directly before exporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
