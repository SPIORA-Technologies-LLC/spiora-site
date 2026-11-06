"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type EnlargeableShotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  enlargeLabel: string;
  closeLabel: string;
};

export function EnlargeableShot({
  src,
  alt,
  width,
  height,
  enlargeLabel,
  closeLabel,
}: EnlargeableShotProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="module-shot-button"
        aria-haspopup="dialog"
        aria-label={`${enlargeLabel}: ${alt}`}
        onClick={() => setOpen(true)}
      >
        <Image className="module-shot" src={src} alt="" width={width} height={height} unoptimized />
      </button>
      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={() => setOpen(false)}>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <p id={titleId} className="lightbox-title">
              {alt}
            </p>
            <button ref={closeRef} type="button" className="lightbox-close" onClick={() => setOpen(false)}>
              {closeLabel}
            </button>
            <Image className="lightbox-shot" src={src} alt={alt} width={width} height={height} unoptimized />
          </div>
        </div>
      ) : null}
    </>
  );
}
