import { Suspense } from "react";

import { rooms } from "@/lib/mock-data";

import RoomList from "@/features/rooms/RoomList";
import RoomSearch from "@/features/rooms/RoomSearch";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <Suspense>
          <RoomSearch />
        </Suspense>
      </div>

      <Suspense>
        <RoomList rooms={rooms} />
      </Suspense>
    </div>
  );
}
