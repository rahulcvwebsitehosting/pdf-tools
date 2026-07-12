"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { TrustBadge } from "@/components/trust-badge";
import { Trash2, FileText, Loader2, Save, Upload } from "lucide-react";

interface PDFFileInfo {
  name: string;
  sizeStr: string;
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

export default function EditPdfMetadataTool() {
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<PDFFileInfo | null>(null);
  const [metadata, setMetadata] = useState({
    title: "",
    author: "",
    subject: "",
    keywords: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Helper to format file sizes
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileAdded = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    const selectedFile = selectedFiles[0];
    
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      
      const title = pdfDoc.getTitle() || "";
      const author = pdfDoc.getAuthor() || "";
      const subject = pdfDoc.getSubject() || "";
      const keywords = pdfDoc.getKeywords() || "";

      setFile(selectedFile);
      setFileInfo({
        name: selectedFile.name,
        sizeStr: formatSize(selectedFile.size),
        title,
        author,
        subject,
        keywords,
      });

      setMetadata({
        title,
        author,
        subject,
        keywords,
      });
    } catch (err: any) {
      console.error("Error reading PDF metadata:", err);
      setError(`Failed to read metadata from "${selectedFile.name}". The file might be corrupted or password-protected.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFileAdded(e.dataTransfer.files);
    }
  }, []);

  const removeFile = () => {
    setFile(null);
    setFileInfo(null);
    setMetadata({ title: "", author: "", subject: "", keywords: "" });
    setError(null);
    setSuccess(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Set PDF Metadata properties
      pdfDoc.setTitle(metadata.title);
      pdfDoc.setAuthor(metadata.author);
      pdfDoc.setSubject(metadata.subject);
      pdfDoc.setKeywords(metadata.keywords.split(",").map((k) => k.trim()).filter(Boolean));

      // Save PDF Document
      const pdfBytes = await pdfDoc.save();

      // Trigger download
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, "_metadata.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess("Metadata successfully updated and saved locally!");
    } catch (err: any) {
      console.error("Save metadata error:", err);
      setError("Failed to save PDF metadata. Please ensure the file is writeable.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy banner */}
      <TrustBadge />

      {/* Workspace panel */}
      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Edit PDF Metadata Workspace
        </h2>

        {/* Drag & drop zone if no file selected */}
        {!file && (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed flex flex-col items-center justify-center py-12 px-4 transition-colors cursor-pointer ${
              isDragOver ? "border-accent bg-accent/5" : "border-border bg-background"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => handleFileAdded(e.target.files)}
            />
            <Upload className="w-8 h-8 mb-3 text-foreground" />
            <p className="font-mono text-sm font-semibold uppercase tracking-wider text-center">
              {isDragOver ? "Drop PDF here" : "Click to select or drag & drop PDF"}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2 uppercase">
              Works locally in your browser sandbox
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 border border-destructive bg-destructive/5 text-destructive font-mono text-xs uppercase tracking-wide">
            ⚠️ {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="p-4 border border-border bg-accent text-foreground font-mono text-xs uppercase tracking-wide">
            🎉 {success}
          </div>
        )}

        {/* Metadata Editor Form */}
        {file && fileInfo && (
          <div className="space-y-6">
            {/* File info card */}
            <div className="flex items-center justify-between p-4 border border-border bg-background">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 shrink-0 text-foreground" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{fileInfo.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                    {fileInfo.sizeStr}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1.5 border border-border hover:bg-destructive hover:text-white transition-colors"
                title="Change File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="pdf-title" className="block text-xs uppercase font-bold tracking-wide">
                    Document Title
                  </label>
                  <input
                    id="pdf-title"
                    type="text"
                    value={metadata.title}
                    onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                    placeholder="Enter PDF title"
                    className="w-full p-2.5 border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pdf-author" className="block text-xs uppercase font-bold tracking-wide">
                    Author / Creator
                  </label>
                  <input
                    id="pdf-author"
                    type="text"
                    value={metadata.author}
                    onChange={(e) => setMetadata({ ...metadata, author: e.target.value })}
                    placeholder="Enter author name"
                    className="w-full p-2.5 border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pdf-subject" className="block text-xs uppercase font-bold tracking-wide">
                    Subject
                  </label>
                  <input
                    id="pdf-subject"
                    type="text"
                    value={metadata.subject}
                    onChange={(e) => setMetadata({ ...metadata, subject: e.target.value })}
                    placeholder="Enter document subject"
                    className="w-full p-2.5 border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pdf-keywords" className="block text-xs uppercase font-bold tracking-wide">
                    Keywords (comma separated)
                  </label>
                  <input
                    id="pdf-keywords"
                    type="text"
                    value={metadata.keywords}
                    onChange={(e) => setMetadata({ ...metadata, keywords: e.target.value })}
                    placeholder="report, billing, internal"
                    className="w-full p-2.5 border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Metadata
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
