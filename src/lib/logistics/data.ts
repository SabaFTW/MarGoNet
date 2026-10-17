import { latLonToXYZ } from "@/lib/timeline/geo";

export type Commodity = "food" | "auto" | "meds" | "fabric";

export const COMMODITIES: { id: Commodity; label: string; hint: string; color: string }[] = [
  { id: "food", label: "Food", hint: "Local first", color: "#e08a3c" },
  { id: "auto", label: "Auto", hint: "Use, repair, strip, melt", color: "#d4534a" },
  { id: "meds", label: "Meds", hint: "Hospitals before hubs", color: "#3eae72" },
  { id: "fabric", label: "Fabric", hint: "Cloth, not costume", color: "#4c8dff" },
];

export type StockKey = "food" | "meds" | "construction" | "parts" | "energy" | "nuclear" | "coal" | "green";

export type SupplyNode = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  food: number;
  meds: number;
  construction: number;
  parts: number;
  energy: number;
  nuclear: number;
  coal: number;
  green: number;
  scale: number;
  solo?: boolean;
  custom?: boolean;
  desk?: "tools" | "safety" | "build" | "ore";
};

export type SupplyRoute = {
  id: string;
  from: string;
  to: string;
  commodity: Commodity;
  join?: boolean;
};

export type PlanStep = {
  id: string;
  title: string;
  body: string;
};

