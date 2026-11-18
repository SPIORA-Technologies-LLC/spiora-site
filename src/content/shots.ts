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
  workspace: { src: "/shots/team-workspace.png", width: 980, height: 502 },
  portal: { src: "/shots/client-portal.png", width: 1312, height: 678 },
  tasks: { src: "/shots/team-tasks.png", width: 1312, height: 678 },
  finance: { src: "/shots/finance.png", width: 1312, height: 678 },
  team: { src: "/shots/team-members.png", width: 1312, height: 678 },
  calendar: { src: "/shots/calendar.png", width: 1312, height: 678 },
  analytics: { src: "/shots/analytics.png", width: 1312, height: 678 },
  library: { src: "/shots/library.png", width: 1312, height: 678 },
  ai: { src: "/shots/ai-workspace.png", width: 1312, height: 678 },
};

/** A section of a screenshot, in percent of its width and height. */
export type ShotCrop = { x: number; y: number; w: number; h: number };

/**
 * One screen of the SPIORA demo per step of the client journey, shot in both
 * interface languages (public/shots/journey/<locale>/). Contacts and file names
 * on the shots are replaced with invented ones. Each step shows only its own
 * section of the screen, without the app's sidebar and header.
 */
type JourneyShot = { file: string; crop: ShotCrop };

const settlements: ShotCrop = { x: 21, y: 38.7, w: 78, h: 58.5 };

const journey: Record<string, JourneyShot> = {
  invitation: { file: "invitation", crop: { x: 21, y: 10.9, w: 77.8, h: 83 } },
  questionnaire: { file: "questionnaire", crop: { x: 21, y: 38.7, w: 78, h: 58 } },
  documents: { file: "documents", crop: { x: 21, y: 38.7, w: 78, h: 55.8 } },
  tasks: { file: "tasks", crop: { x: 21, y: 10.4, w: 78, h: 54.5 } },
  agreement: { file: "agreement", crop: settlements },
  payment: { file: "agreement", crop: settlements },
  portal: { file: "portal", crop: { x: 21.4, y: 44.6, w: 48.4, h: 21.2 } },
};

export function caseStepShot(stepId: string, locale: string): { image: ShotImage; crop: ShotCrop } | null {
  const entry = journey[stepId];
  if (!entry) return null;
  const folder = locale === "ru" ? "ru" : "en";
  return {
    image: { src: `/shots/journey/${folder}/${entry.file}.webp`, width: 2400, height: 1500 },
    crop: entry.crop,
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
