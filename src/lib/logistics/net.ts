export type HallRole = "campus" | "landing" | "both";

export type Hall = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  role: HallRole;
  /** Relative public cluster, 1 to 5. Not megawatts. */
  weight: number;
  ix?: string;
  note: string;
};

export const HALLS: Hall[] = [
  { id: "ashburn", name: "Ashburn", lat: 39.04, lon: -77.49, role: "campus", weight: 5, note: "Northern Virginia. The largest published cluster. The beach is an hour east." },
  { id: "nyc", name: "New York", lat: 40.71, lon: -74.01, role: "campus", weight: 4, ix: "NYIIX", note: "Meet-me rooms. The transatlantic glass lands further out, on Long Island and in Massachusetts." },
  { id: "atlanta", name: "Atlanta", lat: 33.75, lon: -84.39, role: "campus", weight: 3, note: "Inland hinge between Virginia and Texas." },
  { id: "dallas", name: "Dallas", lat: 32.78, lon: -96.8, role: "campus", weight: 4, note: "The southern inland campus." },
  { id: "chicago", name: "Chicago", lat: 41.88, lon: -87.63, role: "campus", weight: 4, note: "Where the east corridors meet the plains." },
  { id: "councilbluffs", name: "Council Bluffs", lat: 41.26, lon: -95.86, role: "campus", weight: 3, note: "A plains hall on cheap power, not a port." },
  { id: "santaclara", name: "Santa Clara", lat: 37.35, lon: -121.95, role: "campus", weight: 4, note: "The Bay Area floor. Cables land on the coast, then ride inland." },
  { id: "phoenix", name: "Phoenix", lat: 33.42, lon: -111.83, role: "campus", weight: 3, note: "A desert hall between Texas and California." },
  { id: "thedalles", name: "The Dalles", lat: 45.6, lon: -121.18, role: "campus", weight: 3, note: "Columbia River power. The Pacific cable lands west of here." },
  { id: "quincy", name: "Quincy", lat: 47.23, lon: -119.85, role: "campus", weight: 2, note: "Grant County. Hydro, and a long way from any beach." },
  { id: "queretaro", name: "Querétaro", lat: 20.59, lon: -100.39, role: "campus", weight: 3, note: "Mexico's inland cluster. Not a landing." },
  { id: "toronto", name: "Toronto", lat: 43.65, lon: -79.38, role: "campus", weight: 3, note: "Tied to Chicago by land, not by an ocean." },
  { id: "dublin", name: "Dublin", lat: 53.35, lon: -6.26, role: "campus", weight: 3, note: "A cool-climate hall. Its ocean is a short Irish Sea hop." },
  { id: "slough", name: "Slough", lat: 51.51, lon: -0.59, role: "campus", weight: 4, note: "West of London, where the halls actually are." },
  { id: "london", name: "London", lat: 51.51, lon: -0.12, role: "campus", weight: 2, ix: "LINX", note: "The exchange is in the city. The big rooms are in Slough." },
  { id: "amsterdam", name: "Amsterdam", lat: 52.37, lon: 4.9, role: "campus", weight: 4, ix: "AMS-IX", note: "One of the rooms where networks agree to meet." },
  { id: "frankfurt", name: "Frankfurt", lat: 50.11, lon: 8.68, role: "campus", weight: 5, ix: "DE-CIX", note: "The European meet. The sea is in Marseille, not here." },
  { id: "paris", name: "Paris", lat: 48.86, lon: 2.35, role: "campus", weight: 3, note: "Inland from every French beach." },
  { id: "marseille", name: "Marseille", lat: 43.3, lon: 5.37, role: "both", weight: 4, ix: "France-IX", note: "Where the Asian and African cables come ashore, then go north by land." },
  { id: "milan", name: "Milan", lat: 45.46, lon: 9.19, role: "campus", weight: 3, note: "Between Genoa's beach and Frankfurt." },
  { id: "madrid", name: "Madrid", lat: 40.42, lon: -3.7, role: "campus", weight: 2, note: "Inland. The Iberian landings are on the coast." },
  { id: "warsaw", name: "Warsaw", lat: 52.23, lon: 21.01, role: "campus", weight: 2, note: "Tied west to Frankfurt." },
  { id: "stockholm", name: "Stockholm", lat: 59.33, lon: 18.07, role: "campus", weight: 2, note: "The Nordic meet between Hamina and Luleå." },
  { id: "hamina", name: "Hamina", lat: 60.57, lon: 27.19, role: "campus", weight: 2, note: "A cold hall on the Gulf of Finland." },
  { id: "lulea", name: "Luleå", lat: 65.58, lon: 22.15, role: "campus", weight: 2, note: "Far north, on hydro and cold air." },
  { id: "reykjavik", name: "Reykjavík", lat: 64.15, lon: -21.94, role: "campus", weight: 1, note: "A small cold hall. FARICE is the short hop toward Dublin." },
  { id: "singapore", name: "Singapore", lat: 1.35, lon: 103.82, role: "both", weight: 5, ix: "SGIX", note: "Landing, campus, and exchange in one strait." },
  { id: "hongkong", name: "Hong Kong", lat: 22.32, lon: 114.17, role: "both", weight: 3, note: "A landing and a room, a short hop from Shenzhen." },
  { id: "tokyo", name: "Tokyo", lat: 35.68, lon: 139.69, role: "campus", weight: 4, ix: "JPNAP", note: "The exchange. The Pacific cables prefer a beach to the southwest." },
  { id: "osaka", name: "Osaka", lat: 34.69, lon: 135.5, role: "campus", weight: 3, note: "The other Japanese room, near the Shima landing." },
  { id: "seoul", name: "Seoul", lat: 37.57, lon: 126.98, role: "campus", weight: 3, note: "Tied to Japan by short cables, not by a new ocean." },
  { id: "mumbai", name: "Mumbai", lat: 19.08, lon: 72.88, role: "both", weight: 4, note: "India's west landing and a growing campus." },
  { id: "chennai", name: "Chennai", lat: 13.08, lon: 80.27, role: "landing", weight: 2, note: "The east-coast landing. The big Indian rooms are not all on this beach." },
  { id: "jakarta", name: "Jakarta", lat: -6.21, lon: 106.85, role: "campus", weight: 2, note: "Across a short strait from Singapore." },
  { id: "sydney", name: "Sydney", lat: -33.87, lon: 151.21, role: "both", weight: 3, note: "Landing and campus. Melbourne is inland by Australian standards." },
  { id: "melbourne", name: "Melbourne", lat: -37.81, lon: 144.96, role: "campus", weight: 2, note: "Tied to Sydney by land." },
  { id: "zhangjiakou", name: "Zhangjiakou", lat: 40.77, lon: 114.88, role: "campus", weight: 4, note: "The cloud region west of Beijing. Not a downtown tower." },
  { id: "shanghai", name: "Shanghai", lat: 31.23, lon: 121.47, role: "campus", weight: 4, note: "The eastern room. The glass to Zhangjiakou is terrestrial." },
  { id: "shenzhen", name: "Shenzhen", lat: 22.54, lon: 114.06, role: "campus", weight: 3, note: "Against the Hong Kong landing." },
  { id: "johannesburg", name: "Johannesburg", lat: -26.2, lon: 28.05, role: "campus", weight: 2, ix: "NAPAfrica", note: "Inland. The cables land at Cape Town and Mombasa, then climb." },
  { id: "nairobi", name: "Nairobi", lat: -1.29, lon: 36.82, role: "campus", weight: 1, note: "Inland from Mombasa." },
  { id: "lagos", name: "Lagos", lat: 6.45, lon: 3.4, role: "both", weight: 2, note: "West Africa's main landing. The campus is smaller than the cable." },
  { id: "saopaulo", name: "São Paulo", lat: -23.55, lon: -46.63, role: "campus", weight: 4, ix: "IX.br", note: "The Brazilian room. The new oceans land in Fortaleza, then come south." },
  { id: "santiago", name: "Santiago", lat: -33.45, lon: -70.67, role: "campus", weight: 2, note: "Inland from Valparaíso, where Curie comes ashore." },
  { id: "vb", name: "Virginia Beach", lat: 36.85, lon: -75.98, role: "landing", weight: 1, note: "MAREA and Dunant. Ashburn is inland." },
  { id: "bellport", name: "Bellport", lat: 40.76, lon: -72.94, role: "landing", weight: 1, note: "Long Island. Grace Hopper's American beach." },
  { id: "lynn", name: "Lynn", lat: 42.47, lon: -70.95, role: "landing", weight: 1, note: "Massachusetts. Amitié." },
  { id: "myrtle", name: "Myrtle Beach", lat: 33.69, lon: -78.89, role: "landing", weight: 1, note: "Firmina's American beach." },
  { id: "boca", name: "Boca Raton", lat: 26.36, lon: -80.08, role: "landing", weight: 1, note: "Monet, toward Fortaleza." },
  { id: "bilbao", name: "Bilbao", lat: 43.26, lon: -2.93, role: "landing", weight: 1, note: "MAREA, and one branch of Grace Hopper." },
  { id: "sthilaire", name: "Saint-Hilaire", lat: 46.72, lon: -1.94, role: "landing", weight: 1, note: "Dunant's French beach." },
  { id: "bude", name: "Bude", lat: 50.83, lon: -4.55, role: "landing", weight: 1, note: "Cornwall. Amitié, Grace Hopper, and 2Africa." },
  { id: "leporge", name: "Le Porge", lat: 44.89, lon: -1.21, role: "landing", weight: 1, note: "Amitié's French beach, south of Bordeaux." },
  { id: "sines", name: "Sines", lat: 37.95, lon: -8.87, role: "landing", weight: 1, note: "EllaLink's European beach." },
  { id: "sesimbra", name: "Sesimbra", lat: 38.44, lon: -9.1, role: "landing", weight: 1, note: "Equiano, just south of Lisbon." },
  { id: "fortaleza", name: "Fortaleza", lat: -3.72, lon: -38.52, role: "landing", weight: 2, note: "Brazil's cable corner: EllaLink, SACS, Monet, Firmina." },
  { id: "sangano", name: "Sangano", lat: -9.27, lon: 13.23, role: "landing", weight: 1, note: "Near Luanda. SACS comes ashore here." },
  { id: "lastoninas", name: "Las Toninas", lat: -36.48, lon: -56.69, role: "landing", weight: 1, note: "Argentina. Firmina's other beach." },
  { id: "capetown", name: "Cape Town", lat: -33.73, lon: 18.44, role: "landing", weight: 2, note: "Equiano and 2Africa. Johannesburg is inland." },
  { id: "mombasa", name: "Mombasa", lat: -4.05, lon: 39.67, role: "landing", weight: 1, note: "The East African beach." },
  { id: "djibouti", name: "Djibouti", lat: 11.59, lon: 43.15, role: "landing", weight: 1, note: "The hinge between Africa, the Gulf, and Marseille." },
  { id: "karachi", name: "Karachi", lat: 24.86, lon: 67.01, role: "landing", weight: 1, note: "Peace, toward Djibouti." },
  { id: "genoa", name: "Genoa", lat: 44.41, lon: 8.93, role: "landing", weight: 1, note: "Blue, and the Italian door to Milan." },
  { id: "telaviv", name: "Tel Aviv", lat: 32.08, lon: 34.78, role: "landing", weight: 1, note: "Blue's eastern beach. A city landing, not a secret coordinate." },
  { id: "aqaba", name: "Aqaba", lat: 29.53, lon: 35.01, role: "landing", weight: 1, note: "Raman's Red Sea beach." },
  { id: "eureka", name: "Eureka", lat: 40.8, lon: -124.16, role: "landing", weight: 1, note: "Northern California. Echo." },
  { id: "grover", name: "Grover Beach", lat: 35.12, lon: -120.62, role: "landing", weight: 1, note: "Bifrost's American beach, south of Eureka so the two cables do not pretend to be one." },
  { id: "la", name: "Los Angeles", lat: 33.86, lon: -118.4, role: "landing", weight: 2, note: "Jupiter and Curie. The campus is in Santa Clara." },
  { id: "pacificcity", name: "Pacific City", lat: 45.2, lon: -123.97, role: "landing", weight: 1, note: "Oregon. FASTER. The Dalles is upriver." },
  { id: "shima", name: "Shima", lat: 34.33, lon: 136.83, role: "landing", weight: 1, note: "The Japanese Pacific beach, southwest of Tokyo." },
  { id: "guam", name: "Guam", lat: 13.44, lon: 144.75, role: "landing", weight: 2, note: "The Pacific hinge. Echo and Bifrost both stop." },
  { id: "toucheng", name: "Toucheng", lat: 24.86, lon: 121.82, role: "landing", weight: 1, note: "Taiwan's east coast. Apricot." },
  { id: "perth", name: "Perth", lat: -31.95, lon: 115.86, role: "landing", weight: 1, note: "Indigo, between Singapore and Sydney." },
  { id: "auckland", name: "Auckland", lat: -36.85, lon: 174.76, role: "landing", weight: 1, note: "Southern Cross NEXT, between Sydney and Los Angeles." },
  { id: "valparaiso", name: "Valparaíso", lat: -33.05, lon: -71.62, role: "landing", weight: 1, note: "Curie. Santiago is inland." },
];

