import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FeaturedPropertiesShowcase from "@/components/FeaturedPropertiesShowcase";
import BusinessCentreStrip from "@/components/BusinessCentreStrip";
import ScrollHero3D from "@/components/ScrollHero3D";
import IntroLoader from "@/components/IntroLoader";
import StatCounter from "@/components/StatCounter";
import ScrollReveal from "@/components/ScrollReveal";
import OutlineMarquee from "@/components/OutlineMarquee";
import {
  getFeaturedProperties,
  getCities,
  getPropertyCategories,
  getPropertyTypes,
} from "@/lib/properties";
import { getSiteContent } from "@/lib/siteContent";
import { STATS } from "@/lib/constants";

const DEFAULT_WHO_WE_ARE =
  "Ali & Sons Real Estate manages properties owned by Ali & Sons and other property owners across the UAE — from Al Rawdhat, Abu Dhabi to landmark developments like Sidra Tower in Dubai.";

export const revalidate = 60;

export default async function Home() {
  const [featured, content, cities, categories, types] = await Promise.all([
    getFeaturedProperties(),
    getSiteContent(),
    getCities(),
    getPropertyCategories(),
    getPropertyTypes(),
  ]);

  const stats = content.stats?.length ? content.stats : STATS;

  return (
    <IntroLoader>
      <div>
        <ScrollHero3D
          image={content.heroImage}
          eyebrow={content.heroEyebrow}
          title={content.heroTitle}
          cities={cities}
          categories={categories}
          types={types}
        />

        {/* Stats strip */}
        <section className="bg-cream pt-24 pb-24 lg:pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x md:divide-charcoal/10">
              {stats.map((stat, i) => (
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

        <OutlineMarquee />

        <FeaturedPropertiesShowcase properties={featured} />

        <BusinessCentreStrip
          eyebrow={content.businessCentreEyebrow}
          heading={content.businessCentreHeading}
          text={content.businessCentreText}
          image={content.businessCentreImage}
          buttonText={content.businessCentreButtonText}
        />

        {/* About snippet */}
        <section className="bg-cream py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
                {content.whoWeAreEyebrow || "Who We Are"}
              </span>
            </FadeIn>
            <ScrollReveal
              baseOpacity={0.15}
              enableBlur
              baseRotation={2}
              blurStrength={6}
              containerClassName="mt-6 mx-auto max-w-3xl"
              textClassName="text-charcoal"
            >
              {content.whoWeAreText || DEFAULT_WHO_WE_ARE}
            </ScrollReveal>
            <FadeIn delay={0.1}>
              <Link
                href="/about-us"
                className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-charcoal border-b border-charcoal pb-1 hover:opacity-60 transition-opacity"
              >
                {content.whoWeAreButtonText || "About Us"} <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
        </section>
      </div>
    </IntroLoader>
  );
}
