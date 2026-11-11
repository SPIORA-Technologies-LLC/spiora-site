"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { demoCase } from "@/content/demo-case";

type DocumentStatus = "requested" | "uploaded" | "reviewed";

const initialDocuments: DocumentStatus = "requested";

export function CaseDemo() {
  const [index, setIndex] = useState(0);
  const [invited, setInvited] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [documents, setDocuments] = useState<DocumentStatus>(initialDocuments);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const total = demoCase.steps.length;
  const step = demoCase.steps[index];

  function move(next: number, focus = false) {
    const clamped = Math.min(total - 1, Math.max(0, next));
    setIndex(clamped);
    if (focus) stepRefs.current[clamped]?.focus();
  }

  function restart() {
    setIndex(0);
    setInvited(false);
    setSubmitted(false);
    setDocuments(initialDocuments);
  }

  const documentLabel =
    documents === "reviewed"
      ? demoCase.statuses.reviewed
      : documents === "uploaded"
        ? demoCase.statuses.uploaded
        : demoCase.statuses.requested;

  const portal =
    documents === "reviewed"
      ? demoCase.portal.reviewed
      : documents === "uploaded"
        ? demoCase.portal.uploaded
        : submitted
          ? demoCase.portal.submitted
          : invited
            ? demoCase.portal.invited
            : demoCase.portal.closed;

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
        <div key={step.id} className="case-scene-body" aria-live="polite">
        <p className="case-progress">
          Step {index + 1} of {total}
        </p>
        <p className="case-kicker">
          {demoCase.client} · {demoCase.caseId} · {demoCase.type}
        </p>
        <h3>{step.title}</h3>
        <p>{step.body}</p>

        {step.id === "invitation" ? (
          <div className="case-record">
            <p>
              Client card · <strong className="case-status">{invited ? demoCase.statuses.inviteSent : demoCase.statuses.notSent}</strong>
            </p>
            {invited ? null : (
              <Button type="button" onClick={() => setInvited(true)}>
                {demoCase.actions.sendInvitation}
              </Button>
            )}
          </div>
        ) : null}

        {step.id === "questionnaire" ? (
          <div className="case-record">
            <p>
              Questionnaire ·{" "}
              <strong className="case-status">
                {submitted ? demoCase.statuses.submitted : demoCase.statuses.notSubmitted}
              </strong>
            </p>
            {submitted ? null : (
              <Button type="button" onClick={() => setSubmitted(true)}>
                {demoCase.actions.submitQuestionnaire}
              </Button>
            )}
          </div>
        ) : null}

        {step.id === "documents" ? (
          <div className="case-record">
            <ul className="plain-list">
              {demoCase.documents.map((document) => (
                <li key={document}>
                  {document} · <strong className="case-status">{documentLabel}</strong>
                </li>
              ))}
            </ul>
            <div className="case-controls">
              {documents === "requested" ? (
                <Button type="button" onClick={() => setDocuments("uploaded")}>
                  {demoCase.actions.uploadSample}
                </Button>
              ) : null}
              {documents === "uploaded" ? (
                <Button type="button" onClick={() => setDocuments("reviewed")}>
                  {demoCase.actions.markReviewed}
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}

        {step.id === "tasks" ? (
          <div className="case-record">
            <p>{demoCase.task.title}</p>
            <p>
              {demoCase.task.ownerLabel}: {demoCase.manager}
            </p>
          </div>
        ) : null}

        {step.id === "agreement" ? (
          <div className="case-record">
            <p>{demoCase.agreement.title}</p>
            <p className="case-status">{demoCase.agreement.status}</p>
            <p className="note">{demoCase.agreement.note}</p>
          </div>
        ) : null}

        {step.id === "payment" ? (
          <div className="case-record">
            <p>{demoCase.payment.title}</p>
            <p>{demoCase.payment.amount}</p>
            <p>{demoCase.payment.outstanding}</p>
            <p className="note">{demoCase.payment.note}</p>
          </div>
        ) : null}

        {step.id === "portal" ? (
          <div className="case-record">
            <p>
              Stage · <strong className="case-status">{portal.stage}</strong>
            </p>
            <p>Next action · {portal.next}</p>
          </div>
        ) : null}
        </div>

        <div className="case-controls">
          {index < total - 1 ? (
            <Button variant="outline" type="button" onClick={() => move(index + 1)}>
              {demoCase.actions.viewNextStep}
            </Button>
          ) : null}
          <Button variant="outline" type="button" onClick={() => move(index - 1)} disabled={index === 0}>
            {demoCase.actions.previous}
          </Button>
          <Button variant="outline" type="button" onClick={() => move(index + 1)} disabled={index === total - 1}>
            {demoCase.actions.next}
          </Button>
          <Button variant="outline" type="button" onClick={restart}>
            {demoCase.actions.restart}
          </Button>
        </div>
      </div>

      <p className="note">{demoCase.interactiveCaption}</p>
    </div>
  );
}
