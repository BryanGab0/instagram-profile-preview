import { describe, expect, it } from "vitest";
import { createId } from "./id";

describe("createId", () => {
  it("returns a different id on every call", () => {
    const ids = new Set(Array.from({ length: 100 }, createId));
    expect(ids.size).toBe(100);
  });
});
