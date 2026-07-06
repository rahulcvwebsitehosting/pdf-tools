'use client';

import { useState, useCallback, useRef } from 'react';
import { TrustBadge } from '@/components/trust-badge';

type Mode = 'encode' | 'decode';
type Tab = 'text' | 'file';

export function Base64Tool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [tab, setTab] = useState<Tab>('text');
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // File state
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileBase64, setFileBase64] = useState('');
  const [fileCopied, setFileCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encode = useCallback((input: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(input)));
    } catch {
      throw new Error('Failed to encode the input text.');
    }
  }, []);

  const decode = useCallback((input: string): string => {
    try {
      return decodeURIComponent(escape(atob(input)));
    } catch {
      throw new Error('Invalid Base64 string. Please check your input and try again.');
    }
  }, []);

  const processText = useCallback(
    (input: string, currentMode: Mode) => {
      setError('');
      if (!input.trim()) {
        setTextOutput('');
        return;
      }
      try {
        const result = currentMode === 'encode' ? encode(input) : decode(input);
        setTextOutput(result);
      } catch (err) {
        setTextOutput('');
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    },
    [encode, decode]
  );

  const handleInputChange = (value: string) => {
    setTextInput(value);
    processText(value, mode);
  };

  const handleModeSwitch = (newMode: Mode) => {
    setMode(newMode);
    setError('');
    setTextOutput('');
    setTextInput('');
    setFileName('');
    setFileSize(0);
    setFileBase64('');
  };

  const handleTabSwitch = (newTab: Tab) => {
    setTab(newTab);
    setError('');
  };

  const handleCopy = async (text: string, type: 'text' | 'file') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'text') {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setFileCopied(true);
        setTimeout(() => setFileCopied(false), 2000);
      }
    } catch {
      setError('Failed to copy to clipboard.');
    }
  };

  const handleClear = () => {
    setTextInput('');
    setTextOutput('');
    setError('');
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setFileBase64('');
    setError('');

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // readAsDataURL returns "data:<mime>;base64,<data>"
      const base64Data = result.split(',')[1] || '';
      setFileBase64(base64Data);
    };
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle: Encode / Decode */}
      <div className="flex editorial-border w-fit">
        <button
          onClick={() => handleModeSwitch('encode')}
          className={`px-5 py-2.5 font-medium text-sm transition-colors border-r border-border ${
            mode === 'encode'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:bg-muted'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => handleModeSwitch('decode')}
          className={`px-5 py-2.5 font-medium text-sm transition-colors ${
            mode === 'decode'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:bg-muted'
          }`}
        >
          Decode
        </button>
      </div>

      {/* Secondary Tabs: Text / File */}
      <div className="flex editorial-border w-fit">
        <button
          onClick={() => handleTabSwitch('text')}
          className={`px-4 py-1.5 font-medium text-xs transition-colors border-r border-border ${
            tab === 'text'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:bg-muted'
          }`}
        >
          Text
        </button>
        <button
          onClick={() => handleTabSwitch('file')}
          className={`px-4 py-1.5 font-medium text-xs transition-colors ${
            tab === 'file'
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:bg-muted'
          }`}
        >
          File
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 border border-destructive bg-background text-destructive text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Text Tab Content */}
      {tab === 'text' && (
        <div className="space-y-4">
          {/* Input */}
          <div className="space-y-2">
            <label className="font-mono-nav block text-xs text-foreground">
              {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
            </label>
            <textarea
              value={textInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Enter text to encode to Base64…'
                  : 'Paste Base64 string to decode…'
              }
              className="editorial-textarea w-full min-h-[200px]"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <label className="font-mono-nav block text-xs text-foreground">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
            </label>
            <textarea
              value={textOutput}
              readOnly
              placeholder="Output will appear here…"
              className="editorial-textarea w-full min-h-[200px]"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCopy(textOutput, 'text')}
              disabled={!textOutput}
              className="btn-primary px-4 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? '✓ Copied!' : 'Copy Output'}
            </button>
            <button
              onClick={handleClear}
              disabled={!textInput && !textOutput}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* File Tab Content */}
      {tab === 'file' && (
        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed cursor-pointer transition-colors ${
              isDragging
                ? 'border-accent bg-accent/10'
                : 'border-border bg-background hover:bg-muted'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div className="text-center">
              <p className="text-foreground text-sm font-medium">
                Drop a file here or click to browse
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Any file type supported
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* File Info */}
          {fileName && (
            <div className="flex items-center gap-3 px-4 py-3 editorial-panel">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground shrink-0"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground font-medium truncate">
                  {fileName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(fileSize)}
                </p>
              </div>
            </div>
          )}

          {/* Base64 Output */}
          {fileBase64 && (
            <div className="space-y-2">
              <label className="font-mono-nav block text-xs text-foreground">
                Base64 Output
              </label>
              <div className="w-full max-h-[300px] overflow-auto p-4 editorial-border bg-background font-mono text-sm text-foreground break-all whitespace-pre-wrap">
                {fileBase64}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleCopy(fileBase64, 'file')}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  {fileCopied ? '✓ Copied!' : 'Copy Base64'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trust Badge */}
      <TrustBadge />
    </div>
  );
}
