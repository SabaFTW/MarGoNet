import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Ribbon } from "@/components/globe/LogisticsNet";
import { RIVERS, SEATS } from "@/lib/logistics/cons";
import { useLogistics } from "@/lib/logistics/store";
import { calmZoom } from "@/lib/timeline/geo";

const MARK = 0.0084;

function ring(axis: THREE.Vector3, angular: number, radius: number, segments = 72) {
  const pole = axis.clone().normalize();
  const tangent = new THREE.Vector3().crossVectors(pole, new THREE.Vector3(0, 1, 0));
  if (tangent.lengthSq() < 1e-4) tangent.crossVectors(pole, new THREE.Vector3(1, 0, 0));
  tangent.normalize();
  const bitangent = new THREE.Vector3().crossVectors(pole, tangent).normalize();
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      pole
        .clone()
        .multiplyScalar(Math.cos(angular))
        .add(tangent.clone().multiplyScalar(Math.sin(angular) * Math.cos(angle)))
        .add(bitangent.clone().multiplyScalar(Math.sin(angular) * Math.sin(angle)))
        .normalize()
        .multiplyScalar(radius),
    );
  }
  return points;
}

function Seat({
  id,
  label,
  point,
  color,
  house,
}: {
  id: string;
  label: string;
  point: THREE.Vector3;
  color: string;
  house: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const selectedId = useLogistics((state) => state.selectedId);
  const selectNode = useLogistics((state) => state.selectNode);
  const selected = selectedId === id;
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), point.clone().normalize()), [point]);
  useFrame(({ camera }) => {
    if (!group.current) return;
    group.current.scale.setScalar(calmZoom(camera.position.length()) * (selected ? 1.12 : 1));
  });
  return (
    <group
      ref={group}
      position={point}
      quaternion={quat}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        selectNode(selected ? null : id);
      }}
    >
      {house ? (
        <mesh position={[0, 0.012, 0]}>
          <boxGeometry args={[0.012, 0.012, 0.012]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ) : (
        <mesh>
          <sphereGeometry args={[0.008, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      )}
      {house ? (
        <mesh position={[0, 0.022, 0]}>
          <coneGeometry args={[0.01, 0.01, 4]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ) : null}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.016, 0.018, 32]} />
        <meshBasicMaterial color="#c4a574" side={THREE.DoubleSide} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      {selected ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{label}</div>
        </Html>
      ) : null}
    </group>
  );
}

function MouseBead({ points }: { points: THREE.Vector3[] }) {
  const mesh = useRef<THREE.Mesh>(null);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useFrame(({ clock, camera }) => {
    if (!mesh.current || points.length < 2) return;
    const zoom = calmZoom(camera.position.length());
    const t = reduced.current ? 0.2 : (clock.elapsedTime * 0.045) % 1;
    const index = Math.floor(t * (points.length - 1));
    const next = Math.min(points.length - 1, index + 1);
    const local = t * (points.length - 1) - index;
    mesh.current.position.lerpVectors(points[index], points[next], local);
    mesh.current.scale.setScalar(zoom);
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.007, 12, 12]} />
      <meshBasicMaterial color="#ebe6dc" toneMapped={false} />
    </mesh>
  );
}

export function ConsNet() {
  const rivers = useMemo(() => {
    const pillar = ring(new THREE.Vector3(0.15, 1, 0.05), 1.05, 1.02);
    return {
      pillar,
      clean: ring(new THREE.Vector3(1, 0.25, 0.35), 0.82, 1.026),
      muddy: ring(new THREE.Vector3(0.2, 0.55, 1), 1.2, 1.018),
      stone: ring(new THREE.Vector3(0.85, 0.2, -0.45), 0.62, 1.03),
      symbolic: ring(new THREE.Vector3(-0.35, 0.7, 0.75), 1.35, 1.034),
      seats: [0.12, 0.46, 0.78].map((t) => pillar[Math.floor(t * (pillar.length - 1))].clone()),
    };
  }, []);
  return (
    <group>
      <Ribbon points={rivers.pillar} color={RIVERS[0].color} width={MARK * 0.7} speed={0.22} gain={0.55} />
      <Ribbon points={rivers.clean} color={RIVERS[1].color} width={MARK * 0.45} speed={0.7} gain={0.8} />
      <Ribbon points={rivers.muddy} color={RIVERS[2].color} width={MARK * 0.55} speed={0.28} gain={0.7} fade />
      <Ribbon points={rivers.stone} color={RIVERS[3].color} width={MARK * 0.36} speed={0.08} gain={0.85} flow={false} />
      <Ribbon points={rivers.symbolic} color={RIVERS[4].color} width={MARK * 0.42} speed={1.15} gain={0.85} packet />
      <MouseBead points={rivers.symbolic} />
      {SEATS.map((seat, index) => (
        <Seat key={seat.id} id={seat.id} label={seat.label} point={rivers.seats[index]} color={seat.color} house={seat.id !== "mouse"} />
      ))}
    </group>
  );
}
