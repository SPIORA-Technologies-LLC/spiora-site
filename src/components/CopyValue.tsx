"use client";

import { useState, type ReactNode } from "react";

type CopyValueProps = {
  text: string;
  label: string;
  children: ReactNode;
};

export function CopyValue({ text, label, children }: CopyValueProps) {
  const [hidden, setHidden] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setHidden(true);
    } catch {
      setHidden(false);
    }
  }

  return (
    <span className="copy-value" onMouseLeave={() => setHidden(false)}>
      <span>{children}</span>
      <button
        type="button"
        className={hidden ? "copy-button is-hidden" : "copy-button"}
        onClick={copy}
      >
        {label}
      </button>
    </span>
  );
}
