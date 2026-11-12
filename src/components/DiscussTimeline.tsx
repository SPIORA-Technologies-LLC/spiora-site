"use client";

import { useEffect, useRef } from "react";

const STEP_MS = 300;
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

    const placeArrow = () => {
      const itemsInList = list.querySelectorAll("li");
      const lineItem = itemsInList[0];
      const lastCircle = itemsInList[itemsInList.length - 1];
      const first = lineItem?.querySelector("span");
      if (!first || !lineItem || !lastCircle) return;
      const listBox = list.getBoundingClientRect();
      const firstBox = first.getBoundingClientRect();
      const circleBox = lastCircle.getBoundingClientRect();
      const lineCenter = lineItem.getBoundingClientRect().top - listBox.top + 9;
      const holes = [...list.querySelectorAll("li span")].map((span) => {
        const box = span.getBoundingClientRect();
        const left = box.left - listBox.left - 1;
        const right = box.right - listBox.left + 1;
        return `M${left} 0 H${right} V8 H${left} Z`;
      });
      list.style.setProperty("--discuss-arrow-x", `${firstBox.left - listBox.left - 20}px`);
      list.style.setProperty("--discuss-arrow-travel", `${circleBox.left - firstBox.left}px`);
      list.style.setProperty("--discuss-arrow-top", `${lineCenter - 4}px`);
      list.style.setProperty("--discuss-arrow-duration", `${items.length * STEP_MS}ms`);
      list.style.setProperty(
        "--discuss-arrow-clip",
        `path(evenodd, "M0 0 H${list.clientWidth} V8 H0 Z ${holes.join(" ")}")`,
      );
    };

    placeArrow();
    window.addEventListener("resize", placeArrow);
    document.fonts?.ready.then(() => {
      if (list.isConnected) placeArrow();
    });

    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const run = () => {
        placeArrow();
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
      window.removeEventListener("resize", placeArrow);
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
      <span className="discuss-arrow" aria-hidden="true" />
    </ul>
  );
}
