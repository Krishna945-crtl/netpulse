interface Props {
  values: number[];
  width?: number;
  height?: number;
}

// tiny inline SVG chart, no chart library needed
export function Sparkline({ values, width = 120, height = 32 }: Props) {
  const max = Math.max(...values, 1);
  const step = width / (values.length - 1);
  const points = values
    .map((v, i) => `${(i * step).toFixed(1)},${(height - (v / max) * (height - 4) - 2).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      className="sparkline"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Latency trend, latest ${values[values.length - 1]} ms`}
    >
      <polyline points={points} fill="none" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
