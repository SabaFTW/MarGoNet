import type { Category } from "./types";

/** Mirrors the CSS tokens. WebGL cannot read the stylesheet reliably at init. */
export const CATEGORY_HEX: Record<Category, string> = {
  technology: "#6aafa6",
  politics: "#c46a58",
  industry: "#d4a35c",
  religion: "#a394c9",
};

export const BRASS_HEX = "#c4a574";

export const CATEGORY_DOT: Record<Category, string> = {
  technology: "bg-technology",
  politics: "bg-politics",
  industry: "bg-industry",
  religion: "bg-religion",
};

export const CATEGORY_BAR: Record<Category, string> = {
  technology: "bg-technology text-bg",
  politics: "bg-politics text-bg",
  industry: "bg-industry text-bg",
  religion: "bg-religion text-bg",
};
