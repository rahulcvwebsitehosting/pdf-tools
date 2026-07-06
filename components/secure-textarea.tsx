"use client";
import React, { useRef, useEffect } from "react";

interface SecureTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  rows?: number;
  id?: string;
}

export function SecureTextarea({
  value,
  onChange,
  placeholder,
  className = "",
  disabled,
  name,
  rows,
  id,
}: SecureTextareaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    if (!shadowRootRef.current) {
      const shadowRoot = host.attachShadow({ mode: "closed" });
      shadowRootRef.current = shadowRoot;

      const style = document.createElement("style");
      style.textContent = `
        textarea {
          width: 100%;
          height: 100%;
          min-height: inherit;
          padding: 12px;
          border: 1px solid black;
          background: var(--background, #fff);
          color: var(--foreground, #000);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 12px;
          box-sizing: border-box;
          resize: vertical;
          outline: none;
        }
        textarea:focus {
          border-color: var(--accent, #000);
          box-shadow: 0 0 0 1px var(--accent, #000);
        }
      `;
      shadowRoot.appendChild(style);

      const textarea = document.createElement("textarea");
      textareaRef.current = textarea;
      shadowRoot.appendChild(textarea);
    }

    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = (e: Event) => {
        if (onChange) {
          const target = e.target as HTMLTextAreaElement;
          const customEvent = {
            target: {
              value: target.value,
              name: name || "",
              id: id || "",
            },
            currentTarget: target,
            preventDefault: () => {},
            stopPropagation: () => {},
          } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(customEvent);
        }
      };

      textarea.addEventListener("input", handleInput);
      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }
  }, [onChange, name, id]);

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value !== value) {
      textareaRef.current.value = value;
    }
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      if (placeholder !== undefined) textareaRef.current.placeholder = placeholder;
    }
  }, [placeholder]);

  useEffect(() => {
    if (textareaRef.current) {
      if (disabled !== undefined) textareaRef.current.disabled = disabled;
    }
  }, [disabled]);

  useEffect(() => {
    if (textareaRef.current) {
      if (rows !== undefined) textareaRef.current.rows = rows;
    }
  }, [rows]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ display: "block" }} 
    />
  );
}
