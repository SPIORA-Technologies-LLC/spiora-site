import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

type ShotProps = {
  alt: string;
  caption: string;
  src?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  label?: string;
  title?: string;
  note?: string;
};

export function Shot({ label, title, note, alt, caption, src, width, height, priority }: ShotProps) {
  return (
    <figure className="shot">
      {src && width && height ? (
        <div className="shot-frame shot-photo">
          <Image src={src} alt={alt} width={width} height={height} priority={priority} unoptimized />
        </div>
      ) : (
        <div className="shot-frame" role="img" aria-label={alt}>
          {label ? <Badge>{label}</Badge> : null}
          <p className="shot-title">{title}</p>
          <p className="shot-note">{note}</p>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
