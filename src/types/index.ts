export type AmenityKey =
  | "wifi"
  | "air-conditioning"
  | "tv"
  | "mini-bar"
  | "parking"
  | "pool"
  | "gym"
  | "breakfast";

export interface Amenity {
  /** Stable key used to resolve the icon component */
  key: AmenityKey;

  /** Human-readable label shown next to the icon */
  label: string;
}

export type RoomBadge =
  | "frequently-booked"
  | "upgrade"
  | "best-value"
  | "lowest-price";

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

export type CancellationPolicy =
  | { type: "non-refundable" }
  | {
      type: "free-cancellation";
      /** ISO date string — last day free cancellation is allowed */
      deadline: string;
    };

export interface MealPlan {
  /** Meal plan category */
  type: "breakfast" | "half-board" | "full-board" | "all-inclusive";

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
