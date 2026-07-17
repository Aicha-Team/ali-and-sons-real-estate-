import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-auto">
      {/* Brand statement */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <Image
              src="/ali-sons-real-estate-logo.png"
              alt="Ali & Sons Real Estate"
              width={56}
              height={56}
              className="h-14 w-14 object-contain dark:invert"
            />
            <p className="mt-8 font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-2xl">
              Ali &amp; Sons
              <br />
              <span className="text-cream/40">Real Estate</span>
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE.phone.replace(/\s/g, "").replace(/^0/, "971")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-cream border-b border-cream/30 pb-2 hover:border-cream transition-colors self-start md:self-end"
          >
            Chat with Us
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-cream/50 mb-6">
              About
            </h3>
            <p className="text-sm text-cream/60 leading-[1.8] max-w-xs">
              A division of Ali &amp; Sons Holding — trusted property management
              across Abu Dhabi and Dubai since 1979.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-cream/50 mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-cream/50 mb-6">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-cream/60 leading-relaxed">
              <li>{SITE.address}</li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="hover:text-cream transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-cream transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li>P.O. Box {SITE.poBox}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-cream/40">
          <span>© 2025 Ali &amp; Sons Real Estate LLC. All rights reserved.</span>
          <span className="uppercase tracking-[0.2em]">Abu Dhabi — Dubai</span>
        </div>
      </div>
    </footer>
  );
}
