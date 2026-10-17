import { useEffect, useRef, useState } from "react";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Digit({ value }: { value: number }) {
  return (
    <span className="year-digit">
      <span className="year-digit-col" style={{ transform: `translate3d(0, ${-value * 10}%, 0)` }}>
        {DIGITS.map((digit) => (
          <span key={digit}>{digit}</span>
        ))}
      </span>
    </span>
  );
}

export function RollingYear({ year }: { year: number }) {
  const label = year === 0 ? "0" : String(Math.abs(year));
  const chars = label.split("");
  const last = useRef(0);
  const [snap, setSnap] = useState(true);

  useEffect(() => {
    const now = performance.now();
    const rapid = last.current !== 0 && now - last.current < 90;
    last.current = now;
    setSnap(rapid);
  }, [year]);

  return (
    <span className={`year-roll${snap ? " is-snap" : ""}`} aria-hidden="true">
      {chars.map((char, index) => (
        <Digit key={chars.length - 1 - index} value={Number(char)} />
      ))}
    </span>
  );
}
