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

async function pinDocumentId(type, fixedId) {
  const existing = await client.fetch(`*[_type == $type][0]`, { type });

  if (!existing) {
    console.log(`No "${type}" document found — nothing to migrate.`);
    return;
  }

  if (existing._id === fixedId) {
    console.log(`"${type}" already has the fixed ID — skipping.`);
    return;
  }

  console.log(`Migrating "${type}" from ${existing._id} to ${fixedId}...`);
  const { _id, _rev, ...rest } = existing;
  await client.createOrReplace({ _id: fixedId, ...rest });
  await client.delete(_id);
  console.log(`Done. "${type}" is now at _id: ${fixedId}`);
}

async function main() {
  await pinDocumentId("siteContent", "siteContent");
  await pinDocumentId("businessCentre", "businessCentre");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
