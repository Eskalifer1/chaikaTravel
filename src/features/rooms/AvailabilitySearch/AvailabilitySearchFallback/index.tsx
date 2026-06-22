export default function AvailabilitySearchFallback() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="h-13 w-50 animate-pulse rounded-radius-md bg-surface-raised" />
      <div className="h-13 w-45 animate-pulse rounded-radius-md bg-surface-raised" />
      <div className="h-10 w-10 animate-pulse rounded-full bg-surface-raised" />
    </div>
  );
}
