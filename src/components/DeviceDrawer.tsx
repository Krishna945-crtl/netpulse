import { useEffect } from "react";
import type { Device } from "../types";
import { getStatus } from "../hooks/useDevices";
import { StatusBadge } from "./StatusBadge";
import { Sparkline } from "./Sparkline";

interface Props {
  device: Device | null;
  onClose: () => void;
}

export function DeviceDrawer({ device, onClose }: Props) {
  // Esc closes the panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!device) return null;
  const status = getStatus(device);

  const rows: Array<[string, string]> = [
    ["Type", device.type.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())],
    ["Site", device.site],
    ["IP address", device.ip],
    ["Latency", status === "down" ? "No response" : `${device.latencyMs} ms`],
    ["Packet loss", `${device.packetLoss}%`],
    ["Uptime", status === "down" ? "—" : `${Math.floor(device.uptimeHours / 24)} days`],
  ];

  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className={`drawer drawer--${status}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${device.name} details`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="drawer__head">
          <div>
            <h2>{device.name}</h2>
            <StatusBadge status={status} />
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close details">
            ✕
          </button>
        </header>

        <dl className="details">
          {rows.map(([k, v]) => (
            <div key={k} className="details__row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <h3 className="drawer__sub">Latency – last 20 samples</h3>
        <Sparkline values={device.history} width={320} height={80} />

        {status !== "up" && (
          <p className={`hint hint--${status}`}>
            {status === "down"
              ? "Device is not responding. Check power and uplink, then ping the gateway."
              : "High latency or packet loss. Check interface errors and link utilisation."}
          </p>
        )}
      </aside>
    </div>
  );
}
