import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Room } from "@/types";

import RoomList from "@/features/rooms/RoomList";

vi.mock("next/navigation", () => ({
  useSearchParams: () =>
    new URLSearchParams("adults=1&rooms=1&checkIn=2026-09-16&checkOut=2026-09-17"),
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill: _fill, ...rest } = props;

    return <img {...rest} />;
  },
}));

// ---------------------------------------------------------------------------
// Minimal room factory — only override the fields relevant to a specific test
// ---------------------------------------------------------------------------

function makeRoom(overrides: Partial<Room> = {}): Room {
  return {
    id: "room-test",
    name: "Test Room",
    description: "A test room description.",
    maxOccupancy: 2,
    areaSqm: 20,
    amenities: [{ key: "wifi", label: "Free Wi-Fi" }],
    images: ["https://example.com/photo.jpg"],
    ratePlans: [
      {
        id: "rp-test",
        roomId: "room-test",
        price: 100,
        currency: "USD",
        cancellation: { type: "non-refundable" },
      },
    ],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

describe("RoomList — empty state", () => {
  it("renders the empty-state message when rooms array is empty", () => {
    render(<RoomList rooms={[]} />);

    expect(screen.getByText("No rooms available")).toBeInTheDocument();
    expect(screen.getByText(/try adjusting your dates/i)).toBeInTheDocument();
  });

  it("does not render a room list when rooms array is empty", () => {
    render(<RoomList rooms={[]} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// List structure
// ---------------------------------------------------------------------------

describe("RoomList — list structure", () => {
  it("renders an accessible section with a label", () => {
    render(<RoomList rooms={[makeRoom()]} />);

    expect(screen.getByRole("region", { name: "Available rooms" })).toBeInTheDocument();
  });

  it("renders one card per room", () => {
    const rooms = [
      makeRoom({ id: "r1", name: "Room A" }),
      makeRoom({ id: "r2", name: "Room B" }),
      makeRoom({ id: "r3", name: "Room C" }),
    ];
    render(<RoomList rooms={rooms} />);

    expect(screen.getByRole("article", { name: "Room A" })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Room B" })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Room C" })).toBeInTheDocument();
  });

  it("does not render the empty state when rooms are present", () => {
    render(<RoomList rooms={[makeRoom()]} />);

    expect(screen.queryByText("No rooms available")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// RoomCard — basic content
// ---------------------------------------------------------------------------

describe("RoomCard — basic content", () => {
  it("displays the room name as a heading", () => {
    render(<RoomList rooms={[makeRoom({ name: "Junior Suite" })]} />);

    expect(screen.getByRole("heading", { name: "Junior Suite" })).toBeInTheDocument();
  });

  it("displays the room description", () => {
    const description = "Spacious suite with ocean views.";
    render(<RoomList rooms={[makeRoom({ description })]} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("displays the area in square metres", () => {
    render(<RoomList rooms={[makeRoom({ areaSqm: 48 })]} />);

    expect(screen.getByText(/48\s*m/)).toBeInTheDocument();
  });

  it("displays max occupancy — singular guest", () => {
    render(<RoomList rooms={[makeRoom({ maxOccupancy: 1 })]} />);

    // The meta renders "Up to <strong>1</strong> guest" — query the parent span by partial text
    expect(screen.getByText(/up to/i)).toBeInTheDocument();
    // "guests" should NOT appear — only "guest"
    expect(screen.queryByText(/\bguests\b/i)).not.toBeInTheDocument();
  });

  it("displays max occupancy — plural guests", () => {
    render(<RoomList rooms={[makeRoom({ maxOccupancy: 4 })]} />);

    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText(/guests/i)).toBeInTheDocument();
  });

  it("renders an accessible article per room", () => {
    const room = makeRoom({ name: "Economy Single Room" });
    render(<RoomList rooms={[room]} />);

    expect(screen.getByRole("article", { name: "Economy Single Room" })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Amenities
// ---------------------------------------------------------------------------

describe("RoomCard — amenities", () => {
  it("renders an accessible amenity list", () => {
    render(<RoomList rooms={[makeRoom()]} />);

    expect(screen.getByRole("list", { name: "Room amenities" })).toBeInTheDocument();
  });

  it("displays each amenity label", () => {
    const room = makeRoom({
      amenities: [
        { key: "wifi", label: "Free Wi-Fi" },
        { key: "tv", label: "Smart TV" },
        { key: "mini-bar", label: "Mini Bar" },
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.getByText("Free Wi-Fi")).toBeInTheDocument();
    expect(screen.getByText("Smart TV")).toBeInTheDocument();
    expect(screen.getByText("Mini Bar")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Availability
// ---------------------------------------------------------------------------

describe("RoomCard — availability", () => {
  it("shows nothing for availability when availableCount is undefined", () => {
    render(<RoomList rooms={[makeRoom({ availableCount: undefined })]} />);

    expect(screen.queryByText(/available/)).not.toBeInTheDocument();
    expect(screen.queryByText(/only \d+ left!/i)).not.toBeInTheDocument();
  });

  it("shows normal availability label for count above threshold (> 2)", () => {
    render(<RoomList rooms={[makeRoom({ availableCount: 5 })]} />);

    expect(screen.getByText("5 available")).toBeInTheDocument();
  });

  it("shows low-availability label for count exactly at threshold (2)", () => {
    render(<RoomList rooms={[makeRoom({ availableCount: 2 })]} />);

    expect(screen.getByText("Only 2 left!")).toBeInTheDocument();
  });

  it("shows low-availability label for count of 1", () => {
    render(<RoomList rooms={[makeRoom({ availableCount: 1 })]} />);

    expect(screen.getByText("Only 1 left!")).toBeInTheDocument();
  });

  it("has a screen-reader aria-label for low availability", () => {
    render(<RoomList rooms={[makeRoom({ availableCount: 1 })]} />);

    expect(screen.getByLabelText("Only 1 room left")).toBeInTheDocument();
  });

  it("has a screen-reader aria-label for normal availability", () => {
    render(<RoomList rooms={[makeRoom({ availableCount: 5 })]} />);

    expect(screen.getByLabelText("5 rooms available")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

describe("RoomCard — badge", () => {
  it("renders no badge when badge field is absent", () => {
    render(<RoomList rooms={[makeRoom({ badge: undefined })]} />);

    expect(screen.queryByLabelText(/badge:/i)).not.toBeInTheDocument();
  });

  it.each([
    ["frequently-booked" as const, "Frequently Booked"],
    ["best-value" as const, "Best Value"],
    ["upgrade" as const, "Upgrade"],
    ["lowest-price" as const, "Lowest Price"],
  ] as const)("renders '%s' badge with label '%s'", (badge, label) => {
    render(<RoomList rooms={[makeRoom({ badge })]} />);

    expect(screen.getByLabelText(`Badge: ${label}`)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Rate plans — summary row
// ---------------------------------------------------------------------------

describe("RoomCard — rate plan summary", () => {
  it("does not show 'From … options' header when there is only one rate plan", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-1",
          roomId: "room-test",
          price: 115,
          currency: "USD",
          cancellation: { type: "free-cancellation", deadline: "2026-09-16" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.queryByText(/options available/i)).not.toBeInTheDocument();
  });

  it("shows 'From X · N options available' header when there are multiple rate plans", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-a",
          roomId: "room-test",
          price: 89,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
        {
          id: "rp-b",
          roomId: "room-test",
          price: 109,
          currency: "USD",
          cancellation: { type: "free-cancellation", deadline: "2026-09-13" },
        },
        {
          id: "rp-c",
          roomId: "room-test",
          price: 129,
          currency: "USD",
          cancellation: { type: "free-cancellation", deadline: "2026-09-13" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.getByText(/3 options available/i)).toBeInTheDocument();
    // $89.00 appears in the summary header (the lowest price) and also in the plan row — use the summary element
    const summary = screen.getByText(/3 options available/i).closest("p")!;
    expect(within(summary).getByText("$89.00")).toBeInTheDocument();
  });

  it("shows the lowest price across all rate plans in the summary", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-cheap",
          roomId: "room-test",
          price: 59,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
        {
          id: "rp-expensive",
          roomId: "room-test",
          price: 299,
          currency: "USD",
          cancellation: { type: "free-cancellation", deadline: "2026-09-15" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    // "From $59.00 · 2 options available" — the $59.00 appears in the summary text
    const summary = screen.getByText(/2 options available/i).closest("p")!;
    expect(within(summary).getByText("$59.00")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Rate plans — cancellation policy
// ---------------------------------------------------------------------------

describe("RoomCard — cancellation policy", () => {
  it("shows 'Non-refundable' for non-refundable plans", () => {
    render(
      <RoomList
        rooms={[
          makeRoom({
            ratePlans: [
              {
                id: "rp-nr",
                roomId: "room-test",
                price: 99,
                currency: "USD",
                cancellation: { type: "non-refundable" },
              },
            ],
          }),
        ]}
      />,
    );

    expect(screen.getByText("Non-refundable")).toBeInTheDocument();
  });

  it("shows 'Free cancellation' with a formatted deadline for free-cancellation plans", () => {
    render(
      <RoomList
        rooms={[
          makeRoom({
            ratePlans: [
              {
                id: "rp-fc",
                roomId: "room-test",
                price: 109,
                currency: "USD",
                cancellation: { type: "free-cancellation", deadline: "2026-09-13" },
              },
            ],
          }),
        ]}
      />,
    );

    expect(screen.getByText(/free cancellation/i)).toBeInTheDocument();
    // formatDeadlineDate("2026-09-13") → "Sep 13" in en-US locale
    expect(screen.getByText(/sep 13/i)).toBeInTheDocument();
  });

  it("can show both non-refundable and free-cancellation plans on the same card", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-nr",
          roomId: "room-test",
          price: 89,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
        {
          id: "rp-fc",
          roomId: "room-test",
          price: 109,
          currency: "USD",
          cancellation: { type: "free-cancellation", deadline: "2026-09-13" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.getByText("Non-refundable")).toBeInTheDocument();
    expect(screen.getByText(/free cancellation/i)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Rate plans — meal plan
// ---------------------------------------------------------------------------

describe("RoomCard — meal plan", () => {
  it("shows 'Room only' when no meal is included", () => {
    render(<RoomList rooms={[makeRoom()]} />);

    expect(screen.getByText("Room only")).toBeInTheDocument();
  });

  it("shows the meal label when a meal plan is included", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-bb",
          roomId: "room-test",
          price: 129,
          currency: "USD",
          cancellation: { type: "non-refundable" },
          meal: { type: "breakfast", label: "Breakfast Included" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.getByText("Breakfast Included")).toBeInTheDocument();
    expect(screen.queryByText("Room only")).not.toBeInTheDocument();
  });

  it.each([
    ["half-board" as const, "Half Board (Breakfast & Dinner)"],
    ["full-board" as const, "Full Board (3 Meals Daily)"],
    ["all-inclusive" as const, "All Inclusive"],
  ] as const)("displays '%s' meal plan label correctly", (type, label) => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-meal",
          roomId: "room-test",
          price: 200,
          currency: "USD",
          cancellation: { type: "non-refundable" },
          meal: { type, label },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Rate plans — price and discount
// ---------------------------------------------------------------------------

describe("RoomCard — price display", () => {
  it("shows the formatted price", () => {
    render(
      <RoomList
        rooms={[
          makeRoom({
            ratePlans: [
              {
                id: "rp-1",
                roomId: "room-test",
                price: 89,
                currency: "USD",
                cancellation: { type: "non-refundable" },
              },
            ],
          }),
        ]}
      />,
    );

    // The price span renders the formatted price as visible text
    expect(screen.getByText("$89.00")).toBeInTheDocument();
  });

  it("does not show a discount badge or struck-through price when originalPrice is absent", () => {
    render(<RoomList rooms={[makeRoom()]} />);

    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
  });

  it("shows a discount percentage badge and struck-through original price when originalPrice is present", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-disc",
          roomId: "room-test",
          price: 159,
          originalPrice: 199,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    // Discount badge: Math.round((1 - 159/199) * 100) = 20%
    expect(screen.getByText("-20%")).toBeInTheDocument();
    // Original price struck through (aria-hidden, so we query by text directly)
    expect(screen.getByText("$199.00")).toBeInTheDocument();
    expect(screen.getByText("$159.00")).toBeInTheDocument();
  });

  it("shows the correct discount percent for a large markdown (999 / 1499)", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-penthouse",
          roomId: "room-test",
          price: 999,
          originalPrice: 1499,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    // Math.round((1 - 999/1499) * 100) = 33%
    expect(screen.getByText("-33%")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Rate plans — Reserve link
// ---------------------------------------------------------------------------

describe("RoomCard — Reserve link", () => {
  it("renders a Reserve link for each rate plan", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-a",
          roomId: "room-test",
          price: 89,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
        {
          id: "rp-b",
          roomId: "room-test",
          price: 109,
          currency: "USD",
          cancellation: { type: "free-cancellation", deadline: "2026-09-13" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    const reserveLinks = screen.getAllByRole("link", { name: /reserve/i });
    expect(reserveLinks).toHaveLength(2);
  });

  it("Reserve link opens in a new tab", () => {
    render(<RoomList rooms={[makeRoom()]} />);

    const link = screen.getByRole("link", { name: /reserve/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("Reserve link href contains roomId and ratePlanId", () => {
    const room = makeRoom({
      id: "room-test",
      ratePlans: [
        {
          id: "rp-test",
          roomId: "room-test",
          price: 100,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    const link = screen.getByRole("link", { name: /reserve/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("roomId=room-test"));
    expect(link).toHaveAttribute("href", expect.stringContaining("ratePlanId=rp-test"));
  });

  it("Reserve link href starts with /checkout", () => {
    render(<RoomList rooms={[makeRoom()]} />);

    const link = screen.getByRole("link", { name: /reserve/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("/checkout"));
  });
});

// ---------------------------------------------------------------------------
// Edge cases from mock data
// ---------------------------------------------------------------------------

describe("RoomList — mock data edge cases", () => {
  it("handles a room with a single image (no carousel)", () => {
    const room = makeRoom({ name: "Test Room", images: ["https://example.com/only.jpg"] });
    render(<RoomList rooms={[room]} />);

    // For a single image, the component renders a plain <img> (no carousel region)
    const img = screen.getByAltText("Test Room — room photo");
    expect(img).toHaveAttribute("src", "https://example.com/only.jpg");
    expect(screen.queryByRole("region", { name: /photo gallery/i })).not.toBeInTheDocument();
  });

  it("renders an accessible carousel region for rooms with multiple images", () => {
    const room = makeRoom({
      name: "Suite",
      images: [
        "https://example.com/1.jpg",
        "https://example.com/2.jpg",
        "https://example.com/3.jpg",
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.getByRole("region", { name: "Suite photo gallery" })).toBeInTheDocument();
  });

  it("renders a room with a single rate plan without showing options count", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-accessible-flex",
          roomId: "room-accessible",
          price: 115,
          currency: "USD",
          cancellation: { type: "free-cancellation", deadline: "2026-09-16" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    expect(screen.queryByText(/options available/i)).not.toBeInTheDocument();
    expect(screen.getByText("$115.00")).toBeInTheDocument();
  });

  it("renders a room where all rate plans are non-refundable (no flexible option)", () => {
    const room = makeRoom({
      ratePlans: [
        {
          id: "rp-nr-1",
          roomId: "room-test",
          price: 99,
          originalPrice: 179,
          currency: "USD",
          cancellation: { type: "non-refundable" },
        },
        {
          id: "rp-nr-2",
          roomId: "room-test",
          price: 125,
          originalPrice: 199,
          currency: "USD",
          cancellation: { type: "non-refundable" },
          meal: { type: "breakfast", label: "Breakfast Included" },
        },
      ],
    });
    render(<RoomList rooms={[room]} />);

    const nonRefundableLabels = screen.getAllByText("Non-refundable");
    expect(nonRefundableLabels).toHaveLength(2);
    expect(screen.queryByText(/free cancellation/i)).not.toBeInTheDocument();
  });

  it("renders multiple rooms from the same list independently", () => {
    const rooms = [
      makeRoom({ id: "r1", name: "Room One", availableCount: 1, badge: "upgrade" as const }),
      makeRoom({ id: "r2", name: "Room Two", availableCount: 5, badge: undefined }),
    ];
    render(<RoomList rooms={rooms} />);

    expect(screen.getByText("Only 1 left!")).toBeInTheDocument();
    expect(screen.getByText("5 available")).toBeInTheDocument();
    expect(screen.getByText("Upgrade")).toBeInTheDocument();
    // Room Two has no badge
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });
});
