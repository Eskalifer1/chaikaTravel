import type { ComponentPropsWithoutRef } from "react";

export default function GymIcon(props: ComponentPropsWithoutRef<"svg">) {
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
      <path d="M6 4v16M18 4v16" />
      <path d="M2 9h4M18 9h4M2 15h4M18 15h4" />
      <path d="M6 12h12" />
    </svg>
  );
}
