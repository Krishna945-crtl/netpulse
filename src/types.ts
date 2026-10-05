export type DeviceType = "router" | "switch" | "firewall" | "access-point";

export type Status = "up" | "degraded" | "down";

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  site: string;
  ip: string;
  latencyMs: number;
  packetLoss: number; // percent
  uptimeHours: number;
  history: number[]; // last 20 latency readings
}

export type StatusFilter = Status | "all";
