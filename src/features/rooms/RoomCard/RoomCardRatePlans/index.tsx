"use client";

import type { RatePlan } from "@/types";

import { formatPrice } from "@/lib/utils/formatPrice";

import RatePlanRow from "../RatePlanRow";

interface RoomCardRatePlansProps {
  /** Rate plans to display */
  ratePlans: RatePlan[];

  /** Number of nights — multiplied by the per-night price to get the total */
  nights: number;

  /** Number of rooms booked — multiplied into the total price */
  roomCount: number;
}

export default function RoomCardRatePlans({
  ratePlans,
  nights,
  roomCount,
}: RoomCardRatePlansProps) {
  const lowestPrice = Math.min(...ratePlans.map((p) => p.price)) * nights * roomCount;
  const currency = ratePlans[0]?.currency ?? "USD";

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
            <RatePlanRow plan={plan} nights={nights} roomCount={roomCount} />
          </li>
        ))}
      </ul>
    </section>
  );
}
