import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ResetButton } from "./ResetButton";

describe("ResetButton", () => {
  it("resets after the user confirms", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const onReset = vi.fn();
    render(<ResetButton onReset={onReset} />);

    await userEvent.click(screen.getByRole("button", { name: "Recomeçar" }));

    expect(onReset).toHaveBeenCalledOnce();
  });

  it("does nothing when the user cancels", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const onReset = vi.fn();
    render(<ResetButton onReset={onReset} />);

    await userEvent.click(screen.getByRole("button", { name: "Recomeçar" }));

    expect(onReset).not.toHaveBeenCalled();
  });
});
