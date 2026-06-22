export default function RoomListEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <h2 className="text-lg font-semibold text-text-primary">No rooms available</h2>
      <p className="text-sm text-text-secondary">
        Try adjusting your dates or the number of guests.
      </p>
    </div>
  );
}
