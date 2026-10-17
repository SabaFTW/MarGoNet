export type ChainKind = "wood" | "metal" | "sand";

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
];

export type Plant = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  gw: number;
  load: number;
  kind: string;
  note: string;
};

/** Installed gigawatts and a sketch of the load next door. Public order of magnitude, not a live meter. */
export const PLANTS: Plant[] = [
  { id: "threegorges", name: "Three Gorges", lat: 30.82, lon: 111.0, gw: 22.5, load: 18, kind: "Hydro", note: "Yangtze. About 22.5 GW installed." },
  { id: "itaipu", name: "Itaipu", lat: -25.41, lon: -54.59, gw: 14, load: 11, kind: "Hydro", note: "Brazil and Paraguay. About 14 GW." },
  { id: "sayano", name: "Sayano-Shushenskaya", lat: 52.83, lon: 91.37, gw: 6.4, load: 5, kind: "Hydro", note: "Yenisei. About 6.4 GW." },
  { id: "gravelines", name: "Gravelines", lat: 51.01, lon: 2.14, gw: 5.5, load: 4, kind: "Nuclear", note: "Largest French nuclear site, about 5.5 GW." },
  { id: "hoover", name: "Hoover", lat: 36.02, lon: -114.74, gw: 2.1, load: 2.4, kind: "Hydro", note: "Colorado. About 2.1 GW, and the cities around it drink more." },
  { id: "oslohydro", name: "South Norway", lat: 58.15, lon: 6.99, gw: 1.4, load: 0.4, kind: "Hydro", note: "NordLink is a 1.4 GW cable toward the Netherlands." },
  { id: "rotterdamgrid", name: "Rotterdam", lat: 51.92, lon: 4.48, gw: 2, load: 3.2, kind: "Load", note: "The port eats more than the local plants hand it." },
  { id: "londonload", name: "London", lat: 51.51, lon: -0.12, gw: 1, load: 4.5, kind: "Load", note: "A city that imports. Interconnectors do the walking." },
  { id: "berlinload", name: "Berlin", lat: 52.52, lon: 13.4, gw: 1.2, load: 2.2, kind: "Load", note: "More hunger than spare." },
];

export const CABLES: [string, string][] = [
  ["oslohydro", "rotterdamgrid"],
  ["gravelines", "londonload"],
  ["gravelines", "rotterdamgrid"],
  ["rotterdamgrid", "berlinload"],
];
