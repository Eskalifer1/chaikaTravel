"use client";

import Image from "next/image";

import GalleryNavButton from "./GalleryNavButton";
import GallerySlide from "./GallerySlide";
import { useGallery } from "./useGallery";

const WRAPPER_CLASS =
  "relative aspect-[4/3] w-full overflow-hidden rounded-t-radius-lg md:aspect-auto md:h-full md:rounded-l-radius-lg md:rounded-tr-none";

interface ImageGalleryProps {
  /** Ordered list of image URLs */
  images: string[];

  /** Room name used to generate alt text */
  roomName: string;

  /** Whether to eagerly preload the first image for LCP optimization */
  priority?: boolean;
}

export default function ImageGallery({ images, roomName, priority = false }: ImageGalleryProps) {
  const { index, hasPrev, hasNext, prev, next, handleKeyDown } = useGallery(images.length);

  if (images.length === 1) {
    return (
      <div className={WRAPPER_CLASS}>
        <Image
          src={images[0]!}
          alt={`${roomName} — room photo`}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`${roomName} photo gallery`}
      aria-roledescription="carousel"
      className={`${WRAPPER_CLASS} focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {images.map((src, i) => (
        <GallerySlide
          key={i}
          src={src}
          alt={`${roomName} — photo ${i + 1} of ${images.length}`}
          position={i + 1}
          total={images.length}
          active={i === index}
          priority={priority && i === 0}
        />
      ))}

      <GalleryNavButton direction="prev" enabled={hasPrev} onClick={prev} />
      <GalleryNavButton direction="next" enabled={hasNext} onClick={next} />

      <div aria-hidden="true" className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-surface" : "bg-surface/50"}`}
          />
        ))}
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Photo {index + 1} of {images.length}
      </div>
    </div>
  );
}
