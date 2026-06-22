import { type DiscountedRatePlan, type RatePlan } from "@/types";

import { formatPrice } from "@/lib/utils/formatPrice";

import { getDiscountPercent } from "../../../utils/getDiscountPercent";

interface RatePlanPriceProps {
  /** Rate plan whose price info to display */
  plan: RatePlan;

  /** Number of nights — multiplied by the per-night price to get the total */
  nights: number;

  /** Number of rooms booked — multiplied into the total price */
  roomCount: number;
}

function isDiscounted(plan: RatePlan): plan is DiscountedRatePlan {
  // !== undefined because originalPrice: 0 is technically valid — use explicit presence check
  return plan.originalPrice !== undefined && plan.originalPrice > plan.price;
}

export default function RatePlanPrice({ plan, nights, roomCount }: RatePlanPriceProps) {
  const discounted = isDiscounted(plan);
  const discountPct = discounted ? getDiscountPercent(plan) : 0;
  const total = plan.price * nights * roomCount;
  const originalTotal = discounted ? plan.originalPrice * nights * roomCount : undefined;

  return (
    <div className="flex items-baseline gap-2">
      {discounted && (
        <span className="rounded-radius-sm bg-discount px-1.5 py-0.5 text-xs font-semibold text-discount-foreground">
          -{discountPct}%
        </span>
      )}
      <div className="flex flex-col items-end">
        {/* !== undefined because originalTotal of 0 would still be a valid price to cross out */}
        {originalTotal !== undefined && (
          <span className="text-xs text-text-secondary line-through" aria-hidden="true">
            {formatPrice(originalTotal, plan.currency)}
          </span>
        )}
        <span
          className="text-lg font-bold text-text-primary"
          aria-label={`${formatPrice(total, plan.currency)}${originalTotal !== undefined ? `, was ${formatPrice(originalTotal, plan.currency)}` : ""} total`} // !== undefined mirrors the rendering check above
        >
          {formatPrice(total, plan.currency)}
        </span>
        <span className="text-xs text-text-secondary">
          {formatPrice(plan.price, plan.currency)} / night
        </span>
      </div>
    </div>
  );
}
