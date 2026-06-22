import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CheckoutEmptyState from "@/features/checkout/CheckoutDetails/CheckoutEmptyState";

describe("CheckoutEmptyState", () => {
  it("renders the fallback message", () => {
    render(<CheckoutEmptyState />);
    expect(screen.getByText("No search parameters provided.")).toBeInTheDocument();
  });
});
