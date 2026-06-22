import { pluralize } from "@/lib/utils/pluralize";

const LOW_AVAILABILITY_THRESHOLD = 2;

/**
 * Returns the visible availability text shown on the room card.
 *
 * @param count - Number of rooms available
 * @returns A short label such as "Only 1 left!" or "5 available"
 */
export function getAvailabilityLabel(count: number): string {
  if (count <= LOW_AVAILABILITY_THRESHOLD) {
    return `Only ${count} left!`;
  }
  return `${count} available`;
}

/**
 * Returns the accessible aria-label for the availability indicator.
 *
 * @param count - Number of rooms available
 * @returns A descriptive string for screen readers
 */
export function getAvailabilityAriaLabel(count: number): string {
  if (count <= LOW_AVAILABILITY_THRESHOLD) {
    return `Only ${count} ${pluralize(count, "room", "rooms")} left`;
  }
  return `${count} rooms available`;
}

/**
 * Returns whether the availability count is considered low (urgent).
 *
 * @param count - Number of rooms available
 */
export function isLowAvailability(count: number): boolean {
  return count <= LOW_AVAILABILITY_THRESHOLD;
}
