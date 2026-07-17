import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, ArrowUpRight, Video } from "lucide-react";
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

  // Satellite map embed built from the address — same design as the contact page.
  const mapSrc = property.address
    ? `https://www.google.com/maps?q=${encodeURIComponent(property.address)}&t=k&output=embed`
    : property.googleMapsUrl;

  const specs = [
    { label: "City", value: property.city.name },
    { label: "Category", value: property.category.name },
    { label: "Type", value: property.type.name },
    { label: "Size", value: property.size },
    { label: "Price", value: formatPrice(property.price) },
  ];

  const details: { label: string; value: string }[] = [
    { label: "City", value: property.city.name },
    { label: "Category", value: property.category.name },
    { label: "Type", value: property.type.name },
    { label: "Size", value: property.size },
    { label: "Price", value: formatPrice(property.price) },
    ...(property.address ? [{ label: "Address", value: property.address }] : []),
  ];

  return (
    <div>
      <PageHero
        image={property.coverImage}
        alt={property.title}
        eyebrow={property.type.name}
        title={property.title}
        className="h-[60vh] min-h-[420px]"
      />

      {/* Futuristic spec strip */}
      <section className="relative bg-charcoal text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 md:divide-x md:divide-white/10">
          {specs.map((spec) => (
            <div key={spec.label} className="px-2 md:px-6 first:md:pl-0">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-medium">
                {spec.label}
              </span>
              <p className="mt-2 font-display font-normal text-xl md:text-2xl leading-tight">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
              Visual Tour
            </span>
            <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] mt-4 mb-10">
              Gallery
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <PropertyGallery images={property.gallery} title={property.title} />
          </FadeIn>
        </div>
      </section>

      {/* Description */}
      <section className="bg-cream pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
              The Property
            </span>
            <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] mt-4">
              About This Space
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-8">
            <p className="font-display font-normal text-xl md:text-2xl leading-[1.75] text-charcoal/75">
              {property.description}
            </p>
            {property.address && (
              <p className="mt-8 flex items-start gap-2 text-sm text-grey border-t border-charcoal/10 pt-6">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {property.address}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Virtual tour — only when available */}
      {property.virtualTourUrl && (
        <section className="bg-cream pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
                Immersive View
              </span>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] mt-4 mb-10 flex items-center gap-3">
                <Video size={26} className="text-charcoal" /> Virtual Tour
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden border border-charcoal/10 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.25)] aspect-video">
                <iframe
                  src={property.virtualTourUrl}
                  title={`${property.title} — virtual tour`}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Location — same card design as contact page */}
      {mapSrc && (
        <section className="bg-cream pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
                Where You&apos;ll Be
              </span>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] mt-4 mb-10">
                Location
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="relative block rounded-2xl overflow-hidden border border-charcoal/10 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.25)] aspect-[21/9] min-h-[380px]">
              <iframe
                src={mapSrc}
                title={`${property.title} — location`}
                className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[1.05]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              {property.address && (
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm">
                  <div className="rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-5 flex items-start gap-4">
                    <span className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-charcoal text-white">
                      <MapPin size={18} strokeWidth={1.5} />
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-grey font-medium">
                        Property Location
                      </span>
                      <p className="text-sm text-charcoal leading-relaxed mt-1 mb-3">
                        {property.address}
                      </p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(property.address)}`}
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
              )}
            </FadeIn>
          </div>
        </section>
      )}

      {/* Enquiry — same design as the contact page */}
      <section className="bg-cream pb-24 lg:pb-32 border-t border-charcoal/10 pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-grey font-medium">
              Property Details
            </span>
            <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.1] mt-4 mb-10">
              At a Glance
            </h2>
            <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {details.map((detail) => (
                <div key={detail.label} className="grid grid-cols-3 gap-4 py-5">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-grey self-center">
                    {detail.label}
                  </dt>
                  <dd className="col-span-2 text-sm text-charcoal leading-relaxed">
                    {detail.value}
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
              Enquire About This Property
            </h2>
            <EnquiryForm context={property.title} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
