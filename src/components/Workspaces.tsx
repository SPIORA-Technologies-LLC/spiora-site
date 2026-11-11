"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { demoCase } from "@/content/demo-case";

type View = "team" | "client";
type DocStatus = "uploaded" | "reviewed";

type WorkspacesProps = {
  teamTitle: string;
  team: string;
  clientTitle: string;
  client: string;
  teamView: string;
  clientView: string;
  caption: string;
};

export function Workspaces({
  teamTitle,
  team,
  clientTitle,
  client,
  teamView,
  clientView,
  caption,
}: WorkspacesProps) {
  const documents = demoCase.documents;
  const [view, setView] = useState<View>("team");
  const [enhanced, setEnhanced] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<readonly string[]>([]);
  const [lastMarked, setLastMarked] = useState<string | null>(null);
  const teamRef = useRef<HTMLButtonElement>(null);
  const clientRef = useRef<HTMLButtonElement>(null);
  const docRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setEnhanced(true);
  }, []);

  function statusOf(name: string): DocStatus {
    return reviewed.includes(name) ? "reviewed" : "uploaded";
  }

  function chooseView(next: View, focus = false) {
    setView(next);
    if (!focus) return;
    (next === "team" ? teamRef : clientRef).current?.focus();
  }

  function chooseDocument(name: string, focus = false) {
    setSelected(name);
    if (focus) docRefs.current[name]?.focus();
  }

  function markReviewed() {
    if (!selected || reviewed.includes(selected)) return;
    setReviewed((current) => [...current, selected]);
    setLastMarked(selected);
  }

  const allReviewed = documents.every((name) => reviewed.includes(name));
  const nextAction = allReviewed ? demoCase.portal.reviewed.next : demoCase.portal.uploaded.next;

  return (
    <div className={enhanced ? `spaces-demo is-enhanced is-${view}` : "spaces-demo"}>
      <div
        className="spaces-switch"
        role="radiogroup"
        aria-label={`${teamView} / ${clientView}`}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            chooseView("client", true);
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            chooseView("team", true);
          }
        }}
      >
        <button
          ref={teamRef}
          className={view === "team" ? "btn btn-primary" : "btn btn-outline"}
          type="button"
          role="radio"
          aria-checked={view === "team"}
          tabIndex={view === "team" ? 0 : -1}
          onClick={() => chooseView("team")}
        >
          {teamView}
        </button>
        <button
          ref={clientRef}
          className={view === "client" ? "btn btn-primary" : "btn btn-outline"}
          type="button"
          role="radio"
          aria-checked={view === "client"}
          tabIndex={view === "client" ? 0 : -1}
          onClick={() => chooseView("client")}
        >
          {clientView}
        </button>
      </div>

      <div className="spaces-panes">
        <article className="space-pane" data-pane="team">
          <h3>{teamTitle}</h3>
          <p>{team}</p>
          <p className="case-kicker">
            {demoCase.client} · {demoCase.caseId} · {demoCase.type}
          </p>
          <div
            className="space-docs"
            role="radiogroup"
            aria-label={demoCase.spaces.documentsLabel}
            onKeyDown={(event) => {
              const index = documents.findIndex((name) => name === selected);
              const last = documents.length - 1;
              let next = index;
              if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index < 0 ? 0 : Math.min(last, index + 1);
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index < 0 ? last : Math.max(0, index - 1);
              if (event.key === "Home") next = 0;
              if (event.key === "End") next = last;
              if (next === index && event.key !== "Home" && event.key !== "End") return;
              if (next < 0) return;
              event.preventDefault();
              const name = documents[next];
              if (name) chooseDocument(name, true);
            }}
          >
            {documents.map((name) => {
              const checked = selected === name;
              return (
                <button
                  key={name}
                  ref={(node) => {
                    docRefs.current[name] = node;
                  }}
                  type="button"
                  role="radio"
                  className="space-doc"
                  aria-checked={checked}
                  tabIndex={checked || (selected === null && name === documents[0]) ? 0 : -1}
                  onClick={() => chooseDocument(name)}
                >
                  <span>{name}</span>
                  <strong className="case-status">{demoCase.statuses[statusOf(name)]}</strong>
                </button>
              );
            })}
          </div>
          <div className="case-controls">
            <Button type="button" onClick={markReviewed} disabled={!selected || reviewed.includes(selected)}>
              {demoCase.actions.markReviewed}
            </Button>
          </div>
          <div className="space-private">
            <h4>{demoCase.spaces.teamOnly}</h4>
            <p>
              <span className="case-kicker">{demoCase.spaces.internalCommentLabel}</span>
              <br />
              {demoCase.spaces.internalComment}
            </p>
            <p>
              <span className="case-kicker">{demoCase.spaces.managerNoteLabel}</span>
              <br />
              {demoCase.spaces.managerNote}
            </p>
            <p>
              <span className="case-kicker">{demoCase.spaces.financeLabel}</span>
              <br />
              {demoCase.spaces.finance}
            </p>
            <p>
              <span className="case-kicker">{demoCase.spaces.otherClientLabel}</span>
              <br />
              {demoCase.spaces.otherClient}
            </p>
          </div>
        </article>

        <article className="space-pane" data-pane="client">
          <h3>{clientTitle}</h3>
          <p>{client}</p>
          <p className="case-kicker">
            {demoCase.client} · {demoCase.caseId} · {demoCase.type}
          </p>
          <h4>{demoCase.spaces.clientOnly}</h4>
          <ul className="space-docs">
            {documents.map((name) => (
              <li key={name} className="space-doc">
                <span>{name}</span>
                <strong className={name === lastMarked ? "case-status is-synced" : "case-status"}>
                  {demoCase.statuses[statusOf(name)]}
                </strong>
              </li>
            ))}
          </ul>
          <p>Next action · {nextAction}</p>
        </article>
      </div>

      <p className="note" aria-live="polite">
        {lastMarked
          ? `Team action: ${demoCase.actions.markReviewed}. The client portal now shows ${demoCase.statuses.reviewed} for ${lastMarked}.`
          : ""}
      </p>
      <p className="note">{caption}</p>
      <p className="note">{demoCase.spaces.illustration}</p>
    </div>
  );
}
