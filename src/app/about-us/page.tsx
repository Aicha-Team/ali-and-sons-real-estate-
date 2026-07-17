import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import { getSiteContent } from "@/lib/siteContent";
import { STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Ali & Sons Real Estate",
  description:
    "Learn about Ali & Sons Real Estate and Ali & Sons Holding — a family-owned conglomerate established in Abu Dhabi in 1979.",
};

const DEFAULT_ASRE_TEXT =
  "With the world choosing UAE as its preferred place of residence and workplace, Ali & Sons Real Estate fulfills this need. The company manages properties owned by Ali & Sons and manages other property owners' assets as well. Fully owned developments include properties such as C40 and C55 buildings located in Al Rawdhat, Abu Dhabi. Landmark properties under management include Sidra Tower & Sidra Village in Dubai. AS Business Centre is considered the operational hub of the ASRE management team.";

const DEFAULT_HOLDING_TEXT =
  "Ali & Sons Holding (ASH) is a family-owned conglomerate with strong presence in the automotive, commercial, oil & gas, retail, construction, property management, hospitality, manufacturing, marine engineering and information technology industries. ASH is associated with some of the most prestigious brands in the world. Ali & Sons was established in 1979 in Abu Dhabi under the leadership of H.E. Ali bin Khalfan Al Mutawa Al Dhaheri – Founder and Chairman of The Family Council.";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop";

export const revalidate = 60;

export default async function AboutUsPage() {
  const content = await getSiteContent();

  return (
    <div>
      <PageHero
        image={content.aboutHeroImage || DEFAULT_HERO_IMAGE}
        alt="Abu Dhabi architecture"
        eyebrow="Our Story"
        title="About Us"
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <FadeIn className="lg:col-span-4">
              <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
                Ali &amp; Sons Real Estate
              </span>
              <span className="mt-6 block h-px w-16 bg-charcoal/20" />
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-8">
              <h2 className="font-display font-normal text-4xl md:text-5xl leading-[1.1] mb-8">
                {content.aboutAsreHeading || "Property Management Across the UAE"}
              </h2>
              <p className="text-grey leading-[1.9] text-lg max-w-2xl whitespace-pre-line">
                {content.aboutAsreText || DEFAULT_ASRE_TEXT}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x md:divide-charcoal/10">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="px-4">
                <StatCounter
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={i * 0.1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <FadeIn className="lg:col-span-4">
              <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
                Our Parent Company
              </span>
              <span className="mt-6 block h-px w-16 bg-charcoal/20" />
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-8">
              <h2 className="font-display font-normal text-4xl md:text-5xl leading-[1.1] mb-8">
                {content.aboutHoldingHeading || "Ali & Sons Holding"}
              </h2>
              <p className="text-grey leading-[1.9] text-lg max-w-2xl whitespace-pre-line">
                {content.aboutHoldingText || DEFAULT_HOLDING_TEXT}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
