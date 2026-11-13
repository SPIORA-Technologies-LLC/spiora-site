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
 * One screenshot per step of the interactive client case.
 * Steps that share a screenshot zoom into different parts of it, so moving
 * between them pans across the same screen.
 */
export const caseStepShots: Record<string, FocusedShot> = {
  invitation: { shot: "workspace" },
  questionnaire: { shot: "portal", focus: { x: 22, y: 92, zoom: 1.9 } },
  documents: { shot: "portal", focus: { x: 30, y: 52, zoom: 1.7 } },
  tasks: { shot: "tasks", focus: { x: 62, y: 78, zoom: 1.35 } },
  agreement: { shot: "finance", focus: { x: 64, y: 68, zoom: 1.6 } },
  payment: { shot: "finance", focus: { x: 72, y: 34, zoom: 1.7 } },
  portal: { shot: "portal" },
};

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
