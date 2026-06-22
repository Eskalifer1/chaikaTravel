import { ROOM_BADGES, type RoomBadge } from "@/types";

/** Human-readable label for each room badge variant */
export const BADGE_LABELS: Record<RoomBadge, string> = {
  [ROOM_BADGES.frequentlyBooked]: "Frequently Booked",
  [ROOM_BADGES.upgrade]: "Upgrade",
  [ROOM_BADGES.bestValue]: "Best Value",
  [ROOM_BADGES.lowestPrice]: "Lowest Price",
};
