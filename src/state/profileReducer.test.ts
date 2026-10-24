import { DEFAULT_PROFILE } from "@/constants/defaultProfile";
import type { Profile } from "@/types/profile";
import { describe, expect, it } from "vitest";
import { profileReducer } from "./profileReducer";

function withPosts(...ids: string[]): Profile {
  return { ...DEFAULT_PROFILE, posts: ids.map((id) => ({ id, image: `data:${id}` })) };
}

const postIds = (profile: Profile) => profile.posts.map((post) => post.id);

describe("profileReducer", () => {
  describe("setField", () => {
    it("updates only the given field", () => {
      const next = profileReducer(DEFAULT_PROFILE, {
        type: "setField",
        field: "username",
        value: "acme",
      });

      expect(next.username).toBe("acme");
      expect(next.bio).toBe(DEFAULT_PROFILE.bio);
    });

    it("does not mutate the previous state", () => {
      const state = { ...DEFAULT_PROFILE };
      profileReducer(state, { type: "setField", field: "isVerified", value: true });

      expect(state.isVerified).toBe(false);
    });
  });

  describe("posts", () => {
    it("adds new posts before existing ones", () => {
      const next = profileReducer(withPosts("a"), {
        type: "addPosts",
        posts: [{ id: "b", image: "data:b" }],
      });

      expect(postIds(next)).toEqual(["b", "a"]);
    });

    it("removes a post by id", () => {
      const next = profileReducer(withPosts("a", "b"), { type: "removePost", id: "a" });

      expect(postIds(next)).toEqual(["b"]);
    });

    it("moves a post to a new position", () => {
      const next = profileReducer(withPosts("a", "b", "c"), {
        type: "movePost",
        id: "a",
        toIndex: 2,
      });

      expect(postIds(next)).toEqual(["b", "c", "a"]);
    });

    it("clamps the target index to the list bounds", () => {
      const next = profileReducer(withPosts("a", "b", "c"), {
        type: "movePost",
        id: "c",
        toIndex: -10,
      });

      expect(postIds(next)).toEqual(["c", "a", "b"]);
    });

    it("returns the same state when the post does not exist", () => {
      const state = withPosts("a");

      expect(profileReducer(state, { type: "movePost", id: "x", toIndex: 0 })).toBe(state);
    });
  });

  describe("highlights", () => {
    it("adds a highlight at the end", () => {
      const next = profileReducer(DEFAULT_PROFILE, {
        type: "addHighlight",
        highlight: { id: "new", name: "Novo", image: null },
      });

      expect(next.highlights.at(-1)?.id).toBe("new");
    });

    it("updates a highlight without touching the others", () => {
      const [first, second] = DEFAULT_PROFILE.highlights;
      const next = profileReducer(DEFAULT_PROFILE, {
        type: "updateHighlight",
        id: first.id,
        changes: { name: "Bastidores" },
      });

      expect(next.highlights[0]).toEqual({ ...first, name: "Bastidores" });
      expect(next.highlights[1]).toBe(second);
    });

    it("removes a highlight by id", () => {
      const [first] = DEFAULT_PROFILE.highlights;
      const next = profileReducer(DEFAULT_PROFILE, { type: "removeHighlight", id: first.id });

      expect(next.highlights.map((h) => h.id)).not.toContain(first.id);
    });
  });

  it("replaces the whole profile", () => {
    const next = profileReducer(withPosts("a"), { type: "replace", profile: DEFAULT_PROFILE });

    expect(next).toBe(DEFAULT_PROFILE);
  });
});
