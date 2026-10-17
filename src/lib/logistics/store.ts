import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { COMMODITIES, MESHES, NODES, nearestJoin, resolveRoutes, type Commodity, type MeshKind, type StockKey, type SupplyNode, type SupplyRoute, type Split } from "./data";

export type AppMode = "history" | "logistics" | "grid" | "materials";

type ExtraStep = { id: string; title: string; body: string };

type LogisticsState = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  drift: boolean;
  setDrift: (drift: boolean) => void;
  tabsOn: boolean;
  setTabsOn: (tabsOn: boolean) => void;
  goods: Record<Commodity, boolean>;
  toggleGood: (id: Commodity) => void;
  nets: Record<MeshKind, boolean>;
  toggleNet: (id: MeshKind) => void;
  planOn: Record<string, boolean>;
  togglePlan: (id: string) => void;
  extra: ExtraStep[];
  addStep: (title: string) => void;
  joined: Record<string, boolean>;
  toggleJoin: (id: string) => void;
  sort: "small" | "coal";
  setSort: (sort: "small" | "coal") => void;
  selectedId: string | null;
  selectNode: (id: string | null) => void;
  overrides: Record<string, Partial<Record<StockKey, number>>>;
  setStock: (id: string, key: StockKey, value: number) => void;
  placing: Commodity | null;
  setPlacing: (commodity: Commodity | null) => void;
  customNodes: SupplyNode[];
  customRoutes: SupplyRoute[];
  splits: Split[];
  dropPoint: (lat: number, lon: number) => void;
  renameNode: (id: string, name: string) => void;
  removeNode: (id: string) => void;
};

const goodsOn = Object.fromEntries(COMMODITIES.map((item) => [item.id, true])) as Record<Commodity, boolean>;
const netsOn = Object.fromEntries(MESHES.map((item) => [item.id, true])) as Record<MeshKind, boolean>;

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useLogistics = create<LogisticsState>()(
  persist(
    (set, get) => ({
      mode: "history",
      setMode: (mode) => set({ mode }),
      drift: true,
      setDrift: (drift) => set({ drift }),
      tabsOn: true,
      setTabsOn: (tabsOn) => set({ tabsOn }),
      goods: goodsOn,
      toggleGood: (id) => set({ goods: { ...get().goods, [id]: !get().goods[id] } }),
      nets: netsOn,
      toggleNet: (id) => set({ nets: { ...get().nets, [id]: !get().nets[id] } }),
      planOn: {},
      togglePlan: (id) => set({ planOn: { ...get().planOn, [id]: !get().planOn[id] } }),
      extra: [],
      addStep: (title) => {
        const name = title.trim();
        if (!name) return;
        set({
          extra: [...get().extra, { id: `step-${crypto.randomUUID()}`, title: name, body: "Added to the plan." }],
        });
      },
      joined: {},
      toggleJoin: (id) => set({ joined: { ...get().joined, [id]: !get().joined[id] } }),
      sort: "small",
      setSort: (sort) => set({ sort }),
      selectedId: null,
      selectNode: (id) => set({ selectedId: id }),
      overrides: {},
      setStock: (id, key, value) => {
        const next = Math.max(0, Math.min(100, Math.round(value)));
        set({
          overrides: {
            ...get().overrides,
            [id]: { ...get().overrides[id], [key]: next },
          },
        });
      },
      placing: null,
      setPlacing: (commodity) => set({ placing: commodity }),
      customNodes: [],
      customRoutes: [],
      splits: [],
      dropPoint: (lat, lon) => {
        const commodity = get().placing;
        if (!commodity) return;
        const id = `pt-${crypto.randomUUID().slice(0, 8)}`;
        const node: SupplyNode = {
          id,
          name: "New point",
          lat: Math.round(lat * 100) / 100,
          lon: Math.round(lon * 100) / 100,
          food: 46,
          meds: 46,
          construction: 46,
          parts: 46,
          energy: 40,
          nuclear: 0,
          coal: 24,
          green: 40,
          scale: 14,
          custom: true,
        };
        const nodes = [...NODES, ...get().customNodes];
        const live = resolveRoutes(get().customRoutes, get().splits).filter((route) => !route.join || get().joined[route.to]);
        const join = nearestJoin(node.lat, node.lon, commodity, live, nodes);
        if (join.route) {
          set({
            customNodes: [...get().customNodes, node],
            splits: [...get().splits, { routeId: join.route.id, nodeId: id }],
            placing: null,
            selectedId: id,
          });
          return;
        }
        if (!join.nearest) {
          set({ customNodes: [...get().customNodes, node], placing: null, selectedId: id });
          return;
        }
        set({
          customNodes: [...get().customNodes, node],
          customRoutes: [
            ...get().customRoutes,
            { id: `leg-${id}`, from: join.nearest.id, to: id, commodity },
          ],
          placing: null,
          selectedId: id,
        });
      },
      renameNode: (id, name) =>
        set({
          customNodes: get().customNodes.map((node) => (node.id === id ? { ...node, name: name.slice(0, 42) } : node)),
        }),
      removeNode: (id) =>
        set({
          customNodes: get().customNodes.filter((node) => node.id !== id),
          customRoutes: get().customRoutes.filter((route) => route.from !== id && route.to !== id),
          splits: get().splits.filter((split) => split.nodeId !== id && !split.routeId.includes(`>${id}`)),
          selectedId: get().selectedId === id ? null : get().selectedId,
        }),
    }),
    {
      name: "aera-margo",
      storage: createJSONStorage(() => (typeof window === "undefined" ? memoryStorage : localStorage)),
      partialize: (state) => ({
        mode: state.mode,
        drift: state.drift,
        tabsOn: state.tabsOn,
        goods: state.goods,
        nets: state.nets,
        planOn: state.planOn,
        extra: state.extra,
        joined: state.joined,
        sort: state.sort,
        overrides: state.overrides,
        customNodes: state.customNodes,
        customRoutes: state.customRoutes,
        splits: state.splits,
      }),
    },
  ),
);
