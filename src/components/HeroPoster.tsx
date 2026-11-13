import Image from "next/image";
import type { SiteCopy, StoryCopy } from "@/content";

export function HeroPoster({ copy, story }: { copy: SiteCopy; story: StoryCopy }) {
  return (
    <figure className="hero-poster">
      <div className="hero-system">
        <p className="hero-core">{copy.brand}</p>
        <ul className="hero-tools">
          {story.beforeAfter.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <div className="shot-frame shot-photo hero-shot">
        <span className="footnote-mark" aria-hidden="true">
          *
        </span>
        <Image
          src={copy.hero.shot.src}
          alt={copy.hero.shot.alt}
          width={copy.hero.shot.width}
          height={copy.hero.shot.height}
          priority
          sizes="(min-width: 900px) 560px, 100vw"
        />
      </div>
      <figcaption>
        <span aria-hidden="true">* </span>
        {story.hero.posterCaption}
      </figcaption>
    </figure>
  );
}
