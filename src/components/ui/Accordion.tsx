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
            <button
              id={`${baseId}-${item.id}-button`}
              className="ui-accordion-trigger"
              type="button"
              aria-expanded={expanded}
              aria-controls={`${baseId}-${item.id}-panel`}
              onClick={() => toggle(item.id)}
            >
              {item.title}
            </button>
            <div id={`${baseId}-${item.id}-panel`} role="region" aria-labelledby={`${baseId}-${item.id}-button`} hidden={!expanded}>
              <div className="ui-accordion-panel">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
