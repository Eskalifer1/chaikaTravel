"use client";

import { useSearchParams } from "next/navigation";

import Icon from "@/components/Icon";
import CheckIcon from "@/components/Icons/CheckIcon";
import MealIcon from "@/components/Icons/MealIcon";
import XIcon from "@/components/Icons/XIcon";
import { ROUTES } from "@/constants/routes";
import { formatDeadlineDate } from "@/lib/utils/formatDeadlineDate";
import { formatPrice } from "@/lib/utils/formatPrice";
import { CANCELLATION_TYPES, type RatePlan } from "@/types";

interface RatePlanRowProps {
  /** Rate plan data to display */
  plan: RatePlan;
}

function buildCheckoutUrl(plan: RatePlan, currentSearch: URLSearchParams): string {
  const params = new URLSearchParams(currentSearch);
  params.set("roomId", plan.roomId);
  params.set("ratePlanId", plan.id);
  return `${ROUTES.checkout}?${params.toString()}`;
}

export default function RatePlanRow({ plan }: RatePlanRowProps) {
  const searchParams = useSearchParams();
  const checkoutUrl = buildCheckoutUrl(plan, searchParams);

  const hasDiscount = plan.originalPrice !== undefined && plan.originalPrice > plan.price;
  const discountPct = hasDiscount ? Math.round((1 - plan.price / plan.originalPrice!) * 100) : 0;

  const cancellation = plan.cancellation;
  const isFree = cancellation.type === CANCELLATION_TYPES.freeCancellation;

  return (
    <div className="flex flex-col gap-3 rounded-radius-md border border-border bg-surface-raised p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5 text-sm">
        {isFree ? (
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
        ) : (
          <p className="flex items-center gap-1.5 text-destructive">
            <Icon svg={XIcon} className="h-3.5 w-3.5 shrink-0" />
            <span>Non-refundable</span>
          </p>
        )}

        {plan.meal ? (
          <p className="flex items-center gap-1.5 text-text-secondary">
            <Icon svg={MealIcon} className="h-3.5 w-3.5 shrink-0" />
            <span>{plan.meal.label}</span>
          </p>
        ) : (
          <p className="text-text-secondary">Room only</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-normal">
        <div className="flex items-baseline gap-2">
          {hasDiscount && (
            <span className="rounded-radius-sm bg-discount px-1.5 py-0.5 text-xs font-semibold text-discount-foreground">
              -{discountPct}%
            </span>
          )}
          <div className="flex flex-col items-end">
            {hasDiscount && (
              <span className="text-xs text-text-secondary line-through" aria-hidden="true">
                {formatPrice(plan.originalPrice!, plan.currency)}
              </span>
            )}
            <span
              className="text-lg font-bold text-text-primary"
              aria-label={`${formatPrice(plan.price, plan.currency)}${hasDiscount ? `, was ${formatPrice(plan.originalPrice!, plan.currency)}` : ""} per stay`}
            >
              {formatPrice(plan.price, plan.currency)}
            </span>
          </div>
        </div>

        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-radius-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`Reserve this room for ${formatPrice(plan.price, plan.currency)}${plan.meal ? `, ${plan.meal.label}` : ""}, opens in new tab`}
        >
          Reserve
        </a>
      </div>
    </div>
  );
}
