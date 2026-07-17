"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Landmark, Briefcase, MapPin, type LucideIcon } from "lucide-react";
import { Property } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type MarqueeLogo = {
  name: string;
  icon: LucideIcon;
};

const MARQUEE_LOGOS: MarqueeLogo[] = [
  { name: "C40 Building", icon: Building2 },
  { name: "C55 Building", icon: Building2 },
  { name: "Sidra Tower", icon: Landmark },
  { name: "Sidra Village", icon: Landmark },
  { name: "AS Business Centre", icon: Briefcase },
  { name: "C09 Building", icon: Building2 },
  { name: "Al Rawdhat", icon: MapPin },
  { name: "Umm Al Nar", icon: MapPin },
];

function MarqueeIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon size={18} strokeWidth={1.75} className="text-charcoal" />;
}

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1C1C1C">
      <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
    </svg>
  );
}

function PixelOverlay() {
  const cols = 12;
  const rows = 8;
  const blocks = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const delayIn = (row + col) * 0.018;
      const delayOut = (rows - row + (cols - col)) * 0.012;
      blocks.push(
        <motion.div
          key={`${row}-${col}`}
          className="absolute bg-black/80"
          style={{
            left: `${(col * 100) / cols}%`,
            top: `${(row * 100) / rows}%`,
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          variants={{
            hover: {
              scale: 1,
              opacity: 1,
              transition: { duration: 0.25, delay: delayIn },
            },
            rest: {
              scale: 0,
              opacity: 0,
              transition: { duration: 0.25, delay: delayOut },
            },
          }}
        />
      );
    }
  }
  return <div className="pointer-events-none absolute inset-0 overflow-hidden">{blocks}</div>;
}

function PropertyShowcaseCard({ property, index }: { property: Property; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      data-cursor-label="View"
      className="group relative aspect-[4/3] w-[85vw] sm:w-[55vw] lg:w-[38vw] shrink-0 overflow-hidden"
    >
      <Link href={`/properties/${property.slug}`} className="absolute inset-0" aria-label={property.title}>
        <img
          src={property.coverImage}
          alt={property.title}
          className="absolute h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      <motion.div initial="rest" animate={hovered ? "hover" : "rest"}>
        <PixelOverlay />
      </motion.div>

      <div
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-white/40 text-xs text-white dark:text-white"
        style={{ zIndex: 10 }}
      >
        <Link href={`/properties/${property.slug}`} aria-label={`View ${property.title}`}>
          +
        </Link>
      </div>

      <span className="absolute left-5 top-4 z-10 text-[11px] font-medium tracking-[0.2em] text-white/70">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className="absolute bottom-0 left-0 bg-white px-5 pb-4 pt-3"
        style={{ zIndex: 20, maxWidth: "70%" }}
      >
        <h3
          className="font-display font-normal leading-tight text-[#1c1c1c]"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
        >
          {property.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-4">
          <span className="text-[12px] uppercase tracking-[0.1em] text-[#6b6b6b]">{property.city.name}</span>
          <span className="text-[12px] font-medium text-[#1c1c1c]">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedPropertiesShowcase({
  properties,
}: {
  properties: Property[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -getAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getAmount()}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="bg-cream text-charcoal">
      <section ref={sectionRef} className="relative flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-12 w-full max-w-7xl px-6 sm:px-10 lg:px-16"
        >
          <span className="mb-5 inline-block text-xs uppercase tracking-[0.25em] font-medium text-grey">
            Our Portfolio
          </span>
          <h2 className="font-display font-normal leading-[1.15] text-[clamp(2rem,4vw,3.25rem)]">
            <span className="text-charcoal">Discover Our </span>
            <span className="text-charcoal/40">Featured Properties</span>
          </h2>
        </motion.div>

        <div ref={trackRef} className="flex w-max items-stretch gap-6 pl-6 pr-[15vw] sm:pl-10 lg:pl-16 will-change-transform">
          {properties.map((property, i) => (
            <PropertyShowcaseCard key={property.slug} property={property} index={i} />
          ))}
        </div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-grey">
            Scroll to explore
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <div className="mb-4 flex h-7 w-7 items-center justify-center border border-charcoal/20 text-xs text-charcoal">
              +
            </div>
            <p className="text-[14px] leading-[1.7] text-grey">
              We manage residential and commercial properties across Abu Dhabi
              and Dubai — from fully owned developments to landmark towers,
              backed by a dedicated management team.
            </p>
            <Link href="/properties" className="group mt-6 inline-flex items-end">
              <span className="inline-flex items-center gap-[10px] bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium text-cream transition-colors group-hover:bg-charcoal/85">
                View All Properties
              </span>
              <span className="mb-6 flex h-6 w-6 items-center justify-center bg-charcoal transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mb-9">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>

          <div className="flex-1 overflow-hidden border-t border-charcoal/10 md:ml-12 md:border-t-0">
            <div className="overflow-hidden py-5">
              <div className="marquee-projects flex w-max">
                {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
                  <div key={i} className="flex shrink-0 items-center gap-2.5 px-8">
                    <MarqueeIcon icon={logo.icon} />
                    <span className="whitespace-nowrap text-sm font-medium tracking-wide text-charcoal/70">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeProjects {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-projects {
          animation: marqueeProjects 28s linear infinite;
        }
        .marquee-projects:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
