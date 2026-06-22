/**
 * Returns the singular or plural form of a word based on the given count.
 *
 * @param count - The number that determines which form to use
 * @param singular - The singular form of the word
 * @param plural - The plural form of the word
 * @returns The appropriate form for the given count
 *
 * @example
 * pluralize(1, "guest", "guests") // "guest"
 * pluralize(3, "guest", "guests") // "guests"
 */
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}
