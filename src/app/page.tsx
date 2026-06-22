import { Suspense } from "react";

import { rooms } from "@/lib/mock-data";

import RoomList from "@/features/rooms/RoomList";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Suspense>
        <RoomList rooms={rooms} />
      </Suspense>
    </div>
  );
}
