"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { PrivacyAlertBanner } from "@/components/privacy-alert-banner";
import { SecureTextarea } from "@/components/secure-textarea";
import { useState, useEffect } from "react";
import { useTextAi } from "@/hooks/useAi";

export default function FreeAiAiResumeAnalyzerTool() {
  const [input, setInput] = useState("");
  const { status, output, stream, error, isReady, loadingMessage, generate, initWorker } = useTextAi();

  // Initialize the worker on component mount to prevent race condition when processing is triggered
  useEffect(() => {
    initWorker();
  }, [initWorker]);

  const handleRun = () => {
    if (!input.trim() || !isReady) return;
    const fewShotConfig = [
    { role: "system", content: "You are a strict, single-purpose utility for analyzing resume text and identifying strengths, weaknesses, and keyword matches. Output ONLY the final processed result. Do NOT include greetings, conversational filler, markdown blocks, or explanations." },
    { role: "user", content: "John Doe, High School Graduate, seeking any job." },
    { role: "assistant", content: "Analysis: Entry-level candidate. Lacks specific keywords. Recommendation: Highlight technical skills." },
    { role: "user", content: "Jane Smith, 5 years React & Next.js experience, worked on scalable frontends at TechCorp." },
    { role: "assistant", content: "Strengths: 5+ years frontend experience, React/Next.js expertise.\nKeywords: React, Next.js, Frontend, TechCorp.\nMatch: High." }
  ];
    generate([
      ...fewShotConfig,
      { role: "user", content: input }
    ]);
  };

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
      <PrivacyAlertBanner />
  
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Source Text</label>
          <SecureTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-32"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button onClick={handleRun} disabled={!isReady || status === 'generating'} className="btn-primary">
            {status === 'generating' ? 'Running locally...' : 'Process with local AI'}
          </button>
          
          {!isReady && (
            <div className="text-xs font-mono text-muted-foreground animate-pulse">
              ⚙️ {loadingMessage}
            </div>
          )}
          {isReady && status === 'generating' && (
            <div className="text-xs font-mono text-muted-foreground">
              ⚡ Streaming local inference...
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 border border-red-500 bg-red-50 text-red-700 text-xs font-mono">
            {error}
          </div>
        )}

        {(output || stream) && (
          <div className="editorial-panel p-4 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase border-b border-border pb-1">AI Output</h4>
            <div className="font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {output || stream}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
