import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Ruler, Tag, Video } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import PageHero from "@/components/PageHero";
import PropertyGallery from "@/components/PropertyGallery";
import EnquiryForm from "@/components/EnquiryForm";
import { getPropertyBySlug, getAllProperties } from "@/lib/properties";
import { formatPrice } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: `${property.title} | Ali & Sons Real Estate`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  return (
    <div>
      <PageHero
        image={property.coverImage}
        alt={property.title}
        eyebrow={property.type}
        title={property.title}
        className="h-[50vh] min-h-[360px]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid gap-16 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-16">
          <FadeIn>
            <h2 className="font-display font-normal text-3xl leading-[1.1] mb-6">Gallery</h2>
            <PropertyGallery images={property.gallery} title={property.title} />
          </FadeIn>

          <FadeIn>
            <h2 className="font-display font-normal text-3xl leading-[1.1] mb-6">Description</h2>
            <p className="text-grey leading-relaxed">{property.description}</p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-charcoal/10 py-8">
              <div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grey">
                  <MapPin size={14} /> City
                </span>
                <p className="mt-2 font-display font-normal text-xl">{property.city}</p>
              </div>
              <div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grey">
                  <Tag size={14} /> Category
                </span>
                <p className="mt-2 font-display font-normal text-xl">{property.category}</p>
              </div>
              <div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grey">
                  <Ruler size={14} /> Size
                </span>
                <p className="mt-2 font-display font-normal text-xl">{property.size}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-grey">Price</span>
                <p className="mt-2 font-display font-normal text-xl text-charcoal">
                  {formatPrice(property.price)}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-grey">{property.address}</p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-display font-normal text-3xl leading-[1.1] mb-6 flex items-center gap-2">
              <Video size={20} className="text-charcoal" /> Virtual Tour
            </h2>
            <div className="aspect-video bg-offwhite border border-charcoal/10 flex items-center justify-center">
              <p className="text-grey text-sm">Virtual tour coming soon</p>
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="font-display font-normal text-3xl leading-[1.1] mb-6">Location</h2>
            <div className="aspect-video border border-charcoal/10">
              <iframe
                src={property.googleMapsUrl}
                title="Property location"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-1">
          <FadeIn>
            <div className="bg-offwhite border border-charcoal/10 p-8 sticky top-28">
              <h2 className="font-display font-normal text-2xl leading-[1.1] mb-2">Enquire About This Property</h2>
              <p className="text-sm text-grey mb-6">
                Fill out the form below and our team will get back to you shortly.
              </p>
              <EnquiryForm context={property.title} />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
