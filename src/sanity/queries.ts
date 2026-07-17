import { groq } from "next-sanity";

export const PROPERTIES_QUERY = groq`*[_type == "property"] | order(featured desc, _createdAt desc)`;

export const FEATURED_PROPERTIES_QUERY = groq`*[_type == "property" && featured == true]`;

export const PROPERTY_BY_SLUG_QUERY = groq`*[_type == "property" && slug.current == $slug][0]`;

export const SITE_CONTENT_QUERY = groq`*[_type == "siteContent"][0]`;

export const BUSINESS_CENTRE_QUERY = groq`*[_type == "businessCentre"][0]`;
