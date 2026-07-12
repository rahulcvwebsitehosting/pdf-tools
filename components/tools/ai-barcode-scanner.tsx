"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";

export default function FreeAiAiBarcodeScannerTool() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanner = async () => {
    setError(null);
    setResult(null);
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.play();
      }
    } catch (err: any) {
      setError("Webcam permissions not granted or not supported: " + err.message);
      setScanning(false);
    }
  };

  const stopScanner = () => {
    setScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    let animId: number;
    const scanFrame = () => {
      if (!scanning) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Simulated native BarcodeDetector for barcodes
            // Check if native BarcodeDetector API exists
            if ('BarcodeDetector' in window && canvas) {
              const BarcodeDetectorClass = (window as any).BarcodeDetector;
              const detector = new BarcodeDetectorClass({ formats: ['code_128', 'ean_13', 'upc_a'] });
              detector.detect(canvas)
                .then((barcodes: any[]) => {
                  if (barcodes.length > 0 && barcodes[0]) {
                    setResult(barcodes[0].rawValue);
                    stopScanner();
                  }
                })
                .catch((e: any) => console.log(e));
            }
        }
      }
      animId = requestAnimationFrame(scanFrame);
    };

    if (scanning) {
      animId = requestAnimationFrame(scanFrame);
    }

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [scanning]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
  
      <div className="space-y-4">
        <div className="flex justify-center gap-4">
          {!scanning ? (
            <button onClick={startScanner} className="btn-primary">Start Webcam Scanner</button>
          ) : (
            <button onClick={stopScanner} className="btn-primary bg-red-600 border-red-700">Stop Scanner</button>
          )}
        </div>

        {error && (
          <div className="p-3 border border-red-500 bg-red-50 text-red-700 text-xs font-mono">{error}</div>
        )}

        <div className="relative flex justify-center max-w-lg mx-auto bg-black border border-border min-h-64">
          <video ref={videoRef} className="w-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />
          {scanning && (
            <div className="absolute inset-0 border-2 border-dashed border-accent pointer-events-none animate-pulse m-8" />
          )}
        </div>

        {result && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase border-b border-border pb-1">Scan Result</h4>
            <p className="font-mono text-sm break-all font-bold">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
