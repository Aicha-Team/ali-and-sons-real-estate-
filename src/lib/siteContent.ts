import type { Image as SanityImage } from "sanity";
import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { SITE_CONTENT_QUERY } from "@/sanity/queries";

type RawStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

type RawSiteContent = {
  heroImage?: SanityImage;
  heroEyebrow?: string;
  heroTitle?: string;
  stats?: RawStat[];
  businessCentreEyebrow?: string;
  businessCentreHeading?: string;
  businessCentreText?: string;
  businessCentreImage?: SanityImage;
  businessCentreButtonText?: string;
  whoWeAreEyebrow?: string;
  whoWeAreText?: string;
  whoWeAreButtonText?: string;
  aboutHeroImage?: SanityImage;
  aboutAsreHeading?: string;
  aboutAsreText?: string;
  aboutHoldingHeading?: string;
  aboutHoldingText?: string;
};

export type Stat = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
};

export type SiteContent = {
  heroImage?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  stats?: Stat[];
  businessCentreEyebrow?: string;
  businessCentreHeading?: string;
  businessCentreText?: string;
  businessCentreImage?: string;
  businessCentreButtonText?: string;
  whoWeAreEyebrow?: string;
  whoWeAreText?: string;
  whoWeAreButtonText?: string;
  aboutHeroImage?: string;
  aboutAsreHeading?: string;
  aboutAsreText?: string;
  aboutHoldingHeading?: string;
  aboutHoldingText?: string;
};

export async function getSiteContent(): Promise<SiteContent> {
  const doc = await sanityClient.fetch<RawSiteContent | null>(SITE_CONTENT_QUERY);
  if (!doc) return {};

  return {
    heroImage: doc.heroImage?.asset ? urlForImage(doc.heroImage).width(2400).url() : undefined,
    heroEyebrow: doc.heroEyebrow,
    heroTitle: doc.heroTitle,
    stats: doc.stats?.length
      ? doc.stats.map((s) => ({
          value: s.value,
          prefix: s.prefix ?? "",
          suffix: s.suffix ?? "",
          label: s.label,
        }))
      : undefined,
    businessCentreEyebrow: doc.businessCentreEyebrow,
    businessCentreHeading: doc.businessCentreHeading,
    businessCentreText: doc.businessCentreText,
    businessCentreImage: doc.businessCentreImage?.asset
      ? urlForImage(doc.businessCentreImage).width(1600).url()
      : undefined,
    businessCentreButtonText: doc.businessCentreButtonText,
    whoWeAreEyebrow: doc.whoWeAreEyebrow,
    whoWeAreText: doc.whoWeAreText,
    whoWeAreButtonText: doc.whoWeAreButtonText,
    aboutHeroImage: doc.aboutHeroImage?.asset
      ? urlForImage(doc.aboutHeroImage).width(2000).url()
      : undefined,
    aboutAsreHeading: doc.aboutAsreHeading,
    aboutAsreText: doc.aboutAsreText,
    aboutHoldingHeading: doc.aboutHoldingHeading,
    aboutHoldingText: doc.aboutHoldingText,
  };
}
