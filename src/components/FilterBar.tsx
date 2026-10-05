import type { StatusFilter } from "../types";

interface Props {
  query: string;
  onQuery: (q: string) => void;
  status: StatusFilter;
  onStatus: (s: StatusFilter) => void;
  site: string;
  sites: string[];
  onSite: (s: string) => void;
}

const statusOptions: StatusFilter[] = ["all", "up", "degraded", "down"];

export function FilterBar({ query, onQuery, status, onStatus, site, sites, onSite }: Props) {
  return (
    <div className="filters">
      <input
        className="input"
        type="search"
        placeholder="Search by name or IP…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        aria-label="Search devices"
      />

      <div className="chips" role="group" aria-label="Filter by status">
        {statusOptions.map((s) => (
          <button
            key={s}
            type="button"
            className={`chip ${status === s ? "chip--active" : ""}`}
            aria-pressed={status === s}
            onClick={() => onStatus(s)}
          >
            {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <select className="input select" value={site} onChange={(e) => onSite(e.target.value)} aria-label="Filter by site">
        <option value="all">All sites</option>
        {sites.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
