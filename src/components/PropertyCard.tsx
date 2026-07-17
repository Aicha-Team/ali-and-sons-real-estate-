"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Property } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group"
    >
      <Link href={`/properties/${property.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={property.coverImage}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent"
          />

          {/* Type chip — refined glass */}
          <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-charcoal text-[10px] uppercase tracking-[0.2em] px-3.5 py-2 font-medium">
            {property.type.name}
          </span>

          {/* Hover CTA */}
          <motion.span
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-white"
          >
            View
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-md">
              <ArrowRight size={13} />
            </span>
          </motion.span>
        </div>

        {/* Editorial text block — no card chrome */}
        <div className="pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-grey font-medium">
              {property.city.name} — {property.category.name}
            </span>
            <span className="text-[11px] tracking-[0.05em] text-grey shrink-0">
              {property.size}
            </span>
          </div>

          <h3 className="mt-3 font-display font-normal text-[1.65rem] leading-[1.2] text-charcoal transition-colors duration-300 group-hover:text-charcoal/60">
            {property.title}
          </h3>

          <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-center justify-between">
            <span className="font-display font-normal text-xl text-charcoal tracking-wide">
              {formatPrice(property.price)}
            </span>
            <span className="relative text-[10px] uppercase tracking-[0.2em] font-medium text-charcoal">
              Details
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-charcoal transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
