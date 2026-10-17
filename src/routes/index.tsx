import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { BootScreen } from "@/components/aera/BootScreen";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [App, setApp] = useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    import("@/components/aera/AppShell")
      .then((mod) => {
        if (live) setApp(() => mod.AppShell);
      })
      .catch(() => {
        if (live) setFailed(true);
      });
    return () => {
      live = false;
    };
  }, []);

  if (failed) return <BootScreen note="The globe could not start. Reload the page." />;
  if (!App) return <BootScreen />;
  return <App />;
}
