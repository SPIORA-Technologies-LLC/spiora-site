"use client";

import { useId, useState, type ReactNode } from "react";

type AccordionItem = {
  id: string;
  title: string;
  body: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>([]);

  function toggle(id: string) {
    setOpen((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="ui-accordion">
      {items.map((item) => {
        const expanded = open.includes(item.id);
        return (
          <div className="ui-accordion-item" key={item.id}>
            <div className="ui-accordion-row">
              <p className="ui-accordion-title" id={`${baseId}-${item.id}-title`}>
                {item.title}
              </p>
              <button
                className="ui-accordion-toggle"
                type="button"
                aria-expanded={expanded}
                aria-controls={`${baseId}-${item.id}-panel`}
                onClick={() => toggle(item.id)}
              >
                {expanded ? "Close" : "Open"}
              </button>
            </div>
            <div id={`${baseId}-${item.id}-panel`} role="region" aria-labelledby={`${baseId}-${item.id}-title`} hidden={!expanded}>
              <div className="ui-accordion-panel">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
