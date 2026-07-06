"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { PrivacyAlertBanner } from "@/components/privacy-alert-banner";
import { useState, useEffect } from "react";
import { useVisionAi, useTextAi } from "@/hooks/useAi";
import { enhanceCanvasForOcr } from "@/lib/pdf-parser";
import Link from "next/link";

export default function FreeAiAiBusinessCardScannerTool() {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMetadata(null);
      setOcrStatus("");
      setOcrProgress(0);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setOcrStatus("Card image loaded. Ready to scan.");
      };
      reader.readAsDataURL(file);
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

  const handleProcess = () => {
    if (!image || !visionReady) return;
    setMetadata(null);
    setOcrProgress(0);
    setOcrStatus("Enhancing business card contrast...");

    try {
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
          
          setOcrStatus("Extracting character text...");
          const text = await runOcrPromise(enhancedImg);
          setOcrProgress(100);
          
          if (text && text.trim() && textReady) {
            setOcrStatus("Detecting contact fields via local AI...");
            const fewShotConfig = [
    { role: "system", content: "You are a strict, single-purpose utility for parsing OCR business card data and returning structured contact fields. Output ONLY the final processed result. Do NOT include greetings, conversational filler, markdown blocks, or explanations." },
    { role: "user", content: "John Doe john@doe.com" },
    { role: "assistant", content: "- Name: John Doe\n- Email: john@doe.com" },
    { role: "user", content: "Dr. Alice Vance\nChief Medical Officer\nHealthPlus Clinic\nPhone: 555-0199\nWeb: healthplus.com" },
    { role: "assistant", content: "- Name: Dr. Alice Vance\n- Title: Chief Medical Officer\n- Company: HealthPlus Clinic\n- Phone: 555-0199\n- Website: healthplus.com" }
  ];
            generate([
              ...fewShotConfig,
              { role: "user", content: text }
            ]);
          }
        }
      };
      img.src = image;
    } catch (err: any) {
      setOcrStatus("OCR Error: " + err.message);
    }
  };

  const handleSample = () => {
    const sampleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbUlEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnBy38AAGyW4F5AAAAAElFTkSuQmCC";
    setImage(sampleImage);
    setMetadata({
      name: "Dr. Alice Vance",
      company: "HealthPlus Clinic",
      title: "Chief Medical Officer",
      phone: "555-0199",
      email: "alice@healthplus.com",
      website: "healthplus.com",
      address: "123 Healthcare Ave, NY"
    });
    setOcrStatus("Sample loaded. Ready to scan.");
  };

  useEffect(() => {
    if (aiResult) {
      try {
        setOcrStatus("Formatting contact fields...");
        const lines = aiResult.split("\
");
        const parsed: any = {};
        lines.forEach(l => {
          if (l.toLowerCase().includes("name:")) parsed.name = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("company:")) parsed.company = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("title:")) parsed.title = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("phone:")) parsed.phone = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("email:")) parsed.email = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("website:")) parsed.website = l.split(":")[1]?.trim();
          else if (l.toLowerCase().includes("address:")) parsed.address = l.split(":")[1]?.trim();
        });
        setMetadata(parsed);
        setOcrStatus("Scan complete!");
      } catch (e) {
        console.error(e);
        setOcrStatus("Parsing failed.");
      }
    }
  }, [aiResult]);

  const isReady = visionReady && textReady;
  const isOcrRunning = ocrStatus.includes("Enhancing") || ocrStatus.includes("Extracting") || textStatus === 'generating' || textStatus === 'loading';

  const handleDownloadVcf = () => {
    if (!metadata) return;
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${metadata.name || ''}\nORG:${metadata.company || ''}\nTITLE:${metadata.title || ''}\nTEL;TYPE=WORK,VOICE:${metadata.phone || ''}\nEMAIL;TYPE=PREF,INTERNET:${metadata.email || ''}\nURL:${metadata.website || ''}\nADR;TYPE=WORK:;;${metadata.address || ''}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contact.vcf";
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
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer font-mono text-xs font-bold uppercase block py-4 hover:underline">
                📁 Upload Card Snapshot
              </label>
              <div className="flex gap-2 mt-4">
                <button onClick={handleSample} className="btn-secondary text-[10px] py-1 px-3">
                  💡 Try Sample Card
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
                  {isOcrRunning ? 'Reading card...' : 'Scan Contact Card'}
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
                Contact Details Card
              </h3>

              {isOcrRunning ? (
                <div className="space-y-2 py-4">
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Scanning borders...</div>
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Extracting text characters...</div>
                  <div className="text-xs font-mono text-muted-foreground animate-pulse">⚡ Analyzing contact fields...</div>
                  <div className="w-full bg-secondary h-2 border border-black overflow-hidden mt-4">
                    <div className="bg-accent h-full transition-all duration-300" style={{ width: `${ocrProgress || visionProgress || 0}%` }}></div>
                  </div>
                </div>
              ) : metadata ? (
                <div className="space-y-2 text-xs font-mono">
                  <div className="border-b border-black/10 pb-2">
                    <div className="font-bold text-sm text-accent">{metadata.name || 'N/A'}</div>
                    <div className="text-[10px] text-muted-foreground">{metadata.title || 'N/A'} at {metadata.company || 'N/A'}</div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <div>Full Name: <input value={metadata.name || ""} onChange={(e) => setMetadata({ ...metadata, name: e.target.value })} className="border border-black/10 p-1 w-full bg-background mt-1" /></div>
                    <div>Company: <input value={metadata.company || ""} onChange={(e) => setMetadata({ ...metadata, company: e.target.value })} className="border border-black/10 p-1 w-full bg-background mt-1" /></div>
                    <div>Job Title: <input value={metadata.title || ""} onChange={(e) => setMetadata({ ...metadata, title: e.target.value })} className="border border-black/10 p-1 w-full bg-background mt-1" /></div>
                    <div>Phone Number: <input value={metadata.phone || ""} onChange={(e) => setMetadata({ ...metadata, phone: e.target.value })} className="border border-black/10 p-1 w-full bg-background mt-1" /></div>
                    <div>Email Address: <input value={metadata.email || ""} onChange={(e) => setMetadata({ ...metadata, email: e.target.value })} className="border border-black/10 p-1 w-full bg-background mt-1" /></div>
                    <div>Website: <input value={metadata.website || ""} onChange={(e) => setMetadata({ ...metadata, website: e.target.value })} className="border border-black/10 p-1 w-full bg-background mt-1" /></div>
                    <div>Address: <input value={metadata.address || ""} onChange={(e) => setMetadata({ ...metadata, address: e.target.value })} className="border border-black/10 p-1 w-full bg-background mt-1" /></div>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center font-mono text-xs text-muted-foreground border border-dashed border-black/10">
                  Ready to scan contact
                </div>
              )}
            </div>

            {metadata && (
              <div className="space-y-4 pt-4 border-t border-black/10">
                <button onClick={handleDownloadVcf} className="btn-secondary w-full text-xs py-2">
                  📥 Download Contact Card (.vcf)
                </button>
                <div className="bg-accent/5 p-3 border border-black/10 text-xs font-mono">
                  <div className="font-bold uppercase text-[10px] text-muted-foreground mb-1">💡 Next Step Option</div>
                  <div className="flex items-center justify-between">
                    <span>Analyze document readability levels</span>
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
