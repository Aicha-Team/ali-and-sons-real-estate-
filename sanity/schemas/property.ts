import { defineField, defineType } from "sanity";
import { AutoSlugInput } from "../components/AutoSlugInput";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      hidden: true,
      components: { input: AutoSlugInput },
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "reference",
      to: [{ type: "city" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "propertyCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "reference",
      to: [{ type: "propertyType" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "AED",
    }),
    defineField({
      name: "sqm",
      title: "Size",
      type: "string",
      description: "e.g. 135.43 Sq.M or 1,027.36 Sq.Ft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "virtualTourUrl",
      title: "Virtual Tour URL",
      type: "url",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Embed URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      cityName: "city.name",
      categoryName: "category.name",
      typeName: "type.name",
      media: "coverImage",
    },
    prepare({ title, cityName, categoryName, typeName, media }) {
      const missing = [
        !cityName && "City",
        !categoryName && "Category",
        !typeName && "Type",
      ].filter(Boolean) as string[];

      return {
        title,
        subtitle:
          missing.length > 0
            ? `⚠ Missing ${missing.join(", ")}`
            : cityName,
        media,
      };
    },
  },
});
