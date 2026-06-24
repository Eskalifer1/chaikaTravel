"use client";

import { Suspense } from "react";
import { FormProvider } from "react-hook-form";

import SearchIcon from "@/components/Icons/SearchIcon";

import AvailabilitySearchFallback from "./AvailabilitySearchFallback";
import ClearFiltersButton from "./ClearFiltersButton";
import DateRangePicker from "./DateRangePicker";
import TravelersPanel from "./TravelersPanel";
import { useAvailabilitySearchForm } from "./useAvailabilitySearchForm";

function AvailabilitySearchInner() {
  const { methods, onSubmit } = useAvailabilitySearchForm();
  const hasErrors = Object.keys(methods.formState.errors).length > 0;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        aria-label="Search availability"
        noValidate
        className="flex flex-wrap items-start gap-2 sm:flex-nowrap"
      >
        <DateRangePicker />
        <TravelersPanel />

        <button
          type="submit"
          disabled={hasErrors}
          aria-label="Search rooms"
          aria-disabled={hasErrors}
          className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SearchIcon width={18} height={18} />
        </button>

        <ClearFiltersButton onClear={onSubmit} />
      </form>
    </FormProvider>
  );
}

export default function AvailabilitySearch() {
  return (
    <Suspense fallback={<AvailabilitySearchFallback />}>
      <AvailabilitySearchInner />
    </Suspense>
  );
}
