"use client";

import "react-day-picker/style.css";

import { useFormContext } from "react-hook-form";

import type { AvailabilitySearchFormValues } from "../schema";
import DateRangePickerDialog from "./DateRangePickerDialog";
import DateRangePickerTrigger from "./DateRangePickerTrigger";
import { useDateRangePicker } from "./useDateRangePicker";

export default function DateRangePicker() {
  const { formState, watch } = useFormContext<AvailabilitySearchFormValues>();
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const {
    triggerRef,
    dialogRef,
    open,
    displayRange,
    minDate,
    maxDate,
    anchorRect,
    handleOpenToggle,
    handleDayClick,
  } = useDateRangePicker();

  const checkInError = formState.errors.checkIn?.message;
  const checkOutError = formState.errors.checkOut?.message;

  return (
    <div className="relative">
      <DateRangePickerTrigger
        ref={triggerRef}
        checkIn={checkIn}
        checkOut={checkOut}
        open={open}
        checkInError={checkInError}
        checkOutError={checkOutError}
        onClick={handleOpenToggle}
      />

      {open && anchorRect && (
        <DateRangePickerDialog
          ref={dialogRef}
          displayRange={displayRange}
          minDate={minDate}
          maxDate={maxDate}
          onDayClick={handleDayClick}
          anchorRect={anchorRect}
        />
      )}
    </div>
  );
}
