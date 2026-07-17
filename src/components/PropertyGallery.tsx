"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0, scale: 0.97 }),
};

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const close = useCallback(() => setActiveIndex(null), []);

  const next = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setDirection(1);
      setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
    },
    [images.length]
  );

  const prev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setDirection(-1);
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length
      );
    },
    [images.length]
  );

  const jumpTo = useCallback(
    (i: number) => {
      setActiveIndex((current) => {
        if (current !== null) setDirection(i > current ? 1 : -1);
        return i;
      });
    },
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Bento grid with staggered reveal */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] md:auto-rows-[220px] gap-3">
        {images.map((src, i) => (
          <motion.button
            key={src + i}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: EASE }}
            whileHover="hover"
            whileTap={{ scale: 0.985 }}
            onClick={() => {
              setDirection(0);
              setActiveIndex(i);
            }}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              i === 0 && "col-span-2 row-span-2",
              i !== 0 && i % 5 === 3 && "md:col-span-2"
            )}
          >
            <motion.div
              variants={{ hover: { scale: 1.08 } }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`${title} — image ${i + 1}`}
                fill
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover"
              />
            </motion.div>

            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent"
            />

            <motion.span
              variants={{ hover: { y: 0, opacity: 1 } }}
              initial={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute bottom-3 left-4 text-[11px] font-medium tracking-[0.25em] text-white"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>

            <motion.span
              variants={{ hover: { scale: 1, opacity: 1 } }}
              initial={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md"
            >
              <Expand size={14} />
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Animated lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-charcoal/90 backdrop-blur-xl flex flex-col items-center justify-center px-4"
            onClick={close}
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="absolute top-6 left-6 text-[11px] font-medium tracking-[0.3em] text-white/70"
            >
              {String(activeIndex + 1).padStart(2, "0")} —{" "}
              {String(images.length).padStart(2, "0")}
            </motion.span>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.94 }}
              onClick={close}
              className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white"
              aria-label="Close gallery"
            >
              <X size={18} />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.94 }}
              onClick={prev}
              className="absolute left-4 md:left-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 260, damping: 30 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.35, ease: EASE },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeIndex]}
                    alt={`${title} — image ${activeIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.94 }}
              onClick={next}
              className="absolute right-4 md:right-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </motion.button>

            {/* Thumbnail rail */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.45, ease: EASE }}
              className="absolute bottom-6 left-0 right-0 flex justify-center px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2 max-w-full overflow-x-auto pb-1 px-1">
                {images.map((src, i) => (
                  <motion.button
                    key={src + i}
                    onClick={() => jumpTo(i)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-300",
                      i === activeIndex
                        ? "ring-2 ring-white opacity-100"
                        : "opacity-40 hover:opacity-75"
                    )}
                    aria-label={`Go to image ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