/** Relative sketch of what is on hand, not what a country could someday make. */
export const NODES: SupplyNode[] = [
  { id: "nairobi", name: "Nairobi", lat: -1.29, lon: 36.82, food: 38, meds: 28, construction: 22, parts: 18, energy: 30, nuclear: 0, coal: 15, green: 48, scale: 8 },
  { id: "zagreb", name: "Zagreb", lat: 45.81, lon: 15.98, food: 55, meds: 40, construction: 38, parts: 30, energy: 36, nuclear: 15, coal: 40, green: 42, scale: 16 },
  { id: "ljubljana", name: "Ljubljana", lat: 46.06, lon: 14.51, food: 62, meds: 48, construction: 40, parts: 35, energy: 44, nuclear: 20, coal: 28, green: 61, scale: 18 },
  { id: "telaviv", name: "Tel Aviv", lat: 32.08, lon: 34.78, food: 42, meds: 74, construction: 48, parts: 55, energy: 40, nuclear: 0, coal: 18, green: 34, scale: 20, solo: true },
  { id: "vienna", name: "Vienna", lat: 48.21, lon: 16.37, food: 58, meds: 70, construction: 55, parts: 48, energy: 60, nuclear: 10, coal: 22, green: 68, scale: 22 },
  { id: "prague", name: "Prague", lat: 50.08, lon: 14.44, food: 50, meds: 52, construction: 48, parts: 60, energy: 49, nuclear: 35, coal: 48, green: 40, scale: 24 },
  { id: "stuttgart", name: "Stuttgart", lat: 48.78, lon: 9.18, food: 36, meds: 44, construction: 52, parts: 80, energy: 50, nuclear: 18, coal: 34, green: 52, scale: 28 },
  { id: "rotterdam", name: "Rotterdam", lat: 51.92, lon: 4.48, food: 40, meds: 60, construction: 50, parts: 66, energy: 52, nuclear: 8, coal: 30, green: 50, scale: 30 },
  { id: "berlin", name: "Berlin", lat: 52.52, lon: 13.4, food: 54, meds: 72, construction: 60, parts: 70, energy: 58, nuclear: 12, coal: 38, green: 55, scale: 48 },
  { id: "moscow", name: "Moscow", lat: 55.75, lon: 37.62, food: 60, meds: 50, construction: 55, parts: 58, energy: 78, nuclear: 70, coal: 50, green: 28, scale: 70 },
  { id: "houston", name: "Houston", lat: 29.76, lon: -95.37, food: 74, meds: 68, construction: 70, parts: 72, energy: 80, nuclear: 55, coal: 44, green: 36, scale: 86 },
  { id: "shanghai", name: "Shanghai", lat: 31.23, lon: 121.47, food: 70, meds: 66, construction: 80, parts: 90, energy: 75, nuclear: 40, coal: 62, green: 38, scale: 90 },
  { id: "santos", name: "Santos", lat: -23.96, lon: -46.33, food: 84, meds: 36, construction: 40, parts: 28, energy: 48, nuclear: 8, coal: 22, green: 46, scale: 34 },
  { id: "neworleans", name: "New Orleans", lat: 29.95, lon: -90.07, food: 80, meds: 34, construction: 42, parts: 30, energy: 55, nuclear: 12, coal: 36, green: 30, scale: 32 },
  { id: "constanta", name: "Constanța", lat: 44.18, lon: 28.63, food: 72, meds: 30, construction: 36, parts: 24, energy: 40, nuclear: 6, coal: 42, green: 28, scale: 18 },
  { id: "fremantle", name: "Fremantle", lat: -32.05, lon: 115.74, food: 78, meds: 32, construction: 38, parts: 26, energy: 50, nuclear: 0, coal: 20, green: 52, scale: 20 },
  { id: "nagoya", name: "Nagoya", lat: 35.18, lon: 136.91, food: 34, meds: 40, construction: 55, parts: 88, energy: 62, nuclear: 30, coal: 40, green: 36, scale: 54 },
  { id: "ulsan", name: "Ulsan", lat: 35.54, lon: 129.31, food: 30, meds: 36, construction: 58, parts: 86, energy: 64, nuclear: 28, coal: 46, green: 32, scale: 46 },
  { id: "veracruz", name: "Veracruz", lat: 19.2, lon: -96.13, food: 48, meds: 32, construction: 40, parts: 70, energy: 42, nuclear: 4, coal: 28, green: 34, scale: 26 },
  { id: "losangeles", name: "Los Angeles", lat: 33.74, lon: -118.27, food: 46, meds: 58, construction: 52, parts: 64, energy: 60, nuclear: 10, coal: 24, green: 44, scale: 62 },
  { id: "newark", name: "Newark", lat: 40.69, lon: -74.17, food: 44, meds: 76, construction: 48, parts: 60, energy: 58, nuclear: 16, coal: 26, green: 40, scale: 58 },
  { id: "basel", name: "Basel", lat: 47.56, lon: 7.59, food: 28, meds: 90, construction: 34, parts: 30, energy: 48, nuclear: 8, coal: 12, green: 64, scale: 22 },
  { id: "mumbai", name: "Mumbai", lat: 19.08, lon: 72.88, food: 52, meds: 84, construction: 46, parts: 40, energy: 50, nuclear: 18, coal: 48, green: 30, scale: 64 },
  { id: "singapore", name: "Singapore", lat: 1.26, lon: 103.84, food: 36, meds: 62, construction: 44, parts: 68, energy: 58, nuclear: 0, coal: 18, green: 42, scale: 36 },
  { id: "chittagong", name: "Chittagong", lat: 22.34, lon: 91.83, food: 40, meds: 28, construction: 70, parts: 22, energy: 36, nuclear: 0, coal: 34, green: 26, scale: 28 },
  { id: "guangzhou", name: "Guangzhou", lat: 23.13, lon: 113.26, food: 38, meds: 44, construction: 82, parts: 74, energy: 66, nuclear: 22, coal: 55, green: 30, scale: 72 },
  { id: "istanbul", name: "Istanbul", lat: 41.01, lon: 28.98, food: 46, meds: 42, construction: 64, parts: 36, energy: 48, nuclear: 0, coal: 38, green: 32, scale: 40 },
  { id: "hochiminh", name: "Ho Chi Minh", lat: 10.78, lon: 106.7, food: 50, meds: 34, construction: 68, parts: 32, energy: 44, nuclear: 0, coal: 30, green: 34, scale: 38 },
  { id: "bangkok", name: "Bangkok", lat: 13.76, lon: 100.5, food: 64, meds: 38, construction: 48, parts: 36, energy: 46, nuclear: 0, coal: 32, green: 30, scale: 36 },
  { id: "delhi", name: "Delhi", lat: 28.61, lon: 77.21, food: 48, meds: 58, construction: 44, parts: 34, energy: 42, nuclear: 12, coal: 52, green: 28, scale: 58 },
  { id: "stpetersburg", name: "Saint Petersburg", lat: 59.93, lon: 30.34, food: 44, meds: 52, construction: 40, parts: 48, energy: 56, nuclear: 22, coal: 36, green: 30, scale: 32 },
  { id: "novorossiysk", name: "Novorossiysk", lat: 44.72, lon: 37.77, food: 70, meds: 24, construction: 30, parts: 22, energy: 38, nuclear: 0, coal: 28, green: 26, scale: 16 },
  { id: "yekaterinburg", name: "Yekaterinburg", lat: 56.84, lon: 60.61, food: 36, meds: 32, construction: 48, parts: 62, energy: 64, nuclear: 18, coal: 46, green: 24, scale: 28 },
  { id: "novosibirsk", name: "Novosibirsk", lat: 55.03, lon: 82.92, food: 52, meds: 30, construction: 36, parts: 40, energy: 58, nuclear: 8, coal: 54, green: 22, scale: 22 },
  { id: "vladivostok", name: "Vladivostok", lat: 43.12, lon: 131.89, food: 34, meds: 28, construction: 32, parts: 44, energy: 40, nuclear: 4, coal: 40, green: 24, scale: 14 },
  { id: "chicago", name: "Chicago", lat: 41.88, lon: -87.63, food: 78, meds: 64, construction: 58, parts: 70, energy: 66, nuclear: 30, coal: 34, green: 32, scale: 60 },
  { id: "detroit", name: "Detroit", lat: 42.33, lon: -83.05, food: 32, meds: 36, construction: 40, parts: 84, energy: 52, nuclear: 14, coal: 30, green: 28, scale: 34 },
  { id: "seattle", name: "Seattle", lat: 47.61, lon: -122.33, food: 42, meds: 48, construction: 46, parts: 58, energy: 60, nuclear: 6, coal: 12, green: 58, scale: 30 },
  { id: "buenosaires", name: "Buenos Aires", lat: -34.6, lon: -58.38, food: 76, meds: 40, construction: 38, parts: 30, energy: 46, nuclear: 10, coal: 16, green: 40, scale: 32 },
  { id: "jeddah", name: "Jeddah", lat: 21.49, lon: 39.19, food: 36, meds: 44, construction: 50, parts: 28, energy: 48, nuclear: 0, coal: 18, green: 22, scale: 26 },
  { id: "dubai", name: "Dubai", lat: 25.2, lon: 55.27, food: 30, meds: 56, construction: 62, parts: 58, energy: 64, nuclear: 8, coal: 10, green: 34, scale: 38 },
  { id: "doha", name: "Doha", lat: 25.29, lon: 51.53, food: 22, meds: 40, construction: 48, parts: 34, energy: 70, nuclear: 0, coal: 8, green: 26, scale: 18 },
  { id: "suez", name: "Suez", lat: 29.97, lon: 32.55, food: 28, meds: 26, construction: 34, parts: 30, energy: 36, nuclear: 0, coal: 22, green: 24, scale: 16 },
  { id: "tangier", name: "Tangier", lat: 35.76, lon: -5.83, food: 40, meds: 24, construction: 36, parts: 22, energy: 32, nuclear: 0, coal: 20, green: 30, scale: 14 },
  { id: "mombasa", name: "Mombasa", lat: -4.04, lon: 39.67, food: 46, meds: 22, construction: 28, parts: 18, energy: 30, nuclear: 0, coal: 14, green: 36, scale: 12 },
  { id: "lagos", name: "Lagos", lat: 6.45, lon: 3.4, food: 42, meds: 26, construction: 34, parts: 24, energy: 32, nuclear: 0, coal: 18, green: 22, scale: 40 },
  { id: "durban", name: "Durban", lat: -29.86, lon: 31.02, food: 48, meds: 30, construction: 36, parts: 28, energy: 44, nuclear: 12, coal: 48, green: 26, scale: 20 },
  { id: "davidson", name: "Davidson", lat: 35.5, lon: -80.85, food: 24, meds: 20, construction: 30, parts: 74, energy: 48, nuclear: 8, coal: 30, green: 32, scale: 18, desk: "tools" },
  { id: "frankfurt", name: "Frankfurt", lat: 50.11, lon: 8.68, food: 30, meds: 36, construction: 40, parts: 68, energy: 56, nuclear: 10, coal: 28, green: 40, scale: 28, desk: "tools" },
  { id: "bengaluru", name: "Bengaluru", lat: 12.97, lon: 77.59, food: 34, meds: 40, construction: 36, parts: 62, energy: 44, nuclear: 6, coal: 46, green: 28, scale: 36, desk: "tools" },
  { id: "saopaulo", name: "São Paulo", lat: -23.55, lon: -46.63, food: 48, meds: 42, construction: 50, parts: 60, energy: 62, nuclear: 8, coal: 18, green: 44, scale: 70, desk: "tools" },
  { id: "milan", name: "Milan", lat: 45.46, lon: 9.19, food: 28, meds: 34, construction: 38, parts: 70, energy: 50, nuclear: 6, coal: 16, green: 42, scale: 26, desk: "tools" },
  { id: "johannesburg", name: "Johannesburg", lat: -26.2, lon: 28.05, food: 30, meds: 28, construction: 40, parts: 58, energy: 46, nuclear: 8, coal: 52, green: 24, scale: 32, desk: "tools" },
  { id: "oslo", name: "Oslo", lat: 59.91, lon: 10.75, food: 40, meds: 48, construction: 34, parts: 30, energy: 84, nuclear: 0, coal: 6, green: 78, scale: 18, desk: "safety" },
  { id: "hongkong", name: "Hong Kong", lat: 22.32, lon: 114.17, food: 28, meds: 36, construction: 44, parts: 40, energy: 50, nuclear: 0, coal: 22, green: 24, scale: 30, desk: "safety" },
  { id: "vancouver", name: "Vancouver", lat: 49.28, lon: -123.12, food: 36, meds: 34, construction: 40, parts: 32, energy: 58, nuclear: 0, coal: 8, green: 62, scale: 20, desk: "safety" },
  { id: "auckland", name: "Auckland", lat: -36.85, lon: 174.76, food: 38, meds: 30, construction: 36, parts: 24, energy: 42, nuclear: 0, coal: 10, green: 56, scale: 14, desk: "safety" },
  { id: "heidelberg", name: "Heidelberg", lat: 49.41, lon: 8.71, food: 26, meds: 30, construction: 86, parts: 28, energy: 46, nuclear: 4, coal: 24, green: 36, scale: 16, desk: "build" },
  { id: "monterrey", name: "Monterrey", lat: 25.67, lon: -100.31, food: 32, meds: 28, construction: 80, parts: 36, energy: 52, nuclear: 0, coal: 26, green: 30, scale: 28, desk: "build" },
  { id: "dublin", name: "Dublin", lat: 53.35, lon: -6.26, food: 34, meds: 32, construction: 74, parts: 26, energy: 44, nuclear: 0, coal: 18, green: 40, scale: 18, desk: "build" },
  { id: "nanjing", name: "Nanjing", lat: 32.06, lon: 118.78, food: 40, meds: 30, construction: 82, parts: 44, energy: 60, nuclear: 8, coal: 50, green: 26, scale: 40, desk: "build" },
  { id: "porthedland", name: "Port Hedland", lat: -20.31, lon: 118.58, food: 18, meds: 12, construction: 24, parts: 20, energy: 36, nuclear: 0, coal: 22, green: 30, scale: 8, desk: "ore" },
  { id: "kiruna", name: "Kiruna", lat: 67.86, lon: 20.23, food: 16, meds: 14, construction: 22, parts: 18, energy: 40, nuclear: 0, coal: 10, green: 48, scale: 6, desk: "ore" },
  { id: "antofagasta", name: "Antofagasta", lat: -23.65, lon: -70.4, food: 20, meds: 16, construction: 28, parts: 18, energy: 42, nuclear: 0, coal: 20, green: 34, scale: 10, desk: "ore" },
  { id: "kolwezi", name: "Kolwezi", lat: -10.71, lon: 25.47, food: 18, meds: 10, construction: 20, parts: 14, energy: 22, nuclear: 0, coal: 16, green: 20, scale: 8, desk: "ore" },
  { id: "sudbury", name: "Sudbury", lat: 46.49, lon: -81.01, food: 22, meds: 18, construction: 30, parts: 26, energy: 38, nuclear: 4, coal: 14, green: 36, scale: 8, desk: "ore" },
  { id: "paris", name: "Paris", lat: 48.86, lon: 2.35, food: 46, meds: 70, construction: 48, parts: 40, energy: 82, nuclear: 74, coal: 8, green: 46, scale: 64 },
  { id: "london", name: "London", lat: 51.51, lon: -0.13, food: 34, meds: 64, construction: 42, parts: 38, energy: 48, nuclear: 16, coal: 14, green: 42, scale: 66 },
  { id: "beijing", name: "Beijing", lat: 39.9, lon: 116.41, food: 52, meds: 48, construction: 70, parts: 60, energy: 72, nuclear: 18, coal: 58, green: 28, scale: 80 },
  { id: "tokyo", name: "Tokyo", lat: 35.68, lon: 139.69, food: 30, meds: 62, construction: 50, parts: 66, energy: 58, nuclear: 12, coal: 26, green: 34, scale: 84 },
];

