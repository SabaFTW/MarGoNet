import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { allEvents, findEvent, isChecked } from "@/lib/timeline/events";
import { latLonToXYZ, calmZoom, xyzToLatLon } from "@/lib/timeline/geo";
import { BRASS_HEX, CATEGORY_HEX } from "@/lib/timeline/palette";
import { useTimeline } from "@/lib/timeline/store";
import { useLogistics } from "@/lib/logistics/store";
import { AnimalNet, ChainsNet, DataNet, GridNet, LogisticsNet, WasteNet } from "@/components/globe/LogisticsNet";
import { ConsNet } from "@/components/globe/ConsNet";
import type { Reach, TimelineEvent } from "@/lib/timeline/types";

const SUN = new THREE.Vector3(4.2, 1.55, -1.35).normalize();
const HOME = latLonToXYZ(18, 12, 2.85);

const earthVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vHeight;
  uniform sampler2D heightMap;
  uniform float uRelief;
  void main() {
    vUv = uv;
    float h = texture2D(heightMap, uv).r;
    vHeight = h;
    float lift = smoothstep(0.16, 0.9, h) * 0.03 * uRelief;
    vec3 pos = position + normal * lift;
    vec4 world = modelMatrix * vec4(pos, 1.0);
    vWorld = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const earthFrag = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vHeight;
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D heightMap;
  uniform vec3 sunDir;
  uniform float uRelief;
  void main() {
    vec3 day = sRGBTransferEOTF(vec4(texture2D(dayMap, vUv).rgb, 1.0)).rgb;
    vec3 night = sRGBTransferEOTF(vec4(texture2D(nightMap, vUv).rgb, 1.0)).rgb;
    float luma = dot(day, vec3(0.299, 0.587, 0.114));
    day = mix(vec3(luma), day, 1.38);
    day = pow(max(day, 0.0), vec3(0.94));
    vec3 blow = max(day - vec3(0.78), 0.0);
    day = clamp(day - blow * 0.45, 0.0, 1.0);
    day *= vec3(1.02, 0.99, 0.94);
    float ocean = smoothstep(0.02, 0.22, day.b - day.r);
    day = mix(day, day * vec3(0.22, 0.42, 0.62), ocean * 0.62);
    float hx = texture2D(heightMap, vUv + vec2(0.0016, 0.0)).r;
    float hy = texture2D(heightMap, vUv + vec2(0.0, 0.0016)).r;
    vec3 n = normalize(vNormalW);
    vec3 east = normalize(cross(vec3(0.0, 1.0, 0.0), n));
    if (dot(east, east) < 0.001) east = vec3(1.0, 0.0, 0.0);
    vec3 north = normalize(cross(n, east));
    n = normalize(n + (east * (vHeight - hx) + north * (vHeight - hy)) * 14.0 * uRelief);
    float ndl = dot(n, normalize(sunDir));
    float dayMix = smoothstep(-0.08, 0.22, ndl);
    vec3 color = mix(night * vec3(1.25, 0.82, 0.48) + day * 0.03, day, dayMix);
    vec3 viewDir = normalize(cameraPosition - vWorld);
    vec3 halfDir = normalize(normalize(sunDir) + viewDir);
    float spec = pow(max(dot(n, halfDir), 0.0), 64.0);
    color += spec * ocean * dayMix * 0.1;
    float sunset = smoothstep(0.22, 0.0, abs(ndl));
    color += vec3(0.95, 0.46, 0.18) * sunset * dayMix * 0.28;
    float ridge = smoothstep(0.42, 0.88, vHeight) * uRelief * dayMix;
    color += vec3(0.11, 0.09, 0.07) * ridge;
    float shade = clamp(ndl, 0.0, 1.0);
    color *= mix(0.78, 1.0, shade * 0.35 + 0.65);
    float limb = pow(max(dot(normalize(vNormalW), viewDir), 0.0), 0.55);
    color *= mix(0.7, 1.0, limb);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

const cloudVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const cloudFrag = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  void main() {
    vec4 tex = texture2D(cloudMap, vUv);
    float alpha = max(tex.a, tex.r);
    float ndl = dot(normalize(vNormalW), normalize(sunDir));
    float light = smoothstep(-0.15, 0.45, ndl);
    gl_FragColor = vec4(vec3(0.93, 0.91, 0.86), alpha * (0.02 + 0.14 * light));
    #include <colorspace_fragment>
  }
`;

const atmosVert = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const atmosFrag = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vWorld;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fres = pow(clamp(0.72 - dot(normalize(vNormalW), viewDir), 0.0, 1.0), 2.6);
    gl_FragColor = vec4(vec3(0.5, 0.7, 0.86) * fres, fres * 0.62);
    #include <colorspace_fragment>
  }
`;

type ControlsLike = {
  autoRotate: boolean;
  autoRotateSpeed: number;
  update: () => void;
};

function Stars() {
  const geometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 28 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#ebe6dc" size={0.055} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}

function Earth({ day, night, topo }: { day: THREE.Texture; night: THREE.Texture; topo: THREE.Texture }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      dayMap: { value: day },
      nightMap: { value: night },
      heightMap: { value: topo },
      sunDir: { value: SUN.clone() },
      uRelief: { value: 0 },
    }),
    [day, night, topo],
  );

  useFrame(({ camera }) => {
    if (!material.current) return;
    const distance = camera.position.length();
    const t = Math.min(1, Math.max(0, (2.42 - distance) / 0.78));
    material.current.uniforms.uRelief.value = t * t * (3 - 2 * t);
  });

  return (
    <mesh
      onClick={(pointer) => {
        const logistics = useLogistics.getState();
        if (logistics.mode === "logistics" && logistics.placing) {
          pointer.stopPropagation();
          const local = pointer.object.worldToLocal(pointer.point.clone());
          const { lat, lon } = xyzToLatLon(local.x, local.y, local.z);
          logistics.dropPoint(lat, lon);
          return;
        }
        if (!useTimeline.getState().pinArmed) return;
        pointer.stopPropagation();
        const local = pointer.object.worldToLocal(pointer.point.clone());
        const { lat, lon } = xyzToLatLon(local.x, local.y, local.z);
        useTimeline.getState().setPin({
          lat: Math.round(lat * 100) / 100,
          lon: Math.round(lon * 100) / 100,
        });
      }}
    >
      <sphereGeometry args={[1, 168, 96]} />
      <shaderMaterial ref={material} toneMapped={false} uniforms={uniforms} vertexShader={earthVert} fragmentShader={earthFrag} />
    </mesh>
  );
}

