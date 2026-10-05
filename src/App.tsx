import { useMemo, useState } from "react";
import type { StatusFilter } from "./types";
import { useDevices, getStatus } from "./hooks/useDevices";
import { StatsBar } from "./components/StatsBar";
import { FilterBar } from "./components/FilterBar";
import { DeviceCard } from "./components/DeviceCard";
import { DeviceDrawer } from "./components/DeviceDrawer";

type Theme = "light" | "dark";

export default function App() {
  const { devices, paused, setPaused } = useDevices();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [site, setSite] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("light");

  const sites = useMemo(() => [...new Set(devices.map((d) => d.site))].sort(), [devices]);

  const visible = devices.filter((d) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.ip.includes(q);
    const matchesStatus = status === "all" || getStatus(d) === status;
    const matchesSite = site === "all" || d.site === site;
    return matchesQuery && matchesStatus && matchesSite;
  });

  const openDevice = devices.find((d) => d.id === openId) ?? null;

  return (
    <div className="app" data-theme={theme}>
      <header className="topbar">
        <div className="brand">
          <span className="brand__logo" aria-hidden="true">
            ◎
          </span>
          <h1>NetPulse</h1>
          <span className={`live ${paused ? "live--paused" : ""}`}>{paused ? "Paused" : "Live"}</span>
        </div>
        <div className="topbar__actions">
          <button type="button" className="btn" onClick={() => setPaused(!paused)}>
            {paused ? "Resume" : "Pause"} updates
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle colour theme"
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
        </div>
      </header>

      <main className="content">
        <StatsBar devices={devices} />

        <FilterBar
          query={query}
          onQuery={setQuery}
          status={status}
          onStatus={setStatus}
          site={site}
          sites={sites}
          onSite={setSite}
        />

        {visible.length ? (
          <section className="grid" aria-label="Devices">
            {visible.map((d) => (
              <DeviceCard key={d.id} device={d} onOpen={setOpenId} />
            ))}
          </section>
        ) : (
          <p className="empty">No devices match these filters.</p>
        )}
      </main>

      <DeviceDrawer device={openDevice} onClose={() => setOpenId(null)} />
    </div>
  );
}
