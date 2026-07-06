"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et",
  "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
  "aliquip", "ex", "ea", "commodo", "consequat"
];

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    let res = "";
    for (let i = 0; i < count; i++) {
      const sentenceCount = 4 + Math.floor(Math.random() * 4);
      let para = "";
      for (let s = 0; s < sentenceCount; s++) {
        const wordCount = 6 + Math.floor(Math.random() * 8);
        const sentenceWords = [];
        for (let w = 0; w < wordCount; w++) {
          sentenceWords.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
        }
        const sStr = sentenceWords.join(" ");
        para += sStr.charAt(0).toUpperCase() + sStr.slice(1) + ". ";
      }
      res += para.trim() + "\n\n";
    }
    setOutput(res.trim());
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs font-bold uppercase">Paragraphs count:</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            className="p-1 border border-black w-20 bg-background font-mono text-xs focus:outline-none"
            min={1}
            max={50}
          />
        </div>
        <button onClick={handleGenerate} className="btn-primary">Generate Dummy Text</button>

        {output && (
          <div className="editorial-panel p-4">
            <h4 className="font-mono text-xs font-bold uppercase mb-2">Lorem Ipsum Output</h4>
            <pre className="font-mono text-xs bg-secondary/15 p-2 overflow-auto max-h-60 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}