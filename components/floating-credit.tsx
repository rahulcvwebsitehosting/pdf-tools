"use client";

import { useState } from "react";
import { X, ExternalLink, Mail, GitBranch } from "lucide-react";

export function FloatingCredit() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-accent border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center group"
        title="About the developer"
      >
        <span className="font-bold text-lg text-black">R</span>
      </button>

      {/* Modal */}
      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)} />
          <div className="fixed bottom-20 right-6 z-50 w-80 bg-background border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-fade-in-scale">
            <div className="flex items-center justify-between p-4 border-b border-black bg-accent">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">Developer</h3>
              <button onClick={() => setOpen(false)} className="hover:opacity-60 transition-opacity">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <span className="font-editorial text-2xl font-bold uppercase tracking-tight block">Rahul S</span>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Web Developer & Full-Stack Engineer</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Engineering-focused builder passionate about creating fast, private, client-side web applications and AI-powered tools.
              </p>
              <div className="space-y-2 text-xs font-mono text-muted-foreground">
                <a
                  href="https://rahulshyam-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <ExternalLink size={12} /> Portfolio
                </a>
                <a
                  href="https://github.com/rahulshyam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <GitBranch size={12} /> GitHub
                </a>
                <a
                  href="mailto:rahulcvfiitjee@gmail.com"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail size={12} /> rahulcvfiitjee@gmail.com
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
