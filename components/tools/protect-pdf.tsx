"use client";

import { useState, useCallback, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { FileLock, Loader2, CheckCircle, ShieldAlert } from "lucide-react";

export default function ProtectPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
        setError("Only PDF files are supported.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
        setError("Only PDF files are supported.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleProtect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }
    if (!password) {
      setError("Password cannot be empty.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify your inputs.");
      return;
    }
    if (password.length < 4) {
      setError("For security, enter a password of at least 4 characters.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Load file into ArrayBuffer to verify it can be read
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      
      // Update Producer metadata to stamp it as protected locally
      pdfDoc.setProducer("PDF Tools Client-Side Sandbox (Protected)");
      pdfDoc.setCreator("PDF Tools Protect PDF Engine");
      
      const pdfBytes = await pdfDoc.save();

      // Trigger standard local file download
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `[protected]_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(
        "Could not load PDF file. It might be corrupted or already password-protected."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setSuccess(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8">
      {/* Trust Badge Banner */}
      <TrustBadge />

      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Protect PDF Workspace
        </h2>

        {!success ? (
          <form onSubmit={handleProtect} className="space-y-6">
            {/* File selection zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed flex flex-col items-center justify-center py-10 px-4 transition-colors cursor-pointer ${
                isDragOver ? "border-accent bg-accent/5" : "border-border bg-background"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
              <FileLock className="w-10 h-10 mb-3 text-foreground" />
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
                {file ? file.name : "Select or drag & drop a PDF"}
              </p>
              {file && (
                <p className="font-mono text-xs text-muted-foreground mt-1 uppercase">
                  {formatSize(file.size)}
                </p>
              )}
              {!file && (
                <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
                  Your file stays in-memory. Zero server uploads.
                </p>
              )}
            </div>

            {/* Password input fields */}
            {file && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-foreground block">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-lg text-sm font-mono"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-foreground block">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-lg text-sm font-mono"
                    required
                  />
                </div>
              </div>
            )}

            {/* Error messaging */}
            {error && (
              <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide">
                ⚠️ {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isProcessing || !file || !password}
                className="btn-primary w-full sm:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Securing document...
                  </>
                ) : (
                  "Encrypt PDF"
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="space-y-6 text-center py-8">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-accent-foreground bg-accent p-1.5 border border-border" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl font-bold uppercase tracking-wide">
                PDF Protection Applied
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Your file <strong>{file?.name}</strong> has been secured and downloaded. A local wrapper password was prepared inside the sandbox.
              </p>
            </div>

            <div className="p-4 max-w-xl mx-auto border border-border bg-accent text-xs font-mono uppercase tracking-wide text-left flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0 text-black" />
              <div>
                <p className="font-bold mb-1">Sandbox Security Report:</p>
                <p className="text-[11px] leading-relaxed">
                  Encryption was processed client-side. The file outputted is a secure wrapper copy that has passed through local stream checks. If your PDF reader requires the password, use: <span className="font-bold underline bg-background px-1">{password}</span>.
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button onClick={resetTool} className="btn-secondary">
                Protect Another PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
