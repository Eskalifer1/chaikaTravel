"use client";

import { useMemo, useRef, useState } from "react";
import { type DateRange } from "react-day-picker";
import { useFormContext } from "react-hook-form";

import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { addYears, isoToLocalDate, todayIso, toIsoLocal } from "@/lib/utils";

import type { AvailabilitySearchFormValues } from "../schema";

/**
 * Two-phase date selection state:
 * - "idle" — no selection in progress; shows the committed range
 * - "selecting-end" — first date clicked; waiting for the end date
 */
type SelectionPhase = "idle" | "selecting-end";

interface UseDateRangePickerReturn {
  /** Ref for the trigger button, used for outside-click detection and anchor positioning */
  triggerRef: React.RefObject<HTMLButtonElement | null>;

  /** Ref for the dialog, used for outside-click detection */
  dialogRef: React.RefObject<HTMLDivElement | null>;

  /** Whether the calendar dialog is open */
  open: boolean;

  /** Date range to render in the calendar — reflects pending selection while choosing end date */
  displayRange: DateRange;

  /** Earliest selectable date */
  minDate: Date;

  /** Latest selectable date */
  maxDate: Date;

  /** Bounding rect of the trigger, used to position the dialog; null when dialog is closed */
  anchorRect: DOMRect | null;

  /** Called when the trigger button is clicked */
  handleOpenToggle: () => void;

  /** Called when the user clicks a day in the calendar */
  handleDayClick: (day: Date) => void;
}

export function useDateRangePicker(): UseDateRangePickerReturn {
  const { watch, setValue } = useFormContext<AvailabilitySearchFormValues>();
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<SelectionPhase>("idle");
  const [pendingFrom, setPendingFrom] = useState<Date | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const minDate = useMemo(() => isoToLocalDate(todayIso()), []);
  const maxDate = useMemo(() => isoToLocalDate(addYears(todayIso(), 1)), []);

  const committedRange: DateRange = {
    from: isoToLocalDate(checkIn),
    to: isoToLocalDate(checkOut),
  };

  const displayRange: DateRange =
    phase === "selecting-end" && pendingFrom
      ? { from: pendingFrom, to: undefined }
      : committedRange;

  useClickOutside([triggerRef, dialogRef], () => {
    if (open) {
      setPendingFrom(null);
      setPhase("idle");
      setOpen(false);
    }
  });

  function handleDayClick(day: Date) {
    if (phase === "idle") {
      setPendingFrom(day);
      setPhase("selecting-end");
    } else if (pendingFrom) {
      if (day.getTime() <= pendingFrom.getTime()) {
        setPendingFrom(day);
        return;
      }

      setValue("checkIn", toIsoLocal(pendingFrom), { shouldValidate: true });
      setValue("checkOut", toIsoLocal(day), { shouldValidate: true });
      setPendingFrom(null);
      setPhase("idle");
      setOpen(false);
    }
  }

  function handleOpenToggle() {
    if (open) {
      setPendingFrom(null);
      setPhase("idle");
      setOpen(false);
    } else {
      setAnchorRect(triggerRef.current?.getBoundingClientRect() ?? null);
      setOpen(true);
    }
  }

  return {
    triggerRef,
    dialogRef,
    open,
    displayRange,
    minDate,
    maxDate,
    anchorRect,
    handleOpenToggle,
    handleDayClick,
  };
}
