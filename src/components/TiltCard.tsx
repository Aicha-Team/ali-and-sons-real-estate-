"use client";

import { useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TiltCard({
  children,
  className,
  maxTilt = 4,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springX = useSpring(pointerX, { stiffness: 120, damping: 16, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 16, mass: 0.4 });

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
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
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn("h-full", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
