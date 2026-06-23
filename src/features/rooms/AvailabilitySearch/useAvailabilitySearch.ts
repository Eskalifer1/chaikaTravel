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

import { parseSearchParams, type AvailabilitySearchFormValues } from "./schema";

const availabilityParsers = {
  [CHECK_IN_PARAM]: parseAsString,
  [CHECK_OUT_PARAM]: parseAsString,
  [ROOMS_PARAM]: parseAsInteger,
  [ADULTS_PARAM]: parseAsInteger,
  [CHILD_AGES_PARAM]: parseAsArrayOf(parseAsInteger),
} as const;

type NuqsRaw = ReturnType<typeof useQueryStates<typeof availabilityParsers>>[0];

/** Converts nuqs parsed state into URLSearchParams for use with parseSearchParams */
function nuqsRawToUrlSearchParams(raw: NuqsRaw): URLSearchParams {
  const params = new URLSearchParams();
  if (raw[CHECK_IN_PARAM] !== null) {
    params.set(CHECK_IN_PARAM, raw[CHECK_IN_PARAM]);
  }
  if (raw[CHECK_OUT_PARAM] !== null) {
    params.set(CHECK_OUT_PARAM, raw[CHECK_OUT_PARAM]);
  }
  if (raw[ROOMS_PARAM] !== null) {
    params.set(ROOMS_PARAM, String(raw[ROOMS_PARAM]));
  }
  if (raw[ADULTS_PARAM] !== null) {
    params.set(ADULTS_PARAM, String(raw[ADULTS_PARAM]));
  }
  if (raw[CHILD_AGES_PARAM] !== null && raw[CHILD_AGES_PARAM].length > 0) {
    params.set(CHILD_AGES_PARAM, raw[CHILD_AGES_PARAM].join(","));
  }
  return params;
}

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

  const searchParams = parseSearchParams(nuqsRawToUrlSearchParams(raw));

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
