"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const textVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0 },
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop";

export default function BusinessCentreStrip({
  eyebrow = "AS Business Centre",
  heading = "Fully Serviced Office Spaces in Abu Dhabi",
  text = "We provide fully serviced & furnished office spaces that fulfill the need of start-up companies wanting to set up operations in Abu Dhabi — plus convenient, cost-effective solutions for established businesses.",
  image = DEFAULT_IMAGE,
  buttonText = "Learn More",
}: {
  eyebrow?: string;
  heading?: string;
  text?: string;
  image?: string;
  buttonText?: string;
}) {
  return (
    <section className="bg-offwhite overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid gap-16 lg:grid-cols-2 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.span
            variants={textVariants}
            transition={{ duration: 0.6, ease: EASE }}
            className="block text-xs uppercase tracking-[0.25em] text-grey font-medium"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={textVariants}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-display font-normal text-charcoal mt-4 text-4xl md:text-5xl leading-[1.1]"
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={textVariants}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-6 text-grey leading-relaxed max-w-lg"
          >
            {text}
          </motion.p>
          <motion.div variants={textVariants} transition={{ duration: 0.6, ease: EASE }}>
            <Link
              href="/business-centre"
              className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-charcoal border-b border-charcoal pb-1 hover:opacity-60 transition-opacity"
            >
              {buttonText} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative aspect-[4/3]"
        >
          <Image src={image} alt="AS Business Centre office space" fill className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
