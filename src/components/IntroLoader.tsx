"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const SESSION_KEY = "asre-intro-seen";
const MIN_DISPLAY_MS = 2400;
const DOOR_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function IntroLoader({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      setShow(false);
      return;
    }
    setShow(true);
    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
    }, MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <>
      <AnimatePresence>
        {show && (
          <div key="intro" className="fixed inset-0 z-[999] overflow-hidden">
            {/* Left door panel */}
            <motion.div
              initial={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.6, ease: DOOR_EASE, delay: 0.15 }}
              className="absolute inset-y-0 left-0 w-1/2 bg-cream"
            />
            {/* Right door panel */}
            <motion.div
              initial={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.6, ease: DOOR_EASE, delay: 0.15 }}
              className="absolute inset-y-0 right-0 w-1/2 bg-cream"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <Image
                src="/ali-sons-real-estate-logo-black.png"
                alt="Ali & Sons Real Estate"
                width={96}
                height={96}
                className="h-20 w-20 md:h-24 md:w-24 object-contain dark:invert"
                priority
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
