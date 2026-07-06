"use client";
import { PrivacyBadge } from "@/components/privacy-badge";
import { SecureTextarea } from "@/components/secure-textarea";
import { useState, useEffect } from "react";
import { useTextAi } from "@/hooks/useAi";

export default function FreeAiAiCommitMessageGeneratorTool() {
  const [input, setInput] = useState("");
  const { status, output, stream, error, isReady, loadingMessage, generate, initWorker } = useTextAi();

  // Initialize the worker on component mount to prevent race condition when processing is triggered
  useEffect(() => {
    initWorker();
  }, [initWorker]);

  const handleRun = () => {
    if (!input.trim() || !isReady) return;
    const fewShotConfig = [
    { role: "system", content: "You are a strict, single-purpose utility for generating clean conventional commit messages based on a git diff input. Output ONLY the final processed result. Do NOT include greetings, conversational filler, markdown blocks, or explanations." },
    { role: "user", content: "diff --git a/README.md b/README.md\n-old line\n+new line" },
    { role: "assistant", content: "docs: update README.md documentation" },
    { role: "user", content: "diff --git a/hooks/useAi.ts b/hooks/useAi.ts\n+  const [isReady, setIsReady] = useState(false);\n+  if (!isReady) return;" },
    { role: "assistant", content: "feat(hooks): add isReady state locks to prevent inference race conditions" }
  ];
    generate([
      ...fewShotConfig,
      { role: "user", content: input }
    ]);
  };

  return (
    <div className="space-y-6">
      
      <PrivacyBadge />
  
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
            <h4 className="font-mono text-xs font-bold uppercase border-b border-black/10 pb-1">AI Output</h4>
            <div className="font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {output || stream}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
