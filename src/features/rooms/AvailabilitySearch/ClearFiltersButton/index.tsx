"use client";

import { useFormContext } from "react-hook-form";

import XIcon from "@/components/Icons/XIcon";

import { getDefaultValues, type AvailabilitySearchFormValues } from "../schema";

interface ClearFiltersButtonProps {
  /** Called with default values after the form is reset, to commit the cleared search */
  onClear: (values: AvailabilitySearchFormValues) => void;
}

const SCALAR_KEYS = ["checkIn", "checkOut", "rooms", "adults"] as const;

type ScalarKey = (typeof SCALAR_KEYS)[number];

function isNonDefault(values: AvailabilitySearchFormValues): boolean {
  const defaults = getDefaultValues();
  return (
    SCALAR_KEYS.some((key: ScalarKey) => values[key] !== defaults[key]) ||
    values.childAges.length !== defaults.childAges.length
  );
}

export default function ClearFiltersButton({ onClear }: ClearFiltersButtonProps) {
  const { watch, reset } = useFormContext<AvailabilitySearchFormValues>();

  const values = watch();

  if (!isNonDefault(values)) {
    return null;
  }

  function handleClick() {
    const defaults = getDefaultValues();
    reset(defaults);
    onClear(defaults);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Clear filters"
      className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-border text-text-secondary transition hover:border-border-strong hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <XIcon width={18} height={18} />
    </button>
  );
}
