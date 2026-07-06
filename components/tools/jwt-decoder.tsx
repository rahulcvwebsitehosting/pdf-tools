"use client";
import { useState } from "react";
import { TrustBadge } from "@/components/trust-badge";

export default function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [expiration, setExpiration] = useState("");
  const [error, setError] = useState("");

  const handleDecode = () => {
    setError("");
    setHeader("");
    setPayload("");
    setExpiration("");

    if (!token.trim()) {
      setError("Please paste a token first.");
      return;
    }

    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) {
        throw new Error("A JWT token must consist of exactly 3 parts separated by dots.");
      }

      const decodePart = (str: string) => {
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) base64 += "=";
        const decoded = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.stringify(JSON.parse(decoded), null, 2);
      };

      const decHeader = decodePart(parts[0]);
      const decPayload = decodePart(parts[1]);

      setHeader(decHeader);
      setPayload(decPayload);

      const parsedPayload = JSON.parse(decPayload);
      if (parsedPayload.exp) {
        const date = new Date(parsedPayload.exp * 1000);
        const expired = date.getTime() < Date.now();
        setExpiration(
          `${date.toLocaleString()} (${expired ? "EXPIRED" : "VALID"})`
        );
      } else {
        setExpiration("No expiration (exp) claim found in payload.");
      }
    } catch (e: any) {
      setError("Decoding failed: " + (e.message || "Invalid token structure"));
    }
  };

  return (
    <div className="space-y-6">
      <TrustBadge />
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-muted-foreground mb-1">Paste JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="editorial-textarea h-24 focus:outline-none"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          />
        </div>
        <button onClick={handleDecode} className="btn-primary">Decode JWT</button>

        {error && (
          <div className="p-4 border border-black bg-accent text-black font-mono text-xs uppercase">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="editorial-panel p-4 space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase">Header (Decoded)</h3>
            <pre className="text-xs font-mono bg-secondary/15 p-2 overflow-auto max-h-48 whitespace-pre-wrap">{header || "JSON header will display here..."}</pre>
          </div>
          <div className="editorial-panel p-4 space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase">Payload (Decoded)</h3>
            <pre className="text-xs font-mono bg-secondary/15 p-2 overflow-auto max-h-48 whitespace-pre-wrap">{payload || "JSON payload will display here..."}</pre>
          </div>
        </div>

        {expiration && (
          <div className="editorial-panel p-4 space-y-1">
            <h3 className="font-mono text-xs font-bold uppercase">Expiration Details</h3>
            <p className="text-sm font-mono">{expiration}</p>
          </div>
        )}
      </div>
    </div>
  );
}