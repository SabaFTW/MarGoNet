import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { parseYear } from "@/lib/timeline/format";
import { useTimeline } from "@/lib/timeline/store";
import { clampYear, YEAR_MAX, YEAR_MIN } from "@/lib/timeline/types";
import { ResizeHandle, useNarrow } from "@/components/aera/ResizeHandle";

const ITEM = 40;
const COUNT = YEAR_MAX - YEAR_MIN + 1;

const JUMPS = [
  { label: "3500 BC", year: -3500 },
  { label: "0", year: 0 },
  { label: "1453", year: 1453 },
  { label: "1969", year: 1969 },
];

function rowLabel(year: number) {
  if (year === 0) return "0";
  if (year < 0) return `${Math.abs(year)} BC`;
  return `${year} AD`;
}

export function YearWheel({ arriving = false }: { arriving?: boolean }) {
  const open = useTimeline((state) => state.panels.right);
  const bottomOpen = useTimeline((state) => state.panels.bottom);
  const narrow = useNarrow();
  const year = useTimeline((state) => state.year);
  const setYear = useTimeline((state) => state.setYear);
  const togglePanel = useTimeline((state) => state.togglePanel);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const fromWheel = useRef(false);
  const [height, setHeight] = useState(320);
  const [scrollTop, setScrollTop] = useState((year - YEAR_MIN) * ITEM);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.clientHeight || 320);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (fromWheel.current) {
      fromWheel.current = false;
      return;
    }
    const top = (year - YEAR_MIN) * ITEM;
    el.scrollTo({ top });
    setScrollTop(top);
  }, [year, height, open]);

  const pad = Math.max(0, (height - ITEM) / 2);
  const first = Math.max(0, Math.floor(scrollTop / ITEM) - 8);
  const last = Math.min(COUNT - 1, Math.ceil((scrollTop + height) / ITEM) + 8);
  const center = scrollTop / ITEM;
  const rows = [];
  for (let index = first; index <= last; index += 1) {
    const value = YEAR_MIN + index;
    const dist = index - center;
    const prominent = Math.abs(dist) < 0.55;
    const century = value === 0 || value % 100 === 0;
    rows.push(
      <button
        key={value}
        type="button"
        className="absolute inset-x-0 flex items-center justify-center"
        style={{
          top: pad + index * ITEM,
          height: ITEM,
          opacity: Math.max(0.22, 1 - Math.abs(dist) * 0.2),
          transform: `perspective(420px) rotateX(${Math.max(-52, Math.min(52, -dist * 18))}deg) scale(${Math.max(0.78, 1 - Math.abs(dist) * 0.045)})`,
        }}
        onClick={() => setYear(value)}
      >
        <span
          className={
            prominent
              ? "font-display text-3xl text-fg"
              : century
                ? "text-sm text-fg"
                : "text-sm text-muted"
          }
        >
          {rowLabel(value)}
        </span>
      </button>,
    );
  }

  function publish(top: number) {
    setScrollTop(top);
    const next = clampYear(YEAR_MIN + Math.round(top / ITEM));
    if (next !== useTimeline.getState().year) {
      fromWheel.current = true;
      setYear(next);
    }
  }

  function snap() {
    const el = scrollerRef.current;
    if (!el) return;
    const snapped = Math.round(el.scrollTop / ITEM) * ITEM;
    if (Math.abs(el.scrollTop - snapped) < 0.5) return;
    el.scrollTo({ top: snapped, behavior: "smooth" });
  }

  function jump(raw: string) {
    const parsed = parseYear(raw);
    if (parsed === null) return;
    setYear(clampYear(parsed));
    setDraft("");
  }

  return (
    <aside
      className={`glass panel-top frame-right dock-anim absolute right-3 z-20 flex flex-col ${
        open ? "" : "dock-right-closed"
      } ${arriving && open ? "arrive-right" : ""} ${!narrow && bottomOpen ? "above-span" : "bottom-3"}`}
      inert={!open}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <p className="kicker">Every year</p>
          <h2 className="font-display text-3xl leading-none">Years</h2>
        </div>
        <button type="button" className="grid size-11 place-items-center text-muted" aria-label="Hide years" onClick={() => togglePanel("right")}>
          <X className="size-5" />
        </button>
      </div>

      <form
        className="px-4"
        onSubmit={(event) => {
          event.preventDefault();
          jump(draft);
        }}
      >
        <input
          className="field"
          value={draft}
          placeholder="1453 or 500 BC"
          aria-label="Jump to a year"
          onChange={(event) => setDraft(event.target.value)}
        />
      </form>

      <div className="mt-2 flex gap-1 px-4">
        {JUMPS.map((jumpTo) => (
          <button
            key={jumpTo.label}
            type="button"
            className="h-8 flex-1 rounded-full text-xs text-muted hover:text-fg"
            onClick={() => setYear(jumpTo.year)}
          >
            {jumpTo.label}
          </button>
        ))}
      </div>

      <div className="relative mx-3 mt-2 mb-3 min-h-48 flex-1">
        <div className="pointer-events-none absolute inset-x-1 top-1/2 z-10 h-10 -translate-y-1/2 rounded-xl border border-brass/60 bg-fg/5" />
        <div
          ref={scrollerRef}
          className="year-mask scroll-thin h-full overflow-y-auto"
          aria-label="Years from 3500 BC through year 0 to 2026 AD"
          onScroll={(event) => publish(event.currentTarget.scrollTop)}
          onScrollEnd={snap}
        >
          <div className="relative" style={{ height: pad * 2 + COUNT * ITEM }}>
            {rows}
          </div>
        </div>
      </div>
      {open ? <ResizeHandle axis="right" /> : null}
    </aside>
  );
}
