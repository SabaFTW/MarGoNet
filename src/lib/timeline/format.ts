import { SPANS, YEAR_MAX, YEAR_MIN, type TimelineEvent } from "./types";

export function formatYear(year: number) {
  if (year === 0) return "Year 0";
  if (year < 0) return `${Math.abs(year)} BC`;
  return `${year} AD`;
}

export function formatYearCompact(year: number) {
  if (year < 0) return `−${Math.abs(year)}`;
  return String(year);
}

export function formatSpan(start: number, end: number) {
  if (start === end) return formatYear(start);
  if (start < 0 && end < 0) return `${Math.abs(start)}–${Math.abs(end)} BC`;
  if (start < 0 && end > 0) return `${Math.abs(start)} BC – ${end} AD`;
  if (start < 0 && end === 0) return `${Math.abs(start)} BC – 0`;
  return `${start}–${end} AD`;
}

export function durationYears(event: { start: number; end: number }) {
  return Math.max(0, event.end - event.start);
}

export function durationLabel(event: { start: number; end: number }) {
  const span = durationYears(event);
  if (span <= 0) return "a moment";
  if (span === 1) return "1 year";
  return `${span} years`;
}

export function spanName(years: number) {
  if (years <= 25) return "A generation";
  if (years <= 50) return "Half a century";
  if (years <= 100) return "A century";
  if (years <= 250) return "Two centuries";
  if (years <= 500) return "Five centuries";
  if (years <= 1000) return "A millennium";
  if (years <= 2500) return "Two millennia";
  return "The whole ledger";
}

export function viewWindow(year: number, span: number) {
  const total = YEAR_MAX - YEAR_MIN;
  const width = Math.min(span, total);
  let start = year - width / 2;
  let end = start + width;
  if (start < YEAR_MIN) {
    start = YEAR_MIN;
    end = YEAR_MIN + width;
  }
  if (end > YEAR_MAX) {
    end = YEAR_MAX;
    start = YEAR_MAX - width;
  }
  return { start, end };
}

export function tickStep(span: number) {
  if (span <= 25) return 5;
  if (span <= 50) return 10;
  if (span <= 100) return 20;
  if (span <= 250) return 50;
  if (span <= 500) return 100;
  if (span <= 1000) return 200;
  if (span <= 2500) return 500;
  return 500;
}

