export function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" width="18" height="12" fill="currentColor" aria-hidden>
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

export function BatteryIcon() {
  return (
    <svg viewBox="0 0 27 13" width="27" height="13" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="12"
        rx="3.5"
        fill="none"
        stroke="currentColor"
        opacity="0.4"
      />
      <rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" />
      <path d="M25 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
