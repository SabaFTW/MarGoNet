export type ChainKind = "wood" | "metal" | "sand" | "copper" | "bauxite" | "nickel" | "lithium" | "cobalt" | "rareearth";

export type ChainPlace = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  stage: string;
  note: string;
};

export type MaterialChain = {
  id: ChainKind;
  label: string;
  color: string;
  recipe: string;
  note: string;
  places: ChainPlace[];
  links: [string, string][];
};

export const CHAINS: MaterialChain[] = [
  {
    id: "wood",
    label: "Forest",
    color: "#c4a574",
    recipe: "Forest → sawn wood → planks → shops",
    note: "Canada is the largest softwood exporter. Sweden ships sawn wood into Europe. The amounts here are a sketch of that fact, not a customs form.",
    places: [
      { id: "princegeorge", name: "Prince George", lat: 53.92, lon: -122.75, stage: "Forest", note: "Interior British Columbia, boreal cut" },
      { id: "vancmill", name: "Vancouver", lat: 49.28, lon: -123.1, stage: "Sawn wood", note: "Mills and the export dock" },
      { id: "rottimber", name: "Rotterdam", lat: 51.95, lon: 4.14, stage: "Planks", note: "European timber gate" },
      { id: "berlinyard", name: "Berlin", lat: 52.52, lon: 13.4, stage: "Shops", note: "Yards and builders" },
      { id: "sundsvall", name: "Sundsvall", lat: 62.39, lon: 17.31, stage: "Forest", note: "Swedish sawmill coast" },
      { id: "gothenburg", name: "Gothenburg", lat: 57.71, lon: 11.97, stage: "Sawn wood", note: "West coast out" },
      { id: "hamburg", name: "Hamburg", lat: 53.55, lon: 9.99, stage: "Shops", note: "Northern yards" },
    ],
    links: [
      ["princegeorge", "vancmill"],
      ["vancmill", "rottimber"],
      ["rottimber", "berlinyard"],
      ["sundsvall", "gothenburg"],
      ["gothenburg", "hamburg"],
    ],
  },
  {
    id: "metal",
    label: "Ore",
    color: "#b08968",
    recipe: "Mine → ore → alloy → bars → shops",
    note: "Kiruna is Europe's largest iron mine and rolls to Luleå. Duisburg is Europe's largest steel site. Port Hedland is the main iron gate out of the Pilbara.",
    places: [
      { id: "kirunamine", name: "Kiruna", lat: 67.86, lon: 20.23, stage: "Mine", note: "Iron ore" },
      { id: "lulea", name: "Luleå", lat: 65.58, lon: 22.15, stage: "Ore", note: "Baltic iron port" },
      { id: "duisburg", name: "Duisburg", lat: 51.43, lon: 6.76, stage: "Alloy", note: "Rhine steel" },
      { id: "rotbars", name: "Rotterdam bars", lat: 51.9, lon: 4.5, stage: "Bars", note: "Stock and ship" },
      { id: "hedland", name: "Port Hedland", lat: -20.31, lon: 118.58, stage: "Ore", note: "Pilbara iron, hundreds of millions of tonnes a year" },
      { id: "baosteel", name: "Shanghai", lat: 31.4, lon: 121.48, stage: "Alloy", note: "Coastal steel" },
      { id: "gzshop", name: "Guangzhou", lat: 23.13, lon: 113.26, stage: "Shops", note: "Bars into the city" },
    ],
    links: [
      ["kirunamine", "lulea"],
      ["lulea", "duisburg"],
      ["duisburg", "rotbars"],
      ["hedland", "baosteel"],
      ["baosteel", "gzshop"],
    ],
  },
  {
    id: "sand",
    label: "Sand",
    color: "#e6c36a",
    recipe: "Desert → bags → trucks → filter sand → shops",
    note: "Dune sand is the picture. What gets bagged is graded silica. Ottawa, Illinois sits on the St. Peter sandstone. Liwa is the edge of the Empty Quarter.",
    places: [
      { id: "liwa", name: "Liwa", lat: 23.13, lon: 53.77, stage: "Desert", note: "Empty Quarter edge" },
      { id: "dubaibag", name: "Dubai", lat: 25.2, lon: 55.27, stage: "Bags", note: "Bagged and stacked" },
      { id: "sueztruck", name: "Suez", lat: 29.97, lon: 32.55, stage: "Trucks", note: "The crossing" },
      { id: "rotfilter", name: "Rotterdam filters", lat: 51.92, lon: 4.48, stage: "Filter sand", note: "Water and glass sand" },
      { id: "ottawa", name: "Ottawa, Illinois", lat: 41.35, lon: -88.84, stage: "Desert", note: "Silica sand, not a dune" },
      { id: "chicagobag", name: "Chicago", lat: 41.88, lon: -87.63, stage: "Bags", note: "Bagging and rail" },
      { id: "newarkfilter", name: "Newark", lat: 40.69, lon: -74.17, stage: "Filter sand", note: "City filters" },
    ],
    links: [
      ["liwa", "dubaibag"],
      ["dubaibag", "sueztruck"],
      ["sueztruck", "rotfilter"],
      ["ottawa", "chicagobag"],
      ["chicagobag", "newarkfilter"],
    ],
  },
  {
    id: "copper",
    label: "Copper",
    color: "#c46a58",
    recipe: "Pit → concentrate → smelter → wire",
    note: "Escondida is the largest copper mine. The concentrate leaves through Antofagasta. A large share of Chilean copper is smelted or used in East Asia.",
    places: [
      { id: "escondida", name: "Escondida", lat: -24.27, lon: -69.07, stage: "Mine", note: "Atacama copper pit" },
      { id: "antofagasta", name: "Antofagasta", lat: -23.65, lon: -70.4, stage: "Ore", note: "The port" },
      { id: "shanghai-cu", name: "Shanghai", lat: 31.3, lon: 121.5, stage: "Alloy", note: "Smelter coast" },
    ],
    links: [
      ["escondida", "antofagasta"],
      ["antofagasta", "shanghai-cu"],
    ],
  },
  {
    id: "bauxite",
    label: "Aluminium",
    color: "#d4a35c",
    recipe: "Bauxite → alumina → metal → shops",
    note: "Weipa on Cape York is a real bauxite port. Gladstone refines a large share of it into alumina.",
    places: [
      { id: "weipa", name: "Weipa", lat: -12.63, lon: 141.88, stage: "Mine", note: "Cape York bauxite" },
      { id: "gladstone", name: "Gladstone", lat: -23.85, lon: 151.26, stage: "Ore", note: "Alumina refineries" },
      { id: "gz-al", name: "Guangzhou", lat: 23.13, lon: 113.26, stage: "Shops", note: "Metal into the city" },
    ],
    links: [
      ["weipa", "gladstone"],
      ["gladstone", "gz-al"],
    ],
  },
  {
    id: "nickel",
    label: "Nickel",
    color: "#6aafa6",
    recipe: "Mine → port → bars",
    note: "Norilsk ships nickel down the Yenisei and out of Murmansk. Rotterdam is a real European gate for that metal.",
    places: [
      { id: "norilsk", name: "Norilsk", lat: 69.35, lon: 88.2, stage: "Mine", note: "Nornickel" },
      { id: "murmansk", name: "Murmansk", lat: 68.97, lon: 33.08, stage: "Ore", note: "Arctic exit" },
      { id: "rot-ni", name: "Rotterdam", lat: 51.92, lon: 4.48, stage: "Bars", note: "European gate" },
    ],
    links: [
      ["norilsk", "murmansk"],
      ["murmansk", "rot-ni"],
    ],
  },
  {
    id: "lithium",
    label: "Lithium",
    color: "#7eb6d6",
    recipe: "Brine or pit → port → cells",
    note: "Two real sources. The Atacama brine leaves through Antofagasta. Greenbushes, the richest hard-rock pit, leaves through Bunbury. Both sketches end on the battery coast. Not a tonne count.",
    places: [
      { id: "salar", name: "Salar de Atacama", lat: -23.5, lon: -68.25, stage: "Brine", note: "The salt flat" },
      { id: "anto-li", name: "Antofagasta", lat: -23.65, lon: -70.4, stage: "Port", note: "Carbonate and concentrate" },
      { id: "shanghai-li", name: "Shanghai", lat: 31.23, lon: 121.47, stage: "Cells", note: "Battery coast" },
      { id: "greenbushes", name: "Greenbushes", lat: -33.86, lon: 116.07, stage: "Pit", note: "Hard-rock spodumene" },
      { id: "bunbury", name: "Bunbury", lat: -33.32, lon: 115.64, stage: "Port", note: "About 90 km from the pit" },
    ],
    links: [
      ["salar", "anto-li"],
      ["anto-li", "shanghai-li"],
      ["greenbushes", "bunbury"],
      ["bunbury", "shanghai-li"],
    ],
  },
  {
    id: "cobalt",
    label: "Cobalt",
    color: "#6d7fd4",
    recipe: "Belt → port → cells",
    note: "Most of the world's cobalt is dug around Kolwezi. A southern exit is Durban, then the battery coast. Quotas change. This is the path, not a cargo list.",
    places: [
      { id: "kolwezi-co", name: "Kolwezi", lat: -10.71, lon: 25.47, stage: "Mine", note: "Katanga belt" },
      { id: "durban-co", name: "Durban", lat: -29.86, lon: 31.02, stage: "Port", note: "The southern gate" },
      { id: "gz-co", name: "Guangzhou", lat: 23.13, lon: 113.26, stage: "Cells", note: "Battery metal" },
    ],
    links: [
      ["kolwezi-co", "durban-co"],
      ["durban-co", "gz-co"],
    ],
  },
  {
    id: "rareearth",
    label: "Rare earth",
    color: "#c47aa5",
    recipe: "Pit → port → magnets",
    note: "Bayan Obo is the largest rare-earth pit. The concentrate is separated inland and leaves through Tianjin. Nagoya stands for the magnet works that actually use it.",
    places: [
      { id: "bayan", name: "Bayan Obo", lat: 41.8, lon: 109.95, stage: "Pit", note: "Inner Mongolia" },
      { id: "tianjin", name: "Tianjin", lat: 38.98, lon: 117.74, stage: "Port", note: "The Bohai gate" },
      { id: "nagoya-re", name: "Nagoya", lat: 35.18, lon: 136.91, stage: "Magnets", note: "Where the metal becomes a motor" },
    ],
    links: [
      ["bayan", "tianjin"],
      ["tianjin", "nagoya-re"],
    ],
  },
];

