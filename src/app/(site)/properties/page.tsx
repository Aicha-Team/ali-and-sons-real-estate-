import { Suspense } from "react";
import type { Metadata } from "next";
import PropertiesFilterBar from "@/components/PropertiesFilterBar";
import PropertyCard from "@/components/PropertyCard";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import {
  getAllProperties,
  getCities,
  getPropertyCategories,
  getPropertyTypes,
} from "@/lib/properties";
import { Property } from "@/lib/types";

export const metadata: Metadata = {
  title: "Properties | Ali & Sons Real Estate",
  description: "Browse residential and commercial properties managed by ASRE across Abu Dhabi and Dubai.",
};

export const revalidate = 60;

function PropertiesGrid({
  properties,
  searchParams,
}: {
  properties: Property[];
  searchParams: { city?: string; category?: string; type?: string };
}) {
  const { city, category, type } = searchParams;

  const filtered = properties.filter((p) => {
    if (city && p.city.slug !== city) return false;
    if (category && p.category.slug !== category) return false;
    if (type && p.type.slug !== type) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
      <div className="mb-14 flex items-end justify-between border-b border-charcoal/10 pb-6">
        <p className="flex items-baseline gap-3">
          <span className="font-display font-normal text-4xl text-charcoal">
            {String(filtered.length).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-grey font-medium">
            {filtered.length === 1 ? "Property" : "Properties"} Available
          </span>
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-grey py-24 text-center">
          No properties match your filters. Try adjusting your search.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property, i) => (
            <FadeIn key={property.slug} delay={(i % 3) * 0.08}>
              <PropertyCard property={property} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; category?: string; type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const [properties, cities, categories, types] = await Promise.all([
    getAllProperties(),
    getCities(),
    getPropertyCategories(),
    getPropertyTypes(),
  ]);

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2400&auto=format&fit=crop"
        alt="Abu Dhabi skyline"
        eyebrow="Portfolio"
        title="Properties"
      />

      <Suspense>
        <PropertiesFilterBar cities={cities} categories={categories} types={types} />
      </Suspense>
      <PropertiesGrid properties={properties} searchParams={resolvedParams} />
    </div>
  );
}
