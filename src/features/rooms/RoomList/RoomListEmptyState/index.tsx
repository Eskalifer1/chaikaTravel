export default function RoomListEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-lg font-semibold text-text-primary">No rooms available</p>
      <p className="text-sm text-text-secondary">
        Try adjusting your dates or the number of guests.
      </p>
    </div>
  );
}
