"use client";

import { useEffect, useRef } from "react";

const STEP_MS = 400;
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
    let travelTimer = 0;
    let alive = true;

    const placeArrow = () => {
      const first = list.querySelector("li span");
      const lastCircle = list.querySelector("li:last-child");
      if (!first || !lastCircle) return;
      const listBox = list.getBoundingClientRect();
      const firstBox = first.getBoundingClientRect();
      const circleBox = lastCircle.getBoundingClientRect();
      list.style.setProperty("--discuss-arrow-x", `${firstBox.left - listBox.left - 28}px`);
      list.style.setProperty("--discuss-arrow-travel", `${circleBox.left - firstBox.left}px`);
      list.style.setProperty("--discuss-arrow-duration", `${items.length * STEP_MS}ms`);
    };

    window.addEventListener("resize", placeArrow);

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runArrow = () => {
      if (reduced()) return;
      placeArrow();
      list.classList.remove("is-traveling");
      void list.offsetWidth;
      list.classList.add("is-traveling");
      window.clearTimeout(travelTimer);
      travelTimer = window.setTimeout(
        () => list.classList.remove("is-traveling"),
        items.length * STEP_MS + HOLD_MS,
      );
    };

    const play = () => {
      if (reduced()) return;

      const run = () => {
        placeArrow();
        list.classList.remove("is-traveling");
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

    const arm = () => {
      if (!alive) return;
      placeArrow();
      const box = list.getBoundingClientRect();
      const visible = box.top < window.innerHeight * 0.72 && box.bottom > 0;
      if (visible) {
        runArrow();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          observer = null;
          runArrow();
        },
        { threshold: 0.35 },
      );
      observer.observe(list);
    };

    if (document.fonts) document.fonts.ready.then(arm);
    else arm();

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
      alive = false;
      window.removeEventListener("resize", placeArrow);
      document.removeEventListener("click", onClick);
      observer?.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(travelTimer);
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
