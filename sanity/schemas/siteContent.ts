import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Homepage — Hero", options: { collapsible: true } },
    { name: "stats", title: "Homepage — Stats", options: { collapsible: true } },
    {
      name: "businessCentreTeaser",
      title: "Homepage — Business Centre Teaser",
      options: { collapsible: true },
    },
    {
      name: "whoWeAre",
      title: "Homepage — Who We Are",
      options: { collapsible: true },
    },
    {
      name: "aboutHero",
      title: "About Us Page — Header",
      options: { collapsible: true },
    },
    {
      name: "aboutAsre",
      title: "About Us Page — ASRE Section",
      options: { collapsible: true },
    },
    {
      name: "aboutHolding",
      title: "About Us Page — Parent Company Section",
      options: { collapsible: true },
    },
  ],
  fields: [
    // Homepage hero
    defineField({
      name: "heroImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "hero",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Small Label",
      type: "string",
      initialValue: "Find Your Space",
      fieldset: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Headline",
      type: "string",
      initialValue: "Explore Our Portfolio",
      fieldset: "hero",
    }),

    // Stats
    defineField({
      name: "stats",
      title: "Stats",
      description: "The counters shown near the top of the homepage.",
      type: "array",
      fieldset: "stats",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Number", type: "number", validation: (Rule) => Rule.required() }),
            defineField({ name: "prefix", title: "Prefix (shown before the number)", type: "string" }),
            defineField({ name: "suffix", title: "Suffix (shown after the number, e.g. + or /7)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { value: "value", prefix: "prefix", suffix: "suffix", label: "label" },
            prepare({ value, prefix, suffix, label }) {
              return { title: `${prefix ?? ""}${value}${suffix ?? ""}`, subtitle: label };
            },
          },
        },
      ],
    }),

    // Business Centre teaser
    defineField({
      name: "businessCentreEyebrow",
      title: "Small Label",
      type: "string",
      initialValue: "AS Business Centre",
      fieldset: "businessCentreTeaser",
    }),
    defineField({
      name: "businessCentreHeading",
      title: "Heading",
      type: "string",
      initialValue: "Fully Serviced Office Spaces in Abu Dhabi",
      fieldset: "businessCentreTeaser",
    }),
    defineField({
      name: "businessCentreText",
      title: "Paragraph",
      type: "text",
      rows: 4,
      fieldset: "businessCentreTeaser",
    }),
    defineField({
      name: "businessCentreImage",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "businessCentreTeaser",
    }),
    defineField({
      name: "businessCentreButtonText",
      title: "Button Text",
      type: "string",
      initialValue: "Learn More",
      fieldset: "businessCentreTeaser",
    }),

    // Who We Are
    defineField({
      name: "whoWeAreEyebrow",
      title: "Small Label",
      type: "string",
      initialValue: "Who We Are",
      fieldset: "whoWeAre",
    }),
    defineField({
      name: "whoWeAreText",
      title: "Text",
      type: "text",
      rows: 4,
      fieldset: "whoWeAre",
    }),
    defineField({
      name: "whoWeAreButtonText",
      title: "Button Text",
      type: "string",
      initialValue: "About Us",
      fieldset: "whoWeAre",
    }),

    // About Us page — header
    defineField({
      name: "aboutHeroImage",
      title: "Header Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "aboutHero",
    }),

    // About Us page — ASRE section
    defineField({
      name: "aboutAsreHeading",
      title: "Heading",
      type: "string",
      initialValue: "Property Management Across the UAE",
      fieldset: "aboutAsre",
    }),
    defineField({
      name: "aboutAsreText",
      title: "Text",
      type: "text",
      rows: 6,
      fieldset: "aboutAsre",
    }),

    // About Us page — Parent Company section
    defineField({
      name: "aboutHoldingHeading",
      title: "Heading",
      type: "string",
      initialValue: "Ali & Sons Holding",
      fieldset: "aboutHolding",
    }),
    defineField({
      name: "aboutHoldingText",
      title: "Text",
      type: "text",
      rows: 6,
      fieldset: "aboutHolding",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Content (Homepage & About Us)" };
    },
  },
});
