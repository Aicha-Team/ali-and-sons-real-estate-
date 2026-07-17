# Ali & Sons Real Estate — Website

The official website for **Ali & Sons Real Estate (ASRE)**, a property management division of Ali & Sons Holding based in Abu Dhabi. The site showcases residential and commercial properties across Abu Dhabi and Dubai, the AS Business Centre serviced offices, and general company information — with content editable by non-technical staff through a connected CMS.

## Tech Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) — React framework
- **TypeScript** — type safety across the codebase
- **Tailwind CSS v4** — styling
- **[Sanity](https://www.sanity.io)** — headless CMS for properties, homepage content, and About Us content
- **Framer Motion** + **GSAP** — animations and scroll effects
- **Lenis** — smooth scrolling
- **Resend** — contact form email delivery

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

You'll need:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` — from your Sanity project settings at [sanity.io/manage](https://sanity.io/manage)
- `SANITY_API_TOKEN` — an API token with **Editor** permissions, generated from the same project's API settings
- `RESEND_API_KEY` — for the contact form to send emails (optional in local development)

**Never commit `.env.local`** — it's already gitignored, and contains secrets.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Management (Sanity Studio)

Non-technical staff manage property listings and site content through Sanity Studio, embedded directly in this site at **`/studio`** (e.g. `http://localhost:3000/studio` locally, or `yourdomain.com/studio` once deployed).

From Studio, staff can:
- Add, edit, and remove property listings (title, price, photos, description, etc.)
- Mark properties as "Featured" to control what shows on the homepage
- Edit the homepage hero image and headline
- Edit the "Who We Are" text and About Us page content

Changes made in Studio are reflected on the live site automatically within about 60 seconds — no redeploy needed.

### Editing schemas

The content structure (what fields exist for a "Property", etc.) is defined in `sanity/schemas/`. If you need to add a new editable field, edit the relevant schema file there and restart the dev server.

## Project Structure

```
src/
  app/              Next.js App Router pages and API routes
  components/       Reusable React components
  lib/              Data fetching, types, and utilities
  sanity/           Sanity client, image URL builder, and GROQ queries
sanity/
  schemas/          Sanity CMS content schemas (Property, Site Content, Business Centre)
scripts/            One-off data migration/seed scripts
```

## Building for Production

```bash
npm run build
npm run start
```

## Notes

- The site is fully static/server-rendered where possible for performance, with Sanity content revalidating every 60 seconds.
- The Sanity Studio route (`/studio`) runs entirely client-side to avoid a known incompatibility between Sanity's bundled dependencies and Next.js's Turbopack build in Server Components.
