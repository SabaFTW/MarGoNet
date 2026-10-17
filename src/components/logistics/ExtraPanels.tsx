import type { ReactNode } from "react";
import { X } from "lucide-react";
import { ResizeHandle, useNarrow } from "@/components/aera/ResizeHandle";
import { CHAINS, PLANTS } from "@/lib/logistics/chains";
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
      <p className="px-4 pb-2 text-sm text-muted">Gigawatts you can look up. The load beside them is a sketch of who is hungry next door.</p>
      <ul className="scroll-thin min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {PLANTS.map((plant) => (
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
  const rows = [...PLANTS].sort((a, b) => b.load / b.gw - a.load / a.gw);
  return (
    <Shell side="right" kicker="Who is hungry" title="Balance" arriving={arriving}>
      <ul className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        {rows.map((plant) => {
          const ratio = plant.load / plant.gw;
          const tone = ratio < 0.75 ? "#7ddec4" : ratio < 1.05 ? "#e6c36a" : "#d4534a";
          return (
            <li key={plant.id} className="text-sm">
              <span className="flex items-baseline justify-between gap-2">
                <span>{plant.name}</span>
                <span style={{ color: tone }}>{ratio < 1 ? "spare" : "hungry"}</span>
              </span>
              <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full" style={{ width: `${Math.min(100, ratio * 50)}%`, background: tone }} />
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
      <p className="px-4 pb-3 text-sm text-muted">
        NordLink is about 1.4 GW from south Norway toward the Netherlands. Gravelines sits near the French end of the cables that feed Britain and the Low Countries. A mint halo has spare power. Gold is even. Red is a city that eats more than it makes. Hoover, Itaipu and the Three Gorges stay as plants: they do not have a cartoon wire across an ocean.
      </p>
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
