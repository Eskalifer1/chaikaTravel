"use client";

import { useEffect, type Ref } from "react";

import Portal from "@/components/Portal";

interface FloatingDialogProps {
  /** Ref forwarded to the dialog root element, used for outside-click detection by the caller */
  ref: Ref<HTMLDivElement>;

  /** Bounding rect of the trigger element — used to position the dialog on desktop */
  anchorRect: DOMRect;

  /** `id` of the element that labels this dialog, passed to `aria-labelledby` */
  titleId: string;

  /** Called when the user presses Escape */
  onClose: () => void;

  /** Dialog content */
  children: React.ReactNode;

  /**
   * Desktop horizontal alignment relative to the anchor:
   * "left" aligns the dialog's left edge to the anchor's left edge;
   * "right" aligns the dialog's right edge to the anchor's right edge
   */
  align?: "left" | "right";

  /** Extra CSS classes applied to the desktop dropdown panel */
  className?: string;
}

const VIEWPORT_GAP = 8;

function resolveDesktopStyle(anchorRect: DOMRect, align: "left" | "right"): React.CSSProperties {
  const spaceBelow = window.innerHeight - anchorRect.bottom - VIEWPORT_GAP;

  const top =
    spaceBelow >= 0
      ? anchorRect.bottom + VIEWPORT_GAP
      : Math.max(VIEWPORT_GAP, anchorRect.top - VIEWPORT_GAP);

  if (align === "left") {
    const left = Math.max(
      VIEWPORT_GAP,
      Math.min(anchorRect.left, window.innerWidth - VIEWPORT_GAP),
    );
    return { position: "fixed", top, left, zIndex: 9999 };
  }

  const rightFromEdge = window.innerWidth - anchorRect.right;
  const right = Math.max(VIEWPORT_GAP, rightFromEdge);
  return { position: "fixed", top, right, zIndex: 9999 };
}

export default function FloatingDialog({
  ref,
  anchorRect,
  titleId,
  onClose,
  children,
  align = "left",
  className = "",
}: FloatingDialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  if (isMobile) {
    return (
      <Portal>
        <div className="fixed inset-0 z-9998 bg-black/40" aria-hidden="true" />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-x-0 bottom-0 z-9999 max-h-[85dvh] overflow-y-auto rounded-t-radius-xl border-t border-border bg-surface p-4 shadow-lg"
        >
          {children}
        </div>
      </Portal>
    );
  }

  return (
    <Portal>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={resolveDesktopStyle(anchorRect, align)}
        className={`rounded-radius-lg border border-border bg-surface shadow-lg ${className}`}
      >
        {children}
      </div>
    </Portal>
  );
}
