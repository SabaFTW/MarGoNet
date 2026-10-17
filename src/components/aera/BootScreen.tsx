export function BootScreen({ note }: { note?: string }) {
  return (
    <main className="sky grid h-dvh place-items-center px-6 text-center text-fg">
      <div className="boot-mark">
        <p className="kicker">Earth timeline</p>
        <h1 className="wordmark mt-3">AERA</h1>
        <p className="year-display boot-year mt-4">1453</p>
        <p className="era mt-3">AD</p>
        {note ? <p className="mx-auto mt-6 max-w-sm text-sm text-muted">{note}</p> : null}
      </div>
    </main>
  );
}
