import type { ComponentPropsWithoutRef } from "react";

export default function PoolIcon(props: ComponentPropsWithoutRef<"svg">) {
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
      <path d="M2 20c2 0 4-2 6-2s4 2 6 2 4-2 6-2" />
      <path d="M2 16c2 0 4-2 6-2s4 2 6 2 4-2 6-2" />
      <path d="M7 10V6a2 2 0 0 1 4 0v10" />
      <path d="M15 10V6a2 2 0 0 1 4 0v2" />
    </svg>
  );
}
