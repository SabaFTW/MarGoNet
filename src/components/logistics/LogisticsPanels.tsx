import { useState } from "react";
import { X } from "lucide-react";
import { ResizeHandle, useNarrow } from "@/components/aera/ResizeHandle";
import {
  COMMODITIES,
  MESHES,
  MESH_LINKS,
  NODES,
  PLAN,
  findNode,
  nodeColor,
  onHand,
  resolveRoutes,
  type Commodity,
  type MeshKind,
  type StockKey,
  type SupplyNode,
} from "@/lib/logistics/data";
import { useLogistics } from "@/lib/logistics/store";
import { useTimeline } from "@/lib/timeline/store";

function liveNode(node: SupplyNode, overrides: ReturnType<typeof useLogistics.getState>["overrides"]) {
  return { ...node, ...overrides[node.id] };
}

export function PlanPanel({ arriving = false }: { arriving?: boolean }) {
  const open = useTimeline((state) => state.panels.left);
  const bottomOpen = useTimeline((state) => state.panels.bottom);
  const togglePanel = useTimeline((state) => state.togglePanel);
  const narrow = useNarrow();
  const planOn = useLogistics((state) => state.planOn);
  const togglePlan = useLogistics((state) => state.togglePlan);
  const extra = useLogistics((state) => state.extra);
  const addStep = useLogistics((state) => state.addStep);
  const [draft, setDraft] = useState("");
  const steps = [...PLAN, ...extra];
  const nets = useLogistics((state) => state.nets);
  const toggleNet = useLogistics((state) => state.toggleNet);

  return (
    <aside
      className={`glass panel-top frame-left dock-anim absolute left-3 z-20 flex flex-col ${
        open ? "" : "dock-left-closed"
      } ${arriving && open ? "arrive-left" : ""} ${!narrow && bottomOpen ? "above-span" : "bottom-3"}`}
      inert={!open}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <p className="kicker">Flow</p>
          <h2 className="font-display text-3xl leading-none">Plan</h2>
        </div>
        <button type="button" className="grid size-11 place-items-center text-muted" aria-label="Hide plan" onClick={() => togglePanel("left")}>
          <X className="size-5" />
        </button>
      </div>
      <p className="px-4 pb-2 text-sm text-muted">Tick a step when the pipes for it actually hold. Desks stay put. Food and material keep moving.</p>
      <ul className="space-y-1 px-3 pb-2">
        {MESHES.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="desk-row"
              aria-pressed={nets[item.id]}
              onClick={() => toggleNet(item.id)}
            >
              {item.id === "grid" ? (
                <span className="desk-halo" style={{ background: "linear-gradient(90deg, #7ddec4, #e6c36a, #d4534a)" }} />
              ) : (
                <svg className="desk-house" viewBox="0 0 16 16" aria-hidden>
                  <path d="M2 7.2 8 2.4l6 4.8V14H2Z" fill={item.color} />
                </svg>
              )}
              <span className="min-w-0 text-left">
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="block text-xs text-muted">{item.hint}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <ol className="scroll-thin min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-3">
        {steps.map((step, index) => {
          const on = planOn[step.id] === true;
          return (
            <li key={step.id}>
              <button
                type="button"
                className={`plan-step ${on ? "plan-on" : ""}`}
                aria-pressed={on}
                onClick={() => togglePlan(step.id)}
              >
                <span className="plan-index">{index + 1}</span>
                <span className="min-w-0 text-left">
                  <span className="block font-medium">{step.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{step.body}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <form
        className="flex gap-2 px-3 pt-1 pb-3"
        onSubmit={(event) => {
          event.preventDefault();
          addStep(draft);
          setDraft("");
        }}
      >
        <input
          className="field"
          value={draft}
          placeholder="Add a step"
          aria-label="Add a plan step"
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="h-11 shrink-0 rounded-xl bg-brass px-3 text-sm font-medium text-bg">
          Add
        </button>
      </form>
      {open ? <ResizeHandle axis="left" /> : null}
    </aside>
  );
}

const BARS: { key: StockKey; label: string; color: string }[] = [
  { key: "food", label: "Food", color: "#e08a3c" },
  { key: "meds", label: "Meds", color: "#3eae72" },
  { key: "construction", label: "Build", color: "#c4a574" },
  { key: "parts", label: "Parts", color: "#d4534a" },
  { key: "energy", label: "Power", color: "#e6c36a" },
  { key: "nuclear", label: "NewClear", color: "#7dcea0" },
];

export function StockPanel({ arriving = false }: { arriving?: boolean }) {
  const open = useTimeline((state) => state.panels.right);
  const bottomOpen = useTimeline((state) => state.panels.bottom);
  const togglePanel = useTimeline((state) => state.togglePanel);
  const narrow = useNarrow();
  const sort = useLogistics((state) => state.sort);
  const setSort = useLogistics((state) => state.setSort);
  const selectedId = useLogistics((state) => state.selectedId);
  const selectNode = useLogistics((state) => state.selectNode);
  const joined = useLogistics((state) => state.joined);
  const toggleJoin = useLogistics((state) => state.toggleJoin);
  const overrides = useLogistics((state) => state.overrides);
  const setStock = useLogistics((state) => state.setStock);
  const renameNode = useLogistics((state) => state.renameNode);
  const removeNode = useLogistics((state) => state.removeNode);
  const customNodes = useLogistics((state) => state.customNodes);
  const nets = useLogistics((state) => state.nets);

  const rows = [...NODES, ...customNodes]
    .filter((node) => !node.desk || nets[node.desk])
    .map((node) => liveNode(node, overrides))
    .sort((a, b) => (sort === "small" ? a.scale - b.scale : b.coal - a.coal || a.scale - b.scale));
  const selected = rows.find((node) => node.id === selectedId);

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
          <p className="kicker">On hand, not capacity</p>
          <h2 className="font-display text-3xl leading-none">Stocks</h2>
        </div>
        <button type="button" className="grid size-11 place-items-center text-muted" aria-label="Hide stocks" onClick={() => togglePanel("right")}>
          <X className="size-5" />
        </button>
      </div>
      <div className="flex gap-2 px-4 pb-2">
        <button type="button" className={`sort-chip ${sort === "small" ? "sort-on" : ""}`} onClick={() => setSort("small")}>
          Smallest first
        </button>
        <button type="button" className={`sort-chip ${sort === "coal" ? "sort-on" : ""}`} onClick={() => setSort("coal")}>
          Coal first
        </button>
      </div>
      <ul className="scroll-thin min-h-0 flex-1 space-y-1.5 overflow-y-auto px-3 pb-3">
        {rows.map((node) => {
          const on = node.id === selectedId;
          const solo = node.solo && !joined[node.id];
          return (
            <li key={node.id}>
              <button type="button" className={`stock-row ${on ? "stock-on" : ""}`} onClick={() => selectNode(on ? null : node.id)}>
                <span className="flex items-baseline justify-between gap-2">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="size-2 shrink-0 rounded-full" style={{ background: nodeColor(node) }} />
                    {node.name}
                  </span>
                  <span className="text-xs text-muted">{solo ? "solo grid" : `coal ${node.coal}`}</span>
                </span>
                <span className="mt-1.5 grid grid-cols-3 gap-1">
                  {BARS.slice(0, 6).map((bar) => (
                    <span key={bar.key} className="stock-meter" title={`${bar.label} ${node[bar.key]}`}>
                      <span style={{ width: `${node[bar.key]}%`, background: bar.color }} />
                    </span>
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {selected ? (
        <div className="border-t border-line px-3 py-3">
          <p className="kicker">{selected.name}</p>
          {selected.custom ? (
            <input
              className="field mt-2"
              aria-label="Point name"
              value={selected.name}
              onChange={(event) => renameNode(selected.id, event.target.value)}
            />
          ) : null}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {BARS.map((bar) => (
              <label key={bar.key} className="text-xs text-muted">
                {bar.label}
                <input
                  className="field mt-1"
                  inputMode="numeric"
                  aria-label={`${selected.name} ${bar.label}`}
                  value={String(selected[bar.key])}
                  onChange={(event) => setStock(selected.id, bar.key, Number(event.target.value))}
                />
              </label>
            ))}
          </div>
          {selected.solo ? (
            <button type="button" className="mt-2 text-sm text-brass" onClick={() => toggleJoin(selected.id)}>
              {joined[selected.id] ? "Back to a solo grid" : "Join by supplier link"}
            </button>
          ) : null}
          {selected.custom ? (
            <button type="button" className="mt-2 block text-sm text-muted" onClick={() => removeNode(selected.id)}>
              Remove this point
            </button>
          ) : null}
        </div>
      ) : (
        <p className="px-4 pb-3 text-xs text-muted">Sketch numbers. Edit a city after you tap it. Coal-heavy grids swap first, smallest working ones before the big.</p>
      )}
      {open ? <ResizeHandle axis="right" /> : null}
    </aside>
  );
}

export function FlowPanel({ arriving = false }: { arriving?: boolean }) {
  const open = useTimeline((state) => state.panels.bottom);
  const togglePanel = useTimeline((state) => state.togglePanel);
  const goods = useLogistics((state) => state.goods);
  const toggleGood = useLogistics((state) => state.toggleGood);
  const joined = useLogistics((state) => state.joined);
  const placing = useLogistics((state) => state.placing);
  const setPlacing = useLogistics((state) => state.setPlacing);
  const customNodes = useLogistics((state) => state.customNodes);
  const customRoutes = useLogistics((state) => state.customRoutes);
  const splits = useLogistics((state) => state.splits);
  const overrides = useLogistics((state) => state.overrides);
  const [ink, setInk] = useState<Commodity>("food");
  const routes = resolveRoutes(customRoutes, splits);
  const nets = useLogistics((state) => state.nets);
  const toggleNet = useLogistics((state) => state.toggleNet);

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
          <p className="kicker">Same current</p>
          <h2 className="font-display text-2xl leading-none">Flow</h2>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COMMODITIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="good-chip"
              aria-pressed={goods[item.id]}
              onClick={() => toggleGood(item.id)}
              style={{ ["--good" as string]: item.color, opacity: goods[item.id] ? 1 : 0.4 }}
            >
              <span className="size-2 rounded-full" style={{ background: item.color }} />
              {item.label}
            </button>
          ))}
          {MESHES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="good-chip"
              aria-pressed={nets[item.id]}
              onClick={() => toggleNet(item.id)}
              style={{ opacity: nets[item.id] ? 1 : 0.4 }}
            >
              <span
                className="size-2 rounded-full"
                style={{
                  background: item.id === "grid" ? "linear-gradient(90deg, #7ddec4, #e6c36a, #d4534a)" : item.color,
                }}
              />
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" className="ml-auto grid size-11 place-items-center text-muted" aria-label="Hide flow" onClick={() => togglePanel("bottom")}>
          <X className="size-5" />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <label className="text-xs text-muted">
          Color
          <select className="field mt-1" value={ink} aria-label="Color for a new point" onChange={(event) => setInk(event.target.value as Commodity)}>
            {COMMODITIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={`mt-4 h-11 rounded-xl px-3 text-sm ${placing ? "bg-brass text-bg" : "border border-line text-fg"}`}
          onClick={() => setPlacing(placing ? null : ink)}
        >
          {placing ? "Click the Earth…" : "Drop a point"}
        </button>
      </div>
      <div className="scroll-thin mt-2 min-h-0 flex-1 space-y-1.5 overflow-y-auto">
        {COMMODITIES.map((item) => (
          <Lane
            key={item.id}
            commodity={item.id}
            on={goods[item.id]}
            joined={joined}
            routes={routes}
            extra={customNodes}
            overrides={overrides}
          />
        ))}
        {MESHES.map((item) => (
          <MeshLane key={item.id} kind={item.id} on={nets[item.id]} />
        ))}
        <p className="pt-1 text-xs text-muted">
          Points take the color of what they hold. Ingersoll Rand, Helly Hansen, construction and ore stay put: a desk you can call, not a truck. The electrogrid fades from mint surplus through gold to red hunger, and goes faint where access is weak.
        </p>
      </div>
      {open ? <ResizeHandle axis="bottom" /> : null}
    </section>
  );
}

function MeshLane({ kind, on }: { kind: MeshKind; on: boolean }) {
  const meta = MESHES.find((item) => item.id === kind);
  const names = [...new Set(MESH_LINKS.filter((link) => link.kind === kind).flatMap((link) => [findNode(link.from)?.name, findNode(link.to)?.name]))].filter(Boolean);
  return (
    <div className="flex items-center gap-2" style={{ opacity: on ? 1 : 0.35 }}>
      <span className="w-28 shrink-0 text-xs" style={{ color: meta?.color }}>
        {meta?.label}
      </span>
      <span className="truncate text-xs text-muted">{names.join(" · ")}</span>
    </div>
  );
}

function Lane({
  commodity,
  on,
  joined,
  routes,
  extra,
  overrides,
}: {
  commodity: Commodity;
  on: boolean;
  joined: Record<string, boolean>;
  routes: ReturnType<typeof resolveRoutes>;
  extra: SupplyNode[];
  overrides: Record<string, Partial<SupplyNode>>;
}) {
  const meta = COMMODITIES.find((item) => item.id === commodity);
  const hops = routes.filter((route) => route.commodity === commodity && (!route.join || joined[route.to]));
  return (
    <div className="flex items-center gap-2" style={{ opacity: on ? 1 : 0.35 }}>
      <span className="w-14 shrink-0 text-xs" style={{ color: meta?.color }}>
        {meta?.label}
      </span>
      <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
        {hops.map((route) => {
          const from = findNode(route.from, extra);
          const to = findNode(route.to, extra);
          if (!from || !to) return null;
          const dest = { ...to, ...overrides[to.id] };
          const thin = onHand(dest, commodity) < 32;
          return (
            <span key={route.id} className="flow-hop" style={{ background: meta?.color, opacity: thin ? 0.55 : 1 }}>
              {from.name} → {to.name}
              {thin ? " · thin" : ""}
            </span>
          );
        })}
        {hops.length === 0 ? <span className="text-xs text-muted">No loop on this color yet.</span> : null}
      </div>
    </div>
  );
}
