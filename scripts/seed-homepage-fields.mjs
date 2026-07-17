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

async function main() {
  const existing = await client.fetch(`*[_id == "siteContent"][0]{stats, businessCentreImage}`);
  if (!existing) {
    console.log('No "siteContent" document found — run seed-site-content.mjs first.');
    return;
  }

  const patch = {};

  if (!existing.stats?.length) {
    patch.stats = [
      { _type: "stat", _key: "established", value: 1979, prefix: "", suffix: "", label: "Established" },
      { _type: "stat", _key: "properties", value: 100, prefix: "", suffix: "+", label: "Properties Managed" },
      { _type: "stat", _key: "cities", value: 2, prefix: "", suffix: "", label: "Cities: Abu Dhabi & Dubai" },
      { _type: "stat", _key: "support", value: 24, prefix: "", suffix: "/7", label: "Support Availability" },
    ];
  }

  if (!existing.businessCentreImage?.asset) {
    console.log("Uploading Business Centre teaser image...");
    patch.businessCentreImage = await uploadImageFromUrl(
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop"
    );
  }

  patch.businessCentreEyebrow = "AS Business Centre";
  patch.businessCentreHeading = "Fully Serviced Office Spaces in Abu Dhabi";
  patch.businessCentreText =
    "We provide fully serviced & furnished office spaces that fulfill the need of start-up companies wanting to set up operations in Abu Dhabi — plus convenient, cost-effective solutions for established businesses.";
  patch.businessCentreButtonText = "Learn More";
  patch.whoWeAreEyebrow = "Who We Are";
  patch.whoWeAreButtonText = "About Us";

  await client.patch("siteContent").set(patch).commit();
  console.log("Seeded new homepage fields onto the siteContent document.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
