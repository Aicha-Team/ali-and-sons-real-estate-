"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ThemeTogglerButton from "@/components/ThemeTogglerButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-charcoal/40 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20 md:h-24">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/ali-sons-real-estate-logo.png"
            alt="Ali & Sons Real Estate"
            width={80}
            height={80}
            className="h-14 w-14 md:h-16 md:w-16 object-contain"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "group/nav relative text-[11px] uppercase tracking-[0.12em] font-medium transition-colors duration-300",
                    active ? "text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute -bottom-1.5 left-0 h-px bg-white transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover/nav:w-full"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeTogglerButton
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-transparent"
          />

          <a
            href={`https://wa.me/${SITE.phone.replace(/\s/g, "").replace(/^0/, "971")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] font-medium text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors duration-300"
          >
            <MessageCircle size={13} />
            Chat
          </a>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 top-20 z-40 bg-charcoal/90 backdrop-blur-2xl flex flex-col">
          <ul className="flex flex-col items-center justify-center flex-1 gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-display text-3xl",
                    pathname === link.href
                      ? "text-white underline underline-offset-4"
                      : "text-white/80"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${SITE.phone.replace(/\s/g, "").replace(/^0/, "971")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-white/25 text-white mx-6 mb-10 py-4 text-sm uppercase tracking-wider font-medium backdrop-blur-md"
          >
            <MessageCircle size={16} />
            Chat with Us
          </a>
        </div>
      )}
    </header>
  );
}
