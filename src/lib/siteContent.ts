import type { Image as SanityImage } from "sanity";
import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { SITE_CONTENT_QUERY } from "@/sanity/queries";

type RawSiteContent = {
  heroImage?: SanityImage;
  heroEyebrow?: string;
  heroTitle?: string;
  aboutHeroImage?: SanityImage;
  whoWeAreText?: string;
  aboutAsreHeading?: string;
  aboutAsreText?: string;
  aboutHoldingHeading?: string;
  aboutHoldingText?: string;
};

export type SiteContent = {
  heroImage?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  aboutHeroImage?: string;
  whoWeAreText?: string;
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
    aboutHeroImage: doc.aboutHeroImage?.asset
      ? urlForImage(doc.aboutHeroImage).width(2000).url()
      : undefined,
    whoWeAreText: doc.whoWeAreText,
    aboutAsreHeading: doc.aboutAsreHeading,
    aboutAsreText: doc.aboutAsreText,
    aboutHoldingHeading: doc.aboutHoldingHeading,
    aboutHoldingText: doc.aboutHoldingText,
  };
}
