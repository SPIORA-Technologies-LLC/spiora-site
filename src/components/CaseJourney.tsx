"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faCheck,
  faCircleNotch,
  faEnvelope,
  faFileLines,
  faFolderOpen,
  faGear,
  faHouse,
  faPhone,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { DemoForm } from "@/components/DemoForm";
import { copy } from "@/content/en";

const steps = ["invite", "collect", "track"] as const;
type Step = (typeof steps)[number];
type Phase = 0 | 1 | 2;

const stepIcons: Record<Step, IconDefinition> = {
  invite: faEnvelope,
  collect: faFileLines,
  track: faCheck,
};

const navIcons = [faHouse, faFolderOpen, faUsers, faFileLines, faChartColumn, faGear];
const totalDocs = copy.journey.docs.length + 1;

export function CaseJourney() {
  const [step, setStep] = useState<Step>("collect");
  const [phase, setPhase] = useState<Phase>(0);
  const [narrow, setNarrow] = useState(false);
  const played = useRef(false);
  const timers = useRef<number[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const startScenario = useCallback(() => {
    clearTimers();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(2);
      return;
    }
    setPhase(0);
    timers.current = [
      window.setTimeout(() => setPhase(1), 1200),
      window.setTimeout(() => setPhase(2), 3400),
    ];
  }, [clearTimers]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      played.current = true;
      setPhase(2);
    }
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (played.current || step !== "collect") return;
    const node = stageRef.current;
    if (!node) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;
        observer.disconnect();
        if (query.matches) setPhase(2);
        else startScenario();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [startScenario, step]);

  function select(next: Step) {
    if (next !== step) {
      if (step === "collect") {
        clearTimers();
        played.current = true;
        setPhase(2);
      }
      setStep(next);
    }
    if (narrow) {
      document.getElementById(`${baseId}-panel-${next}`)?.scrollIntoView({ block: "nearest" });
    }
  }

  function onTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (narrow) return;
    const key = event.key;
    if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") return;
    event.preventDefault();
    const nextIndex =
      key === "ArrowRight" ? (index + 1) % steps.length
      : key === "ArrowLeft" ? (index + steps.length - 1) % steps.length
      : key === "Home" ? 0
      : steps.length - 1;
    select(steps[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="journey" id="top" aria-labelledby="journey-title">
      <div className="container journey-wrap">
        <div className="journey-intro">
          <h1 id="journey-title">{copy.journey.title}</h1>
          <p className="lead">{copy.journey.lead}</p>
        </div>

        <div
          className="journey-tabs"
          role={narrow ? undefined : "tablist"}
          aria-label={narrow ? undefined : copy.journey.tabsLabel}
        >
          {steps.map((name, index) => {
            const selected = step === name;
            return (
              <button
                key={name}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`${baseId}-tab-${name}`}
                className={selected ? "journey-tab is-active" : "journey-tab"}
                type="button"
                role={narrow ? undefined : "tab"}
                aria-selected={narrow ? undefined : selected}
                aria-controls={narrow ? undefined : `${baseId}-panel-${name}`}
                tabIndex={narrow || selected ? 0 : -1}
                onClick={() => select(name)}
                onKeyDown={(event) => onTabKey(event, index)}
              >
                <span className="journey-orb" aria-hidden="true">
                  <FontAwesomeIcon icon={stepIcons[name]} />
                </span>
                {copy.journey.steps[name]}
              </button>
            );
          })}
        </div>

        <div className="journey-stage">
          <div
            className="journey-panel"
            role={narrow ? "region" : "tabpanel"}
            id={`${baseId}-panel-invite`}
            aria-labelledby={`${baseId}-tab-invite`}
            hidden={!narrow && step !== "invite"}
          >
            {narrow ? <StepLabel name="invite" caption={copy.journey.captions.invite} /> : null}
            <InviteView />
          </div>
          <div
            className="journey-panel"
            role={narrow ? "region" : "tabpanel"}
            id={`${baseId}-panel-collect`}
            aria-labelledby={`${baseId}-tab-collect`}
            hidden={!narrow && step !== "collect"}
            ref={stageRef}
          >
            {narrow ? <StepLabel name="collect" caption={copy.journey.captions.collect} /> : null}
            <CollectView phase={phase} onReplay={startScenario} />
          </div>
          <div
            className="journey-panel"
            role={narrow ? "region" : "tabpanel"}
            id={`${baseId}-panel-track`}
            aria-labelledby={`${baseId}-tab-track`}
            hidden={!narrow && step !== "track"}
          >
            {narrow ? <StepLabel name="track" caption={copy.journey.captions.track} /> : null}
            <TrackView />
          </div>
        </div>
        {narrow ? null : <p className="journey-caption">{copy.journey.captions[step]}</p>}

        <div className="journey-ask">
          <section className="journey-card" id="contacts" aria-labelledby="contacts-title">
            <h2 id="contacts-title">{copy.journey.talkTitle}</h2>
            <p className="lead">{copy.journey.talkBody}</p>
            <div className="journey-contacts">
              <a href={`mailto:${copy.contacts.email}`}>
                <FontAwesomeIcon icon={faEnvelope} />
                {copy.contacts.email}
              </a>
              <a href={copy.contacts.phoneHref}>
                <FontAwesomeIcon icon={faPhone} />
                {copy.contacts.phone}
              </a>
            </div>
            <p className="journey-address">
              {copy.contacts.company}
              <br />
              {copy.contacts.street}, {copy.contacts.city}
              <br />
              {copy.contacts.channels}
            </p>
          </section>
          <section className="journey-card" id="demo" aria-labelledby="demo-title">
            <h2 id="demo-title">{copy.nav.demo}</h2>
            <div className="journey-form">
              <DemoForm />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function StepLabel({ name, caption }: { name: Step; caption: string }) {
  return (
    <div className="journey-step-label">
      <span className="journey-orb" aria-hidden="true">
        <FontAwesomeIcon icon={stepIcons[name]} />
      </span>
      <span>
        <strong>{copy.journey.steps[name]}</strong>
        <p>{caption}</p>
      </span>
    </div>
  );
}

function DemoNav() {
  return (
    <ul className="demo-nav" aria-hidden="true">
      {copy.journey.nav.map((label, index) => (
        <li key={label} className={index === 1 ? "is-current" : undefined}>
          <FontAwesomeIcon icon={navIcons[index]} />
          {label}
        </li>
      ))}
    </ul>
  );
}

function CaseHeading() {
  return (
    <header className="demo-case">
      <p className="demo-crumb">
        {copy.journey.caseId} — {copy.journey.caseName}
      </p>
      <h3>{copy.journey.client}</h3>
    </header>
  );
}

function ProgressCard({ collected }: { collected: number }) {
  const percent = Math.round((collected / totalDocs) * 100);
  return (
    <div className="demo-progress">
      <div className="demo-progress-head">
        <span>{copy.journey.progress}</span>
        <strong>{percent}%</strong>
      </div>
      <div
        className="demo-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={copy.journey.progress}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      <p>
        {collected} of {totalDocs} {copy.journey.collectedCount}
      </p>
      <h4>{copy.journey.dates}</h4>
      <p>
        <span>{copy.journey.target}</span>
        {copy.journey.targetDate}
      </p>
      <p>
        <span>{copy.journey.decision}</span>
        {copy.journey.decisionDate}
      </p>
    </div>
  );
}

function InviteView() {
  return (
    <div className="demo-app">
      <DemoNav />
      <div className="demo-main">
        <CaseHeading />
        <div className="demo-note">
          <h3>{copy.journey.inviteTitle}</h3>
          <p>{copy.journey.inviteBody}</p>
        </div>
      </div>
      <aside className="demo-aside">
        <p>{copy.journey.inviteAside}</p>
      </aside>
    </div>
  );
}

function CollectView({ phase, onReplay }: { phase: Phase; onReplay: () => void }) {
  const passportStatus = phase === 2 ? copy.journey.received : phase === 1 ? copy.journey.uploading : copy.journey.awaiting;
  const portalStatus = phase === 2 ? copy.journey.uploaded : phase === 1 ? copy.journey.uploading : copy.journey.upload;

  return (
    <div className="demo-app demo-app-collect">
      <DemoNav />
      <div className="demo-main">
        <CaseHeading />
        <div className="demo-collect">
          <div>
            <div className="demo-collect-head">
              <h3>{copy.journey.collectTitle}</h3>
              <p>{copy.journey.collectHint}</p>
            </div>
            <ul className="demo-docs">
              <li className={phase === 2 ? "is-received" : undefined}>
                <FontAwesomeIcon icon={phase === 2 ? faCheck : faFileLines} />
                <span>Passport.pdf</span>
                <em>{passportStatus}</em>
              </li>
              {copy.journey.docs.map((doc) => (
                <li key={doc.name} className={doc.status === "Collected" ? "is-done" : undefined}>
                  <FontAwesomeIcon icon={doc.status === "Collected" ? faCheck : faFileLines} />
                  <span>{doc.name}</span>
                  <em>{doc.status === "Collected" ? copy.journey.collected : copy.journey.requested}</em>
                </li>
              ))}
            </ul>
            <button className="btn btn-outline journey-replay" type="button" onClick={onReplay}>
              {copy.journey.replay}
            </button>
          </div>
          <div className="demo-portal" aria-live="polite">
            <p>{copy.journey.portalTitle}</p>
            <div className="demo-portal-status">
              {phase === 1 ? <FontAwesomeIcon className="demo-spin" icon={faCircleNotch} /> : null}
              {phase === 2 ? <FontAwesomeIcon icon={faCheck} /> : null}
              <strong>{phase === 0 ? portalStatus : "Passport.pdf"}</strong>
              {phase === 0 ? null : <em>{portalStatus}</em>}
            </div>
          </div>
        </div>
      </div>
      <aside className="demo-aside">
        <ProgressCard collected={phase === 2 ? 3 : 2} />
      </aside>
    </div>
  );
}

function TrackView() {
  return (
    <div className="demo-app">
      <DemoNav />
      <div className="demo-main">
        <CaseHeading />
        <div className="demo-track">
          <article>
            <p>{copy.journey.portalTitle}</p>
            <h3>{copy.journey.trackClient}</h3>
            <p>
              <span>{copy.journey.trackStage}</span>
              {copy.journey.trackStageValue}
            </p>
            <p>
              <span>{copy.journey.trackNext}</span>
              {copy.journey.trackNextValue}
            </p>
          </article>
          <article>
            <p>{copy.journey.trackTeam}</p>
            <h3>{copy.journey.caseName}</h3>
            <p>{copy.journey.trackTeamBody}</p>
          </article>
        </div>
      </div>
      <aside className="demo-aside">
        <ProgressCard collected={3} />
      </aside>
    </div>
  );
}
