export type PropertyCity = "Abu Dhabi" | "Dubai";
export type PropertyCategory = "Residential" | "Commercial";
export type PropertyType = "For Rent" | "For Sale";

export interface Property {
  slug: string;
  title: string;
  city: PropertyCity;
  category: PropertyCategory;
  type: PropertyType;
  price: number;
  currency: "AED";
  size: string;
  address: string;
  description: string;
  coverImage: string;
  gallery: string[];
  virtualTourUrl?: string;
  googleMapsUrl?: string;
  featured?: boolean;
}
