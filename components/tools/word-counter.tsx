"use client";

import { useState, useEffect } from "react";
import { TrustBadge } from "@/components/trust-badge";
import { AlignLeft, Copy, Check, RefreshCw, Clock, BarChart3 } from "lucide-react";

interface DensityItem {
  word: string;
  count: number;
  percentage: number;
}

export default function WordCounterTool() {
  const [text, setText] = useState<string>(
    `The ultimate free web toolkit. PDF Tools contains JSON formatters, Base64 encoders, and PDF tools. All processing runs 100% locally in your browser memory. Data never leaves your machine. Zero server uploads, zero sign-ups, zero friction.`
  );
  
  const [charCountWithSpaces, setCharCountWithSpaces] = useState(0);
  const [charCountNoSpaces, setCharCountNoSpaces] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [densityList, setDensityList] = useState<DensityItem[]>([]);
  
  const [copied, setCopied] = useState(false);

  // Run statistics calculations reactive to text changes
  useEffect(() => {
    calculateStats();
  }, [text]);

  const calculateStats = () => {
    const rawText = text || "";
    
    // Character counts
    setCharCountWithSpaces(rawText.length);
    setCharCountNoSpaces(rawText.replace(/\s/g, "").length);

    // Word count
    const words = rawText
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);

    // Sentence count (using standard boundaries)
    const sentences = rawText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);
    setSentenceCount(sentences.length);

    // Paragraph count
    const paragraphs = rawText
      .split(/\n+/)
      .filter((p) => p.trim().length > 0);
    setParagraphCount(paragraphs.length);

    // Reading time (average 200 words per minute)
    const minutes = words.length / 200;
    setReadingTime(Math.ceil(minutes * 60)); // reading time in seconds

    // Keyword density
    const wordFreq: Record<string, number> = {};
    const commonStopwords = new Set([
      "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "in", 
      "on", "at", "to", "for", "of", "with", "as", "by", "it", "its", "this", 
      "that", "these", "those", "i", "you", "he", "she", "we", "they", "me", 
      "him", "her", "us", "them", "my", "your", "his", "their", "our"
    ]);

    words.forEach((word) => {
      // Clean word boundaries
      const clean = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
      if (clean.length > 2 && !commonStopwords.has(clean)) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });

    const density = Object.entries(wordFreq)
      .map(([word, count]) => ({
        word,
        count,
        percentage: parseFloat(((count / words.length) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 dense words

    setDensityList(density);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const clearAll = () => {
    setText("");
  };

  return (
    <div className="space-y-8">
      {/* Sandbox Trust Badge */}
      <TrustBadge />

      {/* Main Workspace */}
      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <h2 className="font-editorial text-2xl font-bold uppercase tracking-wide">
          Word Counter Workspace
        </h2>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left panel: text editor */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs uppercase font-bold text-muted-foreground flex items-center gap-1.5">
                <AlignLeft className="w-4 h-4 text-black" /> Enter Document Text
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!text}
                  className="p-1 border border-border hover:bg-accent disabled:opacity-35 transition-colors"
                  title="Copy Text"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={clearAll}
                  disabled={!text}
                  className="p-1 border border-border hover:bg-destructive hover:text-white disabled:opacity-35 transition-colors"
                  title="Clear Input"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="editorial-textarea h-[300px] lg:h-[400px] resize-none focus:outline-none"
              placeholder="Paste or write your document content here to see real-time statistics..."
            />
          </div>

          {/* Right panel: statistics dashboard */}
          <div className="lg:col-span-1 border border-border p-5 bg-background space-y-6 flex flex-col">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 border-b border-border pb-2">
              <BarChart3 className="w-4 h-4 text-black" /> Document Statistics
            </h3>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border p-3 bg-secondary/10">
                <span className="block font-mono text-[9px] text-muted-foreground uppercase font-bold">Words</span>
                <span className="font-editorial text-2xl font-bold">{wordCount}</span>
              </div>
              <div className="border border-border p-3 bg-secondary/10">
                <span className="block font-mono text-[9px] text-muted-foreground uppercase font-bold">Characters</span>
                <span className="font-editorial text-2xl font-bold">{charCountWithSpaces}</span>
              </div>
              <div className="border border-border p-3 bg-secondary/10">
                <span className="block font-mono text-[9px] text-muted-foreground uppercase font-bold">Sentences</span>
                <span className="font-editorial text-2xl font-bold">{sentenceCount}</span>
              </div>
              <div className="border border-border p-3 bg-secondary/10">
                <span className="block font-mono text-[9px] text-muted-foreground uppercase font-bold">Paragraphs</span>
                <span className="font-editorial text-2xl font-bold">{paragraphCount}</span>
              </div>
            </div>

            {/* Additional metrics info */}
            <div className="border-t border-border pt-4 space-y-3">
              {/* Reading time */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground uppercase font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Reading Time
                </span>
                <span className="font-bold text-foreground">
                  {readingTime < 60 ? `${readingTime}s` : `${Math.floor(readingTime / 60)}m ${readingTime % 60}s`}
                </span>
              </div>
              
              {/* No spaces count */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground uppercase font-bold">No-Spaces Chars</span>
                <span className="font-bold text-foreground">{charCountNoSpaces}</span>
              </div>
            </div>

            {/* Keyword Density List */}
            {densityList.length > 0 && (
              <div className="space-y-2 border-t border-border pt-4 flex-1">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Keyword Density (Excl. Stopwords)
                </h4>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {densityList.map((item) => (
                    <div key={item.word} className="flex justify-between items-center text-xs font-mono">
                      <span className="text-foreground font-semibold truncate max-w-[120px]">{item.word}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
