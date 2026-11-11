"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCalendarDays,
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
  const beforeRef = useRef<HTMLButtonElement>(null);
  const afterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setEnhanced(true);
  }, []);

  function choose(next: Mode, focus = false) {
    setMode(next);
    if (!focus) return;
    const target = next === "before" ? beforeRef.current : afterRef.current;
    target?.focus();
  }

  return (
    <div className={enhanced ? `compare is-enhanced is-${mode}` : "compare"}>
      <div
        className="compare-switch"
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
        <button
          ref={beforeRef}
          className={mode === "before" ? "btn btn-primary" : "btn btn-outline"}
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
          className={mode === "after" ? "btn btn-primary" : "btn btn-outline"}
          type="button"
          role="radio"
          aria-checked={mode === "after"}
          tabIndex={mode === "after" ? 0 : -1}
          onClick={() => choose("after")}
        >
          {afterLabel}
        </button>
      </div>

      <div className="space-grid">
        <article className="card" data-state="before" id="workflow-before">
          <h3>{beforeLabel}</h3>
          <p>{before}</p>
          <ul className="tool-list">
            {tools.map((tool, index) => (
              <li key={tool}>
                <FontAwesomeIcon icon={toolIcons[index]} aria-hidden="true" />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
          <p className="note">{toolsNote}</p>
        </article>
        <article className="card" data-state="after" id="workflow-after">
          <h3>{afterLabel}</h3>
          <p>{after}</p>
          <ul className="plain-list">
            {workspace.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