export const ROUTES: SupplyRoute[] = [
  { id: "food-1", from: "ljubljana", to: "zagreb", commodity: "food" },
  { id: "food-2", from: "zagreb", to: "vienna", commodity: "food" },
  { id: "food-3", from: "vienna", to: "ljubljana", commodity: "food" },
  { id: "meds-1", from: "ljubljana", to: "berlin", commodity: "meds" },
  { id: "meds-2", from: "berlin", to: "prague", commodity: "meds" },
  { id: "meds-3", from: "prague", to: "ljubljana", commodity: "meds" },
  { id: "fabric-1", from: "rotterdam", to: "prague", commodity: "fabric" },
  { id: "fabric-2", from: "prague", to: "vienna", commodity: "fabric" },
  { id: "fabric-3", from: "vienna", to: "rotterdam", commodity: "fabric" },
  { id: "auto-1", from: "stuttgart", to: "prague", commodity: "auto" },
  { id: "auto-2", from: "prague", to: "ljubljana", commodity: "auto" },
  { id: "auto-3", from: "ljubljana", to: "stuttgart", commodity: "auto" },
  { id: "join-1", from: "rotterdam", to: "telaviv", commodity: "fabric", join: true },
  { id: "food-santos", from: "santos", to: "rotterdam", commodity: "food" },
  { id: "food-orleans", from: "neworleans", to: "rotterdam", commodity: "food" },
  { id: "food-constanta", from: "constanta", to: "rotterdam", commodity: "food" },
  { id: "food-fremantle", from: "fremantle", to: "shanghai", commodity: "food" },
  { id: "auto-nagoya", from: "nagoya", to: "losangeles", commodity: "auto" },
  { id: "auto-ulsan", from: "ulsan", to: "losangeles", commodity: "auto" },
  { id: "auto-shanghai", from: "shanghai", to: "singapore", commodity: "auto" },
  { id: "auto-singapore", from: "singapore", to: "rotterdam", commodity: "auto" },
  { id: "auto-veracruz", from: "veracruz", to: "houston", commodity: "auto" },
  { id: "auto-stuttgart-port", from: "stuttgart", to: "rotterdam", commodity: "auto" },
  { id: "meds-basel", from: "basel", to: "rotterdam", commodity: "meds" },
  { id: "meds-mumbai-nairobi", from: "mumbai", to: "nairobi", commodity: "meds" },
  { id: "meds-mumbai-rotterdam", from: "mumbai", to: "rotterdam", commodity: "meds" },
  { id: "meds-newark", from: "newark", to: "rotterdam", commodity: "meds" },
  { id: "fabric-chittagong", from: "chittagong", to: "rotterdam", commodity: "fabric" },
  { id: "fabric-guangzhou", from: "guangzhou", to: "losangeles", commodity: "fabric" },
  { id: "fabric-hcmc", from: "hochiminh", to: "losangeles", commodity: "fabric" },
  { id: "fabric-istanbul", from: "istanbul", to: "vienna", commodity: "fabric" },
  { id: "asia-food-1", from: "bangkok", to: "hochiminh", commodity: "food" },
  { id: "asia-food-2", from: "hochiminh", to: "guangzhou", commodity: "food" },
  { id: "asia-food-3", from: "guangzhou", to: "shanghai", commodity: "food" },
  { id: "asia-auto-1", from: "nagoya", to: "ulsan", commodity: "auto" },
  { id: "asia-auto-2", from: "ulsan", to: "shanghai", commodity: "auto" },
  { id: "asia-fabric-1", from: "chittagong", to: "bangkok", commodity: "fabric" },
  { id: "asia-fabric-2", from: "bangkok", to: "hochiminh", commodity: "fabric" },
  { id: "asia-meds-1", from: "mumbai", to: "delhi", commodity: "meds" },
  { id: "asia-meds-2", from: "delhi", to: "singapore", commodity: "meds" },
  { id: "ru-food-1", from: "novorossiysk", to: "moscow", commodity: "food" },
  { id: "ru-food-2", from: "novosibirsk", to: "moscow", commodity: "food" },
  { id: "ru-auto-1", from: "yekaterinburg", to: "moscow", commodity: "auto" },
  { id: "ru-auto-2", from: "vladivostok", to: "novosibirsk", commodity: "auto" },
  { id: "ru-auto-3", from: "moscow", to: "stpetersburg", commodity: "auto" },
  { id: "ru-meds-1", from: "stpetersburg", to: "moscow", commodity: "meds" },
  { id: "us-food-1", from: "neworleans", to: "chicago", commodity: "food" },
  { id: "us-food-2", from: "chicago", to: "newark", commodity: "food" },
  { id: "us-auto-1", from: "detroit", to: "chicago", commodity: "auto" },
  { id: "us-auto-2", from: "chicago", to: "newark", commodity: "auto" },
  { id: "us-meds-1", from: "newark", to: "chicago", commodity: "meds" },
  { id: "us-fabric-1", from: "losangeles", to: "seattle", commodity: "fabric" },
  { id: "us-fabric-2", from: "seattle", to: "chicago", commodity: "fabric" },
  { id: "sa-food-1", from: "buenosaires", to: "santos", commodity: "food" },
  { id: "ar-food-1", from: "jeddah", to: "suez", commodity: "food" },
  { id: "ar-meds-1", from: "dubai", to: "jeddah", commodity: "meds" },
  { id: "ar-meds-2", from: "doha", to: "dubai", commodity: "meds" },
  { id: "ar-fabric-1", from: "tangier", to: "suez", commodity: "fabric" },
  { id: "ar-fabric-2", from: "suez", to: "istanbul", commodity: "fabric" },
  { id: "ar-auto-1", from: "dubai", to: "doha", commodity: "auto" },
  { id: "af-food-1", from: "mombasa", to: "nairobi", commodity: "food" },
  { id: "af-food-2", from: "durban", to: "mombasa", commodity: "food" },
  { id: "af-meds-1", from: "mombasa", to: "nairobi", commodity: "meds" },
  { id: "af-fabric-1", from: "lagos", to: "durban", commodity: "fabric" },
];

