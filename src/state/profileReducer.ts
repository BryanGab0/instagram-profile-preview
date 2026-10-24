import type { Highlight, Post, Profile } from "@/types/profile";

/** Fields edited directly through form controls. */
export type ProfileField = Exclude<keyof Profile, "highlights" | "posts">;

export type ProfileAction =
  | { [K in ProfileField]: { type: "setField"; field: K; value: Profile[K] } }[ProfileField]
  | { type: "addPosts"; posts: Post[] }
  | { type: "removePost"; id: string }
  | { type: "movePost"; id: string; toIndex: number }
  | { type: "addHighlight"; highlight: Highlight }
  | { type: "updateHighlight"; id: string; changes: Partial<Omit<Highlight, "id">> }
  | { type: "removeHighlight"; id: string }
  | { type: "replace"; profile: Profile };

export function profileReducer(state: Profile, action: ProfileAction): Profile {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };

    case "addPosts":
      // Newest first, matching the order Instagram shows on the grid.
      return { ...state, posts: [...action.posts, ...state.posts] };

    case "removePost":
      return { ...state, posts: state.posts.filter((post) => post.id !== action.id) };

    case "movePost": {
      const from = state.posts.findIndex((post) => post.id === action.id);
      const to = Math.min(Math.max(action.toIndex, 0), state.posts.length - 1);
      if (from === -1 || from === to) return state;

      const posts = [...state.posts];
      const [moved] = posts.splice(from, 1);
      posts.splice(to, 0, moved);
      return { ...state, posts };
    }

    case "addHighlight":
      return { ...state, highlights: [...state.highlights, action.highlight] };

    case "updateHighlight":
      return {
        ...state,
        highlights: state.highlights.map((highlight) =>
          highlight.id === action.id ? { ...highlight, ...action.changes } : highlight,
        ),
      };

    case "removeHighlight":
      return {
        ...state,
        highlights: state.highlights.filter((highlight) => highlight.id !== action.id),
      };

    case "replace":
      return action.profile;
  }
}
