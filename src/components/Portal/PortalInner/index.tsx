"use client";

import { createPortal } from "react-dom";

interface PortalProps {
  /** Content to render inside document.body */
  children: React.ReactNode;
}

export default function PortalInner({ children }: PortalProps) {
  return createPortal(children, document.body);
}
