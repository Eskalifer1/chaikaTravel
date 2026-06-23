import type { RatePlan, RoomSearchParams } from "@/types";
import { ROUTES } from "@/constants/routes";
import {
  ADULTS_PARAM,
  CHECK_IN_PARAM,
  CHECK_OUT_PARAM,
  CHILD_AGES_PARAM,
  ROOMS_PARAM,
} from "@/constants/search";

/**
 * Builds the checkout page URL for a given rate plan from validated search params.
 * Uses the already-validated RoomSearchParams rather than raw URL params to avoid
 * carrying over invalid/malformed values that may have been in the URL.
 *
 * @param plan - The rate plan being reserved
 * @param searchParams - Validated availability search params
 * @returns Full relative URL for the checkout page
 */
export function buildCheckoutUrl(plan: RatePlan, searchParams: RoomSearchParams): string {
  const params = new URLSearchParams();
  params.set(CHECK_IN_PARAM, searchParams.checkIn);
  params.set(CHECK_OUT_PARAM, searchParams.checkOut);
  params.set(ROOMS_PARAM, String(searchParams.rooms));
  params.set(ADULTS_PARAM, String(searchParams.adults));
  if (searchParams.childAges.length > 0) {
    params.set(CHILD_AGES_PARAM, searchParams.childAges.join(","));
  }
  params.set("roomId", plan.roomId);
  params.set("ratePlanId", plan.id);
  return `${ROUTES.checkout}?${params.toString()}`;
}
