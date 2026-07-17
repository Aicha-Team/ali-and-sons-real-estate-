"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageHero({
  image,
  alt,
  eyebrow,
  title,
  className,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[45vh] min-h-[340px] flex items-end overflow-hidden",
        className
      )}
    >
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "linear" }}
        className="absolute inset-0"
      >
        <Image src={image} alt={alt} fill priority className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 pb-12">
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="block text-xs uppercase tracking-[0.25em] text-white/70 font-medium"
          >
            {eyebrow}
          </motion.span>
        </span>
        <h1 className="mt-4 overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="block font-display font-normal text-5xl md:text-6xl leading-[1.1] text-white max-w-3xl"
          >
            {title}
          </motion.span>
        </h1>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-6 block h-px w-24 origin-left bg-white/50"
        />
      </div>
    </div>
  );
}
