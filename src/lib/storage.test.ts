import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import { storage } from "./storage";

describe("storage", () => {
  it("returns undefined for missing keys", async () => {
    await expect(storage.get("missing")).resolves.toBeUndefined();
  });

  it("saves, reads and removes values", async () => {
    await storage.set("profile", { username: "acme" });
    await expect(storage.get("profile")).resolves.toEqual({ username: "acme" });

    await storage.remove("profile");
    await expect(storage.get("profile")).resolves.toBeUndefined();
  });
});
