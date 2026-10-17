import { Minus, Plus, X } from "lucide-react";
import { useRef } from "react";
import { CATEGORIES } from "@/lib/timeline/types";
import { allEvents, isChecked } from "@/lib/timeline/events";
import { durationLabel, formatSpan, formatYearCompact, spanName, tickStep, viewWindow } from "@/lib/timeline/format";
import { CATEGORY_BAR, CATEGORY_DOT } from "@/lib/timeline/palette";
import { useTimeline } from "@/lib/timeline/store";
import { SPANS, clampYear, type TimelineEvent } from "@/lib/timeline/types";
import { ResizeHandle } from "@/components/aera/ResizeHandle";

function pack(events: TimelineEvent[]) {
  const sorted = [...events].sort((a, b) => a.start - b.start || a.end - b.end);
  const laneEnds: number[] = [];
  const placed: { event: TimelineEvent; lane: number }[] = [];
  for (const event of sorted) {
    let lane = laneEnds.findIndex((end) => end < event.start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(event.end);
    } else {
      laneEnds[lane] = event.end;
    }
    placed.push({ event, lane });
  }
  return { placed, lanes: Math.max(1, laneEnds.length) };
}

export function SpanBar({ arriving = false }: { arriving?: boolean }) {
  const open = useTimeline((state) => state.panels.bottom);
  const year = useTimeline((state) => state.year);
  const spanIndex = useTimeline((state) => state.spanIndex);
  const checked = useTimeline((state) => state.checked);
  const custom = useTimeline((state) => state.custom);
  const selectedId = useTimeline((state) => state.selectedId);
  const setYear = useTimeline((state) => state.setYear);
  const zoom = useTimeline((state) => state.zoom);
  const select = useTimeline((state) => state.select);
  const togglePanel = useTimeline((state) => state.togglePanel);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; year: number; moved: boolean } | null>(null);

  const span = SPANS[spanIndex] ?? 500;
  const windowed = viewWindow(year, span);
  const widthYears = windowed.end - windowed.start || 1;
  const play = ((year - windowed.start) / widthYears) * 100;
  const events = allEvents(custom).filter(
    (event) => isChecked(checked, event.id) && event.end >= windowed.start && event.start <= windowed.end,
  );
  const { placed, lanes } = pack(events);
  const step = tickStep(span);
  const ticks: number[] = [];
  const firstTick = Math.ceil(windowed.start / step) * step;
  for (let tick = firstTick; tick <= windowed.end; tick += step) ticks.push(tick);

  function yearAt(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return year;
    const t = (clientX - rect.left) / rect.width;
    return clampYear(Math.round(windowed.start + t * widthYears));
  }

  return (
    <section
      className={`glass span-panel frame-bottom dock-anim absolute right-3 bottom-3 left-3 z-20 flex flex-col px-4 pt-3 pb-3 ${
        open ? "" : "dock-bottom-closed"
      } ${arriving && open ? "arrive-bottom" : ""}`}
      inert={!open}
      aria-hidden={!open}
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0">
          <p className="kicker">{spanName(span)}</p>
          <h2 className="font-display text-2xl leading-none">Span</h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          {CATEGORIES.map((category) => (
            <span key={category.id} className="inline-flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${CATEGORY_DOT[category.id]}`} />
              {category.short}
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-fg disabled:opacity-30"
            aria-label="Wider span"
            disabled={spanIndex >= SPANS.length - 1}
            onClick={() => zoom(1)}
          >
            <Minus className="size-4" />
          </button>
          <span className="min-w-16 text-center text-sm tabular-nums">{span} yrs</span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-fg disabled:opacity-30"
            aria-label="Narrower span"
            disabled={spanIndex <= 0}
            onClick={() => zoom(-1)}
          >
            <Plus className="size-4" />
          </button>
          <button type="button" className="grid size-11 place-items-center text-muted" aria-label="Hide span" onClick={() => togglePanel("bottom")}>
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative mt-2 min-h-0 flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("[data-event]")) return;
          drag.current = { x: event.clientX, year, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const current = drag.current;
          if (!current) return;
          const dx = event.clientX - current.x;
          if (Math.abs(dx) > 3) current.moved = true;
          const rect = event.currentTarget.getBoundingClientRect();
          setYear(current.year - (dx / (rect.width || 1)) * span);
        }}
        onPointerUp={(event) => {
          const current = drag.current;
          drag.current = null;
          if (!current || current.moved) return;
          setYear(yearAt(event.clientX));
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-brass" style={{ left: `${play}%` }}>
          <span className="absolute -top-0.5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-brass" />
        </div>
        <div className="relative h-5">
          {ticks.map((tick) => (
            <span
              key={tick}
              className="absolute top-0 -translate-x-1/2 text-xs text-muted"
              style={{ left: `${((tick - windowed.start) / widthYears) * 100}%` }}
            >
              {formatYearCompact(tick)}
            </span>
          ))}
        </div>
        <div className="scroll-thin relative mt-1 h-[calc(100%-1.5rem)] overflow-y-auto">
          {placed.length === 0 ? (
            <p className="px-1 pt-2 text-sm text-muted">Tick events in the ledger. A war of a hundred years draws a bar that long.</p>
          ) : (
            <div className="relative" style={{ height: lanes * 30 }}>
              {placed.map(({ event, lane }) => {
                const left = ((event.start - windowed.start) / widthYears) * 100;
                const right = ((Math.max(event.end, event.start) - windowed.start) / widthYears) * 100;
                const clampedLeft = Math.max(0, Math.min(100, left));
                const clampedRight = Math.max(clampedLeft + 0.8, Math.min(100, Math.max(right, left + 0.8)));
                const barWidth = clampedRight - clampedLeft;
                return (
                  <button
                    key={event.id}
                    type="button"
                    data-event
                    title={`${event.title} · ${formatSpan(event.start, event.end)} · ${durationLabel(event)}`}
                    className={`span-event absolute flex h-6 items-center overflow-hidden rounded-full px-2 text-left ${CATEGORY_BAR[event.category]} ${
                      event.id === selectedId ? "ring-2 ring-fg" : ""
                    }`}
                    style={{ left: `${clampedLeft}%`, width: `${barWidth}%`, top: lane * 30 }}
                    onPointerDown={(pointer) => pointer.stopPropagation()}
                    onClick={(pointer) => {
                      pointer.stopPropagation();
                      const rect = trackRef.current?.getBoundingClientRect();
                      const t = rect ? (pointer.clientX - rect.left) / rect.width : 0;
                      const at = clampYear(Math.round(windowed.start + t * widthYears));
                      const within = Math.min(event.end, Math.max(event.start, at));
                      select(event.id, { year: within });
                    }}
                  >
                    {barWidth > 8 ? <span className="truncate text-xs font-medium">{event.title}</span> : null}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {open ? <ResizeHandle axis="bottom" /> : null}
    </section>
  );
}
