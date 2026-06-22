"use client";

import type { Room } from "@/types";

import AmenityList from "./AmenityList";
import ImageGallery from "./ImageGallery";
import RoomCardBadge from "./RoomCardBadge";
import RoomCardMeta from "./RoomCardMeta";
import RoomCardRatePlans from "./RoomCardRatePlans";

interface RoomCardProps {
  /** Room data to display */
  room: Room;

  /** Whether to eagerly preload the hero image for LCP optimization */
  priority?: boolean;

  /** Number of nights for the stay — used to compute total price from the per-night rate */
  nights: number;

  /** Number of rooms booked — multiplied into the total price */
  roomCount: number;
}

export default function RoomCard({ room, priority = false, nights, roomCount }: RoomCardProps) {
  return (
    <article
      aria-label={room.name}
      className="relative flex flex-col overflow-hidden rounded-radius-lg border border-border bg-surface shadow-sm md:flex-row"
    >
      {room.badge && <RoomCardBadge badge={room.badge} />}

      <div className="md:w-80 md:shrink-0">
        <ImageGallery images={room.images} roomName={room.name} priority={priority} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-text-primary">{room.name}</h2>
          <RoomCardMeta
            areaSqm={room.areaSqm}
            maxOccupancy={room.maxOccupancy}
            availableCount={room.availableCount}
          />
        </div>

        <p className="text-sm leading-relaxed text-text-secondary">{room.description}</p>

        <AmenityList amenities={room.amenities} />

        <RoomCardRatePlans ratePlans={room.ratePlans} nights={nights} roomCount={roomCount} />
      </div>
    </article>
  );
}
