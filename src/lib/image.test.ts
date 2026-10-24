import { describe, expect, it } from "vitest";
import { fitWithin, isImageFile } from "./image";

describe("fitWithin", () => {
  it("keeps images that already fit", () => {
    expect(fitWithin(800, 600, 1080)).toEqual({ width: 800, height: 600 });
  });

  it("scales landscape images by their width", () => {
    expect(fitWithin(4000, 3000, 1080)).toEqual({ width: 1080, height: 810 });
  });

  it("scales portrait images by their height", () => {
    expect(fitWithin(3000, 4000, 1080)).toEqual({ width: 810, height: 1080 });
  });
});

describe("isImageFile", () => {
  it("accepts images and rejects other files", () => {
    expect(isImageFile(new File([], "photo.png", { type: "image/png" }))).toBe(true);
    expect(isImageFile(new File([], "doc.pdf", { type: "application/pdf" }))).toBe(false);
  });
});
