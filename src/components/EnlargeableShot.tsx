"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";

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
      <Dialog open={open} titleId={titleId} onClose={() => setOpen(false)}>
        <p id={titleId} className="lightbox-title">
          {alt}
        </p>
        <button type="button" className="lightbox-close" onClick={() => setOpen(false)}>
          {closeLabel}
        </button>
        <Image className="lightbox-shot" src={src} alt={alt} width={width} height={height} unoptimized />
      </Dialog>
    </>
  );
}
