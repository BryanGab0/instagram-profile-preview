import { useState } from "react";

function read<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  try {
    const saved = localStorage.getItem(key);
    return allowed.includes(saved as T) ? (saved as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * `useState` for a small set of string options that is remembered across visits.
 * Saved values outside `allowed` are ignored, so a renamed option can't break the page.
 */
export function useLocalStorageState<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[],
) {
  const [value, setValue] = useState<T>(() => read(key, fallback, allowed));

  function update(next: T) {
    setValue(next);
    try {
      localStorage.setItem(key, next);
    } catch {
      // The value still applies for this visit.
    }
  }

  return [value, update] as const;
}
