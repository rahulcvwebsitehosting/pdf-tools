"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { loadPdfJs } from "@/lib/pdf-parser";
import { TrustBadge } from "@/components/trust-badge";
import {
  MousePointer, Type, Square, PenLine, StickyNote,
  Trash2, Download, Loader2, ChevronLeft, ChevronRight,
  Undo, Plus
} from "lucide-react";

type ToolMode = "select" | "text" | "rectangle" | "highlight" | "sticky";

interface Annot {
  id: string;
  type: AnnotType;
  pageIdx: number;
  x: number; y: number;
  w: number; h: number;
  content: string;
  color: string;
  fontSize?: number;
  fill?: string;
  opacity?: number;
}

type AnnotType = "text" | "rectangle" | "highlight" | "sticky";

const COLORS = ["#e11d48", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#000000"];

export default function EditPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [pageDims, setPageDims] = useState<{ w: number; h: number }[]>([]);
  const [curPage, setCurPage] = useState(0);
  const [annots, setAnnots] = useState<Annot[]>([]);
  const [tool, setTool] = useState<ToolMode>("select");
  const [selId, setSelId] = useState<string | null>(null);
  const [color, setColor] = useState("#e11d48");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [placeStart, setPlaceStart] = useState<{ x: number; y: number } | null>(null);

  const curAnnots = annots.filter(a => a.pageIdx === curPage);

  const loadPdf = async (f: File) => {
    setLoading(true);
    try {
      const pdfjsLib = await loadPdfJs();
      const buf = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const imgs: string[] = [];
      const dims: { w: number; h: number }[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width;
        canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, vp.width, vp.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        imgs.push(canvas.toDataURL("image/png"));
        dims.push({ w: vp.width, h: vp.height });
      }

      setPageImages(imgs);
      setPageDims(dims);
      setFile(f);
      setCurPage(0);
      setAnnots([]);
      setSelId(null);
    } catch (e) {
      console.error(e);
      alert("Failed to load PDF. The file may be corrupted or password-protected.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") loadPdf(f);
  }, []);

  const getPos = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tool === "select") return;
    const pos = getPos(e);
    const dim = pageDims[curPage];

    if (!dim) return;

    let newAnnot: Annot;

    switch (tool) {
      case "text":
        newAnnot = {
          id: Math.random().toString(36).slice(2),
          type: "text",
          pageIdx: curPage,
          x: pos.x, y: pos.y,
          w: 200, h: 32,
          content: "Text",
          color: "#000",
          fontSize: 16,
        };
        break;
      case "rectangle":
        newAnnot = {
          id: Math.random().toString(36).slice(2),
          type: "rectangle",
          pageIdx: curPage,
          x: pos.x - 40, y: pos.y - 30,
          w: 80, h: 60,
          content: "",
          color: color,
          fill: color + "20",
        };
        break;
      case "highlight":
        newAnnot = {
          id: Math.random().toString(36).slice(2),
          type: "highlight",
          pageIdx: curPage,
          x: pos.x - 50, y: pos.y - 8,
          w: 100, h: 16,
          content: "",
          color: "#f59e0b",
          fill: "#f59e0b40",
          opacity: 0.4,
        };
        break;
      case "sticky":
        newAnnot = {
          id: Math.random().toString(36).slice(2),
          type: "sticky",
          pageIdx: curPage,
          x: pos.x, y: pos.y,
          w: 24, h: 24,
          content: "Add a note...",
          color: color,
          fill: color,
        };
        break;
      default:
        return;
    }

    setAnnots(prev => [...prev, newAnnot]);
    setSelId(newAnnot.id);
    setTool("select");
  };

  const handleAnnotClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tool === "select") {
      setSelId(id === selId ? null : id);
    }
  };

  const updateAnnot = (id: string, upd: Partial<Annot>) => {
    setAnnots(prev => prev.map(a => a.id === id ? { ...a, ...upd } : a));
  };

  const deleteSelected = () => {
    if (selId) {
      setAnnots(prev => prev.filter(a => a.id !== selId));
      setSelId(null);
    }
  };

  const handleSave = async () => {
    if (!file) return;
    setSaving(true);
    try {
      const buf = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      for (const a of annots) {
        const page = pdfDoc.getPage(a.pageIdx);
        const { width, height } = page.getSize();

        // image is rendered at 1.5x scale; map back
        const sx = width / pageDims[a.pageIdx].w;
        const sy = height / pageDims[a.pageIdx].h;

        const px = a.x * sx;
        const py = height - a.y * sy - a.h * sy;

        switch (a.type) {
          case "text":
            page.drawText(a.content, {
              x: px,
              y: py,
              size: (a.fontSize || 16) * sx,
              font,
              color: rgb(0, 0, 0),
            });
            break;
          case "rectangle":
            page.drawRectangle({
              x: px,
              y: py,
              width: a.w * sx,
              height: a.h * sy,
              borderColor: hexToRgb(a.color),
              borderWidth: 2,
              color: a.fill ? hexToRgb(a.fill) : undefined,
              opacity: a.opacity,
            });
            break;
          case "highlight":
            page.drawRectangle({
              x: px,
              y: py,
              width: a.w * sx,
              height: a.h * sy,
              color: hexToRgb("#f59e0b"),
              opacity: 0.3,
            });
            break;
          case "sticky":
            page.drawRectangle({
              x: px,
              y: py,
              width: 20 * sx,
              height: 20 * sy,
              color: hexToRgb(a.color),
              borderColor: hexToRgb(a.color),
              borderWidth: 1,
            });
            break;
        }
      }

      const out = new Uint8Array(await pdfDoc.save());
      const blob = new Blob([out], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `edited_${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to save edited PDF.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />

      {!file ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed flex flex-col items-center justify-center py-16 px-4 transition-colors cursor-pointer ${dragOver ? "border-accent bg-accent/5" : "border-black bg-background"}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={e => e.target.files?.[0] && loadPdf(e.target.files[0])} />
          <Plus className="w-10 h-10 mb-4 text-foreground" />
          <p className="font-mono text-sm font-bold uppercase tracking-wider">Select PDF file</p>
          <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">or drop PDF here</p>
          {loading && <Loader2 className="w-5 h-5 mt-4 animate-spin" />}
        </div>
      ) : (
        <div className="editorial-panel p-4 sm:p-6 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-black">
            <ToolBtn icon={<MousePointer size={16} />} label="Select" active={tool === "select"} onClick={() => setTool("select")} />
            <ToolBtn icon={<Type size={16} />} label="Text" active={tool === "text"} onClick={() => setTool("text")} />
            <ToolBtn icon={<Square size={16} />} label="Shape" active={tool === "rectangle"} onClick={() => setTool("rectangle")} />
            <ToolBtn icon={<PenLine size={16} />} label="Highlight" active={tool === "highlight"} onClick={() => setTool("highlight")} />
            <ToolBtn icon={<StickyNote size={16} />} label="Sticky" active={tool === "sticky"} onClick={() => setTool("sticky")} />

            <span className="w-px h-6 bg-black/20 mx-2" />

            <div className="flex items-center gap-1">
              {COLORS.map(c => (
                <button key={c} className={`w-5 h-5 rounded-full border-2 ${color === c ? "border-black" : "border-transparent"}`} style={{ backgroundColor: c }} onClick={() => setColor(c)} />
              ))}
            </div>

            <span className="w-px h-6 bg-black/20 mx-2" />

            <ToolBtn icon={<Trash2 size={16} />} label="Delete" onClick={deleteSelected} disabled={!selId} />

            {/* Page nav */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                className="p-1.5 border border-black hover:bg-accent transition-colors disabled:opacity-30"
                disabled={curPage === 0}
                onClick={() => setCurPage(p => p - 1)}
              >
                <ChevronLeft size={14} />
              </button>
              <span className="font-mono text-xs font-bold min-w-[60px] text-center">
                Page {curPage + 1} / {pageImages.length}
              </span>
              <button
                className="p-1.5 border border-black hover:bg-accent transition-colors disabled:opacity-30"
                disabled={curPage === pageImages.length - 1}
                onClick={() => setCurPage(p => p + 1)}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Canvas area */}
          <div className="relative overflow-auto border border-black bg-[#e8e8e8] flex justify-center p-4">
            <div
              ref={containerRef}
              className="relative shadow-xl"
              style={{ position: "relative", cursor: tool === "select" ? "default" : "crosshair" }}
              onClick={handleCanvasClick}
            >
              {pageImages[curPage] && (
                <img src={pageImages[curPage]} alt={`Page ${curPage + 1}`} className="block max-w-full" draggable={false} />
              )}

              {/* Annotation overlay */}
              {curAnnots.map(a => (
                <div
                  key={a.id}
                  className={`absolute cursor-pointer ${selId === a.id ? "ring-2 ring-blue-500" : ""}`}
                  style={{
                    left: a.x, top: a.y,
                    width: a.w, height: a.h,
                    ...(a.type === "text" ? {
                      border: "1px dashed #999",
                      background: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 4px",
                      fontFamily: "system-ui",
                      fontSize: a.fontSize || 16,
                      color: a.color,
                    } : {}),
                    ...(a.type === "rectangle" ? {
                      border: `2px solid ${a.color}`,
                      background: a.fill || "transparent",
                      borderRadius: "2px",
                    } : {}),
                    ...(a.type === "highlight" ? {
                      background: a.fill || "#f59e0b40",
                      borderRadius: "2px",
                      pointerEvents: "auto",
                    } : {}),
                    ...(a.type === "sticky" ? {
                      background: a.fill,
                      borderRadius: "50% 50% 50% 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: "#fff",
                      fontWeight: "bold",
                    } : {}),
                  }}
                  onClick={(e) => handleAnnotClick(a.id, e)}
                  onDoubleClick={() => {
                    if (a.type === "text") {
                      const text = prompt("Edit text:", a.content);
                      if (text !== null) updateAnnot(a.id, { content: text });
                    }
                    if (a.type === "sticky") {
                      const text = prompt("Edit note:", a.content);
                      if (text !== null) updateAnnot(a.id, { content: text });
                    }
                  }}
                >
                  {a.type === "sticky" && <span>N</span>}
                  {a.type === "text" && <span className="truncate">{a.content}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex justify-between items-center pt-2">
            <button
              className="p-2 border border-black hover:bg-accent transition-colors text-xs font-mono font-bold uppercase tracking-wider"
              onClick={() => { setFile(null); setPageImages([]); setAnnots([]); }}
            >
              <Undo size={14} className="inline mr-1" /> New File
            </button>

            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={saving || annots.length === 0}
            >
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Download size={16} /> Download Edited PDF</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolBtn({ icon, label, active, onClick, disabled }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className={`flex items-center gap-1.5 px-2.5 py-1.5 border text-xs font-mono font-bold uppercase tracking-wider transition-colors ${active ? "bg-accent border-black" : "border-black/40 hover:border-black"} ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {icon} {label}
    </button>
  );
}

function hexToRgb(hex: string) {
  const v = parseInt(hex.replace("#", ""), 16);
  return rgb(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}
