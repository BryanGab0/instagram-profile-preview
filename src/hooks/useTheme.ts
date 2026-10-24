import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

// Also read by the inline script in index.html. Keep both in sync.
export const THEME_STORAGE_KEY = "instapreview:theme";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Storage can be blocked by privacy settings; fall back to the OS preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Site theme. Follows the OS until the user picks one, then remembers that choice. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // The choice still applies for this visit.
    }
  }

  return { theme, toggleTheme };
}
