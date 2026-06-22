"use client";

import { useSearchParams } from "next/navigation";

import type { Room } from "@/types";
import { PRIORITY_CARDS_COUNT } from "@/constants/imageLoading";

import RoomCard from "@/features/rooms/RoomCard";
import { filterRooms } from "@/features/rooms/utils/filterRooms";

import RoomListEmptyState from "./RoomListEmptyState";

interface RoomListProps {
  /** Full list of rooms to display; filtered client-side by the URL query */
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const filtered = filterRooms(rooms, query);

  if (filtered.length === 0) {
    return <RoomListEmptyState />;
  }

  return (
    <section aria-label="Available rooms" aria-live="polite" aria-atomic="false">
      <ul className="flex flex-col gap-6">
        {filtered.map((room, i) => (
          <li key={room.id}>
            <RoomCard room={room} priority={i < PRIORITY_CARDS_COUNT} />
          </li>
        ))}
      </ul>
    </section>
  );
}
