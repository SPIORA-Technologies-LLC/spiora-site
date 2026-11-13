"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { EnlargeableShot } from "@/components/EnlargeableShot";
import type { SiteCopy } from "@/content";
import { moduleShots, shots } from "@/content/shots";

type ModuleItem = {
  id: string;
  title: string;
  body: string;
};

type ShotLabels = {
  shotAlts: SiteCopy["shotAlts"];
  enlargeLabel: string;
  closeLabel: string;
};

type ModulesProps = ShotLabels & {
  label: string;
  items: readonly ModuleItem[];
};

export function Modules({ label, items, ...labels }: ModulesProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [enhanced, setEnhanced] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const selected = items.some((item) => item.id === active) ? active : items[0]?.id ?? "";
  const current = items.find((item) => item.id === selected) ?? items[0];

  useEffect(() => {
    setEnhanced(true);
  }, []);

  function choose(id: string, focus = false) {
    setActive(id);
    if (focus) tabRefs.current[id]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = items.findIndex((item) => item.id === selected);
    const last = items.length - 1;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = Math.min(last, index + 1);
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = Math.max(0, index - 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === index || next < 0) return;
    event.preventDefault();
    const item = items[next];
    if (item) choose(item.id, true);
  }

  if (!current) return null;

  return (
    <div className={enhanced ? "module-switcher is-enhanced" : "module-switcher"}>
      <div className="module-list" role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={onKeyDown}>
        {items.map((item) => {
          const isSelected = item.id === selected;
          return (
            <div className="module-item" key={item.id}>
              <button
                ref={(node) => {
                  tabRefs.current[item.id] = node;
                }}
                id={`module-tab-${item.id}`}
                className="module-tab"
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`module-stage module-inline-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => choose(item.id)}
              >
                {item.title}
              </button>
              <div
                id={`module-inline-${item.id}`}
                className="module-inline"
                data-module={item.id}
                role="tabpanel"
                aria-labelledby={`module-tab-${item.id}`}
                hidden={enhanced && !isSelected}
              >
                <ModulePanel item={item} {...labels} />
              </div>
            </div>
          );
        })}
      </div>
      <div
        id="module-stage"
        className="module-stage"
        data-module={current.id}
        role="tabpanel"
        aria-labelledby={`module-tab-${current.id}`}
      >
        <ModulePanel key={current.id} item={current} {...labels} />
      </div>
    </div>
  );
}

function ModulePanel({ item, shotAlts, enlargeLabel, closeLabel }: { item: ModuleItem } & ShotLabels) {
  const key = moduleShots[item.id];
  const image = key ? shots[key] : null;
  return (
    <div className="module-panel">
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {key && image ? (
        <EnlargeableShot
          src={image.src}
          alt={shotAlts[key]}
          width={image.width}
          height={image.height}
          enlargeLabel={enlargeLabel}
          closeLabel={closeLabel}
        />
      ) : null}
    </div>
  );
}
