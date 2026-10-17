export type WasteKind = "food" | "plastic" | "metal" | "ewaste";

export const WASTE_KINDS: { id: WasteKind; label: string; color: string; tonnes: string; note: string }[] = [
  {
    id: "food",
    label: "Food",
    color: "#c46a58",
    tonnes: "about 1 billion tonnes a year",
    note: "UNEP's order of magnitude. Most of it is households. Almost none of it gets on a ship.",
  },
  {
    id: "plastic",
    label: "Plastic",
    color: "#9aa7b2",
    tonnes: "about 350 million tonnes a year",
    note: "A public sketch of plastic waste. A little of it still moves. Most of it stays.",
  },
  {
    id: "metal",
    label: "Metal",
    color: "#b08968",
    tonnes: "the scrap that actually sails",
    note: "Ferrous scrap is one of the few wastes with a real ocean lane. The tonne count moves with the steel price.",
  },
  {
    id: "ewaste",
    label: "Electronics",
    color: "#a394c9",
    tonnes: "about 60 million tonnes a year",
    note: "The Global E-waste Monitor's order. A lot is local. A little is used gear that lands somewhere else.",
  },
];

export type Bin = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  kg: number;
  food: number;
  note: string;
};

/** kg of municipal waste per person per year, and the share of that which is food. Sketches of public figures. */
export const BINS: Bin[] = [
  { id: "nyc", name: "New York", lat: 40.71, lon: -74.0, kg: 730, food: 0.22, note: "A rich bin. Food is about a fifth of it." },
  { id: "la", name: "Los Angeles", lat: 34.05, lon: -118.24, kg: 700, food: 0.24, note: "Plastic used to leave here for Southeast Asia. Less of it does now." },
  { id: "mex", name: "Mexico City", lat: 19.43, lon: -99.13, kg: 420, food: 0.4, note: "A smaller bin, and a larger share of it is food." },
  { id: "sp", name: "São Paulo", lat: -23.55, lon: -46.63, kg: 380, food: 0.45, note: "Food is close to half the household pile." },
  { id: "lagos", name: "Lagos", lat: 6.45, lon: 3.4, kg: 200, food: 0.55, note: "Less collected. What is collected is mostly food." },
  { id: "accra", name: "Accra", lat: 5.6, lon: -0.19, kg: 180, food: 0.5, note: "Used electronics land here too. They are not the whole pile." },
  { id: "cairo", name: "Cairo", lat: 30.04, lon: 31.24, kg: 280, food: 0.5, note: "The Zabbaleen already sort a lot of this by hand." },
  { id: "nairobi", name: "Nairobi", lat: -1.29, lon: 36.82, kg: 220, food: 0.55, note: "Organic first. Plastic is the part that stays visible." },
  { id: "jhb", name: "Johannesburg", lat: -26.2, lon: 28.05, kg: 460, food: 0.28, note: "A bigger bin than the rest of the continent's cities here." },
  { id: "mumbai", name: "Mumbai", lat: 19.08, lon: 72.88, kg: 190, food: 0.5, note: "Food and wet waste. The dump is close to the city." },
  { id: "dhaka", name: "Dhaka", lat: 23.81, lon: 90.41, kg: 170, food: 0.7, note: "One of the highest food shares. Collection is uneven." },
  { id: "jakarta", name: "Jakarta", lat: -6.21, lon: 106.85, kg: 250, food: 0.45, note: "Wet waste, and a coast that already receives other people's plastic." },
  { id: "shanghai", name: "Shanghai", lat: 31.23, lon: 121.47, kg: 400, food: 0.35, note: "Sorting is mandatory. The food still has to go somewhere the same day." },
  { id: "tokyo", name: "Tokyo", lat: 35.68, lon: 139.69, kg: 340, food: 0.3, note: "A tighter bin. The food share is still the part that smells." },
  { id: "sydney", name: "Sydney", lat: -33.87, lon: 151.21, kg: 540, food: 0.3, note: "A rich-city bin on an island that cannot export the smell." },
  { id: "london", name: "London", lat: 51.51, lon: -0.12, kg: 430, food: 0.27, note: "Plastic and scrap metal are the parts that still leave." },
  { id: "paris", name: "Paris", lat: 48.86, lon: 2.35, kg: 440, food: 0.26, note: "Close to London. The food is local. The scrap is not." },
];

