"use client";

import { formatPrice } from "@/lib/utils/formatPrice";
import type { RatePlan } from "@/types";

import RatePlanRow from "../RatePlanRow";

interface RoomCardRatePlansProps {
  /** Rate plans to display */
  ratePlans: RatePlan[];
}

export default function RoomCardRatePlans({ ratePlans }: RoomCardRatePlansProps) {
  const lowestPrice = Math.min(...ratePlans.map((p) => p.price));
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
            <RatePlanRow plan={plan} />
          </li>
        ))}
      </ul>
    </section>
  );
}
