"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCalendarDays,
  faCheck,
  faComments,
  faEnvelope,
  faFolderOpen,
  faListCheck,
  faTable,
  faVideo,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const toolIcons: IconDefinition[] = [
  faTable,
  faComments,
  faVideo,
  faFolderOpen,
  faWandMagicSparkles,
  faListCheck,
  faCalendarDays,
  faEnvelope,
  faAddressBook,
];

type Mode = "before" | "after";

type BeforeAfterProps = {
  title: string;
  beforeLabel: string;
  before: string;
  afterLabel: string;
  after: string;
  tools: readonly string[];
  workspace: readonly string[];
};

type Orbit = {
  angle: number;
  speed: number;
  rx: number;
  ry: number;
  wobble: number;
  phase: number;
};

type Pose = { x: number; y: number; rotate: number; scale: number };

const REDUCED = "(prefers-reduced-motion: reduce)";

// Deterministic orbits so the vortex looks the same on every visit.
function makeOrbits(count: number): Orbit[] {
  return Array.from({ length: count }, (_, i) => {
    const direction = i % 3 === 1 ? -1 : 1;
    return {
      angle: (i / count) * Math.PI * 2 + (i % 2) * 0.6,
      speed: direction * (0.32 + ((i * 37) % 10) / 34),
      rx: 0.5 + ((i * 53) % 10) / 20,
      ry: 0.42 + ((i * 29) % 10) / 17,
      wobble: 8 + ((i * 17) % 10) * 1.6,
      phase: i * 1.7,
    };
  });
}

