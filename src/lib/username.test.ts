import { describe, expect, it } from "vitest";
import { sanitizeUsername } from "./username";

describe("sanitizeUsername", () => {
  it("keeps valid usernames unchanged", () => {
    expect(sanitizeUsername("my.brand_2025")).toBe("my.brand_2025");
  });

  it("lowercases letters", () => {
    expect(sanitizeUsername("MyBrand")).toBe("mybrand");
  });

  it("removes spaces, accents and symbols", () => {
    expect(sanitizeUsername("café da manhã!")).toBe("cafdamanh");
  });

  it("limits the length to 30 characters", () => {
    expect(sanitizeUsername("a".repeat(40))).toHaveLength(30);
  });
});
