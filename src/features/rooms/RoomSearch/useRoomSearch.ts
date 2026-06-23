"use client";

import { useCallback, useEffect, useState } from "react";

import { parseAsString, useQueryState } from "nuqs";

import { ROOM_QUERY_PARAM, SEARCH_DEBOUNCE_MS } from "@/constants/search";

import { useDebounce } from "@/lib/hooks/useDebounce";

interface UseRoomSearchReturn {
  /** Current value of the search input */
  inputValue: string;

  /** Updates the input value; URL write is debounced while typing */
  setInputValue: (value: string) => void;

  /** Clears the input and removes the query param from the URL immediately */
  clearSearch: () => void;
}

export function useRoomSearch(): UseRoomSearchReturn {
  const [queryState, setQueryState] = useQueryState(
    ROOM_QUERY_PARAM,
    parseAsString.withDefault("").withOptions({ shallow: true, scroll: false }),
  );

  const [inputValue, setInputValue] = useState(queryState);
  const debouncedValue = useDebounce(inputValue, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    void setQueryState(debouncedValue || null);
  }, [debouncedValue, setQueryState]);

  const clearSearch = useCallback(() => {
    setInputValue("");
    void setQueryState(null);
  }, [setQueryState]);

  return { inputValue, setInputValue, clearSearch };
}
