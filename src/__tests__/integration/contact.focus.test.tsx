import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("contact section recruiter information", () => {
  it("renders clear direct contact information for recruiters", () => {
    render(<Contact />);

    // Direct email should be prominently visible
    expect(screen.getByText(/hoangngocphuongcute@gmail.com/i)).toBeInTheDocument();

    // Direct action buttons
    expect(screen.getByRole("button", { name: /copy email address/i })).toBeInTheDocument();

    // CV links
    expect(screen.getByRole("link", { name: /view full cv/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download pdf/i })).toBeInTheDocument();

    // Professional profiles
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
  });
});
