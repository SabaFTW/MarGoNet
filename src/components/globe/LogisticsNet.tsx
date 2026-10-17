import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { calmZoom, latLonToXYZ, ribbonZoom } from "@/lib/timeline/geo";
import { CABLES, CHAINS, PLANTS, type Plant } from "@/lib/logistics/chains";
import {
  MESH_LINKS,
  NODES,
  ROUTES,
  commodityColor,
  findNode,
  nodeColor,
  onHand,
  resolveRoutes,
  type MeshKind,
  type SupplyNode,
} from "@/lib/logistics/data";
import { useLogistics } from "@/lib/logistics/store";

const SUN = new THREE.Vector3(4.2, 1.55, -1.35).normalize();

function ringPoints(angular: number, radius: number, segments = 80) {
  const tangent = new THREE.Vector3().crossVectors(SUN, new THREE.Vector3(0, 1, 0));
  if (tangent.lengthSq() < 1e-4) tangent.crossVectors(SUN, new THREE.Vector3(1, 0, 0));
  tangent.normalize();
  const bitangent = new THREE.Vector3().crossVectors(SUN, tangent).normalize();
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      SUN.clone()
        .multiplyScalar(Math.cos(angular))
        .add(tangent.clone().multiplyScalar(Math.sin(angular) * Math.cos(angle)))
        .add(bitangent.clone().multiplyScalar(Math.sin(angular) * Math.sin(angle)))
        .normalize()
        .multiplyScalar(radius),
    );
  }
  return points;
}

function arcBetween(latA: number, lonA: number, latB: number, lonB: number, radius: number) {
  const a = new THREE.Vector3(...latLonToXYZ(latA, lonA, 1));
  const b = new THREE.Vector3(...latLonToXYZ(latB, lonB, 1));
  const points: THREE.Vector3[] = [];
  const steps = Math.max(20, Math.round(a.angleTo(b) * 32));
  for (let i = 0; i <= steps; i += 1) points.push(a.clone().lerp(b, i / steps).normalize().multiplyScalar(radius));
  return points;
}

function arcPoints(from: SupplyNode, to: SupplyNode, radius = 1.016) {
  return arcBetween(from.lat, from.lon, to.lat, to.lon, radius);
}

const arrowShape = new THREE.Shape();
arrowShape.moveTo(0.055, 0);
arrowShape.lineTo(-0.028, 0.016);
arrowShape.lineTo(-0.01, 0);
arrowShape.lineTo(-0.028, -0.016);
arrowShape.closePath();
const ARROW = new THREE.ShapeGeometry(arrowShape);

const ribbonVert = /* glsl */ `
  attribute float aAlong;
  attribute float aAcross;
  attribute vec3 aSide;
  varying float vAlong;
  varying float vAcross;
  uniform float uWidth;
  void main() {
    vAlong = aAlong;
    vAcross = aAcross;
    vec3 pos = position + aSide * uWidth;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const ribbonFrag = /* glsl */ `
  varying float vAlong;
  varying float vAcross;
  uniform vec3 uColor;
  uniform vec3 uColorB;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uGain;
  uniform float uWidth;
  uniform float uFlow;
  uniform float uSpan;
  void main() {
    float across = abs(vAcross);
    float road = smoothstep(1.0, 0.38, across);
    vec3 dye = mix(uColor, uColorB, clamp(vAlong / max(uSpan, 0.0001), 0.0, 1.0));
    if (uFlow < 0.5) {
      if (road * uGain < 0.04) discard;
      gl_FragColor = vec4(dye, road * uGain);
      #include <colorspace_fragment>
      return;
    }
    float x = fract(vAlong * 6.5 - uTime * uSpeed);
    float wing = mix(0.48, 0.0, smoothstep(0.02, 0.46, x));
    float arrow = smoothstep(wing + 0.12, wing, across) * smoothstep(0.52, 0.2, x);
    float tip = smoothstep(0.42, 0.05, x) * arrow;
    vec3 col = mix(dye * 0.78, vec3(0.98, 0.95, 0.88), tip);
    float alpha = max(road * 0.7, arrow * 0.95) * uGain;
    if (alpha < 0.04) discard;
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

const LIFT: Record<string, number> = { food: 1.014, auto: 1.021, meds: 1.028, fabric: 1.035 };

function ribbonGeometry(points: THREE.Vector3[], width: number) {
  const positions: number[] = [];
  const along: number[] = [];
  const across: number[] = [];
  const sides: number[] = [];
  const indices: number[] = [];
  const side = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const up = new THREE.Vector3();
  let dist = 0;
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    if (i > 0) dist += point.distanceTo(points[i - 1]);
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    tangent.copy(next).sub(prev);
    if (tangent.lengthSq() < 1e-8) tangent.set(0, 1, 0);
    tangent.normalize();
    up.copy(point).normalize();
    side.crossVectors(up, tangent).normalize();
    const center = point.clone().add(up.clone().multiplyScalar(0.006));
    const offset = side.clone().multiplyScalar(width);
    positions.push(center.x, center.y, center.z, center.x, center.y, center.z);
    sides.push(offset.x, offset.y, offset.z, -offset.x, -offset.y, -offset.z);
    along.push(dist, dist);
    across.push(-1, 1);
  }
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("aSide", new THREE.Float32BufferAttribute(sides, 3));
  geo.setAttribute("aAlong", new THREE.Float32BufferAttribute(along, 1));
  geo.setAttribute("aAcross", new THREE.Float32BufferAttribute(across, 1));
  geo.setIndex(indices);
  return geo;
}

