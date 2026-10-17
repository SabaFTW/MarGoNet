import { i as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, a as useFrame, c as BufferAttribute, d as MathUtils, f as Quaternion, i as Canvas, l as BufferGeometry, m as Vector3, n as useTexture, o as useThree, p as Spherical, r as Html, t as OrbitControls, u as CanvasTexture, v as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { a as Plus, c as PanelBottom, i as Search, l as Minus, o as PanelRight, r as Trash2, s as PanelLeft, t as X, u as MapPin } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CqLBg4v1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function event(id, title, category, start, end, lat, lon, place, summary) {
	return {
		id,
		title,
		category,
		start,
		end,
		lat,
		lon,
		place,
		summary
	};
}
var SEED = [
	event("geocentrism", "Geocentric cosmos", "idea", -400, 1687, 37.98, 23.73, "Athens", "Earth sits still and the heavens wheel around it. Copernicus prints the opposite in 1543; courts and classrooms keep the old sky for generations after."),
	event("humoral", "Humoral medicine", "idea", -400, 1858, 36.89, 27.29, "Kos", "Health is a balance of four humors. Bloodletting is still prescribed while steam engines, vaccines, and telescopes are already in the world."),
	event("miasma", "Miasma", "idea", -400, 1884, 51.51, -.1, "London", "Disease is blamed on foul air. The idea is still taught while germs are being named, and it lingers past the first vaccines."),
	event("spontaneous", "Spontaneous generation", "idea", -350, 1859, 48.85, 2.35, "Paris", "Life, it was said, arises by itself from rot. Pasteur's swan-neck flasks close the argument the same year Darwin publishes."),
	event("alchemy", "Alchemy", "idea", -300, 1661, 31.2, 29.92, "Alexandria", "A practical and mystical search for transmutation. It runs under empires, crusades, and the printing press, and only loosens its grip with Boyle."),
	event("phlogiston", "Phlogiston", "idea", 1667, 1778, 51.48, 11.97, "Halle", "Fire is the escape of a substance called phlogiston. Chemists use it while Newton is already law, until Lavoisier names oxygen."),
	event("roman", "Roman Empire", "power", -27, 476, 41.89, 12.49, "Rome", "From Augustus to the fall of the Western empire. Paper is invented in China while this state is already old."),
	event("han", "Han dynasty", "power", -206, 220, 34.34, 108.94, "Chang'an", "A Chinese imperial age that overlaps the Roman world and sees the court record that will later be tied to paper."),
	event("islamic-golden", "Islamic Golden Age", "power", 750, 1258, 33.34, 44.4, "Baghdad", "Translation, algebra, medicine, and astronomy flourish. It is cut short in the old telling by the fall of Baghdad to the Mongols."),
	event("mongol", "Mongol Empire", "power", 1206, 1368, 47.21, 102.84, "Karakorum", "From Temüjin's rise to the fall of the Yuan. The largest contiguous land empire, overlapping the late crusades and the plague centuries."),
	event("ottoman", "Ottoman Empire", "power", 1299, 1922, 41.01, 29.05, "Istanbul", "A six-century power across three continents. It is young when Constantinople falls and still standing at the start of the First World War."),
	event("ming", "Ming dynasty", "power", 1368, 1644, 39.91, 116.4, "Beijing", "Rules China from the end of the Yuan through the arrival of the telescope in Europe. Falls as the Qing take the capital."),
	event("british", "British Empire", "power", 1600, 1947, 51.5, -.13, "London", "Marked from the East India Company charter to Indian independence — a convenient span, not a single morning. It covers Newton, steam, and both world wars."),
	event("slave-trade", "Atlantic slave trade", "power", 1526, 1867, 5.1, -1.35, "Elmina", "European ships carry enslaved Africans across the Atlantic. Marked at Elmina, a major point of departure. It runs beside the telescope, the steam engine, and germ theory's dawn."),
	event("greco-persian", "Greco-Persian Wars", "war", -499, -449, 38.02, 23.82, "Athens", "A fifty-year struggle between the Greek cities and the Achaemenid empire. Marathon, Thermopylae, Salamis."),
	event("peloponnesian", "Peloponnesian War", "war", -431, -404, 37.08, 22.43, "Sparta", "Athens against Sparta and their leagues. Twenty-seven years that exhaust the classical Greek world."),
	event("alexander", "Alexander's campaigns", "war", -336, -323, 40.75, 22.52, "Pella", "Thirteen years from Philip's death to Babylon. The empire splits almost as soon as it is made."),
	event("punic", "Punic Wars", "war", -264, -146, 36.85, 10.32, "Carthage", "Rome and Carthage, three wars across 118 years. Hannibal crosses the Alps in the middle of a conflict older than a human life."),
	event("qin", "Qin unification", "war", -230, -221, 34.4, 108.72, "Xianyang", "A decade of conquest ends the Warring States and makes the first imperial China. The dynasty itself is brief; the shape remains."),
	event("gallic", "Gallic Wars", "war", -58, -50, 47.54, 4.5, "Alesia", "Caesar's campaigns in Gaul. Eight years, written up by the man who fought them, and a step toward the end of the Republic."),
	event("viking", "Viking Age", "war", 793, 1066, 55.67, -1.8, "Lindisfarne", "From the raid on Lindisfarne to Stamford Bridge. Nearly three centuries of raiding, settling, and trading, not one continuous battle."),
	event("crusades", "The Crusades", "war", 1096, 1291, 31.78, 35.23, "Jerusalem", "Latin Christian campaigns in the eastern Mediterranean, nearly two hundred years from the First Crusade to the fall of Acre."),
	event("hundred-years", "Hundred Years' War", "war", 1337, 1453, 50.46, 2.14, "Azincourt", "England and France, 116 years — longer than the name admits. It ends the same year Constantinople falls, while type is already being cut in Mainz."),
	event("constantinople", "Fall of Constantinople", "war", 1453, 1453, 41.02, 28.95, "Constantinople", "The Ottoman siege takes the city in the spring of 1453. A moment on the bar, and the end of the Roman east. Movable type in Europe is thirteen years old."),
	event("roses", "Wars of the Roses", "war", 1455, 1487, 53.96, -1.08, "Towton", "Lancaster and York. Thirty-two years of dynastic war that begin two years after the Hundred Years' War ends."),
	event("aztec", "Conquest of the Aztec Empire", "war", 1519, 1521, 19.43, -99.13, "Tenochtitlan", "Cortés and his allies take the Mexica capital in under three years. Gunpowder is already centuries old in China; germs travel with the ships."),
	event("thirty-years", "Thirty Years' War", "war", 1618, 1648, 50.09, 14.42, "Prague", "A European war of religion and state that lasts a generation. The telescope is already a decade old when it begins."),
	event("us-revolution", "American Revolutionary War", "war", 1775, 1783, 39.95, -75.17, "Philadelphia", "Eight years from Lexington to the Treaty of Paris. Oxygen has just been named; the steam engine is already pumping mines."),
	event("french-revolution", "French Revolution", "war", 1789, 1799, 48.86, 2.34, "Paris", "A decade that unseats a monarchy. Jenner has demonstrated vaccination three years before it starts; humoral medicine is still everywhere."),
	event("napoleonic", "Napoleonic Wars", "war", 1803, 1815, 50.68, 4.41, "Waterloo", "Twelve years of coalition war across Europe, ending in a Belgian field. The telegraph has not been built. Slavery in the Atlantic trade has not ended."),
	event("us-civil", "American Civil War", "war", 1861, 1865, 39.83, -77.23, "Gettysburg", "Four years. Germ theory is published as it begins. The Atlantic slave trade has only just stopped; slavery in the United States has not."),
	event("wwi", "First World War", "war", 1914, 1918, 50.85, 2.89, "Ypres", "Four years and a continental grave. Flight is eleven years old. Penicillin has not been noticed. The Ottoman Empire is still in the war."),
	event("wwii", "Second World War", "war", 1939, 1945, 48.71, 44.51, "Stalingrad", "Six years, marked here at Stalingrad though it was fought worldwide. Fission has been discovered; the transistor has not."),
	event("cold-war", "Cold War", "war", 1947, 1991, 52.52, 13.38, "Berlin", "Forty-four years without a declared world war and with several hot ones inside it. It covers the transistor, DNA, the Moon, and the early web."),
	event("korea", "Korean War", "war", 1950, 1953, 38.3, 127.2, "Korea", "Three years. DNA's structure is published as it ends. The Cold War is the longer bar underneath."),
	event("vietnam", "Vietnam War", "war", 1955, 1975, 21.03, 105.85, "Hanoi", "Twenty years by the usual American dating, longer in Vietnamese memory. Apollo lands in the middle of it. ARPANET is switched on in the middle of it."),
	event("wheel", "The wheel", "invention", -3500, -3500, 31.32, 45.64, "Uruk", "In use in Mesopotamia. The year is a scholarly estimate, not a diary entry — a mark at the far edge of this ledger."),
	event("writing", "Writing", "invention", -3200, -3200, 31.3, 45.66, "Uruk", "Cuneiform accounts in Sumer. Again a horizon, not a birthday: the oldest surviving tablets cluster near this century."),
	event("iron", "Iron smelting", "invention", -1200, -1100, 40.02, 34.62, "Hattusa", "Smelted iron spreads from Anatolia as the Bronze Age kingdoms falter. A century of adoption, not a single forge."),
	event("paper", "Paper", "invention", 105, 105, 34.62, 112.45, "Luoyang", "Cai Lun presents a paper process to the Han court. Rome is still centuries from its western fall. Printing is a thousand years off."),
	event("gunpowder", "Gunpowder", "invention", 850, 900, 34.27, 108.95, "Chang'an", "Recorded among Chinese alchemists in the ninth century. It will be centuries more before it remakes European battlefields."),
	event("bi-sheng", "Bi Sheng's movable type", "invention", 1040, 1048, 34.8, 114.31, "Kaifeng", "Fired-clay type in Song China, four centuries before Gutenberg. The compass is described in the same century. Crusading Europe has not heard of either."),
	event("compass", "Magnetic compass", "invention", 1088, 1088, 32.19, 119.43, "Zhenjiang", "Shen Kuo describes a magnetized needle. Sailors already trust it while European maps still owe their north to habit and stars."),
	event("gutenberg", "Gutenberg's press", "invention", 1440, 1455, 50, 8.27, "Mainz", "Metal type in the Rhineland. In this same stretch the Hundred Years' War ends, Constantinople falls, and schools still teach that the Sun goes around the Earth."),
	event("telescope", "Telescope", "invention", 1608, 1609, 52.08, 4.31, "The Hague", "A Dutch spectacle-maker's patent. Within two years Galileo turns one on Jupiter. Humoral medicine and alchemy are both still respectable."),
	event("steam", "Newcomen engine", "invention", 1712, 1712, 52.51, -2.09, "Dudley", "The first practical steam engine pumps a mine. Phlogiston is still the theory of fire. The Atlantic slave trade has two centuries left."),
	event("vaccine", "Vaccination", "invention", 1796, 1796, 51.69, -2.46, "Berkeley", "Jenner shows that cowpox protects against smallpox. The French Revolution has already begun. Miasma is still the popular theory of disease."),
	event("telegraph", "Electric telegraph", "invention", 1837, 1844, 39.29, -76.61, "Baltimore", "From Cooke and Wheatstone, and Morse, to a line that speaks. News outruns a horse. Humoral theory is not dead yet."),
	event("telephone", "Telephone", "invention", 1876, 1876, 42.35, -71.06, "Boston", "Bell's patent. The light bulb, the car, and the airplane are still ahead. Germ theory is fifteen years old and not yet won."),
	event("light", "Practical electric light", "invention", 1879, 1879, 40.56, -74.34, "Menlo Park", "Edison's carbon-filament lamp that can be sold and kept on. Cities are still gaslit. The automobile is seven years away."),
	event("automobile", "Automobile", "invention", 1886, 1886, 49.49, 8.47, "Mannheim", "Benz patents a three-wheeled motorwagen. Flight is seventeen years off. Miasma has only just been retired."),
	event("airplane", "Airplane", "invention", 1903, 1903, 36.06, -75.7, "Kitty Hawk", "The Wright Flyer leaves the ground for twelve seconds. Relativity is two years away. The world wars have not started."),
	event("penicillin", "Penicillin", "invention", 1928, 1928, 51.52, -.18, "London", "Fleming notices a mold killing staphylococci. It is a observation, not yet a medicine. Mass production waits until the next world war."),
	event("fission", "Nuclear fission", "discovery", 1938, 1938, 52.43, 13.53, "Berlin", "Hahn and Strassmann split the uranium nucleus. The Second World War begins the next year. The consequences outrun the paper."),
	event("transistor", "Transistor", "invention", 1947, 1947, 40.7, -74.4, "Murray Hill", "Bardeen, Brattain, and Shockley at Bell Labs. The Cold War is weeks old. The integrated world we live in starts as a laboratory curiosity."),
	event("arpanet", "ARPANET", "invention", 1969, 1969, 34.07, -118.44, "Los Angeles", "The first packets between research machines. The same year, two humans walk on the Moon. The Vietnam War is not over."),
	event("web", "World Wide Web", "invention", 1989, 1989, 46.23, 6.05, "CERN", "Berners-Lee's proposal. The Cold War has two years left. The web is an idea in a lab before it is a place people live."),
	event("iphone", "iPhone", "invention", 2007, 2007, 37.33, -122.03, "Cupertino", "A phone, a browser, and a pocket computer sold as one object. The web is eighteen. Most of the ledger is older than every person in the queue."),
	event("eratosthenes", "Size of the Earth", "discovery", -240, -240, 31.21, 29.95, "Alexandria", "Eratosthenes measures the planet's circumference with a well, a shadow, and the distance to Syene. The number is remarkably close. Geocentrism is untouched."),
	event("copernicus", "Heliocentrism published", "discovery", 1543, 1543, 54.36, 19.68, "Frombork", "De revolutionibus puts the Sun near the center. It does not, by itself, end the old cosmos — Galileo is tried for the new one ninety years later."),
	event("galileo", "Galileo's moons", "discovery", 1610, 1610, 45.41, 11.88, "Padua", "Sidereus Nuncius: Jupiter has moons of its own, so not everything orbits Earth. Alchemy and geocentrism are both still alive."),
	event("newton", "Principia", "discovery", 1687, 1687, 52.2, .12, "Cambridge", "Newton gives the sky and the falling apple one law. On this ledger, that is where the geocentric bar finally stops — belief in the street took longer."),
	event("oxygen", "Oxygen", "discovery", 1778, 1778, 48.85, 2.3, "Paris", "Lavoisier names oxygen and retires phlogiston. The American war is underway. Vaccination is still eighteen years off."),
	event("darwin", "Origin of Species", "discovery", 1859, 1859, 51.33, .05, "Down House", "Darwin's book. The same year, spontaneous generation loses its last serious defense. Humoral medicine is a year from its usual end date here, and not gone from practice."),
	event("germs", "Germ theory", "discovery", 1861, 1861, 48.84, 2.3, "Paris", "Pasteur links specific microbes to specific spoilage and disease. The American Civil War starts this year. Miasma still has two decades of believers."),
	event("relativity", "Special relativity", "discovery", 1905, 1905, 46.95, 7.44, "Bern", "Einstein, a patent clerk, rewrites space and time. Flight is two years old. The world is nine years from a war that will not use this paper."),
	event("dna", "Structure of DNA", "discovery", 1953, 1953, 52.21, .1, "Cambridge", "Watson, Crick, Franklin's data, Wilkins: the double helix. The Korean War ends. The Moon landing is sixteen years away."),
	event("apollo", "Apollo 11", "discovery", 1969, 1969, 28.57, -80.65, "Kennedy Space Center", "Humans stand on the Moon. ARPANET sends its first packets the same year. A war in Vietnam is still being fought."),
	event("higgs", "Higgs boson announced", "discovery", 2012, 2012, 46.23, 6.08, "CERN", "The particle predicted in 1964 is reported at the same laboratory that proposed the web. The phone in a pocket is five years old.")
];
function allEvents(custom) {
	return [...SEED, ...custom];
}
function findEvent(custom, id) {
	if (!id) return void 0;
	return SEED.find((item) => item.id === id) ?? custom.find((item) => item.id === id);
}
function isChecked(checked, id) {
	return checked[id] !== false;
}
var CATEGORIES = [
	{
		id: "idea",
		label: "Ideas",
		hint: "What was still held to be true"
	},
	{
		id: "war",
		label: "Wars",
		hint: "Conflicts, and how long they lasted"
	},
	{
		id: "power",
		label: "Powers",
		hint: "Empires, states, and systems"
	},
	{
		id: "invention",
		label: "Inventions",
		hint: "Things newly made"
	},
	{
		id: "discovery",
		label: "Discoveries",
		hint: "Things newly understood"
	}
];
var YEAR_MIN = -3500;
var YEAR_MAX = 2026;
var SPANS = [
	25,
	50,
	100,
	250,
	500,
	1e3,
	2500,
	5526
];
function clampYear(year) {
	if (!Number.isFinite(year)) return 1453;
	return Math.max(YEAR_MIN, Math.min(YEAR_MAX, Math.round(year)));
}
function formatYear(year) {
	if (year === 0) return "Year 0";
	if (year < 0) return `${Math.abs(year)} BC`;
	return `${year} AD`;
}
function formatYearCompact(year) {
	if (year < 0) return `−${Math.abs(year)}`;
	return String(year);
}
function formatSpan(start, end) {
	if (start === end) return formatYear(start);
	if (start < 0 && end < 0) return `${Math.abs(start)}–${Math.abs(end)} BC`;
	if (start < 0 && end > 0) return `${Math.abs(start)} BC – ${end} AD`;
	if (start < 0 && end === 0) return `${Math.abs(start)} BC – 0`;
	return `${start}–${end} AD`;
}
function durationYears(event) {
	return Math.max(0, event.end - event.start);
}
function durationLabel(event) {
	const span = durationYears(event);
	if (span <= 0) return "a moment";
	if (span === 1) return "1 year";
	return `${span} years`;
}
function spanName(years) {
	if (years <= 25) return "A generation";
	if (years <= 50) return "Half a century";
	if (years <= 100) return "A century";
	if (years <= 250) return "Two centuries";
	if (years <= 500) return "Five centuries";
	if (years <= 1e3) return "A millennium";
	if (years <= 2500) return "Two millennia";
	return "The whole ledger";
}
function viewWindow(year, span) {
	const total = YEAR_MAX - YEAR_MIN;
	const width = Math.min(span, total);
	let start = year - width / 2;
	let end = start + width;
	if (start < -3500) {
		start = YEAR_MIN;
		end = YEAR_MIN + width;
	}
	if (end > 2026) {
		end = YEAR_MAX;
		start = YEAR_MAX - width;
	}
	return {
		start,
		end
	};
}
function tickStep(span) {
	if (span <= 25) return 5;
	if (span <= 50) return 10;
	if (span <= 100) return 20;
	if (span <= 250) return 50;
	if (span <= 500) return 100;
	if (span <= 1e3) return 200;
	if (span <= 2500) return 500;
	return 500;
}
function parseYear(input) {
	const raw = input.trim();
	if (!raw) return null;
	const lower = raw.toLowerCase();
	const bc = /\b(bc|bce)\b/.test(lower);
	const negative = raw.startsWith("-") || raw.startsWith("−") || raw.startsWith("–");
	const digits = raw.replace(/[−–—-]/g, "").replace(/[^\d]/g, "");
	if (!digits) return null;
	const value = Number.parseInt(digits, 10);
	if (!Number.isFinite(value)) return null;
	if (bc || negative) return -Math.abs(value);
	return value;
}
function joinTitles(events) {
	const names = events.map((event) => event.title);
	if (names.length <= 1) return names[0] ?? "";
	if (names.length === 2) return `${names[0]} and ${names[1]}`;
	return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}
function meanwhile(year, events, selected) {
	if (selected) return {
		kicker: `${selected.place} · ${formatSpan(selected.start, selected.end)} · ${durationLabel(selected)}`,
		body: selected.summary
	};
	const active = events.filter((event) => event.start <= year && year <= event.end);
	const begins = active.filter((event) => event.start === year);
	const ends = active.filter((event) => event.end === year && event.start !== year);
	const ideas = active.filter((event) => event.category === "idea" && event.start !== year && event.end !== year);
	const running = active.filter((event) => event.category !== "idea" && event.start !== year && event.end !== year);
	const parts = [];
	if (begins.length) parts.push(`${joinTitles(begins)} ${begins.length > 1 ? "begin" : "begins"}`);
	if (ends.length) parts.push(`${joinTitles(ends)} ${ends.length > 1 ? "come to an end" : "comes to an end"}`);
	if (running.length) parts.push(`still underway: ${joinTitles(running.slice(0, 3))}`);
	if (ideas.length) parts.push(`still held: ${joinTitles(ideas.slice(0, 3))}`);
	if (!parts.length) return {
		kicker: "Nothing checked",
		body: "No thread on the ledger covers this year. Open the ledger and tick a war, an invention, or an idea that outlived both."
	};
	let body = `${parts.join(". ")}.`;
	body = body.charAt(0).toUpperCase() + body.slice(1);
	if (year === 0) body = `This wheel keeps a year 0 as a hinge — historians step from 1 BC to 1 AD. ${body}`;
	return {
		kicker: active.length === 1 ? "One thread" : `${active.length} threads at once`,
		body
	};
}
function covers(event, year) {
	return event.start <= year && year <= event.end;
}
function initialPanels() {
	if (typeof window === "undefined") return {
		left: true,
		right: true,
		bottom: true
	};
	if (window.innerWidth < 900) return {
		left: false,
		right: false,
		bottom: true
	};
	return {
		left: true,
		right: true,
		bottom: true
	};
}
function validEvent(value) {
	if (!value || typeof value !== "object") return false;
	const event = value;
	return typeof event.id === "string" && typeof event.title === "string" && typeof event.start === "number" && typeof event.end === "number" && typeof event.lat === "number" && typeof event.lon === "number";
}
var memoryStorage = {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0
};
var useTimeline = create()(persist((set, get) => ({
	year: 1453,
	setYear: (year) => set({ year: clampYear(year) }),
	nudgeYear: (delta) => set({ year: clampYear(get().year + delta) }),
	checked: {},
	toggle: (id) => {
		const checked = { ...get().checked };
		checked[id] = checked[id] === false;
		set({ checked });
	},
	setMany: (ids, on) => {
		const checked = { ...get().checked };
		for (const id of ids) checked[id] = on;
		set({ checked });
	},
	showAll: () => set({ checked: {} }),
	hideAll: () => {
		const checked = {};
		for (const event of allEvents(get().custom)) checked[event.id] = false;
		set({ checked });
	},
	panels: initialPanels(),
	togglePanel: (key) => {
		const open = !get().panels[key];
		const panels = {
			...get().panels,
			[key]: open
		};
		const narrow = typeof window !== "undefined" && window.innerWidth < 900;
		if (narrow && open && key === "left") panels.right = false;
		if (narrow && open && key === "right") panels.left = false;
		set({ panels });
	},
	closeSides: () => set({ panels: {
		...get().panels,
		left: false,
		right: false
	} }),
	spanIndex: SPANS.indexOf(500),
	zoom: (direction) => {
		const next = get().spanIndex + direction;
		if (next < 0 || next >= SPANS.length) return;
		set({ spanIndex: next });
	},
	selectedId: null,
	focusNonce: 0,
	select: (id, opts) => {
		const event = allEvents(get().custom).find((item) => item.id === id);
		let year = get().year;
		if (typeof opts?.year === "number") year = clampYear(opts.year);
		else if (event && (year < event.start || year > event.end)) year = clampYear(event.start);
		const fly = opts?.fly !== false && Boolean(id);
		set({
			selectedId: id,
			year,
			focusNonce: fly ? get().focusNonce + 1 : get().focusNonce
		});
	},
	custom: [],
	addCustom: (event) => set({ custom: [...get().custom, event] }),
	removeCustom: (id) => set({
		custom: get().custom.filter((event) => event.id !== id),
		selectedId: get().selectedId === id ? null : get().selectedId
	}),
	pinArmed: false,
	setPinArmed: (armed) => set({ pinArmed: armed }),
	pin: null,
	setPin: (pin) => set({ pin })
}), {
	name: "aera-ledger",
	version: 1,
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : localStorage),
	partialize: (state) => ({
		year: state.year,
		checked: state.checked,
		custom: state.custom,
		spanIndex: state.spanIndex
	}),
	merge: (persisted, current) => {
		const saved = persisted;
		if (!saved || typeof saved !== "object") return current;
		const spanIndex = typeof saved.spanIndex === "number" ? Math.max(0, Math.min(SPANS.length - 1, saved.spanIndex)) : current.spanIndex;
		return {
			...current,
			year: clampYear(typeof saved.year === "number" ? saved.year : current.year),
			checked: saved.checked && typeof saved.checked === "object" ? saved.checked : {},
			custom: Array.isArray(saved.custom) ? saved.custom.filter(validEvent) : [],
			spanIndex
		};
	}
}));
function latLonToXYZ(lat, lon, radius) {
	const phi = (90 - lat) * Math.PI / 180;
	const theta = (lon + 180) * Math.PI / 180;
	const sinPhi = Math.sin(phi);
	return [
		-radius * sinPhi * Math.cos(theta),
		radius * Math.cos(phi),
		radius * sinPhi * Math.sin(theta)
	];
}
function xyzToLatLon(x, y, z) {
	const lat = 90 - Math.acos(Math.min(1, Math.max(-1, y / (Math.hypot(x, y, z) || 1)))) * 180 / Math.PI;
	let lon = Math.atan2(z, -x) * 180 / Math.PI - 180;
	if (lon > 180) lon -= 360;
	if (lon <= -180) lon += 360;
	return {
		lat,
		lon
	};
}
/** Mirrors the CSS tokens. WebGL cannot read the stylesheet reliably at init. */
var CATEGORY_HEX = {
	war: "#c46a58",
	invention: "#d4a35c",
	discovery: "#6aafa6",
	idea: "#a394c9",
	power: "#8aa56e"
};
var BRASS_HEX = "#c4a574";
var CATEGORY_DOT = {
	war: "bg-war",
	invention: "bg-invention",
	discovery: "bg-discovery",
	idea: "bg-idea",
	power: "bg-power"
};
var CATEGORY_BAR = {
	war: "bg-war text-bg",
	invention: "bg-invention text-bg",
	discovery: "bg-discovery text-bg",
	idea: "bg-idea text-bg",
	power: "bg-power text-bg"
};
var SUN = new Vector3(4.2, 1.55, -1.35).normalize();
var HOME = latLonToXYZ(18, 12, 2.85);
var earthVert = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorld;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
var earthFrag = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorld;
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDir;
  void main() {
    vec3 day = sRGBTransferEOTF(vec4(texture2D(dayMap, vUv).rgb, 1.0)).rgb;
    vec3 night = sRGBTransferEOTF(vec4(texture2D(nightMap, vUv).rgb, 1.0)).rgb;
    vec3 n = normalize(vNormalW);
    float ndl = dot(n, normalize(sunDir));
    float dayMix = smoothstep(-0.12, 0.28, ndl);
    vec3 color = mix(night * 1.85 + day * 0.045, day, dayMix);
    vec3 viewDir = normalize(cameraPosition - vWorld);
    vec3 halfDir = normalize(normalize(sunDir) + viewDir);
    float spec = pow(max(dot(n, halfDir), 0.0), 48.0);
    float ocean = smoothstep(0.02, 0.22, day.b - day.r);
    color += spec * ocean * dayMix * 0.42;
    float limb = pow(max(dot(n, viewDir), 0.0), 0.42);
    color *= mix(0.78, 1.0, limb);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;
var cloudVert = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
var cloudFrag = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  void main() {
    vec4 tex = texture2D(cloudMap, vUv);
    float alpha = max(tex.a, tex.r);
    float ndl = dot(normalize(vNormalW), normalize(sunDir));
    float light = smoothstep(-0.15, 0.45, ndl);
    gl_FragColor = vec4(vec3(0.95), alpha * (0.05 + 0.42 * light));
    #include <colorspace_fragment>
  }
`;
var atmosVert = `
  varying vec3 vNormalW;
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
var atmosFrag = `
  varying vec3 vNormalW;
  varying vec3 vWorld;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fres = pow(clamp(0.72 - dot(normalize(vNormalW), viewDir), 0.0, 1.0), 2.6);
    gl_FragColor = vec4(vec3(0.34, 0.58, 0.68) * fres * 1.25, 1.0);
    #include <colorspace_fragment>
  }
`;
function makeGlowTexture() {
	const canvas = document.createElement("canvas");
	canvas.width = 64;
	canvas.height = 64;
	const ctx = canvas.getContext("2d");
	if (!ctx) return new CanvasTexture(canvas);
	const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
	gradient.addColorStop(0, "rgba(255,255,255,1)");
	gradient.addColorStop(.35, "rgba(255,255,255,0.55)");
	gradient.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 64, 64);
	const texture = new CanvasTexture(canvas);
	texture.colorSpace = "";
	return texture;
}
function Stars() {
	const geometry = (0, import_react.useMemo)(() => {
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
		const geo = new BufferGeometry();
		geo.setAttribute("position", new BufferAttribute(positions, 3));
		return geo;
	}, []);
	(0, import_react.useEffect)(() => () => geometry.dispose(), [geometry]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		geometry,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#ebe6dc",
			size: .055,
			sizeAttenuation: true,
			transparent: true,
			opacity: .75,
			depthWrite: false
		})
	});
}
function Earth({ day, night }) {
	const uniforms = (0, import_react.useMemo)(() => ({
		dayMap: { value: day },
		nightMap: { value: night },
		sunDir: { value: SUN.clone() }
	}), [day, night]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		onClick: (pointer) => {
			if (!useTimeline.getState().pinArmed) return;
			pointer.stopPropagation();
			const local = pointer.object.worldToLocal(pointer.point.clone());
			const { lat, lon } = xyzToLatLon(local.x, local.y, local.z);
			useTimeline.getState().setPin({
				lat: Math.round(lat * 100) / 100,
				lon: Math.round(lon * 100) / 100
			});
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1,
			80,
			48
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			toneMapped: false,
			uniforms,
			vertexShader: earthVert,
			fragmentShader: earthFrag
		})]
	});
}
function Clouds({ map }) {
	const ref = (0, import_react.useRef)(null);
	const uniforms = (0, import_react.useMemo)(() => ({
		cloudMap: { value: map },
		sunDir: { value: SUN.clone() }
	}), [map]);
	useFrame((_, delta) => {
		if (!ref.current) return;
		ref.current.rotation.y += Math.min(delta, .05) * .012;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		scale: 1.012,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1,
			64,
			40
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			toneMapped: false,
			transparent: true,
			depthWrite: false,
			uniforms,
			vertexShader: cloudVert,
			fragmentShader: cloudFrag
		})]
	});
}
function Atmosphere() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		scale: 1.07,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1,
			64,
			40
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			toneMapped: false,
			transparent: true,
			depthWrite: false,
			side: 1,
			blending: 2,
			vertexShader: atmosVert,
			fragmentShader: atmosFrag
		})]
	});
}
function Marker({ event, active, selected, glow }) {
	const group = (0, import_react.useRef)(null);
	const sprite = (0, import_react.useRef)(null);
	const world = (0, import_react.useMemo)(() => new Vector3(), []);
	const camDir = (0, import_react.useMemo)(() => new Vector3(), []);
	const position = (0, import_react.useMemo)(() => latLonToXYZ(event.lat, event.lon, 1.02), [event.lat, event.lon]);
	const outward = (0, import_react.useMemo)(() => new Vector3(...position).normalize(), [position]);
	const quat = (0, import_react.useMemo)(() => new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), outward), [outward]);
	const phase = (0, import_react.useMemo)(() => {
		let hash = 0;
		for (const char of event.id) hash = (hash * 33 + char.charCodeAt(0)) % 997;
		return hash / 997 * Math.PI * 2;
	}, [event.id]);
	const color = CATEGORY_HEX[event.category];
	const gl = useThree((state) => state.gl);
	useFrame(({ camera, clock }) => {
		if (!group.current) return;
		group.current.getWorldPosition(world);
		camDir.copy(camera.position).normalize();
		group.current.visible = world.normalize().dot(camDir) > .12;
		if (!sprite.current) return;
		const pulse = active ? 1 + Math.sin(clock.elapsedTime * 2.3 + phase) * .16 : 1;
		const size = (selected ? .16 : active ? .11 : .06) * pulse;
		sprite.current.scale.set(size, size, 1);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
				ref: sprite,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
					map: glow,
					color,
					transparent: true,
					depthWrite: false,
					blending: 2,
					opacity: active ? .95 : .4,
					toneMapped: false
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				onPointerDown: (pointer) => pointer.stopPropagation(),
				onClick: (pointer) => {
					pointer.stopPropagation();
					useTimeline.getState().select(event.id);
				},
				onPointerOver: (pointer) => {
					pointer.stopPropagation();
					gl.domElement.style.cursor = "pointer";
				},
				onPointerOut: () => {
					gl.domElement.style.cursor = "";
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.026,
					14,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color,
					toneMapped: false
				})]
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				quaternion: quat,
				position: outward.clone().multiplyScalar(.008),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					.028,
					.034,
					40
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: BRASS_HEX,
					side: 2,
					toneMapped: false
				})]
			}) : null,
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					0,
					.075,
					0
				],
				center: true,
				distanceFactor: 3.2,
				zIndexRange: [8, 0],
				style: { pointerEvents: "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "marker-label",
					children: event.title
				})
			}) : null
		]
	});
}
function Markers({ glow }) {
	const year = useTimeline((state) => state.year);
	const checked = useTimeline((state) => state.checked);
	const custom = useTimeline((state) => state.custom);
	const selectedId = useTimeline((state) => state.selectedId);
	return (0, import_react.useMemo)(() => allEvents(custom).filter((item) => isChecked(checked, item.id)), [checked, custom]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
		event: item,
		active: item.start <= year && year <= item.end,
		selected: item.id === selectedId,
		glow
	}, item.id));
}
function FlyRig({ controlsRef, flying, paused, goal }) {
	const camera = useThree((state) => state.camera);
	const spherical = (0, import_react.useMemo)(() => new Spherical(), []);
	const goalSpherical = (0, import_react.useMemo)(() => new Spherical(), []);
	const reduced = (0, import_react.useRef)(false);
	const resume = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const controls = controlsRef.current;
		if (controls && !reduced.current) {
			controls.autoRotate = true;
			controls.autoRotateSpeed = .42;
		}
	}, [controlsRef]);
	(0, import_react.useEffect)(() => {
		return useTimeline.subscribe((state, previous) => {
			if (state.focusNonce === previous.focusNonce) return;
			const picked = findEvent(state.custom, state.selectedId);
			if (!picked) return;
			const distance = MathUtils.clamp(camera.position.length(), 1.7, 4.4);
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
	}, [
		camera,
		controlsRef,
		flying,
		goal,
		paused
	]);
	useFrame((_, delta) => {
		const controls = controlsRef.current;
		if (!flying.current) {
			if (controls) controls.autoRotate = !paused.current && !reduced.current;
			return;
		}
		if (controls) controls.autoRotate = false;
		const step = Math.min(delta, .05);
		spherical.setFromVector3(camera.position);
		goalSpherical.setFromVector3(goal.current);
		const k = 1 - Math.pow(6e-4, step);
		const dTheta = Math.atan2(Math.sin(goalSpherical.theta - spherical.theta), Math.cos(goalSpherical.theta - spherical.theta));
		spherical.theta += dTheta * k;
		spherical.phi = MathUtils.lerp(spherical.phi, goalSpherical.phi, k);
		spherical.radius = MathUtils.lerp(spherical.radius, goalSpherical.radius, k);
		camera.position.setFromSpherical(spherical);
		camera.lookAt(0, 0, 0);
		if (camera.position.distanceTo(goal.current) < .03) {
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
	const [day, night, clouds] = useTexture([
		"/earth/day.jpg",
		"/earth/night.png",
		"/earth/clouds.png"
	]);
	const glow = (0, import_react.useMemo)(() => makeGlowTexture(), []);
	const controlsRef = (0, import_react.useRef)(null);
	const flying = (0, import_react.useRef)(false);
	const paused = (0, import_react.useRef)(false);
	const goal = (0, import_react.useRef)(new Vector3());
	const resume = (0, import_react.useRef)(0);
	const gl = useThree((state) => state.gl);
	(0, import_react.useEffect)(() => {
		const max = gl.capabilities.getMaxAnisotropy();
		for (const texture of [
			day,
			night,
			clouds
		]) {
			texture.colorSpace = "";
			texture.anisotropy = max;
			texture.needsUpdate = true;
		}
	}, [
		clouds,
		day,
		gl,
		night
	]);
	(0, import_react.useEffect)(() => () => glow.dispose(), [glow]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {
			day,
			night
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clouds, { map: clouds }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markers, { glow }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			ref: controlsRef,
			enablePan: false,
			enableDamping: true,
			dampingFactor: .12,
			rotateSpeed: .55,
			zoomSpeed: .65,
			minDistance: 1.55,
			maxDistance: 4.8,
			minPolarAngle: .18,
			maxPolarAngle: Math.PI - .18,
			onStart: () => {
				flying.current = false;
				paused.current = true;
				window.clearTimeout(resume.current);
			},
			onEnd: () => {
				window.clearTimeout(resume.current);
				resume.current = window.setTimeout(() => {
					if (!flying.current) paused.current = false;
				}, 2400);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyRig, {
			controlsRef,
			flying,
			paused,
			goal
		})
	] });
}
function EarthScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "h-full w-full",
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			alpha: true,
			powerPreference: "high-performance"
		},
		camera: {
			position: HOME,
			fov: 42,
			near: .1,
			far: 200
		},
		onCreated: ({ gl }) => {
			gl.setClearColor(0, 0);
			gl.toneMapping = 0;
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneContents, {})
		})
	});
}
function EventRow({ event, on }) {
	const selectedId = useTimeline((state) => state.selectedId);
	const toggle = useTimeline((state) => state.toggle);
	const select = useTimeline((state) => state.select);
	const removeCustom = useTimeline((state) => state.removeCustom);
	const selected = selectedId === event.id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: `event-row flex items-center gap-1 rounded-xl pr-1 ${selected ? "is-on" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ios-switch",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "ios-switch-input",
					checked: on,
					"aria-label": `Show ${event.title} on the globe and span`,
					onChange: () => toggle(event.id)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ios-knob-track",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ios-knob" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 shrink-0 rounded-full ${CATEGORY_DOT[event.category]}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "min-w-0 flex-1 py-1.5 text-left",
				onClick: () => select(event.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-sm",
					children: event.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block truncate text-xs text-muted",
					children: [
						formatSpan(event.start, event.end),
						" · ",
						durationLabel(event),
						event.custom ? " · yours" : ""
					]
				})]
			}),
			event.custom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid size-11 shrink-0 place-items-center text-muted",
				"aria-label": `Remove ${event.title}`,
				onClick: () => removeCustom(event.id),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
			}) : null
		]
	});
}
function YearGroup({ title, events }) {
	if (events.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "kicker px-1 pt-3",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-1 pt-1 text-sm text-muted",
		children: "None"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "kicker px-1 pt-3",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, {
		event,
		on: true
	}, event.id)) })] });
}
function LeftLedger({ arriving = false }) {
	const open = useTimeline((state) => state.panels.left);
	const bottomOpen = useTimeline((state) => state.panels.bottom);
	const year = useTimeline((state) => state.year);
	const checked = useTimeline((state) => state.checked);
	const custom = useTimeline((state) => state.custom);
	const togglePanel = useTimeline((state) => state.togglePanel);
	const setMany = useTimeline((state) => state.setMany);
	const showAll = useTimeline((state) => state.showAll);
	const hideAll = useTimeline((state) => state.hideAll);
	const addCustom = useTimeline((state) => state.addCustom);
	const select = useTimeline((state) => state.select);
	const pinArmed = useTimeline((state) => state.pinArmed);
	const setPinArmed = useTimeline((state) => state.setPinArmed);
	const pin = useTimeline((state) => state.pin);
	const setPin = useTimeline((state) => state.setPin);
	const [query, setQuery] = (0, import_react.useState)("");
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("invention");
	const [startText, setStartText] = (0, import_react.useState)(String(year > 0 ? year : year === 0 ? "0" : `${Math.abs(year)} BC`));
	const [endText, setEndText] = (0, import_react.useState)("");
	const [place, setPlace] = (0, import_react.useState)("");
	const [summary, setSummary] = (0, import_react.useState)("");
	const [latText, setLatText] = (0, import_react.useState)("");
	const [lonText, setLonText] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const events = (0, import_react.useMemo)(() => allEvents(custom), [custom]);
	const needle = query.trim().toLowerCase();
	const filtered = needle ? events.filter((event) => `${event.title} ${event.place} ${event.summary}`.toLowerCase().includes(needle)) : events;
	const checkedNow = events.filter((event) => isChecked(checked, event.id) && covers(event, year));
	const begins = checkedNow.filter((event) => event.start === year);
	const ends = checkedNow.filter((event) => event.end === year && event.start !== year);
	const underway = checkedNow.filter((event) => event.start < year && year < event.end);
	const latValue = pin ? pin.lat.toFixed(2) : latText;
	const lonValue = pin ? pin.lon.toFixed(2) : lonText;
	function closeForm() {
		setAdding(false);
		setPinArmed(false);
		setError("");
	}
	function save() {
		const name = title.trim();
		const start = parseYear(startText);
		const end = endText.trim() ? parseYear(endText) : start;
		const lat = Number(latValue);
		const lon = Number(lonValue);
		if (!name) {
			setError("Give the event a name.");
			return;
		}
		if (start === null || end === null) {
			setError("Use a year like 1453 or 500 BC.");
			return;
		}
		if (end < start) {
			setError("The ending is before the beginning.");
			return;
		}
		if (start < -3500 || end > 2026) {
			setError(`Keep it between ${YEAR_MIN} and ${YEAR_MAX}.`);
			return;
		}
		if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
			setError("Drop a pin on the globe, or type latitude and longitude.");
			return;
		}
		const event = {
			id: `custom-${crypto.randomUUID()}`,
			title: name,
			category,
			start: clampYear(start),
			end: clampYear(end),
			lat,
			lon,
			place: place.trim() || "Unmarked",
			summary: summary.trim() || "Added to the ledger.",
			custom: true
		};
		addCustom(event);
		select(event.id);
		setTitle("");
		setEndText("");
		setPlace("");
		setSummary("");
		setLatText("");
		setLonText("");
		setPin(null);
		closeForm();
	}
	const startYear = parseYear(startText);
	const endYear = endText.trim() ? parseYear(endText) : startYear;
	const preview = startYear !== null && endYear !== null && endYear >= startYear ? endYear === startYear ? "This will be a thin mark — a single year." : `This bar will cover ${endYear - startYear} years.` : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `glass panel-top dock-anim absolute left-3 z-20 flex w-[min(22rem,calc(100vw-1.5rem))] flex-col ${open ? "" : "dock-left-closed"} ${arriving && open ? "arrive-left" : ""} ${bottomOpen ? "bottom-60 max-[900px]:bottom-3" : "bottom-3"}`,
		inert: !open,
		"aria-hidden": !open,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 pt-4 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Events, beginnings, endings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl leading-none",
				children: "Ledger"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex",
				children: [!adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center",
					"aria-label": "Add an event",
					onClick: () => setAdding(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center text-muted",
					"aria-label": "Hide ledger",
					onClick: () => togglePanel("left"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			})]
		}), adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "sheet-in scroll-thin flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4",
			onSubmit: (event) => {
				event.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "self-start text-sm text-brass",
					onClick: closeForm,
					children: "Back to the ledger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1",
						value: title,
						onChange: (event) => setTitle(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "Kind"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "field mt-1",
						value: category,
						onChange: (event) => setCategory(event.target.value),
						children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "Begins"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: startText,
							onChange: (event) => setStartText(event.target.value),
							placeholder: "1440"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "Ends"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: endText,
							onChange: (event) => setEndText(event.target.value),
							placeholder: "same year"
						})]
					})]
				}),
				preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: preview
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "Place"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1",
						value: place,
						onChange: (event) => setPlace(event.target.value),
						placeholder: "Mainz"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "Latitude"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: latValue,
							inputMode: "decimal",
							onChange: (event) => {
								setPin(null);
								setLatText(event.target.value);
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "Longitude"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: lonValue,
							inputMode: "decimal",
							onChange: (event) => {
								setPin(null);
								setLonText(event.target.value);
							}
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: `flex h-11 items-center justify-center gap-2 rounded-xl border text-sm ${pinArmed ? "border-brass text-brass" : "border-line text-fg"}`,
					onClick: () => setPinArmed(!pinArmed),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), pinArmed ? "Click the globe…" : "Drop a pin on the globe"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "Note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "field mt-1 min-h-20",
						value: summary,
						onChange: (event) => setSummary(event.target.value)
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-war",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 rounded-xl bg-brass font-medium text-bg",
					children: "Add to the ledger"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field pl-9",
					value: query,
					placeholder: "Search the ledger",
					"aria-label": "Search the ledger",
					onChange: (event) => setQuery(event.target.value)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Tick a thread to lay it on the Earth and across the span."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll-thin min-h-0 flex-1 overflow-y-auto px-3 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearGroup, {
					title: "Begins",
					events: begins
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearGroup, {
					title: "Ends",
					events: ends
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearGroup, {
					title: "Still underway",
					events: underway
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "kicker",
						children: "Full ledger"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-brass",
							onClick: showAll,
							children: "Show all"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-muted",
							onClick: hideAll,
							children: "Hide all"
						})]
					})]
				}),
				CATEGORIES.map((group) => {
					const items = filtered.filter((event) => event.category === group.id);
					if (items.length === 0) return null;
					const ids = items.map((event) => event.id);
					const allOn = ids.every((id) => isChecked(checked, id));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-baseline justify-between px-1 pt-3 text-left",
						onClick: () => setMany(ids, !allOn),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: group.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: group.hint
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: items.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, {
						event,
						on: isChecked(checked, event.id)
					}, `${group.id}-${event.id}`)) })] }, group.id);
				})
			]
		})] })]
	});
}
var DIGITS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
];
function Digit({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "year-digit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "year-digit-col",
			style: { transform: `translate3d(0, ${-value * 10}%, 0)` },
			children: DIGITS.map((digit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: digit }, digit))
		})
	});
}
function RollingYear({ year }) {
	const chars = (year === 0 ? "0" : String(Math.abs(year))).split("");
	const last = (0, import_react.useRef)(0);
	const [snap, setSnap] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const now = performance.now();
		const rapid = last.current !== 0 && now - last.current < 90;
		last.current = now;
		setSnap(rapid);
	}, [year]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `year-roll${snap ? " is-snap" : ""}`,
		"aria-hidden": "true",
		children: chars.map((char, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Digit, { value: Number(char) }, chars.length - 1 - index))
	});
}
function pack(events) {
	const sorted = [...events].sort((a, b) => a.start - b.start || a.end - b.end);
	const laneEnds = [];
	const placed = [];
	for (const event of sorted) {
		let lane = laneEnds.findIndex((end) => end < event.start);
		if (lane === -1) {
			lane = laneEnds.length;
			laneEnds.push(event.end);
		} else laneEnds[lane] = event.end;
		placed.push({
			event,
			lane
		});
	}
	return {
		placed,
		lanes: Math.max(1, laneEnds.length)
	};
}
function SpanBar({ arriving = false }) {
	const open = useTimeline((state) => state.panels.bottom);
	const year = useTimeline((state) => state.year);
	const spanIndex = useTimeline((state) => state.spanIndex);
	const checked = useTimeline((state) => state.checked);
	const custom = useTimeline((state) => state.custom);
	const selectedId = useTimeline((state) => state.selectedId);
	const setYear = useTimeline((state) => state.setYear);
	const zoom = useTimeline((state) => state.zoom);
	const select = useTimeline((state) => state.select);
	const togglePanel = useTimeline((state) => state.togglePanel);
	const trackRef = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)(null);
	const span = SPANS[spanIndex] ?? 500;
	const windowed = viewWindow(year, span);
	const widthYears = windowed.end - windowed.start || 1;
	const play = (year - windowed.start) / widthYears * 100;
	const { placed, lanes } = pack(allEvents(custom).filter((event) => isChecked(checked, event.id) && event.end >= windowed.start && event.start <= windowed.end));
	const step = tickStep(span);
	const ticks = [];
	const firstTick = Math.ceil(windowed.start / step) * step;
	for (let tick = firstTick; tick <= windowed.end; tick += step) ticks.push(tick);
	function yearAt(clientX) {
		const rect = trackRef.current?.getBoundingClientRect();
		if (!rect || rect.width === 0) return year;
		const t = (clientX - rect.left) / rect.width;
		return clampYear(Math.round(windowed.start + t * widthYears));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `glass span-panel dock-anim absolute right-3 bottom-3 left-3 z-20 flex flex-col px-4 pt-3 pb-3 ${open ? "" : "dock-bottom-closed"} ${arriving && open ? "arrive-bottom" : ""}`,
		inert: !open,
		"aria-hidden": !open,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: spanName(span)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl leading-none",
						children: "Span"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted",
					children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${CATEGORY_DOT[category.id]}` }), category.label]
					}, category.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full text-fg disabled:opacity-30",
							"aria-label": "Wider span",
							disabled: spanIndex >= SPANS.length - 1,
							onClick: () => zoom(1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-16 text-center text-sm tabular-nums",
							children: [span, " yrs"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full text-fg disabled:opacity-30",
							"aria-label": "Narrower span",
							disabled: spanIndex <= 0,
							onClick: () => zoom(-1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center text-muted",
							"aria-label": "Hide span",
							onClick: () => togglePanel("bottom"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: trackRef,
			className: "relative mt-2 min-h-0 flex-1 cursor-grab overflow-hidden active:cursor-grabbing",
			onPointerDown: (event) => {
				if (event.target.closest("[data-event]")) return;
				drag.current = {
					x: event.clientX,
					year,
					moved: false
				};
				event.currentTarget.setPointerCapture(event.pointerId);
			},
			onPointerMove: (event) => {
				const current = drag.current;
				if (!current) return;
				const dx = event.clientX - current.x;
				if (Math.abs(dx) > 3) current.moved = true;
				const rect = event.currentTarget.getBoundingClientRect();
				setYear(current.year - dx / (rect.width || 1) * span);
			},
			onPointerUp: (event) => {
				const current = drag.current;
				drag.current = null;
				if (!current || current.moved) return;
				setYear(yearAt(event.clientX));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-y-0 z-10 w-px bg-brass",
					style: { left: `${play}%` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-0.5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-brass" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-5",
					children: ticks.map((tick) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-0 -translate-x-1/2 text-xs text-muted",
						style: { left: `${(tick - windowed.start) / widthYears * 100}%` },
						children: formatYearCompact(tick)
					}, tick))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scroll-thin relative mt-1 h-[calc(100%-1.5rem)] overflow-y-auto",
					children: placed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-1 pt-2 text-sm text-muted",
						children: "Tick events in the ledger. A war of a hundred years draws a bar that long."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative",
						style: { height: lanes * 30 },
						children: placed.map(({ event, lane }) => {
							const left = (event.start - windowed.start) / widthYears * 100;
							const right = (Math.max(event.end, event.start) - windowed.start) / widthYears * 100;
							const clampedLeft = Math.max(0, Math.min(100, left));
							const barWidth = Math.max(clampedLeft + .8, Math.min(100, Math.max(right, left + .8))) - clampedLeft;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-event": true,
								title: `${event.title} · ${formatSpan(event.start, event.end)} · ${durationLabel(event)}`,
								className: `span-event absolute flex h-6 items-center overflow-hidden rounded-full px-2 text-left ${CATEGORY_BAR[event.category]} ${event.id === selectedId ? "ring-2 ring-fg" : ""}`,
								style: {
									left: `${clampedLeft}%`,
									width: `${barWidth}%`,
									top: lane * 30
								},
								onPointerDown: (pointer) => pointer.stopPropagation(),
								onClick: (pointer) => {
									pointer.stopPropagation();
									const rect = trackRef.current?.getBoundingClientRect();
									const t = rect ? (pointer.clientX - rect.left) / rect.width : 0;
									const at = clampYear(Math.round(windowed.start + t * widthYears));
									const within = Math.min(event.end, Math.max(event.start, at));
									select(event.id, { year: within });
								},
								children: barWidth > 8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-xs font-medium",
									children: event.title
								}) : null
							}, event.id);
						})
					})
				})
			]
		})]
	});
}
var ITEM = 40;
var COUNT = YEAR_MAX - YEAR_MIN + 1;
var JUMPS = [
	{
		label: "3500 BC",
		year: -3500
	},
	{
		label: "0",
		year: 0
	},
	{
		label: "1453",
		year: 1453
	},
	{
		label: "1969",
		year: 1969
	}
];
function rowLabel(year) {
	if (year === 0) return "0";
	if (year < 0) return `${Math.abs(year)} BC`;
	return `${year} AD`;
}
function YearWheel({ arriving = false }) {
	const open = useTimeline((state) => state.panels.right);
	const bottomOpen = useTimeline((state) => state.panels.bottom);
	const year = useTimeline((state) => state.year);
	const setYear = useTimeline((state) => state.setYear);
	const togglePanel = useTimeline((state) => state.togglePanel);
	const scrollerRef = (0, import_react.useRef)(null);
	const fromWheel = (0, import_react.useRef)(false);
	const [height, setHeight] = (0, import_react.useState)(320);
	const [scrollTop, setScrollTop] = (0, import_react.useState)((year - YEAR_MIN) * ITEM);
	const [draft, setDraft] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const measure = () => setHeight(el.clientHeight || 320);
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, [open]);
	(0, import_react.useEffect)(() => {
		const el = scrollerRef.current;
		if (!el) return;
		if (fromWheel.current) {
			fromWheel.current = false;
			return;
		}
		const top = (year - YEAR_MIN) * ITEM;
		el.scrollTo({ top });
		setScrollTop(top);
	}, [
		year,
		height,
		open
	]);
	const pad = Math.max(0, (height - ITEM) / 2);
	const first = Math.max(0, Math.floor(scrollTop / ITEM) - 8);
	const last = Math.min(COUNT - 1, Math.ceil((scrollTop + height) / ITEM) + 8);
	const center = scrollTop / ITEM;
	const rows = [];
	for (let index = first; index <= last; index += 1) {
		const value = YEAR_MIN + index;
		const dist = index - center;
		const prominent = Math.abs(dist) < .55;
		const century = value === 0 || value % 100 === 0;
		rows.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-x-0 flex items-center justify-center",
			style: {
				top: pad + index * ITEM,
				height: ITEM,
				opacity: Math.max(.22, 1 - Math.abs(dist) * .2),
				transform: `perspective(420px) rotateX(${Math.max(-52, Math.min(52, -dist * 18))}deg) scale(${Math.max(.78, 1 - Math.abs(dist) * .045)})`
			},
			onClick: () => setYear(value),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: prominent ? "font-display text-3xl text-fg" : century ? "text-sm text-fg" : "text-sm text-muted",
				children: rowLabel(value)
			})
		}, value));
	}
	function publish(top) {
		setScrollTop(top);
		const next = clampYear(YEAR_MIN + Math.round(top / ITEM));
		if (next !== useTimeline.getState().year) {
			fromWheel.current = true;
			setYear(next);
		}
	}
	function snap() {
		const el = scrollerRef.current;
		if (!el) return;
		const snapped = Math.round(el.scrollTop / ITEM) * ITEM;
		if (Math.abs(el.scrollTop - snapped) < .5) return;
		el.scrollTo({
			top: snapped,
			behavior: "smooth"
		});
	}
	function jump(raw) {
		const parsed = parseYear(raw);
		if (parsed === null) return;
		setYear(clampYear(parsed));
		setDraft("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `glass panel-top dock-anim absolute right-3 z-20 flex w-[min(18rem,calc(100vw-1.5rem))] flex-col ${open ? "" : "dock-right-closed"} ${arriving && open ? "arrive-right" : ""} ${bottomOpen ? "bottom-60 max-[900px]:bottom-3" : "bottom-3"}`,
		inert: !open,
		"aria-hidden": !open,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 pt-4 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Every year"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl leading-none",
					children: "Years"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center text-muted",
					"aria-label": "Hide years",
					onClick: () => togglePanel("right"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "px-4",
				onSubmit: (event) => {
					event.preventDefault();
					jump(draft);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					value: draft,
					placeholder: "1453 or 500 BC",
					"aria-label": "Jump to a year",
					onChange: (event) => setDraft(event.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-1 px-4",
				children: JUMPS.map((jumpTo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-8 flex-1 rounded-full text-xs text-muted hover:text-fg",
					onClick: () => setYear(jumpTo.year),
					children: jumpTo.label
				}, jumpTo.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-3 mt-2 mb-3 min-h-48 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-1 top-1/2 z-10 h-10 -translate-y-1/2 rounded-xl border border-brass/60 bg-fg/5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scrollerRef,
					className: "year-mask scroll-thin h-full overflow-y-auto",
					"aria-label": "Years from 3500 BC through year 0 to 2026 AD",
					onScroll: (event) => publish(event.currentTarget.scrollTop),
					onScrollEnd: snap,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative",
						style: { height: pad * 2 + COUNT * ITEM },
						children: rows
					})
				})]
			})
		]
	});
}
function AppShell() {
	const year = useTimeline((state) => state.year);
	const selectedId = useTimeline((state) => state.selectedId);
	const custom = useTimeline((state) => state.custom);
	const checked = useTimeline((state) => state.checked);
	const panels = useTimeline((state) => state.panels);
	const pinArmed = useTimeline((state) => state.pinArmed);
	const select = useTimeline((state) => state.select);
	const nudgeYear = useTimeline((state) => state.nudgeYear);
	const togglePanel = useTimeline((state) => state.togglePanel);
	const [arriving, setArriving] = (0, import_react.useState)(true);
	const selected = findEvent(custom, selectedId);
	const line = meanwhile(year, allEvents(custom).filter((event) => isChecked(checked, event.id)), selected);
	const era = year < 0 ? "BC" : year === 0 ? "BC · AD" : "AD";
	const bare = !panels.left && !panels.right && !panels.bottom;
	const spoken = year === 0 ? "year 0" : year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;
	(0, import_react.useEffect)(() => {
		const id = window.setTimeout(() => setArriving(false), 760);
		return () => window.clearTimeout(id);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) return;
			if (event.key === "ArrowRight") {
				event.preventDefault();
				nudgeYear(event.shiftKey ? 10 : 1);
			} else if (event.key === "ArrowLeft") {
				event.preventDefault();
				nudgeYear(event.shiftKey ? -10 : -1);
			} else if (event.key === "ArrowUp") {
				event.preventDefault();
				nudgeYear(10);
			} else if (event.key === "ArrowDown") {
				event.preventDefault();
				nudgeYear(-10);
			} else if (event.key === "[") togglePanel("left");
			else if (event.key === "]") togglePanel("right");
			else if (event.key === "\\") togglePanel("bottom");
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [nudgeYear, togglePanel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sky relative h-dvh w-full overflow-hidden text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "globe-root absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthScene, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "chrome-rise pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Earth timeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "wordmark mt-1",
						children: "AERA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-end justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "year-display",
							"aria-live": "polite",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: spoken
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { year })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "era era-swap",
							children: era
						}, era)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker mt-2",
						children: line.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede clamp-2 mx-auto mt-1 max-w-lg text-pretty font-display text-base italic leading-snug text-fg/95",
						children: line.body
					}),
					selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "chip-pop pointer-events-auto mt-2 inline-flex items-center gap-1 text-xs text-muted",
						onClick: () => select(null, { fly: false }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Clear selection"]
					}) : null,
					bare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "The ledger, the years, and the span are tucked away."
					}) : null
				]
			}),
			pinArmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pin-banner pointer-events-none absolute top-44 z-30 rounded-full bg-brass px-4 py-2 text-sm text-bg",
				children: "Click the Earth to place this event"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftLedger, { arriving }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearWheel, { arriving }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpanBar, { arriving }),
			!panels.left ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "glass edge-left absolute top-1/2 left-3 z-30 flex h-11 items-center gap-2 px-3 text-sm",
				onClick: () => togglePanel("left"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { className: "size-4" }), "Ledger"]
			}) : null,
			!panels.right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "glass edge-right absolute top-1/2 right-3 z-30 flex h-11 items-center gap-2 px-3 text-sm",
				onClick: () => togglePanel("right"),
				children: ["Years", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "size-4" })]
			}) : null,
			!panels.bottom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "glass edge-bottom absolute bottom-3 left-1/2 z-30 flex h-11 items-center gap-2 px-4 text-sm",
				onClick: () => togglePanel("bottom"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelBottom, { className: "size-4" }), "Span"]
			}) : null
		]
	});
}
//#endregion
export { AppShell };
