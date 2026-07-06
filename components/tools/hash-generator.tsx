"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function HashGeneratorTool() {
  const [text, setText] = useState("");
  const [sha256, setSha256] = useState("");
  const [sha512, setSha512] = useState("");
  const [sha1, setSha1] = useState("");

  const handleGenerate = async () => {
    if (!text) return;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const getHashHex = async (algo: string) => {
      const buffer = await crypto.subtle.digest(algo, data);
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    setSha256(await getHashHex("SHA-256"));
    setSha512(await getHashHex("SHA-512"));
    setSha1(await getHashHex("SHA-1"));
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="editorial-textarea h-24 focus:outline-none"
            placeholder="Type or paste target content to hash..."
          />
        </div>
        <button onClick={handleGenerate} className="btn-primary">Generate Hashes</button>

        <div className="space-y-3">
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">SHA-256</h4>
            <input readOnly value={sha256} className="w-full p-2 border border-black bg-secondary/10 font-mono text-xs select-all focus:outline-none" />
          </div>
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">SHA-512</h4>
            <input readOnly value={sha512} className="w-full p-2 border border-black bg-secondary/10 font-mono text-xs select-all focus:outline-none" />
          </div>
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-1">SHA-1</h4>
            <input readOnly value={sha1} className="w-full p-2 border border-black bg-secondary/10 font-mono text-xs select-all focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}