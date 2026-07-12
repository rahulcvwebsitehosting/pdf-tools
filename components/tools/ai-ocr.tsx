"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { PrivacyAlertBanner } from "@/components/privacy-alert-banner";
import { SecureTextarea } from "@/components/secure-textarea";
import { useState, useEffect } from "react";
import { useVisionAi } from "@/hooks/useAi";
import { renderPdfPageToImage, enhanceCanvasForOcr } from "@/lib/pdf-parser";
import Link from "next/link";

export default function FreeAiAiOcrTool() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrStatus, setOcrStatus] = useState("");
  const { status, progress, output, error, isReady, loadingMessage, runOcr, initWorker } = useVisionAi('ocr');
  const [manualOutput, setManualOutput] = useState("");

  useEffect(() => {
    initWorker();
  }, [initWorker]);

  useEffect(() => {
    if (output) {
      setManualOutput(output);
    }
  }, [output]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setManualOutput("");
      setOcrStatus("");
      setOcrProgress(0);
      
      if (selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf")) {
        try {
          setOcrStatus("Rendering PDF preview...");
          const previewUrl = await renderPdfPageToImage(selectedFile, 1);
          setImage(previewUrl);
          setOcrStatus("PDF loaded. Ready to extract.");
        } catch (err: any) {
          setOcrStatus("Failed to render PDF preview: " + err.message);
        }
      } else {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result as string);
        reader.readAsDataURL(selectedFile);
        setOcrStatus("Image loaded. Ready to extract.");
      }
    }
  };

  const runOcrPromise = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const worker = initWorker();
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
    setManualOutput("");
    setOcrProgress(0);
    
    if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
      try {
        setOcrStatus("Initializing PDF OCR...");
        const { loadPdfJs, extractTextFromPdfOcr } = await import("@/lib/pdf-parser");
        const pdfjsLib = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let compiledText = "";
        
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
            
            setOcrStatus(`Extracting text from page ${i} of ${pdf.numPages}...`);
            const pageText = await runOcrPromise(pageImg);
            compiledText += `--- Page ${i} ---\n${pageText}\n\n`;
          }
          setOcrProgress(Math.round((i / pdf.numPages) * 100));
        }
        setManualOutput(compiledText.trim());
        setOcrStatus("PDF OCR completed successfully!");
      } catch (err: any) {
        setOcrStatus("OCR Error: " + err.message);
      }
    } else {
      try {
        setOcrStatus("Enhancing image contrast...");
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (context) {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            enhanceCanvasForOcr(context, img.width, img.height);
            const enhancedImg = canvas.toDataURL("image/png");
            setOcrStatus("Extracting text...");
            const text = await runOcrPromise(enhancedImg);
            setManualOutput(text);
            setOcrStatus("Extraction completed!");
            setOcrProgress(100);
          }
        };
        img.src = image;
      } catch (err: any) {
        setOcrStatus("OCR Error: " + err.message);
      }
    }
  };

  const handleSample = () => {
    const sampleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbUlEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnBy38AAGyW4F5AAAAAElFTkSuQmCC";
    setImage(sampleImage);
    setFile(null);
    setOcrStatus("Sample loaded. Ready to extract.");
  };

  const handleDownloadTxt = () => {
    if (!manualOutput) return;
    const blob = new Blob([manualOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-ocr.txt";
    link.click();
  };

  const handleDownloadDocx = () => {
    if (!manualOutput) return;
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><title>Document</title></head><body>${manualOutput.replace(/\n/g, '<br/>')}</body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-ocr.doc";
    link.click();
  };

  const handleCopy = () => {
    if (!manualOutput) return;
    navigator.clipboard.writeText(manualOutput);
  };

  const isOcrRunning = ocrStatus.includes("Extracting") || ocrStatus.includes("Rendering") || ocrStatus.includes("page");

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
      <PrivacyAlertBanner />
  
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border p-6 text-center bg-background flex flex-col items-center justify-center min-h-[200px]">
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4 hover:underline">
                📁 Drag & Drop or Click to Select File
              </label>
              <div className="text-[10px] text-muted-foreground uppercase font-mono mt-1">
                Supports: PNG, JPG, JPEG, WEBP, PDF
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={handleSample} className="btn-secondary text-[10px] py-1 px-3">
                  💡 Try Sample Note
                </button>
                <label htmlFor="file-upload" className="btn-secondary text-[10px] py-1 px-3 cursor-pointer">
                  📷 Camera Capture
                </label>
              </div>
            </div>

            {image && (
              <div className="border border-border p-2 bg-background flex flex-col items-center">
                <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground mb-1">Source Preview</span>
                <img src={image} alt="Preview" className="max-h-48 object-contain" />
              </div>
            )}

            {image && (
              <div className="flex items-center gap-3">
                <button onClick={handleProcess} disabled={!isReady || isOcrRunning} className="btn-primary">
                  {isOcrRunning ? 'Running OCR...' : 'Run OCR'}
                </button>
                {!isReady && (
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">
                    ⚙️ {loadingMessage}
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

          <div className="border border-border p-4 bg-background flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-muted-foreground border-b border-border pb-1">
                Editable Output Zone
              </h3>
              
              {isOcrRunning ? (
                <div className="space-y-2 py-4">
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Grayscale Conversion & Thresholding...</div>
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Run Segmenting Stroke Extraction...</div>
                  <div className="w-full bg-secondary h-2 border border-border overflow-hidden mt-4">
                    <div className="bg-accent h-full transition-all duration-300" style={{ width: `${ocrProgress || progress || 0}%` }}></div>
                  </div>
                </div>
              ) : manualOutput ? (
                <SecureTextarea
                  value={manualOutput}
                  onChange={(e) => setManualOutput(e.target.value)}
                  className="w-full h-48 border border-border"
                />
              ) : (
                <div className="h-48 flex items-center justify-center font-mono text-xs text-muted-foreground border border-dashed border-border">
                  Ready for text extraction
                </div>
              )}
            </div>

            {manualOutput && (
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <button onClick={handleCopy} className="btn-secondary text-[10px] py-1 px-3">
                    📋 Copy Text
                  </button>
                  <button onClick={handleDownloadTxt} className="btn-secondary text-[10px] py-1 px-3">
                    📥 Download TXT
                  </button>
                  <button onClick={handleDownloadDocx} className="btn-secondary text-[10px] py-1 px-3">
                    📥 Download DOCX
                  </button>
                </div>
                <div className="bg-accent/5 p-3 border border-border text-xs font-mono">
                  <div className="font-bold uppercase text-[10px] text-muted-foreground mb-1">💡 Next Step Option</div>
                  <div className="flex items-center justify-between">
                    <span>Analyze writing readability & grade score</span>
                    <Link href="/tools/ai-readability-analyzer" className="underline font-bold text-accent">
                      Run Readability Analyzer →
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
