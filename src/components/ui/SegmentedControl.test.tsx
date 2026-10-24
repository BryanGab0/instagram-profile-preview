import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
];

describe("SegmentedControl", () => {
  it("marks the current value as checked", () => {
    render(<SegmentedControl label="Tema" value="dark" options={options} onChange={() => {}} />);

    expect(screen.getByRole("radio", { name: "Escuro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Claro" })).not.toBeChecked();
  });

  it("calls onChange when an option is clicked", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="Tema" value="light" options={options} onChange={onChange} />);

    await userEvent.click(screen.getByRole("radio", { name: "Escuro" }));

    expect(onChange).toHaveBeenCalledWith("dark");
  });

  it("moves the selection with arrow keys, wrapping around", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="Tema" value="dark" options={options} onChange={onChange} />);

    screen.getByRole("radio", { name: "Escuro" }).focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalledWith("light");
  });
});
