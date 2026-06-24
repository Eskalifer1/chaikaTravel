import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withNuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";

import RoomSearch from "@/features/rooms/RoomSearch";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderSearch(searchParams?: string) {
  return render(<RoomSearch />, {
    wrapper: withNuqsTestingAdapter({ searchParams, hasMemory: true }),
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("RoomSearch — rendering", () => {
  it("renders a search input", () => {
    renderSearch();

    expect(screen.getByRole("searchbox", { name: "Search rooms" })).toBeInTheDocument();
  });

  it("does not show the clear button when input is empty", () => {
    renderSearch();

    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("shows the clear button when the URL already has a query", () => {
    renderSearch("?q=suite");

    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });

  it("pre-fills the input from the URL query param", () => {
    renderSearch("?q=ocean");

    expect(screen.getByRole("searchbox", { name: "Search rooms" })).toHaveValue("ocean");
  });
});

// ---------------------------------------------------------------------------
// Typing
// ---------------------------------------------------------------------------

describe("RoomSearch — typing", () => {
  it("reflects typed value in the input immediately", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.type(screen.getByRole("searchbox", { name: "Search rooms" }), "suite");

    expect(screen.getByRole("searchbox", { name: "Search rooms" })).toHaveValue("suite");
  });

  it("shows the clear button after typing", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.type(screen.getByRole("searchbox", { name: "Search rooms" }), "a");

    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });

  it("updates the URL after debounce", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const user = userEvent.setup();

    render(<RoomSearch />, {
      wrapper: withNuqsTestingAdapter({ hasMemory: true, onUrlUpdate }),
    });

    await user.type(screen.getByRole("searchbox", { name: "Search rooms" }), "suite");

    await waitFor(() => {
      expect(onUrlUpdate).toHaveBeenCalled();
    });

    const { searchParams } = onUrlUpdate.mock.calls.at(-1)![0];
    expect(searchParams.get("q")).toBe("suite");
  });

  it("removes the URL param when input is cleared by typing", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const user = userEvent.setup();

    render(<RoomSearch />, {
      wrapper: withNuqsTestingAdapter({
        searchParams: "?q=suite",
        hasMemory: true,
        onUrlUpdate,
      }),
    });

    await user.clear(screen.getByRole("searchbox", { name: "Search rooms" }));

    await waitFor(() => {
      expect(onUrlUpdate).toHaveBeenCalled();
    });

    const { searchParams } = onUrlUpdate.mock.calls.at(-1)![0];
    expect(searchParams.get("q")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Clear button
// ---------------------------------------------------------------------------

describe("RoomSearch — clear button", () => {
  it("clears the input immediately on click", async () => {
    const user = userEvent.setup();
    renderSearch("?q=suite");

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(screen.getByRole("searchbox", { name: "Search rooms" })).toHaveValue("");
  });

  it("hides the clear button after clearing", async () => {
    const user = userEvent.setup();
    renderSearch("?q=suite");

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("removes the URL param immediately without waiting for debounce", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const user = userEvent.setup();

    render(<RoomSearch />, {
      wrapper: withNuqsTestingAdapter({
        searchParams: "?q=suite",
        hasMemory: true,
        onUrlUpdate,
      }),
    });

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(onUrlUpdate).toHaveBeenCalledTimes(1);
    const { searchParams } = onUrlUpdate.mock.calls[0][0];
    expect(searchParams.get("q")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

describe("RoomSearch — accessibility", () => {
  it("input has an accessible label", () => {
    renderSearch();

    expect(screen.getByRole("searchbox", { name: "Search rooms" })).toBeInTheDocument();
  });

  it("clear button has an accessible label", () => {
    renderSearch("?q=wifi");

    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });
});
