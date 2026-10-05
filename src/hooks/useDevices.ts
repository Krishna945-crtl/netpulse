import { useEffect, useState } from "react";
import type { Device, Status } from "../types";
import { initialDevices } from "../data/devices";

// latency + loss decide health, same idea a NOC dashboard uses
export function getStatus(d: Device): Status {
  if (d.packetLoss >= 100 || d.latencyMs === 0) return "down";
  if (d.latencyMs > 100 || d.packetLoss > 2) return "degraded";
  return "up";
}

// simulate a fresh latency sample every few seconds
function nextSample(d: Device): Device {
  if (getStatus(d) === "down") return d;
  const drift = (Math.random() - 0.5) * d.latencyMs * 0.3;
  const latencyMs = Math.max(1, Math.round(d.latencyMs + drift));
  return {
    ...d,
    latencyMs,
    history: [...d.history.slice(1), latencyMs],
  };
}

export function useDevices(intervalMs = 3000) {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setDevices((prev) => prev.map(nextSample)), intervalMs);
    return () => clearInterval(timer);
  }, [paused, intervalMs]);

  return { devices, paused, setPaused };
}
