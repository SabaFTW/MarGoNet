import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { calmZoom, latLonToXYZ } from "@/lib/timeline/geo";
import { CHAINS, PLANTS, WIRES, arrivingGw, hungerColor, type Plant } from "@/lib/logistics/chains";
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
import { ANIMAL_LANES, BINS, HERDS, WASTE_LANES, WASTE_PORTS, animalColor, wasteColor } from "@/lib/logistics/life";
import { GLASS, HALLS, glassColor } from "@/lib/logistics/net";

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
  uniform float uFade;
  uniform float uSpan;
  uniform float uPacket;
  void main() {
    float across = abs(vAcross);
    float travel = clamp(vAlong / max(uSpan, 0.0001), 0.0, 1.0);
    float fall = smoothstep(0.05, 0.9, vAlong);
    float fade = mix(1.0, mix(1.0, 0.14, fall * fall), step(0.5, uFade));
    float reach = mix(1.0, mix(1.0, 0.4, fall), step(0.5, uFade));
    float road = smoothstep(reach, reach * 0.32, across);
    vec3 dye = mix(uColor, uColorB, travel);
    if (uPacket > 0.5) {
      float glass = smoothstep(0.95, 0.22, across);
      float bitA = fract(vAlong * 2.1 - uTime * uSpeed);
      float bitB = fract(vAlong * 4.4 - uTime * uSpeed * 1.7 + 0.37);
      float dashA = smoothstep(0.0, 0.05, bitA) * smoothstep(0.48, 0.1, bitA);
      float dashB = smoothstep(0.0, 0.02, bitB) * smoothstep(0.18, 0.04, bitB);
      float body = smoothstep(1.0, 0.02, across);
      float packet = max(dashA, dashB * 0.7) * body;
      vec3 paper = vec3(0.922, 0.902, 0.863);
      vec3 col = mix(dye * 0.72, paper, clamp(packet, 0.0, 1.0));
      float alpha = max(glass * 0.34, packet) * uGain;
      if (alpha < 0.04) discard;
      gl_FragColor = vec4(col, alpha);
      #include <colorspace_fragment>
      return;
    }
    if (uFlow < 0.5) {
      if (road * uGain * fade < 0.04) discard;
      gl_FragColor = vec4(dye, road * uGain * fade);
      #include <colorspace_fragment>
      return;
    }
    float freq = mix(6.5, mix(6.5, 1.7, fall), step(0.5, uFade));
    float x = fract(vAlong * freq - uTime * uSpeed);
    float wing = mix(0.48, 0.0, smoothstep(0.02, 0.46, x)) * reach;
    float arrow = smoothstep(wing + 0.12, wing, across) * smoothstep(0.52, 0.2, x);
    float tip = smoothstep(0.42, 0.05, x) * arrow;
    vec3 col = mix(dye * 0.82, vec3(0.922, 0.902, 0.863), tip);
    float alpha = max(road * 0.55, arrow * 0.95) * uGain * fade;
    if (alpha < 0.04) discard;
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

const MARK = 0.0084;
const LIFT: Record<string, number> = { food: 1.014, auto: 1.021, meds: 1.028, fabric: 1.035 };
const INK = "#c4a574";

function InkLines({ lines }: { lines: { id: string; points: THREE.Vector3[] }[] }) {
  const raised = useMemo(
    () =>
      lines.map((line) => ({
        id: line.id,
        points: line.points.map((point) => point.clone().normalize().multiplyScalar(point.length() + 0.005)),
      })),
    [lines],
  );
  return (
    <>
      {raised.map((line) => (
        <Ribbon key={`ink-${line.id}`} points={line.points} color={INK} width={MARK * 0.38} speed={-0.48} gain={0.66} packet />
      ))}
    </>
  );
}

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

export function Ribbon({
  points,
  color,
  colorB,
  width,
  speed,
  gain,
  flow = true,
  fade = false,
  packet = false,
}: {
  points: THREE.Vector3[];
  color: string;
  colorB?: string;
  width: number;
  speed: number;
  gain: number;
  flow?: boolean;
  fade?: boolean;
  packet?: boolean;
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
      uFade: { value: fade ? 1 : 0 },
      uSpan: { value: span },
      uPacket: { value: packet ? 1 : 0 },
    }),
    [color, colorB, fade, flow, gain, packet, span, speed],
  );
  useFrame(({ clock, camera }) => {
    if (!material.current) return;
    material.current.uniforms.uWidth.value = calmZoom(camera.position.length());
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
    const zoom = calmZoom(camera.position.length()) * 0.22;
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
  if (node.desk === "tools") return ["#c4a574"];
  if (node.desk === "safety") return ["#6aafa6"];
  if (node.desk === "build") return ["#d4a35c"];
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
  useFrame(({ camera, clock }) => {
    const breathe = 1 + Math.sin(clock.elapsedTime * 1.25 + node.lat) * 0.045;
    group.current?.scale.setScalar(calmZoom(camera.position.length()) * 0.7 * breathe);
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
        <sphereGeometry args={[0.012, 14, 14]} />
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
  const goods = useLogistics((state) => state.goods);
  const nets = useLogistics((state) => state.nets);
  const joined = useLogistics((state) => state.joined);
  const customNodes = useLogistics((state) => state.customNodes);
  const customRoutes = useLogistics((state) => state.customRoutes);
  const splits = useLogistics((state) => state.splits);
  const overrides = useLogistics((state) => state.overrides);
  const sun = useMemo(() => ringPoints(0.55, 1.02), []);
  const sunInk = useMemo(() => sun.map((point) => point.clone().normalize().multiplyScalar(1.028)), [sun]);
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
  }, [nets]);
  const visibleNodes = nodes.filter((node) => !node.desk || nets[node.desk]);

  return (
    <group>
      <Ribbon points={sun} color={INK} width={MARK} speed={1.1} gain={0.75} />
      <Ribbon points={sunInk} color="#ebe6dc" width={MARK * 0.34} speed={-0.55} gain={0.5} packet />
      <Arrows points={sun.slice(0, -1)} color="#ebe6dc" speed={0.04} closed />
      {meshes.map((link) => (
        <Ribbon key={link.id} points={link.points} color={link.color} width={MARK} speed={0} gain={0.38} flow={false} />
      ))}
      {arcs.map((arc) => (
        <group key={arc.id}>
          <Ribbon points={arc.points} color={arc.color} width={MARK} speed={arc.speed * 18} gain={arc.gain} />
          <Arrows points={arc.points} color="#ebe6dc" speed={arc.speed} closed={false} />
        </group>
      ))}
      <InkLines lines={arcs} />
      <Beads
        cables={arcs.map((arc) => ({ points: arc.points, color: arc.color, pace: Math.max(0.045, arc.speed), count: 3 }))}
        radius={0.0075}
      />
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
  if (plant.role === "city") return hungerColor(plant.load, arrivingGw(plant.id));
  return "#6aafa6";
}

export function GridNet() {
  const selectNode = useLogistics((state) => state.selectNode);
  const selectedId = useLogistics((state) => state.selectedId);
  const cables = useMemo(
    () =>
      WIRES.flatMap((wire) => {
        const from = PLANTS.find((plant) => plant.id === wire.from);
        const to = PLANTS.find((plant) => plant.id === wire.to);
        if (!from || !to) return [];
        return [
          {
            id: wire.id,
            points: arcBetween(from.lat, from.lon, to.lat, to.lon, 1.012),
            color: "#6aafa6",
            colorB: hungerColor(to.load, wire.gw),
            speed: 0.22 + wire.gw / 10,
          },
        ];
      }),
    [],
  );
  const plants = PLANTS.filter((node) => node.role === "plant");
  const cities = PLANTS.filter((node) => node.role === "city");
  return (
    <group>
      {cables.map((cable) => (
        <Ribbon
          key={cable.id}
          points={cable.points}
          color={cable.color}
          colorB={cable.colorB}
          width={MARK}
          speed={cable.speed}
          gain={1}
          fade
        />
      ))}
      <InkLines lines={cables} />
      <Beads
        cables={cables.map((cable) => ({ points: cable.points, color: cable.color, pace: 0.12, count: 4 }))}
        radius={0.0065}
      />
      {plants.map((plant) => (
        <PlantMark key={plant.id} plant={plant} selected={selectedId === plant.id} onSelect={() => selectNode(selectedId === plant.id ? null : plant.id)} />
      ))}
      {cities.map((city) => (
        <CityHouse key={city.id} city={city} selected={selectedId === city.id} onSelect={() => selectNode(selectedId === city.id ? null : city.id)} />
      ))}
    </group>
  );
}

function CityHouse({ city, selected, onSelect }: { city: Plant; selected: boolean; onSelect: () => void }) {
  const group = useRef<THREE.Group>(null);
  const position = useMemo(() => latLonToXYZ(city.lat, city.lon, 1.02), [city.lat, city.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward), [outward]);
  const color = hungerColor(city.load, arrivingGw(city.id));
  useFrame(({ camera }) => {
    group.current?.scale.setScalar(calmZoom(camera.position.length()) * (selected ? 1.2 : 1));
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
        <boxGeometry args={[0.02, 0.015, 0.016]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.023, 0]} rotation={[0, Math.PI / 4, 0]} raycast={() => undefined}>
        <coneGeometry args={[0.016, 0.012, 4]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {selected ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">
            {city.name} · {city.load} GW
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function PlantMark({ plant, selected, onSelect }: { plant: Plant; selected: boolean; onSelect: () => void }) {
  const group = useRef<THREE.Group>(null);
  const position = useMemo(() => latLonToXYZ(plant.lat, plant.lon, 1.012), [plant.lat, plant.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward), [outward]);
  const disc = useRef<THREE.MeshBasicMaterial>(null);
  const color = plantTone(plant);
  const radius = 0.034 + Math.min(plant.gw, 22) * 0.0035;
  useFrame(({ camera, clock }) => {
    group.current?.scale.setScalar(calmZoom(camera.position.length()));
    if (!disc.current) return;
    const beat = 0.5 + Math.sin(clock.elapsedTime * 0.9 + plant.lat) * 0.5;
    disc.current.opacity = (selected ? 0.28 : 0.12) + beat * 0.14;
  });
  return (
    <group ref={group} position={position}>
      <mesh quaternion={quat} raycast={() => undefined}>
        <circleGeometry args={[radius, 36]} />
        <meshBasicMaterial ref={disc} color={color} transparent opacity={selected ? 0.4 : 0.22} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[0.0084, 12, 12]} />
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
        <Ribbon key={arc.id} points={arc.points} color={arc.color} width={MARK} speed={0.55} gain={0.85} />
      ))}
      <InkLines lines={arcs} />
      <Beads
        cables={arcs.map((arc) => ({ points: arc.points, color: arc.color, pace: 0.1, count: 3 }))}
        radius={0.007}
      />
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

function foodColor(share: number) {
  if (share < 0.3) return "#c4a574";
  if (share < 0.45) return "#d4a35c";
  return "#c46a58";
}

export function WasteNet() {
  const selectNode = useLogistics((state) => state.selectNode);
  const selectedId = useLogistics((state) => state.selectedId);
  const places = [...BINS, ...WASTE_PORTS];
  const lanes = useMemo(
    () =>
      WASTE_LANES.flatMap((lane) => {
        const from = places.find((place) => place.id === lane.from);
        const to = places.find((place) => place.id === lane.to);
        if (!from || !to) return [];
        return [{ id: lane.id, color: wasteColor(lane.kind), points: arcBetween(from.lat, from.lon, to.lat, to.lon, 1.014) }];
      }),
    [],
  );
  return (
    <group>
      {lanes.map((lane) => (
        <Ribbon key={lane.id} points={lane.points} color={lane.color} width={MARK} speed={0.4} gain={0.9} fade />
      ))}
      <InkLines lines={lanes} />
      <Beads
        cables={lanes.map((lane) => ({ points: lane.points, color: lane.color, pace: 0.055, count: 2 }))}
        radius={0.006}
      />
      {places.map((place) => (
        <LifeMark
          key={place.id}
          name={place.kg ? `${place.name} · ${Math.round(place.food * 100)}% food` : place.name}
          lat={place.lat}
          lon={place.lon}
          color={place.kg ? foodColor(place.food) : "#9aa7b2"}
          house={place.kg > 0}
          selected={selectedId === place.id}
          onSelect={() => selectNode(selectedId === place.id ? null : place.id)}
        />
      ))}
    </group>
  );
}

export function AnimalNet() {
  const selectNode = useLogistics((state) => state.selectNode);
  const selectedId = useLogistics((state) => state.selectedId);
  const lanes = useMemo(
    () =>
      ANIMAL_LANES.flatMap((lane) => {
        const from = HERDS.find((herd) => herd.id === lane.from);
        const to = HERDS.find((herd) => herd.id === lane.to);
        if (!from || !to) return [];
        return [{ id: lane.id, color: animalColor(lane.kind), points: arcBetween(from.lat, from.lon, to.lat, to.lon, 1.016) }];
      }),
    [],
  );
  return (
    <group>
      {lanes.map((lane) => (
        <Ribbon key={lane.id} points={lane.points} color={lane.color} width={MARK} speed={0.48} gain={0.9} fade />
      ))}
      <InkLines lines={lanes} />
      <Beads
        cables={lanes.map((lane) => ({ points: lane.points, color: lane.color, pace: 0.09, count: 3 }))}
        radius={0.007}
      />
      {HERDS.map((herd) => (
        <LifeMark
          key={herd.id}
          name={herd.name}
          lat={herd.lat}
          lon={herd.lon}
          color={ANIMAL_LANES.filter((lane) => lane.to === herd.id).length > 1 ? "#c4a574" : animalColor(herd.kind)}
          house={herd.role === "sink"}
          selected={selectedId === herd.id}
          onSelect={() => selectNode(selectedId === herd.id ? null : herd.id)}
        />
      ))}
    </group>
  );
}

function LifeMark({
  name,
  lat,
  lon,
  color,
  house,
  selected,
  onSelect,
}: {
  name: string;
  lat: number;
  lon: number;
  color: string;
  house: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const position = useMemo(() => latLonToXYZ(lat, lon, house ? 1.02 : 1.03), [house, lat, lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const up = house ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(up, outward), [outward, up]);
  useFrame(({ camera }) => {
    group.current?.scale.setScalar(calmZoom(camera.position.length()) * (selected ? 1.15 : 1) * 0.85);
  });
  return (
    <group ref={group} position={position} quaternion={quat}>
      <mesh
        position={house ? [0, 0.01, 0] : [0, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        {house ? <boxGeometry args={[0.02, 0.014, 0.016]} /> : <sphereGeometry args={[0.008, 12, 12]} />}
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {house ? (
        <mesh position={[0, 0.02, 0]} rotation={[0, Math.PI / 4, 0]} raycast={() => undefined}>
          <coneGeometry args={[0.015, 0.012, 4]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ) : null}
      {selected ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{name}</div>
        </Html>
      ) : null}
    </group>
  );
}

export function DataNet() {
  const selectNode = useLogistics((state) => state.selectNode);
  const selectedId = useLogistics((state) => state.selectedId);
  const byId = useMemo(() => new Map(HALLS.map((hall) => [hall.id, hall])), []);
  const cables = useMemo(
    () =>
      GLASS.flatMap((cable) => {
        const from = byId.get(cable.from);
        const to = byId.get(cable.to);
        if (!from || !to) return [];
        const pace = cable.kind === "land" ? 0.09 : cable.kind === "coast" ? 0.16 : 0.22 + Math.min(cable.tbps ?? 40, 400) / 2200;
        const count = cable.kind === "ocean" ? 6 : 3;
        return [
          {
            id: cable.id,
            color: glassColor(cable.kind),
            speed: cable.kind === "land" ? 0.7 : cable.kind === "coast" ? 1.25 : 1.8 + Math.min(cable.tbps ?? 40, 400) / 260,
            pace,
            count,
            points: arcBetween(from.lat, from.lon, to.lat, to.lon, 1.012 + cable.lift * 0.004),
          },
        ];
      }),
    [byId],
  );
  return (
    <group>
      {cables.map((cable) => (
        <Ribbon key={cable.id} points={cable.points} color={cable.color} width={MARK} speed={cable.speed} gain={1} packet />
      ))}
      <InkLines lines={cables} />
      <Beads cables={cables} />
      {HALLS.map((hall) => (
        <DataMark
          key={hall.id}
          hall={hall}
          selected={selectedId === hall.id}
          onSelect={() => selectNode(selectedId === hall.id ? null : hall.id)}
        />
      ))}
    </group>
  );
}

function Beads({
  cables,
  radius = 0.009,
}: {
  cables: { points: THREE.Vector3[]; color: string; pace: number; count: number }[];
  radius?: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const layout = useMemo(() => {
    let total = 0;
    const curves = cables.map((cable) => new THREE.CatmullRomCurve3(cable.points));
    for (const cable of cables) total += cable.count;
    return { curves, total };
  }, [cables]);
  useLayoutEffect(() => {
    const current = mesh.current;
    if (!current) return;
    let index = 0;
    for (const cable of cables) {
      const color = new THREE.Color(cable.color).lerp(new THREE.Color("#ebe6dc"), 0.22);
      for (let i = 0; i < cable.count; i += 1) current.setColorAt(index++, color);
    }
    if (current.instanceColor) current.instanceColor.needsUpdate = true;
  }, [cables]);
  useFrame(({ clock, camera }) => {
    const current = mesh.current;
    if (!current) return;
    const zoom = calmZoom(camera.position.length());
    const time = reduced.current ? 0 : clock.elapsedTime;
    let index = 0;
    for (let c = 0; c < cables.length; c += 1) {
      const curve = layout.curves[c];
      const count = cables[c].count;
      const head = (time * cables[c].pace) % 1;
      for (let i = 0; i < count; i += 1) {
        const t = (head + i / count) % 1;
        dummy.position.copy(curve.getPoint(t));
        dummy.scale.setScalar(zoom * (i === 0 ? 1.15 : 0.72));
        dummy.updateMatrix();
        current.setMatrixAt(index, dummy.matrix);
        index += 1;
      }
    }
    current.instanceMatrix.needsUpdate = true;
  });
  if (layout.total === 0) return null;
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, layout.total]} raycast={() => undefined} frustumCulled={false}>
      <sphereGeometry args={[radius, 10, 10]} />
      <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0.95} depthWrite={false} />
    </instancedMesh>
  );
}

function DataMark({
  hall,
  selected,
  onSelect,
}: {
  hall: (typeof HALLS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const campus = hall.role !== "landing";
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const halo = useRef<THREE.Mesh>(null);
  const haloMat = useRef<THREE.MeshBasicMaterial>(null);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const position = useMemo(() => latLonToXYZ(hall.lat, hall.lon, 1.02), [hall.lat, hall.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward), [outward]);
  useFrame(({ clock, camera }) => {
    group.current?.scale.setScalar(calmZoom(camera.position.length()) * (selected ? 1.12 : 1) * 0.82);
    if (reduced.current) return;
    if (mat.current) {
      const beat = 0.82 + Math.sin(clock.elapsedTime * (campus ? 1.4 : 2.2) + hall.lon * 0.2) * 0.18;
      mat.current.color.setRGB(campus ? 0.86 * beat : 0.54 * beat, campus ? 0.82 * beat : 0.62 * beat, campus ? 0.74 * beat : 0.66 * beat);
    }
    if (campus && halo.current && haloMat.current) {
      const t = (clock.elapsedTime * 0.42 + (hall.lat + 90) * 0.01) % 1;
      const spread = 0.45 + t * 2.4;
      halo.current.scale.setScalar(spread);
      haloMat.current.opacity = (1 - t) * 0.5;
    }
  });
  const label = hall.ix ? `${hall.name} · ${hall.ix}` : hall.name;
  return (
    <group ref={group} position={position} quaternion={quat}>
      <mesh
        position={[0, campus ? 0.016 : 0.004, 0]}
        rotation={campus ? [0, 0, 0] : [Math.PI / 2, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        {campus ? <boxGeometry args={[0.011, 0.028, 0.009]} /> : <torusGeometry args={[0.012, 0.0015, 8, 20]} />}
        <meshBasicMaterial ref={mat} color={campus ? "#d7ddd8" : "#8aa0ae"} toneMapped={false} />
      </mesh>
      {campus ? (
        <mesh ref={halo} position={[0, 0.004, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
          <torusGeometry args={[0.018, 0.0014, 8, 24]} />
          <meshBasicMaterial ref={haloMat} color="#ebe6dc" toneMapped={false} transparent opacity={0} depthWrite={false} />
        </mesh>
      ) : null}
      {hall.role === "both" ? (
        <mesh position={[0, 0.004, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
          <torusGeometry args={[0.016, 0.0013, 8, 20]} />
          <meshBasicMaterial color="#8aa0ae" toneMapped={false} />
        </mesh>
      ) : null}
      {hall.ix ? (
        <mesh position={[0, 0.006, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
          <torusGeometry args={[0.02, 0.0011, 8, 24]} />
          <meshBasicMaterial color="#c4a574" toneMapped={false} />
        </mesh>
      ) : null}
      {selected ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{label}</div>
        </Html>
      ) : null}
    </group>
  );
}
