"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Ruler } from "lucide-react";
import { Property } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function PropertyCard({ property }: { property: Property }) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springX = useSpring(pointerX, { stiffness: 120, damping: 16, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 16, mass: 0.4 });

  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-4, 4]);

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
    <div style={{ perspective: 1000 }}>
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group bg-cream overflow-hidden flex flex-col shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.18)] transition-shadow"
      >
        <Link href={`/properties/${property.slug}`} className="block relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.coverImage}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 bg-white text-[#1c1c1c] text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 font-medium">
            {property.type}
          </span>
        </Link>
        <div className="p-6 flex flex-col gap-3 flex-1">
          <span className="text-xs uppercase tracking-[0.15em] text-grey font-medium">
            {property.category}
          </span>
          <Link href={`/properties/${property.slug}`}>
            <h3 className="font-display font-normal text-2xl leading-snug hover:text-charcoal/60 transition-colors">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-4 text-sm text-grey">
            <span className="flex items-center gap-1">
              <MapPin size={15} /> {property.city}
            </span>
            <span className="flex items-center gap-1">
              <Ruler size={15} /> {property.size}
            </span>
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-charcoal/10">
            <span className="font-display font-normal text-xl text-charcoal">
              {formatPrice(property.price)}
            </span>
            <Link
              href={`/properties/${property.slug}`}
              className="text-xs uppercase tracking-[0.15em] font-medium text-charcoal border-b border-charcoal hover:opacity-60 transition-opacity"
            >
              View Details →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
