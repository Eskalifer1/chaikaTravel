import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CheckoutPage from "@/app/checkout/page";

function makeSearchParams(params: Record<string, string>): Promise<Record<string, string>> {
  return Promise.resolve(params);
}

describe("CheckoutPage", () => {
  it("renders the page heading", async () => {
    const ui = await CheckoutPage({ searchParams: makeSearchParams({}) });
    render(ui);
    expect(screen.getByRole("heading", { name: "Checkout" })).toBeInTheDocument();
  });

  it("shows empty state when no search params", async () => {
    const ui = await CheckoutPage({ searchParams: makeSearchParams({}) });
    render(ui);
    expect(screen.getByText("No search parameters provided.")).toBeInTheDocument();
  });

  it("shows table when search params are present", async () => {
    const ui = await CheckoutPage({
      searchParams: makeSearchParams({ roomId: "101", ratePlanId: "rp-1" }),
    });
    render(ui);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("roomId")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
  });

  it("renders all checkout params from url", async () => {
    const ui = await CheckoutPage({
      searchParams: makeSearchParams({
        roomId: "101",
        ratePlanId: "rp-1",
        checkIn: "2026-09-16",
        checkOut: "2026-09-17",
        rooms: "1",
        adults: "2",
        childAges: "5,8",
      }),
    });
    render(ui);

    expect(screen.getByText("roomId")).toBeInTheDocument();
    expect(screen.getByText("ratePlanId")).toBeInTheDocument();
    expect(screen.getByText("checkIn")).toBeInTheDocument();
    expect(screen.getByText("checkOut")).toBeInTheDocument();
    expect(screen.getByText("rooms")).toBeInTheDocument();
    expect(screen.getByText("adults")).toBeInTheDocument();
    expect(screen.getByText("childAges")).toBeInTheDocument();
  });

  it("renders — for param with empty string value", async () => {
    const ui = await CheckoutPage({ searchParams: makeSearchParams({ test: "" }) });
    render(ui);
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
