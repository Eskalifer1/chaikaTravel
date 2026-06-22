import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withNuqsTestingAdapter, type OnUrlUpdateFunction } from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";

import AvailabilitySearch from "@/features/rooms/AvailabilitySearch";
import { getDefaultCheckIn, getDefaultCheckOut } from "@/features/rooms/AvailabilitySearch/schema";
import { formatDisplayDate } from "@/lib/utils";

// Portal uses next/dynamic with ssr:false which doesn't execute in jsdom.
// Mock it so dialog children render directly into the document.
vi.mock("@/components/Portal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderSearch(searchParams?: string) {
  return render(<AvailabilitySearch />, {
    wrapper: withNuqsTestingAdapter({ searchParams, hasMemory: true }),
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("AvailabilitySearch — rendering", () => {
  it("renders the dates trigger button", () => {
    renderSearch();

    expect(screen.getByRole("button", { name: /dates/i })).toBeInTheDocument();
  });

  it("renders the travelers trigger button", () => {
    renderSearch();

    expect(screen.getByRole("button", { name: /travelers/i })).toBeInTheDocument();
  });

  it("renders the search submit button", () => {
    renderSearch();

    expect(screen.getByRole("button", { name: "Search rooms" })).toBeInTheDocument();
  });

  it("shows default traveler summary on trigger", () => {
    renderSearch();

    expect(screen.getByText(/2 travelers/i)).toBeInTheDocument();
    expect(screen.getByText(/1 room/i)).toBeInTheDocument();
  });

  it("falls back to today when URL contains a past checkIn date", () => {
    renderSearch("checkIn=2020-01-01&checkOut=2020-01-02");

    const expectedCheckIn = formatDisplayDate(getDefaultCheckIn());
    const expectedCheckOut = formatDisplayDate(getDefaultCheckOut());
    expect(screen.getByText(`${expectedCheckIn} – ${expectedCheckOut}`)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// DateRangePicker — open/close
// ---------------------------------------------------------------------------

describe("AvailabilitySearch — date range picker", () => {
  it("opens the date picker panel when Dates button is clicked", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /dates/i }));

    expect(screen.getByRole("dialog", { name: "Select dates" })).toBeInTheDocument();
  });

  it("closes the date picker when clicking outside", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /dates/i }));
    expect(screen.getByRole("dialog", { name: "Select dates" })).toBeInTheDocument();

    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Select dates" })).not.toBeInTheDocument();
    });
  });
});

// ---------------------------------------------------------------------------
// TravelersPanel — open/close and controls
// ---------------------------------------------------------------------------

describe("AvailabilitySearch — travelers panel", () => {
  it("opens the travelers panel when Travelers button is clicked", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /travelers/i }));

    expect(screen.getByRole("dialog", { name: "Select travelers" })).toBeInTheDocument();
  });

  it("shows rooms and adults steppers inside the panel", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /travelers/i }));

    expect(screen.getByRole("button", { name: /increase rooms/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /increase adults/i })).toBeInTheDocument();
  });

  it("increments adult count and updates the trigger label", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /travelers/i }));
    await user.click(screen.getByRole("button", { name: /increase adults/i }));

    expect(screen.getByText(/3 travelers/i)).toBeInTheDocument();
  });

  it("cannot decrement adults below 1", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /travelers/i }));

    await user.click(screen.getByRole("button", { name: /decrease adults/i }));
    expect(screen.getByRole("button", { name: /decrease adults/i })).toBeDisabled();
  });

  it("adds a child age selector when Add child is clicked", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /travelers/i }));
    await user.click(screen.getByRole("button", { name: /add child/i }));

    expect(screen.getByLabelText("Child 1 age")).toBeInTheDocument();
  });

  it("removes a child when the remove button is clicked", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("button", { name: /travelers/i }));
    await user.click(screen.getByRole("button", { name: /add child/i }));
    await user.click(screen.getByRole("button", { name: "Remove child 1" }));

    expect(screen.queryByLabelText("Child 1 age")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Form submission — valid
// ---------------------------------------------------------------------------

describe("AvailabilitySearch — form submission", () => {
  it("calls URL update on valid submit", async () => {
    const onUrlUpdate = vi.fn<OnUrlUpdateFunction>();
    const user = userEvent.setup();

    render(<AvailabilitySearch />, {
      wrapper: withNuqsTestingAdapter({ hasMemory: true, onUrlUpdate }),
    });

    await user.click(screen.getByRole("button", { name: "Search rooms" }));

    await waitFor(() => {
      expect(onUrlUpdate).toHaveBeenCalled();
    });
  });

  it("includes non-default params in the URL on submit", async () => {
    const onUrlUpdate = vi.fn<OnUrlUpdateFunction>();
    const user = userEvent.setup();

    render(<AvailabilitySearch />, {
      wrapper: withNuqsTestingAdapter({ hasMemory: true, onUrlUpdate }),
    });

    // Increase rooms to 2 (non-default) so nuqs writes it to the URL
    await user.click(screen.getByRole("button", { name: /travelers/i }));
    await user.click(screen.getByRole("button", { name: /increase rooms/i }));
    await user.click(screen.getByRole("button", { name: "Search rooms" }));

    await waitFor(() => {
      expect(onUrlUpdate).toHaveBeenCalled();
    });

    const { searchParams } = onUrlUpdate.mock.calls.at(-1)![0];
    expect(searchParams.get("rooms")).toBe("2");
  });

  it("does not include childAges param when there are no children", async () => {
    const onUrlUpdate = vi.fn<OnUrlUpdateFunction>();
    const user = userEvent.setup();

    render(<AvailabilitySearch />, {
      wrapper: withNuqsTestingAdapter({ hasMemory: true, onUrlUpdate }),
    });

    // Open travelers panel, increase rooms to write a non-default value so nuqs fires onUrlUpdate
    await user.click(screen.getByRole("button", { name: /travelers/i }));
    await user.click(screen.getByRole("button", { name: /increase rooms/i }));
    await user.click(screen.getByRole("button", { name: "Search rooms" }));

    await waitFor(() => {
      expect(onUrlUpdate).toHaveBeenCalled();
    });

    const { searchParams } = onUrlUpdate.mock.calls.at(-1)![0];
    expect(searchParams.get("childAges")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

describe("AvailabilitySearch — accessibility", () => {
  it("form has an accessible label", () => {
    renderSearch();

    expect(screen.getByRole("form", { name: "Search availability" })).toBeInTheDocument();
  });

  it("date trigger announces its expanded state", async () => {
    const user = userEvent.setup();
    renderSearch();

    const datesBtn = screen.getByRole("button", { name: /dates/i });
    expect(datesBtn).toHaveAttribute("aria-expanded", "false");

    await user.click(datesBtn);
    expect(datesBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("travelers trigger announces its expanded state", async () => {
    const user = userEvent.setup();
    renderSearch();

    const travelersBtn = screen.getByRole("button", { name: /travelers/i });
    expect(travelersBtn).toHaveAttribute("aria-expanded", "false");

    await user.click(travelersBtn);
    expect(travelersBtn).toHaveAttribute("aria-expanded", "true");
  });
});