export type MeshKind = "tools" | "safety" | "build" | "ore" | "grid";

export const MESHES: { id: MeshKind; label: string; hint: string; color: string }[] = [
  { id: "tools", label: "Ingersoll Rand", hint: "Desks you can call", color: "#e0b15a" },
  { id: "safety", label: "Helly Hansen", hint: "Safety gear", color: "#6eb7c8" },
  { id: "build", label: "Construction", hint: "Cement and stone", color: "#d08a4c" },
  { id: "ore", label: "Raw ore", hint: "Intake, not a factory", color: "#b08968" },
  { id: "grid", label: "Electrogrid", hint: "Access, power, load", color: "#7ddec4" },
];

export type MeshLink = { id: string; from: string; to: string; kind: MeshKind };

export const MESH_LINKS: MeshLink[] = [
  { id: "ir-1", from: "davidson", to: "frankfurt", kind: "tools" },
  { id: "ir-2", from: "davidson", to: "saopaulo", kind: "tools" },
  { id: "ir-3", from: "davidson", to: "bengaluru", kind: "tools" },
  { id: "ir-4", from: "davidson", to: "shanghai", kind: "tools" },
  { id: "ir-5", from: "davidson", to: "houston", kind: "tools" },
  { id: "ir-6", from: "frankfurt", to: "milan", kind: "tools" },
  { id: "ir-7", from: "bengaluru", to: "dubai", kind: "tools" },
  { id: "ir-8", from: "shanghai", to: "tokyo", kind: "tools" },
  { id: "ir-9", from: "saopaulo", to: "johannesburg", kind: "tools" },
  { id: "hh-1", from: "oslo", to: "seattle", kind: "safety" },
  { id: "hh-2", from: "oslo", to: "hongkong", kind: "safety" },
  { id: "hh-3", from: "seattle", to: "vancouver", kind: "safety" },
  { id: "hh-4", from: "oslo", to: "rotterdam", kind: "safety" },
  { id: "hh-5", from: "hongkong", to: "auckland", kind: "safety" },
  { id: "hh-6", from: "seattle", to: "losangeles", kind: "safety" },
  { id: "build-1", from: "heidelberg", to: "dublin", kind: "build" },
  { id: "build-2", from: "heidelberg", to: "rotterdam", kind: "build" },
  { id: "build-3", from: "monterrey", to: "houston", kind: "build" },
  { id: "build-4", from: "nanjing", to: "shanghai", kind: "build" },
  { id: "ore-1", from: "porthedland", to: "shanghai", kind: "ore" },
  { id: "ore-2", from: "kiruna", to: "rotterdam", kind: "ore" },
  { id: "ore-3", from: "antofagasta", to: "houston", kind: "ore" },
  { id: "ore-4", from: "kolwezi", to: "durban", kind: "ore" },
  { id: "ore-5", from: "sudbury", to: "chicago", kind: "ore" },
  { id: "grid-brit", from: "london", to: "paris", kind: "grid" },
  { id: "grid-britned", from: "london", to: "rotterdam", kind: "grid" },
  { id: "grid-fr-nl", from: "paris", to: "rotterdam", kind: "grid" },
  { id: "grid-fr-de", from: "paris", to: "stuttgart", kind: "grid" },
  { id: "grid-nordlink", from: "oslo", to: "rotterdam", kind: "grid" },
  { id: "grid-de-1", from: "rotterdam", to: "berlin", kind: "grid" },
  { id: "grid-de-2", from: "berlin", to: "prague", kind: "grid" },
  { id: "grid-ce-1", from: "prague", to: "vienna", kind: "grid" },
  { id: "grid-ce-2", from: "vienna", to: "ljubljana", kind: "grid" },
  { id: "grid-ce-3", from: "ljubljana", to: "zagreb", kind: "grid" },
  { id: "grid-ru-1", from: "stpetersburg", to: "moscow", kind: "grid" },
  { id: "grid-ru-2", from: "moscow", to: "yekaterinburg", kind: "grid" },
  { id: "grid-ru-3", from: "yekaterinburg", to: "novosibirsk", kind: "grid" },
  { id: "grid-us-1", from: "seattle", to: "losangeles", kind: "grid" },
  { id: "grid-us-2", from: "seattle", to: "chicago", kind: "grid" },
  { id: "grid-us-3", from: "detroit", to: "chicago", kind: "grid" },
  { id: "grid-us-4", from: "chicago", to: "newark", kind: "grid" },
  { id: "grid-us-5", from: "chicago", to: "houston", kind: "grid" },
  { id: "grid-us-6", from: "houston", to: "neworleans", kind: "grid" },
  { id: "grid-cn-1", from: "beijing", to: "shanghai", kind: "grid" },
  { id: "grid-cn-2", from: "shanghai", to: "nanjing", kind: "grid" },
  { id: "grid-cn-3", from: "shanghai", to: "guangzhou", kind: "grid" },
  { id: "grid-in-1", from: "delhi", to: "mumbai", kind: "grid" },
  { id: "grid-gulf-1", from: "dubai", to: "doha", kind: "grid" },
  { id: "grid-gulf-2", from: "doha", to: "jeddah", kind: "grid" },
  { id: "grid-gulf-3", from: "jeddah", to: "suez", kind: "grid" },
  { id: "grid-af-1", from: "mombasa", to: "nairobi", kind: "grid" },
  { id: "grid-br-1", from: "saopaulo", to: "santos", kind: "grid" },
  { id: "grid-jp-1", from: "tokyo", to: "nagoya", kind: "grid" },
];

