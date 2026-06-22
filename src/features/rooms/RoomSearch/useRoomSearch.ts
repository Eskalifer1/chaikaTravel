"use client";

import { useCallback } from "react";

import { debounce, parseAsString, useQueryState } from "nuqs";

import { ROOM_QUERY_PARAM, SEARCH_DEBOUNCE_MS } from "@/constants/search";

interface UseRoomSearchReturn {
  /** Current value of the search input (unthrottled) */
  inputValue: string;

  /** Updates the input value; URL write is debounced while typing */
  setInputValue: (value: string) => void;

  /** Clears the input and removes the query param from the URL immediately */
  clearSearch: () => void;
}

export function useRoomSearch(): UseRoomSearchReturn {
  const [inputValue, setQueryState] = useQueryState(
    ROOM_QUERY_PARAM,
    parseAsString.withDefault("").withOptions({ shallow: true, scroll: false }),
  );

  const setInputValue = useCallback(
    (value: string) => {
      void setQueryState(value || null, { limitUrlUpdates: debounce(SEARCH_DEBOUNCE_MS) });
    },
    [setQueryState],
  );

  const clearSearch = useCallback(() => {
    void setQueryState(null);
  }, [setQueryState]);

  return { inputValue, setInputValue, clearSearch };
}
