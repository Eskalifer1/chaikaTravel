import type { Room } from "@/types";

/** Returns the lowest price across all rate plans for a room */
function getMinPrice(room: Room): number {
  return Math.min(...room.ratePlans.map((rp) => rp.price));
}

/**
 * Filters rooms by a free-text query.
 *
 * Matches against: room name, description, amenity labels, meal plan labels,
 * and minimum rate plan price (numeric match).
 */
export function filterRooms(rooms: Room[], query: string): Room[] {
  const trimmed = query.trim();

  if (trimmed === "") {
    return rooms;
  }

  const lower = trimmed.toLowerCase();
  const asNumber = Number(trimmed);
  const isNumeric = !Number.isNaN(asNumber) && trimmed !== "";

  return rooms.filter((room) => {
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
