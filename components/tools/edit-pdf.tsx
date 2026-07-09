"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
import { loadPdfJs } from "@/lib/pdf-parser";
import { TrustBadge } from "@/components/trust-badge";
import {
  MousePointer, Type, Pencil, Square, PenLine,
  Trash2, Download, Loader2, ChevronLeft, ChevronRight,
  Undo, Redo, Plus, Palette, Image as ImageIcon,
  Circle, Slash, ArrowRight, Bold, Italic,
  AlignLeft, AlignCenter, AlignRight, Copy,
  ZoomIn, ZoomOut, Maximize, ChevronUp, ChevronDown,
  RotateCw, Layers, FilePlus, X,
} from "lucide-react";

/* ============================================================
   Types
   ============================================================ */

type ToolMode = "select" | "text" | "draw" | "image" | "rect" | "ellipse" | "line" | "arrow" | "highlight";

interface Point { x: number; y: number; }

interface BaseO {
  id: string;
  pageIdx: number;
  rotation: number; // degrees
  opacity: number;  // 0..1
  z: number;        // stacking order
}

type FontFamily = "sans" | "serif" | "mono";
type BgMode = "none" | "solid" | "highlight";
type Align = "left" | "center" | "right";

interface TextO extends BaseO {
  kind: "text";
  text: string;
  x: number; y: number; w: number; h: number;
  fontSize: number;
  fontFamily: FontFamily;
  bold: boolean;
  italic: boolean;
  color: string;
  bg: BgMode;
  bgColor: string;
  borderColor: string;
  borderWidth: number;
  padding: number;
  align: Align;
}

interface ImgO extends BaseO {
  kind: "image";
  dataUrl: string;
  x: number; y: number; w: number; h: number;
}

interface ShapeO extends BaseO {
  kind: "shape";
  shape: "rect" | "ellipse" | "line" | "arrow";
  x: number; y: number; w: number; h: number;
  diag: 1 | -1; // line/arrow direction within bbox
  stroke: string;
  strokeWidth: number;
  fill: string; // hex or "transparent"
}

interface StrokeO extends BaseO {
  kind: "stroke";
  points: Point[];
  color: string;
  width: number;
}

type Overlay = TextO | ImgO | ShapeO | StrokeO;

interface Page {
  type: "orig" | "blank";
  srcIdx: number;       // index into original PDF (-1 for blank)
  image: string | null; // dataURL (orig) or null (blank)
  w: number; h: number; // render-space dims
  pdfW: number; pdfH: number; // pdf-space dims
}

interface Snap { annots: Overlay[]; pages: Page[]; curPage: number; }

const uid = () => Math.random().toString(36).slice(2, 10);

const COLORS = ["#000000", "#e11d48", "#f59e0b", "#eab308", "#10b981", "#3b82f6", "#8b5cf6", "#ffffff"];
const FILLS = ["transparent", "#000000", "#ffffff", "#f59e0b33", "#3b82f633", "#10b98133", "#e11d4833"];
const BRUSH_SIZES = [2, 4, 6, 10];
const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48];
const CALLOUTS: { name: string; patch: Partial<TextO> }[] = [
  { name: "Note", patch: { bg: "solid", bgColor: "#fef08a", borderColor: "#ca8a04", borderWidth: 1, padding: 8 } },
  { name: "Comment", patch: { bg: "solid", bgColor: "#ffffff", borderColor: "#000000", borderWidth: 1, padding: 6 } },
  { name: "Label", patch: { bg: "solid", bgColor: "#3b82f6", borderColor: "#1d4ed8", borderWidth: 0, padding: 4, color: "#ffffff" } },
  { name: "Highlight", patch: { bg: "highlight", bgColor: "#fde047", borderColor: "#00000000", borderWidth: 0, padding: 2 } },
  { name: "Plain", patch: { bg: "none", borderColor: "#00000000", borderWidth: 0, padding: 2 } },
];

