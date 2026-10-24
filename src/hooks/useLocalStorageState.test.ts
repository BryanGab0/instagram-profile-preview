import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLocalStorageState } from "./useLocalStorageState";

const OPTIONS = ["a", "b"] as const;

describe("useLocalStorageState", () => {
  it("starts with the fallback when nothing is saved", () => {
    const { result } = renderHook(() => useLocalStorageState("key", "a", OPTIONS));

    expect(result.current[0]).toBe("a");
  });

  it("restores and saves values", () => {
    localStorage.setItem("key", "b");
    const { result } = renderHook(() => useLocalStorageState("key", "a", OPTIONS));
    expect(result.current[0]).toBe("b");

    act(() => result.current[1]("a"));

    expect(result.current[0]).toBe("a");
    expect(localStorage.getItem("key")).toBe("a");
  });

  it("ignores saved values that are not allowed", () => {
    localStorage.setItem("key", "removed-option");
    const { result } = renderHook(() => useLocalStorageState("key", "a", OPTIONS));

    expect(result.current[0]).toBe("a");
  });
});
