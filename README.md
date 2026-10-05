# NetPulse – Network Health Dashboard

A responsive React + TypeScript dashboard for monitoring network devices (routers, switches,
firewalls, access points). It shows live latency, packet loss and uptime, flags degraded or
down devices, and suggests a first troubleshooting step. Designed in Figma first, then built
component by component from the design tokens.

**Live demo:** _add your Vercel link here_

## Features

- **Live updates**: latency is sampled every 3 seconds, with a pause/resume control
- **Health summary**: network health %, up / degraded / down counts, average latency
- **Search and filters**: by name or IP, status chips, site dropdown
- **Device details drawer**: IP, latency, packet loss, uptime, 20-sample trend and a troubleshooting hint (Esc to close)
- **Light and dark themes** driven by the same design tokens as the Figma file
- **Responsive**: 4-column desktop grid down to a single-column mobile layout
- **Accessible basics**: semantic buttons, `aria-pressed` filter chips, labelled dialog and charts

## Tech stack

React 18 · TypeScript (strict mode) · Vite · CSS custom properties (design tokens) · hand-built SVG sparklines (no chart library) · Figma

## How status is decided

| Status   | Rule |
|----------|------|
| Down     | no response (100% packet loss) |
| Degraded | latency > 100 ms **or** packet loss > 2% |
| Up       | everything else |

## Project structure

```
src/
  types.ts               shared TypeScript types (Device, Status, …)
  data/devices.ts        sample network inventory
  hooks/useDevices.ts    live-update simulation + status rules
  components/            StatsBar, FilterBar, DeviceCard, DeviceDrawer, StatusBadge, Sparkline
  styles/tokens.css      design tokens (match Figma variables)
  styles/app.css         layout and component styles
DESIGN.md                Figma spec: tokens, components, screens
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Deploy (free)

Push to GitHub → import the repo on **vercel.com** → framework "Vite" → Deploy.
