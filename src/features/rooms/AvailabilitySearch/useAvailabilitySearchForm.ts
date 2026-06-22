"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { availabilitySearchSchema, type AvailabilitySearchFormValues } from "./schema";
import { useAvailabilitySearch } from "./useAvailabilitySearch";

interface UseAvailabilitySearchFormReturn {
  /** react-hook-form methods to spread onto FormProvider */
  methods: ReturnType<typeof useForm<AvailabilitySearchFormValues>>;

  /** Submit handler — validates then commits search params to the URL */
  onSubmit: (values: AvailabilitySearchFormValues) => void;
}

export function useAvailabilitySearchForm(): UseAvailabilitySearchFormReturn {
  const { searchParams, commitSearch } = useAvailabilitySearch();

  const methods = useForm<AvailabilitySearchFormValues>({
    resolver: zodResolver(availabilitySearchSchema),
    defaultValues: {
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      rooms: searchParams.rooms,
      adults: searchParams.adults,
      childAges: searchParams.childAges,
    },
  });

  useEffect(() => {
    methods.reset({
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      rooms: searchParams.rooms,
      adults: searchParams.adults,
      childAges: searchParams.childAges,
    });
  }, [
    searchParams.checkIn,
    searchParams.checkOut,
    searchParams.rooms,
    searchParams.adults,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchParams.childAges.join(","),
    methods,
  ]);

  function onSubmit(values: AvailabilitySearchFormValues) {
    commitSearch(values);
  }

  return { methods, onSubmit };
}
