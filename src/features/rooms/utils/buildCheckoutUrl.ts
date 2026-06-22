import type { RatePlan } from "@/types";
import { ROUTES } from "@/constants/routes";
import { ROOM_QUERY_PARAM } from "@/constants/search";

/**
 * Builds the checkout page URL for a given rate plan, preserving availability
 * search parameters (dates, guests) but stripping the free-text query filter.
 *
 * @param plan - The rate plan being reserved
 * @param currentSearch - The current URL search params to carry over
 * @returns Full relative URL for the checkout page
 */
export function buildCheckoutUrl(plan: RatePlan, currentSearch: URLSearchParams): string {
  const params = new URLSearchParams(currentSearch);
  params.delete(ROOM_QUERY_PARAM);
  params.set("roomId", plan.roomId);
  params.set("ratePlanId", plan.id);
  return `${ROUTES.checkout}?${params.toString()}`;
}
