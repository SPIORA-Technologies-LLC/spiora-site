import Image from "next/image";
import { copy } from "@/content/en";
import { story } from "@/content/story";

export function HeroPoster() {
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
      <div className="shot-frame shot-photo">
        <Image
          src={copy.hero.shot.src}
          alt={copy.hero.shot.alt}
          width={copy.hero.shot.width}
          height={copy.hero.shot.height}
          priority
          sizes="(min-width: 900px) 560px, 100vw"
        />
      </div>
      <figcaption>{story.hero.posterCaption}</figcaption>
      <p className="note">{story.beforeAfter.toolsNote}</p>
    </figure>
  );
}
