import type { ReactNode } from "react";
import { X } from "lucide-react";
import { ResizeHandle, useNarrow } from "@/components/aera/ResizeHandle";
import { CHAINS, PLANTS, WIRES, arrivingGw, hungerColor } from "@/lib/logistics/chains";
import { ANIMAL_KINDS, ANIMAL_LANES, BINS, HERDS, WASTE_KINDS, WASTE_LANES, animalColor } from "@/lib/logistics/life";
import { GLASS, HALLS, glassColor, glassSystems } from "@/lib/logistics/net";
import { useLogistics } from "@/lib/logistics/store";
import { useTimeline } from "@/lib/timeline/store";

function Shell({
  side,
  kicker,
  title,
  arriving,
  children,
}: {
  side: "left" | "right" | "bottom";
  kicker: string;
  title: string;
  arriving?: boolean;
  children: ReactNode;
}) {
  const open = useTimeline((state) => state.panels[side === "bottom" ? "bottom" : side]);
  const bottomOpen = useTimeline((state) => state.panels.bottom);
  const togglePanel = useTimeline((state) => state.togglePanel);
  const narrow = useNarrow();
  const frame = side === "left" ? "frame-left" : side === "right" ? "frame-right" : "span-panel frame-bottom";
  const dock = side === "left" ? "left-3" : side === "right" ? "right-3" : "right-3 bottom-3 left-3";
  const closed = side === "left" ? "dock-left-closed" : side === "right" ? "dock-right-closed" : "dock-bottom-closed";
  const above = side !== "bottom" && !narrow && bottomOpen ? "above-span" : side === "bottom" ? "" : "bottom-3";
  return (
    <aside
      className={`glass ${side === "bottom" ? "" : "panel-top"} ${frame} dock-anim absolute ${dock} z-20 flex flex-col ${open ? "" : closed} ${arriving && open ? `arrive-${side}` : ""} ${above}`}
      inert={!open}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 className="font-display text-3xl leading-none">{title}</h2>
        </div>
        <button type="button" className="grid size-11 place-items-center text-muted" aria-label={`Hide ${title}`} onClick={() => togglePanel(side === "bottom" ? "bottom" : side)}>
          <X className="size-5" />
        </button>
      </div>
      {children}
      {open ? <ResizeHandle axis={side === "bottom" ? "bottom" : side} /> : null}
    </aside>
  );
}

