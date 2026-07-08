"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { loadPdfJs } from "@/lib/pdf-parser";
import { TrustBadge } from "@/components/trust-badge";
import {
  MousePointer, Type, Image, Pencil, Square, PenLine,
  Trash2, Download, Loader2, ChevronLeft, ChevronRight,
  Undo, Plus, Minus, Palette
} from "lucide-react";

type ToolMode = "select" | "text" | "draw" | "image" | "shape" | "highlight";

interface Point { x: number; y: number; }

interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  pageIdx: number;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number; y: number;
  w: number; h: number;
  fontSize: number;
  pageIdx: number;
  isNew: boolean;
}

interface ImgOverlay {
  id: string;
  dataUrl: string;
  x: number; y: number;
  w: number; h: number;
  pageIdx: number;
}

interface ShapeOverlay {
  id: string;
  type: "rect" | "ellipse";
  x: number; y: number;
  w: number; h: number;
  color: string;
  fill: string;
  pageIdx: number;
}

type AnnotItem = { kind: "stroke"; val: Stroke } | { kind: "text"; val: TextOverlay } | { kind: "image"; val: ImgOverlay } | { kind: "shape"; val: ShapeOverlay };

const COLORS = ["#e11d48", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#000000", "#ffffff"];
const BRUSH_SIZES = [2, 4, 6, 10];

export default function EditPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [pageDims, setPageDims] = useState<{ w: number; h: number }[]>([]);
  const [curPage, setCurPage] = useState(0);
  const [annots, setAnnots] = useState<AnnotItem[]>([]);
  const [tool, setTool] = useState<ToolMode>("select");
  const [selId, setSelId] = useState<string | null>(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [curStroke, setCurStroke] = useState<Point[]>([]);
  const [dragging, setDragging] = useState<{ id: string; kind: string; ox: number; oy: number } | null>(null);
  const [editingText, setEditingText] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const curPageAnnots = annots.filter(a => {
    if (a.kind === "stroke") return a.val.pageIdx === curPage;
    if (a.kind === "text") return a.val.pageIdx === curPage;
    if (a.kind === "image") return a.val.pageIdx === curPage;
    if (a.kind === "shape") return a.val.pageIdx === curPage;
    return false;
  });

  // ── PDF Loading ──
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
        const scale = 1.5;
        const vp = page.getViewport({ scale });
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

  // ── Redraw canvas when strokes change ──
  useEffect(() => {
    const cvs = drawCanvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const pageStrokes: Stroke[] = annots.filter(a => a.kind === "stroke" && a.val.pageIdx === curPage).map(a => a.val as Stroke);
    for (const s of pageStrokes) {
      if (s.points.length < 2) continue;
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    }
    // draw current stroke
    if (curStroke.length > 1 && isDrawing) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(curStroke[0].x, curStroke[0].y);
      for (let i = 1; i < curStroke.length; i++) {
        ctx.lineTo(curStroke[i].x, curStroke[i].y);
      }
      ctx.stroke();
    }
  }, [annots, curPage, curStroke, isDrawing, color, brushSize]);

  // ── Canvas resize ──
  useEffect(() => {
    const cvs = drawCanvasRef.current;
    if (!cvs || !pageDims[curPage]) return;
    const parent = cvs.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (cvs.width !== rect.width || cvs.height !== rect.height) {
      cvs.width = rect.width;
      cvs.height = rect.height;
    }
  }, [pageDims, curPage, pageImages]);

  // ── Coordinate helpers ──
  const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = drawCanvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const findAnnot = (px: number, py: number): { item: AnnotItem; id: string } | null => {
    for (const item of curPageAnnots) {
      const v = "val" in item ? item.val : null;
      if (!v) continue;
      const a = v as any;
      if (px >= a.x && px <= a.x + a.w && py >= a.y && py <= a.y + a.h) {
        return { item, id: a.id };
      }
    }
    return null;
  };

  // ── Drawing handlers ──
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (tool !== "draw") return;
    const pos = getCanvasPos(e);
    setIsDrawing(true);
    setCurStroke([pos]);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool !== "draw") return;
    const pos = getCanvasPos(e);
    setCurStroke(prev => [...prev, pos]);
  };

  const handlePointerUp = () => {
    if (!isDrawing || curStroke.length < 2) {
      setIsDrawing(false);
      setCurStroke([]);
      return;
    }
    const stroke: Stroke = {
      id: Math.random().toString(36).slice(2),
      points: [...curStroke],
      color,
      width: brushSize,
      pageIdx: curPage,
    };
    setAnnots(prev => [...prev, { kind: "stroke" as const, val: stroke }]);
    setIsDrawing(false);
    setCurStroke([]);
  };

  // ── Canvas click for text/image/shape placement ──
  const handleCanvasClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (tool === "draw") return;
    if (tool === "select") {
      const pos = getCanvasPos(e);
      const hit = findAnnot(pos.x, pos.y);
      setSelId(hit ? hit.id : null);
      if (hit) {
        const v = hit.item.val as any;
        if (hit.item.kind === "text" && v.isNew) {
          setEditingText(hit.id);
        }
      }
      return;
    }
    const pos = getCanvasPos(e);
    const dim = pageDims[curPage];
    if (!dim) return;

    switch (tool) {
      case "text": {
        const id = Math.random().toString(36).slice(2);
        setAnnots(prev => [...prev, { kind: "text", val: { id, text: "Type here", x: pos.x, y: pos.y - 14, w: 160, h: 28, fontSize: 16, pageIdx: curPage, isNew: true } }]);
        setSelId(id);
        setEditingText(id);
        setTool("select");
        break;
      }
      case "image": {
        imgInputRef.current?.click();
        break;
      }
      case "shape": {
        const id = Math.random().toString(36).slice(2);
        setAnnots(prev => [...prev, { kind: "shape", val: { id, type: "rect", x: pos.x - 40, y: pos.y - 30, w: 80, h: 60, color, fill: color + "18", pageIdx: curPage } }]);
        setSelId(id);
        setTool("select");
        break;
      }
      case "highlight": {
        const id = Math.random().toString(36).slice(2);
        setAnnots(prev => [...prev, { kind: "shape", val: { id, type: "rect", x: pos.x - 50, y: pos.y - 8, w: 100, h: 16, color: "#f59e0b", fill: "#f59e0b40", pageIdx: curPage } }]);
        setSelId(id);
        setTool("select");
        break;
      }
    }
  };

  // ── Image upload handler ──
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const id = Math.random().toString(36).slice(2);
      setAnnots(prev => [...prev, { kind: "image", val: { id, dataUrl: ev.target?.result as string, x: 50, y: 50, w: 200, h: 200 * (f.type.includes("png") ? 1 : 0.75), pageIdx: curPage } }]);
      setSelId(id);
      setTool("select");
    };
    reader.readAsDataURL(f);
    e.target.value = "";
  };

  // ── Delete selected ──
  const deleteSelected = () => {
    if (!selId) return;
    setAnnots(prev => prev.filter(a => {
      const v = a.val as any;
      return v.id !== selId;
    }));
    setSelId(null);
  };

  // ── Undo last annotation ──
  const undoLast = () => {
    setAnnots(prev => prev.slice(0, -1));
  };

  // ── Save / Export ──
  const handleSave = async () => {
    if (!file) return;
    setSaving(true);
    try {
      const buf = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const pageAnnots = annots;

      for (const item of pageAnnots) {
        const v = item.val as any;
        const page = pdfDoc.getPage(v.pageIdx ?? 0);
        const { width, height } = page.getSize();
        const imgW = pageDims[v.pageIdx ?? 0]?.w ?? width;
        const imgH = pageDims[v.pageIdx ?? 0]?.h ?? height;
        const sx = width / imgW;
        const sy = height / imgH;

        if (item.kind === "text") {
          const t = v as TextOverlay;
          page.drawText(t.text, {
            x: t.x * sx,
            y: height - t.y * sy - t.h * sy,
            size: t.fontSize * sx,
            font,
            color: rgb(0, 0, 0),
          });
        } else if (item.kind === "shape") {
          const s = v as ShapeOverlay;
          const px = s.x * sx;
          const py = height - s.y * sy - s.h * sy;
          const pw = s.w * sx;
          const ph = s.h * sy;
          if (s.type === "rect") {
            page.drawRectangle({
              x: px, y: py, width: pw, height: ph,
              borderColor: hexToRgb(s.color),
              borderWidth: 2,
              color: hexToRgb(s.fill),
            });
          } else {
            page.drawEllipse({
              x: px + pw / 2, y: py + ph / 2,
              xScale: pw / 2, yScale: ph / 2,
              borderColor: hexToRgb(s.color),
              borderWidth: 2,
              color: hexToRgb(s.fill),
            });
          }
        } else if (item.kind === "image") {
          const im = v as ImgOverlay;
          let img;
          try {
            img = im.dataUrl.startsWith("data:image/png")
              ? await pdfDoc.embedPng(im.dataUrl)
              : await pdfDoc.embedJpg(im.dataUrl);
          } catch { continue; }
          page.drawImage(img, {
            x: im.x * sx,
            y: height - im.y * sy - im.h * sy,
            width: im.w * sx,
            height: im.h * sy,
          });
        } else if (item.kind === "stroke") {
          const st = v as Stroke & { pageIdx: number };
          if (st.points.length < 2) continue;
          const pathData = st.points.map((p, i) =>
            i === 0 ? `M ${p.x * sx} ${imgH * sy - p.y * sy}` : `L ${p.x * sx} ${imgH * sy - p.y * sy}`
          ).join(" ");
          page.drawSvgPath(pathData, {
            borderColor: hexToRgb(st.color),
            borderWidth: st.width * sx,
          });
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

  // ── Drop zone ──
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") loadPdf(f);
  }, []);

  // ── Render overlays (text, shapes, images) ──
  const renderOverlays = () => {
    return curPageAnnots.map(item => {
      const v = item.val as any;
      const isSel = v.id === selId;
      const ring = isSel ? "ring-2 ring-blue-500 z-10" : "z-0";

      if (item.kind === "text") {
        const t = v as TextOverlay;
        const isEditing = editingText === t.id;
        return (
          <div
            key={"t-" + t.id}
            className={`absolute ${ring}`}
            style={{ left: t.x, top: t.y, width: t.w, height: t.h, cursor: "move" }}
            onPointerDown={(e) => {
              if (tool === "select") {
                setSelId(t.id);
                setEditingText(t.id);
                const r = containerRef.current?.getBoundingClientRect();
                if (r) setDragging({ id: t.id, kind: "text", ox: e.clientX - r.left - t.x, oy: e.clientY - r.top - t.y });
              }
            }}
          >
            {isEditing ? (
              <input
                autoFocus
                defaultValue={t.text}
                className="w-full h-full bg-transparent border border-dashed border-blue-400 outline-none px-1 font-sans"
                style={{ fontSize: t.fontSize }}
                onBlur={(ev) => {
                  setAnnots(prev => prev.map(a => {
                    if ((a.val as any).id === t.id) return { ...a, val: { ...(a.val as any), text: ev.target.value } };
                    return a;
                  }));
                  setEditingText(null);
                }}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") { (ev.target as HTMLInputElement).blur(); }
                }}
              />
            ) : (
              <span className="block w-full h-full px-1 font-sans truncate" style={{ fontSize: t.fontSize, lineHeight: `${t.h}px` }}>{t.text}</span>
            )}
          </div>
        );
      }

      if (item.kind === "shape") {
        const s = v as ShapeOverlay;
        return (
          <div
            key={"s-" + s.id}
            className={`absolute ${ring}`}
            style={{
              left: s.x, top: s.y, width: s.w, height: s.h,
              border: `2px solid ${s.color}`,
              background: s.fill || "transparent",
              borderRadius: s.type === "ellipse" ? "50%" : "2px",
              cursor: "move",
            }}
            onPointerDown={(e) => {
              if (tool === "select") {
                setSelId(s.id);
                const r = containerRef.current?.getBoundingClientRect();
                if (r) setDragging({ id: s.id, kind: "shape", ox: e.clientX - r.left - s.x, oy: e.clientY - r.top - s.y });
              }
            }}
          />
        );
      }

      if (item.kind === "image") {
        const im = v as ImgOverlay;
        return (
          <div
            key={"i-" + im.id}
            className={`absolute ${ring}`}
            style={{ left: im.x, top: im.y, width: im.w, height: im.h, cursor: "move" }}
            onPointerDown={(e) => {
              if (tool === "select") {
                setSelId(im.id);
                const r = containerRef.current?.getBoundingClientRect();
                if (r) setDragging({ id: im.id, kind: "image", ox: e.clientX - r.left - im.x, oy: e.clientY - r.top - im.y });
              }
            }}
          >
            <img src={im.dataUrl} className="w-full h-full object-contain pointer-events-none" alt="" />
          </div>
        );
      }

      return null;
    });
  };

  // ── Drag to move annotations ──
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      const nx = e.clientX - r.left - dragging.ox;
      const ny = e.clientY - r.top - dragging.oy;
      setAnnots(prev => prev.map(a => {
        const v = a.val as any;
        if (v.id === dragging.id) {
          return { ...a, val: { ...v, x: nx, y: ny } };
        }
        return a;
      }));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  const dim = pageDims[curPage];
  const containerStyle = dim ? { width: dim.w, height: dim.h } : {};

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
          {/* ── Toolbar ── */}
          <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-black">
            <ToolBtn icon={<MousePointer size={15} />} label="Select" active={tool === "select"} onClick={() => setTool("select")} />
            <ToolBtn icon={<Type size={15} />} label="Text" active={tool === "text"} onClick={() => setTool("text")} />
            <ToolBtn icon={<Pencil size={15} />} label="Draw" active={tool === "draw"} onClick={() => setTool("draw")} />
            <ToolBtn icon={<Image size={15} />} label="Image" active={tool === "image"} onClick={() => setTool("image")} />
            <ToolBtn icon={<Square size={15} />} label="Shape" active={tool === "shape"} onClick={() => setTool("shape")} />
            <ToolBtn icon={<PenLine size={15} />} label="Highlight" active={tool === "highlight"} onClick={() => setTool("highlight")} />

            <span className="w-px h-6 bg-black/20 mx-1.5" />

            {/* Colors */}
            <div className="flex items-center gap-1">
              {COLORS.map(c => (
                <button
                  key={c}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${color === c ? "border-black scale-125" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            {/* Brush sizes (only show for draw tool) */}
            {tool === "draw" && (
              <>
                <span className="w-px h-6 bg-black/20 mx-1.5" />
                <div className="flex items-center gap-1">
                  {BRUSH_SIZES.map(s => (
                    <button
                      key={s}
                      className={`w-6 h-6 flex items-center justify-center border ${brushSize === s ? "border-black bg-accent" : "border-black/30"} transition-colors`}
                      onClick={() => setBrushSize(s)}
                    >
                      <span className="rounded-full bg-black" style={{ width: s, height: s }} />
                    </button>
                  ))}
                </div>
              </>
            )}

            <span className="w-px h-6 bg-black/20 mx-1.5" />
            <ToolBtn icon={<Trash2 size={15} />} label="Delete" onClick={deleteSelected} disabled={!selId} />
            <ToolBtn icon={<Undo size={15} />} label="Undo" onClick={undoLast} />

            {/* Page nav */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button className="p-1.5 border border-black hover:bg-accent transition-colors disabled:opacity-30" disabled={curPage === 0} onClick={() => setCurPage(p => p - 1)}>
                <ChevronLeft size={14} />
              </button>
              <span className="font-mono text-xs font-bold min-w-[60px] text-center">
                {curPage + 1} / {pageImages.length}
              </span>
              <button className="p-1.5 border border-black hover:bg-accent transition-colors disabled:opacity-30" disabled={curPage === pageImages.length - 1} onClick={() => setCurPage(p => p + 1)}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* ── Editor Canvas ── */}
          <div className="relative overflow-auto border border-black bg-[#e8e8e8] flex justify-center p-4">
            <div
              ref={containerRef}
              className="relative shadow-xl"
              style={containerStyle}
            >
              {/* PDF page image */}
              {pageImages[curPage] && (
                <img
                  src={pageImages[curPage]}
                  alt={`Page ${curPage + 1}`}
                  className="block"
                  draggable={false}
                  style={{ width: dim?.w, height: dim?.h }}
                />
              )}

              {/* Text, shape, image overlays */}
              {renderOverlays()}

              {/* Drawing canvas */}
              <canvas
                ref={drawCanvasRef}
                className={`absolute inset-0 ${tool === "draw" ? "cursor-crosshair" : "pointer-events-none"}`}
                style={{ width: dim?.w, height: dim?.h }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={handleCanvasClick}
              />
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex justify-between items-center pt-2">
            <button
              className="p-2 border border-black hover:bg-accent transition-colors text-xs font-mono font-bold uppercase tracking-wider"
              onClick={() => { setFile(null); setPageImages([]); setAnnots([]); }}
            >
              <Undo size={14} className="inline mr-1" /> New File
            </button>

            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Download size={16} /> Download Edited PDF</>}
            </button>
          </div>

          <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
      )}
    </div>
  );
}

function ToolBtn({ icon, label, active, onClick, disabled }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className={`flex items-center gap-1 px-2.5 py-1.5 border text-xs font-mono font-bold uppercase tracking-wider transition-colors ${active ? "bg-accent border-black" : "border-black/40 hover:border-black"} ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
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
