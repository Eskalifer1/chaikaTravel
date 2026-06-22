import type { DiscountedRatePlan } from "@/types";

/**
 * Calculates the discount percentage for a discounted rate plan.
 *
 * @param plan - A rate plan that has an originalPrice
 * @returns Rounded percentage, e.g. 25 for a 25% discount
 */
export function getDiscountPercent(plan: DiscountedRatePlan): number {
  return Math.round((1 - plan.price / plan.originalPrice) * 100);
}
