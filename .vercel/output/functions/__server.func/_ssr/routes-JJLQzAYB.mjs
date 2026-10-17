import { i as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-JJLQzAYB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BootScreen({ note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "sky grid h-dvh place-items-center px-6 text-center text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "boot-mark",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Earth timeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "wordmark mt-3",
					children: "AERA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "year-display boot-year mt-4",
					children: "1453"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "era mt-3",
					children: "AD"
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-6 max-w-sm text-sm text-muted",
					children: note
				}) : null
			]
		})
	});
}
function Home() {
	const [App, setApp] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./AppShell-CqLBg4v1.mjs").then((mod) => {
			if (live) setApp(() => mod.AppShell);
		}).catch(() => {
			if (live) setFailed(true);
		});
		return () => {
			live = false;
		};
	}, []);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, { note: "The globe could not start. Reload the page." });
	if (!App) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component };
