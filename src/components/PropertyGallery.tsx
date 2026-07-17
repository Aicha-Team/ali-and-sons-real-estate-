"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function close() {
    setActiveIndex(null);
  }

  function next(e?: React.MouseEvent) {
    e?.stopPropagation();
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  function prev(e?: React.MouseEvent) {
    e?.stopPropagation();
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-[4/3] overflow-hidden group"
          >
            <Image
              src={src}
              alt={`${title} — image ${i + 1}`}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center px-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-cream hover:text-cream/70"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 text-cream hover:text-cream/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIndex]}
              alt={`${title} — image ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 text-cream hover:text-cream/70"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
}
