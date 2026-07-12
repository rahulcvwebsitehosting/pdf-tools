import { loadPyMuPDF } from "./pymupdf-loader";

export type PdfToolOp =
  | "merge"
  | "split"
  | "extract"
  | "remove"
  | "rotate"
  | "reverse"
  | "compress"
  | "greyscale"
  | "pdf-to-image"
  | "image-to-pdf"
  | "watermark"
  | "page-numbers"
  | "encrypt"
  | "decrypt"
  | "metadata"
  | "remove-metadata"
  | "extract-text"
  | "coming-soon";

export interface PdfToolOptions {
  // generic option bag, fields used depending on op
  pages?: number[];
  ranges?: { start: number; end: number }[];
  angle?: number;
  quality?: "low" | "medium" | "high" | "maximum";
  format?: "png" | "jpg" | "jpeg" | "webp" | "bmp" | "tiff" | "json" | "md" | "html" | "text";
  dpi?: number;
  text?: string;
  password?: string;
  ownerPassword?: string;
  permissions?: string[];
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  position?: string;
  startNumber?: number;
  removeMetadata?: boolean;
  [key: string]: unknown;
}

export interface PdfToolResult {
  blobs: Blob[];
  filename: string;
  meta?: Record<string, unknown>;
}

function b64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function uid(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Run a single PDF operation entirely client-side via PyMuPDF (Pyodide WASM).
 * Returns one or more output blobs.
 */
export async function runPdfTool(
  op: PdfToolOp,
  files: File[],
  options: PdfToolOptions = {}
): Promise<PdfToolResult> {
  if (op === "coming-soon") {
    throw new Error("This tool is coming soon. The engine for it is not wired up yet.");
  }

  const instance = await loadPyMuPDF();
  const pyodide = instance.pyodide;

  const writeFile = (path: string, file: File) =>
    file.arrayBuffer().then((ab) => pyodide.FS.writeFile(path, new Uint8Array(ab)));

  const toBlob = (b64: string, type: string) =>
    new Blob([b64ToBytes(b64) as unknown as BlobPart], { type });

  switch (op) {
    case "merge": {
      const tag = uid();
      const paths: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const p = `/merge_${tag}_${i}.pdf`;
        await writeFile(p, files[i]);
        paths.push(p);
      }
      const out = `/merge_${tag}_out.pdf`;
      const result = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open()
for p in ${JSON.stringify(paths)}:
    src = pymupdf.open(p)
    doc.insert_pdf(src)
    src.close()
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      paths.forEach((p) => {
        try { pyodide.FS.unlink(p); } catch {}
      });
      return { blobs: [toBlob(result, "application/pdf")], filename: "merged.pdf" };
    }

    case "split": {
      const tag = uid();
      const inPath = `/split_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const ranges = options.ranges && options.ranges.length ? options.ranges : [{ start: 1, end: 9999 }];
      const blobs: Blob[] = [];
      for (const r of ranges) {
        const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
new_doc = pymupdf.open()
for i in range(${r.start - 1}, ${r.end}):
    if i < len(doc):
        new_doc.insert_pdf(doc, from_page=i, to_page=i)
pdf_bytes = new_doc.tobytes(garbage=4, deflate=True)
doc.close(); new_doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
        blobs.push(toBlob(res, "application/pdf"));
      }
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs, filename: "split.pdf" };
    }

    case "extract":
    case "remove": {
      const tag = uid();
      const inPath = `/ep_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const pages = (options.pages || []).map((p) => p - 1);
      const mode = op === "extract" ? "keep" : "drop";
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
new_doc = pymupdf.open()
total = len(doc)
sel = set(${JSON.stringify(pages)})
for i in range(total):
    keep = (i in sel) if "${mode}" == "keep" else (i not in sel)
    if keep and i < total:
        new_doc.insert_pdf(doc, from_page=i, to_page=i)
pdf_bytes = new_doc.tobytes(garbage=4, deflate=True)
doc.close(); new_doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: op === "extract" ? "extracted.pdf" : "removed.pdf" };
    }

    case "rotate": {
      const tag = uid();
      const inPath = `/rot_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const angle = options.angle ?? 90;
      const pages = options.pages && options.pages.length ? options.pages.map((p) => p - 1) : null;
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
angle = ${angle}
pages = ${JSON.stringify(pages)}
for i, page in enumerate(doc):
    if pages is None or i in pages:
        page.set_rotation((page.rotation + angle) % 360)
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "rotated.pdf" };
    }

    case "reverse": {
      const tag = uid();
      const inPath = `/rev_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
new_doc = pymupdf.open()
for i in range(len(doc)-1, -1, -1):
    new_doc.insert_pdf(doc, from_page=i, to_page=i)
pdf_bytes = new_doc.tobytes(garbage=4, deflate=True)
doc.close(); new_doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "reversed.pdf" };
    }

    case "compress": {
      const blob = await instance.compress(files[0], {
        quality: options.quality || "medium",
        removeMetadata: options.removeMetadata || false,
      });
      return { blobs: [blob], filename: "compressed.pdf" };
    }

    case "greyscale": {
      const tag = uid();
      const inPath = `/grey_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
for page in doc:
    page.get_pixmap().clear_with()
    pix = page.get_pixmap()
    img = pymupdf.Pixmap(pymupdf.csGRAY, pix)
    page.insert_image(page.rect, pixmap=img)
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "greyscale.pdf" };
    }

    case "pdf-to-image": {
      const tag = uid();
      const inPath = `/img_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const fmt = options.format || "png";
      const dpi = options.dpi || 150;
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64, json
doc = pymupdf.open("${inPath}")
dpi = ${dpi}
fmt = "${fmt}"
mat = pymupdf.Matrix(dpi/72, dpi/72)
imgs = []
for page in doc:
    pix = page.get_pixmap(matrix=mat, alpha=(fmt in ("png",)))
    ext = "png" if fmt in ("png","jpg","jpeg") else fmt
    out_fmt = "png" if fmt == "png" else ("jpeg" if fmt in ("jpg","jpeg") else fmt)
    imgs.append(base64.b64encode(pix.tobytes(output=out_fmt)).decode('ascii'))
doc.close()
json.dumps(imgs)
`);
      const arr = JSON.parse(res) as string[];
      const mime = fmt === "jpg" || fmt === "jpeg" ? "image/jpeg" : fmt === "webp" ? "image/webp" : fmt === "bmp" ? "image/bmp" : "image/png";
      const blobs = arr.map((b) => toBlob(b, mime));
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs, filename: `page.${fmt === "jpg" ? "jpg" : fmt}` };
    }

    case "image-to-pdf": {
      const tag = uid();
      const paths: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const p = `/img2pdf_${tag}_${i}${getExt(files[i].name)}`;
        await writeFile(p, files[i]);
        paths.push(p);
      }
      const out = `/img2pdf_${tag}_out.pdf`;
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open()
for p in ${JSON.stringify(paths)}:
    try:
        pix = pymupdf.Pixmap(p)
    except Exception:
        continue
    if pix.n - pix.alpha >= 4:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    page = doc.new_page(width=pix.width, height=pix.height)
    page.insert_image(page.rect, pixmap=pix)
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      paths.forEach((p) => { try { pyodide.FS.unlink(p); } catch {} });
      return { blobs: [toBlob(res, "application/pdf")], filename: "images.pdf" };
    }

    case "watermark": {
      const tag = uid();
      const inPath = `/wm_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const text = (options.text || "Watermark").replace(/"/g, '\\"');
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
for page in doc:
    r = page.rect
    page.insert_text((r.width/2 - 120, r.height/2), "${text}", fontsize=40, color=(0.7,0.7,0.7), rotate=45)
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "watermarked.pdf" };
    }

    case "page-numbers": {
      const tag = uid();
      const inPath = `/pn_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const start = options.startNumber ?? 1;
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
n = ${start}
for page in doc:
    r = page.rect
    page.insert_text((r.width - 60, r.height - 30), str(n), fontsize=10, color=(0,0,0))
    n += 1
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "numbered.pdf" };
    }

    case "encrypt": {
      const tag = uid();
      const inPath = `/enc_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const user = (options.password || "").replace(/"/g, '\\"');
      const owner = (options.ownerPassword || options.password || "").replace(/"/g, '\\"');
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
doc.save("/tmp_enc_${tag}.pdf", encryption=pymupdf.PDF_ENCRYPT_AES_256, user_pw="${user}", owner_pw="${owner}")
doc.close()
with open("/tmp_enc_${tag}.pdf","rb") as f:
    data = f.read()
base64.b64encode(data).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); pyodide.FS.unlink(`/tmp_enc_${tag}.pdf`); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "encrypted.pdf" };
    }

    case "decrypt": {
      const tag = uid();
      const inPath = `/dec_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const pwd = (options.password || "").replace(/"/g, '\\"');
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
if doc.needs_pass:
    doc.authenticate("${pwd}")
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "unlocked.pdf" };
    }

    case "metadata": {
      const tag = uid();
      const inPath = `/meta_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const md: Record<string, string> = {};
      if (options.title) md.title = options.title;
      if (options.author) md.author = options.author;
      if (options.subject) md.subject = options.subject;
      if (options.keywords) md.keywords = options.keywords;
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64, json
doc = pymupdf.open("${inPath}")
doc.set_metadata(${JSON.stringify(md)})
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "metadata.pdf" };
    }

    case "remove-metadata": {
      const tag = uid();
      const inPath = `/rmmeta_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64
doc = pymupdf.open("${inPath}")
doc.set_metadata({})
try:
    doc.del_xml_metadata()
except Exception:
    pass
pdf_bytes = doc.tobytes(garbage=4, deflate=True)
doc.close()
base64.b64encode(pdf_bytes).decode('ascii')
`);
      try { pyodide.FS.unlink(inPath); } catch {}
      return { blobs: [toBlob(res, "application/pdf")], filename: "no-metadata.pdf" };
    }

    case "extract-text": {
      const tag = uid();
      const inPath = `/txt_${tag}.pdf`;
      await writeFile(inPath, files[0]);
      const mode = options.format === "json" ? "json" : options.format === "html" ? "html" : "text";
      const res = await pyodide.runPythonAsync(`
import pymupdf, base64, json
doc = pymupdf.open("${inPath}")
out = []
for page in doc:
    out.append(page.get_text("${mode}"))
doc.close()
text = "\\n".join(out)
base64.b64encode(text.encode('utf-8')).decode('ascii')
`);
      const text = decodeURIComponent(escape(atob(res)));
      const isJson = options.format === "json";
      return {
        blobs: [new Blob([text], { type: isJson ? "application/json" : "text/plain" })],
        filename: `extracted.${isJson ? "json" : "txt"}`,
        meta: { length: text.length },
      };
    }

    default:
      throw new Error("Unsupported operation");
  }
}

function getExt(name: string): string {
  const m = /\.[^.]+$/.exec(name);
  return m ? m[0].toLowerCase() : "";
}