const GRID: Record<string, { power: number; load: number; access: number }> = {
  oslo: { power: 84, load: 46, access: 78 },
  paris: { power: 82, load: 64, access: 86 },
  london: { power: 48, load: 62, access: 74 },
  rotterdam: { power: 52, load: 58, access: 84 },
  berlin: { power: 58, load: 63, access: 80 },
  stuttgart: { power: 50, load: 54, access: 76 },
  prague: { power: 49, load: 52, access: 70 },
  vienna: { power: 60, load: 50, access: 74 },
  ljubljana: { power: 44, load: 40, access: 62 },
  zagreb: { power: 36, load: 42, access: 54 },
  moscow: { power: 78, load: 60, access: 58 },
  stpetersburg: { power: 56, load: 48, access: 52 },
  yekaterinburg: { power: 64, load: 50, access: 40 },
  novosibirsk: { power: 58, load: 46, access: 34 },
  seattle: { power: 60, load: 48, access: 70 },
  losangeles: { power: 58, load: 66, access: 72 },
  chicago: { power: 66, load: 70, access: 80 },
  detroit: { power: 52, load: 48, access: 66 },
  newark: { power: 50, load: 74, access: 78 },
  houston: { power: 80, load: 74, access: 76 },
  neworleans: { power: 55, load: 50, access: 60 },
  beijing: { power: 72, load: 84, access: 70 },
  shanghai: { power: 75, load: 90, access: 74 },
  nanjing: { power: 60, load: 70, access: 64 },
  guangzhou: { power: 68, load: 82, access: 66 },
  delhi: { power: 48, load: 80, access: 48 },
  mumbai: { power: 55, load: 78, access: 52 },
  dubai: { power: 70, load: 66, access: 50 },
  doha: { power: 74, load: 60, access: 46 },
  jeddah: { power: 58, load: 64, access: 42 },
  suez: { power: 36, load: 40, access: 36 },
  nairobi: { power: 30, load: 48, access: 22 },
  mombasa: { power: 28, load: 36, access: 24 },
  saopaulo: { power: 62, load: 58, access: 60 },
  santos: { power: 40, load: 36, access: 48 },
  tokyo: { power: 58, load: 70, access: 72 },
  nagoya: { power: 62, load: 68, access: 64 },
  lagos: { power: 28, load: 60, access: 16 },
  durban: { power: 44, load: 50, access: 38 },
};

