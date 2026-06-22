"use client";

import { useSearchParams } from "next/navigation";

import type { Room } from "@/types";
import { PRIORITY_CARDS_COUNT } from "@/constants/imageLoading";
import { ROOM_QUERY_PARAM } from "@/constants/search";

import { computeNights } from "@/lib/utils";

import { parseSearchParams } from "@/features/rooms/AvailabilitySearch/schema";
import RoomCard from "@/features/rooms/RoomCard";
import { filterRooms } from "@/features/rooms/utils/filterRooms";

import RoomListEmptyState from "./RoomListEmptyState";

interface RoomListProps {
  /** Full list of rooms to display; filtered client-side by the URL query */
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  const rawSearchParams = useSearchParams();
  const searchParams = parseSearchParams(rawSearchParams);
  const query = rawSearchParams.get(ROOM_QUERY_PARAM) ?? "";
  const nights = computeNights(searchParams.checkIn, searchParams.checkOut);

  const filtered = filterRooms(rooms, { query, searchParams });

  if (filtered.length === 0) {
    return <RoomListEmptyState />;
  }

  return (
    <section aria-label="Available rooms" aria-live="polite" aria-atomic="false">
      <ul className="flex flex-col gap-6">
        {filtered.map((room, i) => (
          <li key={room.id}>
            <RoomCard
              room={room}
              priority={i < PRIORITY_CARDS_COUNT}
              nights={nights}
              roomCount={searchParams.rooms}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