function Ribbon({
  points,
  color,
  colorB,
  width,
  speed,
  gain,
  flow = true,
}: {
  points: THREE.Vector3[];
  color: string;
  colorB?: string;
  width: number;
  speed: number;
  gain: number;
  flow?: boolean;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const geometry = useMemo(() => ribbonGeometry(points, width), [points, width]);
  const span = useMemo(() => {
    let length = 0;
    for (let i = 1; i < points.length; i += 1) length += points[i].distanceTo(points[i - 1]);
    return length;
  }, [points]);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uColorB: { value: new THREE.Color(colorB ?? color) },
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uGain: { value: gain },
      uWidth: { value: 0.2 },
      uFlow: { value: flow ? 1 : 0 },
      uSpan: { value: span },
    }),
    [color, colorB, flow, gain, span, speed],
  );
  useFrame(({ clock, camera }) => {
    if (!material.current) return;
    material.current.uniforms.uWidth.value = ribbonZoom(camera.position.length());
    if (reduced.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh geometry={geometry} raycast={() => undefined}>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={ribbonVert}
        fragmentShader={ribbonFrag}
        polygonOffset
        polygonOffsetFactor={-2}
        polygonOffsetUnits={-2}
      />
    </mesh>
  );
}

function Arrows({ points, color, speed, closed }: { points: THREE.Vector3[]; color: string; speed: number; closed: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, closed), [points, closed]);
  const count = closed ? 16 : Math.max(2, Math.min(4, Math.round(curve.getLength() * 1.4)));
  const radial = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const side = useMemo(() => new THREE.Vector3(), []);
  const basis = useMemo(() => new THREE.Matrix4(), []);
  useFrame(({ clock, camera }) => {
    const current = mesh.current;
    if (!current) return;
    const zoom = ribbonZoom(camera.position.length());
    const head = (clock.elapsedTime * speed) % 1;
    for (let i = 0; i < count; i += 1) {
      const t = (head + i / count) % 1;
      const pos = curve.getPoint(t);
      radial.copy(pos).normalize();
      tangent.copy(curve.getTangent(t));
      tangent.addScaledVector(radial, -tangent.dot(radial));
      if (tangent.lengthSq() < 1e-6) tangent.set(1, 0, 0);
      tangent.normalize();
      side.crossVectors(radial, tangent).normalize();
      dummy.position.copy(pos).addScaledVector(radial, 0.01);
      dummy.quaternion.setFromRotationMatrix(basis.makeBasis(tangent, side, radial));
      dummy.scale.setScalar(zoom);
      dummy.updateMatrix();
      current.setMatrixAt(i, dummy.matrix);
    }
    current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[ARROW, undefined, count]} raycast={() => undefined}>
      <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.95} side={THREE.DoubleSide} depthWrite={false} />
    </instancedMesh>
  );
}