export function BeforeAfter({ title, beforeLabel, before, afterLabel, after, tools, workspace }: BeforeAfterProps) {
  const [mode, setMode] = useState<Mode>("before");
  const [enhanced, setEnhanced] = useState(false);
  const [touched, setTouched] = useState(false);
  const [motion, setMotion] = useState(false);
  const beforeRef = useRef<HTMLButtonElement>(null);
  const afterRef = useRef<HTMLButtonElement>(null);
  const arenaRef = useRef<HTMLUListElement>(null);
  const chipRefs = useRef<Array<HTMLLIElement | null>>([]);
  const badgeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const poses = useRef<Pose[]>([]);
  const flipFrom = useRef<DOMRect[] | null>(null);

  useEffect(() => {
    setEnhanced(true);
    const query = window.matchMedia(REDUCED);
    const update = () => setMotion(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const swirling = enhanced && motion && mode === "before";

  // The vortex: every chip runs its own orbit, wobbles, and dips in depth.
  useEffect(() => {
    const arena = arenaRef.current;
    if (!swirling || !arena) return;

    const chips = chipRefs.current.filter((chip): chip is HTMLLIElement => Boolean(chip));
    const badges = [...badgeRefs.current];
    const orbits = makeOrbits(chips.length);
    let width = arena.clientWidth;
    let height = arena.clientHeight;
    let sizes = chips.map((chip) => ({ w: chip.offsetWidth, h: chip.offsetHeight }));
    let frame = 0;
    let visible = true;
    let last = performance.now();
    let clock = 0;

    const measure = () => {
      width = arena.clientWidth;
      height = arena.clientHeight;
      sizes = chips.map((chip) => ({ w: chip.offsetWidth, h: chip.offsetHeight }));
    };

    const paint = () => {
      chips.forEach((chip, i) => {
        const orbit = orbits[i];
        const size = sizes[i];
        const angle = orbit.angle + clock * orbit.speed;
        const depth = Math.sin(angle);
        const reachX = Math.max(0, width / 2 - size.w / 2 - 8);
        const reachY = Math.max(0, height / 2 - size.h / 2 - 8);
        const x = Math.cos(angle) * reachX * orbit.rx * 0.92 + Math.sin(clock * 1.3 + orbit.phase) * orbit.wobble;
        const y = depth * reachY * orbit.ry * 0.9 + Math.cos(clock * 1.7 + orbit.phase) * orbit.wobble * 0.6;
        const rotate = Math.sin(clock * 0.9 + orbit.phase) * 16 + depth * 6;
        const scale = 0.86 + (depth + 1) * 0.11;
        poses.current[i] = { x, y, rotate, scale };
        chip.style.transform = `translate(${x - size.w / 2}px, ${y - size.h / 2}px) rotate(${rotate}deg) scale(${scale})`;
        chip.style.zIndex = String(Math.round((depth + 1) * 10) + 1);
        chip.style.opacity = String(0.55 + (depth + 1) * 0.225);
      });
    };

    const draw = (now: number) => {
      frame = window.requestAnimationFrame(draw);
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;
      clock += delta;
      paint();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    observer.observe(arena);
    const resize = new ResizeObserver(measure);
    resize.observe(arena);
    paint();
    frame = window.requestAnimationFrame(draw);

    // Notification counters keep popping up on random chips.
    let lastBadge = -1;
    const ping = window.setInterval(() => {
      if (!visible || document.hidden) return;
      let index = Math.floor(Math.random() * chips.length);
      if (index === lastBadge) index = (index + 1) % chips.length;
      lastBadge = index;
      const badge = badges[index];
      if (!badge) return;
      badge.textContent = `+${1 + Math.floor(Math.random() * 9)}`;
      badge.classList.remove("is-on");
      void badge.offsetWidth;
      badge.classList.add("is-on");
    }, 650);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(ping);
      observer.disconnect();
      resize.disconnect();
      badges.forEach((badge) => badge?.classList.remove("is-on"));
    };
  }, [swirling]);

  // Chaos falls into order: each chip flies from its spot in the vortex into the row.
  useLayoutEffect(() => {
    const from = flipFrom.current;
    flipFrom.current = null;
    if (!from || mode !== "after") return;

    const chips = chipRefs.current;
    chips.forEach((chip) => {
      if (!chip) return;
      chip.style.transition = "none";
      chip.style.transform = "";
      chip.style.zIndex = "";
      chip.style.opacity = "";
    });

    chips.forEach((chip, i) => {
      const start = from[i];
      if (!chip || !start) return;
      const end = chip.getBoundingClientRect();
      if (!end.width || !start.width) return;
      const pose = poses.current[i];
      const dx = start.left + start.width / 2 - (end.left + end.width / 2);
      const dy = start.top + start.height / 2 - (end.top + end.height / 2);
      chip.style.transform = `translate(${dx}px, ${dy}px) rotate(${pose?.rotate ?? 0}deg)`;
    });

    void document.body.offsetWidth;

    chips.forEach((chip, i) => {
      if (!chip) return;
      chip.style.transition = `transform 760ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 35}ms, opacity 600ms ease, filter 600ms ease`;
      chip.style.transform = "";
    });
  }, [mode]);

  function choose(next: Mode, focus = false) {
    if (next === mode) return;
    if (next === "after" && swirling) {
      flipFrom.current = chipRefs.current.map((chip) => chip?.getBoundingClientRect() ?? new DOMRect());
    }
    if (next === "before") {
      chipRefs.current.forEach((chip) => {
        if (chip) chip.style.transition = "";
      });
    }
    setTouched(true);
    setMode(next);
    if (focus) (next === "before" ? beforeRef.current : afterRef.current)?.focus();
  }

  const hidden = enhanced && mode === "before";
  const classes = ["compare"];
  if (enhanced) classes.push("is-enhanced", `is-${mode}`);
  if (touched) classes.push("is-touched");

  return (
    <div className={classes.join(" ")}>
      <div
        className="compare-toggle"
        role="radiogroup"
        aria-label={title}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            choose("after", true);
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            choose("before", true);
          }
        }}
      >
        <span className="compare-thumb" aria-hidden="true" />
        <button
          ref={beforeRef}
          className="compare-option"
          type="button"
          role="radio"
          aria-checked={mode === "before"}
          tabIndex={mode === "before" ? 0 : -1}
          onClick={() => choose("before")}
        >
          {beforeLabel}
        </button>
        <button
          ref={afterRef}
          className="compare-option compare-option-power"
          type="button"
          role="radio"
          aria-checked={mode === "after"}
          tabIndex={mode === "after" ? 0 : -1}
          onClick={() => choose("after")}
        >
          <span className="compare-power" aria-hidden="true" />
          {afterLabel}
        </button>
      </div>

      <div className="compare-stage">
        <article className="card compare-before" data-state="before" id="workflow-before">
          <h3>{beforeLabel}</h3>
          <p>{before}</p>
          <div className={swirling ? "compare-arena is-swirling" : "compare-arena"}>
            {swirling ? (
              <span className="compare-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            ) : null}
            <ul ref={arenaRef} className="tool-list compare-chaos">
              {tools.map((tool, index) => (
                <li
                  key={tool}
                  ref={(node) => {
                    chipRefs.current[index] = node;
                  }}
                >
                  <FontAwesomeIcon icon={toolIcons[index]} aria-hidden="true" />
                  <span>{tool}</span>
                  <span
                    className="compare-badge"
                    aria-hidden="true"
                    ref={(node) => {
                      badgeRefs.current[index] = node;
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article
          className="compare-after"
          data-state="after"
          id="workflow-after"
          aria-hidden={hidden || undefined}
          inert={hidden || undefined}
        >
          <div className="compare-after-inner">
            <span className="compare-mark" aria-hidden="true" />
            <span className="compare-shine" aria-hidden="true" />
            <h3>{afterLabel}</h3>
            <p>{after}</p>
            <ul className="compare-order">
              {workspace.map((item, index) => (
                <li key={item} style={{ "--i": index } as React.CSSProperties}>
                  <span className="compare-check" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