export type GlassKind = "ocean" | "coast" | "land";

export type Glass = {
  id: string;
  name: string;
  from: string;
  to: string;
  /** Design ceiling in Tbps, when a public figure exists. Not lit traffic. */
  tbps: number | null;
  kind: GlassKind;
  lift: number;
  note: string;
};

export const GLASS: Glass[] = [
  { id: "marea", name: "MAREA", from: "vb", to: "bilbao", tbps: 200, kind: "ocean", lift: 0, note: "Virginia Beach to Bilbao. About 200 Tbps design." },
  { id: "dunant", name: "Dunant", from: "vb", to: "sthilaire", tbps: 250, kind: "ocean", lift: 1, note: "Virginia Beach to Saint-Hilaire. 250 Tbps design." },
  { id: "grace-uk", name: "Grace Hopper", from: "bellport", to: "bude", tbps: 352, kind: "ocean", lift: 0, note: "One cable, two European beaches. 352 Tbps is the system, not each branch." },
  { id: "grace-es", name: "Grace Hopper", from: "bellport", to: "bilbao", tbps: 352, kind: "ocean", lift: 2, note: "The Bilbao branch of the same cable." },
  { id: "amitie-uk", name: "Amitié", from: "lynn", to: "bude", tbps: 320, kind: "ocean", lift: 1, note: "About 320 Tbps design. Some sellers quote a higher ceiling." },
  { id: "amitie-fr", name: "Amitié", from: "lynn", to: "leporge", tbps: 320, kind: "ocean", lift: 2, note: "The French branch. Same system number." },
  { id: "ellalink", name: "EllaLink", from: "fortaleza", to: "sines", tbps: 100, kind: "ocean", lift: 0, note: "The direct South America–Portugal cable. About 100 Tbps design." },
  { id: "sacs", name: "SACS", from: "fortaleza", to: "sangano", tbps: 40, kind: "ocean", lift: 1, note: "Fortaleza to Sangano, near Luanda. About 40 Tbps design." },
  { id: "monet", name: "Monet", from: "boca", to: "fortaleza", tbps: 64, kind: "ocean", lift: 0, note: "Florida to Fortaleza. About 64 Tbps design." },
  { id: "firmina-br", name: "Firmina", from: "myrtle", to: "fortaleza", tbps: null, kind: "ocean", lift: 2, note: "12 fiber pairs. No single design terabit I trust enough to print." },
  { id: "firmina-ar", name: "Firmina", from: "myrtle", to: "lastoninas", tbps: null, kind: "ocean", lift: 1, note: "The Argentina branch of the same cable." },
  { id: "faster", name: "FASTER", from: "pacificcity", to: "shima", tbps: 60, kind: "ocean", lift: 0, note: "Oregon to Shima. About 60 Tbps design." },
  { id: "jupiter", name: "Jupiter", from: "la", to: "shima", tbps: 60, kind: "ocean", lift: 1, note: "Los Angeles to Shima. About 60 Tbps design." },
  { id: "echo-w", name: "Echo", from: "eureka", to: "guam", tbps: 144, kind: "ocean", lift: 0, note: "California to Singapore via Guam. 144 Tbps is the system." },
  { id: "echo-e", name: "Echo", from: "guam", to: "singapore", tbps: 144, kind: "ocean", lift: 0, note: "The western half of Echo." },
  { id: "bifrost-w", name: "Bifrost", from: "grover", to: "guam", tbps: 180, kind: "ocean", lift: 1, note: "About 180 Tbps design. Indonesia and the Philippines are on the real path; this chord skips the bends." },
  { id: "bifrost-e", name: "Bifrost", from: "guam", to: "singapore", tbps: 180, kind: "ocean", lift: 1, note: "Shares Guam with Echo. It is a second cable." },
  { id: "apricot-s", name: "Apricot", from: "singapore", to: "toucheng", tbps: 190, kind: "ocean", lift: 2, note: "About 190 Tbps design. The real cable also bends through Guam and the Philippines." },
  { id: "apricot-n", name: "Apricot", from: "toucheng", to: "shima", tbps: 190, kind: "ocean", lift: 2, note: "Taiwan to the Japanese beach." },
  { id: "curie", name: "Curie", from: "la", to: "valparaiso", tbps: 72, kind: "ocean", lift: 0, note: "Los Angeles to Valparaíso. About 72 Tbps design." },
  { id: "sx-w", name: "Southern Cross NEXT", from: "sydney", to: "auckland", tbps: 72, kind: "ocean", lift: 0, note: "About 72 Tbps design, Sydney to Los Angeles via Auckland." },
  { id: "sx-e", name: "Southern Cross NEXT", from: "auckland", to: "la", tbps: 72, kind: "ocean", lift: 2, note: "The long half." },
  { id: "indigo-w", name: "Indigo", from: "singapore", to: "perth", tbps: 36, kind: "ocean", lift: 0, note: "About 36 Tbps design. A sketch of the published pair of cables." },
  { id: "indigo-e", name: "Indigo", from: "perth", to: "sydney", tbps: 36, kind: "ocean", lift: 1, note: "Perth to Sydney." },
  { id: "equiano-n", name: "Equiano", from: "sesimbra", to: "lagos", tbps: 144, kind: "ocean", lift: 0, note: "Portugal to Cape Town, with Lagos on the way. About 144 Tbps design." },
  { id: "equiano-s", name: "Equiano", from: "lagos", to: "capetown", tbps: 144, kind: "ocean", lift: 0, note: "The southern half. 2Africa runs nearby and is a different cable." },
  { id: "africa-w", name: "2Africa", from: "bude", to: "lagos", tbps: 180, kind: "ocean", lift: 2, note: "A ring, drawn as a spine. 180 Tbps is the announced system, not each hop." },
  { id: "africa-sw", name: "2Africa", from: "lagos", to: "capetown", tbps: 180, kind: "ocean", lift: 2, note: "West coast. The real cable stops many more times." },
  { id: "africa-se", name: "2Africa", from: "capetown", to: "mombasa", tbps: 180, kind: "ocean", lift: 1, note: "Around the south. Mozambique and Tanzania are on the real path." },
  { id: "africa-e", name: "2Africa", from: "mombasa", to: "djibouti", tbps: 180, kind: "ocean", lift: 0, note: "East Africa toward the Red Sea hinge." },
  { id: "africa-n", name: "2Africa", from: "djibouti", to: "marseille", tbps: 180, kind: "ocean", lift: 0, note: "Toward Marseille. Egypt and the Gulf branches are not all drawn." },
  { id: "peace-e", name: "Peace", from: "karachi", to: "djibouti", tbps: 90, kind: "ocean", lift: 1, note: "About 90 Tbps design in the public SDM table." },
  { id: "peace-w", name: "Peace", from: "djibouti", to: "marseille", tbps: 90, kind: "ocean", lift: 1, note: "The same system, into Marseille." },
  { id: "smw-1", name: "SEA-ME-WE 6", from: "singapore", to: "chennai", tbps: 126, kind: "ocean", lift: 1, note: "About 126 Tbps design. Singapore to France, drawn through India and Djibouti." },
  { id: "smw-2", name: "SEA-ME-WE 6", from: "chennai", to: "mumbai", tbps: 126, kind: "ocean", lift: 1, note: "Around India. The real cable follows the coast, not this chord." },
  { id: "smw-3", name: "SEA-ME-WE 6", from: "mumbai", to: "djibouti", tbps: 126, kind: "ocean", lift: 2, note: "Across the Arabian Sea." },
  { id: "smw-4", name: "SEA-ME-WE 6", from: "djibouti", to: "marseille", tbps: 126, kind: "ocean", lift: 2, note: "The Mediterranean end. One design number for the whole system." },
  { id: "iex", name: "IEX", from: "mumbai", to: "genoa", tbps: 200, kind: "ocean", lift: 0, note: "India–Europe Express. About 200 Tbps design." },
  { id: "iax", name: "IAX", from: "mumbai", to: "singapore", tbps: 200, kind: "ocean", lift: 2, note: "India–Asia Express. About 200 Tbps design." },
  { id: "blue", name: "Blue Raman", from: "genoa", to: "telaviv", tbps: 400, kind: "ocean", lift: 1, note: "Blue plus Raman. An announced design near 400 Tbps for the pair. Sources still disagree on the ceiling." },
  { id: "raman", name: "Blue Raman", from: "aqaba", to: "mumbai", tbps: 400, kind: "ocean", lift: 0, note: "Aqaba toward Mumbai. The desert between the two beaches is not one cable." },
  { id: "land-vb", name: "US east", from: "vb", to: "ashburn", tbps: null, kind: "land", lift: 0, note: "Beach to the Virginia campus." },
  { id: "land-bell", name: "US east", from: "bellport", to: "nyc", tbps: null, kind: "land", lift: 0, note: "Long Island into the city." },
  { id: "land-lynn", name: "US east", from: "lynn", to: "nyc", tbps: null, kind: "land", lift: 0, note: "Massachusetts into New York." },
  { id: "land-nyc", name: "US east", from: "nyc", to: "ashburn", tbps: null, kind: "land", lift: 0, note: "The corridor." },
  { id: "land-myrtle", name: "US east", from: "myrtle", to: "atlanta", tbps: null, kind: "land", lift: 0, note: "Beach to Atlanta." },
  { id: "land-boca", name: "US east", from: "boca", to: "atlanta", tbps: null, kind: "land", lift: 0, note: "Florida to Atlanta." },
  { id: "land-ash-atl", name: "US mesh", from: "ashburn", to: "atlanta", tbps: null, kind: "land", lift: 0, note: "Inland. No design terabit, because this is not one cable." },
  { id: "land-ash-chi", name: "US mesh", from: "ashburn", to: "chicago", tbps: null, kind: "land", lift: 0, note: "East to the lakes." },
  { id: "land-atl-dal", name: "US mesh", from: "atlanta", to: "dallas", tbps: null, kind: "land", lift: 0, note: "South inland." },
  { id: "land-dal-phx", name: "US mesh", from: "dallas", to: "phoenix", tbps: null, kind: "land", lift: 0, note: "Toward the desert." },
  { id: "land-phx-sc", name: "US mesh", from: "phoenix", to: "santaclara", tbps: null, kind: "land", lift: 0, note: "Desert to the Bay." },
  { id: "land-chi-cb", name: "US mesh", from: "chicago", to: "councilbluffs", tbps: null, kind: "land", lift: 0, note: "Out to the plains hall." },
  { id: "land-chi-tor", name: "US mesh", from: "chicago", to: "toronto", tbps: null, kind: "land", lift: 0, note: "Across the lakes." },
  { id: "land-dal-qro", name: "US mesh", from: "dallas", to: "queretaro", tbps: null, kind: "land", lift: 0, note: "Texas to the Mexican campus." },
  { id: "land-eur", name: "California", from: "eureka", to: "santaclara", tbps: null, kind: "land", lift: 0, note: "Landing to the Bay." },
  { id: "land-grover", name: "California", from: "grover", to: "santaclara", tbps: null, kind: "land", lift: 0, note: "The other beach, same campus." },
  { id: "land-la", name: "California", from: "la", to: "santaclara", tbps: null, kind: "land", lift: 0, note: "Los Angeles up the valley." },
  { id: "land-pc", name: "Columbia", from: "pacificcity", to: "thedalles", tbps: null, kind: "land", lift: 0, note: "Beach to the river hall." },
  { id: "land-td-sc", name: "Columbia", from: "thedalles", to: "santaclara", tbps: null, kind: "land", lift: 0, note: "River to the Bay." },
  { id: "land-td-qu", name: "Columbia", from: "thedalles", to: "quincy", tbps: null, kind: "land", lift: 0, note: "Upriver, then inland." },
  { id: "land-mrs-mil", name: "Europe", from: "marseille", to: "milan", tbps: null, kind: "land", lift: 0, note: "The sea stops. The land route north begins." },
  { id: "land-gen-mil", name: "Europe", from: "genoa", to: "milan", tbps: null, kind: "land", lift: 0, note: "A short climb from the beach." },
  { id: "land-mil-fra", name: "Europe", from: "milan", to: "frankfurt", tbps: null, kind: "land", lift: 0, note: "Toward the exchange." },
  { id: "land-fra-ams", name: "Europe", from: "frankfurt", to: "amsterdam", tbps: null, kind: "land", lift: 0, note: "Two exchanges, no ocean between them." },
  { id: "land-fra-par", name: "Europe", from: "frankfurt", to: "paris", tbps: null, kind: "land", lift: 0, note: "Inland." },
  { id: "land-ams-slo", name: "Europe", from: "amsterdam", to: "slough", tbps: null, kind: "land", lift: 0, note: "The chord crosses water. The pipes are a bundle, not one named ocean." },
  { id: "land-slo-lon", name: "Europe", from: "slough", to: "london", tbps: null, kind: "land", lift: 0, note: "Campus to the city exchange." },
  { id: "land-par-mad", name: "Europe", from: "paris", to: "madrid", tbps: null, kind: "land", lift: 0, note: "So Madrid is not an island." },
  { id: "land-fra-waw", name: "Europe", from: "frankfurt", to: "warsaw", tbps: null, kind: "land", lift: 0, note: "East from the exchange." },
  { id: "land-ham", name: "Nordics", from: "hamina", to: "stockholm", tbps: null, kind: "land", lift: 0, note: "Cold hall to the city." },
  { id: "land-lul", name: "Nordics", from: "lulea", to: "stockholm", tbps: null, kind: "land", lift: 0, note: "The long northern leg." },
  { id: "farice", name: "FARICE", from: "reykjavik", to: "dublin", tbps: null, kind: "coast", lift: 0, note: "The Iceland hop. Capacity left blank on purpose." },
  { id: "irish", name: "Irish Sea", from: "dublin", to: "slough", tbps: null, kind: "coast", lift: 1, note: "Several short cables. Not one design number." },
  { id: "kj", name: "Korea–Japan", from: "seoul", to: "osaka", tbps: null, kind: "coast", lift: 0, note: "A bundle of short cables, drawn as one chord." },
  { id: "jp-land", name: "Japan", from: "shima", to: "osaka", tbps: null, kind: "land", lift: 0, note: "Beach to the room." },
  { id: "jp-spine", name: "Japan", from: "osaka", to: "tokyo", tbps: null, kind: "land", lift: 0, note: "The domestic spine." },
  { id: "strait", name: "Strait", from: "singapore", to: "jakarta", tbps: null, kind: "coast", lift: 0, note: "A short strait with many cables." },
  { id: "india-land", name: "India", from: "chennai", to: "mumbai", tbps: null, kind: "land", lift: 0, note: "Across the peninsula, separate from the sea cable." },
  { id: "cn-1", name: "China", from: "zhangjiakou", to: "shanghai", tbps: null, kind: "land", lift: 0, note: "Cloud region to the coast. Terrestrial." },
  { id: "cn-2", name: "China", from: "shanghai", to: "shenzhen", tbps: null, kind: "land", lift: 0, note: "The coastal corridor." },
  { id: "cn-3", name: "China", from: "shenzhen", to: "hongkong", tbps: null, kind: "land", lift: 0, note: "A very short hop." },
  { id: "br-land", name: "Brazil", from: "fortaleza", to: "saopaulo", tbps: null, kind: "land", lift: 0, note: "The beach corner down to the exchange." },
  { id: "andes", name: "Andes", from: "saopaulo", to: "santiago", tbps: null, kind: "land", lift: 0, note: "A chord across the continent, not the road and not the coastal cables." },
  { id: "cl-land", name: "Chile", from: "valparaiso", to: "santiago", tbps: null, kind: "land", lift: 0, note: "Beach to the city." },
  { id: "za-land", name: "South Africa", from: "capetown", to: "johannesburg", tbps: null, kind: "land", lift: 0, note: "The climb inland." },
  { id: "ke-land", name: "Kenya", from: "mombasa", to: "nairobi", tbps: null, kind: "land", lift: 0, note: "Beach to the highlands." },
  { id: "au-land", name: "Australia", from: "sydney", to: "melbourne", tbps: null, kind: "land", lift: 0, note: "The southeast corridor." },
];

export function glassColor(kind: GlassKind) {
  if (kind === "land") return "#c4a574";
  if (kind === "coast") return "#a394c9";
  return "#8aa0ae";
}

export function glassSystems(cables: Glass[]) {
  const map = new Map<string, { name: string; tbps: number | null; kind: GlassKind; note: string }>();
  for (const cable of cables) {
    if (!map.has(cable.name)) map.set(cable.name, { name: cable.name, tbps: cable.tbps, kind: cable.kind, note: cable.note });
  }
  return [...map.values()];
}
