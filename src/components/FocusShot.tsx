import Image from "next/image";
import type { CSSProperties } from "react";
import type { ShotFocus, ShotImage } from "@/content/shots";

type FocusShotProps = {
  image: ShotImage;
  alt: string;
  focus?: ShotFocus;
  sizes?: string;
};

/**
 * A screenshot in a fixed frame that can zoom into one area. The <Image>
 * is keyed by its source, so moving between two areas of the same
 * screenshot pans smoothly instead of reloading the picture.
 */
export function FocusShot({ image, alt, focus, sizes = "(min-width: 900px) 600px, 100vw" }: FocusShotProps) {
  const style = {
    "--shot-x": `${focus?.x ?? 50}%`,
    "--shot-y": `${focus?.y ?? 50}%`,
    "--shot-zoom": focus?.zoom ?? 1,
  } as CSSProperties;

  return (
    <div className="focus-shot" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <Image
        key={image.src}
        className="focus-shot-img"
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        style={style}
      />
    </div>
  );
}
