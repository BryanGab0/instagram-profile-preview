import { DEFAULT_PROFILE } from "@/constants/defaultProfile";
import { storage } from "@/lib/storage";
import { act, renderHook, waitFor } from "@testing-library/react";
import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { PROFILE_STORAGE_KEY, usePersistentProfile } from "./usePersistentProfile";

async function renderLoaded() {
  const hook = renderHook(() => usePersistentProfile());
  await waitFor(() => expect(hook.result.current.isLoaded).toBe(true));
  return hook;
}

describe("usePersistentProfile", () => {
  beforeEach(async () => {
    await storage.remove(PROFILE_STORAGE_KEY);
  });

  it("starts with the default profile when nothing is saved", async () => {
    const { result } = await renderLoaded();

    expect(result.current.profile).toEqual(DEFAULT_PROFILE);
  });

  it("restores a saved profile, filling in missing fields", async () => {
    await storage.set(PROFILE_STORAGE_KEY, { version: 1, profile: { username: "saved" } });

    const { result } = await renderLoaded();

    expect(result.current.profile.username).toBe("saved");
    expect(result.current.profile.highlights).toEqual(DEFAULT_PROFILE.highlights);
  });

  it("saves changes after a short pause", async () => {
    const { result } = await renderLoaded();

    act(() => result.current.actions.setField("displayName", "Acme"));

    await waitFor(async () => {
      const saved = await storage.get<{ profile: { displayName: string } }>(PROFILE_STORAGE_KEY);
      expect(saved?.profile.displayName).toBe("Acme");
    });
  });
});
