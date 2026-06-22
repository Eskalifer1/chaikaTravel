import { CANCELLATION_TYPES, type CancellationPolicy } from "@/types";

import { formatDeadlineDate } from "@/lib/utils/formatDeadlineDate";

import Icon from "@/components/Icon";
import CheckIcon from "@/components/Icons/CheckIcon";
import XIcon from "@/components/Icons/XIcon";

interface RatePlanCancellationProps {
  /** Cancellation policy to display */
  cancellation: CancellationPolicy;
}

export default function RatePlanCancellation({ cancellation }: RatePlanCancellationProps) {
  if (cancellation.type === CANCELLATION_TYPES.freeCancellation) {
    return (
      <p className="flex items-center gap-1.5 text-success">
        <Icon svg={CheckIcon} className="h-3.5 w-3.5 shrink-0" />
        <span>
          Free cancellation
          <span className="text-text-secondary">
            {" "}
            until {formatDeadlineDate(cancellation.deadline)}
          </span>
        </span>
      </p>
    );
  }

  return (
    <p className="flex items-center gap-1.5 text-destructive">
      <Icon svg={XIcon} className="h-3.5 w-3.5 shrink-0" />
      <span>Non-refundable</span>
    </p>
  );
}
