"use client";

import { useRef, useState } from "react";
import { runPdfTool, type PdfToolOptions } from "@/lib/pdf/pdf-engine";
import { pdfToolConfig } from "@/lib/pdf-tools";
import { Loader2, Download, AlertTriangle, UploadCloud } from "lucide-react";

interface Props {
  slug: string;
}

export default function PdfGenericTool({ slug }: Props) {
  const cfg = pdfToolConfig[slug];
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<PdfToolOptions>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ blobs: Blob[]; filename: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!cfg) {
    return (
      <div className="editorial-panel p-8 text-center text-muted-foreground">
        Unknown tool.
      </div>
    );
  }

  const isImageIn = cfg.op === "image-to-pdf";
  const multi = cfg.maxFiles > 1;

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []).slice(0, cfg.maxFiles);
    setFiles(list);
    setResults(null);
    setError(null);
  };

  const setOpt = (k: string, v: unknown) =>
    setOptions((o) => ({ ...o, [k]: v }));

  const run = async () => {
    if (!files.length) {
      setError("Please select a file first.");
      return;
    }
    setBusy(true);
    setError(null);
    setResults(null);
    setStatus("Loading PDF engine (PyMuPDF)… this may take a few seconds on first run.");
    try {
      const merged: PdfToolOptions = { ...cfg.fixed, ...options };
      const res = await runPdfTool(cfg.op, files, merged);
      setResults({ blobs: res.blobs, filename: res.filename });
      setStatus("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed.");
    } finally {
      setBusy(false);
    }
  };

  const download = (blob: Blob, name: string, idx: number) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ext = name.includes(".") ? "" : blob.type.includes("pdf") ? ".pdf" : "";
    a.href = url;
    a.download = idx > 0 ? `${name.replace(/\./, `-${idx}.`)}` : name + ext;
    a.click();
    URL.revokeObjectURL(url);
  };

  const controls = cfg.controls || [];

  return (
    <div className="editorial-panel p-6 space-y-6">
      {/* Upload */}
      <div>
        <label className="block text-xs font-semibold text-foreground/80 mb-2">
          {isImageIn ? "Select image files" : "Select PDF file"}
          {multi && " (multiple)"}
        </label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full p-8 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border hover:border-primary hover:bg-accent/40 transition-colors rounded-xl cursor-pointer"
        >
          <UploadCloud className="w-8 h-8 text-muted-foreground" />
          <span className="font-mono text-xs uppercase">
            {files.length ? `${files.length} file(s) selected` : "Click to choose"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Accepts {cfg.accept.join(", ")}
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={cfg.accept.join(",")}
          multiple={multi}
          className="hidden"
          onChange={onPick}
        />
        {files.length > 0 && (
          <ul className="mt-2 text-xs text-muted-foreground font-mono">
            {files.map((f, i) => (
              <li key={i}>
                {f.name} ({(f.size / 1024).toFixed(0)} KB)
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Options */}
      {controls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {controls.includes("pages") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Pages (e.g. 1,3,5-7)
              </label>
              <input
                className="editorial-input w-full"
                placeholder="1,3,5-7"
                onChange={(e) =>
                  setOpt(
                    "pages",
                    e.target.value
                      .split(",")
                      .flatMap((p) => {
                        const t = p.trim();
                        if (!t) return [];
                        if (t.includes("-")) {
                          const [a, b] = t.split("-").map(Number);
                          return Array.from({ length: b - a + 1 }, (_, i) => a + i);
                        }
                        return [Number(t)];
                      })
                      .filter((n) => !isNaN(n))
                  )
                }
              />
            </div>
          )}
          {controls.includes("angle") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Angle (degrees)
              </label>
              <input
                type="number"
                className="editorial-input w-full"
                defaultValue={options.angle ?? 90}
                onChange={(e) => setOpt("angle", Number(e.target.value))}
              />
            </div>
          )}
          {controls.includes("quality") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Quality
              </label>
              <select
                className="editorial-input w-full"
                defaultValue="medium"
                onChange={(e) => setOpt("quality", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="maximum">Maximum</option>
              </select>
            </div>
          )}
          {controls.includes("format") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Output format
              </label>
              <select
                className="editorial-input w-full"
                defaultValue={options.format ?? "png"}
                onChange={(e) => setOpt("format", e.target.value)}
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
                <option value="bmp">BMP</option>
                <option value="tiff">TIFF</option>
              </select>
            </div>
          )}
          {controls.includes("dpi") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                DPI
              </label>
              <input
                type="number"
                className="editorial-input w-full"
                defaultValue={options.dpi ?? 150}
                onChange={(e) => setOpt("dpi", Number(e.target.value))}
              />
            </div>
          )}
          {controls.includes("text") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Text
              </label>
              <input
                className="editorial-input w-full"
                placeholder="CONFIDENTIAL"
                onChange={(e) => setOpt("text", e.target.value)}
              />
            </div>
          )}
          {controls.includes("password") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Password
              </label>
              <input
                type="password"
                className="editorial-input w-full"
                onChange={(e) => setOpt("password", e.target.value)}
              />
            </div>
          )}
          {controls.includes("ownerPassword") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Owner password
              </label>
              <input
                type="password"
                className="editorial-input w-full"
                onChange={(e) => setOpt("ownerPassword", e.target.value)}
              />
            </div>
          )}
          {controls.includes("startNumber") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Start number
              </label>
              <input
                type="number"
                className="editorial-input w-full"
                defaultValue={1}
                onChange={(e) => setOpt("startNumber", Number(e.target.value))}
              />
            </div>
          )}
          {controls.includes("title") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">Title</label>
              <input className="editorial-input w-full" onChange={(e) => setOpt("title", e.target.value)} />
            </div>
          )}
          {controls.includes("author") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">Author</label>
              <input className="editorial-input w-full" onChange={(e) => setOpt("author", e.target.value)} />
            </div>
          )}
          {controls.includes("subject") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">Subject</label>
              <input className="editorial-input w-full" onChange={(e) => setOpt("subject", e.target.value)} />
            </div>
          )}
          {controls.includes("keywords") && (
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">Keywords</label>
              <input className="editorial-input w-full" onChange={(e) => setOpt("keywords", e.target.value)} />
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={run}
          disabled={busy}
          className="editorial-btn-primary px-5 py-2.5 text-sm disabled:opacity-50"
        >
          {busy ? "Processing…" : "Run Tool"}
        </button>
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
      </div>

      {status && (
        <p className="text-xs text-muted-foreground font-mono">{status}</p>
      )}
      {error && (
        <div className="flex items-start gap-2 text-red-600 text-sm font-mono bg-red-50 border border-red-200 p-3">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {results && (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase font-bold">Result</p>
          {results.blobs.map((b, i) => (
            <button
              key={i}
              type="button"
              onClick={() => download(b, results.filename, i)}
               className="editorial-card w-full p-3.5 flex items-center justify-between hover:border-primary transition-colors cursor-pointer"
            >
              <span className="font-mono text-xs flex items-center gap-2">
                <Download className="w-4 h-4" />
                {results.filename}
                {results.blobs.length > 1 ? ` (part ${i + 1})` : ""}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {(b.size / 1024).toFixed(0)} KB
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
