"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "a, button, [role='button'], [data-cursor-label]"
      );
      setHovering(!!target);
      setLabel(target?.getAttribute("data-cursor-label") ?? "");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  const hasLabel = label.length > 0;

  return (
    <>
      {/* Center dot — tracks instantly */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-200 ${
            hasLabel ? "h-0 w-0" : "h-1.5 w-1.5"
          }`}
        />
      </motion.div>

      {/* Trailing ring / label bubble */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9997] mix-blend-difference"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
            hasLabel
              ? "h-20 w-20 bg-white"
              : hovering
                ? "h-14 w-14 border border-white bg-transparent"
                : "h-8 w-8 border border-white/60 bg-transparent"
          }`}
        >
          {hasLabel && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-black">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
