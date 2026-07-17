import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "next-sanity";
import { properties } from "../src/lib/properties.ts";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImageFromUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = url.split("/").pop().split("?")[0] || "image.jpg";
  const asset = await client.assets.upload("image", buffer, { filename });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function migrateProperty(property) {
  const existing = await client.fetch(
    `*[_type == "property" && slug.current == $slug][0]{_id}`,
    { slug: property.slug }
  );
  if (existing) {
    console.log(`Skipping "${property.title}" — already exists.`);
    return;
  }

  console.log(`Uploading images for "${property.title}"...`);
  const coverImage = await uploadImageFromUrl(property.coverImage);
  const gallery = [];
  for (const src of property.gallery) {
    gallery.push(await uploadImageFromUrl(src));
  }

  const doc = {
    _type: "property",
    title: property.title,
    slug: { _type: "slug", current: property.slug },
    city: property.city,
    category: property.category,
    type: property.type,
    price: property.price,
    currency: property.currency,
    sqm: property.size,
    address: property.address,
    description: property.description,
    coverImage,
    gallery,
    googleMapsUrl: property.googleMapsUrl,
    featured: property.featured,
  };

  const created = await client.create(doc);
  console.log(`Created "${property.title}" (${created._id})`);
}

async function main() {
  console.log(`Migrating ${properties.length} properties into Sanity...\n`);
  for (const property of properties) {
    await migrateProperty(property);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
