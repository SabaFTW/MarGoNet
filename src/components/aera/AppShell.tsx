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
import { useLogistics, type LayerId } from "@/lib/logistics/store";
import { FlowPanel, PlanPanel, StockPanel } from "@/components/logistics/LogisticsPanels";
import { AnimalBottom, AnimalLeft, AnimalRight, DataBottom, DataLeft, DataRight, GridBottom, GridLeft, GridRight, MaterialBottom, MaterialLeft, MaterialRight, StackBottom, WasteBottom, WasteLeft, WasteRight } from "@/components/logistics/ExtraPanels";

const MODES = [
  { id: "history", label: "History", color: "#c4a574" },
  { id: "logistics", label: "Flow", color: "#d4a35c" },
  { id: "grid", label: "Grid", color: "#6aafa6" },
  { id: "materials", label: "Raw", color: "#c4a574" },
  { id: "waste", label: "Waste", color: "#c46a58" },
  { id: "animal", label: "Animals", color: "#a394c9" },
  { id: "data", label: "Data", color: "#8aa0ae" },
] as const;

const KICKER: Record<(typeof MODES)[number]["id"], string> = {
  history: "Earth timeline",
  logistics: "Flow",
  grid: "Electrogrid",
  materials: "Raw material",
  waste: "Waste",
  animal: "Animals",
  data: "Data",
};

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
  const layers = useLogistics((state) => state.layers);
  const drift = useLogistics((state) => state.drift);
  const setDrift = useLogistics((state) => state.setDrift);
  const tabsOn = useLogistics((state) => state.tabsOn);
  const setTabsOn = useLogistics((state) => state.setTabsOn);
  const placing = useLogistics((state) => state.placing);
  const [arriving, setArriving] = useState(true);
  const [entered, setEntered] = useState(false);

  const selected = findEvent(custom, selectedId);
  const active = allEvents(custom).filter((event) => isChecked(checked, event.id));
  const line = meanwhile(year, active, selected);
  const era = year < 0 ? "BC" : year === 0 ? "BC · AD" : "AD";
  const spoken = year === 0 ? "year 0" : year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;
  const live = MODES.filter((item) => item.id !== "history" && layers[item.id as LayerId]);
  const stacked = mode !== "history" && live.length > 1;
  const kicker = mode === "history" ? KICKER.history : live.map((item) => item.label).join(" · ");

  useEffect(() => {
    const state = useLogistics.getState();
    if (state.mode !== "history" && state.layers && !Object.values(state.layers).some(Boolean)) {
      useLogistics.setState({ layers: { ...state.layers, [state.mode]: true } });
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setArriving(false), 760);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!tabsOn) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".mode-row, .wordmark")) return;
      setTabsOn(false);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [setTabsOn, tabsOn]);

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
      <div className={`omen omen-hydra ${!entered || mode === "history" ? "omen-on" : ""}`} aria-hidden />
      <div className={`omen omen-baphomet ${entered && mode === "logistics" ? "omen-on" : ""}`} aria-hidden />
      {entered ? (
        <div className="globe-root globe-in absolute inset-0">
          <EarthScene />
        </div>
      ) : null}
      <div className="vignette pointer-events-none absolute inset-0" />
      <FrameStyle />

      {!entered ? (
        <section className="gate">
          <div className="gate-card">
            <p className="kicker">Before the earth</p>
            <h1 className="wordmark mt-3">AERA</h1>
            <p className="lede mx-auto mt-6 max-w-xl font-display text-2xl italic leading-snug text-fg/95">{line.body}</p>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted">{line.kicker}</p>
            <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm text-muted">
              <li>Flow keeps one current toward the sun. Cargo also ends in Asia, Africa and the Americas.</li>
              <li>Grid paints a halo: mint is spare, gold is even, red is hungry.</li>
              <li>Raw is the rest. Forest to planks, mine to bars, sand to bags.</li>
              <li>Waste stays in the city. Food is the largest thing a household throws away.</li>
              <li>Animals move as meat and fish. China eats its own pigs.</li>
              <li>Data stays in the building. Only the light in the glass moves.</li>
            </ul>
            <button type="button" className="gate-enter" onClick={() => setEntered(true)}>
              Open the earth
            </button>
          </div>
        </section>
      ) : null}

      <header className={`chrome-rise pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-4 text-center ${entered ? "" : "invisible"}`}>
        <p className="kicker">
          {kicker}
        </p>
        <h1 className="mt-1">
          <button type="button" className="wordmark pointer-events-auto" aria-expanded={tabsOn} onClick={() => setTabsOn(!tabsOn)}>
            AERA
          </button>
        </h1>
        <div className={`mode-row pointer-events-auto ${tabsOn ? "mode-row-open" : ""}`} role="tablist" aria-label="Mode" aria-hidden={!tabsOn}>
          <button
            type="button"
            className={`era-switch ${mode === "history" ? "" : "era-on"}`}
            role="switch"
            aria-checked={mode !== "history"}
            aria-label={mode === "history" ? "History on. Switch to Flow." : "Flow on. Switch to History."}
            onClick={() => setMode(mode === "history" ? "logistics" : "history")}
          >
            <span className="era-knob" />
            <span className="era-label era-history">History</span>
            <span className="era-label era-flow">Flow</span>
          </button>
          {MODES.filter((item) => item.id !== "history" && item.id !== "logistics").map((item) => {
            const locked = mode === "history";
            const on = !locked && layers[item.id as LayerId];
            return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-disabled={locked}
              className={locked ? "mode-locked" : ""}
              onClick={() => setMode(item.id)}
            >
              <span
                className="mode-pip"
                style={on ? { background: item.color, borderColor: item.color, boxShadow: `0 0 12px ${item.color}` } : undefined}
              />
              {item.label}
            </button>
            );
          })}
          <button type="button" className={drift ? "drift-on" : ""} aria-pressed={drift} onClick={() => setDrift(!drift)}>
            <span className="mode-pip" style={drift ? { background: "#c4a574", borderColor: "#c4a574" } : undefined} />
            Drift
          </button>
        </div>
        {mode === "history" ? (
          <div className="mt-3 flex items-end justify-center gap-3">
            <p className="year-display" aria-live="polite">
              <span className="sr-only">{spoken}</span>
              <RollingYear year={year} />
            </p>
            <span key={era} className="era era-swap">
              {era}
            </span>
          </div>
        ) : null}
        {selected && mode === "history" ? (
          <button
            type="button"
            className="chip-pop pointer-events-auto mt-2 inline-flex items-center gap-1 text-xs text-muted"
            onClick={() => select(null, { fly: false })}
          >
            <X className="size-3.5" />
            Clear selection
          </button>
        ) : null}
      </header>

      {entered && placing ? (
        <p className="pin-banner pointer-events-none absolute top-44 z-30 rounded-full bg-brass px-4 py-2 text-sm text-bg">
          Click the Earth. This color bends toward the new point.
        </p>
      ) : entered && pinArmed ? (
        <p className="pin-banner pointer-events-none absolute top-44 z-30 rounded-full bg-brass px-4 py-2 text-sm text-bg">
          Click the Earth to place this event
        </p>
      ) : null}

      {!entered ? null : mode === "history" ? (
        <>
          <LeftLedger arriving={arriving} />
          <YearWheel arriving={arriving} />
          <SpanBar arriving={arriving} />
        </>
      ) : entered && mode === "grid" ? (
        <>
          <GridLeft arriving={arriving} />
          <GridRight arriving={arriving} />
          {stacked ? <StackBottom arriving={arriving} /> : <GridBottom arriving={arriving} />}
        </>
      ) : entered && mode === "materials" ? (
        <>
          <MaterialLeft arriving={arriving} />
          <MaterialRight arriving={arriving} />
          {stacked ? <StackBottom arriving={arriving} /> : <MaterialBottom arriving={arriving} />}
        </>
      ) : entered && mode === "waste" ? (
        <>
          <WasteLeft arriving={arriving} />
          <WasteRight arriving={arriving} />
          {stacked ? <StackBottom arriving={arriving} /> : <WasteBottom arriving={arriving} />}
        </>
      ) : entered && mode === "animal" ? (
        <>
          <AnimalLeft arriving={arriving} />
          <AnimalRight arriving={arriving} />
          {stacked ? <StackBottom arriving={arriving} /> : <AnimalBottom arriving={arriving} />}
        </>
      ) : entered && mode === "data" ? (
        <>
          <DataLeft arriving={arriving} />
          <DataRight arriving={arriving} />
          {stacked ? <StackBottom arriving={arriving} /> : <DataBottom arriving={arriving} />}
        </>
      ) : (
        <>
          <PlanPanel arriving={arriving} />
          <StockPanel arriving={arriving} />
          {stacked ? <StackBottom arriving={arriving} /> : <FlowPanel arriving={arriving} />}
        </>
      )}

      {!entered ? null : !panels.left ? (
        <button
          type="button"
          className="glass edge-left absolute top-1/2 left-3 z-30 flex h-11 items-center gap-2 px-3 text-sm"
          onClick={() => togglePanel("left")}
        >
          <PanelLeft className="size-4" />
          {mode === "history" ? "Ledger" : mode === "grid" ? "Plants" : mode === "materials" ? "Raw" : mode === "waste" ? "Bins" : mode === "animal" ? "Herds" : mode === "data" ? "Halls" : "Plan"}
        </button>
      ) : null}
      {entered && !panels.right ? (
        <button
          type="button"
          className="glass edge-right absolute top-1/2 right-3 z-30 flex h-11 items-center gap-2 px-3 text-sm"
          onClick={() => togglePanel("right")}
        >
          {mode === "history" ? "Years" : mode === "grid" ? "Load" : mode === "materials" ? "Places" : mode === "waste" ? "Cities" : mode === "animal" ? "Places" : mode === "data" ? "Rooms" : "Stocks"}
          <PanelRight className="size-4" />
        </button>
      ) : null}
      {entered && !panels.bottom ? (
        <button
          type="button"
          className="glass edge-bottom absolute bottom-3 left-1/2 z-30 flex h-11 items-center gap-2 px-4 text-sm"
          onClick={() => togglePanel("bottom")}
        >
          <PanelBottom className="size-4" />
          {mode === "history" ? "Span" : stacked ? "Stack" : mode === "grid" ? "Cables" : mode === "materials" ? "Chains" : mode === "waste" ? "Moved" : mode === "animal" ? "Lanes" : mode === "data" ? "Glass" : "Flow"}
        </button>
      ) : null}
    </div>
  );
}
