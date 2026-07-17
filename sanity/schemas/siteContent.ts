import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Homepage Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroEyebrow",
      title: "Homepage Hero Small Label",
      type: "string",
      initialValue: "Find Your Space",
    }),
    defineField({
      name: "heroTitle",
      title: "Homepage Hero Headline",
      type: "string",
      initialValue: "Explore Our Portfolio",
    }),
    defineField({
      name: "aboutHeroImage",
      title: "About Us Page — Header Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "whoWeAreText",
      title: "\"Who We Are\" Text (shown on Homepage)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutAsreHeading",
      title: "About Us Page — ASRE Section Heading",
      type: "string",
      initialValue: "Property Management Across the UAE",
    }),
    defineField({
      name: "aboutAsreText",
      title: "About Us Page — ASRE Section Text",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "aboutHoldingHeading",
      title: "About Us Page — Parent Company Section Heading",
      type: "string",
      initialValue: "Ali & Sons Holding",
    }),
    defineField({
      name: "aboutHoldingText",
      title: "About Us Page — Parent Company Section Text",
      type: "text",
      rows: 6,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Content (Homepage & About Us)" };
    },
  },
});
