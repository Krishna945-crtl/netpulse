import type { Status } from "../types";

const label: Record<Status, string> = {
  up: "Up",
  degraded: "Degraded",
  down: "Down",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`badge badge--${status}`}>
      <span className="badge__dot" aria-hidden="true" />
      {label[status]}
    </span>
  );
}
