export function latLonToXYZ(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  const sinPhi = Math.sin(phi);
  return [
    -radius * sinPhi * Math.cos(theta),
    radius * Math.cos(phi),
    radius * sinPhi * Math.sin(theta),
  ];
}

export function markerZoom(distance: number) {
  const clamped = Math.min(4.8, Math.max(1.45, distance));
  return (clamped / 2.85) ** 1.7;
}

/** Same near/far idea, but capped so a click from far away cannot inflate the mark. */
export function calmZoom(distance: number) {
  return Math.min(1.05, markerZoom(distance));
}

/** A thread while you are in close. Ribbons fatten only once the camera pulls back. */
export function ribbonZoom(distance: number) {
  const clamped = Math.min(4.8, Math.max(1.45, distance));
  const t = Math.max(0, (clamped - 3.15) / (4.8 - 3.15));
  return 0.05 + 1.25 * t * t;
}

export function xyzToLatLon(x: number, y: number, z: number) {
  const radius = Math.hypot(x, y, z) || 1;
  const lat = 90 - (Math.acos(Math.min(1, Math.max(-1, y / radius))) * 180) / Math.PI;
  let lon = (Math.atan2(z, -x) * 180) / Math.PI - 180;
  if (lon > 180) lon -= 360;
  if (lon <= -180) lon += 360;
  return { lat, lon };
}