export type GridNode = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  role: "plant" | "city";
  gw: number;
  load: number;
  kind: string;
  note: string;
};

export type Plant = GridNode;

export type Wire = {
  id: string;
  name: string;
  from: string;
  to: string;
  gw: number;
  note: string;
};

/** Plants are points. Cities are houses. Wires run one way, the way the power usually leaves. */
export const PLANTS: GridNode[] = [
  { id: "tonstad", name: "Tonstad", lat: 58.66, lon: 6.72, role: "plant", gw: 1.4, load: 0, kind: "Hydro", note: "NordLink starts here. About 1.4 GW toward Germany." },
  { id: "kvilldal", name: "Kvilldal", lat: 59.52, lon: 6.65, role: "plant", gw: 1.4, load: 0, kind: "Hydro", note: "North Sea Link. About 1.4 GW toward Blyth, then the English cities." },
  { id: "feda", name: "Feda", lat: 58.27, lon: 6.82, role: "plant", gw: 0.7, load: 0, kind: "Hydro", note: "NorNed. About 0.7 GW toward Eemshaven." },
  { id: "gravelines", name: "Gravelines", lat: 51.01, lon: 2.14, role: "plant", gw: 5.5, load: 0, kind: "Nuclear", note: "About 5.5 GW on the French side of IFA. The cable itself is 2 GW into Kent." },
  { id: "threegorges", name: "Three Gorges", lat: 30.82, lon: 111.0, role: "plant", gw: 22.5, load: 0, kind: "Hydro", note: "About 22.5 GW. The long lines to the coast are about 3 GW each." },
  { id: "itaipu", name: "Itaipu", lat: -25.41, lon: -54.59, role: "plant", gw: 14, load: 0, kind: "Hydro", note: "About 14 GW. The bipoles toward São Paulo carry about 6.3 GW." },
  { id: "hoover", name: "Hoover", lat: 36.02, lon: -114.74, role: "plant", gw: 2.1, load: 0, kind: "Hydro", note: "About 2.1 GW, aimed at Southern California." },
  { id: "sayano", name: "Sayano", lat: 52.83, lon: 91.37, role: "plant", gw: 6.4, load: 0, kind: "Hydro", note: "About 6.4 GW on the Yenisei. Krasnoyarsk is close, so the line barely thins." },
  { id: "hamburg", name: "Hamburg", lat: 53.55, lon: 9.99, role: "city", gw: 0, load: 1.6, kind: "City", note: "NordLink lands at Wilster. Hamburg is the city that drinks it. About 1.6 GW." },
  { id: "newcastle", name: "Newcastle", lat: 54.97, lon: -1.61, role: "city", gw: 0, load: 0.6, kind: "City", note: "North Sea Link lands at Blyth. About 0.6 GW in the city." },
  { id: "rotterdam", name: "Rotterdam", lat: 51.92, lon: 4.48, role: "city", gw: 0, load: 1.5, kind: "City", note: "NorNed lands at Eemshaven. The port still wants about 1.5 GW." },
  { id: "london", name: "London", lat: 51.51, lon: -0.12, role: "city", gw: 0, load: 5, kind: "City", note: "IFA is 2 GW into Kent. London drinks about 5 GW." },
  { id: "shanghai", name: "Shanghai", lat: 31.23, lon: 121.47, role: "city", gw: 0, load: 30, kind: "City", note: "One 3 GW line from the dam. The city peak is on the order of 30 GW." },
  { id: "guangzhou", name: "Guangzhou", lat: 23.13, lon: 113.26, role: "city", gw: 0, load: 20, kind: "City", note: "Another 3 GW line. The city is still far larger than the wire." },
  { id: "saopaulo", name: "São Paulo", lat: -23.55, lon: -46.63, role: "city", gw: 0, load: 10, kind: "City", note: "Itaipu's bipoles land near the city at about 6.3 GW. The metro wants more." },
  { id: "losangeles", name: "Los Angeles", lat: 34.05, lon: -118.24, role: "city", gw: 0, load: 6, kind: "City", note: "Hoover's 2 GW does not cover the basin." },
  { id: "krasnoyarsk", name: "Krasnoyarsk", lat: 56.02, lon: 92.87, role: "city", gw: 0, load: 1, kind: "City", note: "Next door to the dam. The line stays thick because it is short." },
  { id: "baihetan", name: "Baihetan", lat: 27.22, lon: 102.9, role: "plant", gw: 16, load: 0, kind: "Hydro", note: "16 GW on the Jinsha. The line to Jiangsu is about 8 GW and more than 2,000 km." },
  { id: "nanjing", name: "Nanjing", lat: 32.06, lon: 118.8, role: "city", gw: 0, load: 12, kind: "City", note: "Stands in for the Jiangsu end. The province drinks more than Nanjing alone." },
  { id: "belomonte", name: "Belo Monte", lat: -3.13, lon: -51.78, role: "plant", gw: 11.2, load: 0, kind: "Hydro", note: "11.2 GW installed on the Xingu. Assured energy is about 4.6 GW." },
  { id: "coulee", name: "Grand Coulee", lat: 47.96, lon: -118.98, role: "plant", gw: 6.8, load: 0, kind: "Hydro", note: "About 6.8 GW. Largest plant in the United States." },
  { id: "seattle", name: "Seattle", lat: 47.61, lon: -122.33, role: "city", gw: 0, load: 2, kind: "City", note: "Close to the Columbia dams. The line barely thins." },
  { id: "paloverde", name: "Palo Verde", lat: 33.39, lon: -112.86, role: "plant", gw: 3.9, load: 0, kind: "Nuclear", note: "About 3.9 GW in the Arizona desert." },
  { id: "phoenix", name: "Phoenix", lat: 33.45, lon: -112.07, role: "city", gw: 0, load: 3, kind: "City", note: "Next door. The plant covers the city." },
  { id: "koeberg", name: "Koeberg", lat: -33.67, lon: 18.43, role: "plant", gw: 1.9, load: 0, kind: "Nuclear", note: "Two units, about 1.9 GW, on the Cape coast." },
  { id: "capetown", name: "Cape Town", lat: -33.92, lon: 18.42, role: "city", gw: 0, load: 1.5, kind: "City", note: "The plant is in the city's backyard." },
  { id: "aswan", name: "Aswan", lat: 23.97, lon: 32.88, role: "plant", gw: 2.1, load: 0, kind: "Hydro", note: "High Dam, about 2.1 GW, sent down the Nile." },
  { id: "cairo", name: "Cairo", lat: 30.04, lon: 31.24, role: "city", gw: 0, load: 6, kind: "City", note: "The city is larger than the dam." },
  { id: "barakah", name: "Barakah", lat: 23.96, lon: 52.23, role: "plant", gw: 5.6, load: 0, kind: "Nuclear", note: "Four units, about 5.6 GW, on the Abu Dhabi coast." },
  { id: "abudhabi", name: "Abu Dhabi", lat: 24.45, lon: 54.38, role: "city", gw: 0, load: 3, kind: "City", note: "The plant is larger than the city sketch." },
  { id: "olkiluoto", name: "Olkiluoto", lat: 61.24, lon: 21.44, role: "plant", gw: 3.4, load: 0, kind: "Nuclear", note: "Three units. Olkiluoto 3 alone is about 1.6 GW." },
  { id: "helsinki", name: "Helsinki", lat: 60.17, lon: 24.94, role: "city", gw: 0, load: 1.2, kind: "City", note: "Short hop across the south of Finland." },
  { id: "guri", name: "Guri", lat: 7.76, lon: -63.0, role: "plant", gw: 10.2, load: 0, kind: "Hydro", note: "Simón Bolívar, about 10.2 GW, on the Caroní." },
  { id: "caracas", name: "Caracas", lat: 10.48, lon: -66.9, role: "city", gw: 0, load: 2, kind: "City", note: "The dam is far larger than the capital." },
  { id: "churchill", name: "Churchill Falls", lat: 53.53, lon: -64.0, role: "plant", gw: 5.4, load: 0, kind: "Hydro", note: "About 5.4 GW in Labrador, sold into Québec." },
  { id: "montreal", name: "Montreal", lat: 45.5, lon: -73.57, role: "city", gw: 0, load: 6, kind: "City", note: "The line crosses a long way and arrives almost even." },
  { id: "dayabay", name: "Daya Bay", lat: 22.6, lon: 114.54, role: "plant", gw: 2, load: 0, kind: "Nuclear", note: "About 2 GW. A real share is contracted to Hong Kong." },
  { id: "hongkong", name: "Hong Kong", lat: 22.32, lon: 114.17, role: "city", gw: 0, load: 5, kind: "City", note: "The plant does not cover the city alone." },
  { id: "vogtle", name: "Vogtle", lat: 33.14, lon: -81.76, role: "plant", gw: 4.5, load: 0, kind: "Nuclear", note: "About 4.5 GW after the two new units, the largest nuclear site in the US." },
  { id: "atlanta", name: "Atlanta", lat: 33.75, lon: -84.39, role: "city", gw: 0, load: 3, kind: "City", note: "Short line across Georgia." },
  { id: "hanul", name: "Hanul", lat: 37.09, lon: 129.38, role: "plant", gw: 8.7, load: 0, kind: "Nuclear", note: "About 8.7 GW operating on the east coast. Two more units are still being built." },
  { id: "seoul", name: "Seoul", lat: 37.57, lon: 126.98, role: "city", gw: 0, load: 10, kind: "City", note: "Sketch. The capital drinks more than one corridor." },
  { id: "snowy", name: "Snowy", lat: -35.61, lon: 148.29, role: "plant", gw: 4.1, load: 0, kind: "Hydro", note: "The scheme is about 4.1 GW. This dot is Tumut 3, 1.8 GW of it." },
  { id: "sydney", name: "Sydney", lat: -33.87, lon: 151.21, role: "city", gw: 0, load: 5, kind: "City", note: "Sketch. The mountains are a share of the city, not the whole of it." },
  { id: "kudankulam", name: "Kudankulam", lat: 8.17, lon: 77.71, role: "plant", gw: 2, load: 0, kind: "Nuclear", note: "Two units operating, about 2 GW. More are still being built." },
  { id: "chennai", name: "Chennai", lat: 13.08, lon: 80.27, role: "city", gw: 0, load: 2.5, kind: "City", note: "Sketch. The plant is the southern pair, not the whole Tamil Nadu grid." },
  { id: "tarbela", name: "Tarbela", lat: 34.09, lon: 72.7, role: "plant", gw: 4.9, load: 0, kind: "Hydro", note: "About 4.9 GW on the Indus. The largest earth-fill dam." },
  { id: "lahore", name: "Lahore", lat: 31.55, lon: 74.36, role: "city", gw: 0, load: 3, kind: "City", note: "Sketch. One corridor down from the dam, not the whole 4.9 GW." },
  { id: "ataturk", name: "Atatürk", lat: 37.48, lon: 38.32, role: "plant", gw: 2.4, load: 0, kind: "Hydro", note: "About 2.4 GW on the Euphrates." },
  { id: "istanbul", name: "Istanbul", lat: 41.01, lon: 28.98, role: "city", gw: 0, load: 7, kind: "City", note: "Sketch. The city is far larger than the dam, and the line is long." },
  { id: "suralaya", name: "Suralaya", lat: -5.89, lon: 106.03, role: "plant", gw: 4, load: 0, kind: "Coal", note: "About 4 GW of coal on the Banten coast, beside Jakarta." },
  { id: "jakarta", name: "Jakarta", lat: -6.21, lon: 106.85, role: "city", gw: 0, load: 4, kind: "City", note: "Sketch. The plant is next door, so the line stays thick." },
  { id: "gerd", name: "GERD", lat: 11.22, lon: 35.09, role: "plant", gw: 5.15, load: 0, kind: "Hydro", note: "About 5.15 GW nameplate on the Blue Nile. It generates. It does not send power to Egypt." },
  { id: "addis", name: "Addis Ababa", lat: 9.03, lon: 38.74, role: "city", gw: 0, load: 1.2, kind: "City", note: "Sketch. A share of the dam, not the whole river." },
  { id: "sosnovy", name: "Sosnovy Bor", lat: 59.85, lon: 29.05, role: "plant", gw: 4, load: 0, kind: "Nuclear", note: "Leningrad plant, about 4 GW still running. Two old units are already shut." },
  { id: "stpetersburg", name: "Saint Petersburg", lat: 59.93, lon: 30.34, role: "city", gw: 0, load: 2.5, kind: "City", note: "Sketch. Short hop along the gulf." },
  { id: "sitec", name: "Site C", lat: 56.2, lon: -120.91, role: "plant", gw: 1.1, load: 0, kind: "Hydro", note: "About 1.1 GW on the Peace River." },
  { id: "vancouver", name: "Vancouver", lat: 49.28, lon: -123.12, role: "city", gw: 0, load: 2, kind: "City", note: "Sketch. A long line south. It thins." },
  { id: "chocon", name: "El Chocón", lat: -39.26, lon: -68.76, role: "plant", gw: 1.2, load: 0, kind: "Hydro", note: "About 1.2 GW in northern Patagonia." },
  { id: "buenosaires", name: "Buenos Aires", lat: -34.6, lon: -58.38, role: "city", gw: 0, load: 6, kind: "City", note: "Sketch. The dam does not cover the capital." },
  { id: "kusile", name: "Kusile", lat: -25.92, lon: 28.92, role: "plant", gw: 4.8, load: 0, kind: "Coal", note: "Six units, about 4.8 GW, in Mpumalanga." },
  { id: "johannesburg", name: "Johannesburg", lat: -26.2, lon: 28.05, role: "city", gw: 0, load: 5, kind: "City", note: "Sketch. The coal is next door. The Cape plant is a different wire." },
  { id: "laguna", name: "Laguna Verde", lat: 19.72, lon: -96.41, role: "plant", gw: 1.6, load: 0, kind: "Nuclear", note: "About 1.6 GW on the Veracruz coast. Mexico's only nuclear site." },
  { id: "mexicocity", name: "Mexico City", lat: 19.43, lon: -99.13, role: "city", gw: 0, load: 7, kind: "City", note: "Sketch. The city is much larger than the plant." },
];

