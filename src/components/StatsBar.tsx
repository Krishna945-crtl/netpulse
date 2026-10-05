import type { Device } from "../types";
import { getStatus } from "../hooks/useDevices";

export function StatsBar({ devices }: { devices: Device[] }) {
  const counts = { up: 0, degraded: 0, down: 0 };
  devices.forEach((d) => counts[getStatus(d)]++);

  const live = devices.filter((d) => getStatus(d) !== "down");
  const avgLatency = live.length
    ? Math.round(live.reduce((sum, d) => sum + d.latencyMs, 0) / live.length)
    : 0;
  const health = Math.round((counts.up / devices.length) * 100);

  const tiles = [
    { label: "Network health", value: `${health}%` },
    { label: "Devices up", value: counts.up, tone: "up" },
    { label: "Degraded", value: counts.degraded, tone: "degraded" },
    { label: "Down", value: counts.down, tone: "down" },
    { label: "Avg latency", value: `${avgLatency} ms` },
  ];

  return (
    <section className="stats" aria-label="Network summary">
      {tiles.map((t) => (
        <div key={t.label} className={`stat ${t.tone ? `stat--${t.tone}` : ""}`}>
          <span className="stat__label">{t.label}</span>
          <span className="stat__value">{t.value}</span>
        </div>
      ))}
    </section>
  );
}
