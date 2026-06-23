"use client";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { MAX_CHILDREN } from "@/constants/search";

import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { pluralize } from "@/lib/utils";

import type { AvailabilitySearchFormValues } from "../schema";
import TravelersPanelDialog from "./TravelersPanelDialog";

/** Builds a compact summary label for the travelers trigger button */
function buildTravelersLabel(adults: number, rooms: number, childAges: number[]): string {
  const totalGuests = adults + childAges.length;
  const guestLabel = `${totalGuests} ${pluralize(totalGuests, "traveler", "travelers")}`;
  const roomLabel = `${rooms} ${pluralize(rooms, "room", "rooms")}`;
  return `${guestLabel}, ${roomLabel}`;
}

export default function TravelersPanel() {
  const { watch, setValue, formState } = useFormContext<AvailabilitySearchFormValues>();
  const adults = watch("adults");
  const rooms = watch("rooms");
  const childAges = watch("childAges");

  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useClickOutside([triggerRef, dialogRef], () => setOpen(false), open);

  function handleToggle() {
    if (open) {
      setOpen(false);
    } else {
      setAnchorRect(triggerRef.current?.getBoundingClientRect() ?? null);
      setOpen(true);
    }
  }

  function handleAddChild() {
    if (childAges.length >= MAX_CHILDREN) {
      return;
    }
    setValue("childAges", [...childAges, 5], { shouldValidate: true });
  }

  function handleRemoveChild(index: number) {
    setValue(
      "childAges",
      childAges.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  }

  function handleChildAgeChange(index: number, age: number) {
    const next = [...childAges];
    next[index] = age;
    setValue("childAges", next, { shouldValidate: true });
  }

  const childAgesErrors = formState.errors.childAges;
  const childAgesError =
    typeof childAgesErrors?.message === "string" ? childAgesErrors.message : undefined;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Travelers: ${buildTravelersLabel(adults, rooms, childAges)}`}
        className="flex min-w-45 flex-col gap-0.5 rounded-radius-md border border-border px-3 py-2 text-left transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="text-xs font-medium text-text-secondary">Travelers</span>
        <span className="text-sm text-text-primary">
          {buildTravelersLabel(adults, rooms, childAges)}
        </span>
      </button>

      {open && anchorRect && (
        <TravelersPanelDialog
          ref={dialogRef}
          rooms={rooms}
          adults={adults}
          childAges={childAges}
          onRoomsChange={(v) => setValue("rooms", v, { shouldValidate: true })}
          onAdultsChange={(v) => setValue("adults", v, { shouldValidate: true })}
          onChildAgeChange={handleChildAgeChange}
          onAddChild={handleAddChild}
          canAddChild={childAges.length < MAX_CHILDREN}
          onRemoveChild={handleRemoveChild}
          childAgesError={childAgesError}
          anchorRect={anchorRect}
        />
      )}
    </div>
  );
}