function markColors(node: SupplyNode) {
  if (node.desk === "tools") return ["#e0b15a"];
  if (node.desk === "safety") return ["#6eb7c8"];
  if (node.desk === "build") return ["#d08a4c"];
  if (node.desk === "ore") return ["#b08968"];
  const colors = new Set<string>();
  for (const route of ROUTES) {
    if (route.from === node.id || route.to === node.id) colors.add(commodityColor(route.commodity));
  }
  if (colors.size === 0) colors.add(nodeColor(node));
  return [...colors];
}

function NodeMark({ node, on }: { node: SupplyNode; on: boolean }) {
  const selectNode = useLogistics((state) => state.selectNode);
  const selected = useLogistics((state) => state.selectedId === node.id);
  const position = useMemo(() => latLonToXYZ(node.lat, node.lon, 1.03), [node.lat, node.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward), [outward]);
  const group = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    group.current?.scale.setScalar(calmZoom(camera.position.length()) * 0.7);
  });
  const colors = markColors(node);
  return (
    <group ref={group} position={position}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          selectNode(selected ? null : node.id);
        }}
      >
        <sphereGeometry args={[selected ? 0.02 : 0.012, 14, 14]} />
        <meshBasicMaterial color={colors[0]} toneMapped={false} />
      </mesh>
      <group quaternion={quat}>
        {colors.map((color, index) => (
          <mesh key={color} rotation={[0, 0, (index / colors.length) * Math.PI * 2]}>
            <ringGeometry args={[0.016, 0.024, 10, 1, 0.12, (Math.PI * 2) / colors.length - 0.18]} />
            <meshBasicMaterial color={color} side={THREE.DoubleSide} toneMapped={false} transparent opacity={on ? 1 : 0.4} />
          </mesh>
        ))}
      </group>
      {selected ? (
        <Html position={[0, 0.045, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{node.name}</div>
        </Html>
      ) : null}
    </group>
  );
}

function HouseMark({ node }: { node: SupplyNode }) {
  const selectNode = useLogistics((state) => state.selectNode);
  const selected = useLogistics((state) => state.selectedId === node.id);
  const position = useMemo(() => latLonToXYZ(node.lat, node.lon, 1.02), [node.lat, node.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward), [outward]);
  const color = markColors(node)[0];
  const group = useRef<THREE.Group>(null);
  useFrame(({ camera, clock }) => {
    if (!group.current) return;
    const breathe = 1 + Math.sin(clock.elapsedTime * 1.1 + node.lat) * 0.035;
    group.current.scale.setScalar(calmZoom(camera.position.length()) * breathe * (selected ? 1.2 : 1));
  });
  return (
    <group ref={group} position={position} quaternion={quat}>
      <mesh
        position={[0, 0.012, 0]}
        onClick={(event) => {
          event.stopPropagation();
          selectNode(selected ? null : node.id);
        }}
      >
        <boxGeometry args={[0.028, 0.02, 0.022]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.026, 0]} rotation={[0, Math.PI / 4, 0]} raycast={() => undefined}>
        <coneGeometry args={[0.022, 0.016, 4]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {selected ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{node.name}</div>
        </Html>
      ) : null}
    </group>
  );
}

const RELIEF_IDS = new Set([
  "rotterdam", "shanghai", "singapore", "guangzhou", "mumbai", "houston", "neworleans", "losangeles", "newark",
  "santos", "buenosaires", "istanbul", "suez", "jeddah", "dubai", "lagos", "durban", "mombasa", "fremantle",
]);