export type WasteLane = {
  id: string;
  name: string;
  from: string;
  to: string;
  kind: WasteKind;
  note: string;
};

export const WASTE_LANES: WasteLane[] = [
  { id: "la-klang", name: "Plastic, east", from: "la", to: "klang", kind: "plastic", note: "Los Angeles toward Port Klang. A real scrap lane, thinner since the rules tightened." },
  { id: "rot-aliaga", name: "Plastic, south", from: "rot", to: "aliaga", kind: "plastic", note: "Rotterdam toward Aliağa. Europe sends this out. It does not arrive from the world." },
  { id: "lon-accra", name: "Used electronics", from: "london", to: "accra", kind: "ewaste", note: "A small lane of used gear. Accra's pile is mostly its own." },
  { id: "ny-aliaga", name: "Scrap metal", from: "nyc", to: "aliaga", kind: "metal", note: "Ferrous scrap toward the Turkish mills. One of the wastes that pays its own freight." },
];

export const WASTE_PORTS: Bin[] = [
  { id: "klang", name: "Port Klang", lat: 3.0, lon: 101.4, kg: 0, food: 0, note: "A landing for other people's plastic." },
  { id: "aliaga", name: "Aliağa", lat: 38.8, lon: 26.97, kg: 0, food: 0, note: "Mills and yards on the Turkish coast." },
  { id: "rot", name: "Rotterdam", lat: 51.92, lon: 4.48, kg: 0, food: 0, note: "A gate that sends scrap out." },
];

export type AnimalKind = "cattle" | "pigs" | "poultry" | "fish" | "sheep";

export const ANIMAL_KINDS: { id: AnimalKind; label: string; color: string; note: string }[] = [
  { id: "cattle", label: "Cattle", color: "#c46a58", note: "Brazil is the large exporter. China is the large buyer. The Middle East takes a real share." },
  { id: "pigs", label: "Pigs", color: "#d4a35c", note: "China raises and eats most of the world's pigs. The US sends a share south and across the Pacific." },
  { id: "poultry", label: "Poultry", color: "#d4a35c", note: "Frozen chicken moves. Brazil and the US south both sell into West Africa and Asia." },
  { id: "fish", label: "Fish", color: "#6aafa6", note: "Peru's anchovy becomes feed and leaves for China. Norwegian salmon also sails past Europe." },
  { id: "sheep", label: "Sheep", color: "#d4a35c", note: "Live sheep still leave Fremantle for the Gulf. New Zealand's meat goes to China." },
];

export type Herd = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  kind: AnimalKind;
  role: "source" | "sink";
  note: string;
};

