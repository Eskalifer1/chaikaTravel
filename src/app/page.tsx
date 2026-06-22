import { Suspense } from "react";

import RoomList from "@/features/rooms/RoomList";
import { rooms } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Suspense>
        <RoomList rooms={rooms} />
      </Suspense>
    </div>
  );
}
