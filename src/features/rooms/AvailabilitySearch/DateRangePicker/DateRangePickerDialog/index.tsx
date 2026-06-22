"use client";

import { type Ref } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

import Portal from "@/components/Portal";

interface DateRangePickerDialogProps {
  /** Ref forwarded to the dialog root div, used for outside-click detection */
  ref: Ref<HTMLDivElement>;

  /** Currently highlighted date range shown in the calendar */
  displayRange: DateRange;

  /** Earliest selectable date */
  minDate: Date;

  /** Latest selectable date */
  maxDate: Date;

  /** Called when the user clicks any enabled day */
  onDayClick: (day: Date) => void;

  /** Bounding rect of the trigger button, used to position the dialog */
  anchorRect: DOMRect;
}

export default function DateRangePickerDialog({
  ref,
  displayRange,
  minDate,
  maxDate,
  onDayClick,
  anchorRect,
}: DateRangePickerDialogProps) {
  const style: React.CSSProperties = {
    position: "fixed",
    top: anchorRect.bottom + 8,
    left: anchorRect.left,
    zIndex: 9999,
  };

  return (
    <Portal>
      <div
        ref={ref}
        role="dialog"
        aria-label="Select dates"
        style={style}
        className="rounded-radius-lg border border-border bg-surface p-3 shadow-lg"
      >
        <DayPicker
          mode="range"
          selected={displayRange}
          onSelect={() => {}}
          onDayClick={onDayClick}
          disabled={{ before: minDate, after: maxDate }}
          numberOfMonths={2}
          showOutsideDays={false}
        />
      </div>
    </Portal>
  );
}
