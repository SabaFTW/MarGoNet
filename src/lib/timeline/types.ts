export const CATEGORIES = [
  { id: "technology", label: "Tehnologija", short: "Tehnologija", hint: "Izumi in kar so na novo razumeli" },
  { id: "politics", label: "Politika", short: "Politika", hint: "Vojne, države in zakoni" },
  { id: "industry", label: "Industrija in gospodarstvo", short: "Industrija", hint: "Trgovina, tovarne in denar" },
  { id: "religion", label: "Religija", short: "Religija", hint: "Vpliv na odločitve — in kje še danes" },
] as const;

export type Category = (typeof CATEGORIES)[number]["id"];

export type Reach = "place" | "region" | "world";

export type TimelineEvent = {
  id: string;
  title: string;
  category: Category;
  start: number;
  end: number;
  lat: number;
  lon: number;
  place: string;
  summary: string;
  reach?: Reach;
  custom?: boolean;
};

export const YEAR_MIN = -3500;
export const YEAR_MAX = 2026;

export const SPANS = [25, 50, 100, 250, 500, 1000, 2500, 5526] as const;

export function clampYear(year: number) {
  if (!Number.isFinite(year)) return 1453;
  return Math.max(YEAR_MIN, Math.min(YEAR_MAX, Math.round(year)));
}
