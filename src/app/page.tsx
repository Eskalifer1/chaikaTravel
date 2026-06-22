import { Suspense } from "react";

import { rooms } from "@/lib/mock-data";

import AvailabilitySearch from "@/features/rooms/AvailabilitySearch";
import RoomList from "@/features/rooms/RoomList";
import RoomSearch from "@/features/rooms/RoomSearch";

export default function Home() {
  return (
    <>
      <div className="z-10 border-b border-border bg-surface shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Suspense>
              <AvailabilitySearch />
            </Suspense>
            <Suspense>
              <RoomSearch />
            </Suspense>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Suspense>
          <RoomList rooms={rooms} />
        </Suspense>
      </main>
    </>
  );
}
