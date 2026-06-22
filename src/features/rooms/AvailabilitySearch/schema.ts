import { z } from "zod";

import type { RoomSearchParams } from "@/types";

import { addDays, addMonths, addYears, todayIso } from "@/lib/utils";

export function getDefaultCheckIn(): string {
  return todayIso();
}

export function getDefaultCheckOut(): string {
  return addDays(todayIso(), 1);
}

export const availabilitySearchSchema = z
  .object({
    /** Check-in date, ISO YYYY-MM-DD */
    checkIn: z.string().refine((v) => {
      const today = todayIso();
      const maxDate = addYears(today, 1);
      return v >= today && v <= maxDate;
    }, "Check-in must be today or within 1 year"),

    /** Check-out date, ISO YYYY-MM-DD */
    checkOut: z.string(),

    /** Number of rooms, minimum 1 */
    rooms: z.number().int().min(1, "At least 1 room required"),

    /** Number of adults, minimum 1 */
    adults: z.number().int().min(1, "At least 1 adult required"),

    /** Ages of children, each 0–17 */
    childAges: z.array(z.number().int().min(0).max(17, "Child age must be 0–17")),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  })
  .refine((data) => data.checkOut <= addMonths(data.checkIn, 1), {
    message: "Stay cannot exceed 1 month",
    path: ["checkOut"],
  });

export type AvailabilitySearchFormValues = z.infer<typeof availabilitySearchSchema>;

export function getDefaultValues(): AvailabilitySearchFormValues {
  return {
    checkIn: getDefaultCheckIn(),
    checkOut: getDefaultCheckOut(),
    rooms: 1,
    adults: 2,
    childAges: [],
  };
}

const checkInFieldSchema = availabilitySearchSchema.shape.checkIn;

const checkOutFieldSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const roomsFieldSchema = availabilitySearchSchema.shape.rooms;

const adultsFieldSchema = availabilitySearchSchema.shape.adults;

const childAgesFieldSchema = availabilitySearchSchema.shape.childAges;

/**
 * Parses raw URL search params into RoomSearchParams.
 * Each field is validated independently — an invalid field falls back to its
 * default without affecting the others.
 * Cross-field rule: if checkOut ≤ checkIn or exceeds checkIn + 1 month after
 * individual validation, checkOut resets to checkIn + 1 day.
 */
export function parseSearchParams(raw: URLSearchParams): RoomSearchParams {
  const defaults = getDefaultValues();

  const rawCheckIn = raw.get("checkIn") ?? "";
  const checkIn = checkInFieldSchema.safeParse(rawCheckIn).success ? rawCheckIn : defaults.checkIn;

  const rawCheckOut = raw.get("checkOut") ?? "";
  const checkOutCandidate = checkOutFieldSchema.safeParse(rawCheckOut).success
    ? rawCheckOut
    : defaults.checkOut;
  const checkOut =
    checkOutCandidate > checkIn && checkOutCandidate <= addMonths(checkIn, 1)
      ? checkOutCandidate
      : addDays(checkIn, 1);

  const roomsRaw = parseInt(raw.get("rooms") ?? "", 10);
  const rooms = roomsFieldSchema.safeParse(roomsRaw).success ? roomsRaw : defaults.rooms;

  const adultsRaw = parseInt(raw.get("adults") ?? "", 10);
  const adults = adultsFieldSchema.safeParse(adultsRaw).success ? adultsRaw : defaults.adults;

  const childAgesRaw = raw.get("childAges");
  const childAgesParsed = childAgesRaw
    ? childAgesRaw
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n))
    : [];
  const childAges = childAgesFieldSchema.safeParse(childAgesParsed).success
    ? childAgesParsed
    : defaults.childAges;

  return { checkIn, checkOut, rooms, adults, childAges };
}
