"use client";

import RoomCard from "@/features/rooms/RoomCard";
import type { Room } from "@/types";

import RoomListEmptyState from "./RoomListEmptyState";

interface RoomListProps {
  /** Rooms to display */
  rooms: Room[];
}

export default function RoomList({ rooms }: RoomListProps) {
  if (rooms.length === 0) {
    return <RoomListEmptyState />;
  }

  return (
    <section aria-label="Available rooms">
      <ul className="flex flex-col gap-6">
        {rooms.map((room) => (
          <li key={room.id}>
            <RoomCard room={room} />
          </li>
        ))}
      </ul>
    </section>
  );
}
