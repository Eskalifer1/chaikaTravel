/**
 * Returns the number of nights between two ISO date strings.
 * Falls back to 1 if the result would be zero or negative.
 */
export function computeNights(checkIn: string, checkOut: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.round(
    (new Date(checkOut + "T00:00:00").getTime() - new Date(checkIn + "T00:00:00").getTime()) /
      msPerDay,
  );
  return diff > 0 ? diff : 1;
}
