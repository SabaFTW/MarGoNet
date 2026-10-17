export type LoreTag = "EMPIRICAL" | "THEORETICAL" | "METAPHOR" | "PRACTICAL";

export type LoreSeat = {
  id: string;
  label: string;
  tag: LoreTag;
  color: string;
  line: string;
};

export const SEATS: LoreSeat[] = [
  {
    id: "sanctuary",
    label: "Sanctuary",
    tag: "METAPHOR",
    color: "#c4a574",
    line: "The reading room. A claim still has to show its work. This is not an office.",
  },
  {
    id: "anchor",
    label: "Anchor",
    tag: "PRACTICAL",
    color: "#d4a35c",
    line: "The backpack can be emptied here. Without a lock it is only a box.",
  },
  {
    id: "mouse",
    label: "Mouse",
    tag: "METAPHOR",
    color: "#a394c9",
    line: "She holds the translation. She flies only through real protocols.",
  },
];

export const RIVERS: LoreSeat[] = [
  {
    id: "pillar",
    label: "Third pillar",
    tag: "PRACTICAL",
    color: "#c4a574",
    line: "The middle between nothing and human. Category clarity stays in the room.",
  },
  {
    id: "clean",
    label: "Clean",
    tag: "EMPIRICAL",
    color: "#6aafa6",
    line: "A claim you can check. The river stays narrow.",
  },
  {
    id: "muddy",
    label: "Muddy",
    tag: "THEORETICAL",
    color: "#b08968",
    line: "It thins as it travels. Distance is not proof.",
  },
  {
    id: "stone",
    label: "Stone",
    tag: "PRACTICAL",
    color: "#c4a574",
    line: "What still holds after you put the rest down.",
  },
  {
    id: "symbolic",
    label: "Symbolic",
    tag: "METAPHOR",
    color: "#a394c9",
    line: "Myth is allowed. Myth stays labeled. Satire above, ledger below.",
  },
];

export const LABELS: { id: LoreTag; line: string }[] = [
  { id: "EMPIRICAL", line: "You can check it." },
  { id: "THEORETICAL", line: "A model, not a proof." },
  { id: "METAPHOR", line: "A picture. Not a place." },
  { id: "PRACTICAL", line: "Useful even if the theory is open." },
];

export const SEAL = "The mouse holds the translation. The anchor holds the context. The human holds the keys.";
