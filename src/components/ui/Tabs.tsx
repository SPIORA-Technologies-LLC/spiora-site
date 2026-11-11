"use client";

import { useId, useState, type ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
  panel: ReactNode;
};

type TabsProps = {
  label: string;
  tabs: Tab[];
};

export function Tabs({ label, tabs }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const selected = tabs.some((tab) => tab.id === active) ? active : tabs[0]?.id;

  function move(current: string, direction: 1 | -1) {
    const index = tabs.findIndex((tab) => tab.id === current);
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    if (next) setActive(next.id);
  }

  return (
    <div className="ui-tabs">
      <div className="ui-tablist" role="tablist" aria-label={label}>
        {tabs.map((tab) => {
          const isSelected = tab.id === selected;
          return (
            <button
              key={tab.id}
              id={`${baseId}-${tab.id}-tab`}
              className="ui-tab"
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") move(tab.id, 1);
                if (event.key === "ArrowLeft") move(tab.id, -1);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-${tab.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-${tab.id}-tab`}
          hidden={tab.id !== selected}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
