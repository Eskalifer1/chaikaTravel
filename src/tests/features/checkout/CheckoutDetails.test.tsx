import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ResolvedSearchParams } from "@/types";
import CheckoutDetails from "@/features/checkout/CheckoutDetails";

type Params = [string, ResolvedSearchParams[string]][];

describe("CheckoutDetails", () => {
  it("shows empty state when params array is empty", () => {
    render(<CheckoutDetails params={[]} />);
    expect(screen.getByText("No search parameters provided.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("renders a table when params are provided", () => {
    const params: Params = [["checkIn", "2026-09-16"]];
    render(<CheckoutDetails params={params} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders all param keys and values", () => {
    const params: Params = [
      ["checkIn", "2026-09-16"],
      ["checkOut", "2026-09-17"],
      ["adults", "2"],
    ];
    render(<CheckoutDetails params={params} />);

    expect(screen.getByText("checkIn")).toBeInTheDocument();
    expect(screen.getByText("2026-09-16")).toBeInTheDocument();
    expect(screen.getByText("checkOut")).toBeInTheDocument();
    expect(screen.getByText("2026-09-17")).toBeInTheDocument();
    expect(screen.getByText("adults")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders — for empty string value", () => {
    const params: Params = [["test", ""]];
    render(<CheckoutDetails params={params} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders — for undefined value", () => {
    const params: Params = [["test", undefined]];
    render(<CheckoutDetails params={params} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("joins array values with comma and space", () => {
    const params: Params = [["childAges", ["5", "8", "12"]]];
    render(<CheckoutDetails params={params} />);
    expect(screen.getByText("5, 8, 12")).toBeInTheDocument();
  });

  it("renders a single array value without trailing comma", () => {
    const params: Params = [["childAges", ["3"]]];
    render(<CheckoutDetails params={params} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders table header columns", () => {
    const params: Params = [["roomId", "101"]];
    render(<CheckoutDetails params={params} />);
    expect(screen.getByRole("columnheader", { name: "Parameter" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Value" })).toBeInTheDocument();
  });

  it("renders multiple params as separate rows", () => {
    const params: Params = [
      ["roomId", "101"],
      ["ratePlanId", "rp-1"],
      ["rooms", "2"],
    ];
    render(<CheckoutDetails params={params} />);
    expect(screen.getAllByRole("row")).toHaveLength(4); // 1 header + 3 data rows
  });
});
