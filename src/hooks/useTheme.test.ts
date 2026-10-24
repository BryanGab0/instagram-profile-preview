import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { THEME_STORAGE_KEY, useTheme } from "./useTheme";

function mockSystemTheme(dark: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: dark, media: query }));
}

describe("useTheme", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    mockSystemTheme(false);
  });

  it("follows the OS preference when nothing is saved", () => {
    mockSystemTheme(true);
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("prefers the saved choice over the OS", () => {
    mockSystemTheme(true);
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("light");
  });

  it("toggles the theme and saves the choice", () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("does not save anything until the user toggles", () => {
    renderHook(() => useTheme());

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });
});
