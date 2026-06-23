import { isoToLocalDate } from "./dateUtils";

/** Formats an ISO date string as a short month + day label (e.g. "Sep 13") */
export function formatDeadlineDate(isoDate: string): string {
  return isoToLocalDate(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
