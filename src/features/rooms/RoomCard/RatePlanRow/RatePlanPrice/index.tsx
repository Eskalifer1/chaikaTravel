import { type DiscountedRatePlan, type RatePlan } from "@/types";

import { formatPrice } from "@/lib/utils/formatPrice";

import { getDiscountPercent } from "../../../utils/getDiscountPercent";

interface RatePlanPriceProps {
  /** Rate plan whose price info to display */
  plan: RatePlan;
}

function isDiscounted(plan: RatePlan): plan is DiscountedRatePlan {
  return plan.originalPrice !== undefined && plan.originalPrice > plan.price;
}

export default function RatePlanPrice({ plan }: RatePlanPriceProps) {
  const discounted = isDiscounted(plan);
  const discountPct = discounted ? getDiscountPercent(plan) : 0;

  return (
    <div className="flex items-baseline gap-2">
      {discounted && (
        <span className="rounded-radius-sm bg-discount px-1.5 py-0.5 text-xs font-semibold text-discount-foreground">
          -{discountPct}%
        </span>
      )}
      <div className="flex flex-col items-end">
        {discounted && (
          <span className="text-xs text-text-secondary line-through" aria-hidden="true">
            {formatPrice(plan.originalPrice, plan.currency)}
          </span>
        )}
        <span
          className="text-lg font-bold text-text-primary"
          aria-label={`${formatPrice(plan.price, plan.currency)}${discounted ? `, was ${formatPrice(plan.originalPrice, plan.currency)}` : ""} per stay`}
        >
          {formatPrice(plan.price, plan.currency)}
        </span>
      </div>
    </div>
  );
}
