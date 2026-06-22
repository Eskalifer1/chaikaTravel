"use client";

import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import type { RoomSearchParams } from "@/types";
import {
  ADULTS_PARAM,
  CHECK_IN_PARAM,
  CHECK_OUT_PARAM,
  CHILD_AGES_PARAM,
  ROOMS_PARAM,
} from "@/constants/search";

import {
  getDefaultValues,
  parseSearchParams,
  type AvailabilitySearchFormValues,
} from "./schema";

const defaults = getDefaultValues();

const availabilityParsers = {
  [CHECK_IN_PARAM]: parseAsString.withDefault(defaults.checkIn),
  [CHECK_OUT_PARAM]: parseAsString.withDefault(defaults.checkOut),
  [ROOMS_PARAM]: parseAsInteger.withDefault(defaults.rooms),
  [ADULTS_PARAM]: parseAsInteger.withDefault(defaults.adults),
  [CHILD_AGES_PARAM]: parseAsArrayOf(parseAsInteger).withDefault(defaults.childAges),
};

interface UseAvailabilitySearchReturn {
  /** Current validated search params (defaults applied for invalid/missing URL values) */
  searchParams: RoomSearchParams;

  /** Writes validated params to the URL atomically */
  commitSearch: (values: AvailabilitySearchFormValues) => void;
}

export function useAvailabilitySearch(): UseAvailabilitySearchReturn {
  const [raw, setRaw] = useQueryStates(availabilityParsers, {
    shallow: true,
    scroll: false,
  });

  const rawParams = new URLSearchParams();
  rawParams.set(CHECK_IN_PARAM, raw[CHECK_IN_PARAM]);
  rawParams.set(CHECK_OUT_PARAM, raw[CHECK_OUT_PARAM]);
  rawParams.set(ROOMS_PARAM, String(raw[ROOMS_PARAM]));
  rawParams.set(ADULTS_PARAM, String(raw[ADULTS_PARAM]));
  if (raw[CHILD_AGES_PARAM].length > 0) {
    rawParams.set(CHILD_AGES_PARAM, raw[CHILD_AGES_PARAM].join(","));
  }
  const searchParams = parseSearchParams(rawParams);

  function commitSearch(values: AvailabilitySearchFormValues) {
    void setRaw({
      [CHECK_IN_PARAM]: values.checkIn,
      [CHECK_OUT_PARAM]: values.checkOut,
      [ROOMS_PARAM]: values.rooms,
      [ADULTS_PARAM]: values.adults,
      [CHILD_AGES_PARAM]: values.childAges.length > 0 ? values.childAges : null,
    });
  }

  return { searchParams, commitSearch };
}
