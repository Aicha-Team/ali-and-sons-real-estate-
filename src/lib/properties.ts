import type { Image as SanityImage } from "sanity";
import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import {
  PROPERTIES_QUERY,
  FEATURED_PROPERTIES_QUERY,
  PROPERTY_BY_SLUG_QUERY,
  CITIES_QUERY,
  PROPERTY_CATEGORIES_QUERY,
  PROPERTY_TYPES_QUERY,
} from "@/sanity/queries";
import { Property, Taxonomy } from "./types";

type SanityProperty = {
  title: string;
  slug: { current: string };
  city: Property["city"];
  category: Property["category"];
  type: Property["type"];
  price: number;
  currency?: "AED";
  sqm: string;
  address?: string;
  description?: string;
  coverImage: SanityImage;
  gallery?: SanityImage[];
  virtualTourUrl?: string;
  googleMapsUrl?: string;
  featured?: boolean;
};

function toProperty(doc: SanityProperty): Property {
  return {
    slug: doc.slug.current,
    title: doc.title,
    city: doc.city,
    category: doc.category,
    type: doc.type,
    price: doc.price,
    currency: doc.currency ?? "AED",
    size: doc.sqm,
    address: doc.address ?? "",
    description: doc.description ?? "",
    coverImage: doc.coverImage?.asset
      ? urlForImage(doc.coverImage).width(1600).url()
      : "",
    gallery: (doc.gallery ?? [])
      .filter((img) => img?.asset)
      .map((img) => urlForImage(img).width(1600).url()),
    virtualTourUrl: doc.virtualTourUrl,
    googleMapsUrl: doc.googleMapsUrl,
    featured: doc.featured ?? false,
  };
}

export async function getAllProperties(): Promise<Property[]> {
  const docs = await sanityClient.fetch<SanityProperty[]>(PROPERTIES_QUERY);
  return docs.map(toProperty);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const docs = await sanityClient.fetch<SanityProperty[]>(FEATURED_PROPERTIES_QUERY);
  return docs.map(toProperty);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const doc = await sanityClient.fetch<SanityProperty | null>(PROPERTY_BY_SLUG_QUERY, {
    slug,
  });
  return doc ? toProperty(doc) : undefined;
}

export async function getCities(): Promise<Taxonomy[]> {
  return sanityClient.fetch<Taxonomy[]>(CITIES_QUERY);
}

export async function getPropertyCategories(): Promise<Taxonomy[]> {
  return sanityClient.fetch<Taxonomy[]>(PROPERTY_CATEGORIES_QUERY);
}

export async function getPropertyTypes(): Promise<Taxonomy[]> {
  return sanityClient.fetch<Taxonomy[]>(PROPERTY_TYPES_QUERY);
}
