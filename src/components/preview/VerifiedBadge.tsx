import { cn } from "@/lib/utils";

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("shrink-0", className)} role="img" aria-label="Verified">
      <path
        className="fill-ig-verified"
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      />
      <path
        d="m9 12 2 2 4-4"
        fill="none"
        stroke="white"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
