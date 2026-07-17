import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function ensureTaxonomyDoc(type, name) {
  const slug = slugify(name);
  const existing = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]{_id}`,
    { type, slug }
  );
  if (existing) return existing._id;

  const created = await client.create({
    _type: type,
    name,
    slug: { _type: "slug", current: slug },
  });
  console.log(`  Created ${type} "${name}" (${created._id})`);
  return created._id;
}

async function main() {
  const properties = await client.fetch(
    `*[_type == "property"]{_id, title, city, category, type}`
  );

  const needsMigration = properties.filter(
    (p) =>
      typeof p.city === "string" ||
      typeof p.category === "string" ||
      typeof p.type === "string"
  );

  if (needsMigration.length === 0) {
    console.log("No properties with legacy string city/category/type found — nothing to migrate.");
    return;
  }

  console.log(`Found ${needsMigration.length} propert(ies) to migrate.\n`);

  const cityIds = new Map();
  const categoryIds = new Map();
  const typeIds = new Map();

  for (const p of needsMigration) {
    const patch = {};

    if (typeof p.city === "string") {
      if (!cityIds.has(p.city)) {
        cityIds.set(p.city, await ensureTaxonomyDoc("city", p.city));
      }
      patch.city = { _type: "reference", _ref: cityIds.get(p.city) };
    }

    if (typeof p.category === "string") {
      if (!categoryIds.has(p.category)) {
        categoryIds.set(
          p.category,
          await ensureTaxonomyDoc("propertyCategory", p.category)
        );
      }
      patch.category = { _type: "reference", _ref: categoryIds.get(p.category) };
    }

    if (typeof p.type === "string") {
      if (!typeIds.has(p.type)) {
        typeIds.set(p.type, await ensureTaxonomyDoc("propertyType", p.type));
      }
      patch.type = { _type: "reference", _ref: typeIds.get(p.type) };
    }

    await client.patch(p._id).set(patch).commit();
    console.log(`Migrated "${p.title}" (${p._id})`);
  }

  console.log("\nMigration complete.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
