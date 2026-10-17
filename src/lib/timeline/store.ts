import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { allEvents } from "./events";
import {
  clampYear,
  SPANS,
  CATEGORIES,
  type Category,
  type Reach,
  type TimelineEvent,
} from "./types";

export type Panels = { left: boolean; right: boolean; bottom: boolean };

type TimelineState = {
  year: number;
  setYear: (year: number) => void;
  nudgeYear: (delta: number) => void;
  checked: Record<string, boolean>;
  toggle: (id: string) => void;
  setMany: (ids: string[], on: boolean) => void;
  showAll: () => void;
  hideAll: () => void;
  panels: Panels;
  togglePanel: (key: keyof Panels) => void;
  closeSides: () => void;
  spanIndex: number;
  zoom: (direction: -1 | 1) => void;
  selectedId: string | null;
  focusNonce: number;
  select: (id: string | null, opts?: { fly?: boolean; year?: number }) => void;
  custom: TimelineEvent[];
  addCustom: (event: TimelineEvent) => void;
  removeCustom: (id: string) => void;
  pinArmed: boolean;
  setPinArmed: (armed: boolean) => void;
  pin: { lat: number; lon: number } | null;
  setPin: (pin: { lat: number; lon: number } | null) => void;
  frame: Frame;
  setFrame: (key: keyof Frame, value: number) => void;
};

export type Frame = { left: number; right: number; bottom: number };

export const FRAME_DEFAULT: Frame = { left: 352, right: 288, bottom: 216 };

const FRAME_LIMIT: Record<keyof Frame, [number, number]> = {
  left: [280, 640],
  right: [240, 480],
  bottom: [150, 520],
};

export function clampFrame(key: keyof Frame, value: number) {
  const [min, max] = FRAME_LIMIT[key];
  let cap = max;
  if (typeof window !== "undefined") {
    cap = key === "bottom" ? Math.min(max, window.innerHeight * 0.68) : Math.min(max, window.innerWidth * 0.48);
  }
  if (!Number.isFinite(value)) return FRAME_DEFAULT[key];
  return Math.round(Math.max(min, Math.min(value, cap)));
}

function initialPanels(): Panels {
  if (typeof window === "undefined") return { left: true, right: true, bottom: true };
  if (window.innerWidth < 900) return { left: false, right: false, bottom: true };
  return { left: true, right: true, bottom: true };
}

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((item) => item.id));
const LEGACY_CATEGORY: Record<string, Category> = {
  idea: "technology",
  discovery: "technology",
  invention: "technology",
  war: "politics",
  power: "politics",
};

function coerceReach(value: unknown): Reach {
  if (value === "place" || value === "region" || value === "world") return value;
  return "place";
}

function coerceCategory(value: unknown): Category {
  if (typeof value === "string" && CATEGORY_IDS.has(value)) return value as Category;
  if (typeof value === "string" && value in LEGACY_CATEGORY) return LEGACY_CATEGORY[value];
  return "politics";
}

function validEvent(value: unknown): value is TimelineEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as TimelineEvent;
  return (
    typeof event.id === "string" &&
    typeof event.title === "string" &&
    typeof event.start === "number" &&
    typeof event.end === "number" &&
    typeof event.lat === "number" &&
    typeof event.lon === "number"
  );
}

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useTimeline = create<TimelineState>()(
  persist(
    (set, get) => ({
      year: 1453,
      setYear: (year) => set({ year: clampYear(year) }),
      nudgeYear: (delta) => set({ year: clampYear(get().year + delta) }),
      checked: {},
      toggle: (id) => {
        const checked = { ...get().checked };
        checked[id] = checked[id] === false;
        set({ checked });
      },
      setMany: (ids, on) => {
        const checked = { ...get().checked };
        for (const id of ids) checked[id] = on;
        set({ checked });
      },
      showAll: () => set({ checked: {} }),
      hideAll: () => {
        const checked: Record<string, boolean> = {};
        for (const event of allEvents(get().custom)) checked[event.id] = false;
        set({ checked });
      },
      panels: initialPanels(),
      togglePanel: (key) => {
        const open = !get().panels[key];
        const panels = { ...get().panels, [key]: open };
        const narrow = typeof window !== "undefined" && window.innerWidth < 900;
        if (narrow && open && key === "left") panels.right = false;
        if (narrow && open && key === "right") panels.left = false;
        set({ panels });
      },
      closeSides: () => set({ panels: { ...get().panels, left: false, right: false } }),
      spanIndex: SPANS.indexOf(500),
      zoom: (direction) => {
        const next = get().spanIndex + direction;
        if (next < 0 || next >= SPANS.length) return;
        set({ spanIndex: next });
      },
      selectedId: null,
      focusNonce: 0,
      select: (id, opts) => {
        const events = allEvents(get().custom);
        const event = events.find((item) => item.id === id);
        let year = get().year;
        if (typeof opts?.year === "number") year = clampYear(opts.year);
        else if (event && (year < event.start || year > event.end)) year = clampYear(event.start);
        const fly = opts?.fly !== false && Boolean(id);
        set({
          selectedId: id,
          year,
          focusNonce: fly ? get().focusNonce + 1 : get().focusNonce,
        });
      },
      custom: [],
      addCustom: (event) => set({ custom: [...get().custom, event] }),
      removeCustom: (id) =>
        set({
          custom: get().custom.filter((event) => event.id !== id),
          selectedId: get().selectedId === id ? null : get().selectedId,
        }),
      pinArmed: false,
      setPinArmed: (armed) => set({ pinArmed: armed }),
      pin: null,
      setPin: (pin) => set({ pin }),
      frame: FRAME_DEFAULT,
      setFrame: (key, value) => set({ frame: { ...get().frame, [key]: clampFrame(key, value) } }),
    }),
    {
      name: "aera-ledger",
      version: 1,
      storage: createJSONStorage(() => (typeof window === "undefined" ? memoryStorage : localStorage)),
      partialize: (state) => ({
        year: state.year,
        checked: state.checked,
        custom: state.custom,
        spanIndex: state.spanIndex,
        frame: state.frame,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Partial<TimelineState> | undefined;
        if (!saved || typeof saved !== "object") return current;
        const spanIndex =
          typeof saved.spanIndex === "number"
            ? Math.max(0, Math.min(SPANS.length - 1, saved.spanIndex))
            : current.spanIndex;
        return {
          ...current,
          year: clampYear(typeof saved.year === "number" ? saved.year : current.year),
          checked: saved.checked && typeof saved.checked === "object" ? saved.checked : {},
          custom: Array.isArray(saved.custom)
            ? saved.custom.filter(validEvent).map((event) => ({
                ...event,
                category: coerceCategory(event.category),
                reach: coerceReach(event.reach),
              }))
            : [],
          spanIndex,
          frame: {
            left: clampFrame("left", saved.frame?.left ?? current.frame.left),
            right: clampFrame("right", saved.frame?.right ?? current.frame.right),
            bottom: clampFrame("bottom", saved.frame?.bottom ?? current.frame.bottom),
          },
        };
      },
    },
  ),
);

export type { Category };
