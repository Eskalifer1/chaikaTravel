import { useEffect, type RefObject } from "react";

/**
 * Fires `callback` when a mousedown event occurs outside all provided refs.
 * The listener is only attached while `enabled` is true (defaults to true).
 */
export function useClickOutside(
  refs: RefObject<Element | null>[],
  callback: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      const isInside = refs.some((ref) => ref.current?.contains(target));
      if (!isInside) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [refs, callback, enabled]);
}
