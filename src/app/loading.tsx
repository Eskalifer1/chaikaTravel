import RoomListSkeleton from "@/features/rooms/RoomList/RoomListSkeleton";

export default function Loading() {
  return (
    <>
      <div className="border-b border-border bg-surface shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="h-13 w-50 animate-pulse rounded-radius-md bg-surface-raised" />
              <div className="h-13 w-45 animate-pulse rounded-radius-md bg-surface-raised" />
              <div className="h-10 w-10 animate-pulse rounded-full bg-surface-raised" />
            </div>
            <div className="h-10 w-48 animate-pulse rounded-radius-md bg-surface-raised" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <RoomListSkeleton />
      </div>
    </>
  );
}
