import { MapPin, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { allEvents, isChecked } from "@/lib/timeline/events";
import { covers, durationLabel, formatSpan, parseYear } from "@/lib/timeline/format";
import { CATEGORY_DOT } from "@/lib/timeline/palette";
import { useTimeline } from "@/lib/timeline/store";
import { CATEGORIES, clampYear, YEAR_MAX, YEAR_MIN, type Category, type Reach, type TimelineEvent } from "@/lib/timeline/types";
import { ResizeHandle, useNarrow } from "@/components/aera/ResizeHandle";

function EventRow({ event, on }: { event: TimelineEvent; on: boolean }) {
  const selectedId = useTimeline((state) => state.selectedId);
  const toggle = useTimeline((state) => state.toggle);
  const select = useTimeline((state) => state.select);
  const removeCustom = useTimeline((state) => state.removeCustom);
  const selected = selectedId === event.id;

  return (
    <li className={`event-row cat-${event.category} flex items-center gap-1 rounded-xl pr-1 ${selected ? "is-on" : ""}`}>
      <label className="ios-switch">
        <input
          type="checkbox"
          className="ios-switch-input"
          checked={on}
          aria-label={`Show ${event.title} on the globe and span`}
          onChange={() => toggle(event.id)}
        />
        <span className="ios-knob-track" aria-hidden="true">
          <span className="ios-knob" />
        </span>
      </label>
      <span className={`size-2 shrink-0 rounded-full ${CATEGORY_DOT[event.category]}`} />
      <button type="button" className="min-w-0 flex-1 py-1.5 text-left" onClick={() => select(event.id)}>
        <span className="block truncate text-sm">{event.title}</span>
        <span className="block truncate text-xs text-muted">
          {formatSpan(event.start, event.end)} · {durationLabel(event)}
          {event.custom ? " · yours" : ""}
        </span>
      </button>
      {event.custom ? (
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center text-muted"
          aria-label={`Remove ${event.title}`}
          onClick={() => removeCustom(event.id)}
        >
          <Trash2 className="size-4" />
        </button>
      ) : null}
    </li>
  );
}

function YearGroup({ title, events }: { title: string; events: TimelineEvent[] }) {
  if (events.length === 0) {
    return (
      <section>
        <h3 className="kicker px-1 pt-3">{title}</h3>
        <p className="px-1 pt-1 text-sm text-muted">None</p>
      </section>
    );
  }
  return (
    <section>
      <h3 className="kicker px-1 pt-3">{title}</h3>
      <ul>
        {events.map((event) => (
          <EventRow key={event.id} event={event} on />
        ))}
      </ul>
    </section>
  );
}

export function LeftLedger({ arriving = false }: { arriving?: boolean }) {
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

  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("technology");
  const [startText, setStartText] = useState(String(year > 0 ? year : year === 0 ? "0" : `${Math.abs(year)} BC`));
  const [endText, setEndText] = useState("");
  const [place, setPlace] = useState("");
  const [summary, setSummary] = useState("");
  const [latText, setLatText] = useState("");
  const [lonText, setLonText] = useState("");
  const [reach, setReach] = useState<Reach>("place");
  const [error, setError] = useState("");
  const narrow = useNarrow();

  const events = useMemo(() => allEvents(custom), [custom]);
  const needle = query.trim().toLowerCase();
  const filtered = needle
    ? events.filter((event) =>
        `${event.title} ${event.place} ${event.summary}`.toLowerCase().includes(needle),
      )
    : events;

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
    if (start < YEAR_MIN || end > YEAR_MAX) {
      setError(`Keep it between ${YEAR_MIN} and ${YEAR_MAX}.`);
      return;
    }
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError("Drop a pin on the globe, or type latitude and longitude.");
      return;
    }
    const event: TimelineEvent = {
      id: `custom-${crypto.randomUUID()}`,
      title: name,
      category,
      start: clampYear(start),
      end: clampYear(end),
      lat,
      lon,
      place: place.trim() || "Unmarked",
      summary: summary.trim() || "Added to the ledger.",
      reach,
      custom: true,
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
  const preview =
    startYear !== null && endYear !== null && endYear >= startYear
      ? endYear === startYear
        ? "This will be a thin mark — a single year."
        : `This bar will cover ${endYear - startYear} years.`
      : null;

  return (
    <aside
      className={`glass panel-top frame-left dock-anim absolute left-3 z-20 flex flex-col ${
        open ? "" : "dock-left-closed"
      } ${arriving && open ? "arrive-left" : ""} ${!narrow && bottomOpen ? "above-span" : "bottom-3"}`}
      inert={!open}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <p className="kicker">Events, beginnings, endings</p>
          <h2 className="font-display text-3xl leading-none">Ledger</h2>
        </div>
        <div className="flex">
          {!adding ? (
            <button type="button" className="grid size-11 place-items-center" aria-label="Add an event" onClick={() => setAdding(true)}>
              <Plus className="size-5" />
            </button>
          ) : null}
          <button type="button" className="grid size-11 place-items-center text-muted" aria-label="Hide ledger" onClick={() => togglePanel("left")}>
            <X className="size-5" />
          </button>
        </div>
      </div>

      {adding ? (
        <form
          className="sheet-in scroll-thin flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <button type="button" className="self-start text-sm text-brass" onClick={closeForm}>
            Back to the ledger
          </button>
          <label className="block text-sm">
            <span className="kicker">Name</span>
            <input className="field mt-1" value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="kicker">Kind</span>
            <select className="field mt-1" value={category} onChange={(event) => setCategory(event.target.value as Category)}>
              {CATEGORIES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="kicker">Begins</span>
              <input className="field mt-1" value={startText} onChange={(event) => setStartText(event.target.value)} placeholder="1440" />
            </label>
            <label className="block text-sm">
              <span className="kicker">Ends</span>
              <input className="field mt-1" value={endText} onChange={(event) => setEndText(event.target.value)} placeholder="same year" />
            </label>
          </div>
          {preview ? <p className="text-sm text-muted">{preview}</p> : null}
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                ["place", "Place"],
                ["region", "Land"],
                ["world", "Whole world"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`h-10 rounded-xl border text-sm ${reach === id ? "border-brass text-brass" : "border-line text-muted"}`}
                onClick={() => setReach(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="block text-sm">
            <span className="kicker">Place</span>
            <input className="field mt-1" value={place} onChange={(event) => setPlace(event.target.value)} placeholder="Mainz" />
          </label>
          <p className="text-xs text-muted">Place is a patch of land. Land is a wider reach. Whole world draws a ring around the Earth.</p>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="kicker">Latitude</span>
              <input
                className="field mt-1"
                value={latValue}
                inputMode="decimal"
                onChange={(event) => {
                  setPin(null);
                  setLatText(event.target.value);
                }}
              />
            </label>
            <label className="block text-sm">
              <span className="kicker">Longitude</span>
              <input
                className="field mt-1"
                value={lonValue}
                inputMode="decimal"
                onChange={(event) => {
                  setPin(null);
                  setLonText(event.target.value);
                }}
              />
            </label>
          </div>
          <button
            type="button"
            className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm ${pinArmed ? "border-brass text-brass" : "border-line text-fg"}`}
            onClick={() => setPinArmed(!pinArmed)}
          >
            <MapPin className="size-4" />
            {pinArmed ? "Click the globe…" : "Drop a pin on the globe"}
          </button>
          <label className="block text-sm">
            <span className="kicker">Note</span>
            <textarea className="field mt-1 min-h-20" value={summary} onChange={(event) => setSummary(event.target.value)} />
          </label>
          {error ? <p className="text-sm text-war">{error}</p> : null}
          <button type="submit" className="h-11 rounded-xl bg-brass font-medium text-bg">
            Add to the ledger
          </button>
        </form>
      ) : (
        <>
          <div className="px-4 pb-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input
                className="field pl-9"
                value={query}
                placeholder="Search the ledger"
                aria-label="Search the ledger"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <p className="mt-2 text-sm text-muted">The switch on a category turns that whole group on or off.</p>
          </div>
          <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-3 pb-4">
            <YearGroup title="Begins" events={begins} />
            <YearGroup title="Ends" events={ends} />
            <YearGroup title="Still underway" events={underway} />
            <div className="mt-4 flex items-center justify-between px-1">
              <h3 className="kicker">Full ledger</h3>
              <div className="flex gap-2 text-xs">
                <button type="button" className="text-brass" onClick={showAll}>
                  Show all
                </button>
                <button type="button" className="text-muted" onClick={hideAll}>
                  Hide all
                </button>
              </div>
            </div>
            {CATEGORIES.map((group) => {
              const groupEvents = events.filter((event) => event.category === group.id);
              const items = filtered.filter((event) => event.category === group.id);
              if (items.length === 0) return null;
              const ids = groupEvents.map((event) => event.id);
              const allOn = ids.every((id) => isChecked(checked, id));
              return (
                <section key={group.id} className={`cat-block cat-${group.id}`}>
                  <label className="cat-head">
                    <input
                      type="checkbox"
                      className="cat-toggle"
                      checked={allOn}
                      aria-label={`${allOn ? "Hide" : "Show"} every ${group.label} event`}
                      onChange={() => setMany(ids, !allOn)}
                    />
                    <span className="min-w-0 flex-1 text-left">
                      <span className="kicker block">{group.label}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted">{group.hint}</span>
                    </span>
                    <span className="ios-knob-track" aria-hidden="true">
                      <span className="ios-knob" />
                    </span>
                  </label>
                  <ul className="cat-list">
                    {items.map((event) => (
                      <EventRow key={`${group.id}-${event.id}`} event={event} on={isChecked(checked, event.id)} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </>
      )}
      {open ? <ResizeHandle axis="left" /> : null}
    </aside>
  );
}
