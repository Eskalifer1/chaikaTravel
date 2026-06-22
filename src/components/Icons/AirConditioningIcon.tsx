import type { ComponentPropsWithoutRef } from "react";

export default function AirConditioningIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 16a4 4 0 0 1 8 0" />
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <path d="M7 11v2M12 11v4M17 11v2" />
    </svg>
  );
}
