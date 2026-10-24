import { describe, expect, it } from "vitest";
import { splitBio } from "./bio";

describe("splitBio", () => {
  it("returns plain text as a single part", () => {
    expect(splitBio("Hello world")).toEqual([{ text: "Hello world", isMention: false }]);
  });

  it("separates mentions and hashtags from the surrounding text", () => {
    expect(splitBio("Founder @acme.co · #design")).toEqual([
      { text: "Founder ", isMention: false },
      { text: "@acme.co", isMention: true },
      { text: " · ", isMention: false },
      { text: "#design", isMention: true },
    ]);
  });

  it("supports accented characters", () => {
    expect(splitBio("#café")).toEqual([{ text: "#café", isMention: true }]);
  });

  it("keeps line breaks in plain text", () => {
    expect(splitBio("line one\n@user")).toEqual([
      { text: "line one\n", isMention: false },
      { text: "@user", isMention: true },
    ]);
  });
});
