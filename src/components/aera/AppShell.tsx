import { useEffect, useState } from "react";
import { PanelBottom, PanelLeft, PanelRight, X } from "lucide-react";
import { allEvents, findEvent, isChecked } from "@/lib/timeline/events";
import { meanwhile } from "@/lib/timeline/format";
import { useTimeline } from "@/lib/timeline/store";
import EarthScene from "@/components/globe/EarthScene";
import { LeftLedger } from "@/components/aera/LeftLedger";
import { FrameStyle } from "@/components/aera/ResizeHandle";
import { RollingYear } from "@/components/aera/RollingYear";
import { SpanBar } from "@/components/aera/SpanBar";
import { YearWheel } from "@/components/aera/YearWheel";
import { useLogistics } from "@/lib/logistics/store";
import { FlowPanel, PlanPanel, StockPanel } from "@/components/logistics/LogisticsPanels";
import { GridBottom, GridLeft, GridRight, MaterialBottom, MaterialLeft, MaterialRight } from "@/components/logistics/ExtraPanels";

export function AppShell() {
  const year = useTimeline((state) => state.year);
  const selectedId = useTimeline((state) => state.selectedId);
  const custom = useTimeline((state) => state.custom);
  const checked = useTimeline((state) => state.checked);
  const panels = useTimeline((state) => state.panels);
  const pinArmed = useTimeline((state) => state.pinArmed);
  const select = useTimeline((state) => state.select);
  const nudgeYear = useTimeline((state) => state.nudgeYear);
  const togglePanel = useTimeline((state) => state.togglePanel);
  const mode = useLogistics((state) => state.mode);
  const setMode = useLogistics((state) => state.setMode);
  const drift = useLogistics((state) => state.drift);
  const setDrift = useLogistics((state) => state.setDrift);
  const tabsOn = useLogistics((state) => state.tabsOn);
  const setTabsOn = useLogistics((state) => state.setTabsOn);
  const placing = useLogistics((state) => state.placing);
  const [arriving, setArriving] = useState(true);

  const selected = findEvent(custom, selectedId);
  const active = allEvents(custom).filter((event) => isChecked(checked, event.id));
  const line = meanwhile(year, active, selected);
  const era = year < 0 ? "BC" : year === 0 ? "BC · AD" : "AD";
  const bare = !panels.left && !panels.right && !panels.bottom;
  const spoken = year === 0 ? "year 0" : year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;

  useEffect(() => {
    const id = window.setTimeout(() => setArriving(false), 760);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nudgeYear(event.shiftKey ? 10 : 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        nudgeYear(event.shiftKey ? -10 : -1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        nudgeYear(10);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        nudgeYear(-10);
      } else if (event.key === "[") {
        togglePanel("left");
      } else if (event.key === "]") {
        togglePanel("right");
      } else if (event.key === "\\") {
        togglePanel("bottom");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nudgeYear, togglePanel]);

  return (
    <div className="sky relative h-dvh w-full overflow-hidden text-fg">
      <div className={`omen omen-hydra ${mode === "history" ? "omen-on" : ""}`} aria-hidden />
      <div className={`omen omen-baphomet ${mode === "logistics" ? "omen-on" : ""}`} aria-hidden />
      <div className={`omen omen-grid ${mode === "grid" ? "omen-on" : ""}`} aria-hidden />
      <div className={`omen omen-materials ${mode === "materials" ? "omen-on" : ""}`} aria-hidden />
      <div className="globe-root absolute inset-0">
        <EarthScene />
      </div>
      <div className="vignette pointer-events-none absolute inset-0" />
      <FrameStyle />

      <header className="chrome-rise pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-4 text-center">
        <p className="kicker">
          {mode === "history" ? "Earth timeline" : mode === "grid" ? "Electrogrid" : mode === "materials" ? "Raw material" : "MarGoNet"}
        </p>
        <h1 className="wordmark mt-1">AERA</h1>
        {tabsOn ? (
          <div className="mode-tabs mt-2" role="tablist" aria-label="Mode">
            {(
              [
                ["history", "History"],
                ["logistics", "Flow"],
                ["grid", "Grid"],
                ["materials", "Raw"],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)}>
                {label}
              </button>
            ))}
            <button type="button" className="mode-hide" onClick={() => setTabsOn(false)} aria-label="Hide modes">
              hide
            </button>
          </div>
        ) : (
          <button type="button" className="mode-peek pointer-events-auto mt-2" onClick={() => setTabsOn(true)}>
            modes
          </button>
        )}
        <button type="button" className={`drift-toggle pointer-events-auto ${drift ? "drift-on" : ""}`} onClick={() => setDrift(!drift)} aria-pressed={drift}>
          {drift ? "Drift on" : "Drift off"}
        </button>
        {mode === "history" ? (
          <>
            <div className="mt-2 flex items-end justify-center gap-3">
              <p className="year-display" aria-live="polite">
                <span className="sr-only">{spoken}</span>
                <RollingYear year={year} />
              </p>
              <span key={era} className="era era-swap">
                {era}
              </span>
            </div>
            <p className="kicker mt-2">{line.kicker}</p>
            <p className="lede clamp-3 mx-auto mt-1 max-w-xl text-pretty font-display text-base italic leading-snug text-fg/95">
              {line.body}
            </p>
            {selected ? (
              <button
                type="button"
                className="chip-pop pointer-events-auto mt-2 inline-flex items-center gap-1 text-xs text-muted"
                onClick={() => select(null, { fly: false })}
              >
                <X className="size-3.5" />
                Clear selection
              </button>
            ) : null}
          </>
        ) : (
          <p className="lede clamp-3 mx-auto mt-2 max-w-xl text-pretty font-display text-base italic leading-snug text-fg/95">
            {mode === "grid"
              ? "A plant keeps a halo. Mint is spare, gold is even, red is a city that eats more than it makes."
              : mode === "materials"
                ? "Forest becomes planks. A mine becomes bars. Sand becomes bags, then filters. Food stays on the other tab."
                : "One current, toward the sun. Technology is a link in the oath, not the top of it. A local no still closes the valve."}
          </p>
        )}
        {bare ? <p className="mt-2 text-xs text-muted">The ledger, the years, and the span are tucked away.</p> : null}
      </header>

      {placing ? (
        <p className="pin-banner pointer-events-none absolute top-44 z-30 rounded-full bg-brass px-4 py-2 text-sm text-bg">
          Click the Earth. This color bends toward the new point.
        </p>
      ) : pinArmed ? (
        <p className="pin-banner pointer-events-none absolute top-44 z-30 rounded-full bg-brass px-4 py-2 text-sm text-bg">
          Click the Earth to place this event
        </p>
      ) : null}

      {mode === "history" ? (
        <>
          <LeftLedger arriving={arriving} />
          <YearWheel arriving={arriving} />
          <SpanBar arriving={arriving} />
        </>
      ) : mode === "grid" ? (
        <>
          <GridLeft arriving={arriving} />
          <GridRight arriving={arriving} />
          <GridBottom arriving={arriving} />
        </>
      ) : mode === "materials" ? (
        <>
          <MaterialLeft arriving={arriving} />
          <MaterialRight arriving={arriving} />
          <MaterialBottom arriving={arriving} />
        </>
      ) : (
        <>
          <PlanPanel arriving={arriving} />
          <StockPanel arriving={arriving} />
          <FlowPanel arriving={arriving} />
        </>
      )}

      {!panels.left ? (
        <button
          type="button"
          className="glass edge-left absolute top-1/2 left-3 z-30 flex h-11 items-center gap-2 px-3 text-sm"
          onClick={() => togglePanel("left")}
        >
          <PanelLeft className="size-4" />
          {mode === "history" ? "Ledger" : mode === "grid" ? "Plants" : mode === "materials" ? "Raw" : "Plan"}
        </button>
      ) : null}
      {!panels.right ? (
        <button
          type="button"
          className="glass edge-right absolute top-1/2 right-3 z-30 flex h-11 items-center gap-2 px-3 text-sm"
          onClick={() => togglePanel("right")}
        >
          {mode === "history" ? "Years" : mode === "grid" ? "Balance" : mode === "materials" ? "Places" : "Stocks"}
          <PanelRight className="size-4" />
        </button>
      ) : null}
      {!panels.bottom ? (
        <button
          type="button"
          className="glass edge-bottom absolute bottom-3 left-1/2 z-30 flex h-11 items-center gap-2 px-4 text-sm"
          onClick={() => togglePanel("bottom")}
        >
          <PanelBottom className="size-4" />
          {mode === "history" ? "Span" : mode === "grid" ? "Cables" : mode === "materials" ? "Chains" : "Flow"}
        </button>
      ) : null}
    </div>
  );
}
