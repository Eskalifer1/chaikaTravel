import Icon from "@/components/Icon";
import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";

interface GalleryNavButtonProps {
  /** Direction this button navigates */
  direction: "prev" | "next";

  /** Whether the button action is possible */
  enabled: boolean;

  /** Called when the button is clicked */
  onClick: () => void;
}

const CONFIG = {
  prev: {
    label: "Previous photo",
    icon: ChevronLeftIcon,
    position: "left-2",
  },
  next: {
    label: "Next photo",
    icon: ChevronRightIcon,
    position: "right-2",
  },
} as const;

export default function GalleryNavButton({ direction, enabled, onClick }: GalleryNavButtonProps) {
  const { label, icon, position } = CONFIG[direction];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={label}
      className={`absolute ${position} top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 text-text-primary shadow backdrop-blur-sm transition hover:bg-surface disabled:invisible focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
    >
      <Icon svg={icon} className="h-4 w-4" />
    </button>
  );
}
