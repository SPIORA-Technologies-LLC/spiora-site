import type { CSSProperties } from "react";
import type { DemoCaseCopy } from "@/content";

/**
 * A short looping "someone is using SPIORA" scene drawn over a journey
 * screenshot: a cursor flies in, clicks, and the result appears. Everything is
 * placed in percent of the screenshot, so it zooms together with it.
 * Positions were measured on the demo screens of each interface language.
 */

type Point = { x: number; y: number };
type Rect = Point & { w: number; h: number };

type Layout = {
  inviteButton: Point;
  questionnaireTab: Point;
  taskBadge: Rect;
  addPayment: Point;
};

const layouts: Record<"ru" | "en", Layout> = {
  ru: {
    inviteButton: { x: 90.9, y: 15.7 },
    questionnaireTab: { x: 31.8, y: 41.6 },
    taskBadge: { x: 58.4, y: 48.8, w: 8.6, h: 3 },
    addPayment: { x: 90.9, y: 86.6 },
  },
  en: {
    inviteButton: { x: 93, y: 15.7 },
    questionnaireTab: { x: 35.2, y: 41.4 },
    taskBadge: { x: 61.1, y: 48.9, w: 5.9, h: 2.9 },
    addPayment: { x: 92.1, y: 86.6 },
  },
};

const questionnaireRows = [67.3, 71.2, 75.1, 79.0, 82.9, 86.8, 90.8];

const at = (p: Point, extra?: CSSProperties): CSSProperties => ({ left: `${p.x}%`, top: `${p.y}%`, ...extra });
const box = (r: Rect, extra?: CSSProperties): CSSProperties => ({
  left: `${r.x}%`,
  top: `${r.y}%`,
  width: `${r.w}%`,
  height: `${r.h}%`,
  ...extra,
});

function Cursor({ to, from = { x: -9, y: 12 } }: { to: Point; from?: Point }) {
  const style = at(to, { "--from-x": `${from.x}cqw`, "--from-y": `${from.y}cqw` } as CSSProperties);
  return (
    <>
      <span className="js-ripple" style={at(to)} />
      <svg className="js-cursor" style={style} viewBox="0 0 16 22" aria-hidden="true">
        <path d="M1 1v17.5l4.6-4.3 3 6.8 3.1-1.4-3-6.6H15L1 1z" />
      </svg>
    </>
  );
}

function Check() {
  return (
    <svg className="js-check" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" />
      <path d="M4.5 8.3l2.3 2.2 4.7-4.9" />
    </svg>
  );
}

function Toast({ at: p, text, right, delay }: { at: Point; text: string; right?: boolean; delay?: number }) {
  const style: CSSProperties = {
    ...(right ? { right: `${100 - p.x}%`, top: `${p.y}%` } : at(p)),
    ...(delay ? { animationDelay: `${delay}s` } : null),
  };
  return (
    <span className="js-toast js-pop" style={style}>
      <Check />
      {text}
    </span>
  );
}

export function JourneyScene({ stepId, locale, motion }: { stepId: string; locale: string; motion: DemoCaseCopy["motion"] }) {
  const layout = layouts[locale === "ru" ? "ru" : "en"];

  switch (stepId) {
    case "invitation":
      return (
        <>
          <Cursor to={layout.inviteButton} from={{ x: -14, y: 14 }} />
          <Toast at={{ x: 96, y: 21 }} text={motion.inviteSent} right />
        </>
      );

    case "questionnaire":
      return (
        <>
          <Cursor to={layout.questionnaireTab} from={{ x: 10, y: 14 }} />
          {questionnaireRows.map((y, index) => (
            <span
              key={y}
              className="js-row"
              style={box({ x: 22.6, y: y - 1.6, w: 74.6, h: 3.2 }, { animationDelay: `${0.6 + index * 0.14}s` })}
            />
          ))}
          <Toast at={{ x: 60, y: 45 }} text={motion.questionnaireDone} delay={1.9} />
        </>
      );

    case "documents":
      return (
        <span className="js-upload js-pop-early" style={at({ x: 56, y: 76 })}>
          <span className="js-upload-file">
            <svg viewBox="0 0 16 20" aria-hidden="true">
              <path d="M2 1h8l5 5v13H2z" />
              <path d="M10 1v5h5" />
            </svg>
            {motion.uploadFile}
            <span className="js-upload-done">
              <Check />
              {motion.uploaded}
            </span>
          </span>
          <span className="js-upload-bar">
            <span />
          </span>
        </span>
      );

    case "tasks": {
      const badge = layout.taskBadge;
      return (
        <>
          <Cursor to={{ x: badge.x + badge.w / 2, y: badge.y + badge.h / 2 }} from={{ x: -12, y: 10 }} />
          <span className="js-badge js-pop" style={box(badge)}>
            {motion.inProgress}
          </span>
        </>
      );
    }

    case "agreement":
      return (
        <>
          <span className="js-frame js-pop-early" style={box({ x: 22.4, y: 52.5, w: 30, h: 22 })} />
          <Toast at={{ x: 54.5, y: 48 }} text={motion.agreementRecorded} />
        </>
      );

    case "payment":
      return (
        <>
          <Cursor to={layout.addPayment} from={{ x: -14, y: -6 }} />
          <span className="js-payment js-slide" style={box({ x: 23.2, y: 89.8, w: 73.7, h: 7.2 })}>
            <Check />
            {motion.paymentRow}
          </span>
        </>
      );

    case "portal":
      return (
        <>
          <span className="js-stage-done js-pop" style={at({ x: 37, y: 54.5 })}>
            <Check />
          </span>
          <span className="js-stage-ring" style={at({ x: 42.5, y: 54.5 })} />
          {/* Covers the screen's own "Now" under the previous stage once the marker moves on. */}
          <span className="js-stage-cover js-pop" style={box({ x: 35, y: 59.8, w: 4, h: 2.4 })} />
          <span className="js-stage-label js-pop" style={at({ x: 42.5, y: 59.8 })}>
            {motion.now}
          </span>
          <Toast at={{ x: 46, y: 64 }} text={motion.clientSees} />
        </>
      );

    default:
      return null;
  }
}
