import { pluralize } from "@/lib/utils/pluralize";

import Icon from "@/components/Icon";
import AreaIcon from "@/components/Icons/AreaIcon";
import UsersIcon from "@/components/Icons/UsersIcon";

import {
  getAvailabilityAriaLabel,
  getAvailabilityLabel,
  isLowAvailability,
} from "../../utils/getAvailabilityLabel";

interface RoomCardMetaProps {
  /** Room size in square metres */
  areaSqm: number;

  /** Maximum number of guests */
  maxOccupancy: number;

  /** Number of rooms still available; omitted when unknown */
  availableCount?: number;
}

export default function RoomCardMeta({ areaSqm, maxOccupancy, availableCount }: RoomCardMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
      <span className="flex items-center gap-1">
        <Icon svg={AreaIcon} className="h-4 w-4 shrink-0" />
        <span>
          {areaSqm} m<sup>2</sup>
        </span>
      </span>

      <span className="flex items-center gap-1">
        <Icon svg={UsersIcon} className="h-4 w-4 shrink-0" />
        <span>
          Up to <strong className="font-medium text-text-primary">{maxOccupancy}</strong>{" "}
          {pluralize(maxOccupancy, "guest", "guests")}
        </span>
      </span>

      {availableCount !== undefined && (
        <span
          className={
            isLowAvailability(availableCount) ? "font-semibold text-destructive" : "text-success"
          }
          aria-label={getAvailabilityAriaLabel(availableCount)}
        >
          {getAvailabilityLabel(availableCount)}
        </span>
      )}
    </div>
  );
}
