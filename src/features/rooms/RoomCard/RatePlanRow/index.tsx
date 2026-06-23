import type { RatePlan } from "@/types";

import { formatPrice } from "@/lib/utils/formatPrice";

import RatePlanCancellation from "./RatePlanCancellation";
import RatePlanMeal from "./RatePlanMeal";
import RatePlanPrice from "./RatePlanPrice";

interface RatePlanRowProps {
  /** Rate plan data to display */
  plan: RatePlan;

  /** Number of nights — multiplied by the per-night price to get the total */
  nights: number;

  /** Number of rooms booked — multiplied into the total price */
  roomCount: number;

  /** Pre-built checkout URL for the reserve link */
  checkoutUrl: string;
}

export default function RatePlanRow({ plan, nights, roomCount, checkoutUrl }: RatePlanRowProps) {
  return (
    <div className="flex flex-col gap-3 rounded-radius-md border border-border bg-surface-raised p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5 text-sm">
        <RatePlanCancellation cancellation={plan.cancellation} />
        <RatePlanMeal meal={plan.meal} />
      </div>

      <div className="flex items-center justify-center gap-4 sm:flex-col sm:items-end sm:justify-normal flex-wrap">
        <RatePlanPrice plan={plan} nights={nights} roomCount={roomCount} />

        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-radius-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`Reserve this room for ${formatPrice(plan.price * nights * roomCount, plan.currency)}${plan.meal ? `, ${plan.meal.label}` : ""}, opens in new tab`}
        >
          Reserve
        </a>
      </div>
    </div>
  );
}
