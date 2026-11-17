// Product screenshots on synthetic demo data, shared by both languages.
// Alt text lives in each locale's site copy under `shotAlts`.

export type ShotKey =
  | "workspace"
  | "portal"
  | "tasks"
  | "finance"
  | "team"
  | "calendar"
  | "analytics"
  | "library"
  | "ai";

export type ShotImage = { src: string; width: number; height: number };

export const shots: Record<ShotKey, ShotImage> = {
  workspace: { src: "/shots/team-workspace.png", width: 1024, height: 556 },
  portal: { src: "/shots/client-portal.png", width: 1368, height: 744 },
  tasks: { src: "/shots/team-tasks.png", width: 1368, height: 744 },
  finance: { src: "/shots/finance.png", width: 1368, height: 744 },
  team: { src: "/shots/team-members.png", width: 1368, height: 744 },
  calendar: { src: "/shots/calendar.png", width: 1368, height: 744 },
  analytics: { src: "/shots/analytics.png", width: 1368, height: 744 },
  library: { src: "/shots/library.png", width: 1368, height: 744 },
  ai: { src: "/shots/ai-workspace.png", width: 1368, height: 744 },
};

/** Zoom into part of a screenshot: x/y in percent, zoom as a scale factor. */
export type ShotFocus = { x: number; y: number; zoom: number };

export type FocusedShot = { shot: ShotKey; focus?: ShotFocus };

/**
 * One screen of the SPIORA demo per step of the client journey, shot in both
 * interface languages (public/shots/journey/<locale>/). Contacts and file names
 * on the shots are replaced with invented ones. Steps that share a screen
 * zoom into different parts of it, so moving between them pans across it.
 */
type JourneyShot = { file: string; focus?: ShotFocus };

const journey: Record<string, JourneyShot> = {
  invitation: { file: "invitation", focus: { x: 75, y: 40, zoom: 1.15 } },
  questionnaire: { file: "questionnaire", focus: { x: 60, y: 70, zoom: 1.3 } },
  documents: { file: "documents", focus: { x: 60, y: 62, zoom: 1.3 } },
  tasks: { file: "tasks", focus: { x: 60, y: 45, zoom: 1.25 } },
  agreement: { file: "agreement", focus: { x: 38, y: 60, zoom: 1.7 } },
  payment: { file: "agreement", focus: { x: 85, y: 90, zoom: 1.35 } },
  portal: { file: "portal", focus: { x: 35, y: 55, zoom: 1.7 } },
};

export function caseStepShot(stepId: string, locale: string): { image: ShotImage; focus?: ShotFocus } | null {
  const entry = journey[stepId];
  if (!entry) return null;
  const folder = locale === "ru" ? "ru" : "en";
  return {
    image: { src: `/shots/journey/${folder}/${entry.file}.webp`, width: 2400, height: 1500 },
    focus: entry.focus,
  };
}

export const moduleShots: Record<string, ShotKey> = {
  crm: "workspace",
  tasks: "tasks",
  chat: "team",
  calendar: "calendar",
  finance: "finance",
  analytics: "analytics",
  knowledge: "library",
  ai: "ai",
  roles: "portal",
};
