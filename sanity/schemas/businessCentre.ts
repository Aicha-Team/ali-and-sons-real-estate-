import { defineField, defineType } from "sanity";

export default defineType({
  name: "businessCentre",
  title: "Business Centre",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "service",
          fields: [
            defineField({ name: "icon", title: "Icon Name", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "intro" },
  },
});
