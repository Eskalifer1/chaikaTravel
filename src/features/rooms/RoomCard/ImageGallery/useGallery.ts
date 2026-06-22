"use client";

import { useState } from "react";

interface UseGalleryReturn {
  /** Index of the currently visible slide */
  index: number;

  /** Whether a previous slide exists */
  hasPrev: boolean;

  /** Whether a next slide exists */
  hasNext: boolean;

  /** Navigate to the previous slide */
  prev: () => void;

  /** Navigate to the next slide */
  next: () => void;

  /** Keyboard handler — ArrowLeft/ArrowRight navigate between slides */
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Manages navigation state for a finite list of slides.
 *
 * @param total - Total number of slides
 */
export function useGallery(total: number): UseGalleryReturn {
  const [index, setIndex] = useState(0);

  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  function prev() {
    if (hasPrev) {
      setIndex((i) => i - 1);
    }
  }

  function next() {
    if (hasNext) {
      setIndex((i) => i + 1);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      prev();
    } else if (e.key === "ArrowRight") {
      next();
    }
  }

  return { index, hasPrev, hasNext, prev, next, handleKeyDown };
}
