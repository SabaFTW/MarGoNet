import { useEffect, useState } from "react";
import { clampFrame, useTimeline, type Frame } from "@/lib/timeline/store";

const VAR: Record<keyof Frame, string> = {
  left: "--frame-left",
  right: "--frame-right",
  bottom: "--frame-bottom",
};

export function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 840px)");
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return narrow;
}

export function FrameStyle() {
  const frame = useTimeline((state) => state.frame);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--frame-left", `${frame.left}px`);
    root.style.setProperty("--frame-right", `${frame.right}px`);
    root.style.setProperty("--frame-bottom", `${frame.bottom}px`);
  }, [frame]);
  return null;
}

export function ResizeHandle({ axis }: { axis: keyof Frame }) {
  const setFrame = useTimeline((state) => state.setFrame);

  return (
    <div
      role="separator"
      aria-orientation={axis === "bottom" ? "horizontal" : "vertical"}
      aria-label={axis === "left" ? "Resize ledger" : axis === "right" ? "Resize years" : "Resize span"}
      className={`resize-handle ${axis === "bottom" ? "resize-y" : "resize-x"} ${axis === "left" ? "resize-left" : axis === "right" ? "resize-right" : ""}`}
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.setPointerCapture(event.pointerId);
        const start = axis === "bottom" ? event.clientY : event.clientX;
        const origin = useTimeline.getState().frame[axis];
        document.body.classList.add("is-resizing");
        const move = (pointer: PointerEvent) => {
          const delta =
            axis === "left" ? pointer.clientX - start : axis === "right" ? start - pointer.clientX : start - pointer.clientY;
          const next = clampFrame(axis, origin + delta);
          document.documentElement.style.setProperty(VAR[axis], `${next}px`);
        };
        const up = (pointer: PointerEvent) => {
          const delta =
            axis === "left" ? pointer.clientX - start : axis === "right" ? start - pointer.clientX : start - pointer.clientY;
          setFrame(axis, origin + delta);
          document.body.classList.remove("is-resizing");
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
      }}
    />
  );
}