export function gridOf(node: SupplyNode) {
  const known = GRID[node.id];
  return {
    power: known?.power ?? node.energy,
    load: known?.load ?? Math.round(node.energy * 0.92),
    access: known?.access ?? 46,
  };
}

function mixHex(from: string, to: string, t: number) {
  const parse = (hex: string) => [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  const a = parse(from);
  const b = parse(to);
  const mixed = a.map((channel, index) => Math.round(channel + (b[index] - channel) * t));
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function gridTone(power: number, load: number, access: number) {
  const ratio = load / Math.max(power, 8);
  const t = Math.min(1, Math.max(0, (ratio - 0.55) / 0.85));
  const color = t < 0.5 ? mixHex("#7ddec4", "#e6c36a", t * 2) : mixHex("#e6c36a", "#d4534a", (t - 0.5) * 2);
  return { color, alpha: 0.3 + (access / 100) * 0.7 };
}

export function nodeColor(node: SupplyNode) {
  if (node.desk === "tools") return "#e0b15a";
  if (node.desk === "safety") return "#6eb7c8";
  if (node.desk === "build") return "#d08a4c";
  if (node.desk === "ore") return "#b08968";
  const ranked = [
    { value: node.food, color: "#e08a3c" },
    { value: node.parts, color: "#d4534a" },
    { value: node.meds, color: "#3eae72" },
    { value: node.construction, color: "#4c8dff" },
  ].sort((a, b) => b.value - a.value);
  return ranked[0].color;
}

export const PLAN: PlanStep[] = [
  {
    id: "corridors",
    title: "Neutral corridors",
    body: "Peace is not the entrance fee. Pause expansion. Keep food, medicine, energy, and civilian repair moving.",
  },
  {
    id: "onhand",
    title: "Count what is actually there",
    body: "Warehouse, not a promise. Food, meds, construction, parts, working plants. A slide of wheat has no calories.",
  },
  {
    id: "endnodes",
    title: "Smallest grids first",
    body: "Pumps, cold rooms, hospitals, workshops. Coal-bound places start swapping toward storage and NewClear, smallest working grid first.",
  },
  {
    id: "food",
    title: "Food starts first and finishes last",
    body: "Grow local, sell local. Monthly surplus, not a yearly hoard. Storage serves the flow. The flow does not feed the warehouse.",
  },
  {
    id: "current",
    title: "One current, no spaghetti",
    body: "Loops with slack. A truck does not pass the door, return to the hub, and pass the door again. Not a magic minute.",
  },
  {
    id: "scrap",
    title: "Scrap before new factories",
    body: "Old keys, window gears, moulds, motors. Use, repair, strip, or melt. A new badge is not a fifth kind of recycling.",
  },
  {
    id: "domes",
    title: "Factories follow the jobs",
    body: "Slow domes tied to a local grid. Not a race to the next concrete box. Other end-nodes cover the gap.",
  },
  {
    id: "clearing",
    title: "Clearing ledger, not one purse",
    body: "National accounts in one shared book. Instant notes. Nobody freezes the whole net. Debt steps down. It is not dumped on a scapegoat.",
  },
  {
    id: "wounds",
    title: "Wounds after the pipes run",
    body: "When food, power, medicine, and routes hold, open the register of harms. Files first. A court with a verdict already written is just a stage.",
  },
  {
    id: "ljubljana",
    title: "Ljubljana clause",
    body: "After the pumps work: KFC, Taco Bell, and a cheese-crust pizza. Local, late, and not a theology.",
  },
];

export function commodityColor(id: Commodity) {
  return COMMODITIES.find((item) => item.id === id)?.color ?? "#c4a574";
}

export function findNode(id: string, extra: SupplyNode[] = []) {
  return NODES.find((item) => item.id === id) ?? extra.find((item) => item.id === id);
}

export type Split = { routeId: string; nodeId: string };

export function onHand(node: SupplyNode, commodity: Commodity) {
  if (commodity === "food") return node.food;
  if (commodity === "meds") return node.meds;
  if (commodity === "auto") return node.parts;
  return node.construction;
}

export function resolveRoutes(customRoutes: SupplyRoute[], splits: Split[]) {
  const routes = [...ROUTES, ...customRoutes];
  for (const split of splits) {
    const index = routes.findIndex((route) => route.id === split.routeId);
    if (index < 0) continue;
    const route = routes[index];
    routes.splice(
      index,
      1,
      { id: `${route.id}>${split.nodeId}:a`, from: route.from, to: split.nodeId, commodity: route.commodity },
      { id: `${route.id}>${split.nodeId}:b`, from: split.nodeId, to: route.to, commodity: route.commodity, join: route.join },
    );
  }
  return routes;
}

function angleTo(lat: number, lon: number, node: SupplyNode) {
  const p = latLonToXYZ(lat, lon, 1);
  const q = latLonToXYZ(node.lat, node.lon, 1);
  const dot = p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
  return Math.acos(Math.min(1, Math.max(-1, dot)));
}

export function routeGap(lat: number, lon: number, from: SupplyNode, to: SupplyNode) {
  const p = latLonToXYZ(lat, lon, 1);
  const a = latLonToXYZ(from.lat, from.lon, 1);
  const b = latLonToXYZ(to.lat, to.lon, 1);
  let best = Infinity;
  for (let i = 0; i <= 24; i += 1) {
    const t = i / 24;
    const x = a[0] + (b[0] - a[0]) * t;
    const y = a[1] + (b[1] - a[1]) * t;
    const z = a[2] + (b[2] - a[2]) * t;
    const len = Math.hypot(x, y, z) || 1;
    const dot = (p[0] * x + p[1] * y + p[2] * z) / len;
    const ang = Math.acos(Math.min(1, Math.max(-1, dot)));
    if (ang < best) best = ang;
  }
  return best;
}

export function nearestJoin(lat: number, lon: number, commodity: Commodity, routes: SupplyRoute[], nodes: SupplyNode[]) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  let bestRoute: SupplyRoute | null = null;
  let bestGap = 0.42;
  for (const route of routes) {
    if (route.commodity !== commodity) continue;
    const from = byId.get(route.from);
    const to = byId.get(route.to);
    if (!from || !to) continue;
    const gap = routeGap(lat, lon, from, to);
    if (gap < bestGap) {
      bestGap = gap;
      bestRoute = route;
    }
  }
  if (bestRoute) return { route: bestRoute };
  let nearest: SupplyNode | null = null;
  let nearestAng = Infinity;
  for (const node of nodes) {
    const ang = angleTo(lat, lon, node);
    if (ang < nearestAng) {
      nearestAng = ang;
      nearest = node;
    }
  }
  return { nearest };
}
