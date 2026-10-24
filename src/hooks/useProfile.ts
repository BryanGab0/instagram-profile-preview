import { DEFAULT_PROFILE } from "@/constants/defaultProfile";
import { createId } from "@/lib/id";
import { profileReducer, type ProfileAction, type ProfileField } from "@/state/profileReducer";
import type { Highlight, Profile } from "@/types/profile";
import { useMemo, useReducer } from "react";

export function useProfile(initialProfile: Profile = DEFAULT_PROFILE) {
  const [profile, dispatch] = useReducer(profileReducer, initialProfile);

  // Memoized so components receiving these functions don't re-render on every change.
  const actions = useMemo(
    () => ({
      // TypeScript can't narrow a generic key inside a union, hence the cast.
      // The function signature still guarantees that `value` matches `field`.
      setField: <K extends ProfileField>(field: K, value: Profile[K]) =>
        dispatch({ type: "setField", field, value } as ProfileAction),
      addPosts: (images: string[]) =>
        dispatch({ type: "addPosts", posts: images.map((image) => ({ id: createId(), image })) }),
      removePost: (id: string) => dispatch({ type: "removePost", id }),
      movePost: (id: string, toIndex: number) => dispatch({ type: "movePost", id, toIndex }),
      addHighlight: (name: string) =>
        dispatch({ type: "addHighlight", highlight: { id: createId(), name, image: null } }),
      updateHighlight: (id: string, changes: Partial<Omit<Highlight, "id">>) =>
        dispatch({ type: "updateHighlight", id, changes }),
      removeHighlight: (id: string) => dispatch({ type: "removeHighlight", id }),
      replace: (profile: Profile) => dispatch({ type: "replace", profile }),
    }),
    [],
  );

  return { profile, actions };
}

export type ProfileActions = ReturnType<typeof useProfile>["actions"];
