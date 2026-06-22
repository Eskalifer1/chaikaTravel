import { type Ref } from "react";

import { formatDisplayDate } from "@/lib/utils";

interface DateRangePickerTriggerProps {
  /** Ref forwarded to the button, used for outside-click detection and anchor positioning */
  ref: Ref<HTMLButtonElement>;

  /** ISO date string for the check-in date */
  checkIn: string;

  /** ISO date string for the check-out date */
  checkOut: string;

  /** Whether the calendar dialog is currently open */
  open: boolean;

  /** Validation error message for check-in, if any */
  checkInError: string | undefined;

  /** Validation error message for check-out, if any */
  checkOutError: string | undefined;

  /** Called when the button is clicked */
  onClick: () => void;
}

export default function DateRangePickerTrigger({
  ref,
  checkIn,
  checkOut,
  open,
  checkInError,
  checkOutError,
  onClick,
}: DateRangePickerTriggerProps) {
  const hasError = Boolean(checkInError ?? checkOutError);

  return (
    <div>
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Dates: ${formatDisplayDate(checkIn)} – ${formatDisplayDate(checkOut)}`}
        className={[
          "flex min-w-50 flex-col gap-0.5 rounded-radius-md border px-3 py-2 text-left transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          hasError ? "border-destructive" : "border-border hover:border-border-strong",
        ].join(" ")}
      >
        <span className="text-xs font-medium text-text-secondary">Dates</span>
        <span className="text-sm text-text-primary">
          {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
        </span>
      </button>

      {hasError && (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {checkInError ?? checkOutError}
        </p>
      )}
    </div>
  );
}
