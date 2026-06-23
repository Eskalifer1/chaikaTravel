function RoomCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-radius-lg border border-border bg-surface shadow-sm md:flex-row">
      <div className="h-56 w-full animate-pulse bg-surface-raised md:h-auto md:w-80 md:shrink-0" />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-48 animate-pulse rounded-radius-sm bg-surface-raised" />
          <div className="h-4 w-32 animate-pulse rounded-radius-sm bg-surface-raised" />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-full animate-pulse rounded-radius-sm bg-surface-raised" />
          <div className="h-3.5 w-5/6 animate-pulse rounded-radius-sm bg-surface-raised" />
          <div className="h-3.5 w-4/6 animate-pulse rounded-radius-sm bg-surface-raised" />
        </div>

        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-16 animate-pulse rounded-radius-sm bg-surface-raised" />
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-4 w-24 animate-pulse rounded-radius-sm bg-surface-raised" />
                <div className="h-4 w-20 animate-pulse rounded-radius-sm bg-surface-raised" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-16 animate-pulse rounded-radius-sm bg-surface-raised" />
                <div className="h-8 w-24 animate-pulse rounded-radius-md bg-surface-raised" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoomListSkeleton() {
  return (
    <ul className="flex flex-col gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <RoomCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