export function GridLeft({ arriving = false }: { arriving?: boolean }) {
  const selectedId = useLogistics((state) => state.selectedId);
  const selectNode = useLogistics((state) => state.selectNode);
  return (
    <Shell side="left" kicker="Installed, not a promise" title="Plants" arriving={arriving}>
      <p className="px-4 pb-2 text-sm text-muted">A point is a plant. A house is a city. The wire leaves the plant and thins as it travels.</p>
      <ul className="scroll-thin min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {PLANTS.filter((plant) => plant.role === "plant").map((plant) => (
          <li key={plant.id}>
            <button type="button" className={`desk-row ${selectedId === plant.id ? "stock-on" : ""}`} onClick={() => selectNode(selectedId === plant.id ? null : plant.id)}>
              <span className="min-w-0 text-left">
                <span className="block text-sm font-medium">{plant.name}</span>
                <span className="block text-xs text-muted">{plant.kind} · {plant.gw} GW · {plant.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function GridRight({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="right" kicker="What the city drinks" title="Load" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        {PLANTS.filter((node) => node.role === "city")
          .slice()
          .sort((a, b) => b.load / Math.max(arrivingGw(b.id), 0.2) - a.load / Math.max(arrivingGw(a.id), 0.2))
          .map((city) => {
            const offered = arrivingGw(city.id);
            const tone = hungerColor(city.load, offered);
            const hungry = city.load > offered;
            return (
              <li key={city.id} className="text-sm">
                <span className="flex items-baseline justify-between gap-2">
                  <span>{city.name}</span>
                  <span style={{ color: tone }}>{hungry ? "hungry" : "covered"}</span>
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  drinks {city.load} GW · wire brings {offered} GW
                </span>
              </li>
            );
          })}
      </ul>
    </Shell>
  );
}

export function GridBottom({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="bottom" kicker="Real wires" title="Cables" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-3">
        {WIRES.map((wire) => (
          <li key={wire.id} className="text-sm">
            <span className="font-medium">{wire.name}</span>
            <span className="mt-0.5 block text-xs text-muted">
              {wire.gw} GW · {wire.note}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function MaterialLeft({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="left" kicker="It comes from somewhere" title="Raw" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        {CHAINS.map((chain) => (
          <li key={chain.id}>
            <p className="text-sm font-medium" style={{ color: chain.color }}>{chain.label}</p>
            <p className="text-sm">{chain.recipe}</p>
            <p className="mt-1 text-xs text-muted">{chain.note}</p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function MaterialRight({ arriving = false }: { arriving?: boolean }) {
  const selectedId = useLogistics((state) => state.selectedId);
  const selectNode = useLogistics((state) => state.selectNode);
  return (
    <Shell side="right" kicker="Stages" title="Places" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {CHAINS.flatMap((chain) =>
          chain.places.map((place) => (
            <li key={place.id}>
              <button type="button" className={`desk-row ${selectedId === place.id ? "stock-on" : ""}`} onClick={() => selectNode(selectedId === place.id ? null : place.id)}>
                <span className="size-2 shrink-0 rounded-full" style={{ background: chain.color }} />
                <span className="min-w-0 text-left">
                  <span className="block text-sm font-medium">{place.name}</span>
                  <span className="block text-xs text-muted">{place.stage} · {place.note}</span>
                </span>
              </button>
            </li>
          )),
        )}
      </ul>
    </Shell>
  );
}

export function MaterialBottom({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="bottom" kicker="No food on this tab" title="Chains" arriving={arriving}>
      <div className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-3">
        {CHAINS.map((chain) => (
          <p key={chain.id} className="text-xs" style={{ color: chain.color }}>
            {chain.links
              .map(([fromId, toId]) => {
                const from = chain.places.find((place) => place.id === fromId)?.name;
                const to = chain.places.find((place) => place.id === toId)?.name;
                return `${from} → ${to}`;
              })
              .join("   ·   ")}
          </p>
        ))}
      </div>
    </Shell>
  );
}

export function WasteLeft({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="left" kicker="Most of it never sails" title="Waste" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        {WASTE_KINDS.map((kind) => (
          <li key={kind.id}>
            <p className="text-sm font-medium" style={{ color: kind.color }}>{kind.label}</p>
            <p className="text-sm">{kind.tonnes}</p>
            <p className="mt-1 text-xs text-muted">{kind.note}</p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function WasteRight({ arriving = false }: { arriving?: boolean }) {
  const selectedId = useLogistics((state) => state.selectedId);
  const selectNode = useLogistics((state) => state.selectNode);
  const rows = BINS.slice().sort((a, b) => b.food * b.kg - a.food * a.kg);
  return (
    <Shell side="right" kicker="Food in the bin" title="Cities" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {rows.map((bin) => (
          <li key={bin.id}>
            <button type="button" className={`desk-row ${selectedId === bin.id ? "stock-on" : ""}`} onClick={() => selectNode(selectedId === bin.id ? null : bin.id)}>
              <span className="min-w-0 text-left">
                <span className="block text-sm font-medium">{bin.name}</span>
                <span className="block text-xs text-muted">
                  {bin.kg} kg a person · {Math.round(bin.food * 100)}% of it food
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function WasteBottom({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="bottom" kicker="Only what actually moves" title="Moved" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-3">
        {WASTE_LANES.map((lane) => (
          <li key={lane.id} className="text-sm">
            <span className="font-medium">{lane.name}</span>
            <span className="mt-0.5 block text-xs text-muted">{lane.note}</span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function AnimalLeft({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="left" kicker="Raised, then eaten" title="Herds" arriving={arriving}>
      <p className="px-4 pb-2 text-sm text-muted">What never gets eaten stays on the Waste tab. It is food in a bin, not another ship.</p>
      <ul className="scroll-thin min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        {ANIMAL_KINDS.map((kind) => (
          <li key={kind.id}>
            <p className="text-sm font-medium" style={{ color: kind.color }}>{kind.label}</p>
            <p className="mt-1 text-xs text-muted">{kind.note}</p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function AnimalRight({ arriving = false }: { arriving?: boolean }) {
  const selectedId = useLogistics((state) => state.selectedId);
  const selectNode = useLogistics((state) => state.selectNode);
  return (
    <Shell side="right" kicker="Source or city" title="Places" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {HERDS.map((herd) => (
          <li key={herd.id}>
            <button type="button" className={`desk-row ${selectedId === herd.id ? "stock-on" : ""}`} onClick={() => selectNode(selectedId === herd.id ? null : herd.id)}>
              <span className="size-2 shrink-0 rounded-full" style={{ background: animalColor(herd.kind) }} />
              <span className="min-w-0 text-left">
                <span className="block text-sm font-medium">{herd.name}</span>
                <span className="block text-xs text-muted">
                  {herd.role === "source" ? "Raises" : "Eats"} · {herd.note}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function AnimalBottom({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="bottom" kicker="Not toward Europe by default" title="Lanes" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-3">
        {ANIMAL_LANES.map((lane) => {
          const from = HERDS.find((herd) => herd.id === lane.from)?.name;
          const to = HERDS.find((herd) => herd.id === lane.to)?.name;
          return (
            <li key={lane.id} className="text-sm">
              <span className="font-medium" style={{ color: animalColor(lane.kind) }}>
                {from} → {to}
              </span>
              <span className="mt-0.5 block text-xs text-muted">{lane.note}</span>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}

const DATA_SYSTEMS = glassSystems(GLASS.filter((cable) => cable.kind !== "land"));

export function DataLeft({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="left" kicker="The building stays" title="Data" arriving={arriving}>
      <div className="scroll-thin min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4 text-sm">
        <p className="text-muted">A datacenter does not travel. The cable does not travel. The light in the glass does, at about two thirds of the speed of light. Across the Atlantic that is about 60 milliseconds, there and back.</p>
        <p className="text-muted">The terabit number is a design ceiling, not today's traffic and not a speed test. Lit capacity is whatever the owners have turned on.</p>
        <p className="text-muted">Cyan is an ocean cable. Violet is a short sea hop. Brass is terrestrial, and it has no single design number. Every line is the chord between two places, not the path on the seabed.</p>
      </div>
    </Shell>
  );
}

export function DataRight({ arriving = false }: { arriving?: boolean }) {
  const selectedId = useLogistics((state) => state.selectedId);
  const selectNode = useLogistics((state) => state.selectNode);
  const rooms = HALLS.filter((hall) => hall.role !== "landing").slice().sort((a, b) => b.weight - a.weight || a.name.localeCompare(b.name));
  return (
    <Shell side="right" kicker="Weight, not megawatts" title="Rooms" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {rooms.map((hall) => (
          <li key={hall.id}>
            <button type="button" className={`desk-row ${selectedId === hall.id ? "stock-on" : ""}`} onClick={() => selectNode(selectedId === hall.id ? null : hall.id)}>
              <span className="min-w-0 text-left">
                <span className="block text-sm font-medium">
                  {hall.name}
                  {hall.ix ? <span className="text-muted"> · {hall.ix}</span> : null}
                </span>
                <span className="block text-xs text-muted">
                  {"●".repeat(hall.weight)}
                  {"○".repeat(5 - hall.weight)} · {hall.note}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function DataBottom({ arriving = false }: { arriving?: boolean }) {
  return (
    <Shell side="bottom" kicker="Design ceiling" title="Glass" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-3">
        {DATA_SYSTEMS.map((system) => (
          <li key={system.name} className="text-sm">
            <span className="font-medium" style={{ color: glassColor(system.kind) }}>
              {system.name}
              {system.tbps ? ` · about ${system.tbps} Tbps` : " · no single number"}
            </span>
            <span className="mt-0.5 block text-xs text-muted">{system.note}</span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
