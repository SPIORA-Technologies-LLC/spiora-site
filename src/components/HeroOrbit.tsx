"use client";

import { useRef } from "react";

type HeroOrbitProps = {
  tools: readonly string[];
  label: string;
};

// Radius of the orbit as a share of the figure's width (240 of 560 in the design).
const RADIUS = 42.86;

function round(value: number) {
  return Math.round(value * 100) / 100;
}

/**
 * The scattered tools slowly orbit the SPIORA power button, each linked to it
 * by a line along which dashes flow inward. Pure CSS motion; it pauses on
 * hover and stops for visitors who prefer reduced motion.
 */
const SHIMMER_MS = 1600;

export function HeroOrbit({ tools, label }: HeroOrbitProps) {
  const orbitRef = useRef<HTMLElement>(null);
  const shimmerTimer = useRef<number | null>(null);
  const points = tools.map((tool, index) => {
    const angle = ((-90 + (360 / tools.length) * index) * Math.PI) / 180;
    return { tool, x: round(50 + RADIUS * Math.cos(angle)), y: round(50 + RADIUS * Math.sin(angle)) };
  });

  const playShimmer = () => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    orbit.classList.remove("is-lit");
    void orbit.offsetWidth;
    orbit.classList.add("is-lit");
    if (shimmerTimer.current) window.clearTimeout(shimmerTimer.current);
    shimmerTimer.current = window.setTimeout(() => orbit.classList.remove("is-lit"), SHIMMER_MS);
  };

  return (
    <figure ref={orbitRef} className="orbit" aria-label={label}>
      <svg className="orbit-track" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={RADIUS} />
      </svg>

      <div className="orbit-spin">
        <svg className="orbit-lines" viewBox="0 0 100 100" aria-hidden="true">
          {points.map((point) => (
            <line key={point.tool} x1={point.x} y1={point.y} x2="50" y2="50" />
          ))}
        </svg>
        <ul className="orbit-tools">
          {points.map((point) => (
            <li key={point.tool} style={{ left: `${point.x}%`, top: `${point.y}%` }}>
              <span>{point.tool}</span>
            </li>
          ))}
        </ul>
      </div>

      <span className="orbit-pulse" aria-hidden="true" />
      <button type="button" className="orbit-core" aria-label={label} onClick={playShimmer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-o.svg" alt="" width={104} height={110} />
      </button>
    </figure>
  );
}
