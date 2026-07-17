export interface Taxonomy {
  name: string;
  slug: string;
}

export interface Property {
  slug: string;
  title: string;
  city: Taxonomy;
  category: Taxonomy;
  type: Taxonomy;
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
