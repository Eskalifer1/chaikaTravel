import XIcon from "@/components/Icons/XIcon";

interface ClearSearchButtonProps {
  /** Fires when the user clicks the clear button */
  onClick: () => void;
}

export default function ClearSearchButton({ onClick }: ClearSearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Clear search"
      className="flex items-center justify-center rounded-radius-sm p-0.5 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary"
    >
      <XIcon width={14} height={14} />
    </button>
  );
}
