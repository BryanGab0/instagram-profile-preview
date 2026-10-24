export function GridIcon({ className }: { className?: string }) {
  const cells = [2.5, 9.5, 16.5];

  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      {cells.flatMap((y) =>
        cells.map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" rx="1.2" />),
      )}
    </svg>
  );
}
