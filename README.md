# Ali & Sons Real Estate — Website

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Sanity" src="https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity&logoColor=white" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-animations-0055FF?logo=framer&logoColor=white" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-scroll_fx-88CE02?logo=greensock&logoColor=white" />
  <img alt="Resend" src="https://img.shields.io/badge/Resend-email-000000?logo=resend&logoColor=white" />
</p>

The official website for **Ali & Sons Real Estate (ASRE)**, a property management division of Ali & Sons Holding based in Abu Dhabi. The site showcases residential and commercial properties across Abu Dhabi and Dubai, the AS Business Centre serviced offices, and general company information — with content editable by non-technical staff through a connected CMS.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | [Sanity](https://www.sanity.io) — properties, homepage & About Us content |
| Animation | Framer Motion, GSAP (ScrollTrigger), Lenis (smooth scroll) |
| Email | [Resend](https://resend.com) — contact form delivery |
| Theming | next-themes — light/dark mode |
| Icons | lucide-react |

## Features

- **Property listings** — searchable/filterable grid (city, category, rent/sale), individual detail pages with an image gallery, map embed, and enquiry form
- **Homepage** — animated hero, featured properties (horizontal scroll showcase), stats counters, Business Centre teaser
- **Business Centre page** — serviced office offerings for AS Business Centre
- **About Us & Contact pages**
- **Contact/enquiry forms** — sent via Resend to the ASRE team
- **CMS-editable content** — see [Content Management](#content-management-sanity-studio) below
- **Light/dark theme toggle**
- **Custom cursor, scroll-linked reveals, 3D card tilt, and other motion polish**

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

**Never commit `.env.local`** — it's already gitignored, and contains secrets. If a token is ever accidentally shared or exposed, revoke and regenerate it immediately from the Sanity dashboard.

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

### Studio feels slow / spinner never resolves

Sanity Studio uses a WebSocket connection (`wss://*.api.sanity.io`) for real-time sync. Some corporate networks, VPNs, and firewalls block outbound WebSocket traffic while allowing normal HTTPS — this causes Studio panels to hang on a loading spinner and the browser console to show `WebSocket connection ... failed`.

**Fix:** ask your network/IT admin to whitelist outbound WebSocket connections to `wss://*.api.sanity.io` on port 443. As a workaround while waiting, use a different network (mobile hotspot, home WiFi) — editing still works there, and once whitelisted the office network will work too.

## Project Structure

```
src/
  app/              Next.js App Router pages and API routes
  components/       Reusable React components
  lib/              Data fetching, types, and utilities
  sanity/           Sanity client, image URL builder, and GROQ queries
sanity/
  schemas/          Sanity CMS content schemas (Property, Site Content, Business Centre)
scripts/            One-off data migration/seed scripts (run with `npx tsx scripts/<file>.mjs`)
```

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

This is a standard Next.js app and deploys cleanly to [Vercel](https://vercel.com) (recommended) or any Node.js hosting platform that supports Next.js. Set the same environment variables from `.env.local` in your hosting provider's dashboard — never commit them to the repo.

## Notes

- The site is fully static/server-rendered where possible for performance, with Sanity content revalidating every 60 seconds (`export const revalidate = 60` on relevant pages).
- The Sanity Studio route (`/studio`) runs entirely client-side to avoid a known incompatibility between Sanity's bundled dependencies and Next.js's Turbopack build in Server Components.
- `sanity.config.tsx` uses the `.tsx` extension (not `.ts`) because it defines JSX components (custom Studio logo/branding).
