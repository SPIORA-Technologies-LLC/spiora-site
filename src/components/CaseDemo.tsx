"use client";

import { useRef, useState } from "react";
import { FocusShot } from "@/components/FocusShot";
import { JourneyScene } from "@/components/JourneyScene";
import type { DemoCaseCopy } from "@/content";
import { caseStepShot } from "@/content/shots";
import { useLocale } from "@/i18n/LocaleProvider";

export function CaseDemo({ demoCase }: { demoCase: DemoCaseCopy }) {
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const total = demoCase.steps.length;
  const step = demoCase.steps[index];
  const stepShot = caseStepShot(step.id, locale);

  function move(next: number, focus = false) {
    const clamped = Math.min(total - 1, Math.max(0, next));
    setIndex(clamped);
    if (focus) stepRefs.current[clamped]?.focus();
  }

  return (
    <div className="case-demo">
      <ol
        className="case-steps"
        aria-label={demoCase.title}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            move(index + 1, true);
          }
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(index - 1, true);
          }
          if (event.key === "Home") {
            event.preventDefault();
            move(0, true);
          }
          if (event.key === "End") {
            event.preventDefault();
            move(total - 1, true);
          }
        }}
      >
        {demoCase.steps.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              ref={(node) => {
                stepRefs.current[itemIndex] = node;
              }}
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

      <div className="case-scene">
        {stepShot ? (
          <FocusShot
            image={stepShot.image}
            alt={`${step.title}. ${step.body}`}
            crop={stepShot.crop}
            sizes="(min-width: 900px) 1100px, 200vw"
          >
            <JourneyScene key={step.id} stepId={step.id} locale={locale} motion={demoCase.motion} />
          </FocusShot>
        ) : null}
        <p key={step.id} className="case-scene-body" aria-live="polite">
          {step.body}
        </p>
      </div>

      <p className="note">{demoCase.interactiveCaption}</p>
    </div>
  );
}