function ReliefPin({ node }: { node: SupplyNode }) {
  const group = useRef<THREE.Group>(null);
  const position = useMemo(() => latLonToXYZ(node.lat, node.lon, 1), [node.lat, node.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward), [outward]);
  const color = nodeColor(node);
  useFrame(({ camera }) => {
    if (!group.current) return;
    const distance = camera.position.length();
    const t = Math.min(1, Math.max(0, (2.12 - distance) / 0.48));
    const shown = t * t * (3 - 2 * t);
    group.current.visible = shown > 0.05;
    group.current.scale.setScalar(Math.max(shown, 0.001));
  });
  return (
    <group ref={group} position={position} quaternion={quat}>
      <mesh position={[0, 0.03, 0]} raycast={() => undefined}>
        <cylinderGeometry args={[0.006, 0.01, 0.06, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function LogisticsNet() {
  const mode = useLogistics((state) => state.mode);
  const goods = useLogistics((state) => state.goods);
  const nets = useLogistics((state) => state.nets);
  const joined = useLogistics((state) => state.joined);
  const customNodes = useLogistics((state) => state.customNodes);
  const customRoutes = useLogistics((state) => state.customRoutes);
  const splits = useLogistics((state) => state.splits);
  const overrides = useLogistics((state) => state.overrides);
  const sun = useMemo(() => ringPoints(0.55, 1.02), []);
  const nodes = useMemo(() => [...NODES, ...customNodes], [customNodes]);
  const arcs = useMemo(
    () =>
      resolveRoutes(customRoutes, splits)
        .filter((route) => goods[route.commodity] && (!route.join || joined[route.to]))
        .flatMap((route) => {
          const from = findNode(route.from, customNodes);
          const to = findNode(route.to, customNodes);
          if (!from || !to) return [];
          const origin = { ...from, ...overrides[from.id] };
          const dest = { ...to, ...overrides[to.id] };
          const stock = onHand(origin, route.commodity);
          const thin = onHand(dest, route.commodity) < 32;
          return [
            {
              id: route.id,
              color: commodityColor(route.commodity),
              points: arcPoints(from, to, LIFT[route.commodity] ?? 1.02),
              speed: (0.08 + stock / 700) * (thin ? 0.45 : 1),
              gain: thin ? 0.42 : 1,
            },
          ];
        }),
    [customNodes, customRoutes, goods, joined, overrides, splits],
  );
  const meshes = useMemo(() => {
    const drawn: { id: string; kind: MeshKind; color: string; points: THREE.Vector3[] }[] = [];
    if (mode === "grid") return drawn;
    for (const link of MESH_LINKS) {
      if (link.kind === "grid" || !nets[link.kind]) continue;
      const from = findNode(link.from);
      const to = findNode(link.to);
      if (!from || !to) continue;
      drawn.push({
        id: link.id,
        kind: link.kind,
        color: nodeColor(from.desk ? from : to),
        points: arcPoints(from, to, 1.011),
      });
    }
    return drawn;
  }, [mode, nets]);
  const visibleNodes = nodes.filter((node) => !node.desk || nets[node.desk]);

  return (
    <group>
      <Ribbon points={sun} color="#e6c36a" width={0.04} speed={1.1} gain={0.75} />
      <Arrows points={sun.slice(0, -1)} color="#f3e6c8" speed={0.04} closed />
      {meshes.map((link) => (
        <Ribbon key={link.id} points={link.points} color={link.color} width={0.01} speed={0} gain={0.38} flow={false} />
      ))}
      {arcs.map((arc) => (
        <group key={arc.id}>
          <Ribbon points={arc.points} color={arc.color} width={0.04} speed={arc.speed * 18} gain={arc.gain} />
          <Arrows points={arc.points} color="#f4efe4" speed={arc.speed} closed={false} />
        </group>
      ))}
      {visibleNodes
        .filter((node) => RELIEF_IDS.has(node.id) && !node.desk)
        .map((node) => (
          <ReliefPin key={`relief-${node.id}`} node={node} />
        ))}
      {visibleNodes
        .filter((node) => !node.desk)
        .map((node) => (
          <NodeMark key={node.id} node={node} on={!node.solo || joined[node.id] === true} />
        ))}
      {visibleNodes
        .filter((node) => node.desk)
        .map((node) => (
          <HouseMark key={node.id} node={node} />
        ))}
    </group>
  );
}

function plantTone(plant: Plant) {
  const ratio = plant.load / Math.max(plant.gw, 0.2);
  if (ratio < 0.75) return "#7ddec4";
  if (ratio < 1.05) return "#e6c36a";
  return "#d4534a";
}

export function GridNet() {
  const selectNode = useLogistics((state) => state.selectNode);
  const selectedId = useLogistics((state) => state.selectedId);
  const cables = useMemo(
    () =>
      CABLES.flatMap(([fromId, toId]) => {
        const from = PLANTS.find((plant) => plant.id === fromId);
        const to = PLANTS.find((plant) => plant.id === toId);
        if (!from || !to) return [];
        return [
          {
            id: `${fromId}-${toId}`,
            points: arcBetween(from.lat, from.lon, to.lat, to.lon, 1.012),
            color: plantTone(from),
            colorB: plantTone(to),
          },
        ];
      }),
    [],
  );
  return (
    <group>
      {cables.map((cable) => (
        <Ribbon key={cable.id} points={cable.points} color={cable.color} colorB={cable.colorB} width={0.02} speed={0} gain={0.8} flow={false} />
      ))}
      {PLANTS.map((plant) => (
        <PlantMark key={plant.id} plant={plant} selected={selectedId === plant.id} onSelect={() => selectNode(selectedId === plant.id ? null : plant.id)} />
      ))}
    </group>
  );
}

function PlantMark({ plant, selected, onSelect }: { plant: Plant; selected: boolean; onSelect: () => void }) {
  const group = useRef<THREE.Group>(null);
  const position = useMemo(() => latLonToXYZ(plant.lat, plant.lon, 1.012), [plant.lat, plant.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward), [outward]);
  const color = plantTone(plant);
  const radius = 0.034 + Math.min(plant.gw, 22) * 0.0035;
  useFrame(({ camera }) => {
    group.current?.scale.setScalar(calmZoom(camera.position.length()));
  });
  return (
    <group ref={group} position={position}>
      <mesh quaternion={quat} raycast={() => undefined}>
        <circleGeometry args={[radius, 36]} />
        <meshBasicMaterial color={color} transparent opacity={selected ? 0.4 : 0.22} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[selected ? 0.016 : 0.01, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {selected ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{plant.name}</div>
        </Html>
      ) : null}
    </group>
  );
}

export function ChainsNet() {
  const selectNode = useLogistics((state) => state.selectNode);
  const selectedId = useLogistics((state) => state.selectedId);
  const arcs = useMemo(
    () =>
      CHAINS.flatMap((chain) =>
        chain.links.flatMap(([fromId, toId]) => {
          const from = chain.places.find((place) => place.id === fromId);
          const to = chain.places.find((place) => place.id === toId);
          if (!from || !to) return [];
          return [{ id: `${chain.id}-${fromId}`, color: chain.color, points: arcBetween(from.lat, from.lon, to.lat, to.lon, 1.016) }];
        }),
      ),
    [],
  );
  const places = CHAINS.flatMap((chain) => chain.places.map((place) => ({ ...place, color: chain.color })));
  return (
    <group>
      {arcs.map((arc) => (
        <group key={arc.id}>
          <Ribbon points={arc.points} color={arc.color} width={0.022} speed={0.35} gain={0.85} />
          <Arrows points={arc.points} color="#f4efe4" speed={0.12} closed={false} />
        </group>
      ))}
      {places.map((place) => (
        <ChainHouse key={place.id} place={place} selected={selectedId === place.id} onSelect={() => selectNode(selectedId === place.id ? null : place.id)} />
      ))}
    </group>
  );
}

function ChainHouse({
  place,
  selected,
  onSelect,
}: {
  place: { name: string; lat: number; lon: number; color: string };
  selected: boolean;
  onSelect: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const position = useMemo(() => latLonToXYZ(place.lat, place.lon, 1.02), [place.lat, place.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward), [outward]);
  useFrame(({ camera, clock }) => {
    if (!group.current) return;
    const breathe = 1 + Math.sin(clock.elapsedTime * 1.1 + place.lat) * 0.03;
    group.current.scale.setScalar(calmZoom(camera.position.length()) * breathe * (selected ? 1.15 : 1));
  });
  return (
    <group ref={group} position={position} quaternion={quat}>
      <mesh
        position={[0, 0.012, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        <boxGeometry args={[0.022, 0.016, 0.018]} />
        <meshBasicMaterial color={place.color} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.024, 0]} rotation={[0, Math.PI / 4, 0]} raycast={() => undefined}>
        <coneGeometry args={[0.018, 0.014, 4]} />
        <meshBasicMaterial color={place.color} toneMapped={false} />
      </mesh>
      {selected ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{place.name}</div>
        </Html>
      ) : null}
    </group>
  );
}
