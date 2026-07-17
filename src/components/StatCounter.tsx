"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function StatCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
  label,
  delay = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => motionValue.set(to), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, to, motionValue, delay]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <p
        ref={ref}
        className="font-sans font-bold text-charcoal text-5xl md:text-6xl tabular-nums tracking-tight"
      >
        {prefix}0{suffix}
      </p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-grey">{label}</p>
    </motion.div>
  );
}
