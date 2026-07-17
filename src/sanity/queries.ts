import { groq } from "next-sanity";

const PROPERTY_PROJECTION = groq`{
  ...,
  city->{name, "slug": slug.current},
  category->{name, "slug": slug.current},
  type->{name, "slug": slug.current}
}`;

export const PROPERTIES_QUERY = groq`*[_type == "property"] | order(featured desc, _createdAt desc) ${PROPERTY_PROJECTION}`;

export const FEATURED_PROPERTIES_QUERY = groq`*[_type == "property" && featured == true] ${PROPERTY_PROJECTION}`;

export const PROPERTY_BY_SLUG_QUERY = groq`*[_type == "property" && slug.current == $slug][0] ${PROPERTY_PROJECTION}`;

export const SITE_CONTENT_QUERY = groq`*[_type == "siteContent"][0]`;

export const BUSINESS_CENTRE_QUERY = groq`*[_type == "businessCentre"][0]`;

export const CITIES_QUERY = groq`*[_type == "city"] | order(order asc, name asc){name, "slug": slug.current}`;

export const PROPERTY_CATEGORIES_QUERY = groq`*[_type == "propertyCategory"] | order(order asc, name asc){name, "slug": slug.current}`;

export const PROPERTY_TYPES_QUERY = groq`*[_type == "propertyType"] | order(order asc, name asc){name, "slug": slug.current}`;
