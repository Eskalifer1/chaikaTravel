export interface SearchParams {
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  childAges: number[];
}

export type CancellationPolicy =
  | { type: "non-refundable" }
  | { type: "free-cancellation"; deadline: string };

export interface MealPlan {
  type: "breakfast" | "half-board" | "full-board" | "all-inclusive";
  label: string;
}

export interface RatePlan {
  id: string;
  roomId: string;
  price: number;
  currency: string;
  cancellation: CancellationPolicy;
  meal?: MealPlan;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  images: string[];
  maxOccupancy: number;
  ratePlans: RatePlan[];
}

export interface CheckoutParams extends SearchParams {
  roomId: string;
  ratePlanId: string;
}
