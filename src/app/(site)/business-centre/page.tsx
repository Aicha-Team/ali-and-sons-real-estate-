import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import TiltCard from "@/components/TiltCard";
import ServiceIcon from "@/components/ServiceIcon";
import EnquiryForm from "@/components/EnquiryForm";
import { BUSINESS_CENTRE_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Business Centre | Ali & Sons Real Estate",
  description:
    "AS Business Centre — fully serviced and furnished office spaces in Abu Dhabi for start-ups and established companies.",
};

export default function BusinessCentrePage() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
        alt="AS Business Centre"
        eyebrow="Serviced Offices"
        title="AS Business Centre"
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <FadeIn>
            <p className="text-lg text-grey leading-relaxed">
              We provide fully serviced &amp; furnished office spaces that fulfill
              the need of start-up companies wanting to set up operations in Abu
              Dhabi. ASBC also provides solutions to established companies wanting
              a convenient, sensible, and cost-effective solution in Abu Dhabi.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
                What We Offer
              </span>
              <h2 className="font-display font-normal text-4xl md:text-5xl leading-[1.1] mt-4">Our Services</h2>
            </div>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_CENTRE_SERVICES.map((service, i) => (
              <FadeIn key={service.title} delay={(i % 3) * 0.08} className="h-full">
                <TiltCard maxTilt={3}>
                  <div className="bg-cream border border-charcoal/10 p-8 h-full flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)]">
                    <span className="text-charcoal">
                      <ServiceIcon name={service.icon} />
                    </span>
                    <h3 className="font-display font-normal text-xl">{service.title}</h3>
                    <p className="text-sm text-grey leading-relaxed">{service.description}</p>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-24 lg:py-32">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-cream/70 font-medium">
                Get Started
              </span>
              <h2 className="font-display font-normal text-4xl md:text-5xl leading-[1.1] mt-4">
                Interested in a Space?
              </h2>
            </div>
            <div className="bg-cream text-charcoal p-8">
              <EnquiryForm context="Business Centre Enquiry" />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
