import type { Room, RoomSearchParams } from "@/types";

/** Returns the lowest price across all rate plans for a room, or 0 if none exist */
function getMinPrice(room: Room): number {
  return room.ratePlans.reduce((min, rp) => Math.min(min, rp.price), Infinity);
}

/**
 * Returns true when the room can accommodate the requested guests.
 * Each room unit fits `adults + children` guests — `maxOccupancy` is per unit.
 */
function matchesOccupancy(room: Room, adults: number, childAges: number[]): boolean {
  return adults + childAges.length <= room.maxOccupancy;
}

/**
 * Returns true when enough units of this room type are available.
 * `availableCount === undefined` means availability is unknown — always show.
 */
function matchesAvailability(room: Room, rooms: number): boolean {
  return room.availableCount === undefined || room.availableCount >= rooms;
}

interface FilterRoomsOptions {
  /** Free-text search query */
  query: string;

  /** Availability search params used for occupancy and room count filtering */
  searchParams: RoomSearchParams;
}

/**
 * Filters rooms by availability search params and an optional free-text query.
 *
 * Hard filters (always applied):
 * - `adults + childAges.length ≤ room.maxOccupancy`
 * - `room.availableCount ≥ rooms` (undefined availableCount passes through)
 *
 * Soft filter (applied only when query is non-empty):
 * - Matches room name, description, amenity labels, meal plan labels, or min price.
 */
export function filterRooms(rooms: Room[], { query, searchParams }: FilterRoomsOptions): Room[] {
  const { adults, childAges, rooms: roomCount } = searchParams;

  const hardFiltered = rooms.filter(
    (room) => matchesOccupancy(room, adults, childAges) && matchesAvailability(room, roomCount),
  );

  const trimmed = query.trim();
  if (trimmed === "") {
    return hardFiltered;
  }

  const lower = trimmed.toLowerCase();
  const asNumber = Number(trimmed);
  const isNumeric = !Number.isNaN(asNumber) && trimmed !== "";

  return hardFiltered.filter((room) => {
    if (room.name.toLowerCase().includes(lower)) {
      return true;
    }

    if (room.description.toLowerCase().includes(lower)) {
      return true;
    }

    if (room.amenities.some((a) => a.label.toLowerCase().includes(lower))) {
      return true;
    }

    if (room.ratePlans.some((rp) => rp.meal && rp.meal.label.toLowerCase().includes(lower))) {
      return true;
    }

    if (isNumeric && getMinPrice(room) <= asNumber) {
      return true;
    }

    return false;
  });
}