export function parseYear(input: string): number | null {
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

function joinTitles(events: TimelineEvent[]) {
  const names = events.map((event) => event.title);
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function yearWord(n: number) {
  const n100 = n % 100;
  const n10 = n % 10;
  if (n10 === 1 && n100 !== 11) return "leto";
  if (n10 === 2 && n100 !== 12) return "leti";
  if ((n10 === 3 || n10 === 4) && (n100 < 10 || n100 > 14)) return "leta";
  return "let";
}

function preferAnchor(list: TimelineEvent[]) {
  const rank = { technology: 0, industry: 1, politics: 2, religion: 3 };
  return [...list].sort((a, b) => {
    const byKind = rank[a.category] - rank[b.category];
    if (byKind !== 0) return byKind;
    return b.start - a.start || a.id.localeCompare(b.id);
  })[0];
}

function contrastLine(year: number, events: TimelineEvent[], selected?: TimelineEvent) {
  const active = events.filter((event) => event.start <= year && year <= event.end);
  const begins = active.filter((event) => event.start === year);
  const selectedNow = selected && active.some((event) => event.id === selected.id) ? selected : undefined;
  const recent = active.filter((event) => year - event.start <= 50 && event.end - event.start <= 300);
  const finite = active.filter((event) => event.end - event.start <= 180);
  const anchor = begins.length
    ? preferAnchor(begins)
    : selectedNow
      ? selectedNow
      : recent.length
        ? preferAnchor(recent)
        : finite.length
          ? preferAnchor(finite)
          : undefined;
  if (!anchor) return null;

  const opens = anchor.category === "technology" || anchor.category === "industry" ? "Ko pride" : "Ko se začne";

  let future: TimelineEvent | undefined;
  let futureScore = 0;
  for (const event of events) {
    if (event.id === anchor.id || event.start <= year) continue;
    const gap = event.start - year;
    const span = event.end - event.start;
    let score = 0;
    if (event.category !== anchor.category) score += 3;
    if (
      event.category === anchor.category &&
      (anchor.category === "technology" || anchor.category === "industry")
    ) {
      score += 4;
    }
    if (anchor.category === "technology" && event.category === "technology") score += 2;
    if (gap >= 5 && gap <= 120) score += 6;
    else if (gap <= 400) score += 4;
    else if (gap <= 1200) score += 1;
    else score -= 3;
    if (span <= 40) score += 3;
    if (span > 600) score -= 4;
    if (!future || score > futureScore || (score === futureScore && gap < future.start - year)) {
      future = event;
      futureScore = score;
    }
  }
  if (future && futureScore < 4) future = undefined;

  const medium = active.filter(
    (event) => event.id !== anchor.id && event.end > year && year - event.start >= 20 && event.end - event.start <= 800,
  );
  const beliefs = active.filter(
    (event) =>
      event.id !== anchor.id &&
      event.category === "technology" &&
      year - event.start >= 80 &&
      event.end - event.start > 800,
  );
  const stillPool = medium.length ? medium : beliefs;
  let still: TimelineEvent | undefined;
  let stillScore = 0;
  for (const event of stillPool) {
    const age = year - event.start;
    const span = event.end - event.start;
    let score = 0;
    if (event.category !== anchor.category) score += 4;
    if (age >= 20 && age <= 500) score += 3;
    if (span <= 700) score += 1;
    if (event.end - year <= 80) score += 2;
    if (beliefs.includes(event)) score += 1;
    if (!still || score > stillScore || (score === stillScore && event.start < still.start)) {
      still = event;
      stillScore = score;
    }
  }
  if (still && stillScore < 4) still = undefined;

  const ahead = future
    ? `${future.title} še ${future.start - year} ${yearWord(future.start - year)} ne obstaja`
    : null;
  const lasting = still ? `${still.title} ${beliefs.includes(still) ? "še vedno velja" : "še vedno traja"}` : null;

  if (ahead && lasting) return `${opens} ${anchor.title}, ${lasting} — ${ahead}.`;
  if (ahead) return `${opens} ${anchor.title}, ${ahead}.`;
  if (lasting) return `${opens} ${anchor.title}, ${lasting}.`;
  return null;
}

export function meanwhile(year: number, events: TimelineEvent[], selected?: TimelineEvent) {
  const contrast = contrastLine(year, events, selected);
  if (selected) {
    return {
      kicker: `${selected.place} · ${formatSpan(selected.start, selected.end)} · ${durationLabel(selected)}`,
      body: contrast ?? selected.summary,
    };
  }

  const active = events.filter((event) => event.start <= year && year <= event.end);
  const begins = active.filter((event) => event.start === year);
  const ends = active.filter((event) => event.end === year && event.start !== year);
  const faith = active.filter((event) => event.category === "religion" && event.start !== year && event.end !== year);
  const running = active.filter(
    (event) => event.category !== "religion" && event.start !== year && event.end !== year,
  );

  const parts: string[] = [];
  if (begins.length) {
    parts.push(`${joinTitles(begins)} ${begins.length > 1 ? "begin" : "begins"}`);
  }
  if (ends.length) {
    parts.push(`${joinTitles(ends)} ${ends.length > 1 ? "come to an end" : "comes to an end"}`);
  }
  if (running.length) parts.push(`still underway: ${joinTitles(running.slice(0, 3))}`);
  if (faith.length) parts.push(`still shaping decisions: ${joinTitles(faith.slice(0, 3))}`);

  if (!parts.length) {
    return {
      kicker: "Nothing checked",
      body: contrast ?? "No thread on the ledger covers this year. Open the ledger and tick a war, a technology, or a faith that is still in the room.",
    };
  }

  let body = contrast ?? `${parts.join(". ")}.`;
  if (!contrast) {
    body = body.charAt(0).toUpperCase() + body.slice(1);
  }
  if (!contrast && year === 0) {
    body = `This wheel keeps a year 0 as a hinge — historians step from 1 BC to 1 AD. ${body}`;
  }

  return {
    kicker: active.length === 1 ? "One thread" : `${active.length} threads at once`,
    body,
  };
}

export function covers(event: TimelineEvent, year: number) {
  return event.start <= year && year <= event.end;
}

export function defaultSpanIndex() {
  return SPANS.indexOf(500);
}
