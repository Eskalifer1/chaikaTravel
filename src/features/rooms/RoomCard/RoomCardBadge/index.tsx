import type { RoomBadge } from "@/types";
import { BADGE_LABELS } from "@/constants/badgeLabels";

interface RoomCardBadgeProps {
  /** Badge variant to display */
  badge: RoomBadge;
}

export default function RoomCardBadge({ badge }: RoomCardBadgeProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-3 top-3 z-10 rounded-radius-sm bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground"
    >
      {BADGE_LABELS[badge]}
    </div>
  );
}
