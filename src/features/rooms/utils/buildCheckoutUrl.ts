import { ROUTES } from "@/constants/routes";
import type { RatePlan } from "@/types";

/**
 * Builds the checkout page URL for a given rate plan, preserving existing
 * search parameters (dates, guests) from the current URL.
 *
 * @param plan - The rate plan being reserved
 * @param currentSearch - The current URL search params to carry over
 * @returns Full relative URL for the checkout page
 */
export function buildCheckoutUrl(plan: RatePlan, currentSearch: URLSearchParams): string {
  const params = new URLSearchParams(currentSearch);
  params.set("roomId", plan.roomId);
  params.set("ratePlanId", plan.id);
  return `${ROUTES.checkout}?${params.toString()}`;
}