function Clouds({ map }: { map: THREE.Texture }) {
  const ref = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      cloudMap: { value: map },
      sunDir: { value: SUN.clone() },
    }),
    [map],
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += Math.min(delta, 0.05) * 0.012;
  });

  return (
    <mesh ref={ref} scale={1.046}>
      <sphereGeometry args={[1, 64, 40]} />
      <shaderMaterial
        toneMapped={false}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={cloudVert}
        fragmentShader={cloudFrag}
      />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <mesh scale={1.07}>
      <sphereGeometry args={[1, 64, 40]} />
      <shaderMaterial
        toneMapped={false}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        vertexShader={atmosVert}
        fragmentShader={atmosFrag}
      />
    </mesh>
  );
}

const capVert = /* glsl */ `
  varying float vPole;
  void main() {
    vPole = normal.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const capFrag = /* glsl */ `
  varying float vPole;
  uniform vec3 uColor;
  uniform float uAngle;
  uniform float uStrength;
  void main() {
    float theta = acos(clamp(vPole, -1.0, 1.0));
    float soft = smoothstep(uAngle, uAngle * 0.22, theta);
    if (soft < 0.03) discard;
    gl_FragColor = vec4(uColor, soft * uStrength);
    #include <colorspace_fragment>
  }
`;

const REACH_ANGLE: Record<Exclude<Reach, "world">, number> = {
  place: 0.2,
  region: 0.5,
};

function reachOf(event: TimelineEvent): Reach {
  return event.reach ?? "place";
}

function AreaCap({
  event,
  geometry,
  angle,
  strength,
}: {
  event: TimelineEvent;
  geometry: THREE.SphereGeometry;
  angle: number;
  strength: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const pinArmed = useTimeline((state) => state.pinArmed);
  const outward = useMemo(() => new THREE.Vector3(...latLonToXYZ(event.lat, event.lon, 1)).normalize(), [event.lat, event.lon]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward), [outward]);
  const color = useMemo(() => new THREE.Color(CATEGORY_HEX[event.category]), [event.category]);

  useEffect(() => {
    const current = mesh.current;
    if (!current) return;
    current.raycast = pinArmed ? () => undefined : THREE.Mesh.prototype.raycast;
  }, [pinArmed]);

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      quaternion={quat}
      onClick={(pointer) => {
        if (useTimeline.getState().pinArmed) return;
        pointer.stopPropagation();
        useTimeline.getState().select(event.id);
      }}
    >
      <shaderMaterial
        transparent
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uColor: { value: color },
          uAngle: { value: angle },
          uStrength: { value: strength },
        }}
        vertexShader={capVert}
        fragmentShader={capFrag}
      />
    </mesh>
  );
}

function WorldHalo({ event, tilt, radius }: { event: TimelineEvent; tilt: number; radius: number }) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.opacity = 0.28 + Math.sin(clock.elapsedTime * 0.7 + tilt) * 0.06;
  });
  return (
    <mesh rotation={[Math.PI / 2.15 + tilt * 0.22, tilt * 0.4, tilt * 0.08]} raycast={() => undefined} renderOrder={3}>
      <torusGeometry args={[radius, 0.0045, 12, 160]} />
      <meshBasicMaterial
        ref={material}
        color={CATEGORY_HEX[event.category]}
        transparent
        opacity={0.34}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function Marker({
  event,
  active,
  selected,
}: {
  event: TimelineEvent;
  active: boolean;
  selected: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const [hot, setHot] = useState(false);
  const world = useMemo(() => new THREE.Vector3(), []);
  const camDir = useMemo(() => new THREE.Vector3(), []);
  const position = useMemo(() => latLonToXYZ(event.lat, event.lon, 1.02), [event.lat, event.lon]);
  const outward = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);
  const quat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward),
    [outward],
  );
  const color = CATEGORY_HEX[event.category];
  const ring = useRef<THREE.Mesh>(null);
  const ink = useRef<THREE.Mesh>(null);
  const gl = useThree((state) => state.gl);

  useFrame(({ camera, clock }) => {
    if (!group.current) return;
    group.current.getWorldPosition(world);
    camDir.copy(camera.position).normalize();
    group.current.visible = world.normalize().dot(camDir) > 0.12;
    group.current.scale.setScalar(calmZoom(camera.position.length()) * (selected ? 1.15 : 1));
    if (ring.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 1.5 + event.lon * 0.04) * 0.14;
      ring.current.scale.set(pulse, pulse, 1);
    }
    if (!ink.current) return;
    const counter = 1 + Math.sin(clock.elapsedTime * 0.85 + event.lat * 0.05 + 1.4) * 0.1;
    ink.current.scale.set(counter, counter, 1);
  });

  return (
    <group ref={group} position={position}>
      <mesh
        onPointerDown={(pointer) => pointer.stopPropagation()}
        onClick={(pointer) => {
          pointer.stopPropagation();
          useTimeline.getState().select(event.id);
        }}
        onPointerOver={(pointer) => {
          pointer.stopPropagation();
          setHot(true);
          gl.domElement.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHot(false);
          gl.domElement.style.cursor = "";
        }}
      >
        <sphereGeometry args={[active ? 0.012 : 0.007, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 1 : 0.38} toneMapped={false} />
      </mesh>
      {active ? (
        <mesh ref={ring} quaternion={quat}>
          <ringGeometry args={[0.016, 0.019, 40]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} toneMapped={false} />
        </mesh>
      ) : null}
      {active ? (
        <mesh ref={ink} quaternion={quat}>
          <ringGeometry args={[0.021, 0.0232, 48]} />
          <meshBasicMaterial color={BRASS_HEX} side={THREE.DoubleSide} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ) : null}
      {selected ? (
        <mesh quaternion={quat}>
          <ringGeometry args={[0.023, 0.026, 48]} />
          <meshBasicMaterial color={BRASS_HEX} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      ) : null}
      {selected || hot ? (
        <Html position={[0, 0.05, 0]} center distanceFactor={3.2} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}>
          <div className="marker-label">{event.title}</div>
        </Html>
      ) : null}
    </group>
  );
}

function Markers() {
  const year = useTimeline((state) => state.year);
  const checked = useTimeline((state) => state.checked);
  const custom = useTimeline((state) => state.custom);
  const selectedId = useTimeline((state) => state.selectedId);
  const list = useMemo(
    () => allEvents(custom).filter((item) => isChecked(checked, item.id)),
    [checked, custom],
  );
  const placeGeo = useMemo(() => new THREE.SphereGeometry(1.02, 40, 16, 0, Math.PI * 2, 0, REACH_ANGLE.place), []);
  const regionGeo = useMemo(() => new THREE.SphereGeometry(1.02, 56, 22, 0, Math.PI * 2, 0, REACH_ANGLE.region), []);
  const halos = list.filter((item) => reachOf(item) === "world" && item.start <= year && year <= item.end);

  return (
    <>
      {list.map((item) => {
        const active = item.start <= year && year <= item.end;
        const reach = reachOf(item);
        return (
          <group key={item.id}>
            {active && reach !== "world" ? (
              <AreaCap
                event={item}
                geometry={reach === "region" ? regionGeo : placeGeo}
                angle={REACH_ANGLE[reach]}
                strength={item.id === selectedId ? 0.34 : 0.18}
              />
            ) : null}
            <Marker event={item} active={active} selected={item.id === selectedId} />
          </group>
        );
      })}
      {halos.map((item, index) => (
        <WorldHalo key={item.id} event={item} tilt={index - (halos.length - 1) / 2} radius={1.13 + index * 0.055} />
      ))}
    </>
  );
}

function FlyRig({
  controlsRef,
  flying,
  paused,
  goal,
}: {
  controlsRef: RefObject<ControlsLike | null>;
  flying: RefObject<boolean>;
  paused: RefObject<boolean>;
  goal: RefObject<THREE.Vector3>;
}) {
  const camera = useThree((state) => state.camera);
  const spherical = useMemo(() => new THREE.Spherical(), []);
  const goalSpherical = useMemo(() => new THREE.Spherical(), []);
  const reduced = useRef(false);
  const resume = useRef(0);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = controlsRef.current;
    if (controls && !reduced.current && useLogistics.getState().drift) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
    }
  }, [controlsRef]);

  useEffect(() => {
    return useTimeline.subscribe((state, previous) => {
      if (state.focusNonce === previous.focusNonce) return;
      const picked = findEvent(state.custom, state.selectedId);
      if (!picked) return;
      const distance = THREE.MathUtils.clamp(camera.position.length(), 1.7, 4.4);
      const [x, y, z] = latLonToXYZ(picked.lat, picked.lon, distance);
      goal.current.set(x, y, z);
      if (reduced.current) {
        camera.position.set(x, y, z);
        camera.lookAt(0, 0, 0);
        controlsRef.current?.update();
        flying.current = false;
        return;
      }
      flying.current = true;
      paused.current = true;
      window.clearTimeout(resume.current);
    });
  }, [camera, controlsRef, flying, goal, paused]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    const drift = useLogistics.getState().drift;
    if (!flying.current) {
      if (controls) controls.autoRotate = drift && !paused.current && !reduced.current;
      return;
    }
    if (controls) controls.autoRotate = false;
    const step = Math.min(delta, 0.05);
    spherical.setFromVector3(camera.position);
    goalSpherical.setFromVector3(goal.current);
    const k = 1 - Math.pow(0.0006, step);
    const dTheta = Math.atan2(
      Math.sin(goalSpherical.theta - spherical.theta),
      Math.cos(goalSpherical.theta - spherical.theta),
    );
    spherical.theta += dTheta * k;
    spherical.phi = THREE.MathUtils.lerp(spherical.phi, goalSpherical.phi, k);
    spherical.radius = THREE.MathUtils.lerp(spherical.radius, goalSpherical.radius, k);
    camera.position.setFromSpherical(spherical);
    camera.lookAt(0, 0, 0);
    if (camera.position.distanceTo(goal.current) < 0.03) {
      camera.position.copy(goal.current);
      camera.lookAt(0, 0, 0);
      flying.current = false;
      window.clearTimeout(resume.current);
      resume.current = window.setTimeout(() => {
        paused.current = false;
      }, 1600);
    }
  });

  return null;
}

function SceneContents() {
  const [day, night, clouds, topo] = useTexture(["/earth/day.jpg", "/earth/night.png", "/earth/clouds.png", "/earth/topo.png"]);
  const controlsRef = useRef<ControlsLike | null>(null);
  const flying = useRef(false);
  const paused = useRef(false);
  const goal = useRef(new THREE.Vector3());
  const resume = useRef(0);
  const gl = useThree((state) => state.gl);
  const mode = useLogistics((state) => state.mode);
  const layers = useLogistics((state) => state.layers);

  useEffect(() => {
    const max = gl.capabilities.getMaxAnisotropy();
    for (const texture of [day, night, clouds, topo]) {
      texture.colorSpace = THREE.NoColorSpace;
      texture.anisotropy = max;
      texture.needsUpdate = true;
    }
  }, [clouds, day, gl, night, topo]);

  return (
    <>
      <Stars />
      <Earth day={day} night={night} topo={topo} />
      <Clouds map={clouds} />
      <Atmosphere />
      {mode === "history" ? (
        <Markers />
      ) : (
        <>
          {layers.logistics ? <LogisticsNet /> : null}
          {layers.grid ? <GridNet /> : null}
          {layers.materials ? <ChainsNet /> : null}
          {layers.waste ? <WasteNet /> : null}
          {layers.animal ? <AnimalNet /> : null}
          {layers.data ? <DataNet /> : null}
          {layers.cons ? <ConsNet /> : null}
        </>
      )}
      <OrbitControls
        ref={controlsRef as never}
        enablePan={false}
        enableDamping
        dampingFactor={0.12}
        rotateSpeed={0.55}
        zoomSpeed={0.65}
        minDistance={1.55}
        maxDistance={4.8}
        minPolarAngle={0.18}
        maxPolarAngle={Math.PI - 0.18}
        onStart={() => {
          flying.current = false;
          paused.current = true;
          window.clearTimeout(resume.current);
        }}
        onEnd={() => {
          window.clearTimeout(resume.current);
          resume.current = window.setTimeout(() => {
            if (!flying.current) paused.current = false;
          }, 2400);
        }}
      />
      <FlyRig controlsRef={controlsRef} flying={flying} paused={paused} goal={goal} />
    </>
  );
}

export default function EarthScene() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: HOME, fov: 42, near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.NoToneMapping;
      }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}
