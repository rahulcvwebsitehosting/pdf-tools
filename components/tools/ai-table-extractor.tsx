"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { useState, useEffect } from "react";
import { useVisionAi, useTextAi } from "@/hooks/useAi";
import { renderPdfPageToImage, enhanceCanvasForOcr } from "@/lib/pdf-parser";
import Link from "next/link";

export default function FreeAiAiTableExtractorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [ocrStatus, setOcrStatus] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);
  const [tableHtml, setTableHtml] = useState<string | null>(null);
  
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
      setTableHtml(null);
      setOcrStatus("");
      setOcrProgress(0);
      
      if (selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf")) {
        try {
          setOcrStatus("Rendering PDF preview...");
          const previewUrl = await renderPdfPageToImage(selectedFile, 1);
          setImage(previewUrl);
          setOcrStatus("PDF loaded. Ready to extract table.");
        } catch (err: any) {
          setOcrStatus("Failed to render PDF preview: " + err.message);
        }
      } else {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result as string);
        reader.readAsDataURL(selectedFile);
        setOcrStatus("Image loaded. Ready to extract table.");
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
    setTableHtml(null);
    setOcrProgress(0);
    
    let compiledOcrText = "";
    if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
      try {
        setOcrStatus("Initializing PDF table extractor...");
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
        setOcrStatus("PDF Text Extracted. Reconstructing cells...");
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
              setOcrStatus("Running cell segmentation OCR...");
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
      setOcrStatus("Reconstructing cell grid...");
      const fewShotConfig = [
    { role: "system", content: "You are a strict, single-purpose utility for parsing OCR grid layouts and returning clean markdown or CSV tables. Output ONLY the final processed result. Do NOT include greetings, conversational filler, markdown blocks, or explanations." },
    { role: "user", content: "Header1 Header2\nVal1 Val2" },
    { role: "assistant", content: "| Header1 | Header2 |\n|---|---|\n| Val1 | Val2 |" },
    { role: "user", content: "Name | Age | Role\nAlice | 30 | Dev\nBob | 25 | Designer" },
    { role: "assistant", content: "| Name | Age | Role |\n|---|---|---|\n| Alice | 30 | Dev |\n| Bob | 25 | Designer |" }
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
    setOcrStatus("Sample loaded. Ready to extract table.");
    setTableHtml(`
      <table class="w-full text-left font-mono text-[10px] border-collapse border border-black/10">
        <thead>
          <tr class="bg-secondary/20 border-b border-black/10">
            <th class="p-2 border-r border-black/10">Product Name</th>
            <th class="p-2 border-r border-black/10">Quantity</th>
            <th class="p-2">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-black/10">
            <td class="p-2 border-r border-black/10">Widget A</td>
            <td class="p-2 border-r border-black/10">100</td>
            <td class="p-2">$1.50</td>
          </tr>
          <tr>
            <td class="p-2 border-r border-black/10">Widget B</td>
            <td class="p-2 border-r border-black/10">200</td>
            <td class="p-2">$2.75</td>
          </tr>
        </tbody>
      </table>
    `);
  };

  useEffect(() => {
    if (aiResult) {
      try {
        setOcrStatus("Structuring HTML layout...");
        let html = aiResult;
        if (aiResult.includes("|")) {
          const lines = aiResult.trim().split("\n");
          let table = '<table class="w-full text-left font-mono text-[10px] border-collapse border border-black/10">';
          lines.forEach((l, index) => {
            if (l.trim().startsWith("|")) {
              const cells = l.split("|").map(c => c.trim()).filter((c, i, a) => i > 0 && i < a.length - 1);
              if (index === 0) {
                table += '<thead class="bg-secondary/20 border-b border-black/10"><tr>';
                cells.forEach(c => table += `<th class="p-2 border-r border-black/10">${c}</th>`);
                table += '</tr></thead><tbody>';
              } else if (index !== 1) {
                table += '<tr class="border-b border-black/10">';
                cells.forEach(c => table += `<td class="p-2 border-r border-black/10">${c}</td>`);
                table += '</tr>';
              }
            }
          });
          table += '</tbody></table>';
          html = table;
        }
        setTableHtml(html);
        setOcrStatus("Table reconstructed successfully!");
      } catch (e) {
        console.error(e);
        setOcrStatus("Table structure parsing failed.");
      }
    }
  }, [aiResult]);

  const isReady = visionReady && textReady;
  const isOcrRunning = ocrStatus.includes("Rendering") || ocrStatus.includes("OCR") || ocrStatus.includes("Extracting") || textStatus === 'generating' || textStatus === 'loading';

  const handleCopyMarkdown = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult);
    }
  };

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
  
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-black p-6 text-center bg-background flex flex-col items-center justify-center min-h-[200px]">
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4 hover:underline">
                📁 Upload Table Snapshot / PDF
              </label>
              <div className="flex gap-2 mt-4">
                <button onClick={handleSample} className="btn-secondary text-[10px] py-1 px-3">
                  💡 Try Sample Grid
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
                  {isOcrRunning ? 'Extracting table...' : 'Extract Table Grid'}
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
                Interactive Grid Sheet
              </h3>

              {isOcrRunning ? (
                <div className="space-y-2 py-4">
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Detecting grid cells...</div>
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Running structured OCR alignment...</div>
                  <div className="w-full bg-secondary h-2 border border-black overflow-hidden mt-4">
                    <div className="bg-accent h-full transition-all duration-300" style={{ width: `${ocrProgress || visionProgress || 0}%` }}></div>
                  </div>
                </div>
              ) : tableHtml ? (
                <div className="overflow-x-auto border border-black/10" dangerouslySetInnerHTML={{ __html: tableHtml }}></div>
              ) : (
                <div className="h-48 flex items-center justify-center font-mono text-xs text-muted-foreground border border-dashed border-black/10">
                  Ready for table layout
                </div>
              )}
            </div>

            {tableHtml && (
              <div className="space-y-4 pt-4 border-t border-black/10">
                <button onClick={handleCopyMarkdown} className="btn-secondary w-full text-xs py-2">
                  📋 Copy Markdown Table
                </button>
                <div className="bg-accent/5 p-3 border border-black/10 text-xs font-mono">
                  <div className="font-bold uppercase text-[10px] text-muted-foreground mb-1">💡 Next Step Option</div>
                  <div className="flex items-center justify-between">
                    <span>Summarize data or report findings</span>
                    <Link href="/tools/ai-pdf-summarizer" className="underline font-bold text-accent">
                      Run Summarizer →
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
