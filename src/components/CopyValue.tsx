"use client";

import { useState, type ReactNode } from "react";

type CopyValueProps = {
  text: string;
  label: string;
  children: ReactNode;
};

export function CopyValue({ text, label, children }: CopyValueProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <span className="copy-value">
      <span className="copy-text">{children}</span>
      <button type="button" className={copied ? "copy-button is-copied" : "copy-button"} onClick={copy}>
        {copied ? "Copied" : label}
      </button>
    </span>
  );
}
