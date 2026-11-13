"use client";

import { useEffect, useRef, useState } from "react";
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
  toolsNote: string;
  workspace: readonly string[];
};

export function BeforeAfter({
  title,
  beforeLabel,
  before,
  afterLabel,
  after,
  tools,
  toolsNote,
  workspace,
}: BeforeAfterProps) {
  const [mode, setMode] = useState<Mode>("before");
  const [enhanced, setEnhanced] = useState(false);
  const [touched, setTouched] = useState(false);
  const beforeRef = useRef<HTMLButtonElement>(null);
  const afterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setEnhanced(true);
  }, []);

  function choose(next: Mode, focus = false) {
    if (next === mode) return;
    setTouched(true);
    setMode(next);
    if (focus) (next === "before" ? beforeRef.current : afterRef.current)?.focus();
  }

  const hidden = enhanced && mode === "before";

  return (
    <div className={enhanced ? `compare is-enhanced is-${mode}${touched ? " is-touched" : ""}` : "compare"}>
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
          <ul className="tool-list compare-chaos">
            {tools.map((tool, index) => (
              <li key={tool}>
                <FontAwesomeIcon icon={toolIcons[index]} aria-hidden="true" />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
          <p className="note">{toolsNote}</p>
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
