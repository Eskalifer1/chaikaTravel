import type { ComponentPropsWithoutRef } from "react";

export default function MiniBarIcon(props: ComponentPropsWithoutRef<"svg">) {
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
      <path d="M8 2h8l1 10H7L8 2z" />
      <path d="M7 12v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8" />
      <path d="M10 7h4" />
    </svg>
  );
}
