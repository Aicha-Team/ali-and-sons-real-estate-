import type { Metadata } from "next";
import { MapPin, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Ali & Sons Real Estate",
  description: "Get in touch with Ali & Sons Real Estate in Abu Dhabi, UAE.",
};

const DETAILS: { label: string; value: string; href?: string }[] = [
  { label: "Address", value: SITE.address },
  { label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  { label: "Fax", value: SITE.fax },
  { label: "P.O. Box", value: SITE.poBox },
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
];

export default function ContactUsPage() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        alt="Modern building facade"
        eyebrow="Get In Touch"
        title="Contact Us"
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
              Our Details
            </span>
            <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] mt-4 mb-10">
              We&apos;d Love to Hear From You
            </h2>
            <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {DETAILS.map((detail) => (
                <div key={detail.label} className="grid grid-cols-3 gap-4 py-5">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-grey self-center">
                    {detail.label}
                  </dt>
                  <dd className="col-span-2 text-sm text-charcoal leading-relaxed">
                    {detail.href ? (
                      <a href={detail.href} className="hover:opacity-60 transition-opacity">
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
              Send an Enquiry
            </span>
            <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] mt-4 mb-10">
              Start a Conversation
            </h2>
            <EnquiryForm context="General Contact" />
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="relative rounded-2xl overflow-hidden border border-charcoal/10 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.25)] aspect-[21/9] min-h-[420px]">
            <iframe
              src={SITE.mapsEmbedSatellite}
              title="Ali & Sons Real Estate location — satellite view"
              className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[1.05]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm pointer-events-auto">
              <div className="rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-5 flex items-start gap-4">
                <span className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-charcoal text-white">
                  <MapPin size={18} strokeWidth={1.5} />
                </span>
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-grey font-medium">
                    Our Location
                  </span>
                  <p className="text-sm text-charcoal leading-relaxed mt-1 mb-3">
                    {SITE.address}
                  </p>
                  <a
                    href={SITE.mapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-medium text-charcoal hover:opacity-60 transition-opacity"
                  >
                    Get Directions
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
