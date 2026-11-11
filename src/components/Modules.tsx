"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { demoCase } from "@/content/demo-case";

type ModuleItem = {
  id: string;
  title: string;
  body: string;
};

type ModulesProps = {
  label: string;
  illustrative: string;
  items: readonly ModuleItem[];
  sampleLabel: string;
  sampleBody: string;
};

export function Modules({ label, illustrative, items, sampleLabel, sampleBody }: ModulesProps) {
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
                role="tabpanel"
                aria-labelledby={`module-tab-${item.id}`}
                hidden={enhanced && !isSelected}
              >
                <ModulePanel item={item} illustrative={illustrative} sampleLabel={sampleLabel} sampleBody={sampleBody} />
              </div>
            </div>
          );
        })}
      </div>
      <div id="module-stage" className="module-stage" role="tabpanel" aria-labelledby={`module-tab-${current.id}`}>
        <ModulePanel item={current} illustrative={illustrative} sampleLabel={sampleLabel} sampleBody={sampleBody} />
      </div>
    </div>
  );
}

function ModulePanel({
  item,
  illustrative,
  sampleLabel,
  sampleBody,
}: {
  item: ModuleItem;
  illustrative: string;
  sampleLabel: string;
  sampleBody: string;
}) {
  return (
    <>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <ModuleScene id={item.id} sampleLabel={sampleLabel} sampleBody={sampleBody} />
      <p className="scene-note">
        {illustrative} · {demoCase.caseId}
      </p>
    </>
  );
}

function ModuleScene({ id, sampleLabel, sampleBody }: { id: string; sampleLabel: string; sampleBody: string }) {
  if (id === "crm") {
    return (
      <div className="module-scene">
        <p className="case-kicker">{demoCase.client}</p>
        <p>
          {demoCase.caseId} · {demoCase.type}
        </p>
        <ul className="plain-list">
          {demoCase.documents.map((document) => (
            <li key={document}>{document}</li>
          ))}
        </ul>
        <p>Latest interaction · Invitation recorded on this client card. Sample.</p>
      </div>
    );
  }

  if (id === "tasks") {
    return (
      <div className="module-scene">
        <p>{demoCase.task.title}</p>
        <p>
          {demoCase.task.ownerLabel}: {demoCase.manager}
        </p>
        <p>Status · Open — sample</p>
        <p>Deadline · Sample date</p>
        <p>Comment · Review the uploaded sample files.</p>
        <p>File · {demoCase.documents[0]}</p>
      </div>
    );
  }

  if (id === "chat") {
    return (
      <div className="module-scene">
        <p className="case-kicker">
          {demoCase.caseId} · {demoCase.type}
        </p>
        <div className="module-row">
          <span>
            <strong>{demoCase.manager}</strong>
            <br />
            The identity document is ready for review. Sample message.
          </span>
        </div>
      </div>
    );
  }

  if (id === "calendar") {
    return (
      <div className="module-scene">
        <div className="module-row is-current">
          <span>
            {demoCase.task.title}
            <br />
            {demoCase.client} · {demoCase.caseId}
          </span>
        </div>
        <p>Shown on the shared calendar. Sample event.</p>
      </div>
    );
  }

  if (id === "finance") {
    return (
      <div className="module-scene">
        <p className="case-kicker">
          {demoCase.client} · {demoCase.caseId}
        </p>
        <p>{demoCase.agreement.title}</p>
        <p>{demoCase.payment.amount}</p>
        <p>{demoCase.payment.outstanding}</p>
        <p className="note">{demoCase.payment.note}</p>
      </div>
    );
  }

  if (id === "analytics") {
    return (
      <div className="module-scene">
        <div className="module-row is-current">
          <span>
            {demoCase.caseId} · {demoCase.client}
            <br />
            {demoCase.type}
          </span>
        </div>
        <div className="module-row">
          <span>Another case — sample</span>
        </div>
        <p>This overview highlights the selected case. Sample.</p>
      </div>
    );
  }

  if (id === "knowledge") {
    return (
      <div className="module-scene">
        <div className="module-row">
          <span>Residence application checklist — sample</span>
        </div>
        <p>A sample procedure linked to {demoCase.caseId}. It is not a published company document.</p>
      </div>
    );
  }

  if (id === "ai") {
    return (
      <div className="module-scene">
        <p className="case-kicker">{sampleLabel}</p>
        <p>{sampleBody}</p>
      </div>
    );
  }

  return (
    <div className="module-scene">
      <div className="module-row">
        <span>
          <strong>Team workspace</strong>
          <br />
          {demoCase.manager} sees the records for {demoCase.client} · {demoCase.caseId}. Sample.
        </span>
      </div>
      <div className="module-row">
        <span>
          <strong>Client portal</strong>
          <br />
          {demoCase.client} sees their own case and documents. Sample.
        </span>
      </div>
    </div>
  );
}