const FONT_CSS: Record<FontFamily, string> = {
  sans: '"Helvetica", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

function fontVariant(t: TextO): StandardFonts {
  const fam = t.fontFamily;
  if (fam === "serif") return t.bold ? (t.italic ? StandardFonts.TimesRomanBoldItalic : StandardFonts.TimesRomanBold) : (t.italic ? StandardFonts.TimesRomanItalic : StandardFonts.TimesRoman);
  if (fam === "mono") return t.bold ? (t.italic ? StandardFonts.CourierBoldOblique : StandardFonts.CourierBold) : (t.italic ? StandardFonts.CourierOblique : StandardFonts.Courier);
  return t.bold ? (t.italic ? StandardFonts.HelveticaBoldOblique : StandardFonts.HelveticaBold) : (t.italic ? StandardFonts.HelveticaOblique : StandardFonts.Helvetica);
}

function bbox(o: Overlay): { x: number; y: number; w: number; h: number } {
  if (o.kind === "stroke") {
    if (o.points.length === 0) return { x: 0, y: 0, w: 0, h: 0 };
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of o.points) { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
    return { x: minX, y: minY, w: Math.max(maxX - minX, 1), h: Math.max(maxY - minY, 1) };
  }
  return { x: o.x, y: o.y, w: o.w, h: o.h };
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length < 6) return rgb(0, 0, 0);
  const v = parseInt(clean.slice(0, 6), 16);
  return rgb(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}
function hexAlpha(hex: string, a: number) {
  const clean = hex.replace("#", "");
  if (clean.length < 6) return hex + Math.round(a * 255).toString(16).padStart(2, "0");
  return "#" + clean.slice(0, 6) + Math.round(a * 255).toString(16).padStart(2, "0");
}
function strokeBboxHit(o: StrokeO, px: number, py: number): boolean {
  const tol = Math.max(o.width / 2 + 6, 6);
  for (let i = 0; i < o.points.length - 1; i++) {
    if (pointToSeg(px, py, o.points[i], o.points[i + 1]) < tol) return true;
  }
  return false;
}
function pointToSeg(px: number, py: number, a: Point, b: Point) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len2 = dx * dx + dy * dy || 1;
  let t = ((px - a.x) * dx + (py - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = a.x + t * dx, cy = a.y + t * dy;
  return Math.hypot(px - cx, py - cy);
}

/* ============================================================
   Component
   ============================================================ */

export default function EditPdfTool() {
  const [fileName, setFileName] = useState<string>("");
  const [pages, setPages] = useState<Page[]>([]);
  const [curPage, setCurPage] = useState(0);
  const [annots, setAnnots] = useState<Overlay[]>([]);
  const [tool, setTool] = useState<ToolMode>("select");
  const [selId, setSelId] = useState<string | null>(null);
  const [color, setColor] = useState("#e11d48");
  const [brushSize, setBrushSize] = useState(4);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [editingText, setEditingText] = useState<string | null>(null);

  // interaction state
  const [dragging, setDragging] = useState<{ id: string; offX: number; offY: number; moved: boolean } | null>(null);
  const [resizing, setResizing] = useState<{ id: string; handle: string; startBbox: { x: number; y: number; w: number; h: number }; startPt: Point } | null>(null);
  const [rotating, setRotating] = useState<{ id: string; cx: number; cy: number; startAng: number; startRot: number } | null>(null);
  const [drawPts, setDrawPts] = useState<Point[] | null>(null);
  const [shapeDraw, setShapeDraw] = useState<{ shape: "rect" | "ellipse" | "line" | "arrow"; start: Point; end: Point } | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const origPdfRef = useRef<ArrayBuffer | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // history
  const past = useRef<Snap[]>([]);
  const future = useRef<Snap[]>([]);
  const [histLen, setHistLen] = useState({ past: 0, future: 0 });
  const syncHist = useCallback(() => setHistLen({ past: past.current.length, future: future.current.length }), []);

  const page = pages[curPage];
  const dim = page ? { w: page.w, h: page.h } : null;
  const stageW = (dim?.w ?? 0) * zoom;
  const stageH = (dim?.h ?? 0) * zoom;

  const curAnnots = useMemo(
    () => annots.filter(a => a.pageIdx === curPage).sort((a, b) => a.z - b.z),
    [annots, curPage]
  );
  const curStrokes = useMemo(() => curAnnots.filter((a): a is StrokeO => a.kind === "stroke"), [curAnnots]);
  const curObjects = useMemo(() => curAnnots.filter(a => a.kind !== "stroke"), [curAnnots]);

  const selected = selId ? annots.find(a => a.id === selId) ?? null : null;

  /* ---------- history ---------- */
  const pushHist = useCallback(() => {
    past.current.push({
      annots: JSON.parse(JSON.stringify(annots)),
      pages: JSON.parse(JSON.stringify(pages)),
      curPage,
    });
    if (past.current.length > 60) past.current.shift();
    future.current = [];
    syncHist();
  }, [annots, pages, curPage]);

  const undo = useCallback(() => {
    if (!past.current.length) return;
    future.current.push({ annots: JSON.parse(JSON.stringify(annots)), pages: JSON.parse(JSON.stringify(pages)), curPage });
    const prev = past.current.pop()!;
    setAnnots(prev.annots);
    setPages(prev.pages);
    setCurPage(Math.min(prev.curPage, prev.pages.length - 1));
    setSelId(null);
    syncHist();
  }, [annots, pages, curPage, syncHist]);

  const redo = useCallback(() => {
    if (!future.current.length) return;
    past.current.push({ annots: JSON.parse(JSON.stringify(annots)), pages: JSON.parse(JSON.stringify(pages)), curPage });
    const next = future.current.pop()!;
    setAnnots(next.annots);
    setPages(next.pages);
    setCurPage(Math.min(next.curPage, next.pages.length - 1));
    setSelId(null);
    syncHist();
  }, [annots, pages, curPage, syncHist]);

  /* ---------- load PDF ---------- */
  const loadPdf = async (f: File) => {
    setLoading(true);
    try {
      const pdfjsLib = await loadPdfJs();
      const buf = await f.arrayBuffer();
      origPdfRef.current = buf.slice(0);
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const newPages: Page[] = [];
      const scale = 1.5;
      for (let i = 1; i <= pdf.numPages; i++) {
        const p = await pdf.getPage(i);
        const vp = p.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, vp.width, vp.height);
        await p.render({ canvasContext: ctx, viewport: vp }).promise;
        const pdfVp = p.getViewport({ scale: 1 });
        newPages.push({
          type: "orig", srcIdx: i - 1, image: canvas.toDataURL("image/png"),
          w: vp.width, h: vp.height, pdfW: pdfVp.width, pdfH: pdfVp.height,
        });
      }
      past.current = []; future.current = [];
      setPages(newPages);
      setFileName(f.name);
      setCurPage(0);
      setAnnots([]);
      setSelId(null);
      setZoom(1);
    } catch (e) {
      console.error(e);
      alert("Failed to load PDF. The file may be corrupted or password-protected.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- coordinate helpers ---------- */
  const stagePos = (e: { clientX: number; clientY: number }): Point => {
    const rect = stageRef.current!.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
  };

  const updateItem = useCallback((id: string, patch: Partial<Overlay>) => {
    setAnnots(prev => prev.map(o => (o.id === id ? ({ ...o, ...patch } as Overlay) : o)));
  }, []);

  const nextZ = () => {
    const zs = annots.filter(a => a.pageIdx === curPage).map(a => a.z);
    return zs.length ? Math.max(...zs) + 1 : 1;
  };

  /* ---------- stage pointer: draw / place / deselect ---------- */
  const onStagePointerDown = (e: React.PointerEvent) => {
    if (editingText) return;
    const pos = stagePos(e);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    if (tool === "draw") {
      setDrawPts([pos]);
      return;
    }
    if (tool === "rect" || tool === "ellipse" || tool === "line" || tool === "arrow") {
      setShapeDraw({ shape: tool, start: pos, end: pos });
      return;
    }
    if (tool === "select") {
      // hit test strokes first
      for (let i = curStrokes.length - 1; i >= 0; i--) {
        if (strokeBboxHit(curStrokes[i], pos.x, pos.y)) {
          setSelId(curStrokes[i].id);
          pushHist();
          setDragging({ id: curStrokes[i].id, offX: 0, offY: 0, moved: false });
          return;
        }
      }
      setSelId(null);
      return;
    }
    if (tool === "text") {
      pushHist();
      const id = uid();
      const t: TextO = {
        id, kind: "text", pageIdx: curPage, text: "Type here", x: pos.x - 60, y: pos.y - 12,
        w: 200, h: 30, fontSize: 18, fontFamily: "sans", bold: false, italic: false,
        color: "#111111", bg: "none", bgColor: "#fef08a", borderColor: "#000000", borderWidth: 0,
        padding: 4, align: "left", rotation: 0, opacity: 1, z: nextZ(),
      };
      setAnnots(prev => [...prev, t]);
      setSelId(id);
      setEditingText(id);
      setTool("select");
      return;
    }
    if (tool === "image") {
      imgInputRef.current?.click();
      return;
    }
    if (tool === "highlight") {
      pushHist();
      const id = uid();
      const s: ShapeO = {
        id, kind: "shape", shape: "rect", x: pos.x - 50, y: pos.y - 8, w: 100, h: 16, diag: 1,
        stroke: "#f59e0b", strokeWidth: 0, fill: "#fde04766", rotation: 0, opacity: 1, z: nextZ(), pageIdx: curPage,
      };
      setAnnots(prev => [...prev, s]);
      setSelId(id);
      setTool("select");
      return;
    }
  };

  const onStagePointerMove = (e: React.PointerEvent) => {
    if (drawPts) {
      const pos = stagePos(e);
      setDrawPts(prev => prev ? [...prev, pos] : prev);
      return;
    }
    if (shapeDraw) {
      setShapeDraw(s => s ? { ...s, end: stagePos(e) } : s);
      return;
    }
  };

  const onStagePointerUp = () => {
    if (drawPts && drawPts.length > 1) {
      pushHist();
      const s: StrokeO = { id: uid(), kind: "stroke", points: drawPts, color, width: brushSize, pageIdx: curPage, rotation: 0, opacity: 1, z: nextZ() };
      setAnnots(prev => [...prev, s]);
    }
    setDrawPts(null);
    if (shapeDraw) {
      const { shape, start, end } = shapeDraw;
      const w = end.x - start.x, h = end.y - start.y;
      if (Math.abs(w) > 3 || Math.abs(h) > 3) {
        pushHist();
        const id = uid();
        const x = Math.min(start.x, end.x), y = Math.min(start.y, end.y);
        const aw = Math.abs(w), ah = Math.abs(h);
        const diag: 1 | -1 = (w >= 0) === (h >= 0) ? 1 : -1;
        const base: ShapeO = {
          id, kind: "shape", shape, x, y, w: Math.max(aw, shape === "line" || shape === "arrow" ? ah : 1), h: Math.max(ah, 1),
          diag, stroke: color, strokeWidth: shape === "line" || shape === "arrow" ? Math.max(brushSize, 2) : 2,
          fill: shape === "rect" || shape === "ellipse" ? "transparent" : "transparent",
          rotation: 0, opacity: 1, z: nextZ(), pageIdx: curPage,
        };
        if (shape === "line" || shape === "arrow") { base.w = aw; base.h = ah; }
        setAnnots(prev => [...prev, base]);
        setSelId(id);
      }
      setShapeDraw(null);
      setTool("select");
    }
  };

  /* ---------- object move ---------- */
  const startMove = (o: Overlay, e: React.PointerEvent) => {
    if (tool !== "select" || editingText) return;
    e.stopPropagation();
    pushHist();
    setSelId(o.id);
    if (o.kind === "stroke") {
      const b = bbox(o);
      setDragging({ id: o.id, offX: stagePos(e).x - b.x, offY: stagePos(e).y - b.y, moved: false });
    } else {
      setDragging({ id: o.id, offX: stagePos(e).x - o.x, offY: stagePos(e).y - o.y, moved: false });
    }
  };

  /* ---------- resize ---------- */
  const startResize = (handle: string, e: React.PointerEvent) => {
    if (!selected) return;
    e.stopPropagation();
    pushHist();
    const b = bbox(selected);
    setResizing({ id: selected.id, handle, startBbox: { ...b }, startPt: stagePos(e) });
  };

  /* ---------- rotate ---------- */
  const startRotate = (e: React.PointerEvent) => {
    if (!selected) return;
    e.stopPropagation();
    pushHist();
    const b = bbox(selected);
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    const p = stagePos(e);
    setRotating({ id: selected.id, cx, cy, startAng: Math.atan2(p.y - cy, p.x - cx), startRot: selected.rotation });
  };

  /* ---------- global pointer listeners for active interaction ---------- */
  useEffect(() => {
    if (!dragging && !resizing && !rotating && !drawPts && !shapeDraw) return;
    const move = (e: PointerEvent) => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / zoom;
      const py = (e.clientY - rect.top) / zoom;
      if (dragging) {
        const o = annots.find(a => a.id === dragging.id);
        if (!o) return;
        if (o.kind === "stroke") {
          const b = bbox(o);
          const dx = px - dragging.offX - b.x;
          const dy = py - dragging.offY - b.y;
          if (dx || dy) setAnnots(prev => prev.map(a => a.id === o.id && a.kind === "stroke" ? { ...a, points: a.points.map(p => ({ x: p.x + dx, y: p.y + dy })) } : a));
        } else {
          updateItem(o.id, { x: px - dragging.offX, y: py - dragging.offY } as Partial<Overlay>);
        }
        return;
      }
      if (resizing) {
        const dx = px - resizing.startPt.x;
        const dy = py - resizing.startPt.y;
        let { x, y, w, h } = resizing.startBbox;
        const h2 = resizing.handle;
        if (h2.includes("e")) w = Math.max(resizing.startBbox.w + dx, 8);
        if (h2.includes("s")) h = Math.max(resizing.startBbox.h + dy, 8);
        if (h2.includes("w")) { w = Math.max(resizing.startBbox.w - dx, 8); x = resizing.startBbox.x + (resizing.startBbox.w - w); }
        if (h2.includes("n")) { h = Math.max(resizing.startBbox.h - dy, 8); y = resizing.startBbox.y + (resizing.startBbox.h - h); }
        const o = annots.find(a => a.id === resizing.id);
        if (!o) return;
        if (o.kind === "stroke") {
          const sb = resizing.startBbox;
          const sx = sb.w ? w / sb.w : 1, sy = sb.h ? h / sb.h : 1;
          setAnnots(prev => prev.map(a => {
            if (a.id !== o.id || a.kind !== "stroke") return a;
            return { ...a, points: a.points.map(p => ({ x: x + (p.x - sb.x) * sx, y: y + (p.y - sb.y) * sy })) };
          }));
        } else if (o.kind === "text") {
          updateItem(o.id, { x, y, w, h: Math.max(h, o.fontSize * 1.2) } as Partial<Overlay>);
        } else {
          updateItem(o.id, { x, y, w, h } as Partial<Overlay>);
        }
        return;
      }
      if (rotating) {
        const ang = Math.atan2(py - rotating.cx, px - rotating.cx);
        let deg = rotating.startRot + (ang - rotating.startAng) * 180 / Math.PI;
        if (e.shiftKey) deg = Math.round(deg / 15) * 15;
        updateItem(rotating.id, { rotation: deg } as Partial<Overlay>);
        return;
      }
    };
    const up = () => { setDragging(null); setResizing(null); setRotating(null); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [dragging, resizing, rotating, drawPts, shapeDraw, zoom, annots, updateItem]);

  /* ---------- object ops ---------- */
  const deleteSelected = () => {
    if (!selId) return;
    pushHist();
    setAnnots(prev => prev.filter(a => a.id !== selId));
    setSelId(null);
    setEditingText(null);
  };
  const duplicateSelected = () => {
    if (!selected) return;
    pushHist();
    const copy = JSON.parse(JSON.stringify(selected)) as Overlay;
    copy.id = uid(); copy.z = nextZ();
    if (copy.kind === "stroke") copy.points = copy.points.map(p => ({ x: p.x + 16, y: p.y + 16 }));
    else { copy.x += 16; copy.y += 16; }
    setAnnots(prev => [...prev, copy]);
    setSelId(copy.id);
  };
  const reorderZ = (dir: "front" | "back" | "forward" | "backward") => {
    if (!selected) return;
    pushHist();
    const zs = annots.filter(a => a.pageIdx === selected.pageIdx && a.kind === selected.kind).map(a => a.z);
    const minZ = Math.min(...zs), maxZ = Math.max(...zs);
    let nz = selected.z;
    if (dir === "front") nz = maxZ + 1;
    else if (dir === "back") nz = minZ - 1;
    else if (dir === "forward") nz = selected.z + 1;
    else nz = selected.z - 1;
    updateItem(selected.id, { z: nz } as Partial<Overlay>);
  };

  /* ---------- keyboard ---------- */
  useEffect(() => {
    if (!fileName) return;
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable)) {
        if (e.key === "Escape" && editingText) setEditingText(null);
        return;
      }
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "z") { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
      else if (mod && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); }
      else if (mod && e.key.toLowerCase() === "d") { e.preventDefault(); if (selected) duplicateSelected(); }
      else if (e.key === "Delete" || e.key === "Backspace") { if (selected && !editingText) { e.preventDefault(); deleteSelected(); } }
      else if (e.key === "Escape") { setSelId(null); setEditingText(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName, selected, editingText, annots, pages, curPage]);

  /* ---------- image upload ---------- */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        pushHist();
        const maxW = (dim?.w ?? 600) * 0.4;
        const scale = Math.min(maxW / img.width, 1);
        const w = img.width * scale, h = img.height * scale;
        const id = uid();
        const o: ImgO = { id, kind: "image", dataUrl, x: 40, y: 40, w, h, pageIdx: curPage, rotation: 0, opacity: 1, z: nextZ() };
        setAnnots(prev => [...prev, o]);
        setSelId(id);
        setTool("select");
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(f);
    e.target.value = "";
  };

  /* ---------- page management ---------- */
  const addPage = () => {
    if (!dim) return;
    pushHist();
    const ref = pages[0];
    const np: Page = { type: "blank", srcIdx: -1, image: null, w: ref.w, h: ref.h, pdfW: ref.pdfW, pdfH: ref.pdfH };
    setPages(prev => { const n = [...prev]; n.splice(curPage + 1, 0, np); return n; });
    setCurPage(curPage + 1);
    setSelId(null);
  };
  const deletePage = () => {
    if (pages.length <= 1) return;
    pushHist();
    const removed = curPage;
    setPages(prev => prev.filter((_, i) => i !== removed));
    setAnnots(prev => prev
      .filter(a => a.pageIdx !== removed)
      .map(a => a.pageIdx > removed ? { ...a, pageIdx: a.pageIdx - 1 } : a));
    setCurPage(p => Math.max(0, Math.min(p, pages.length - 2)));
    setSelId(null);
  };
  const movePage = (dir: -1 | 1) => {
    const ni = curPage + dir;
    if (ni < 0 || ni >= pages.length) return;
    pushHist();
    setPages(prev => { const n = [...prev]; [n[curPage], n[ni]] = [n[ni], n[curPage]]; return n; });
    setAnnots(prev => prev.map(a => {
      if (a.pageIdx === curPage) return { ...a, pageIdx: ni };
      if (a.pageIdx === ni) return { ...a, pageIdx: curPage };
      return a;
    }));
    setCurPage(ni);
    setSelId(null);
  };

  /* ---------- fit to container width ---------- */
  const fitWidth = () => {
    const el = scrollRef.current;
    if (!el || !dim) return;
    const pad = 64;
    const z = Math.min(Math.max((el.clientWidth - pad) / dim.w, 0.2), 3);
    setZoom(z);
  };

  /* ---------- text autosize ---------- */
  useEffect(() => {
    if (editingText && textAreaRef.current) {
      const ta = textAreaRef.current;
      const setH = () => {
        ta.style.height = "auto";
        ta.style.height = ta.scrollHeight + "px";
        const id = editingText;
        setAnnots(prev => prev.map(a => a.id === id && a.kind === "text" ? { ...a, h: Math.max(ta.scrollHeight, a.fontSize * 1.2) } : a));
      };
      setH();
      ta.focus(); ta.select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingText]);

  /* ---------- export ---------- */
  const wrapText = (text: string, fontSize: number, maxW: number) => {
    const avgChar = fontSize * 0.52;
    const maxChars = Math.max(1, Math.floor(maxW / avgChar));
    const out: string[] = [];
    for (const para of text.split("\n")) {
      const words = para.split(" ");
      let line = "";
      for (const w of words) {
        const trial = line ? line + " " + w : w;
        if (trial.length > maxChars && line) { out.push(line); line = w; }
        else line = trial;
      }
      out.push(line);
    }
    return out.length ? out : [""];
  };

  const handleSave = async () => {
    if (!origPdfRef.current && pages.some(p => p.type === "orig")) return;
    setSaving(true);
    try {
      const outDoc = await PDFDocument.create();
      const srcDoc = pages.some(p => p.type === "orig") ? await PDFDocument.load(origPdfRef.current!) : null;
      const srcPages = srcDoc ? await outDoc.copyPages(srcDoc, srcDoc.getPageIndices()) : [];
      const fontCache: Record<string, PDFFont> = {};
      const getFont = async (t: TextO) => {
        const key = `${t.fontFamily}-${t.bold}-${t.italic}`;
        if (!fontCache[key]) fontCache[key] = await outDoc.embedFont(fontVariant(t));
        return fontCache[key];
      };

      const outPages: PDFPage[] = [];
      for (const p of pages) {
        if (p.type === "orig") outPages.push(srcPages[p.srcIdx]);
        else outPages.push(outDoc.addPage([p.pdfW, p.pdfH]));
      }

      for (const o of annots) {
        const op = outPages[o.pageIdx];
        if (!op) continue;
        const page = pages[o.pageIdx];
        const { pdfW, w: rw } = page;
        const sx = pdfW / rw;
        const pdfH = page.pdfH;

        if (o.kind === "text") {
          const t = o;
          const font = await getFont(t);
          const lineH = t.fontSize * 1.25;
          const pad = t.bg !== "none" ? t.padding : 0;
          const innerW = (t.w - pad * 2) * sx;
          const lines = wrapText(t.text, t.fontSize, innerW / sx);
          // background
          if (t.bg === "solid") {
            op.drawRectangle({
              x: t.x * sx, y: pdfH - (t.y + t.h) * sx, width: t.w * sx, height: t.h * sx,
              color: hexToRgb(t.bgColor), opacity: t.opacity, borderWidth: t.borderWidth, borderColor: hexToRgb(t.borderColor),
            });
          } else if (t.bg === "highlight") {
            op.drawRectangle({
              x: t.x * sx, y: pdfH - (t.y + t.h) * sx, width: t.w * sx, height: t.h * sx,
              color: hexToRgb(t.bgColor), opacity: 0.4 * t.opacity,
            });
          }
          let yy = pdfH - (t.y + pad + t.fontSize) * sx;
          for (const line of lines) {
            const tw = font.widthOfTextAtSize(line, t.fontSize * sx);
            let xx = (t.x + pad) * sx;
            if (t.align === "center") xx += (innerW - tw) / 2;
            else if (t.align === "right") xx += innerW - tw;
            op.drawText(line, { x: xx, y: yy, size: t.fontSize * sx, font, color: hexToRgb(t.color), opacity: t.opacity });
            yy -= lineH * sx;
          }
        } else if (o.kind === "image") {
          let img;
          try { img = o.dataUrl.startsWith("data:image/png") ? await outDoc.embedPng(o.dataUrl) : await outDoc.embedJpg(o.dataUrl); }
          catch { continue; }
          op.drawImage(img, { x: o.x * sx, y: pdfH - (o.y + o.h) * sx, width: o.w * sx, height: o.h * sx, opacity: o.opacity });
        } else if (o.kind === "shape") {
          const s = o;
          if (s.shape === "rect") {
            op.drawRectangle({
              x: s.x * sx, y: pdfH - (s.y + s.h) * sx, width: s.w * sx, height: s.h * sx,
              borderColor: hexToRgb(s.stroke), borderWidth: s.strokeWidth, opacity: s.opacity,
              color: s.fill === "transparent" ? undefined : hexToRgb(s.fill),
            });
          } else if (s.shape === "ellipse") {
            op.drawEllipse({
              x: (s.x + s.w / 2) * sx, y: pdfH - (s.y + s.h / 2) * sx, xScale: (s.w / 2) * sx, yScale: (s.h / 2) * sx,
              borderColor: hexToRgb(s.stroke), borderWidth: s.strokeWidth, opacity: s.opacity,
              color: s.fill === "transparent" ? undefined : hexToRgb(s.fill),
            });
          } else {
            // line / arrow
            const p1 = s.diag >= 0 ? { x: s.x, y: s.y + s.h } : { x: s.x, y: s.y }; // canvas space, top-origin
            const p2 = s.diag >= 0 ? { x: s.x + s.w, y: s.y } : { x: s.x + s.w, y: s.y + s.h };
            // convert: pdf y from top-origin canvas y:  pdfY = pdfH/sx - canvasY  (since sy==sx)
            const toPdf = (p: Point) => ({ x: p.x * sx, y: pdfH - p.y * sx });
            const a = toPdf(p1), b = toPdf(p2);
            op.drawLine({ start: a, end: b, thickness: s.strokeWidth, color: hexToRgb(s.stroke), opacity: s.opacity });
            if (s.shape === "arrow") {
              const ang = Math.atan2(b.y - a.y, b.x - a.x);
              const head = 10 * sx;
              op.drawLine({ start: b, end: { x: b.x - head * Math.cos(ang - 0.4), y: b.y - head * Math.sin(ang - 0.4) }, thickness: s.strokeWidth, color: hexToRgb(s.stroke), opacity: s.opacity });
              op.drawLine({ start: b, end: { x: b.x - head * Math.cos(ang + 0.4), y: b.y - head * Math.sin(ang + 0.4) }, thickness: s.strokeWidth, color: hexToRgb(s.stroke), opacity: s.opacity });
            }
          }
        } else if (o.kind === "stroke") {
          if (o.points.length < 2) continue;
          for (let i = 0; i < o.points.length - 1; i++) {
            const a = o.points[i], b = o.points[i + 1];
            op.drawLine({
              start: { x: a.x * sx, y: pdfH - a.y * sx }, end: { x: b.x * sx, y: pdfH - b.y * sx },
              thickness: o.width, color: hexToRgb(o.color), opacity: o.opacity,
            });
          }
        }
      }

      const out = new Uint8Array(await outDoc.save());
      const blob = new Blob([out], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `edited_${fileName || "document.pdf"}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to save edited PDF.");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- drop ---------- */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") loadPdf(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- render ---------- */
  const isTextEditing = editingText && selected?.kind === "text" && selected.id === editingText;

  if (!fileName) {
    return (
      <div className="space-y-6">
        <TrustBadge />
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
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TrustBadge />

      {/* ── Top toolbar ── */}
      <div className="editorial-panel p-3 space-y-3">
        <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-black">
          {/* tools */}
          <ToolBtn icon={<MousePointer size={15} />} label="Select" active={tool === "select"} onClick={() => { setTool("select"); }} />
          <ToolBtn icon={<Type size={15} />} label="Text" active={tool === "text"} onClick={() => setTool("text")} />
          <ToolBtn icon={<Pencil size={15} />} label="Draw" active={tool === "draw"} onClick={() => setTool("draw")} />
          <ToolBtn icon={<ImageIcon size={15} />} label="Image" active={tool === "image"} onClick={() => setTool("image")} />
          <ToolBtn icon={<Square size={15} />} label="Rect" active={tool === "rect"} onClick={() => setTool("rect")} />
          <ToolBtn icon={<Circle size={15} />} label="Ellipse" active={tool === "ellipse"} onClick={() => setTool("ellipse")} />
          <ToolBtn icon={<Slash size={15} />} label="Line" active={tool === "line"} onClick={() => setTool("line")} />
          <ToolBtn icon={<ArrowRight size={15} />} label="Arrow" active={tool === "arrow"} onClick={() => setTool("arrow")} />
          <ToolBtn icon={<PenLine size={15} />} label="Highlight" active={tool === "highlight"} onClick={() => setTool("highlight")} />

          <span className="w-px h-6 bg-black/20 mx-1.5" />

          {/* default color / brush */}
          <div className="flex items-center gap-1">
            {COLORS.map(c => (
              <button key={c} className={`w-5 h-5 rounded-full border-2 transition-transform ${color === c ? "border-black scale-125" : "border-transparent"}`} style={{ backgroundColor: c }} onClick={() => setColor(c)} title={c} />
            ))}
          </div>
          {(tool === "draw" || tool === "line" || tool === "arrow") && (
            <div className="flex items-center gap-1">
              {BRUSH_SIZES.map(s => (
                <button key={s} className={`w-6 h-6 flex items-center justify-center border ${brushSize === s ? "border-black bg-accent" : "border-black/30"}`} onClick={() => setBrushSize(s)}>
                  <span className="rounded-full bg-black" style={{ width: s, height: s }} />
                </button>
              ))}
            </div>
          )}

          <span className="w-px h-6 bg-black/20 mx-1.5" />

          <ToolBtn icon={<Undo size={15} />} label="Undo" onClick={undo} disabled={histLen.past === 0} />
          <ToolBtn icon={<Redo size={15} />} label="Redo" onClick={redo} disabled={histLen.future === 0} />
        </div>

        {/* context row: depends on selection */}
        <ContextToolbar
          selected={selected}
          tool={tool}
          update={(patch) => selected && updateItem(selected.id, patch)}
          reorder={reorderZ}
        />
      </div>

      {/* ── Canvas area ── */}
      <div ref={scrollRef} className="relative overflow-auto border border-black bg-[#e8e8e8] p-4 flex justify-center" style={{ maxHeight: "62vh" }}>
        <div
          ref={stageRef}
          className="relative shadow-xl bg-white"
          style={{ width: stageW, height: stageH, cursor: tool === "draw" || tool === "rect" || tool === "ellipse" || tool === "line" || tool === "arrow" ? "crosshair" : "default" }}
          onPointerDown={onStagePointerDown}
          onPointerMove={onStagePointerMove}
          onPointerUp={onStagePointerUp}
        >
          {/* page image */}
          {page?.image && (
            <img src={page.image} alt={`Page ${curPage + 1}`} className="block absolute top-0 left-0 pointer-events-none" draggable={false} style={{ width: stageW, height: stageH }} />
          )}

          {/* live shape draw preview */}
          {shapeDraw && (
            <ShapePreview shape={shapeDraw} zoom={zoom} color={color} brush={brushSize} />
          )}

          {/* objects (text/image/shape), sorted by z */}
          {curObjects.map(o => (
            <ObjectView
              key={o.id}
              o={o}
              zoom={zoom}
              selected={selId === o.id}
              editing={!!isTextEditing && o.id === editingText}
              onStartMove={(e) => startMove(o, e)}
              onTextChange={(text) => updateItem(o.id, { text } as Partial<Overlay>)}
              onCommitText={() => setEditingText(null)}
              textRef={textAreaRef}
            />
          ))}

          {/* strokes layer (top) */}
          <svg className="absolute top-0 left-0 pointer-events-none" width={stageW} height={stageH}>
            {curStrokes.map(s => (
              <polyline
                key={s.id}
                points={s.points.map(p => `${p.x * zoom},${p.y * zoom}`).join(" ")}
                fill="none"
                stroke={s.color}
                strokeWidth={s.width * zoom}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={s.opacity}
              />
            ))}
            {drawPts && drawPts.length > 1 && (
              <polyline
                points={drawPts.map(p => `${p.x * zoom},${p.y * zoom}`).join(" ")}
                fill="none" stroke={color} strokeWidth={brushSize * zoom}
                strokeLinecap="round" strokeLinejoin="round"
              />
            )}
          </svg>

          {/* selection frame */}
          {selected && selected.pageIdx === curPage && !isTextEditing && (
            <SelectionFrame
              o={selected} zoom={zoom}
              onResizeStart={startResize}
              onRotateStart={startRotate}
              onMoveStart={(e) => startMove(selected, e)}
            />
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="editorial-panel p-3 flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-1.5">
          <button className="ctx-btn" onClick={() => { setFileName(""); setPages([]); setAnnots([]); past.current = []; future.current = []; }} title="New file">
            <X size={14} /> <span className="hidden sm:inline">New</span>
          </button>
          <span className="w-px h-6 bg-black/20 mx-0.5" />
          <button className="ctx-btn" onClick={addPage} title="Add page"><FilePlus size={14} /></button>
          <button className="ctx-btn" onClick={deletePage} disabled={pages.length <= 1} title="Delete page"><Trash2 size={14} /></button>
          <button className="ctx-btn" onClick={() => movePage(-1)} disabled={curPage === 0} title="Move page up"><ChevronUp size={14} /></button>
          <button className="ctx-btn" onClick={() => movePage(1)} disabled={curPage === pages.length - 1} title="Move page down"><ChevronDown size={14} /></button>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="ctx-btn" onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} title="Zoom out"><ZoomOut size={14} /></button>
          <span className="font-mono text-xs font-bold min-w-[44px] text-center">{Math.round(zoom * 100)}%</span>
          <button className="ctx-btn" onClick={() => setZoom(z => Math.min(3, z + 0.1))} title="Zoom in"><ZoomIn size={14} /></button>
          <button className="ctx-btn" onClick={fitWidth} title="Fit width"><Maximize size={14} /></button>
          <span className="w-px h-6 bg-black/20 mx-0.5" />
          <button className="p-1.5 border border-black hover:bg-accent transition-colors disabled:opacity-30" disabled={curPage === 0} onClick={() => setCurPage(p => p - 1)}><ChevronLeft size={14} /></button>
          <span className="font-mono text-xs font-bold min-w-[60px] text-center">{curPage + 1} / {pages.length}</span>
          <button className="p-1.5 border border-black hover:bg-accent transition-colors disabled:opacity-30" disabled={curPage === pages.length - 1} onClick={() => setCurPage(p => p + 1)}><ChevronRight size={14} /></button>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="ctx-btn" onClick={duplicateSelected} disabled={!selected} title="Duplicate (Ctrl+D)"><Copy size={14} /></button>
          <button className="ctx-btn" onClick={deleteSelected} disabled={!selected} title="Delete (Del)"><Trash2 size={14} /></button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><Download size={16} /> Download</>}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center text-sm font-mono uppercase tracking-wider text-muted-foreground">
          <Loader2 size={16} className="inline animate-spin mr-2" /> Loading…
        </div>
      )}

      <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

      <style>{`.ctx-btn{display:inline-flex;align-items:center;gap:4px;padding:6px 8px;border:1px solid rgba(0,0,0,.4);font-family:var(--font-mono);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;background:var(--background);transition:all .15s}.ctx-btn:hover:not(:disabled){border-color:#000;background:var(--accent)}.ctx-btn:disabled{opacity:.3;cursor:not-allowed}`}</style>
    </div>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function ToolBtn({ icon, label, active, onClick, disabled }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className={`flex items-center gap-1 px-2.5 py-1.5 border text-xs font-mono font-bold uppercase tracking-wider transition-colors ${active ? "bg-accent border-black" : "border-black/40 hover:border-black"} ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
      onClick={onClick} disabled={disabled} title={label}
    >
      {icon} <span className="hidden lg:inline">{label}</span>
    </button>
  );
}

/* ---------- Contextual toolbar for selected object ---------- */
function ContextToolbar({ selected, tool, update, reorder }: {
  selected: Overlay | null;
  tool: ToolMode;
  update: (patch: Partial<Overlay>) => void;
  reorder: (dir: "front" | "back" | "forward" | "backward") => void;
}) {
  if (selected?.kind === "text") {
    const t = selected;
    return (
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="border border-black/40 px-2 py-1 text-xs font-mono bg-background"
          value={t.fontFamily}
          onChange={e => update({ fontFamily: e.target.value as FontFamily })}
        >
          <option value="sans">Sans</option>
          <option value="serif">Serif</option>
          <option value="mono">Mono</option>
        </select>
        <select
          className="border border-black/40 px-2 py-1 text-xs font-mono bg-background"
          value={t.fontSize}
          onChange={e => update({ fontSize: Number(e.target.value) })}
        >
          {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <MiniToggle active={t.bold} onClick={() => update({ bold: !t.bold })} title="Bold"><Bold size={14} /></MiniToggle>
        <MiniToggle active={t.italic} onClick={() => update({ italic: !t.italic })} title="Italic"><Italic size={14} /></MiniToggle>
        <MiniToggle active={t.align === "left"} onClick={() => update({ align: "left" })} title="Left"><AlignLeft size={14} /></MiniToggle>
        <MiniToggle active={t.align === "center"} onClick={() => update({ align: "center" })} title="Center"><AlignCenter size={14} /></MiniToggle>
        <MiniToggle active={t.align === "right"} onClick={() => update({ align: "right" })} title="Right"><AlignRight size={14} /></MiniToggle>
        <SwatchPicker label="Text" value={t.color} onChange={c => update({ color: c })} />
        <span className="w-px h-6 bg-black/20" />
        <select className="border border-black/40 px-2 py-1 text-xs font-mono bg-background" value={t.bg} onChange={e => update({ bg: e.target.value as BgMode })}>
          <option value="none">No bg</option>
          <option value="solid">Solid bg</option>
          <option value="highlight">Highlight</option>
        </select>
        {t.bg !== "none" && <SwatchPicker label="Bg" value={t.bgColor} onChange={c => update({ bgColor: c })} />}
        <label className="flex items-center gap-1 text-xs font-mono">
          <input type="checkbox" checked={t.borderWidth > 0} onChange={e => update({ borderWidth: e.target.checked ? 1 : 0 })} />
          Border
        </label>
        {t.borderWidth > 0 && <SwatchPicker label="Border" value={t.borderColor} onChange={c => update({ borderColor: c })} />}
        <span className="w-px h-6 bg-black/20" />
        <span className="text-xs font-mono uppercase opacity-60">Callouts:</span>
        {CALLOUTS.map(c => (
          <button key={c.name} className="px-2 py-1 border border-black/40 text-xs font-mono hover:border-black hover:bg-accent" onClick={() => update(c.patch as Partial<Overlay>)}>{c.name}</button>
        ))}
        <span className="w-px h-6 bg-black/20" />
        <OpacityControl o={t} update={update} />
        <LayerControls reorder={reorder} />
      </div>
    );
  }

  if (selected?.kind === "shape") {
    const s = selected;
    const isLine = s.shape === "line" || s.shape === "arrow";
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase opacity-60">{s.shape}</span>
        <SwatchPicker label="Stroke" value={s.stroke} onChange={c => update({ stroke: c })} />
        {!isLine && <SwatchPicker label="Fill" value={s.fill} onChange={c => update({ fill: c })} extra={FILLS} />}
        <label className="flex items-center gap-1 text-xs font-mono">
          Width
          <input type="number" min={0} max={40} value={s.strokeWidth} className="w-14 border border-black/40 px-1 py-0.5 font-mono text-xs" onChange={e => update({ strokeWidth: Number(e.target.value) })} />
        </label>
        <OpacityControl o={s} update={update} />
        <LayerControls reorder={reorder} />
      </div>
    );
  }

  if (selected?.kind === "image" || selected?.kind === "stroke") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase opacity-60">{selected.kind}</span>
        <OpacityControl o={selected} update={update} />
        <LayerControls reorder={reorder} />
      </div>
    );
  }

  // no selection: contextual hints for active tool
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
      <Palette size={14} />
      <span>
        {tool === "select" && "Click an object to select • double-click text to edit • Del to delete • Ctrl+Z undo"}
        {tool === "text" && "Click on the page to add a text box you can type into"}
        {tool === "draw" && "Draw freehand — pick a color & brush size above"}
        {tool === "image" && "Click on the page, then choose an image to place"}
        {tool === "highlight" && "Click to drop a highlight strip"}
        {(tool === "rect" || tool === "ellipse" || tool === "line" || tool === "arrow") && `Drag on the page to draw a ${tool}`}
      </span>
    </div>
  );
}

function MiniToggle({ active, onClick, title, children }: { active: boolean; onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button title={title} onClick={onClick} className={`w-7 h-7 flex items-center justify-center border ${active ? "bg-accent border-black" : "border-black/40 hover:border-black"}`}>
      {children}
    </button>
  );
}

function SwatchPicker({ label, value, onChange, extra }: { label: string; value: string; onChange: (c: string) => void; extra?: string[] }) {
  const opts = extra ?? COLORS;
  return (
    <label className="flex items-center gap-1 text-xs font-mono">
      <span className="opacity-60">{label}</span>
      <span className="relative inline-flex">
        {opts.map(c => (
          <button key={c} title={c} onClick={() => onChange(c)} className={`w-4 h-4 border ${value === c ? "border-black scale-125 z-10" : "border-black/20"}`} style={{ backgroundColor: c === "transparent" ? "repeating-conic-gradient(#bbb 0% 25%, #fff 0% 50%) 50% / 8px 8px" : c }} />
        ))}
        <input type="color" value={value.startsWith("#") && value.length >= 7 ? value.slice(0, 7) : "#000000"} onChange={e => onChange(e.target.value)} className="w-5 h-5 border border-black/40 cursor-pointer" title="Custom" />
      </span>
    </label>
  );
}

function OpacityControl({ o, update }: { o: Overlay; update: (p: Partial<Overlay>) => void }) {
  return (
    <label className="flex items-center gap-1 text-xs font-mono">
      <span className="opacity-60">Opacity</span>
      <input type="range" min={0} max={100} value={Math.round(o.opacity * 100)} onChange={e => update({ opacity: Number(e.target.value) / 100 })} className="w-24" />
      <span className="w-8">{Math.round(o.opacity * 100)}%</span>
    </label>
  );
}

function LayerControls({ reorder }: { reorder: (dir: "front" | "back" | "forward" | "backward") => void }) {
  return (
    <span className="flex items-center gap-1">
      <Layers size={14} className="opacity-60" />
      <button className="ctx-btn" onClick={() => reorder("front")} title="Bring to front">⤒</button>
      <button className="ctx-btn" onClick={() => reorder("forward")} title="Bring forward">↑</button>
      <button className="ctx-btn" onClick={() => reorder("backward")} title="Send backward">↓</button>
      <button className="ctx-btn" onClick={() => reorder("back")} title="Send to back">⤓</button>
    </span>
  );
}

/* ---------- Object view ---------- */
function ObjectView({ o, zoom, selected, editing, onStartMove, onTextChange, onCommitText, textRef }: {
  o: Overlay; zoom: number; selected: boolean; editing: boolean;
  onStartMove: (e: React.PointerEvent) => void;
  onTextChange: (t: string) => void;
  onCommitText: () => void;
  textRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  if (o.kind === "text") {
    const t = o;
    const pad = t.bg !== "none" ? t.padding : 0;
    const bgCss =
      t.bg === "solid" ? t.bgColor :
      t.bg === "highlight" ? hexAlpha(t.bgColor, 0.4) :
      "transparent";
    const borderCss = t.borderWidth > 0 ? `${t.borderWidth}px solid ${t.borderColor}` : "none";
    const radius = t.bg === "solid" ? 4 : 0;
    return (
      <div
        className={`absolute ${selected && !editing ? "outline outline-1 outline-blue-500" : ""}`}
        style={{
          left: t.x * zoom, top: t.y * zoom, width: t.w * zoom, minHeight: t.h * zoom,
          transform: `rotate(${t.rotation}deg)`, transformOrigin: "center",
          opacity: t.opacity, zIndex: t.z, cursor: "move",
        }}
        onPointerDown={onStartMove}
        onDoubleClick={(e) => { e.stopPropagation(); }}
      >
        {editing ? (
          <textarea
            ref={textRef}
            defaultValue={t.text}
            onChange={(e) => { onTextChange(e.target.value); const ta = e.target; ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onBlur={onCommitText}
            onKeyDown={(e) => { if (e.key === "Escape") (e.target as HTMLTextAreaElement).blur(); }}
            className="w-full resize-none outline-none border border-dashed border-blue-500 overflow-hidden"
            style={{
              fontFamily: FONT_CSS[t.fontFamily], fontSize: t.fontSize * zoom, fontWeight: t.bold ? 700 : 400,
              fontStyle: t.italic ? "italic" : "normal", color: t.color, textAlign: t.align,
              background: bgCss, border: borderCss, borderRadius: radius, padding: pad * zoom,
              lineHeight: 1.25, minHeight: t.h * zoom, boxSizing: "border-box",
            }}
          />
        ) : (
          <div
            className="whitespace-pre-wrap break-words"
            style={{
              fontFamily: FONT_CSS[t.fontFamily], fontSize: t.fontSize * zoom, fontWeight: t.bold ? 700 : 400,
              fontStyle: t.italic ? "italic" : "normal", color: t.color, textAlign: t.align,
              background: bgCss, border: borderCss, borderRadius: radius, padding: pad * zoom,
              lineHeight: 1.25, minHeight: t.h * zoom, boxSizing: "border-box",
            }}
          >
            {t.text || " "}
          </div>
        )}
      </div>
    );
  }

  if (o.kind === "image") {
    return (
      <div
        className={`absolute ${selected ? "outline outline-1 outline-blue-500" : ""}`}
        style={{ left: o.x * zoom, top: o.y * zoom, width: o.w * zoom, height: o.h * zoom, transform: `rotate(${o.rotation}deg)`, transformOrigin: "center", opacity: o.opacity, zIndex: o.z, cursor: "move" }}
        onPointerDown={onStartMove}
      >
        <img src={o.dataUrl} alt="" className="w-full h-full pointer-events-none" draggable={false} />
      </div>
    );
  }

  if (o.kind === "shape") {
    const s = o;
    const W = s.w * zoom, H = s.h * zoom;
    const stroke = { stroke: s.stroke, strokeWidth: s.strokeWidth * zoom, fill: s.fill === "transparent" ? "none" : s.fill };
    return (
      <div
        className={`absolute ${selected ? "outline outline-1 outline-blue-500" : ""}`}
        style={{ left: s.x * zoom, top: s.y * zoom, width: W, height: H, transform: `rotate(${s.rotation}deg)`, transformOrigin: "center", opacity: s.opacity, zIndex: s.z, cursor: "move" }}
        onPointerDown={onStartMove}
      >
        <svg width={W} height={H} className="block overflow-visible">
          {s.shape === "rect" && <rect x={0} y={0} width={W} height={H} {...stroke} vectorEffect="non-scaling-stroke" />}
          {s.shape === "ellipse" && <ellipse cx={W / 2} cy={H / 2} rx={W / 2} ry={H / 2} {...stroke} vectorEffect="non-scaling-stroke" />}
          {(s.shape === "line" || s.shape === "arrow") && (() => {
            const x1 = 0, y1 = s.diag >= 0 ? 0 : H, x2 = W, y2 = s.diag >= 0 ? H : 0;
            return (
              <>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={s.stroke} strokeWidth={s.strokeWidth * zoom} strokeLinecap="round" />
                {s.shape === "arrow" && <ArrowHead x1={x1} y1={y1} x2={x2} y2={y2} color={s.stroke} w={s.strokeWidth * zoom} />}
              </>
            );
          })()}
        </svg>
      </div>
    );
  }
  return null;
}

function ArrowHead({ x1, y1, x2, y2, color, w }: { x1: number; y1: number; x2: number; y2: number; color: string; w: number }) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const len = 8 + w * 1.5;
  const a1 = ang + Math.PI - 0.4, a2 = ang + Math.PI + 0.4;
  return (
    <>
      <line x1={x2} y1={y2} x2={x2 + len * Math.cos(a1)} y2={y2 + len * Math.sin(a1)} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <line x1={x2} y1={y2} x2={x2 + len * Math.cos(a2)} y2={y2 + len * Math.sin(a2)} stroke={color} strokeWidth={w} strokeLinecap="round" />
    </>
  );
}

function ShapePreview({ shape, zoom, color, brush }: { shape: { shape: "rect" | "ellipse" | "line" | "arrow"; start: Point; end: Point }; zoom: number; color: string; brush: number }) {
  const x = Math.min(shape.start.x, shape.end.x) * zoom;
  const y = Math.min(shape.start.y, shape.end.y) * zoom;
  const w = Math.abs(shape.end.x - shape.start.x) * zoom;
  const h = Math.abs(shape.end.y - shape.start.y) * zoom;
  const diag = (shape.end.x >= shape.start.x) === (shape.end.y >= shape.start.y) ? 1 : -1;
  return (
    <svg className="absolute top-0 left-0 pointer-events-none" style={{ left: 0, top: 0, overflow: "visible" }}>
      {shape.shape === "rect" && <rect x={x} y={y} width={w} height={h} stroke={color} strokeWidth={Math.max(brush, 2) * zoom} fill="none" />}
      {shape.shape === "ellipse" && <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} stroke={color} strokeWidth={Math.max(brush, 2) * zoom} fill="none" />}
      {(shape.shape === "line" || shape.shape === "arrow") && (
        <line x1={x} y1={diag >= 0 ? y : y + h} x2={x + w} y2={diag >= 0 ? y + h : y} stroke={color} strokeWidth={Math.max(brush, 2) * zoom} strokeLinecap="round" />
      )}
    </svg>
  );
}

/* ---------- Selection frame ---------- */
function SelectionFrame({ o, zoom, onResizeStart, onRotateStart, onMoveStart }: {
  o: Overlay; zoom: number;
  onResizeStart: (handle: string, e: React.PointerEvent) => void;
  onRotateStart: (e: React.PointerEvent) => void;
  onMoveStart: (e: React.PointerEvent) => void;
}) {
  const b = bbox(o);
  const canResize = o.kind !== "stroke" && Math.abs(o.rotation) < 1;
  const canRotate = o.kind !== "stroke";
  const left = b.x * zoom, top = b.y * zoom, w = b.w * zoom, h = b.h * zoom;
  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
  const cursorFor: Record<string, string> = { nw: "nwse-resize", n: "ns-resize", ne: "nesw-resize", e: "ew-resize", se: "nwse-resize", s: "ns-resize", sw: "nesw-resize", w: "ew-resize" };
  const pos: Record<string, React.CSSProperties> = {
    nw: { left: -5, top: -5 }, n: { left: w / 2 - 5, top: -5 }, ne: { left: w - 5, top: -5 },
    e: { left: w - 5, top: h / 2 - 5 }, se: { left: w - 5, top: h - 5 }, s: { left: w / 2 - 5, top: h - 5 },
    sw: { left: -5, top: h - 5 }, w: { left: -5, top: h / 2 - 5 },
  };
  return (
    <div
      className="absolute border border-blue-500"
      style={{ left, top, width: w, height: h, transform: `rotate(${o.rotation}deg)`, transformOrigin: "center", zIndex: 9999, pointerEvents: "none" }}
    >
      {/* move hit area */}
      <div className="absolute inset-0" style={{ cursor: "move", pointerEvents: "auto" }} onPointerDown={onMoveStart} />
      {/* rotate handle */}
      {canRotate && (
        <div
          className="absolute w-5 h-5 bg-white border border-blue-500 rounded-full flex items-center justify-center"
          style={{ left: w / 2 - 10, top: -28, cursor: "grab", pointerEvents: "auto" }}
          onPointerDown={onRotateStart}
          title="Rotate"
        >
          <RotateCw size={11} className="text-blue-600" />
        </div>
      )}
      {/* resize handles */}
      {canResize && handles.map(hd => (
        <div
          key={hd}
          className="absolute w-2.5 h-2.5 bg-white border border-blue-500"
          style={{ ...pos[hd], cursor: cursorFor[hd], pointerEvents: "auto" }}
          onPointerDown={(e) => onResizeStart(hd, e)}
        />
      ))}
    </div>
  );
}
