/** Resolved value of Next.js App Router raw URL search params */
export type ResolvedSearchParams = Record<string, string | string[] | undefined>;

/** Shape of raw URL search params as provided by Next.js App Router */
export type NextSearchParams = Promise<ResolvedSearchParams>;

export const AMENITY_KEYS = {
  wifi: "wifi",
  tv: "tv",
  airConditioning: "air-conditioning",
  miniBar: "mini-bar",
  parking: "parking",
  pool: "pool",
  gym: "gym",
  breakfast: "breakfast",
} as const;

/** Stable string key used to resolve the amenity icon component */
export type AmenityKey = (typeof AMENITY_KEYS)[keyof typeof AMENITY_KEYS];

export interface Amenity {
  /** Stable key used to resolve the icon component */
  key: AmenityKey;

  /** Human-readable label shown next to the icon */
  label: string;
}

export const ROOM_BADGES = {
  frequentlyBooked: "frequently-booked",
  upgrade: "upgrade",
  bestValue: "best-value",
  lowestPrice: "lowest-price",
} as const;

/** Promotional badge key shown on the room card */
export type RoomBadge = (typeof ROOM_BADGES)[keyof typeof ROOM_BADGES];

export interface RoomSearchParams {
  /** Check-in date in ISO format (YYYY-MM-DD) */
  checkIn: string;

  /** Check-out date in ISO format (YYYY-MM-DD) */
  checkOut: string;

  /** Number of rooms requested */
  rooms: number;

  /** Number of adults */
  adults: number;

  /** Ages of children; each value must be 0–17 */
  childAges: number[];
}

export const CANCELLATION_TYPES = {
  nonRefundable: "non-refundable",
  freeCancellation: "free-cancellation",
} as const;

/** Cancellation policy type key */
export type CancellationPolicyType = (typeof CANCELLATION_TYPES)[keyof typeof CANCELLATION_TYPES];

export type CancellationPolicy =
  | { type: typeof CANCELLATION_TYPES.nonRefundable }
  | {
      type: typeof CANCELLATION_TYPES.freeCancellation;
      /** ISO date string — last day free cancellation is allowed */
      deadline: string;
    };

export const MEAL_PLAN_TYPES = {
  breakfast: "breakfast",
  halfBoard: "half-board",
  fullBoard: "full-board",
  allInclusive: "all-inclusive",
} as const;

/** Meal plan type key */
export type MealPlanType = (typeof MEAL_PLAN_TYPES)[keyof typeof MEAL_PLAN_TYPES];

export interface MealPlan {
  /** Meal plan category */
  type: MealPlanType;

  /** Human-readable label shown in the UI */
  label: string;
}

export interface RatePlan {
  /** Unique rate plan identifier */
  id: string;

  /** ID of the room this rate plan belongs to */
  roomId: string;

  /** Total price for the entire stay */
  price: number;

  /** Original price before discount; omitted when no discount applies */
  originalPrice?: number;

  /** ISO 4217 currency code (e.g. "USD") */
  currency: string;

  /** Cancellation terms for this rate */
  cancellation: CancellationPolicy;

  /** Included meal plan; omitted when room-only */
  meal?: MealPlan;
}

export interface Room {
  /** Unique room identifier */
  id: string;

  /** Display name of the room type */
  name: string;

  /** Short marketing description shown on the room card */
  description: string;

  /** Amenities available in this room */
  amenities: Amenity[];

  /** Ordered list of image URLs for the room gallery */
  images: string[];

  /** Maximum number of guests allowed in this room */
  maxOccupancy: number;

  /** Room size in square metres */
  areaSqm: number;

  /** Available rate plans for this room */
  ratePlans: RatePlan[];

  /** Promotional badge shown on the room card; omitted when none */
  badge?: RoomBadge;

  /** Number of rooms of this type still available; omitted when unknown */
  availableCount?: number;
}

export interface CheckoutParams extends RoomSearchParams {
  /** ID of the selected room */
  roomId: string;

  /** ID of the selected rate plan */
  ratePlanId: string;
}
