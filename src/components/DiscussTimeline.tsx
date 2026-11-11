"use client";

import { useEffect, useRef } from "react";

const STEP_MS = 520;
const HOLD_MS = 140;

type DiscussTimelineProps = {
  items: readonly string[];
};

export function DiscussTimeline({ items }: DiscussTimelineProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let observer: IntersectionObserver | null = null;
    let timer = 0;

    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const run = () => {
        list.classList.remove("is-marked");
        void list.offsetWidth;
        list.classList.add("is-marked");
        window.clearTimeout(timer);
        timer = window.setTimeout(
          () => list.classList.remove("is-marked"),
          items.length * STEP_MS + HOLD_MS,
        );
      };

      observer?.disconnect();
      const rect = list.getBoundingClientRect();
      const seen = rect.top < window.innerHeight * 0.72 && rect.bottom > 0;
      if (seen) {
        run();
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          observer = null;
          run();
        },
        { threshold: 0.35 },
      );
      observer.observe(list);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href !== "/#implementation" && href !== "#implementation") return;
      play();
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [items.length]);

  return (
    <ul className="discuss-timeline" ref={listRef}>
      {items.map((item) => (
        <li key={item}>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
