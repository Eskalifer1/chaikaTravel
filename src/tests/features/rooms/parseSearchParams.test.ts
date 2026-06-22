/**
 * Tests for parseSearchParams and availabilitySearchSchema.
 *
 * Written against the specification, not the implementation.
 * Each field is validated independently — an invalid value falls back to its
 * own default without affecting the other fields.
 */

import { describe, expect, it } from "vitest";

import {
  getDefaultCheckIn,
  getDefaultCheckOut,
  getDefaultValues,
  parseSearchParams,
} from "@/features/rooms/AvailabilitySearch/schema";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function make(entries: Record<string, string>): URLSearchParams {
  return new URLSearchParams(entries);
}

function futureDateIso(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

describe("parseSearchParams — empty params use defaults", () => {
  it("returns today as checkIn when no params given", () => {
    const result = parseSearchParams(make({}));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("returns tomorrow as checkOut when no params given", () => {
    const result = parseSearchParams(make({}));
    expect(result.checkOut).toBe(getDefaultCheckOut());
  });

  it("returns 1 room by default", () => {
    const result = parseSearchParams(make({}));
    expect(result.rooms).toBe(1);
  });

  it("returns 2 adults by default", () => {
    const result = parseSearchParams(make({}));
    expect(result.adults).toBe(2);
  });

  it("returns empty childAges by default", () => {
    const result = parseSearchParams(make({}));
    expect(result.childAges).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Valid params — happy path
// ---------------------------------------------------------------------------

describe("parseSearchParams — valid params are accepted", () => {
  it("accepts a valid checkIn date in the future", () => {
    const checkIn = futureDateIso(3);
    const result = parseSearchParams(make({ checkIn, checkOut: futureDateIso(5) }));
    expect(result.checkIn).toBe(checkIn);
  });

  it("accepts checkIn = today", () => {
    const today = getDefaultCheckIn();
    const result = parseSearchParams(make({ checkIn: today, checkOut: futureDateIso(1) }));
    expect(result.checkIn).toBe(today);
  });

  it("accepts a valid checkOut strictly after checkIn", () => {
    const checkIn = futureDateIso(2);
    const checkOut = futureDateIso(4);
    const result = parseSearchParams(make({ checkIn, checkOut }));
    expect(result.checkOut).toBe(checkOut);
  });

  it("accepts rooms = 1", () => {
    const result = parseSearchParams(make({ rooms: "1" }));
    expect(result.rooms).toBe(1);
  });

  it("accepts rooms > 1", () => {
    const result = parseSearchParams(make({ rooms: "5" }));
    expect(result.rooms).toBe(5);
  });

  it("accepts adults = 1", () => {
    const result = parseSearchParams(make({ adults: "1" }));
    expect(result.adults).toBe(1);
  });

  it("accepts adults > 1", () => {
    const result = parseSearchParams(make({ adults: "4" }));
    expect(result.adults).toBe(4);
  });

  it("accepts childAges with a single value", () => {
    const result = parseSearchParams(make({ childAges: "5" }));
    expect(result.childAges).toEqual([5]);
  });

  it("accepts childAges with multiple values", () => {
    const result = parseSearchParams(make({ childAges: "0,7,17" }));
    expect(result.childAges).toEqual([0, 7, 17]);
  });

  it("accepts childAges = 0 (infant)", () => {
    const result = parseSearchParams(make({ childAges: "0" }));
    expect(result.childAges).toEqual([0]);
  });

  it("accepts childAges = 17 (max)", () => {
    const result = parseSearchParams(make({ childAges: "17" }));
    expect(result.childAges).toEqual([17]);
  });
});

// ---------------------------------------------------------------------------
// checkIn — invalid values fall back to default
// ---------------------------------------------------------------------------

describe("parseSearchParams — invalid checkIn falls back to default", () => {
  it("rejects a non-date string", () => {
    const result = parseSearchParams(make({ checkIn: "not-a-date", checkOut: futureDateIso(2) }));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("rejects an empty string", () => {
    const result = parseSearchParams(make({ checkIn: "", checkOut: futureDateIso(2) }));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("rejects a past date", () => {
    const result = parseSearchParams(make({ checkIn: "2020-01-01", checkOut: "2020-01-02" }));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("rejects a date more than 1 year in the future", () => {
    const result = parseSearchParams(make({ checkIn: "2099-12-31", checkOut: futureDateIso(400) }));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("rejects SQL injection attempt as checkIn", () => {
    const result = parseSearchParams(
      make({ checkIn: "'; DROP TABLE rooms; --", checkOut: futureDateIso(2) }),
    );
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("rejects a number string that is not a date", () => {
    const result = parseSearchParams(make({ checkIn: "12345", checkOut: futureDateIso(2) }));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("does NOT affect other valid fields when checkIn is invalid", () => {
    const result = parseSearchParams(
      make({ checkIn: "bad", checkOut: futureDateIso(2), rooms: "3", adults: "4" }),
    );
    expect(result.rooms).toBe(3);
    expect(result.adults).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// checkOut — invalid values fall back to checkIn + 1 day
// ---------------------------------------------------------------------------

describe("parseSearchParams — invalid checkOut falls back to checkIn + 1 day", () => {
  it("rejects a non-date string", () => {
    const checkIn = futureDateIso(2);
    const result = parseSearchParams(make({ checkIn, checkOut: "not-a-date" }));
    expect(result.checkOut).toBe(futureDateIso(3));
  });

  it("rejects checkOut equal to checkIn", () => {
    const checkIn = futureDateIso(2);
    const result = parseSearchParams(make({ checkIn, checkOut: checkIn }));
    expect(result.checkOut).toBe(futureDateIso(3));
  });

  it("rejects checkOut before checkIn", () => {
    const checkIn = futureDateIso(5);
    const checkOut = futureDateIso(2);
    const result = parseSearchParams(make({ checkIn, checkOut }));
    expect(result.checkOut).toBe(futureDateIso(6));
  });

  it("rejects checkOut more than 1 month after checkIn", () => {
    const checkIn = futureDateIso(2);
    const result = parseSearchParams(make({ checkIn, checkOut: futureDateIso(50) }));
    expect(result.checkOut).toBe(futureDateIso(3));
  });

  it("rejects an empty string", () => {
    const checkIn = futureDateIso(1);
    const result = parseSearchParams(make({ checkIn, checkOut: "" }));
    expect(result.checkOut).toBe(futureDateIso(2));
  });

  it("does NOT affect other valid fields when checkOut is invalid", () => {
    const result = parseSearchParams(
      make({ checkIn: futureDateIso(1), checkOut: "bad", rooms: "2", adults: "3" }),
    );
    expect(result.rooms).toBe(2);
    expect(result.adults).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// rooms — invalid values fall back to default
// ---------------------------------------------------------------------------

describe("parseSearchParams — invalid rooms falls back to default", () => {
  it("rejects a non-numeric string", () => {
    const result = parseSearchParams(make({ rooms: "abc" }));
    expect(result.rooms).toBe(getDefaultValues().rooms);
  });

  it("rejects rooms = 0", () => {
    const result = parseSearchParams(make({ rooms: "0" }));
    expect(result.rooms).toBe(getDefaultValues().rooms);
  });

  it("rejects rooms = -1", () => {
    const result = parseSearchParams(make({ rooms: "-1" }));
    expect(result.rooms).toBe(getDefaultValues().rooms);
  });

  it("rejects a float", () => {
    const result = parseSearchParams(make({ rooms: "1.5" }));
    expect(result.rooms).toBe(getDefaultValues().rooms);
  });

  it("rejects an empty string", () => {
    const result = parseSearchParams(make({ rooms: "" }));
    expect(result.rooms).toBe(getDefaultValues().rooms);
  });

  it("does NOT affect other valid fields when rooms is invalid", () => {
    const result = parseSearchParams(
      make({ rooms: "bad", adults: "3", checkIn: futureDateIso(1), checkOut: futureDateIso(3) }),
    );
    expect(result.adults).toBe(3);
    expect(result.checkIn).toBe(futureDateIso(1));
  });
});

// ---------------------------------------------------------------------------
// adults — invalid values fall back to default
// ---------------------------------------------------------------------------

describe("parseSearchParams — invalid adults falls back to default", () => {
  it("rejects a non-numeric string", () => {
    const result = parseSearchParams(make({ adults: "abc" }));
    expect(result.adults).toBe(getDefaultValues().adults);
  });

  it("rejects adults = 0", () => {
    const result = parseSearchParams(make({ adults: "0" }));
    expect(result.adults).toBe(getDefaultValues().adults);
  });

  it("rejects adults = -5", () => {
    const result = parseSearchParams(make({ adults: "-5" }));
    expect(result.adults).toBe(getDefaultValues().adults);
  });

  it("rejects a float", () => {
    const result = parseSearchParams(make({ adults: "2.9" }));
    expect(result.adults).toBe(getDefaultValues().adults);
  });

  it("rejects an empty string", () => {
    const result = parseSearchParams(make({ adults: "" }));
    expect(result.adults).toBe(getDefaultValues().adults);
  });

  it("does NOT affect other valid fields when adults is invalid", () => {
    const result = parseSearchParams(
      make({ adults: "bad", rooms: "3", checkIn: futureDateIso(1), checkOut: futureDateIso(3) }),
    );
    expect(result.rooms).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// childAges — invalid values fall back to default
// ---------------------------------------------------------------------------

describe("parseSearchParams — invalid childAges falls back to default", () => {
  it("rejects a non-numeric child age", () => {
    const result = parseSearchParams(make({ childAges: "abc" }));
    expect(result.childAges).toEqual(getDefaultValues().childAges);
  });

  it("rejects a child age above 17", () => {
    const result = parseSearchParams(make({ childAges: "18" }));
    expect(result.childAges).toEqual(getDefaultValues().childAges);
  });

  it("rejects a child age of -1", () => {
    const result = parseSearchParams(make({ childAges: "-1" }));
    expect(result.childAges).toEqual(getDefaultValues().childAges);
  });

  it("rejects a mix of valid and invalid ages — whole array falls back", () => {
    // 5 is valid but 99 is not — the entire array is invalid
    const result = parseSearchParams(make({ childAges: "5,99" }));
    expect(result.childAges).toEqual(getDefaultValues().childAges);
  });

  it("rejects float child ages", () => {
    const result = parseSearchParams(make({ childAges: "5.5" }));
    expect(result.childAges).toEqual(getDefaultValues().childAges);
  });

  it("does NOT affect other valid fields when childAges is invalid", () => {
    const result = parseSearchParams(make({ childAges: "99", rooms: "2", adults: "3" }));
    expect(result.rooms).toBe(2);
    expect(result.adults).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Cross-field independence — mixing valid and invalid fields
// ---------------------------------------------------------------------------

describe("parseSearchParams — each field fails independently", () => {
  it("only invalid fields are replaced with defaults, valid ones are kept", () => {
    const checkIn = futureDateIso(2);
    const checkOut = futureDateIso(4);
    const result = parseSearchParams(
      make({
        checkIn,
        checkOut,
        rooms: "bad", // invalid → default
        adults: "3", // valid
        childAges: "7", // valid
      }),
    );
    expect(result.checkIn).toBe(checkIn);
    expect(result.checkOut).toBe(checkOut);
    expect(result.rooms).toBe(getDefaultValues().rooms);
    expect(result.adults).toBe(3);
    expect(result.childAges).toEqual([7]);
  });

  it("all fields invalid → all fall back to defaults", () => {
    const result = parseSearchParams(
      make({
        checkIn: "bad",
        checkOut: "bad",
        rooms: "0",
        adults: "-1",
        childAges: "99",
      }),
    );
    const defaults = getDefaultValues();
    expect(result.checkIn).toBe(defaults.checkIn);
    expect(result.checkOut).toBe(defaults.checkOut);
    expect(result.rooms).toBe(defaults.rooms);
    expect(result.adults).toBe(defaults.adults);
    expect(result.childAges).toEqual(defaults.childAges);
  });

  it("all fields valid → no fallback applied", () => {
    const checkIn = futureDateIso(3);
    const checkOut = futureDateIso(6);
    const result = parseSearchParams(
      make({
        checkIn,
        checkOut,
        rooms: "2",
        adults: "4",
        childAges: "3,10",
      }),
    );
    expect(result.checkIn).toBe(checkIn);
    expect(result.checkOut).toBe(checkOut);
    expect(result.rooms).toBe(2);
    expect(result.adults).toBe(4);
    expect(result.childAges).toEqual([3, 10]);
  });
});

// ---------------------------------------------------------------------------
// Boundary values
// ---------------------------------------------------------------------------

describe("parseSearchParams — boundary values", () => {
  it("accepts checkIn exactly today", () => {
    const today = getDefaultCheckIn();
    const result = parseSearchParams(make({ checkIn: today, checkOut: futureDateIso(1) }));
    expect(result.checkIn).toBe(today);
  });

  it("accepts checkOut exactly 1 day after checkIn", () => {
    const checkIn = futureDateIso(1);
    const checkOut = futureDateIso(2);
    const result = parseSearchParams(make({ checkIn, checkOut }));
    expect(result.checkOut).toBe(checkOut);
  });

  it("accepts childAges = [0] (newborn)", () => {
    const result = parseSearchParams(make({ childAges: "0" }));
    expect(result.childAges).toEqual([0]);
  });

  it("accepts childAges = [17] (max age)", () => {
    const result = parseSearchParams(make({ childAges: "17" }));
    expect(result.childAges).toEqual([17]);
  });

  it("accepts rooms = 1 (minimum)", () => {
    const result = parseSearchParams(make({ rooms: "1" }));
    expect(result.rooms).toBe(1);
  });

  it("accepts adults = 1 (minimum)", () => {
    const result = parseSearchParams(make({ adults: "1" }));
    expect(result.adults).toBe(1);
  });

  it("rejects rooms = 0 (below minimum)", () => {
    const result = parseSearchParams(make({ rooms: "0" }));
    expect(result.rooms).toBe(getDefaultValues().rooms);
  });

  it("rejects adults = 0 (below minimum)", () => {
    const result = parseSearchParams(make({ adults: "0" }));
    expect(result.adults).toBe(getDefaultValues().adults);
  });

  it("rejects childAge = 18 (above maximum)", () => {
    const result = parseSearchParams(make({ childAges: "18" }));
    expect(result.childAges).toEqual(getDefaultValues().childAges);
  });
});

// ---------------------------------------------------------------------------
// XSS / injection attempts
// ---------------------------------------------------------------------------

describe("parseSearchParams — malicious input is safely rejected", () => {
  it("rejects script tag in checkIn", () => {
    const result = parseSearchParams(make({ checkIn: "<script>alert(1)</script>" }));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("rejects script tag in checkOut", () => {
    const checkIn = futureDateIso(1);
    const result = parseSearchParams(make({ checkIn, checkOut: "<script>alert(1)</script>" }));
    expect(result.checkOut).toBe(futureDateIso(2));
  });

  it("rejects URL-encoded injection in rooms", () => {
    const result = parseSearchParams(make({ rooms: "%3Cscript%3E" }));
    expect(result.rooms).toBe(getDefaultValues().rooms);
  });

  it("rejects null bytes in checkIn", () => {
    const result = parseSearchParams(make({ checkIn: "\x00" }));
    expect(result.checkIn).toBe(getDefaultCheckIn());
  });

  it("rejects extremely long strings in adults", () => {
    const result = parseSearchParams(make({ adults: "a".repeat(10000) }));
    expect(result.adults).toBe(getDefaultValues().adults);
  });
});
