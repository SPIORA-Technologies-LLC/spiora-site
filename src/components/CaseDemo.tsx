"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { demoCase } from "@/content/demo-case";

export function CaseDemo() {
  const [index, setIndex] = useState(0);
  const total = demoCase.steps.length;
  const step = demoCase.steps[index];

  function move(next: number) {
    setIndex(Math.min(total - 1, Math.max(0, next)));
  }

  return (
    <div className="case-demo">
      <ol
        className="case-steps"
        aria-label={demoCase.title}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            move(index + 1);
          }
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(index - 1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            move(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            move(total - 1);
          }
        }}
      >
        {demoCase.steps.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              className="case-step"
              type="button"
              aria-current={itemIndex === index ? "step" : undefined}
              onClick={() => move(itemIndex)}
            >
              <strong>
                {itemIndex + 1}. {item.title}
              </strong>
              <span>{item.body}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="case-scene" aria-live="polite">
        <p className="case-kicker">
          {demoCase.client} · {demoCase.caseId} · {demoCase.type}
        </p>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <p>{step.change}</p>
        {step.id === "documents" ? (
          <ul className="plain-list">
            {demoCase.documents.map((document) => (
              <li key={document}>{document}</li>
            ))}
          </ul>
        ) : null}
        {step.id === "tasks" ? <p>{demoCase.manager}</p> : null}
        <p className="case-kicker">
          Step {index + 1} of {total}
        </p>
        <div className="case-controls">
          <Button variant="outline" type="button" onClick={() => move(index - 1)} disabled={index === 0}>
            {demoCase.actions.previous}
          </Button>
          <Button variant="outline" type="button" onClick={() => move(index + 1)} disabled={index === total - 1}>
            {demoCase.actions.next}
          </Button>
          <Button variant="outline" type="button" onClick={() => move(0)}>
            {demoCase.actions.restart}
          </Button>
        </div>
      </div>

      <p className="note">{demoCase.interactiveCaption}</p>
    </div>
  );
}
