"use client";

import SearchIcon from "@/components/Icons/SearchIcon";
import Input from "@/components/Input";

import ClearSearchButton from "./ClearSearchButton";
import { useRoomSearch } from "./useRoomSearch";

export default function RoomSearch() {
  const { inputValue, setInputValue, clearSearch } = useRoomSearch();

  return (
    <div className="w-full max-w-sm">
      <Input
        label="Search rooms"
        labelHidden
        type="search"
        placeholder="Search by name, amenity, price…"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        leadingIcon={<SearchIcon />}
        trailingAction={inputValue.length > 0 ? <ClearSearchButton onClick={clearSearch} /> : null}
        aria-label="Search rooms"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
