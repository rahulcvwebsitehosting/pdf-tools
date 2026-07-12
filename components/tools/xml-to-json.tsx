"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function XmlToJsonTool() {
  const [xml, setXml] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setJson("");

    if (!xml.trim()) {
      setError("Please paste XML structure.");
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");
      const errorNode = doc.querySelector("parsererror");
      if (errorNode) {
        throw new Error(errorNode.textContent || "XML parse error");
      }

      const convertNode = (node: Node): any => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue?.trim() || "";
        }

        const obj: any = {};
        if (node.hasChildNodes()) {
          node.childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const val = child.nodeValue?.trim();
              if (val) {
                obj["#text"] = val;
              }
            } else {
              const childVal = convertNode(child);
              const nodeName = child.nodeName;
              if (obj[nodeName]) {
                if (!Array.isArray(obj[nodeName])) {
                  obj[nodeName] = [obj[nodeName]];
                }
                obj[nodeName].push(childVal);
              } else {
                obj[nodeName] = childVal;
              }
            }
          });
        }
        return obj;
      };

      const result = convertNode(doc.documentElement);
      setJson(JSON.stringify({ [doc.documentElement.nodeName]: result }, null, 2));
    } catch (e: any) {
      setError("Failed to convert: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Input XML</label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            className="editorial-textarea h-64 focus:outline-none"
            placeholder="<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me!</body></note>"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">JSON Output</label>
          <textarea
            readOnly
            value={json}
            className="editorial-textarea h-64 focus:outline-none bg-secondary/10"
            placeholder="JSON output will display here..."
          />
        </div>
      </div>
      <button onClick={handleConvert} className="btn-primary">Convert XML to JSON</button>
      {error && (
        <div className="p-4 border border-border bg-accent text-accent-foreground font-mono text-xs uppercase">
          {error}
        </div>
      )}
    </div>
  );
}