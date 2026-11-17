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
export function HeroOrbit({ tools, label }: HeroOrbitProps) {
  const points = tools.map((tool, index) => {
    const angle = ((-90 + (360 / tools.length) * index) * Math.PI) / 180;
    return { tool, x: round(50 + RADIUS * Math.cos(angle)), y: round(50 + RADIUS * Math.sin(angle)) };
  });

  return (
    <figure className="orbit" aria-label={label}>
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
      <span className="orbit-core" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-o.svg" alt="" width={104} height={110} />
      </span>
    </figure>
  );
}
