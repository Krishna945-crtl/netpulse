import type { Device, DeviceType } from "../types";

const seed: Array<[string, DeviceType, string, string, number]> = [
  ["core-rtr-01", "router", "Hyderabad", "10.0.0.1", 12],
  ["core-rtr-02", "router", "Bengaluru", "10.0.1.1", 18],
  ["edge-fw-01", "firewall", "Hyderabad", "10.0.0.254", 9],
  ["edge-fw-02", "firewall", "Chennai", "10.0.2.254", 22],
  ["dist-sw-01", "switch", "Hyderabad", "10.0.10.2", 4],
  ["dist-sw-02", "switch", "Bengaluru", "10.0.11.2", 6],
  ["acc-sw-14", "switch", "Pune", "10.0.12.14", 7],
  ["acc-sw-15", "switch", "Pune", "10.0.12.15", 140],
  ["ap-floor3-a", "access-point", "Hyderabad", "10.0.20.31", 25],
  ["ap-floor3-b", "access-point", "Hyderabad", "10.0.20.32", 31],
  ["ap-lobby", "access-point", "Chennai", "10.0.22.5", 0],
  ["ap-cafe", "access-point", "Bengaluru", "10.0.21.9", 48],
];

const fillHistory = (base: number): number[] =>
  Array.from({ length: 20 }, () =>
    base === 0 ? 0 : Math.max(1, Math.round(base + (Math.random() - 0.5) * base * 0.4))
  );

export const initialDevices: Device[] = seed.map(([name, type, site, ip, latency], i) => ({
  id: `dev-${i + 1}`,
  name,
  type,
  site,
  ip,
  latencyMs: latency,
  packetLoss: latency === 0 ? 100 : latency > 100 ? 6.5 : Math.round(Math.random() * 10) / 10,
  uptimeHours: latency === 0 ? 0 : 120 + Math.round(Math.random() * 2000),
  history: fillHistory(latency),
}));
