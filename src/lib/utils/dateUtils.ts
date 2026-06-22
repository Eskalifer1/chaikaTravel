/**
 * Formats an ISO YYYY-MM-DD string for display in the date picker trigger,
 * e.g. "Wed, Jun 22"
 */
export function formatDisplayDate(iso: string): string {
  const d = isoToLocalDate(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/** Returns today's date as an ISO YYYY-MM-DD string in local time */
export function todayIso(): string {
  const d = new Date();
  return toIsoLocal(d);
}

/** Converts a Date to an ISO YYYY-MM-DD string using local time (avoids UTC shift) */
export function toIsoLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parses an ISO YYYY-MM-DD string as a local-time Date (avoids UTC shift) */
export function isoToLocalDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

/** Returns the ISO date string for `n` days after the given ISO date */
export function addDays(isoDate: string, days: number): string {
  const d = isoToLocalDate(isoDate);
  d.setDate(d.getDate() + days);
  return toIsoLocal(d);
}

/** Returns the ISO date string for `n` months after the given ISO date */
export function addMonths(isoDate: string, months: number): string {
  const d = isoToLocalDate(isoDate);
  d.setMonth(d.getMonth() + months);
  return toIsoLocal(d);
}

/** Returns the ISO date string for `n` years after the given ISO date */
export function addYears(isoDate: string, years: number): string {
  const d = isoToLocalDate(isoDate);
  d.setFullYear(d.getFullYear() + years);
  return toIsoLocal(d);
}