export const HERDS: Herd[] = [
  { id: "cuiaba", name: "Cuiabá", lat: -15.6, lon: -56.1, kind: "cattle", role: "source", note: "Mato Grosso. The herd is inland." },
  { id: "santos", name: "Santos", lat: -23.96, lon: -46.33, kind: "cattle", role: "source", note: "The beef port." },
  { id: "shanghai", name: "Shanghai", lat: 31.23, lon: 121.47, kind: "cattle", role: "sink", note: "China buys more beef than it raises for export." },
  { id: "jeddah", name: "Jeddah", lat: 21.49, lon: 39.19, kind: "sheep", role: "sink", note: "A Gulf gate for live sheep and boxed beef." },
  { id: "fremantle", name: "Fremantle", lat: -32.05, lon: 115.74, kind: "sheep", role: "source", note: "Live sheep still leave this dock." },
  { id: "iowa", name: "Iowa", lat: 41.6, lon: -93.6, kind: "pigs", role: "source", note: "The US herd, not the old stockyard story." },
  { id: "mexico", name: "Mexico City", lat: 19.43, lon: -99.13, kind: "pigs", role: "sink", note: "A near buyer. The line barely thins." },
  { id: "chengdu", name: "Chengdu", lat: 30.67, lon: 104.07, kind: "pigs", role: "source", note: "China's own pigs. They do not need an ocean." },
  { id: "savannah", name: "Savannah", lat: 32.08, lon: -81.09, kind: "poultry", role: "source", note: "US south, frozen chicken." },
  { id: "lagos", name: "Lagos", lat: 6.45, lon: 3.4, kind: "poultry", role: "sink", note: "West Africa buys frozen chicken." },
  { id: "itajai", name: "Itajaí", lat: -26.91, lon: -48.66, kind: "poultry", role: "source", note: "Santa Catarina. Brazilian chicken." },
  { id: "callao", name: "Callao", lat: -12.05, lon: -77.14, kind: "fish", role: "source", note: "Anchovy, mostly turned into feed." },
  { id: "oslo", name: "Oslo", lat: 59.91, lon: 10.75, kind: "fish", role: "source", note: "Salmon. A share sails past Europe." },
  { id: "auckland", name: "Auckland", lat: -36.85, lon: 174.76, kind: "sheep", role: "source", note: "Lamb and dairy toward China." },
  { id: "mumbai", name: "Mumbai", lat: 19.08, lon: 72.88, kind: "cattle", role: "source", note: "Buffalo meat, not cow. India ships it east." },
  { id: "hochiminh", name: "Ho Chi Minh", lat: 10.78, lon: 106.7, kind: "cattle", role: "sink", note: "A real buyer of that buffalo meat." },
];

export type AnimalLane = {
  id: string;
  from: string;
  to: string;
  kind: AnimalKind;
  note: string;
};

export const ANIMAL_LANES: AnimalLane[] = [
  { id: "mt-santos", from: "cuiaba", to: "santos", kind: "cattle", note: "Inland herd to the port." },
  { id: "beef-sha", from: "santos", to: "shanghai", kind: "cattle", note: "Brazil to China. The large lane." },
  { id: "beef-jed", from: "santos", to: "jeddah", kind: "cattle", note: "Boxed beef toward the Gulf, not toward Rotterdam." },
  { id: "sheep-jed", from: "fremantle", to: "jeddah", kind: "sheep", note: "Live sheep. The long line thins." },
  { id: "pork-mex", from: "iowa", to: "mexico", kind: "pigs", note: "A near buyer." },
  { id: "pork-sha", from: "iowa", to: "shanghai", kind: "pigs", note: "A share across the Pacific." },
  { id: "pork-cn", from: "chengdu", to: "shanghai", kind: "pigs", note: "China eating its own. Short, so it stays thick." },
  { id: "chicken-lagos", from: "savannah", to: "lagos", kind: "poultry", note: "Frozen chicken into West Africa." },
  { id: "chicken-sha", from: "itajai", to: "shanghai", kind: "poultry", note: "Brazilian chicken toward China." },
  { id: "chicken-lagos-br", from: "itajai", to: "lagos", kind: "poultry", note: "The same port, a second buyer." },
  { id: "anchovy", from: "callao", to: "shanghai", kind: "fish", note: "Feed, more than fillets." },
  { id: "salmon", from: "oslo", to: "shanghai", kind: "fish", note: "Salmon that does not stop in Europe." },
  { id: "lamb", from: "auckland", to: "shanghai", kind: "sheep", note: "New Zealand lamb." },
  { id: "buffalo", from: "mumbai", to: "hochiminh", kind: "cattle", note: "Buffalo meat, east, not to Europe." },
];

export function animalColor(kind: AnimalKind) {
  return ANIMAL_KINDS.find((item) => item.id === kind)?.color ?? "#c4a574";
}

export function wasteColor(kind: WasteKind) {
  return WASTE_KINDS.find((item) => item.id === kind)?.color ?? "#c46a58";
}
