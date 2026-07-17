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
  const existing = await client.fetch(`*[_type == "siteContent"][0]{_id}`);
  if (existing) {
    console.log("siteContent document already exists — skipping seed.");
    return;
  }

  console.log("Uploading hero and about images...");
  const heroImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2400&auto=format&fit=crop"
  );
  const aboutHeroImage = await uploadImageFromUrl(
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop"
  );

  const doc = {
    _type: "siteContent",
    heroImage,
    heroEyebrow: "Find Your Space",
    heroTitle: "Explore Our Portfolio",
    aboutHeroImage,
    whoWeAreText:
      "Ali & Sons Real Estate manages properties owned by Ali & Sons and other property owners across the UAE — from Al Rawdhat, Abu Dhabi to landmark developments like Sidra Tower in Dubai.",
    aboutAsreHeading: "Property Management Across the UAE",
    aboutAsreText:
      "With the world choosing UAE as its preferred place of residence and workplace, Ali & Sons Real Estate fulfills this need. The company manages properties owned by Ali & Sons and manages other property owners' assets as well. Fully owned developments include properties such as C40 and C55 buildings located in Al Rawdhat, Abu Dhabi. Landmark properties under management include Sidra Tower & Sidra Village in Dubai. AS Business Centre is considered the operational hub of the ASRE management team.",
    aboutHoldingHeading: "Ali & Sons Holding",
    aboutHoldingText:
      "Ali & Sons Holding (ASH) is a family-owned conglomerate with strong presence in the automotive, commercial, oil & gas, retail, construction, property management, hospitality, manufacturing, marine engineering and information technology industries. ASH is associated with some of the most prestigious brands in the world. Ali & Sons was established in 1979 in Abu Dhabi under the leadership of H.E. Ali bin Khalfan Al Mutawa Al Dhaheri – Founder and Chairman of The Family Council.",
  };

  const created = await client.create(doc);
  console.log(`Created siteContent document (${created._id})`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
