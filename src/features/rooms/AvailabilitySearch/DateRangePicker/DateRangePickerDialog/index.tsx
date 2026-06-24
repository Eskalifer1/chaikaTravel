"use client";

import { type Ref } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

import FloatingDialog from "@/components/FloatingDialog";

const TITLE_ID = "date-range-picker-title";

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

  /** Bounding rect of the trigger button, used to position the dialog on desktop */
  anchorRect: DOMRect;

  /** Called when the dialog should close (e.g. Escape key) */
  onClose: () => void;
}

export default function DateRangePickerDialog({
  ref,
  displayRange,
  minDate,
  maxDate,
  onDayClick,
  anchorRect,
  onClose,
}: DateRangePickerDialogProps) {
  return (
    <FloatingDialog
      ref={ref}
      anchorRect={anchorRect}
      titleId={TITLE_ID}
      onClose={onClose}
      align="left"
      className="p-3"
    >
      <span id={TITLE_ID} className="sr-only">
        Select check-in and check-out dates
      </span>
      <DayPicker
        mode="range"
        selected={displayRange}
        onSelect={() => {}}
        onDayClick={onDayClick}
        disabled={{ before: minDate, after: maxDate }}
        numberOfMonths={2}
        showOutsideDays={false}
      />
    </FloatingDialog>
  );
}
