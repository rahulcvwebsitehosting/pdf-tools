"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { PrivacyAlertBanner } from "@/components/privacy-alert-banner";
import { useState, useEffect } from "react";
import { useVisionAi, useTextAi } from "@/hooks/useAi";
import { renderPdfPageToImage, enhanceCanvasForOcr } from "@/lib/pdf-parser";
import Link from "next/link";

export default function FreeAiAiInvoiceReaderTool() {
  const isReceipt = false;
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [ocrStatus, setOcrStatus] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);
  const [metadata, setMetadata] = useState<any>(null);
  
  const { status: visionStatus, progress: visionProgress, output: ocrText, error: ocrError, isReady: visionReady, loadingMessage: visionLoading, runOcr, initWorker: initVisionWorker } = useVisionAi('ocr');
  const { status: textStatus, overallProgress, output: aiResult, error: textError, isReady: textReady, loadingMessage: textLoading, generate, initWorker: initTextWorker } = useTextAi();

  useEffect(() => {
    initVisionWorker();
    initTextWorker();
  }, [initVisionWorker, initTextWorker]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMetadata(null);
      setOcrStatus("");
      setOcrProgress(0);
      
      if (selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf")) {
        try {
          setOcrStatus("Rendering PDF preview...");
          const previewUrl = await renderPdfPageToImage(selectedFile, 1);
          setImage(previewUrl);
          setOcrStatus("PDF loaded. Ready to parse.");
        } catch (err: any) {
          setOcrStatus("Failed to render PDF: " + err.message);
        }
      } else {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result as string);
        reader.readAsDataURL(selectedFile);
        setOcrStatus("Image loaded. Ready to parse.");
      }
    }
  };

  const runOcrPromise = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const worker = initVisionWorker();
      const handleMsg = (e: MessageEvent) => {
        if (e.data.type === 'result') {
          worker.removeEventListener('message', handleMsg);
          resolve(e.data.output);
        } else if (e.data.type === 'error') {
          worker.removeEventListener('message', handleMsg);
          reject(new Error(e.data.error));
        }
      };
      worker.addEventListener('message', handleMsg);
      worker.postMessage({ type: 'ocr', image: imageSrc });
    });
  };

  const handleProcess = async () => {
    if (!image || !isReady) return;
    setMetadata(null);
    setOcrProgress(0);
    
    let compiledOcrText = "";
    if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
      try {
        setOcrStatus("Initializing PDF extraction...");
        const { loadPdfJs } = await import("@/lib/pdf-parser");
        const pdfjsLib = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        for (let i = 1; i <= pdf.numPages; i++) {
          setOcrStatus(`Rendering page ${i} of ${pdf.numPages}...`);
          setOcrProgress(Math.round(((i - 0.5) / pdf.numPages) * 100));
          
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: context, viewport }).promise;
            enhanceCanvasForOcr(context, canvas.width, canvas.height);
            const pageImg = canvas.toDataURL("image/png");
            
            setOcrStatus(`Running OCR on page ${i} of ${pdf.numPages}...`);
            const pageText = await runOcrPromise(pageImg);
            compiledOcrText += `--- Page ${i} ---\n${pageText}\n\n`;
          }
          setOcrProgress(Math.round((i / pdf.numPages) * 100));
        }
        setOcrStatus("PDF Text Extracted. Analyzing with local AI...");
      } catch (err: any) {
        setOcrStatus("OCR Error: " + err.message);
        return;
      }
    } else {
      try {
        setOcrStatus("Enhancing image...");
        const img = new Image();
        const text = await new Promise<string>((resolve, reject) => {
          img.onload = async () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (context) {
              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0);
              enhanceCanvasForOcr(context, img.width, img.height);
              const enhancedImg = canvas.toDataURL("image/png");
              setOcrStatus("Extracting text fields...");
              try {
                const res = await runOcrPromise(enhancedImg);
                resolve(res);
              } catch (err) {
                reject(err);
              }
            }
          };
          img.src = image;
        });
        compiledOcrText = text;
        setOcrStatus("Analyzing table structure...");
        setOcrProgress(100);
      } catch (err: any) {
        setOcrStatus("OCR Error: " + err.message);
        return;
      }
    }

    if (compiledOcrText && compiledOcrText.trim() && textReady) {
      setOcrStatus("Extracting metadata fields using local LLM...");
      const fewShotConfig = [
    { role: "system", content: "You are a strict, single-purpose utility for parsing OCR invoice data and extracting billing details, payment terms, and totals. Output ONLY the final processed result. Do NOT include greetings, conversational filler, markdown blocks, or explanations." },
    { role: "user", content: "Invoice #456 due July 1. Total: $500" },
    { role: "assistant", content: "- Invoice Number: #456\n- Due Date: July 1\n- Total Due: $500.00" },
    { role: "user", content: "Invoicely Ltd\nTo: Client Corp\nInvoice: INV-9901\nIssue Date: 06/01/2026\nConsulting Services: $1200.00\nTotal Due: $1200.00" },
    { role: "assistant", content: "- Invoice: INV-9901\n- Vendor: Invoicely Ltd\n- Client: Client Corp\n- Date: 06/01/2026\n- Line Items:\n  - Consulting Services: $1,200.00\n- Total Due: $1,200.00" }
  ];
      generate([
        ...fewShotConfig,
        { role: "user", content: compiledOcrText }
      ]);
    }
  };

  const handleSample = () => {
    const sampleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbUlEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnBy38AAGyW4F5AAAAAElFTkSuQmCC";
    setImage(sampleImage);
    setFile(null);
    setOcrStatus("Sample loaded. Ready to parse.");
    if (isReceipt) {
      setMetadata({
        merchant: "SuperStore Mart",
        date: "2026-06-20",
        total: "$15.99",
        tax: "$1.20",
        items: [
          { name: "Organic Apples", qty: "1 bag", price: "$5.99" },
          { name: "Whole Milk 1G", qty: "1 carton", price: "$4.50" },
          { name: "Granola Bars 6ct", qty: "1 box", price: "$4.30" }
        ]
      });
    } else {
      setMetadata({
        vendor: "Invoicely Solutions",
        invoiceNum: "INV-2026-9081",
        dueDate: "2026-07-01",
        tax: "$96.00",
        total: "$1,296.00",
        items: [
          { name: "Frontend Development Consulting", qty: "12 hours", price: "$1,200.00" }
        ]
      });
    }
  };

  useEffect(() => {
    if (aiResult) {
      try {
        setOcrStatus("Formatting structured fields...");
        const lines = aiResult.split("\n");
        const parsed: any = { items: [] };
        lines.forEach(l => {
          if (l.toLowerCase().includes("store:") || l.toLowerCase().includes("merchant:")) parsed.merchant = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("vendor:")) parsed.vendor = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("invoice:")) parsed.invoiceNum = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("date:")) parsed.date = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("due date:")) parsed.dueDate = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("tax:")) parsed.tax = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("total:")) parsed.total = l.split(":")[1]?.trim();
          else if (l.startsWith("- ") || l.startsWith("* ")) {
            const parts = l.substring(2).split(":");
            if (parts.length >= 2) {
              parsed.items.push({ name: parts[0]?.trim(), price: parts[1]?.trim(), qty: "1" });
            }
          }
        });
        if (!parsed.merchant && !parsed.vendor) {
          parsed.merchant = isReceipt ? "Detected Store" : undefined;
          parsed.vendor = !isReceipt ? "Detected Vendor" : undefined;
        }
        setMetadata(parsed);
        setOcrStatus("Processing completed!");
      } catch (e) {
        console.error(e);
        setOcrStatus("Failed to format fields.");
      }
    }
  }, [aiResult]);

  const isReady = visionReady && textReady;
  const isOcrRunning = ocrStatus.includes("Rendering") || ocrStatus.includes("OCR") || ocrStatus.includes("Extracting") || textStatus === 'generating' || textStatus === 'loading';

  const handleExportCsv = () => {
    if (!metadata) return;
    let csv = isReceipt ? "Merchant,Date,Tax,Total\n" : "Vendor,Invoice Number,Due Date,Tax,Total\n";
    if (isReceipt) {
      csv += `"${metadata.merchant || ''}","${metadata.date || ''}","${metadata.tax || ''}","${metadata.total || ''}"\n\nItem,Price\n`;
      metadata.items?.forEach((it: any) => {
        csv += `"${it.name}","${it.price}"\n`;
      });
    } else {
      csv += `"${metadata.vendor || ''}","${metadata.invoiceNum || ''}","${metadata.dueDate || ''}","${metadata.tax || ''}","${metadata.total || ''}"\n\nItem,Price\n`;
      metadata.items?.forEach((it: any) => {
        csv += `"${it.name}","${it.price}"\n`;
      });
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = isReceipt ? "receipt.csv" : "invoice.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
      <PrivacyAlertBanner />
  
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-black p-6 text-center bg-background flex flex-col items-center justify-center min-h-[200px]">
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4 hover:underline">
                📁 Upload Document / Image
              </label>
              <div className="flex gap-2 mt-4">
                <button onClick={handleSample} className="btn-secondary text-[10px] py-1 px-3">
                  💡 Try Sample Invoice
                </button>
                <label htmlFor="file-upload" className="btn-secondary text-[10px] py-1 px-3 cursor-pointer">
                  📷 Camera Capture
                </label>
              </div>
            </div>

            {image && (
              <div className="border border-black p-2 bg-background flex flex-col items-center">
                <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground mb-1">Source Preview</span>
                <img src={image} alt="Preview" className="max-h-48 object-contain" />
              </div>
            )}

            {image && (
              <div className="flex items-center gap-3">
                <button onClick={handleProcess} disabled={!isReady || isOcrRunning} className="btn-primary">
                  {isOcrRunning ? 'Processing document...' : isReceipt ? 'Scan Receipt' : 'Read Invoice'}
                </button>
                {!isReady && (
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">
                    ⚙️ {!visionReady ? visionLoading : ''} {!textReady ? textLoading : ''}
                  </div>
                )}
                {ocrStatus && (
                  <div className="text-xs font-mono text-muted-foreground">
                    ⚡ {ocrStatus}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border border-black p-4 bg-background flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-muted-foreground border-b border-black/10 pb-1">
                Structured SaaS Metadata
              </h3>

              {isOcrRunning ? (
                <div className="space-y-2 py-4">
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Binarizing Image Gradients...</div>
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Aligning Data Columns...</div>
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Isolating Transaction Totals...</div>
                  <div className="w-full bg-secondary h-2 border border-black overflow-hidden mt-4">
                    <div className="bg-accent h-full transition-all duration-300" style={{ width: `${ocrProgress || visionProgress || 0}%` }}></div>
                  </div>
                </div>
              ) : metadata ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="border border-black/10 p-2 bg-secondary/10">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold">{isReceipt ? 'Merchant' : 'Vendor'}</div>
                      <div className="font-bold">{isReceipt ? metadata.merchant : metadata.vendor}</div>
                    </div>
                    <div className="border border-black/10 p-2 bg-secondary/10">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold">{isReceipt ? 'Date' : 'Invoice Number'}</div>
                      <div className="font-bold">{isReceipt ? metadata.date : metadata.invoiceNum}</div>
                    </div>
                    <div className="border border-black/10 p-2 bg-secondary/10">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold">Tax</div>
                      <div className="font-bold">{metadata.tax}</div>
                    </div>
                    <div className="border border-black/10 p-2 bg-secondary/10">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold">Total</div>
                      <div className="font-bold text-accent">{metadata.total}</div>
                    </div>
                  </div>

                  <div className="border border-black/10">
                    <table className="w-full text-left font-mono text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-secondary/20 border-b border-black/10">
                          <th className="p-2">Item Description</th>
                          <th className="p-2 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metadata.items?.map((it: any, i: number) => (
                          <tr key={i} className="border-b border-black/10 last:border-b-0">
                            <td className="p-2">{it.name}</td>
                            <td className="p-2 text-right font-bold">{it.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center font-mono text-xs text-muted-foreground border border-dashed border-black/10">
                  Ready to scan fields
                </div>
              )}
            </div>

            {metadata && (
              <div className="space-y-4 pt-4 border-t border-black/10">
                <button onClick={handleExportCsv} className="btn-secondary w-full text-xs py-2">
                  📥 Export CSV Sheet
                </button>
                <div className="bg-accent/5 p-3 border border-black/10 text-xs font-mono">
                  <div className="font-bold uppercase text-[10px] text-muted-foreground mb-1">💡 Next Step Option</div>
                  <div className="flex items-center justify-between">
                    <span>Extract search keywords from parsed data</span>
                    <Link href="/tools/ai-keyword-extractor" className="underline font-bold text-accent">
                      Run Keyword Extractor →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
