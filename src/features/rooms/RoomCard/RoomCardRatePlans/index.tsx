import type { RatePlan, RoomSearchParams } from "@/types";

import { formatPrice } from "@/lib/utils/formatPrice";

import { buildCheckoutUrl } from "../../utils/buildCheckoutUrl";
import RatePlanRow from "../RatePlanRow";

interface RoomCardRatePlansProps {
  /** Rate plans to display */
  ratePlans: RatePlan[];

  /** Number of nights — multiplied by the per-night price to get the total */
  nights: number;

  /** Number of rooms booked — multiplied into the total price */
  roomCount: number;

  /** Validated availability search params used to build the checkout URL */
  searchParams: RoomSearchParams;
}

export default function RoomCardRatePlans({
  ratePlans,
  nights,
  roomCount,
  searchParams,
}: RoomCardRatePlansProps) {
  if (ratePlans.length === 0) {
    return null;
  }

  const cheapest = ratePlans.reduce((min, p) => (p.price < min.price ? p : min));
  const lowestPrice = cheapest.price * nights * roomCount;
  const currency = cheapest.currency;

  return (
    <section aria-label="Rate plans">
      {ratePlans.length > 1 && (
        <p className="mb-2 text-xs text-text-secondary">
          From <strong className="text-text-primary">{formatPrice(lowestPrice, currency)}</strong> ·{" "}
          {ratePlans.length} options available
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {ratePlans.map((plan) => (
          <li key={plan.id}>
            <RatePlanRow
              plan={plan}
              nights={nights}
              roomCount={roomCount}
              checkoutUrl={buildCheckoutUrl(plan, searchParams)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
