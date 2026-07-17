"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PropertySearchBar from "@/components/PropertySearchBar";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2400&auto=format&fit=crop";
const DEFAULT_EYEBROW = "Find Your Space";
const DEFAULT_TITLE = "Explore Our Portfolio";

export default function ScrollHero3D({
  image = DEFAULT_IMAGE,
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
}: {
  image?: string;
  eyebrow?: string;
  title?: string;
}) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springX = useSpring(pointerX, { stiffness: 50, damping: 20, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 50, damping: 20, mass: 0.8 });

  // Background drifts opposite the cursor; content floats gently with it.
  const bgX = useTransform(springX, [0, 1], ["1.5%", "-1.5%"]);
  const bgY = useTransform(springY, [0, 1], ["1.5%", "-1.5%"]);
  const contentX = useTransform(springX, [0, 1], ["-0.6%", "0.6%"]);
  const contentY = useTransform(springY, [0, 1], ["-0.6%", "0.6%"]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width);
      pointerY.set((e.clientY - rect.top) / rect.height);
    },
    [pointerX, pointerY]
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-[3%]">
        <Image
          src={image}
          alt="ASRE hero"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 lg:px-10 text-center"
      >
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="block text-xs uppercase tracking-[0.25em] text-white/80 font-medium"
          >
            {eyebrow}
          </motion.span>
        </span>

        <h1 className="mt-6 mb-10 overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="block font-display font-normal text-white leading-[1.1] text-[clamp(2rem,4.5vw,4rem)] max-w-3xl"
          >
            {title}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="w-full max-w-5xl"
        >
          <PropertySearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
        >
          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 text-white text-sm uppercase tracking-[0.2em] font-medium border-b border-white/60 pb-1 hover:border-white transition-colors"
          >
            Explore Properties <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
