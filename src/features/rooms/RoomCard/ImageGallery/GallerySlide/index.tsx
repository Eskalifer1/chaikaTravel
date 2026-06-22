import Image from "next/image";

interface GallerySlideProps {
  /** Image source URL */
  src: string;

  /** Accessible alt text for the image */
  alt: string;

  /** 1-based position of this slide */
  position: number;

  /** Total number of slides */
  total: number;

  /** Whether this slide is currently visible */
  active: boolean;

  /** Whether to eagerly preload this image for LCP optimization */
  priority?: boolean;
}

export default function GallerySlide({
  src,
  alt,
  position,
  total,
  active,
  priority = false,
}: GallerySlideProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Photo ${position} of ${total}`}
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
