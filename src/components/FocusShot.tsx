import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { ShotCrop, ShotImage } from "@/content/shots";

type FocusShotProps = {
  image: ShotImage;
  alt: string;
  /** The part of the screenshot to show; everything else is hidden. */
  crop?: ShotCrop;
  sizes?: string;
  /** Drawn over the screenshot and cropped/scaled with it (positions in % of the shot). */
  children?: ReactNode;
};

/** Width / height of the frame every crop is fitted into. */
const FRAME = 2;

/**
 * Shows one section of a screenshot, scaled to fit a fixed frame and centred,
 * with the rest of the screen cut away. The stage is keyed by the image
 * source, so moving between two sections of the same screenshot animates.
 */
export function FocusShot({ image, alt, crop = { x: 0, y: 0, w: 100, h: 100 }, sizes = "(min-width: 900px) 600px, 100vw", children }: FocusShotProps) {
  const imageRatio = image.width / image.height;
  // Stage = the whole screenshot at frame width; scale it so the crop fits the frame.
  const zoom = Math.min(100 / crop.w, ((100 / FRAME) * imageRatio) / crop.h);
  const style = {
    aspectRatio: `${image.width} / ${image.height}`,
    "--shot-zoom": zoom,
    "--shot-cx": `${-(crop.x + crop.w / 2)}%`,
    "--shot-cy": `${-(crop.y + crop.h / 2)}%`,
    "--shot-mid": `${50 / FRAME}cqw`,
    "--shot-clip": `inset(${crop.y}% ${100 - crop.x - crop.w}% ${100 - crop.y - crop.h}% ${crop.x}% round ${(12 / zoom).toFixed(1)}px)`,
  } as CSSProperties;

  return (
    <div className="focus-shot" style={{ aspectRatio: `${FRAME}` }}>
      <div key={image.src} className="focus-shot-stage" style={style}>
        <Image
          className="focus-shot-img"
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
        />
        {children ? (
          <div className="focus-shot-overlay" aria-hidden="true">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
