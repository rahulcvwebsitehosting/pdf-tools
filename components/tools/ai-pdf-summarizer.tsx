"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { PrivacyAlertBanner } from "@/components/privacy-alert-banner";
import { SecureTextarea } from "@/components/secure-textarea";
import { useState, useEffect } from "react";
import { useTextAi, useVisionAi } from "@/hooks/useAi";
import { renderPdfPageToImage, enhanceCanvasForOcr } from "@/lib/pdf-parser";
import Link from "next/link";

export default function FreeAiAiPdfSummarizerTool() {
  const [fileText, setFileText] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [ocrStatus, setOcrStatus] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("exec");
  
  const { status: visionStatus, progress: visionProgress, isReady: visionReady, loadingMessage: visionLoading, initWorker: initVisionWorker } = useVisionAi('ocr');
  const { status: textStatus, output, stream, error, isReady: textReady, loadingMessage: textLoading, generate, initWorker: initTextWorker } = useTextAi();

  useEffect(() => {
    initTextWorker();
    initVisionWorker();
  }, [initTextWorker, initVisionWorker]);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileText("");
      setOcrStatus("");
      setOcrProgress(0);
      
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (fileExt === 'pdf') {
        try {
          setOcrStatus("Validating PDF document...");
          const arrayBuffer = await selectedFile.arrayBuffer();
          const headerBytes = new Uint8Array(arrayBuffer.slice(0, 5));
          const header = String.fromCharCode(...headerBytes);
          if (header !== '%PDF-') {
            throw new Error("Invalid format: Not a valid PDF document.");
          }
          
          setOcrStatus("Attempting digital text extraction...");
          const { loadPdfJs, extractTextFromPdf } = await import("@/lib/pdf-parser");
          
          try {
            const extractedText = await extractTextFromPdf(selectedFile);
            setFileText(extractedText.substring(0, 12000));
            setOcrStatus("PDF digital text extracted. Ready to summarize.");
            setOcrProgress(100);
          } catch (digErr: any) {
            // Scanned PDF or empty text layers: run OCR
            setOcrStatus("Scanned PDF detected. Running page-by-page OCR...");
            const pdfjsLib = await loadPdfJs();
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
                
                setOcrStatus(`Running OCR on page ${i} of ${pdf.numPages}...`);
                const pageText = await runOcrPromise(pageImg);
                compiledText += `--- Page ${i} ---\n${pageText}\n\n`;
              }
              setOcrProgress(Math.round((i / pdf.numPages) * 100));
            }
            
            // Clean text
            compiledText = compiledText
              .replace(/[^\x20-\x7E\s]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
              
            if (!compiledText.trim()) {
              throw new Error("No text content could be extracted from this scanned document.");
            }
            
            setFileText(compiledText.substring(0, 12000));
            setOcrStatus("Scanned PDF OCR completed. Ready to summarize.");
          }
        } catch (err: any) {
          setOcrStatus("PDF Processing Error: " + err.message);
        }
      } else if (fileExt === 'txt' || fileExt === 'md') {
        try {
          setOcrStatus("Reading text file...");
          const text = await selectedFile.text();
          const cleanedText = text
            .replace(/[^\x20-\x7E\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
          setFileText(cleanedText.substring(0, 12000));
          setOcrStatus("Text file loaded. Ready to summarize.");
          setOcrProgress(100);
        } catch (err: any) {
          setOcrStatus("File Read Error: " + err.message);
        }
      } else {
        setOcrStatus("Unsupported file type. Please upload .txt, .md, or .pdf.");
      }
    }
  };

  const handleRun = () => {
    if (!fileText.trim() || !textReady) return;
    const fewShotConfig = [
    { role: "system", content: "You are a strict, single-purpose utility for summarizing document text extracted from PDF files, structured under tags: [SUMMARY], [POINTS], [DATES], [NUMBERS], and [ACTIONS].. Output ONLY the final processed result. Do NOT include greetings, conversational filler, markdown blocks, or explanations." },
    { role: "user", content: "Summary of terms and conditions." },
    { role: "assistant", content: "[SUMMARY]\nThis document outlines standard terms and conditions.\n[POINTS]\n- Standard terms of service.\n[DATES]\n- None specified.\n[NUMBERS]\n- None specified.\n[ACTIONS]\n- Review terms before signing." },
    { role: "user", content: "The contract between ZeroCorp and Client is effective starting June 20, 2026. Either party can terminate with 30 days written notice. Total value of the work is $15,000." },
    { role: "assistant", content: "[SUMMARY]\nService contract between ZeroCorp and Client detailing terms and termination clauses.\n[POINTS]\n- Standard service contract guidelines apply.\n- Bilateral termination rights exist.\n[DATES]\n- June 20, 2026: Contract effective date.\n- 30 days: Written termination notice required.\n[NUMBERS]\n- $15,000: Total contract value.\n[ACTIONS]\n- Send written notice 30 days prior to desired termination date." }
  ];
    generate([
      ...fewShotConfig,
      { role: "user", content: fileText }
    ]);
  };

  const handleSample = () => {
    setFileName("sample_policy.txt");
    setFileText("Terms and Conditions for ZeroCorp Cloud Services.\nEffective: June 20, 2026.\n1. Termination: Either party may terminate with 30 days written notice.\n2. Liability: Services are provided as-is without any warranties.\n3. Governing law: State of New York.\n4. Pricing: Monthly rate is $150 per seat.");
    setOcrStatus("Sample loaded. Ready to summarize.");
  };

  const handleCopy = () => {
    const rawVal = output || stream;
    if (rawVal) {
      navigator.clipboard.writeText(rawVal);
    }
  };

  const parseSummaryOutput = (text: string) => {
    const sections = {
      summary: "",
      points: "",
      dates: "",
      numbers: "",
      actions: ""
    };
    
    let currentKey: keyof typeof sections | null = null;
    const lines = text.split("\n");
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === "[SUMMARY]") {
        currentKey = "summary";
      } else if (trimmed === "[POINTS]") {
        currentKey = "points";
      } else if (trimmed === "[DATES]") {
        currentKey = "dates";
      } else if (trimmed === "[NUMBERS]") {
        currentKey = "numbers";
      } else if (trimmed === "[ACTIONS]") {
        currentKey = "actions";
      } else if (currentKey) {
        sections[currentKey] += line + "\n";
      }
    }
    
    if (!sections.summary && !sections.points && !sections.dates && !sections.numbers && !sections.actions) {
      sections.summary = text;
    }
    
    return sections;
  };

  const isReady = textReady && visionReady;
  const isRunning = textStatus === 'generating' || ocrStatus.includes("Running") || ocrStatus.includes("Rendering") || ocrStatus.includes("Attempting") || ocrStatus.includes("Validating");
  
  const parsedReport = parseSummaryOutput(output || stream || "");

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
      <PrivacyAlertBanner />
  
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border p-6 text-center bg-background flex flex-col items-center justify-center min-h-[200px]">
              <input type="file" accept=".txt,.md,.pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4 hover:underline">
                📁 Upload Document / PDF / Text
              </label>
              {fileName && (
                <div className="text-xs font-mono text-accent font-bold mt-2">📂 Loaded: {fileName}</div>
              )}
              {ocrStatus && (
                <div className="text-[10px] font-mono text-muted-foreground mt-1">
                  {ocrStatus} {ocrProgress > 0 && ocrProgress < 100 && `(${ocrProgress}%)`}
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <button onClick={handleSample} className="btn-secondary text-[10px] py-1 px-3">
                  💡 Try Sample Doc
                </button>
              </div>
            </div>

            {fileText && (
              <div className="flex items-center gap-3">
                <button onClick={handleRun} disabled={!isReady || isRunning} className="btn-primary">
                  {isRunning ? 'Processing...' : 'Run Summarizer'}
                </button>
                {!isReady && (
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">
                    ⚙️ {textLoading || visionLoading}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border border-border p-4 bg-background flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-muted-foreground border-b border-border pb-1">
                SaaS Summary Panel
              </h3>

              {isRunning ? (
                <div className="space-y-2 py-4">
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Synthesizing PDF Summary...</div>
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Extracting Key Points...</div>
                </div>
              ) : (output || stream) ? (
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex border-b border-border overflow-x-auto gap-1">
                    <button onClick={() => setActiveTab("exec")} className={`px-2 py-1 border-t border-x border-border text-[10px] ${activeTab === 'exec' ? 'bg-accent/10 font-bold' : ''}`}>Summary</button>
                    <button onClick={() => setActiveTab("bullets")} className={`px-2 py-1 border-t border-x border-border text-[10px] ${activeTab === 'bullets' ? 'bg-accent/10 font-bold' : ''}`}>Key Points</button>
                    <button onClick={() => setActiveTab("dates")} className={`px-2 py-1 border-t border-x border-border text-[10px] ${activeTab === 'dates' ? 'bg-accent/10 font-bold' : ''}`}>Dates</button>
                    <button onClick={() => setActiveTab("numbers")} className={`px-2 py-1 border-t border-x border-border text-[10px] ${activeTab === 'numbers' ? 'bg-accent/10 font-bold' : ''}`}>Numbers</button>
                    <button onClick={() => setActiveTab("actions")} className={`px-2 py-1 border-t border-x border-border text-[10px] ${activeTab === 'actions' ? 'bg-accent/10 font-bold' : ''}`}>Action Items</button>
                  </div>
                  <div className="p-3 border border-border bg-secondary/5 whitespace-pre-wrap leading-relaxed h-48 overflow-y-auto">
                    {activeTab === 'exec' && (parsedReport.summary || "No summary available.")}
                    {activeTab === 'bullets' && (parsedReport.points || "No key points detected.")}
                    {activeTab === 'dates' && (parsedReport.dates || "No key dates detected.")}
                    {activeTab === 'numbers' && (parsedReport.numbers || "No key numbers detected.")}
                    {activeTab === 'actions' && (parsedReport.actions || "No key action items detected.")}
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center font-mono text-xs text-muted-foreground border border-dashed border-border">
                  Ready to compile report
                </div>
              )}
            </div>

            {(output || stream) && (
              <div className="space-y-4 pt-4 border-t border-border">
                <button onClick={handleCopy} className="btn-secondary w-full text-xs py-2">
                  📋 Copy Active Report
                </button>
                <div className="bg-accent/5 p-3 border border-border text-xs font-mono">
                  <div className="font-bold uppercase text-[10px] text-muted-foreground mb-1">💡 Next Step Option</div>
                  <div className="flex items-center justify-between">
                    <span>Extract primary SEO keywords from summary</span>
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
