/**
 * PDF parsing and rendering utilities for client-side document AI preprocessing.
 * Utilizes the local offline copy of PDF.js located in public/js/.
 */

export async function loadPdfJs(): Promise<any> {
  if (typeof window === 'undefined') return null;
  // @ts-ignore
  if (window.pdfjsLib) return window.pdfjsLib;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/js/pdf.min.js';
    script.onload = () => {
      // @ts-ignore
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';
      resolve(pdfjsLib);
    };
    script.onerror = (e) => reject(new Error('Failed to load local PDF.js parser: ' + e));
    document.body.appendChild(script);
  });
}

/**
 * Extracts raw textual layout from digital PDF documents, ignoring compressed streams, objects, and fonts.
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  const pdfjsLib = await loadPdfJs();
  if (!pdfjsLib) throw new Error('PDF parsing environment not loaded.');

  const arrayBuffer = await file.arrayBuffer();
  
  // Basic validation for PDF header (must start with %PDF-)
  const headerBytes = new Uint8Array(arrayBuffer.slice(0, 5));
  const header = String.fromCharCode(...headerBytes);
  if (header !== '%PDF-') {
    throw new Error('Invalid file format: Not a valid PDF document header.');
  }

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      // @ts-ignore
      .map((item: any) => item.str)
      .join(' ');
    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
  }

  // Preprocess: Clean double spaces, non-printable ASCII noise, and normalize spaces
  fullText = fullText
    .replace(/[^\x20-\x7E\s]/g, '') // strip binary noise (non-printable chars)
    .replace(/\s+/g, ' ')           // normalize whitespace layout
    .trim();

  if (!fullText || fullText.replace(/--- Page \d+ ---/g, '').trim().length === 0) {
    throw new Error('This PDF appears to be a scanned document or has empty text layers. Please run OCR/Image processing instead.');
  }

  return fullText;
}

/**
 * Renders a PDF page to a base64 PNG data URL for vision and OCR tasks.
 */
export async function renderPdfPageToImage(file: File, pageNum: number = 1): Promise<string> {
  const pdfjsLib = await loadPdfJs();
  if (!pdfjsLib) throw new Error('PDF rendering environment not loaded.');

  const arrayBuffer = await file.arrayBuffer();
  
  // Basic validation
  const headerBytes = new Uint8Array(arrayBuffer.slice(0, 5));
  const header = String.fromCharCode(...headerBytes);
  if (header !== '%PDF-') {
    throw new Error('Invalid file format: Not a valid PDF document header.');
  }

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  if (pageNum < 1 || pageNum > pdf.numPages) {
    throw new Error(`Requested page ${pageNum} is out of bounds (1-${pdf.numPages}).`);
  }

  const page = await pdf.getPage(pageNum);

  // Use a scaling factor of 2.0 to enhance OCR accuracy (higher resolution input)
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Failed to get 2D rendering canvas context.');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toDataURL('image/png');
}

/**
 * Renders all pages in a PDF and performs OCR on them progressively.
 */
export async function extractTextFromPdfOcr(
  file: File,
  ocrRunner: (imageSrc: string) => Promise<string>,
  progressCallback?: (curr: number, total: number) => void
): Promise<string> {
  const pdfjsLib = await loadPdfJs();
  if (!pdfjsLib) throw new Error('PDF rendering environment not loaded.');

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let compiledText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    if (progressCallback) progressCallback(i, pdf.numPages);
    
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Failed to get canvas rendering context.');

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport }).promise;
    
    // Canvas Enhancement (Grayscale, Contrast enhancement for OCR)
    enhanceCanvasForOcr(context, canvas.width, canvas.height);
    
    const imgDataUrl = canvas.toDataURL('image/png');
    const text = await ocrRunner(imgDataUrl);
    compiledText += `--- Page ${i} ---\n${text}\n\n`;
  }

  return compiledText;
}

/**
 * Grayscale & basic high-contrast thresholding for OCR text recognition.
 */
export function enhanceCanvasForOcr(ctx: CanvasRenderingContext2D, width: number, height: number) {
  try {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Grayscale conversion
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Simple adaptive threshold-like high contrast enhancement
      // Makes text darker, background whiter
      const finalVal = gray < 128 ? 0 : 255;
      data[i] = finalVal;
      data[i + 1] = finalVal;
      data[i + 2] = finalVal;
    }
    ctx.putImageData(imgData, 0, 0);
  } catch (e) {
    console.warn('Canvas image enhancement failed:', e);
  }
}