export const WIRES: Wire[] = [
  { id: "nordlink", name: "NordLink", from: "tonstad", to: "hamburg", gw: 1.4, note: "Tonstad to Wilster, about 1.4 GW. Shown into Hamburg." },
  { id: "nsl", name: "North Sea Link", from: "kvilldal", to: "newcastle", gw: 1.4, note: "Kvilldal to Blyth, about 1.4 GW." },
  { id: "norned", name: "NorNed", from: "feda", to: "rotterdam", gw: 0.7, note: "Feda to Eemshaven, about 0.7 GW." },
  { id: "ifa", name: "IFA", from: "gravelines", to: "london", gw: 2, note: "About 2 GW into Kent. London is the thirst past the landing." },
  { id: "geshanghai", name: "Three Gorges–Shanghai", from: "threegorges", to: "shanghai", gw: 3, note: "About 3 GW, one way, a long way." },
  { id: "geguangdong", name: "Three Gorges–Guangdong", from: "threegorges", to: "guangzhou", gw: 3, note: "About 3 GW toward the south coast." },
  { id: "itaipu-sp", name: "Itaipu bipoles", from: "itaipu", to: "saopaulo", gw: 6.3, note: "About 6.3 GW toward Ibiúna, beside São Paulo." },
  { id: "hoover-la", name: "Hoover south", from: "hoover", to: "losangeles", gw: 2.1, note: "The dam toward the basin. Not one cable, the real direction." },
  { id: "sayano-kras", name: "Yenisei local", from: "sayano", to: "krasnoyarsk", gw: 6.4, note: "Short. Density barely falls." },
  { id: "baihetan-js", name: "Baihetan–Jiangsu", from: "baihetan", to: "nanjing", gw: 8, note: "About 8 GW, more than 2,000 km. Nanjing stands for the Jiangsu end." },
  { id: "belo-sp", name: "Belo Monte south", from: "belomonte", to: "saopaulo", gw: 4, note: "The bipoles run toward the southeast. 4 GW is the line, not the whole 11.2 GW plant." },
  { id: "coulee-sea", name: "Columbia", from: "coulee", to: "seattle", gw: 6.8, note: "Short. The northwest drinks the Columbia." },
  { id: "palo-phx", name: "Palo Verde local", from: "paloverde", to: "phoenix", gw: 3.9, note: "Desert plant, city next door." },
  { id: "koeberg-ct", name: "Koeberg", from: "koeberg", to: "capetown", gw: 1.9, note: "The plant is on the city's coast." },
  { id: "aswan-cairo", name: "Nile", from: "aswan", to: "cairo", gw: 2.1, note: "High Dam toward Cairo. The city is larger." },
  { id: "barakah-ad", name: "Barakah", from: "barakah", to: "abudhabi", gw: 5.6, note: "About 5.6 GW along the coast." },
  { id: "olki-hel", name: "Olkiluoto", from: "olkiluoto", to: "helsinki", gw: 3.4, note: "The site toward Helsinki." },
  { id: "guri-ccs", name: "Caroní", from: "guri", to: "caracas", gw: 4, note: "Guri is about 10.2 GW. This is one corridor, not the whole dam." },
  { id: "churchill-mtl", name: "Churchill Falls", from: "churchill", to: "montreal", gw: 5.4, note: "Labrador toward Montréal." },
  { id: "daya-hk", name: "Daya Bay", from: "dayabay", to: "hongkong", gw: 2, note: "Short hop. The contract to Hong Kong is real." },
  { id: "vogtle-atl", name: "Vogtle", from: "vogtle", to: "atlanta", gw: 4.5, note: "Across Georgia. Barely thins." },
  { id: "hanul-sel", name: "Hanul", from: "hanul", to: "seoul", gw: 4, note: "About 4 GW is the corridor drawn, not the whole 8.7 GW site." },
  { id: "snowy-syd", name: "Snowy", from: "snowy", to: "sydney", gw: 2, note: "A share of the 4.1 GW scheme toward the coast. Not one cable." },
  { id: "kudan-maa", name: "Kudankulam", from: "kudankulam", to: "chennai", gw: 2, note: "The two operating units, about 2 GW, up the coast." },
  { id: "tarbela-lhe", name: "Indus", from: "tarbela", to: "lahore", gw: 2.5, note: "The dam is 4.9 GW. This is one corridor, not the whole Indus." },
  { id: "ataturk-ist", name: "Euphrates", from: "ataturk", to: "istanbul", gw: 2.4, note: "About 2.4 GW. A long line, so it thins before the city." },
  { id: "suralaya-jkt", name: "Suralaya", from: "suralaya", to: "jakarta", gw: 4, note: "Coal next door. The line stays thick." },
  { id: "gerd-addis", name: "Blue Nile", from: "gerd", to: "addis", gw: 1.5, note: "A share toward the capital. The dam does not feed Cairo." },
  { id: "leningrad-spb", name: "Sosnovy Bor", from: "sosnovy", to: "stpetersburg", gw: 2, note: "About 2 GW of the 4 GW site, along the gulf." },
  { id: "sitec-van", name: "Site C", from: "sitec", to: "vancouver", gw: 1.1, note: "About 1.1 GW. Long way south, so the line thins." },
  { id: "chocon-bue", name: "Limay", from: "chocon", to: "buenosaires", gw: 1.2, note: "About 1.2 GW out of Patagonia. The capital is larger." },
  { id: "kusile-jnb", name: "Kusile", from: "kusile", to: "johannesburg", gw: 4.8, note: "Next door. Density barely falls." },
  { id: "laguna-mex", name: "Laguna Verde", from: "laguna", to: "mexicocity", gw: 1.6, note: "The coast toward the basin. The city is larger." },
];

export function arrivingGw(cityId: string) {
  return WIRES.filter((wire) => wire.to === cityId).reduce((sum, wire) => sum + wire.gw, 0);
}

export function hungerColor(load: number, offered: number) {
  const ratio = load / Math.max(offered, 0.2);
  if (ratio < 0.75) return "#7ddec4";
  if (ratio < 1.15) return "#e6c36a";
  return "#d4534a";
}
