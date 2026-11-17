import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { ShotFocus, ShotImage } from "@/content/shots";

type FocusShotProps = {
  image: ShotImage;
  alt: string;
  focus?: ShotFocus;
  sizes?: string;
  /** Drawn over the screenshot and zoomed together with it (positions in % of the shot). */
  children?: ReactNode;
};

/**
 * A screenshot in a fixed frame that can zoom into one area. The stage is
 * keyed by the image source, so moving between two areas of the same
 * screenshot pans smoothly instead of reloading the picture.
 */
export function FocusShot({ image, alt, focus, sizes = "(min-width: 900px) 600px, 100vw", children }: FocusShotProps) {
  const style = {
    "--shot-x": `${focus?.x ?? 50}%`,
    "--shot-y": `${focus?.y ?? 50}%`,
    "--shot-zoom": focus?.zoom ?? 1,
  } as CSSProperties;

  return (
    <div className="focus-shot" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
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
