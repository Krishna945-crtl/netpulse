import type { Device } from "../types";
import { getStatus } from "../hooks/useDevices";
import { StatusBadge } from "./StatusBadge";
import { Sparkline } from "./Sparkline";

const typeIcon: Record<Device["type"], string> = {
  router: "⇄",
  switch: "▦",
  firewall: "⛨",
  "access-point": "◉",
};

interface Props {
  device: Device;
  onOpen: (id: string) => void;
}

export function DeviceCard({ device, onOpen }: Props) {
  const status = getStatus(device);

  return (
    <button type="button" className={`card card--${status}`} onClick={() => onOpen(device.id)}>
      <div className="card__top">
        <span className="card__icon" aria-hidden="true">
          {typeIcon[device.type]}
        </span>
        <div className="card__title">
          <strong>{device.name}</strong>
          <span className="muted">
            {device.site} · {device.ip}
          </span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="card__bottom">
        <div>
          <span className="muted small">Latency</span>
          <span className="metric">{status === "down" ? "—" : `${device.latencyMs} ms`}</span>
        </div>
        <Sparkline values={device.history} />
      </div>
    </button>
  );
}
