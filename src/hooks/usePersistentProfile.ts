import { DEFAULT_PROFILE } from "@/constants/defaultProfile";
import { storage } from "@/lib/storage";
import type { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import { useProfile } from "./useProfile";

export const PROFILE_STORAGE_KEY = "profile";
const SAVE_DELAY_MS = 500;

/** Versioned so a future change to the profile shape can migrate old saves. */
interface SavedProfile {
  version: 1;
  profile: Profile;
}

/** Same as `useProfile`, but the profile is saved in the browser and restored on reload. */
export function usePersistentProfile() {
  const { profile, actions } = useProfile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const { replace } = actions;

  useEffect(() => {
    let cancelled = false;

    storage
      .get<SavedProfile>(PROFILE_STORAGE_KEY)
      .then((saved) => {
        // Defaults fill in fields added after the profile was saved.
        if (!cancelled && saved?.version === 1) replace({ ...DEFAULT_PROFILE, ...saved.profile });
      })
      .catch(() => {
        // Unreadable storage: start from the default profile instead of failing.
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [replace]);

  useEffect(() => {
    // Saving before the load finishes would overwrite the stored profile with the default.
    if (!isLoaded) return;

    // Waits for a pause in typing instead of writing on every keystroke.
    const timer = setTimeout(() => {
      const saved: SavedProfile = { version: 1, profile };
      storage
        .set(PROFILE_STORAGE_KEY, saved)
        .then(() => setSaveFailed(false))
        .catch(() => setSaveFailed(true));
    }, SAVE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [profile, isLoaded]);

  return { profile, actions, isLoaded, saveFailed };
}
